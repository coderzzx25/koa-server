import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import md5password from '../utils/password-handle';
import { PUBLIC_KEY } from '../app/config';
import UsersModels from '../models/UsersModel';
import type { IConditions } from '../types';

// 登录校验
export const loginVerify = async (ctx: Context, next: Next) => {
  const { username, password } = ctx.request.body;
  // 校验用户名和密码
  if (!username || !password) {
    ctx.throw(400, '用户名或密码不能为空');
  }
  const userConditions: IConditions = {
    where: {
      username: username
    }
  };
  const usersFields = ['username', 'password', 'role_id'];
  // 查询用户是否存在
  const [user] = await UsersModels.getAdvancedList(userConditions, usersFields, false);
  if (!user) {
    ctx.throw(400, '用户不存在');
  }
  // 校验密码
  if (md5password(password) !== user.password) {
    ctx.throw(400, '密码错误');
  }
  ctx.user = user;
  await next();
};

// token 校验
export const tokenVerify = async (ctx: Context, next: Next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    ctx.throw(401, '用户未登录');
  }
  const token = authorization.replace('Bearer ', '');

  const result = jwt.verify(token, PUBLIC_KEY, {
    algorithms: ['RS256']
  });
  if (result) {
    ctx.user = result;
    await next();
  } else {
    ctx.throw(401, '用户未登录');
  }
};

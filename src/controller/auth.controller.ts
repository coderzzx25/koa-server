import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../app/config';

class AuthController {
  // 用户登录
  async userLogin(ctx: Context) {
    const { username, role_id } = ctx.user;
    const token = jwt.sign({ role_id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    });
    const refreshToken = jwt.sign({ username, role_id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 3,
      algorithm: 'RS256'
    });
    ctx.body = {
      userinfo: { username, role: role_id },
      token,
      refreshToken
    };
  }

  // 刷新token
  async refreshToken(ctx: Context) {
    const { username, role_id } = ctx.user;
    const token = jwt.sign({ role_id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    });
    const refreshToken = jwt.sign({ username, role_id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 3,
      algorithm: 'RS256'
    });
    ctx.body = {
      token,
      refreshToken
    };
  }
}

export default new AuthController();

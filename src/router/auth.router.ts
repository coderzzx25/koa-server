import Router from 'koa-router';
import { loginVerify, tokenVerify } from '../middleware/auth.middleware';
import AuthController from '../controller/auth.controller';

const authRouter = new Router({ prefix: '/auth' });

const { userLogin, refreshToken } = AuthController;

// 用户登录
authRouter.post('/login', loginVerify, userLogin);

// 刷新token
authRouter.get('/refresh_token', tokenVerify, refreshToken);

export default authRouter;

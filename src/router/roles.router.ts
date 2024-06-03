import Router from 'koa-router';
import { tokenVerify } from '../middleware/auth.middleware';
import RolesController from '../controller/roles.controller';

const rolesRouter = new Router({ prefix: '/roles' });

const { getRoleList, createRole, editRole } = RolesController;

// 角色列表
rolesRouter.get('/list', tokenVerify, getRoleList);

// 创建角色
rolesRouter.post('/create', tokenVerify, createRole);

// 编辑角色
rolesRouter.post('/edit/:roleId', tokenVerify, editRole);

export default rolesRouter;

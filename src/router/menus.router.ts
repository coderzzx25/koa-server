import Router from 'koa-router';
import MenusController from '../controller/menus.controller';
import { tokenVerify } from '../middleware/auth.middleware';

const menusRouter = new Router({ prefix: '/menus' });

const { getMenuRoleList, getMenuList } = MenusController;

// 角色获取菜单列表
menusRouter.get('/role/list', tokenVerify, getMenuRoleList);

// 获取所有菜单
menusRouter.get('/list', tokenVerify, getMenuList);

// 获取所有菜单

export default menusRouter;

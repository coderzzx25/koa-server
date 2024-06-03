import Router from 'koa-router';
import MenusController from '../controller/menus.controller';
import { tokenVerify } from '../middleware/auth.middleware';

const menusRouter = new Router({ prefix: '/menus' });

const { getMenuRoleList, getMenuAndPermissionList, getMenuList, getMenus } = MenusController;

// 角色获取菜单列表
menusRouter.get('/role/list', tokenVerify, getMenuRoleList);

// 获取所有菜单和权限
menusRouter.get('/permission', tokenVerify, getMenuAndPermissionList);

// 获取所有菜单(有参数)
menusRouter.get('/', tokenVerify, getMenuList);

// 获取所有菜单(无传参)
menusRouter.get('/list', tokenVerify, getMenus);

export default menusRouter;

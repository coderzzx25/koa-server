import { Context } from 'koa';
import RolesModel from '../models/RolesModel';
import MenusModel from '../models/MenusModel';
import MenuPermissionModel from '../models/MenuPermissionModel';
import type { IConditions, IMenuList, IMenuPermission } from '../types';
import { mapMenusAndPermsissionToTree, mapMenusToRoutes } from '../utils/menu-handle';

class MenusController {
  // 获取角色菜单列表
  async getMenuRoleList(ctx: Context) {
    const { role_id } = ctx.user;
    if (!role_id) {
      ctx.throw(400, '参数错误');
    }
    // 查询角色菜单ID
    const roleConditions = {
      where: {
        id: role_id,
        status: 1
      }
    };
    const roleFields = ['menu_ids', 'permission_ids'];
    const [roleIds] = await RolesModel.getAdvancedList(roleConditions, roleFields, false);
    const menuIdsArray = roleIds.menu_ids.split(',').map(Number);
    const MenusConditions: IConditions = {
      whereIn: {
        id: menuIdsArray
      },
      where: {
        status: 1
      }
    };
    const MenusFields = ['id', 'menu_name', 'url', 'icon', 'grade', 'pid'];

    const menus = await MenusModel.getAdvancedList(MenusConditions, MenusFields, false);

    const menuList = mapMenusToRoutes(menus);
    ctx.body = menuList;
  }

  // 获取所有菜单
  async getMenuList(ctx: Context) {
    const menus = await MenusModel.getAdvancedList({}, ['id', 'menu_name', 'grade', 'pid'], false);
    const ids = menus.map((item) => item.id);
    let isPage = false;
    const MenuPermissionConditions: IConditions = {
      whereIn: {
        menu_id: ids
      },
      where: {
        status: 1
      }
    };

    const MenuPermissionFields = ['id', 'menu_id', 'permission_name', 'permission_value'];
    const menuPermission = await MenuPermissionModel.getAdvancedList(
      MenuPermissionConditions,
      MenuPermissionFields,
      false
    );
    // 处理数据
    const menusResult: IMenuList[] = menus.map((item) => {
      return {
        id: item.id,
        menuName: item.menu_name,
        grade: item.grade,
        pid: item.pid
      };
    });
    const menuPermissionResult: IMenuPermission[] = menuPermission.map((item) => {
      return {
        id: item.id,
        menuId: item.menu_id,
        permissionName: item.permission_name,
        permissionValue: item.permission_value
      };
    });
    const result = mapMenusAndPermsissionToTree(menusResult, menuPermissionResult);
    ctx.body = result;
  }
}

export default new MenusController();

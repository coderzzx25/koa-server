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
  async getMenuAndPermissionList(ctx: Context) {
    const menus = await MenusModel.getAdvancedList({}, ['id', 'menu_name', 'grade', 'pid'], false);
    const ids = menus.map((item) => item.id);

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

  async getMenuList(ctx: Context) {
    const { menuName, page, limit } = ctx.query;
    if (!page && !limit) {
      ctx.throw(400, '参数错误');
    }

    const menuConditions: IConditions = {
      where: {
        status: 1
      },
      page: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
      orderBy: {
        id: 'desc'
      }
    };
    const menuFields = ['id', 'menu_name', 'url', 'icon', 'grade', 'pid', 'create_time', 'update_time', 'status'];
    if (menuName) {
      menuConditions.like = {
        menu_name: menuName
      };
    }

    const [total, menus] = await MenusModel.getAdvancedList(menuConditions, menuFields, true, true);

    const menuList = mapMenusToRoutes(menus);
    ctx.body = {
      total,
      list: menuList
    };
  }

  async getMenus(ctx: Context) {
    const menus = await MenusModel.getAdvancedList({}, ['id', 'menu_name', 'grade', 'pid'], false);

    const menuList = mapMenusToRoutes(menus);

    ctx.body = menuList;
  }
}

export default new MenusController();

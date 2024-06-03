import { Context } from 'koa';
import RolesModel from '../models/RolesModel';
import type { IConditions } from '../types';
import { getTimestamp, timestampToDate } from '../utils/datetime-handle';
import MenuPermissionModel from '../models/MenuPermissionModel';
import { combinationMenusAndPermission } from '../utils/menu-handle';

class RolesController {
  // 角色列表
  async getRoleList(ctx: Context) {
    const { roleName, page, limit } = ctx.query;
    if (!page || !limit) {
      ctx.throw(400, '参数错误');
    }
    const roleConditions: IConditions = {
      page: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
      orderBy: {
        id: 'desc'
      }
    };
    if (roleName) {
      roleConditions.like = {
        role_name: roleName
      };
    }
    const roleFields = ['id', 'role_name', 'menu_ids', 'permission_ids', 'create_time', 'update_time', 'status'];
    const [total, result] = await RolesModel.getAdvancedList(roleConditions, roleFields, true, true);

    // 查询所有权限
    const menuPermissionConditions: IConditions = {
      where: {
        status: 1
      }
    };
    const menuPermissionFields = ['id', 'menu_id'];

    const permissionList = await MenuPermissionModel.getAdvancedList(
      menuPermissionConditions,
      menuPermissionFields,
      false
    );

    const data = combinationMenusAndPermission(result, permissionList);

    ctx.body = {
      total,
      data
    };
  }
  // 创建角色
  async createRole(ctx: Context) {
    const { roleName, menuIds } = ctx.request.body;
    if (!roleName || !menuIds || !Array.isArray(menuIds) || !menuIds.length) {
      ctx.throw(400, '参数错误');
    }
    // 校验角色名称是否已存在
    const roleConditions: IConditions = {
      where: {
        role_name: roleName,
        status: 1
      }
    };
    const roleFields = ['id'];
    const [role] = await RolesModel.getAdvancedList(roleConditions, roleFields, false);

    if (role) {
      ctx.throw(400, '角色名称已存在');
    }
    const roleResult = {
      menu_ids: [],
      permission_ids: []
    };
    menuIds.forEach((item: string) => {
      if (item.includes('-')) {
        const permissionId = item.split('-')[1];
        roleResult.permission_ids.push(permissionId);
      } else {
        roleResult.menu_ids.push(item);
      }
    });
    try {
      await RolesModel.insert({
        role_name: roleName,
        menu_ids: roleResult.menu_ids.join(','),
        permission_ids: roleResult.permission_ids.join(','),
        create_time: getTimestamp(),
        update_time: getTimestamp()
      });
      ctx.body = '创建角色成功';
    } catch (error) {
      ctx.throw(400, '创建角色失败');
    }
  }

  // 编辑角色
  async editRole(ctx: Context) {
    const { roleId } = ctx.params;
    let { roleName, menuIds, status } = ctx.request.body;
    if (!roleId || !roleName || !menuIds || !Array.isArray(menuIds) || !menuIds.length) {
      ctx.throw(400, '参数错误');
    }
    if (status === undefined || status === null || status === '' || ![0, 1].includes(Number(status))) {
      ctx.throw(400, '参数错误');
    }
    status = status === true ? 1 : 0;
    // 查询是否存在该角色
    const roleConditions: IConditions = {
      where: {
        id: Number(roleId)
      }
    };
    const roleFields = ['id'];
    const [role] = await RolesModel.getAdvancedList(roleConditions, roleFields, false);
    if (!role) {
      ctx.throw(400, '角色不存在');
    }
    // 校验角色名称是否已存在
    const roleNameConditions: IConditions = {
      where: {
        role_name: roleName
      }
    };
    const roleNameFields = ['id'];
    const [roleByName] = await RolesModel.getAdvancedList(roleNameConditions, roleNameFields, false);
    if (roleByName && roleByName.id !== role.id) {
      ctx.throw(400, '角色名称已存在');
    }
    const roleResult = {
      menu_ids: [],
      permission_ids: []
    };
    menuIds.forEach((item: string) => {
      if (item.includes('-')) {
        const permissionId = item.split('-')[1];
        roleResult.permission_ids.push(permissionId);
      } else {
        roleResult.menu_ids.push(item);
      }
    });
    try {
      const where = {
        id: Number(roleId)
      };
      await RolesModel.update(
        {
          role_name: roleName,
          status: status,
          menu_ids: roleResult.menu_ids.join(','),
          permission_ids: roleResult.permission_ids.join(','),
          update_time: getTimestamp()
        },
        where
      );
      ctx.body = '编辑角色成功';
    } catch (error) {
      ctx.throw(400, '编辑角色失败');
    }
  }
}

export default new RolesController();

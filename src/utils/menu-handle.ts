import type { IMenuList, IMenuPermission, IMenuTree } from '../types';
import { timestampToDate } from './datetime-handle';

export const mapMenusAndPermsissionToTree = (menus: IMenuList[], permission?: IMenuPermission[]): IMenuTree[] => {
  const handleMenu = (menuList: IMenuList[], pid: number): IMenuTree[] => {
    return menuList
      .filter((menu) => menu.pid === pid)
      .map((menu) => {
        const { id, menuName, url, icon } = menu;
        const children = handleMenu(menuList, menu.id);
        const permissionList = permission
          .filter((item) => item.menuId === id)
          .map((item) => {
            return {
              ...item,
              id: `${item.menuId}-${item.id}`
            };
          });
        return {
          id: id.toString(),
          menuName,
          url,
          icon,
          ...(children.length && { children }),
          ...(permissionList.length && { permission: permissionList })
        };
      });
  };
  return handleMenu(menus, 0);
};

interface IRoles {
  id: number;
  role_name: string;
  menu_ids: string;
  permission_ids: string;
  create_time?: number;
  update_time?: number;
  status?: number;
}
interface IPermission {
  id: number;
  menu_id: number;
}

interface ICombinationMenusAndPermission {
  id: number;
  roleName: string;
  menuIds: string[];
  createTime?: string;
  updateTime?: string;
  status?: number;
}

export const combinationMenusAndPermission = (menus: IRoles[], permission: IPermission[]) => {
  const permissionMap = {};
  permission.forEach((p) => {
    permissionMap[p.id] = p.menu_id;
  });

  return menus.map((role) => {
    let menuIds = new Set<string>(role.menu_ids.split(','));

    role.permission_ids.split(',').forEach((pid) => {
      const menuId = permissionMap[parseInt(pid)];

      if (menuId) {
        menuIds.add(`${menuId}-${pid}`);
      }
    });

    const menuIdsArray = Array.from(menuIds);

    return {
      id: role.id,
      roleName: role.role_name,
      menuIds: menuIdsArray,
      createTime: timestampToDate(role.create_time),
      updateTime: timestampToDate(role.update_time),
      status: role.status
    };
  });
};

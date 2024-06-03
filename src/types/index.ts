// baseModel方法传参
type FindInSet = {
  [key: string]: string;
};
export interface IConditions {
  where?: Record<string, any>;
  whereOr?: Array<{ operator: string; key: string; value: any }>;
  whereIn?: Record<string, any[]>;
  whereThan?: Array<{ operator: string; key: string; value: any }>;
  findInSet?: FindInSet;
  like?: Record<string, any>;
  orderBy?: Record<string, 'asc' | 'desc'>;
  page?: number;
  limit?: number;
}

// 菜单列表
export interface IMenuList {
  id: number;
  menuName: string;
  url?: string;
  icon?: string;
  grade?: number;
  pid?: number;
}

// 菜单权限
export interface IMenuPermission {
  id: string;
  menuId: number;
  permissionName: string;
  permissionValue: string;
}

// 菜单树
export interface IMenuTree {
  id: string;
  menuName: string;
  url: string;
  icon: string;
  permission?: IMenuPermission[];
  children?: IMenuTree[];
}

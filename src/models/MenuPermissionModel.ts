import BaseModel from './BaseModel';

class MenuPermissionModel extends BaseModel {
  tableName: string = 'coderzzx_';
  constructor(tableName: string) {
    super(tableName);
    this.tableName += tableName;
  }
}

export default new MenuPermissionModel('menu_permission');

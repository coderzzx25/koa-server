import BaseModel from './BaseModel';

class MenusModel extends BaseModel {
  tableName: string = 'coderzzx_';
  constructor(tableName: string) {
    super(tableName);
    this.tableName += tableName;
  }
}

export default new MenusModel('menus');

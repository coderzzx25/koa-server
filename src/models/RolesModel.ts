import BaseModel from './BaseModel';

class RolesModel extends BaseModel {
  tableName: string = 'coderzzx_';
  constructor(tableName: string) {
    super(tableName);
    this.tableName += tableName;
  }
}

export default new RolesModel('roles');

import BaseModel from './BaseModel';

class UsersModel extends BaseModel {
  tableName: string = 'coderzzx_';
  constructor(tableName: string) {
    super(tableName);
    this.tableName += tableName;
  }
}

export default new UsersModel('users');

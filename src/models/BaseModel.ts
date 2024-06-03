import type { IConditions } from '../types';
import connections from '../app/database';

class BaseModel {
  tableName: string;
  constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * @description 复杂查询
   * @param conditions 查询条件
   * @param fields 查询字段
   * @param page 是否分页
   * @param limit 分页条数
   * @returns 查询结果
   */
  public async getAdvancedList(
    conditions: IConditions,
    fields: string[] = ['*'],
    pageBreak: boolean = true,
    isTotal: boolean = false
  ) {
    let query = connections(this.tableName).select(fields);
    let total = 0;

    if (conditions.where) {
      query = query.where(conditions.where);
    }

    if (conditions.whereOr) {
      conditions.whereOr.forEach((condition) => {
        query = query.orWhere(condition.key, condition.operator, condition.value);
      });
    }

    if (conditions.whereIn) {
      for (const key in conditions.whereIn) {
        query = query.whereIn(key, conditions.whereIn[key]);
      }
    }

    if (conditions.whereThan) {
      conditions.whereThan.forEach((condition) => {
        query = query.where(condition.key, condition.operator, condition.value);
      });
    }

    if (conditions.like) {
      for (const key in conditions.like) {
        let value = conditions.like[key];
        value = value.replace(/'/g, '');
        query = query.where(key, 'like', `%${value}%`);
      }
    }

    if (conditions.orderBy) {
      for (const key in conditions.orderBy) {
        query = query.orderBy(key, conditions.orderBy[key]);
      }
    }

    if (conditions.findInSet) {
      for (const key in conditions.findInSet) {
        let value = conditions.findInSet[key];
        query = query.whereRaw(`FIND_IN_SET(?, ${key})`, value);
      }
    }

    if (pageBreak && conditions.page !== undefined) {
      query = query.offset(conditions.page);
    }

    if (pageBreak && conditions.limit !== undefined) {
      query = query.limit(conditions.limit);
    }

    if (isTotal) {
      total = await query.clone().count();
    }

    if (pageBreak && conditions.page) {
      query = query.limit(conditions.limit);
    }

    if (pageBreak && conditions.limit) {
      query = query.limit(conditions.limit);
    }

    const data = await query;

    if (isTotal) {
      return [total[0]['count(*)'], data];
    } else {
      return data;
    }
  }

  public async insert(data: Record<string, any>) {
    return await connections(this.tableName).insert(data);
  }

  public async update(data: Record<string, any>, where: Record<string, any>) {
    return await connections(this.tableName).where(where).update(data);
  }

  public async delete(where: Record<string, any>) {
    return await connections(this.tableName).where(where).del();
  }
}

export default BaseModel;

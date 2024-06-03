import knex from 'knex';
import config from './config';

const connections = knex({
  client: 'mysql2',
  connection: {
    host: config.MYSQL_HOST,
    port: parseInt(config.MYSQL_PORT),
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD
  }
});

connections
  .raw('select 1+1 as result')
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(() => {
    console.log('数据库连接失败');
  });

export default connections;

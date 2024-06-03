import app from './app';
import './app/database';
import './app/redis';
import config from './app/config';

app.listen(config.APP_PORT, () => {
  console.log(`服务启动成功，监听在 ${config.APP_PORT} 端口`);
});

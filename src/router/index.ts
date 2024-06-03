import fs from 'fs/promises';
import path from 'path';
import Koa from 'koa';

const useRouters = async (app: Koa) => {
  try {
    const files = await fs.readdir(__dirname);

    for (const file of files) {
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);

      if (baseName === 'index') continue;

      try {
        const router = (await import(`./${file}`)).default;
        if (router) {
          app.use(router.routes());
          app.use(router.allowedMethods());
        }
      } catch (err) {
        console.error(`加载文件 ${file} 的路由失败:`, err);
      }
    }
  } catch (err) {
    console.error('读取目录时出错:', err);
  }
};

export default useRouters;

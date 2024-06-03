import Koa from 'koa';
import KoaBodyParser from '@koa/bodyparser';
import KoaCors from '@koa/cors';

import useRouters from '../router';

const app = new Koa();

app.use(KoaBodyParser());
app.use(KoaCors());

useRouters(app);

export default app;

const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const model = require('./model');

const app = new Koa();
const port = process.env.PORT || 80;
const isDevelopmentEnv = process.env.NODE_ENV === 'development';

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

async function bootstrap() {
  // 初始化数据表
  await Promise.all(
    Object.values(model).map((ModalItem) => ModalItem.sync({ alter: true })),
  );
  // 开启服务
  app.listen(port, () => {
    console.log();
    console.log(
      '启动成功',
      isDevelopmentEnv ? `http://localhost:${port}/` : port,
    );
  });
}
bootstrap();

const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const CountController = require('./controller/count');
const ChartController = require('./controller/chart');

const router = new Router();
const homePage = fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8');

// 首页
router.get('/', async (ctx) => {
  ctx.body = homePage;
});

// 小程序调用，获取微信 Open ID
router.get('/api/wx_openid', async (ctx) => {
  if (ctx.request.headers['x-wx-source']) {
    ctx.body = req.headers['x-wx-openid'];
  }
});

// 更新计数
router.post('/api/count', CountController.post);
// 获取计数
router.get('/api/count', CountController.get);

// 生成图表
router.post('/api/chart/create', ChartController.create);

// 导出router
module.exports = router;

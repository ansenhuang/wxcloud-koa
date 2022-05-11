const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const puppeteer = require('puppeteer');

const defaultViewport = { width: 800, height: 600 };
const htmlTemplate = fs.readFileSync(
  path.join(__dirname, './chart.html'),
  'utf-8',
);
const echartsJs = fs.readFileSync(
  path.join(__dirname, './echarts.min.js'),
  'utf-8',
);

const screenshot = async (chartOptions, _viewport) => {
  try {
    const viewport = { ...defaultViewport, ..._viewport };
    const html = ejs.render(htmlTemplate, {
      echartsJs,
      viewport,
      options: JSON.stringify(chartOptions),
    });

    // await ejs.renderFile(path.join(__dirname, './chart.html'), {
    //   options: JSON.stringify(chartOptions),
    //   viewport,
    // });
    // 添加启动参数'--no-sandbox', '--disable-setuid-sandbox'
    // 解决Linux环境下"no use sandbox"报错
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });
    const page = await browser.newPage();

    await page.setViewport(viewport);
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const clip = { x: 0, y: 0, width: viewport.width, height: viewport.height };
    // const clip = await page.evaluate(() => {
    //   // 获取指定容器的坐标信息
    //   const { x, y, width, height } = document.getElementById('chart-container').getBoundingClientRect();
    //   return { x, y, width, height };
    // });

    const imageBuffer = await page.screenshot({
      // path: path.join(__dirname, `./output/${Date.now()}.png`),
      clip, // 设置clip 属性
    });

    await page.close();
    await browser.close();

    return imageBuffer;
  } catch (error) {
    throw error;
  }
};

module.exports = screenshot;

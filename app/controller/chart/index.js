const screenshot = require('./screenshot');

exports.create = async (ctx) => {
  const { options, viewport } = ctx.request.body || {};

  if (options && typeof options === 'object') {
    try {
      // ctx.set('content-type', 'application/octet-stream');
      const image = await screenshot(options, viewport);
      ctx.body = {
        code: 0,
        data: image,
      };
    } catch (error) {
      ctx.body = {
        code: -1,
        data: null,
        message: error.message,
      };
    }
  } else {
    ctx.body = {
      code: -2,
      data: null,
      message: '入参错误',
    };
  }
};

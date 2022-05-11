const { Counter } = require('../model');

const post = async (ctx) => {
  const { request } = ctx;
  const { action } = request.body;
  if (action === 'inc') {
    await Counter.create();
  } else if (action === 'clear') {
    await Counter.destroy({
      truncate: true,
    });
  }

  ctx.body = {
    code: 0,
    data: await Counter.count(),
  };
};

const get = async (ctx) => {
  const result = await Counter.count();

  ctx.body = {
    code: 0,
    data: result,
  };
};

module.exports = {
  post,
  get,
};

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

// 定义数据模型
const Counter = sequelize.define('Counter', {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// 导出初始化方法和模型
module.exports = Counter;

const { Sequelize } = require('sequelize');
const dbConfig = require('./config/db');

const isDevelopmentEnv = process.env.NODE_ENV === 'development';
// 从环境变量中读取数据库配置
const {
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_ADDRESS = '',
} = !isDevelopmentEnv ? process.env : dbConfig;
const [host, port] = MYSQL_ADDRESS.split(':');

const sequelize = new Sequelize('nodejs_demo', MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 导出初始化方法和模型
module.exports = {
  sequelize,
};

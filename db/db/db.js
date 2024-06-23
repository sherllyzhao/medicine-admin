module.exports = function (success, error) {
  // 1. 导入mongoose模块
  const mongoose = require("mongoose");

  const config = require('../config/config');

  const {DBHOST, DBPORT, DBNAME} = config

  // 2. 连接数据库，如果数据库不存在，则创建
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  // 3. 回调 once 只执行一次
  mongoose.connection.once("open", () => {
    console.log("连接成功");
    success && success()
  });

  mongoose.connection.once("error", () => {
    console.log("连接失败");
    error && error()
  });

  mongoose.connection.once("close", () => {
    console.log("连接关闭");
  });

  // 4. 关闭连接
  /* setTimeout(() => {
  mongoose.disconnect();
}) */
};

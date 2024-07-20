const mongoose = require("mongoose");

// 5. 创建文档结构对象，类似MySQL表字段的格式
const logSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  log: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true,
    default: new Date()
  }
});

// 6. 创建模型对象，对文档操作的封装对象
const LogModel = mongoose.model("logs", logSchema);

module.exports = LogModel;
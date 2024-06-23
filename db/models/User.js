const mongoose = require("mongoose");
  // 5. 创建文档结构对象，类似MySQL表字段的格式
  const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true, // 唯一键，需要重建集合
    },
    password: {
      type: String,
      required: true
    },
    createtime: {
      type: Date,
      default: Date.now()
    },
    updatetime: {
      type: Date,
      default: Date.now()
    },
  });

  // 6. 创建模型对象，对文档操作的封装对象
  const UserModel = mongoose.model("users", UserSchema);

  module.exports = UserModel;
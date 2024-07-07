var express = require('express');
var router = express.Router();
const UserModel = require('../../db/models/User');

/* GET home page. */
router.post('/register', function(req, res, next) {
  UserModel.create({
    username: req.body.username,
    password: req.body.password
  }).then(() => {
    res.json({
      code: 200,
      msg: '注册成功'
    })
  }).catch(e => {
    let msg = '注册失败';
    if (e.code === 11000) {
      msg = '用户名已存在';
    }
    res.json({
      code: e.code,
      msg: '注册失败'
    })
  })
});

module.exports = router;

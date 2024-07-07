var express = require('express');
var router = express.Router();
const UserModel = require('../../db/models/User');

router.get('/', function(req, res) {
  res.send('user');
})

/* GET home page. */
router.post('/register', function(req, res) {
  UserModel.create({
    username: req.body.username,
    password: req.body.password
  }).then((r) => {
    res.json({
      code: 200,
      data: {
        name: r.username,
        _id: r._id
      },
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

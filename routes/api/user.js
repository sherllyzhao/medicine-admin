var express = require('express');
var router = express.Router();
const UserModel = require('../../db/models/User');
const md5 = require('md5');
const LogModel = require('../../db/models/Log');

router.get('/', function(req, res) {
  res.send('user');
})

/* 注册 */
router.post('/register', function(req, res) {
  const {username, password} = req.body;
  const lockPassword = md5(password);
  if(username && password){
    UserModel.create({
      username,
      password: lockPassword
    }).then((r) => {
      try {
        req.session.username = username;
        req.session.password = lockPassword;
        req.session.uid = r._id;
      }catch(e){
        LogModel.create({
          username,
          log: JSON.stringify(e)
        })
      }
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
      LogModel.create({
        username,
        log: JSON.stringify(e)
      })
      res.json({
        code: e.code,
        msg
      })
    })
  }else{
    res.json({
      code: 400,
      msg: '请输入用户名和密码'
    })
  }
});

/* 登录 */
router.post('/login', function(req, res) {
  const {username, password} = req.body;
  UserModel.findOne({username}).then(r => {
    if(r){
      if(md5(password) === r.password){
        try {
          req.session.username = username;
          req.session.password = lockPassword;
          req.session.uid = r._id;
        }catch(e){
          LogModel.create({
            username,
            log: JSON.stringify(e)
          })
        }
        res.json({
          code: 200,
          data: {
            name: r.username,
            _id: r._id,
            avatar: r.avatar || ''
          },
          msg: '登录成功'
        })
      }else{
        res.json({
          code: 400,
          msg: '密码输入错误'
        })
      }
    }else{
      res.json({
        code: 400,
        msg: '暂无该用户，请先注册'
      })
    }
  }).catch(e => {
    console.log(e);
    LogModel.create({
      username,
      log: JSON.stringify(e)
    })
  })
})

module.exports = router;

var express = require('express');
var router = express.Router();
const UserModel = require('../../db/models/User');

router.get('/', function(req, res) {
  res.send('user');
})

/* GET home page. */
router.post('/register', function(req, res) {
  const {username, password} = req.body;
  console.log(username, password)
  if(username && password){
    UserModel.create({
      username,
      password
    }).then((r) => {
      try {
        req.session.username = username;
        req.session.username = password;
        req.session.uid = r._id;
      }catch(e){
        cosole.log(e);
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

module.exports = router;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// session
var session = require('express-session');
var MongoStore = require('connect-mongo');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'userId', // 响应cookie的名字
  secret: 'medicine', // 加密字符串，加盐
  saveUninitialized: false, // 是否为每个请求都设置一个cookie用来存储session的id
  resave: true, // 生命周期到期后自动更新
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1/medicine'
  }),
  cookie: { // 响应cookie的内容
    httpOnly: true, // 开启后不可通过js操作
    maxAge: 1000 * 30, // cookie有效期
  }
}))


// 验证session
app.use(function(req, res, next){
  const whiteApiList = ['/api/user/register', '/api/user/login']
  if(whiteApiList.includes(req.url)){
    next();
  }else{
    if(req.session.username){
      next();
    }else{
      res.json({
        code: 401,
        msg: '登录过期'
      })
    }
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

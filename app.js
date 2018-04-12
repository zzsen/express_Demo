var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var flash = require('connect-flash')

var getConfig = require('./config/getConfig')
var session = require('express-session')
const sessionConfig = getConfig('session')

var index = require('./routes/index')
var user = require('./routes/user')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(flash())
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
var debug = require('debug')('express-demo:app')

// session 中间件
app.use(session({
  name: sessionConfig.key, // 设置 cookie 中保存 session id 的字段名称
  secret: sessionConfig.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: true, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: sessionConfig.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  }
}))

app.use('/', index)
app.use('/user', user)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  debug(req)
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

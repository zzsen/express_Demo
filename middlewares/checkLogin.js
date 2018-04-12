// check whether has login
var checkLogin = function (req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录！')
    res.send('未登录！')
  } else {
    next()
  }
}
// check whether has logout
var checkNotLogin = function (req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录！')
    res.send('已登录！')
  } else {
    next()
  }
}

module.exports = {
  checkLogin: checkLogin,
  checkNotLogin: checkNotLogin
}

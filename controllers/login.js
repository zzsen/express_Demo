var User = require('../models').user

// login
var login = function (req, res) {
  console.log(req.body.account)
  var acct = req.body.acct || req.query.acct
  var pwd = req.body.pwd || req.query.pwd
  User.findOne({
    where: {
      account: acct
    }
  }).then(user => {
    if (!user) throw new Error('用户不存在！')
    if (user.password !== pwd) throw new Error('密码错误！')
    req.session.user = user
    req.session.save()
    return '登录成功！'
  }).then(message => {
    req.flash('success', message)
    res.send(message)
  }).catch(function (err) {
    req.flash('error', err.message)
    res.send(err.message)
  })
}

// logout
var logout = function (req, res) {
  req.session.user = null
  req.flash('success', '登出成功！')
  res.send('登出成功!')
}

module.exports = {
  login: login,
  logout: logout
}

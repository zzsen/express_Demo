var express = require('express')
var router = express.Router()
var User = require('../models').user
var loginCtrler = require('../controllers/login')
var userCtrler = require('../controllers/user')
var checkLogin = require('../middlewares/checkLogin.js')

// login
router.get('/login', checkLogin.checkNotLogin, loginCtrler.login)
router.post('/login', checkLogin.checkNotLogin, loginCtrler.login)

// logout
router.post('/logout', checkLogin.checkLogin, loginCtrler.logout)

router.post('/search', checkLogin.checkLogin, userCtrler.searchUser)

/* GET users listing. */
router.get('/', checkLogin.checkLogin, function (req, res) {
  User.findOne({
    where: {
      id: req.query.id
    }
  }).then(user => {
    delete user.dataValues.password
    req.session.user = user
    req.session.userid = user.id
    req.session.save()
    res.send(req.session)
  }).catch(() => {
    res.send('respond with a resource')
  })
})

module.exports = router

var User = require('../models').user
var Usersss = require('../entities/user')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

var debug = require('debug')('express-demo:users')
// search
var searchUser = function (req, res, next) {
  var key = req.body.word
  User.findAll({
    where: {name: {[Op.like]: `%${key}%`}}
  }).then(users => {
    users.forEach(u => {
      var uuu = new Usersss(u)
      debug(uuu)
    })
  })
}

module.exports = {
  searchUser: searchUser
}

const getConfig = require('../config/getConfig')
const Sequelize = require('sequelize')
class Server {
  static SysServer () {
    if (!Server._sys_server_) {
      Server._sys_server_ = new Server()
    }
  }
  constructor () {
    const config = getConfig('mysql')
    const sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })
    // 测试连接
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.')
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err)
      })
  }
}
module.exports = Server.SysServer()

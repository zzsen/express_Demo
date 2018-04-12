'use strict'
class User {
  constructor (data) {
    if (data) {
      this.id = data.id
      this.account = data.account
      this.name = data.name
    }
  }
}
module.exports = User

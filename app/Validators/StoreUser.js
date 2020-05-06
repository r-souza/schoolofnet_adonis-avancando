'use strict'

class StoreUser {
  get rules () {
    return {
      name:     'required|min:4',
      username: 'required|min:4|unique:users',
      email:    'required|email|unique:users',
      password: 'required|min:4'
    }
  }
}

module.exports = StoreUser

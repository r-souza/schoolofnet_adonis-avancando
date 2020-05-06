'use strict'

class StorePerson {
  get rules () {
    return {
      name: 'required|min:4'
    }
  }

  get messages() {
    return {
      'name.required': 'Name is required',
      'name.min': 'Name must have at least 4 characters'
    }
  }
}

module.exports = StorePerson

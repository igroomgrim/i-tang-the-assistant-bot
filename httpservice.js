'use strict'

const rqpm = require('request-promise')

class HTTPService {
  async post (options) {
  	var defaultOption = {
  		method: 'POST',
  		json: true
  	}

  	var opts = Object.assign(defaultOption, options)

    try {
      const response = await rqpm(opts)
      return response
    } catch (error) {
      throw error
    }
  }

  async get (options) {
    var defaultOption = {
      method: 'GET',
      json: true
    }

    var opts = Object.assign(defaultOption, options)

    try {
      const response = await rqpm(opts)
      return response
    } catch (error) {
      throw error
    }
  }
}

module.exports = HTTPService

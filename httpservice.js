'use strict'

const rqpm = require('request-promise')

class HTTPService {
  async post (uri, qs, body) {
    const options = {
      method: 'POST',
      uri: uri,
      qs: qs,
      body: body,
      json: true
    }

    try {
      const response = await rqpm(options)
      return response
    } catch (error) {
      throw error
    }
  }

  async get (uri, qs, body) {
    const options = {
      method: 'GET',
      uri: uri,
      qs: qs,
      body: body,
      json: true
    }

    try {
      const response = await rqpm(options)
      return response
    } catch (error) {
      throw error
    }
  }
}

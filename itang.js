'use strict'

const BFX = require('bitfinex-api-node')
const API_KEY = ''
const API_SECRET = ''

class ItangBot {
  receiveMessage (senderID, message) {
    console.log('receiveMessage')
  }

  receiveQuickReply (senderID, quickReply) {
    console.log('receiveQuickReply')
  }

  receivePostback (senderID, payload) {
    console.log('receivePostback')
  }
}

module.exports = ItangBot

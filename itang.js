'use strict'

const msgenerator = require('./message_generator')
const fbbutton = require('./fb_button')
const HTTPService = require('./httpservice')
const config = require('./config')
const EntitiesHandler = require('./entities_handler')
const httpservice = new HTTPService()

class ItangBot {
  constructor () {
    this.accessToken = process.env.FB_ACCESS_TOKEN
  }

  receiveMessage (senderID, message) {
    console.log('receiveMessage')
    console.log('text : ', message.text)

    const entitiesHandler = new EntitiesHandler(message.nlp.entities)
    let messageData = entitiesHandler.intentTranslator(message.nlp.entities)
    this.barkBack(senderID, messageData)
  }

  receiveQuickReply (senderID, quickReply) {
    console.log('receiveQuickReply')
  }

  receivePostback (senderID, payload) {
    console.log('receivePostback')
  }

  barkBack (senderID, messageData) {
    let uri = config.FB_MESSAGE_ENDPOINT
    let qs = {
      access_token: this.accessToken
    }
    let body = {
      recipient: { id: senderID },
      message: messageData
    }

    httpservice.post(uri, qs, body)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = ItangBot

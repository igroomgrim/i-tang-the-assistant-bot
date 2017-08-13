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

  async receiveMessage (senderID, message) {
    console.log('receiveMessage')
    console.log('text : ', message.text)

    const entitiesHandler = new EntitiesHandler(message.nlp.entities)

    try {
      const messageData = await entitiesHandler.intentTranslator(message.nlp.entities)
      const res = await this.barkBack(senderID, messageData)
    } catch (err) {
      // handle error
    }
  }

  receiveQuickReply (senderID, quickReply) {
    console.log('receiveQuickReply')
  }

  receivePostback (senderID, payload) {
    console.log('receivePostback')
  }

  async barkBack (senderID, messageData) {
    let uri = config.FB_MESSAGE_ENDPOINT
    let qs = {
      access_token: this.accessToken
    }
    let body = {
      recipient: { id: senderID },
      message: messageData
    }

    let options = {
      uri: uri,
      qs: qs,
      body: body
    }

    try {
      const res = await httpservice.post(options)
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = ItangBot

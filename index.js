'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('./config')
const ItangBot = require('./itang')
const RequestHandler = require('./requesthandler')
const requesthandler = new RequestHandler()

const itang = new ItangBot()

app.set('port', (process.env.PORT || config.PORT))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(requesthandler.router())

requesthandler.on('message', (senderID, message) => {
  itang.receiveMessage(senderID, message)
})

requesthandler.on('quick_reply', (senderID, payload) => {
  itang.receiveQuickReply(senderID, message)
})

requesthandler.on('postback', (senderID, payload) => {
  itang.receivePostback(senderID, message)
})

requesthandler.on('error', (error) => {
  console.log('fbbot on error', error)
})

app.listen(app.get('port'), () => {
  console.log(`Runn iTang runnnn on port ${app.get('port')}`)
})

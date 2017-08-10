'use strict'

const rqpm = require('request-promise')
const Router = require('express').Router
const config = require('./config')
const EventEmitter = require('events').EventEmitter

class RequestHandler extends EventEmitter {
  constructor () {
    super()

    if (!config || !config.FB_VERIFY_TOKEN || !process.env.FB_ACCESS_TOKEN) {
	  throw new Error(`Facebook accessToken or verifyToken is can't be null`)
    }

    this.verifyToken = config.FB_VERIFY_TOKEN
    this.accessToken = process.env.FB_ACCESS_TOKEN
  }

  router () {
    const router = Router()
    const webhookPath = '/webhook'

    router.get('/', (req, res) => {
      res.status(200).send('Woof Woof')
    })

    router.get(webhookPath, (req, res) => {
      if (req.query['hub.verify_token'] === this.verifyToken) {
        console.log('Verify facebook token success')
        res.status(200).send(req.query['hub.challenge'])
      } else {
        console.error('Failed validation. Make sure the validation tokens match.')
        res.sendStatus(403)
      }
    })

    router.post(webhookPath, (req, res) => {
    	this.handleMessagingEvent(req)
      res.sendStatus(200)
    })

    return router
  }

  handleMessagingEvent (req) {
    const body = req.body
    if (body.object === 'page') {
      body.entry.forEach((pageEntry) => {
        pageEntry.messaging.forEach((messagingEvent) => {
          if (messagingEvent.message) {
            if (messagingEvent.message.is_echo) { return }

            if (messagingEvent.message.quick_reply) {
              // _handleQuickReply.call(this, messagingEvent)
            }

            this.handleMessage(messagingEvent)
          } else if (messagingEvent.postback) {
            // _handlePostback.call(this, messagingEvent)
          } else {
            console.log('Webhook received unused messagingEvent case ', messagingEvent)
          }
        })
      })
    } else {
      this.emit('error', new Error('body.object is not page'))
    }
  }

  handleMessage (messagingEvent) {
    if (!messagingEvent.sender.id || !messagingEvent.message) {
      this.emit('error', new Error('handleUserMessage : sender.id or message is null'))
    }

    this.emit('message', messagingEvent.sender.id, messagingEvent.message)
  }

  handleQuickReply (messagingEvent) {
    if (!messagingEvent.sender.id || !messagingEvent.message.quick_reply.payload) {
      this.emit('error', new Error('handleQuickReply : sender.id or quick_reply.payload is null'))
    }

    this.emit('quick_reply', messagingEvent.sender.id, messagingEvent.message.quick_reply.payload)
  }

  handlePostback (messagingEvent) {
    if (!messagingEvent.sender.id || !messagingEvent.postback.payload) {
      this.emit('error', new Error('handlePostback : sender.id or postback.payload is null'))
    }

    this.emit('postback', messagingEvent.sender.id, messagingEvent.postback.payload)
  }
}

module.exports = RequestHandler

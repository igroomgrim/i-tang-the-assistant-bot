'use strict'

const service = require('./crypto_service')
const msgenerator = require('./message_generator')
const msgStore = require('./message_store')

class EntitiesHandler {
  constructor (entities) {
    this.entities = entities

    this.hasIntent = entities.hasOwnProperty('intent')
    this.hasCoinCurrency = entities.hasOwnProperty('coin_currency')
    this.hasCoinAmount = entities.hasOwnProperty('coin_amount')
    this.hashCoinPrice = entities.hasOwnProperty('coin_price')
    this.hasExchageSite = entities.hasOwnProperty('exchange_site')
    this.hasBetType = entities.hasOwnProperty('bet_type')
    this.hasItemToBuy = entities.hasOwnProperty('item_to_buy')
    this.hasTradeType = entities.hasOwnProperty('trade_type')
    this.hasMoneyCurrency = entities.hasOwnProperty('money_currency')
    this.hasGreetings = entities.hasOwnProperty('greetings')
    this.hasDateTime = entities.hasOwnProperty('datetime')
    this.hasDuration = entities.hasOwnProperty('duration')
    this.hasThanks = entities.hasOwnProperty('thanks')
    this.hasContact = entities.hasOwnProperty('contact')
    this.hasReminder = entities.hasOwnProperty('reminder')
  }

  checkUnderRateConfidence (intent) {
    return intent.confidence > 0.7
  }

  checkMaxConfidence (acc, cur) {
    return Math.max(acc.confidence, cur.confidence)
  }

  async intentTranslator (entities) {
    console.log(entities)
    console.log('------------------')

    // var removeUnderRateConfidence = (it) => { return it.confidence > 0.7 }
    // var findMaxConfidence = (acc, cur) => Math.max(acc.confidence, cur.confidence)

    /*
    console.log(Object.keys(entities))

    var clearEntities = Object.keys(entities).map(function (intent, index) {
      return entities[intent].filter(removeUnderRateConfidence)
    })

    console.log(clearEntities)
    console.log('------------------')
    if (entities.hasOwnProperty(this.intent)) {
      console.log(entities[this.intent])
      var intent = entities[this.intent].reduce(findMaxConfidence)
    }
    */

    // First thing to check

    if (!this.hasIntent) {
      this.entitiesChecking(entities)
      return
    }

    var intent = entities['intent'].reduce(this.checkMaxConfidence).value
    switch (intent) {
      case 'coin_price':
        const res = await this.handleCoinPriceIntent(entities)
        return res
        break
      case 'coin_balance':
        return msgStore.funnyError()
        break
      case 'coin_trade':
        return msgStore.funnyError()
        break
      case 'coin_reminder':
        return msgStore.funnyError()
        break
      default:
        return msgStore.funnyError()
        break
    }
  }

  entitiesChecking (entities) {

  }

  async handleCoinPriceIntent (entities) {
    console.log('handleCoinPriceIntent')
    if (!this.hasCoinCurrency) {
      return msgenerator.genTextMessage(`I don't know what is coin name that you want to get lahhh woof woof`)
    }

    let coinCurrency = entities['coin_currency'].reduce(this.checkMaxConfidence).value

    try {
      if (entities['money_currency']) {
        let moneyCurrency = entities['money_currency'].reduce(this.checkMaxConfidence).value
        const res = await service.checkCoinPrice(coinCurrency, moneyCurrency)
        return res
      }
      console.log('no money currency')
      const res = await service.checkCoinPrice(coinCurrency)
      return res
    } catch (err) {
      return msgStore.funnyError()
    }
  }

  handleCoinBalanceIntent (entities) {

  }

  handleCoinTradeIntent (entities) {

  }

  handleCoinReminderIntent (entities) {

  }

  handleUnknowIntent (entities) {

  }

}

module.exports = EntitiesHandler

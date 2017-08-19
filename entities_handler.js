'use strict'

const service = require('./crypto_service')
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
      return this.handleUnknowIntent(entities)
    }

    var intent = entities['intent'].reduce(this.checkMaxConfidence).value
    switch (intent) {
      case 'coin_price':
        console.log('intent : coin_price')
        return await this.handleCoinPriceIntent(entities)
        break
      case 'coin_balance':
        console.log('intent : coin_balance')
        return msgStore.funnyError()
        break
      case 'coin_trade':
        console.log('intent : coin_trade')
        return msgStore.funnyError()
        break
      case 'coin_reminder':
        console.log('intent : coin_reminder')
        return await this.handleCoinReminderIntent(entities)
        break
      default:
        return msgStore.funnyError()
        break
    }
  }

  async handleCoinPriceIntent (entities) {
    console.log('handleCoinPriceIntent')
    if (!this.hasCoinCurrency) {
      return msgStore.cantFindCoinCurrency()
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

  async handleCoinBalanceIntent (entities) {
    console.log('handleCoinBalanceIntent')
    return msgStore.funnyError()
  }

  async handleCoinTradeIntent (entities) {
    console.log('handleCoinTradeIntent')
    return msgStore.funnyError()
  }

  async handleCoinReminderIntent (entities) {
    console.log('handleCoinReminderIntent')
    return msgStore.funnyError()
  }

  async handleUnknowIntent (entities) {
    console.log('handleUnknowIntent')
    return msgStore.funnyError()
  }

}

module.exports = EntitiesHandler

'use strict'

const config = require('./config')
const HTTPService = require('./httpservice')
const httpservice = new HTTPService()
const coinDataStore = require('./coin_data_store')
const msgStore = require('./message_store')

module.exports = {
  checkAvailableCurrency (coinCurrency) {
    return coinDataStore.bxPairID.hasOwnProperty(coinCurrency)
  },

  async getCoinPrice (coinCurrency) {
    if (!this.checkAvailableCurrency(coinCurrency)) {
      return msgStore.cantFindCoinCurrency()
    }

    const coinPairID = coinDataStore.bxPairID[coinCurrency]

    const options = {
      uri: config.BX_PUBLIC_API_ENDPOINT
    }

    try {
      const res = await httpservice.get(options)
      const coinData = res[coinPairID]
      return msgStore.bxCoinPriceMessage(coinData)
    } catch (err) {
      console.error(err)
      return msgStore.funnyError()
    }
  }

}

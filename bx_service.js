'use strict'

const config = require('./config')
const msgenerator = require('./message_generator')
const HTTPService = require('./httpservice')
const httpservice = new HTTPService()
const coinDataStore = require('./coin_data_store')

module.exports = {
  bxPriceMessageConstruct (coinData) {
    return msgenerator.genTextMessage(`1 ${coinData.secondary_currency} is ${coinData.last_price} ${coinData.primary_currency} Woof Woooof`)
  },

  async getCoinPrice (coinCurrency) {
    if (!coinDataStore.bxPairID.hasOwnProperty(coinCurrency)) {
      return msgenerator.genTextMessage(`Not found ${coinCurrency} in BXXXXX WOOF WOOF`)
    }

    const omgPairID = coinDataStore.bxPairID[coinCurrency]

    const options = {
  		uri: config.BX_PUBLIC_API_ENDPOINT
  	}

  	try {
	    const res = await httpservice.get(options)
	    const omgData = res[omgPairID]
	    return this.bxPriceMessageConstruct(omgData)
	  } catch (err) {
	    console.error(err)
	    return msgenerator.genTextMessage(`errrrrrrrorororro`)
	  }
  }

}

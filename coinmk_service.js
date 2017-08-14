'use strict'

const config = require('./config')
const HTTPService = require('./httpservice')
const httpservice = new HTTPService()
const coinDataStore = require('./coin_data_store')
const msgStore = require('./message_store')

module.exports = {
  checkAvailableCurrency (coinCurrency) {
    return coinDataStore.cmkPairID.hasOwnProperty(coinCurrency)
  },

  async getCoinPrice (coinCurrency, moneyCurrency = 'usd') {
    if (!this.checkAvailableCurrency(coinCurrency)) {
    	return msgStore.cantFindCoinCurrency()
    }

    console.log('cmkservice : ' + moneyCurrency)

    const coinPairID = coinDataStore.cmkPairID[coinCurrency]
    const options = {
      uri: config.COINMARKETCAP_API_ENDPOINT + coinPairID
    }

    try {
      const res = await httpservice.get(options)
      const coinData = res[0]
      console.log(coinData)

      if (!coinDataStore.moneyCurrency.hasOwnProperty(moneyCurrency)) {
	   		// return price and default currency of coinmarketcap
	   		return msgStore.cmkCoinPriceUnknowCompareCurrencyMessage(coinData)
	   	}

	   	return msgStore.cmkCoinPriceMessage(coinData, moneyCurrency)
    } catch (err) {
      console.error(err)
      return msgStore.funnyError()
    }

    console.log(coinData)
  }

}

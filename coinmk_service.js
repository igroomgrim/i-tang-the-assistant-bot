'use strict'

const coinDataStore = require('./coin_data_store')

module.exports = {
	checkAvailableCurrency (coinCurrency) {
    return coinDataStore.cmkPairID.hasOwnProperty(coinCurrency)
  },

  async getCoinPrice (coinCurrency) {
  	
  }
}
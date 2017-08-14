'use strict'

const config = require('./config')
const HTTPService = require('./httpservice')
const httpService = new HTTPService()
const coinDataStore = require('./coin_data_store')
const bxService = require('./bx_service')
const cmkService = require('./coinmk_service')
const msStore = require('./message_store')

module.exports = {
  async checkCoinPrice (coinCurrency, moneyCurrency = 'thb', exchangeSite = 'bx') {
  	// Note: Default exchange site is BX
  	console.log(`check ${coinCurrency} in ${moneyCurrency}`)

	  switch (exchangeSite) {
	  	case 'bx':

	  		if (!bxService.checkAvailableCurrency(coinCurrency)) {
	  			if (!cmkService.checkAvailableCurrency(coinCurrency)) {
	  				return msStore.cantFindCoinCurrency()
	  			}

	  			try {
	  				return await cmkService.getCoinPrice(coinCurrency, moneyCurrency)
	  			} catch (err) {
	  				return msStore.funnyError()
	  			}
	  		}

	  		try {
			  	return await bxService.getCoinPrice(coinCurrency)
			  } catch (err) {
			  	// Handle error
			  	return msStore.funnyError()
			  }

	  		break
	  	case 'bitfinex':
	  		break
	  	default:
	  		break
	  }
  }

}

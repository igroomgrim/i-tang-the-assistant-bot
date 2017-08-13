'use strict'

const config = require('./config')
const msgenerator = require('./message_generator')
const HTTPService = require('./httpservice')
const httpservice = new HTTPService()
const coindata = require('./coin_data_store')
const bxservice = require('./bx_service')

module.exports = {
  async checkCoinPrice (coinCurrency, moneyCurrency = 'thb', exchangeSite = 'bx') {
  	// Note: Default exchange site is BX
  	console.log(`check ${coinCurrency} in ${moneyCurrency}`)

  	// get data
  	// process it
  	// return message
  	// const options = {
  	// 	uri: config.BX_PUBLIC_API_ENDPOINT
  	// }

  	// try {
	  //   const res = await httpservice.get(options)
	  //   return msgenerator.genTextMessage(`1 ${coinCurrency} is 9999 ${moneyCurrency}`)
	  // } catch (err) {
	  //   console.error(err)
	  //   return msgenerator.genTextMessage(`errrrrrrrorororro`)
	  // }
	  switch (exchangeSite) {
	  	case 'bx':
	  		try {
			  	return await bxservice.getCoinPrice(coinCurrency)
			  } catch (err) {
			  	// Handle error
			  }
	  		break
	  	case 'bitfinex':
	  		break
	  	default:
	  		break
	  }
  }

}

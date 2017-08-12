'use strict'

const msgenerator = require('./message_generator')

module.exports = {
  checkCoinPrice (coinCurrency, moneyCurrency = 'thb') {
  	console.log(`check ${coinCurrency} in ${moneyCurrency}`)
  	// get data
  	// process it
  	// return message
  	return msgenerator.genTextMessage(`1 ${coinCurrency} is 9999 ${moneyCurrency}`)
  }
}

'use strict'

const msGenerator = require('./message_generator')
const coinDataStore = require('./coin_data_store')

module.exports = {
  cantFindCoinCurrency () {
    return msGenerator.genTextMessage(`Woooof woof so sorry bro, I don't know that coin currency  🐶🙈`)
  },

  funnyError () {
  	let errorMessages = [
  		`Ooppp! We got an error but i ate it already...... 🐶`,
  		`Never say, "oops." Always say, "Ah, interesting."`,
  		`Error is a hardy plant; it flourishes in every soil.`,
  		`A man whose errors take ten years to correct is quite a man.`,
  		`Woooooof wooooof wooof woof wof wf`
  	]

    return msGenerator.genTextMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)])
  },

  bxCoinPriceMessage (coinData) {
  	return msGenerator.genTextMessage(`🐶 I checked from BX. 1 ${coinData.secondary_currency} is ${coinData.last_price.toFixed(5)} ${coinData.primary_currency} ฿🐶฿`)
  },

  cmkCoinPriceUnknowCompareCurrencyMessage (coinData) {
  	return msGenerator.genTextMessage(`Sry bro, I don't know what currency that you need to compare.\nBut 1 ${coinData.symbol} is ${coinData.price_usd} usd... 🐶`)
  },

  cmkCoinPriceMessage (coinData, moneyCurrency = 'usd') {
  	if (moneyCurrency == 'usd') {
  		let priceInUSD = parseFloat(coinData.price_usd).toFixed(5)
  		return msGenerator.genTextMessage(`🐶 From CMK. 1 ${coinData.symbol} is ${priceInUSD} ${moneyCurrency} ....... 🙊`)
  	}

  	let priceInTHB = (coinData.price_usd * coinDataStore.moneyCurrency['usd']).toFixed(5)
  	return msGenerator.genTextMessage(`🐶 From CMK. 1 ${coinData.symbol} is ${priceInTHB} ${moneyCurrency} ....... 🙊`)
  }
}

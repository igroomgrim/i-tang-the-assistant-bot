'use strict'

const msGenerator = require('./message_generator')

module.exports = {
	cantFindCoinCurrency() {
		return msGenerator.genTextMessage(`Woooof woof so sorry bro, I don't know that coin currency`)
	},

	funnyError() {
		return msGenerator.genTextMessage(`Ooppp! We got an error but i ate it already......`)
	}
}
'use strict'

const BFX = require('bitfinex-api-node')
const API_KEY = ''
const API_SECRET = ''

class ItangBot {
  constructor () {
    let opts = {
      version: 2,
      transform: true
    }

    this.bws = new BFX(API_KEY, API_SECRET, opts).ws
  }

  observingOnOMG () {
    this.bws.on('open', () => {
      this.bws.subscribeTicker('OMGUSD')
    })

    this.bws.on('ticker', (pair, ticker) => {
      // console.log('Ticker:', ticker)
      this.listenOMG(null, ticker)
    })

    this.bws.on('error', (error) => {
      this.listenOMG(error, null)
    })
  }

  listenOMG (err, ticker) {
    if (err) {
      console.log(err)
      return
    }

    let priceInTHB = (ticker.LAST_PRICE * 33.28).toFixed(4)
    let priceInUSD = (ticker.LAST_PRICE).toFixed(4)
    console.log(`OMG\n| ${priceInUSD} USD\n| ${priceInTHB} THB`)
  }
}

module.exports = ItangBot

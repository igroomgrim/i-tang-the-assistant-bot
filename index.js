'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const app = express()

app.set('port', (process.env.PORT || config.PORT))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.status(200).send('Woof Woof')
})

app.listen(app.get('port'), () => {
  console.log(`Runn iTang runnnn <3`)
})

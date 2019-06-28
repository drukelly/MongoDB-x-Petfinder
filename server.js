const express = require('express')
const app = express()
require('dotenv').config()
const fetch = require('node-fetch')
const path = require('path')
const PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// Routing
require('./routes/html')(app)

// Routing for default page
app.get('/', function (_req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

module.exports = app
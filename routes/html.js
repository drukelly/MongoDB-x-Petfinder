/* eslint-disable no-unused-expressions */
const fetch = require('node-fetch')
const path = require('path')

module.exports = app => {
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'))
  })
}

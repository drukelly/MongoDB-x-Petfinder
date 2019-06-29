/* eslint-disable no-unused-expressions */
const path = require('path')

module.exports = app => {
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'))
  })
  app.get('/dogs', (req, res) => {
    res.sendFile(path.join(__dirname, `../public/pet.html`))
  })
  app.get('/cats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pet.html'))
  })
}

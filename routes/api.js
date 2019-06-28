/* eslint-disable no-unused-expressions */
const fetch = require('node-fetch')
const path = require('path')

module.exports = (app) => {
  app.get('/api/get-pets/:type', (req, res) => {
    const formData = new URLSearchParams()
    formData.append('grant_type', 'client_credentials'),
    formData.append('client_id', process.env.PETFINDER_ID),
    formData.append('client_secret', process.env.PETFINDER_SECRET)
    fetch('https://api.petfinder.com/v2/oauth2/token', {
      body: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post'
    })
      .then(tokenResult => tokenResult.json())
      .then(tokenResponse => {
        let accessToken = tokenResponse.access_token
        let pets = []
        fetch(`https://api.petfinder.com/v2/animals?type=${req.params.type}`, {
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          method: 'get',
          mode: 'cors'
        })
          .then(result => result.json())
          .then(response => {
            pets.push(response)
            res.json(pets)
          })
      })
  })
}

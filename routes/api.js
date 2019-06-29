/* eslint-disable no-unused-expressions */
const fetch = require('node-fetch')
const mongojs = require('mongojs')

const databaseURL = process.env.mongo_db || process.env.MONGODB_URI
const collections = [process.env.mongo_collection]
const mongodb = mongojs(databaseURL, collections)

module.exports = (app) => {
  app.get('/api/get-pets/:type', (req, res) => {
    const formData = new URLSearchParams()
    formData.append('grant_type', 'client_credentials')
    formData.append('client_id', process.env.PETFINDER_ID)
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
            mongodb.on('error', error => console.log('Database Error: ', error))
            let pointer = req.params.type
            switch (pointer) {
              case 'dog':
                // console.log(pets[0].animals)
                mongodb.dogs.insert(pets[0].animals)
                break
              case 'cat':
                // console.log(pets[0].animals)
                mongodb.cats.insert(pets[0].animals)
                break
            }
            res.json(pets)
          })
      })
  })
  app.get('/api/dogs', (_req, res) => {
    // only return entries with photos
    mongodb.dogs.find({ 'photos': { $exists: 1, $not: { $size: 0 } } }, (error, found) => {
      error ? console.log(error) : res.json(found)
    })
  })
  app.get('/api/cats', (_req, res) => {
    // only return entries with photos
    mongodb.cats.find({ 'photos': { $exists: 1, $not: { $size: 0 } } }, (error, found) => {
      error ? console.log(error) : res.json(found)
    })
  })
}

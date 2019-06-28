const express = require('express')
const app = express()
require('dotenv').config()
// eslint-disable-next-line no-unused-vars
const PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// Routing
require('./routes/html')(app)
require('./routes/api')(app)

app.listen(PORT, () => console.log(`=> http://localhost:${PORT}`))

module.exports = app

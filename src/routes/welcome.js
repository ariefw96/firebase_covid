const express = require('express')

const welcomeRouter = express.Router()

welcomeRouter.get('/', (req, res) => {
    res.send('Backend z-Wallet')
})

//export handler endpoint
module.exports = welcomeRouter
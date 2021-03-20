const express = require('express')
const regionController = require ('../controllers/regionController')
const regionRouter = express.Router()

regionRouter.get('/', regionController.getAll)
regionRouter.post('/add', regionController.addNewRegion)

module.exports = regionRouter
const express = require('express')
const victimController = require ('../controllers/victimController')
const victimRouter = express.Router()

const ImageUpload = require ('./../helpers/uploadImg')

victimRouter.post('/add', ImageUpload, victimController.addVictim)
victimRouter.get('/list', victimController.listAllVictim)
victimRouter.get('/listByUser/:id', victimController.listVictimUser)
victimRouter.get('/listByRegion/:id', victimController.listVictimByRegion)
victimRouter.patch('/update/:id', ImageUpload, victimController.updateVictim)
victimRouter.delete('/delete/:id', victimController.deleteVictim)

module.exports = victimRouter
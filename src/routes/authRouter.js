const express = require('express')
const authController = require ('../controllers/authController')
const authRouter = express.Router()

const AuthHelper = require('./../helpers/HelperAuth')

authRouter.post('/signup', AuthHelper.isRegistered, authController.signup)
authRouter.post('/login', authController.login)

module.exports = authRouter

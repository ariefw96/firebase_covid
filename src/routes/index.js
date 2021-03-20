const express = require('express');
const mainRouter = express.Router()

const welcomeRouter = require('./welcome')
const authRouter = require('./authRouter')
const victimRouter = require('./victimRouter')
const regionRouter = require('./regionRouter')

const firebaseRouter = require('./firebase')


//calling endpoint handler
mainRouter.use("/", welcomeRouter)
mainRouter.use("/auth", authRouter)
mainRouter.use("/victim", victimRouter)
mainRouter.use("/region", regionRouter)
mainRouter.use("/firebase", firebaseRouter)


module.exports = mainRouter
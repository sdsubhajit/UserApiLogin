const express = require('express')
const Route = express.Router()
const controller = require('../controller/userController')


Route.get("/",  controller.home)

module.exports = Route
const express = require('express')
const Route = express.Router()
const controller = require('../controller/userApiControlller')


Route.post("/adduser",  controller.adduser)
Route.get("/getuser",  controller.getuser)
Route.post("/loginuser",  controller.loginuser)

module.exports = Route
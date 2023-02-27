const express = require('express')
const Route = express.Router()
const controller = require('../controller/adminController')

Route.get('/register' , controller.register)
Route.post('/register/create' , controller.registerCreate)

Route.get('/login' , controller.login)
Route.post('/login/create' , controller.loginCreate)

Route.get('/dashboard' ,controller.adminAuther, controller.dashboard)

Route.get('/logout' , controller.logout)


module.exports = Route
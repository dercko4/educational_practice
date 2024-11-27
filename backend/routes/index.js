const Router = require('express')
const routes = new Router()
const auth = require('./auth')
const request = require('./request')

routes.use('/auth', auth)
routes.use('/request', request)

module.exports=routes
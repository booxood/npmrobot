'use strict'

var site = require('../controllers/site')
var Router = require('koa-router')

var route = new Router()

route.post('/api/subscribe', site.subscribe)
route.get('/api/confirm', site.confirm)

module.exports = route
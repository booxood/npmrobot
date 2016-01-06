'use strict'

require('./common/crontab')
const koa = require('koa')
const logger = require('koa-logger')
const error = require('koa-error')
const staticMiddle = require('koa-static')
const router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const cors = require('koa-cors')
const MongoStore = require('koa-generic-session-mongo')

const path = require('path')

const config = require('../config')
const route = require('./routers')

const app = module.exports = koa()

app.keys = config.appKeys

app.use(logger())
app.use(error())
app.use(staticMiddle(path.join(__dirname, 'public')))
app.use(bodyParser())
app.use(session({
    store: new MongoStore({
        host: config.database.host,
        db: config.database.db,
        user: config.database.user,
        password: config.database.password,
        port: config.database.port,
        collection: 'sessions'
    })
}))
app.use(cors())
app.use(router(app))
app.use(route.middleware())
app.use(function* (){
    this.status = 404
    this.body = 'Not found'
})

app.on('error', function (err, ctx) {
    err.url = err.url || ctx.request.url
    console.error(err)
    console.error(err.stack)
})

// process.on('uncaughtException', function(err) {
//   console.error('Caught exception: ' + err)
// })

if (!module.parent) app.listen(config.API_PORT, function () {
    console.log('==> API server listening on port:', config.API_PORT)
})



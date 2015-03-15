'use strict';

var config = require('./config');
if(config.newRelic)
    require('newrelic');

require('console-wrap')();
require('./common/crontab');

var koa = require('koa');
var logger = require('koa-logger');
var error = require('koa-error');
var staticMiddle = require('koa-static');
var router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var session = require('koa-generic-session');
var cors = require('koa-cors');
var MongoStore = require('koa-generic-session-mongo');
var hbs = require('koa-hbs');

var path = require('path');

var route = require('./routers')

var app = module.exports = koa();

app.keys = config.appKeys;

app.use(logger());
app.use(error());
app.use(staticMiddle(path.join(__dirname, 'public')))
app.use(bodyParser());
app.use(session({
    store: new MongoStore({
        host: config.database.host,
        db: config.database.db,
        user: config.database.user,
        password: config.database.password,
        port: config.database.port,
        collection: 'sessions'
    })
}));
app.use(cors());
app.use(hbs.middleware({
    viewPath: __dirname + '/views',
    layoutsPath: __dirname + '/views/layouts',
    partialsPath: __dirname + '/views/partials',
    extname: '.html'
}));

app.use(router(app));
app.use(route.middleware());
app.use(function* (){
    this.status = 404;
    this.body = 'Not found';
});

/**
 * Error handler
 */
app.on('error', function (err, ctx) {
    err.url = err.url || ctx.request.url;
    console.error(err);
    console.error(err.stack);
});

process.on('uncaughtException', function(err) {
  console.error('Caught exception: ' + err);
});

if (!module.parent) app.listen(config.port);



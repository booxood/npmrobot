'use strict';

var site = require('../controllers/site');
var Router = require('koa-router');

var route = new Router();

route.get('/', site.index);
route.post('/', site.subscribe);
route.get('/confirm', site.confirm);

module.exports = route;
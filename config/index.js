'use strict';

var fs = require('fs');
var path = require('path');

var copy = require('copy-to');

var config = require('./example.js');

var relConfigPath = path.join(__dirname, './config.js');
var relConfig = {};

if(fs.existsSync(relConfigPath)){
    console.log('Using config/config.js ...')
    try {
        relConfig = require('./config.js');
    } catch (err) {
        console.error('Required config/config.js catch:', err)
        console.error(err.stack);
    }
}

copy(relConfig).override(config);

module.exports = config;
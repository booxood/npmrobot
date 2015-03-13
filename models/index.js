'use strict';

var mongoose = require('mongoose');

var config = require('../config');
var database = config.database;

// mongodb://<dbuser>:<dbpassword>@<dbhost>:<dbport>/<dbport>
var dbURI = 'mongodb://'+ database.user +':' + database.password +
        '@' + database.host + ':' + database.port + '/' + database.db;

if (config.NODE_ENV === 'test') {
    dbURI += '_test';
}

mongoose.connect(dbURI);

// reset database for test
exports.resetDatabase = function (cb) {
    if (config.NODE_ENV === 'test') {
        mongoose.connection.db.dropDatabase(cb);
    }
}

exports.Users = require('./users');
exports.Packs = require('./packs');
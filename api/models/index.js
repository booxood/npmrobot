'use strict'

const mongoose = require('mongoose')

const config = require('../../config')

const database = config.database

// mongodb://<dbuser>:<dbpassword>@<dbhost>:<dbport>/<dbport>
let dbURI = ''

if (database.user && database.password) {
  dbURI = `mongodb://${database.user}:${database.password}@
          ${database.host}:${database.port}/${database.db}`
} else {
  dbURI = `mongodb://${database.host}:${database.port}/${database.db}`
}

if (config.NODE_ENV === 'test') {
    dbURI += '_test'
}

console.log('dbURI:', dbURI)

mongoose.connect(dbURI)

// reset database for test
exports.resetDatabase = function (cb) {
    if (config.NODE_ENV === 'test') {
        mongoose.connection.db.dropDatabase(cb)
    }
}

exports.Users = require('./users')
exports.Packs = require('./packs')
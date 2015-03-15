'use strict';

var app = require('../package.json');

var config = {
    // for app description
    name: app.name,
    version: app.version,
    host: 'npmrobot.com',

    // process env
    port: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // for database
    database: {
        host: '127.0.0.1',
        user: '',
        password: '',
        port: '27017',
        db: 'npmrobot'
    },

    // for http://newrelic.com/
    newRelic: '',

    // npm registry
    npmRegistry: 'https://registry.cnpmjs.org/',

    appKeys: ['npmrobot', 'keys'],

    // mail SMTP
    mail: {
        host: 'smtp.126.com',
        port: 25,
        auth: {
          user: '',
          pass: ''
        }
    },

    // crontab
    // http://bunkat.github.io/later/parsers.html#text
    updatePackSchedule: 'at 1:00 am',
    sendPackMailSchedule: 'at 6:00 am on Monday',

    // for logger
    logPath: ''
};

module.exports = config;
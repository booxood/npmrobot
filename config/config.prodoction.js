'use strict';

var config = {};

config.mail = {
    host: 'smtp.mandrillapp.com',
    port: 587,
    auth: {
        user: '279674457@qq.com',
        pass: 'Tn-5-l0XxA5qIH1jfKuTLg'
    }
};

config.database = {
    host: 'ds053130.mongolab.com',
    user: 'hello',
    password: '123123',
    port: '53130',
    db: 'npmrobot'
};

config.NODE_ENV = 'production';

config.port = 3030;

module.exports = config;


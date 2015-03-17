'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    type: Number, // 0:no register and no confirm email, 1:no register but confirmed email, 2:registered
    packs: Array,
    email: {
        type: String,
        index: true
    },
    token: String,
    username: String,
    password: String,
    signupAt: {
        type: Date,
        default: Date.now
    }
});

var Users = mongoose.model('Users', UsersSchema);

module.exports = Users;

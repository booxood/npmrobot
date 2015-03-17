'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PacksSchema = new Schema({
    name: String,
    latest: String,
    updatedAt: Date,
    description: String
});

module.exports = mongoose.model('Packs', PacksSchema);

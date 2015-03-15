'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PacksSchema = new Schema({
    name: String,
    isUpdate: Boolean,
    latest: String,
    updatedAt: Date
});

module.exports = mongoose.model('Packs', PacksSchema);

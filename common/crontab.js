'use strict';

var later = require('later');
var request = require('co-request');
var co = require('co');

var config = require('../config');
var mail = require('./mail');
var Packs = require('../models').Packs;
var Users = require('../models').Users;

var updateSche = later.parse.text(config.updatePackSchedule);
var sendSche = later.parse.text(config.sendPackMailSchedule);

if (updateSche.error !== -1) {
    console.error('updatePackSchedule error:', config.updatePackSchedule);
    throw new Error('crontab schedule error');
}

if (sendSche.error !== -1) {
    console.error('sendPackMailSchedule error:', config.sendPackMailSchedule);
    throw new Error('crontab schedule error');
}

later.setInterval(function(){
    co(updatePack).catch(function (err) {
        console.error('setInterval updatePack error:', err)
        console.error(err.stack);
    });
}, updateSche);

later.setInterval(function(){
    co(sendPackMail).catch(function (err) {
        console.error('setInterval sendPackMail error:', err)
        console.error(err.stack);
    });
}, sendSche);

function* updatePack (query) {
    console.log('crontab updatePack');
    query = query || {};
    var packs = yield Packs.find(query).exec();

    packs.forEach(function (pack) {
        co(function* () {
            var newPack = yield request.get({url: config.npmRegistry + pack.name, json: true});
            if (newPack.body['dist-tags']['latest'] !== pack.latest){
                pack.latest = newPack.body['dist-tags']['latest'];
                pack.description = newPack.body['description'];
                pack.updatedAt = new Date;
                yield pack.save();
            }
        }).catch(console.error);
    });
}

function* sendPackMail (query) {
    console.log('crontab sendPackMail');
    query = query || {type: {$ne: 0}};
    var users = yield Users.find(query).exec();

    users.forEach(function (user) {
        var packs = user.packs;
        var packsGen = packs.map(function (pack) {
            return function* () {
                var newPack = yield Packs.findOne({name: pack}).lean().exec();
                if (newPack.updatedAt && Math.abs(new Date - newPack.updatedAt) < 7*24*60*60*1000) {
                    newPack.updated = true;
                } else {
                    newPack.updated = false;
                }
                return newPack;
            }
        });

        co(function* () {
            var result = yield packsGen;
            mail.sendPackMail(user.email, result);
        }).catch(console.error);

    })

}


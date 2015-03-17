'use strict';

var config = require('../config');
var mail = require('../common/mail');
var Users = require('../models').Users;
var Packs = require('../models').Packs;

var request = require('co-request');
var uuid = require('node-uuid');

exports.index = function* () {
    yield this.render('index', {
        title: 'Npm Robot'
    });
}

exports.subscribe = function* () {
    // console.log(this.request.body)
    var body = this.request.body;
    var email = body.email;
    var packs = body.packs;

    var result = {success: true};

    if (!validateEmail(email)) {
        result.success = false;
        result.msg = 'Email format is bad.'
        return this.body = result;
    }
    if (packs.length === 0) {
        result.success = false;
        result.msg = 'No need subscribe\'s package'
        return this.body = result;
    }

    var noPacks = [];
    for(var i=0; i<packs.length; i++){
        var pack = packs[i];
        var res = {body: {error: true}};
        try {
            var have = yield Packs.findOne({name: pack}).exec();
            if (have) {
                res.body.error = false;
            } else {
                res = yield request.get({url: config.npmRegistry + pack, json: true});
            }
        } catch (e) {
            res.body.error = true;
            console.error('request:', pack, e);
        }
        // console.log('request body:', res.body);
        if (!!res.body.error) {
            noPacks.push(pack);
        }
    }

    if (noPacks.length === 0) {
        var token = uuid.v1();
        var user = new Users({
            type: 0,
            email: email,
            packs: packs,
            token: token
        });
        yield user.save();
        mail.sendConfirmMail(email, token, packs);
    } else {
        result.success = false;
        result.noPacks = noPacks;
    }

    this.body = result;
}


exports.confirm = function* () {
    var query = this.request.query;
    var email = query.email;
    var token = query.token;

    var user = yield Users.findOne({email:email, token:token}).exec();

    var result = 'Not found.';
    if (user) {
        user.type = 1;
        yield user.save();

        var packs = user.packs;
        for(var i=0; i<packs.length; i++){
            var pack = packs[i];
            var have = yield Packs.findOne({name: pack}).exec();
            if (!have) {
                yield (new Packs({
                    name: pack
                })).save();
            }
        }

        result = 'Subscribe success.';
    }

    yield this.render('msg', {
        msg: result
    });
}


// refer to http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


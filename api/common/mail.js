'use strict'

var config = require('../../config')

var mailer = require('nodemailer')
var util = require('util')

var transporter = mailer.createTransport(config.mail)
var ROOT_URL = 'http://' + config.host

exports.sendConfirmMail = function (email, token, packs) {
    console.log('sendConfirmMail:', email, token, packs)
    if (config.NODE_ENV !== 'production') {
        console.log('Not in production mode, no send mail!')
        return
    }

    var url = ROOT_URL + '/confirm?token=' + token + '&email=' + email

    var from = util.format('%s <%s>', config.name, config.mail.auth.user)
    var to = email
    var subject = config.name + ' subscribe confirm mail'
    var html = '<p>Your will subscribe update packages:</p>' +
    '<p>[ ' + packs.join(', ') + ' ]</p>' +
    '<p> </p>' + 
    '<p>If OK, please click the link below</p>' + 
    '<a href="' + url + '">Confirm Link</a>' +
    '<p>or copy the link below to browers</p>' + 
    '<p>' + url + '</p>' +
    '<p> </p>' + 
    '<p>Cheers</p>'
    

    transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    }, function (err) {
        err && console.error('sendConfirmMail error:', err, err.stack)
    })
}

exports.sendPackMail = function (email, result) {
    console.log('sendPackMail:', email)
    if (config.NODE_ENV !== 'production') {
        console.log('Not in production mode, no send mail!')
        return
    }


    var from = util.format('%s <%s>', config.name, config.mail.auth.user)
    var to = email
    var subject = config.name + ' packages update mail'

    var count = result.length

    var updatedPacksHtml = ''
    var noUpdatedPacksHtml = ''
    result.forEach(function (pack) {
        if (pack.updated) {
            updatedPacksHtml += '<li>'+pack.name+' '+pack.latest+' '+pack.description+'</li>'
        } else {
            noUpdatedPacksHtml += '<li>'+pack.name+' '+pack.latest+' '+pack.description+'</li>'
        }
    })

    var html = '<p>Your subscribing ' + count + ' packages.</p>' +
    '<p>In the last week had updated\'s packages:</p>' +
    '<ul>' + updatedPacksHtml +
    '</ul>' +
    '<p></p>' + 
    '<p>No updated\'s pacakges:</p>' + 
    '<ul>' + noUpdatedPacksHtml +
    '</ul>' +
    '<p> </p>' + 
    '<p>Cheers</p>'
    

    transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    }, function (err) {
        err && console.error('sendPackMail error:', err, err.stack)
    })
}


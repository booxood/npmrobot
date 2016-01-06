'use strict'

var should = require('should')
var app = require('../index')
var request = require('supertest').agent(app.listen())

var email = 'test@email.com'

describe('API server', function () {

    it('POST /api/subscribe should return {success: true}', function (done) {
        request.post('/api/subscribe')
        .send({
            email: email,
            packs: ['koa', 'co', 'npmrobot']
        })
        .expect(200)
        .end(function (err, res) {
            should.not.exists(err)
            res.body.should.have.property('success', true)
            done()
        })
    })

    it('POST /api/subscribe should return {success:false, noPacks: []}', function (done) {
        var npm404 = 'npm-404-' + Math.floor(1000*Math.random())
        request.post('/api/subscribe')
        .send({
            email: email,
            packs: ['npmrobot', npm404]
        })
        .expect(200)
        .end(function (err, res) {
            should.not.exists(err)
            res.body.should.have.property('success', false)
            res.body.should.have.property('noPacks', [npm404])
            done()
        })
    })

})
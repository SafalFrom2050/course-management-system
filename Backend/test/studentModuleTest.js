const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../server');

describe("Get Modules", () => {

    it('OK, modules appear', (done) => {
        request(conn.app).get('/student/modules/1')
            .then((res) => {
                const body = res.body;
                expect(body.length).to.greaterThan(0);
                done();
            })
            .catch((err) => done(err));
    });

    it('Fail, No modules appear', (done) => {
        request(conn.app).get('/student/modules/12')
            .send({ email: 'tomsmith@gmail.com' })
            .then((res) => {
                const body = res.body;
                expect(body.length).to.greaterThan(0);
                done();
            })
            .catch((err) => done(err));
    });
});
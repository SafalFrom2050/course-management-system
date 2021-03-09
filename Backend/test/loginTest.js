
const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../server');


describe("Login Post", () => {

    it('OK, login works', (done) => {
        request(conn.app).post('/common/login')
            .send({ email: 'tomsmith@gmail.com', password: "34ZPue6sdK" })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('email');
                expect(body).to.contain.property('name');
                expect(body).to.contain.property('staff_id');
                expect(body).to.contain.property('token');
                expect(body).to.contain.property('module_id');
                expect(body).to.contain.property('userType');
                done();
            })
            .catch((err) => done(err));
    });

    it('Fail, login requires password', (done) => {
        request(conn.app).get('/student/modules/1')
            .send({ email: 'tomsmith@gmail.com' })
            .then((res) => {
                const body = res.body;
                // expect(body.errors.text.name)
                //     .to.equal('ValidatorError')
                done();
            })
            .catch((err) => done(err));
    });
});
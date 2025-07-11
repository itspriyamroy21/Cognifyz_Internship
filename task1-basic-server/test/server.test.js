const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../server');
const expect = chai.expect;

describe('Task 1 - Basic Server', () => {
  it('should load the contact form page (GET /)', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('Contact Us');
        done();
      });
  });

  it('should submit form and redirect to thank you page (POST /submit)', (done) => {
    chai.request(app)
      .post('/submit')
      .type('form')
      .send({ name: 'Test User', email: 'test@example.com', message: 'Hello' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('Thank you');
        done();
      });
  });
});
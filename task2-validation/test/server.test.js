const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../server'); // make sure correct relative path
const expect = chai.expect;

describe('Task 2 - Server Validation', () => {
  it('should load the contact form page (GET /)', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('Contact Us');
        done();
      });
  });

  it('should reject empty submission (POST /submit)', (done) => {
    chai.request(app)
      .post('/submit')
      .type('form')
      .send({ name: '', email: '', message: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('All fields are required');
        done();
      });
  });

  it('should reject invalid email (POST /submit)', (done) => {
    chai.request(app)
      .post('/submit')
      .type('form')
      .send({ name: 'Test', email: 'wrong', message: 'Hello' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.include('Invalid email');
        done();
      });
  });

  it('should accept correct data (POST /submit)', (done) => {
    chai.request(app)
      .post('/submit')
      .type('form')
      .send({ name: 'Test User', email: 'test@example.com', message: 'Hello there!' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('Thank you');
        done();
      });
  });
});

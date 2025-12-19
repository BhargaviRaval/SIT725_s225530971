const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /api/calc/add', () => {

  it('should return sum for valid query params', (done) => {
    chai.request(app)
      .get('/api/calc/add?a=5&b=3')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.result).to.equal(8);
        done();
      });
  });

  it('should return error for invalid query params', (done) => {
    chai.request(app)
      .get('/api/calc/add?a=hello&b=3')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

});

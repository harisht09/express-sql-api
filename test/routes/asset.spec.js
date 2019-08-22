const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../src/server')();

chai.use(chaiHttp);

const { expect, request } = chai;

describe('Assets route', function() {
  it('should be able to access public assets routes with no bearer token', async function() {
    request(server)
      .get('/api/v1/assets')
      .then(res => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('should fail to do protected assets operations with an invalid uuid', async function() {
    const res = await request(server).get('/api/v1/assets/123');
    expect(res.statusCode).to.equal(400);
  });

  it('should fail to access protected assets routes with no bearer token', async function() {
    request(server)
      .post('/api/v1/assets')
      .then(res => {
        expect(res.statusCode).to.equal(401);
      });
  });
});

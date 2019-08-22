const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../src/server')();

chai.use(chaiHttp);

const { expect, request } = chai;

describe('Shopping centres route', function() {
  it('should be able to access public shopping centre routes with no bearer token', async function() {
    const res = await request(server).get('/api/v1/shoppingCentres');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should fail to execute protected assets operations with an invalid uuid', async function() {
    const res = await request(server).get('/api/v1/shoppingCentres/123');
    expect(res.statusCode).to.equal(400);
  });

  it('should be fail to access protected shopping centre routes with no bearer token', async function() {
    const res = await request(server).post('/api/v1/shoppingCentres');
    expect(res.statusCode).to.equal(401);
  });
});

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const server = require('../../src/server')();
const userService = require('../../src/services/user');

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect, request } = chai;

describe('User route', function() {
  let getUserByUsernameStub;

  beforeEach(function() {
    getUserByUsernameStub = sinon.stub(userService, 'getUserByUsername');
  });

  afterEach(function() {
    getUserByUsernameStub.restore();
  });

  it('should authenticate a user with correct credentials', async function() {
    getUserByUsernameStub.withArgs('admin').returns({ username: 'admin', password: 'password' });

    const res = await request(server)
      .post('/api/v1/users/authenticate')
      .set('content-type', 'application/json')
      .send({
        username: 'admin',
        password: 'password'
      });

    expect(res.statusCode).to.equal(200);
  });

  it('should fail to authenticate a user that does not exist', async function() {
    getUserByUsernameStub.withArgs('admin').returns(null);

    const res = await request(server)
      .post('/api/v1/users/authenticate')
      .send({ username: 'fakeUser', password: 'fakePassword' });

    expect(res.statusCode).to.equal(404);
  });

  it('should fail to authenticate a user with incorrect credentials', async function() {
    getUserByUsernameStub.withArgs('admin').returns({ username: 'admin', password: 'password' });

    const res = await request(server)
      .post('/api/v1/users/authenticate')
      .set('content-type', 'application/json')
      .send({
        username: 'admin',
        password: 'wrongPassword'
      });

    expect(res.statusCode).to.equal(401);
  });
});

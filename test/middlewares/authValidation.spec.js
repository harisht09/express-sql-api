const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const authValidation = require('../../src/middlewares/authValidation');

chai.use(sinonChai);

const { expect } = chai;

describe('Auth validation middleware', function() {
  it('should pass on to the next middleware if token is valid', async function() {
    const validToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhZDE5NjQxLWFmNGMtNGRhYy1hMjNlLTBiOTdlMzJjMWMwMCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1NjYzNDQzODV9.84OgIs2FYMxXASoXhSRvjRYyJAxyFT-6Fs_sE95gGOQ';
    const req = {
      headers: {
        authorization: `Bearer ${validToken}`
      }
    };
    const next = sinon.fake();
    await authValidation(req, null, next);
    expect(next).to.have.been.calledWithExactly();
  });

  it('should throw an unauthorized error to the next middleware if token is invalid', async function() {
    const req = {
      headers: {
        authorization: 'Bearer token'
      }
    };
    const next = sinon.fake();
    await authValidation(req, null, next);
    expect(next).to.throw;
  });
});

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const errorHandler = require('../../src/middlewares/errorHandler');

chai.use(sinonChai);

const { expect } = chai;

describe('Error middleware', function() {
  it('should forward to next middleware if no errors are passed in', function() {
    const next = sinon.fake();
    errorHandler(null, null, null, next);
    expect(next).to.have.been.called;
  });

  it('should return a json object on http errors detailing the error', function() {
    const res = {
      json: sinon.fake()
    };

    res.status = sinon.fake.returns(res);

    errorHandler(new Error(), null, res, null);

    expect(res.status).to.have.been.calledWith(500);
  });
});

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { ValidationError } = require('express-json-validator-middleware');

const schemaErrorHandler = require('../../src/middlewares/schemaErrorHandler');

chai.use(sinonChai);

const { expect } = chai;

describe('Schema error middleware', function() {
  it('should forward errors to next middleware if no schema errors are present', function() {
    const next = sinon.fake();
    const err = new Error();
    schemaErrorHandler(err, null, null, next);
    expect(next).to.have.been.calledWith(err);
  });

  it('should return a json object on schema errors detailing the error', function() {
    const res = {
      json: sinon.fake()
    };

    res.status = sinon.fake.returns(res);

    schemaErrorHandler(new ValidationError(), null, res, null);

    expect(res.status).to.have.been.calledWith(400);
  });
});

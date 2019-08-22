const chai = require('chai');
const { authenticateUser } = require('../../src/services/user');

const { expect } = chai;

describe('User service', function() {
  describe('#authenticateUser', function() {
    const user = {
      username: 'admin',
      password: '$2b$10$vkzbkKEC02rXDFTlUoN.vOBFfo9i1xTj.2.Nkel330J./icrxYcbu'
    };

    it('should return a user details object with a valid JWT token on successful authentication', async function() {
      const result = await authenticateUser(user, 'password');

      expect(result).to.be.an('object');
    });

    it('should return false if authentication is unsuccessful', async function() {
      const result = await authenticateUser(user, 'wrongassword');

      expect(result).to.be.false;
    });
  });
});

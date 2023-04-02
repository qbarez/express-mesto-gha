const { StatusCode } = require('../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.UNAUTHORIZED_CODE;
  }
}
module.exports = UnauthorizedError;

const { StatusCode } = require('../constants');

class BadRequestError extends Error {
  constructor(message = 'Переданы некорректные данные') {
    super(message);
    this.statusCode = StatusCode.BAD_REQUEST_ERROR_CODE;
    this.message = message;
  }
}

module.exports = BadRequestError;

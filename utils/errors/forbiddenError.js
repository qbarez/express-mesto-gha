const { StatusCode } = require('../constants');

class ForbiddenError extends Error {
  constructor(marker, message = 'Недостаточно прав') {
    super(message);
    this.statusCode = StatusCode.FORBIDDEN_ERROR_CODE;
    this.message = message;
    this.marker = this.messageHandler(marker);
  }

  messageHandler(marker) {
    if (marker === 'card') {
      this.message = 'Можно удалять только свои карточки';
    }
  }
}
module.exports = ForbiddenError;

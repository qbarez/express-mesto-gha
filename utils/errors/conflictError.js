const { StatusCode } = require('../constants');

class ConflictError extends Error {
  constructor(marker, message = 'При обращении к ресурсу возник конфликт') {
    super(message);
    this.statusCode = StatusCode.CONFLICT_STATUS_CODE;
    this.message = message;
    this.marker = this.messageHandler(marker);
  }

  messageHandler(marker) {
    if (marker === 'email') {
      this.message = 'Пользователь с таким email уже существует';
    }
  }
}
module.exports = ConflictError;

const { StatusCode } = require('../constants');

class NotFoundError extends Error {
  constructor(marker, message = 'Передан некорректный ID') {
    super(message);
    this.statusCode = StatusCode.NOT_FOUND_STATUS_CODE;
    this.message = message;
    this.marker = this.messageHandler(marker);
  }

  messageHandler(marker) {
    if (marker === 'card') {
      this.message = 'Карточка с таким ID не найдена';
    } else if (marker === 'user') {
      this.message = 'Запрашиваемый пользователь не найден';
    } else if (marker === 'page') {
      this.message = 'Страница не найдена';
    }
  }
}
module.exports = NotFoundError;

const { StatusCode } = require('../utils/constants');

const errorsHandler = (err, req, res, next) => {
  const { statusCode = StatusCode.INTERNAL_SERVER_ERROR_CODE, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === StatusCode.INTERNAL_SERVER_ERROR_CODE
        ? 'Произошла непредвиденная ошибка'
        : message,
  });
  next();
};

module.exports = {
  errorsHandler,
};

const NotFoundError = require('../utils/errors/notFoundError');

const incorrectRouteHandler = (req, res, next) => {
  next(new NotFoundError('page'));
};

module.exports = {
  incorrectRouteHandler,
};

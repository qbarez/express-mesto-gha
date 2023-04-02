const Card = require('../models/card');
const { cardResFormat } = require('../utils/utils');
const { StatusCode } = require('../utils/constants');
const NotFoundError = require('../utils/errors/notFoundError');
const BadRequestError = require('../utils/errors/badRequestError');
const ForbiddenError = require('../utils/errors/forbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => cards.map((card) => cardResFormat(card)))
    .then((cards) => res.status(StatusCode.OK_STATUS_CODE).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(StatusCode.CREATED_STATUS_CODE).send(cardResFormat(card)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(new NotFoundError('card'))
    .then((card) => {
      const currnetUserId = req.user._id;
      const cardOwnerId = card.owner._id.toString();
      if (currnetUserId !== cardOwnerId) {
        throw new ForbiddenError('card');
      }

      return Card.findByIdAndRemove(req.params._id);
    })
    .then((card) => {
      res.status(StatusCode.OK_STATUS_CODE).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('card'))
    .then((card) => {
      res.status(StatusCode.OK_STATUS_CODE).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('card'))
    .then((card) => {
      res.status(StatusCode.OK_STATUS_CODE).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

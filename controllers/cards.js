const Card = require('../models/card');
const {
  OK_STATUS_CODE,
  CREATED_STATUS_CODE,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_STATUS_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/responseStatusCode');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      OK_STATUS_CODE(cards);
    })
    .catch((err) => {
      SERVER_ERROR_CODE(res, `Внутренняя ошибка сервера: ${err}`);
    });
};

function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      CREATED_STATUS_CODE(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        BAD_REQUEST_ERROR_CODE(res, `Переданы некорректные данные: ${err}`);
        return;
      }
      SERVER_ERROR_CODE(res, `Внутренняя ошибка сервера: ${err}`);
    });
}

const deleteCard = (req, res) => {
  const id = req.params.cardId;
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (!card) {
        NOT_FOUND_STATUS_CODE(res, `Карточки с таким id ${id} не найдено`);
        return;
      }
      OK_STATUS_CODE(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        BAD_REQUEST_ERROR_CODE(res, `Переданы некорректные данные: ${err}`);
        return;
      }
      SERVER_ERROR_CODE(res, `Внутренняя ошибка сервера: ${err}`);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        NOT_FOUND_STATUS_CODE(
          res,
          `Карточки с таким id ${req.params.cardId} не найдено`,
        );
        return;
      }
      OK_STATUS_CODE(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        BAD_REQUEST_ERROR_CODE(res, `Переданы некорректные данные: ${err}`);
        return;
      }
      SERVER_ERROR_CODE(res, `Внутренняя ошибка сервера: ${err}`);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        NOT_FOUND_STATUS_CODE(
          res,
          `Карточки с таким id ${req.params.cardId} не найдено`,
        );
        return;
      }
      OK_STATUS_CODE(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        BAD_REQUEST_ERROR_CODE(res, `Переданы некорректные данные: ${err}`);
        return;
      }
      SERVER_ERROR_CODE(res, `Внутренняя ошибка сервера: ${err}`);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

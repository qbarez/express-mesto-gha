const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidation,
  idValidation,
} = require('../middlewares/requetsValidation');

cardsRouter.get('/', getCards);

cardsRouter.post('/', createCardValidation, createCard);

cardsRouter.delete('/:_id', idValidation, deleteCard);

cardsRouter.put('/:_id/likes', idValidation, likeCard);

cardsRouter.delete('/:_id/likes', idValidation, dislikeCard);

module.exports = cardsRouter;

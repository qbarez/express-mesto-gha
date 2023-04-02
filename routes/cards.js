const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  removeCardLike,
} = require('../controllers/cards');
const {
  createCardValidation,
  idValidation,
} = require('../middlewares/requetsValidation');

cardsRouter.get('/', getCards);

cardsRouter.post('/', createCardValidation, createCard);

cardsRouter.delete('/:_id', idValidation, deleteCard);

cardsRouter.put('/:_id/likes', idValidation, setCardLike);

cardsRouter.delete('/:_id/likes', idValidation, removeCardLike);

module.exports = cardsRouter;

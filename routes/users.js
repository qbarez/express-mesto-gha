const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  patchUserProfile,
  patchUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  idValidation,
  patchUserValidation,
  patchAvatarValidation,
} = require('../middlewares/requetsValidation');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getCurrentUser);

usersRouter.get('/:_id', idValidation, getUserById);

usersRouter.patch('/me', patchUserValidation, patchUserProfile);

usersRouter.patch('/me/avatar', patchAvatarValidation, patchUserAvatar);

module.exports = usersRouter;

const usersRouter = require('express').Router();
const {
  getUsers, getUserById, createUser, patchUserProfile, patchUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:id', getUserById);

usersRouter.post('/users', createUser);

usersRouter.patch('/me', patchUserProfile);

usersRouter.patch('/me/avatar', patchUserAvatar);

module.exports = usersRouter;

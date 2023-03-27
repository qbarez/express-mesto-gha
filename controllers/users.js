const User = require('../models/user');
const {
  OK_STATUS_CODE,
  CREATED_STATUS_CODE,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_STATUS_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/responseStatusCode');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => OK_STATUS_CODE(res, users))
    .catch((err) => SERVER_ERROR_CODE(res, `Внутренняя ошибка сервера: ${err}`));
};

const getUserById = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        NOT_FOUND_STATUS_CODE(res, 'Запрашиваемый пользователь не найден');
      }
      return OK_STATUS_CODE(res, user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        BAD_REQUEST_ERROR_CODE(res, 'Некорректный id пользователя');
      } else {
        SERVER_ERROR_CODE(res, `Внутренняя ошибка сервера: ${err}`);
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      CREATED_STATUS_CODE(res, user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        BAD_REQUEST_ERROR_CODE(res, `Переданы некорректные данные: ${err}`);
      } else {
        SERVER_ERROR_CODE(res, `Внутренняя ошибка сервера: ${err}`);
      }
    });
};

const patchUserProfile = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      OK_STATUS_CODE(res, user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        BAD_REQUEST_ERROR_CODE(res, `Переданы некорректные данные: ${err}`);
      } else {
        SERVER_ERROR_CODE(res, `Внутренняя ошибка сервера: ${err}`);
      }
    });
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      OK_STATUS_CODE(res, user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        BAD_REQUEST_ERROR_CODE(res, `Переданы некорректные данные: ${err}`);
      } else {
        SERVER_ERROR_CODE(res, `Внутренняя ошибка сервера: ${err}`);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUserProfile,
  patchUserAvatar,
};

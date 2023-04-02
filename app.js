const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const { auth } = require('./middlewares/auth');
const {
  signInValidation,
  signUpValidation,
} = require('./middlewares/requetsValidation');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { incorrectRouteHandler } = require('./middlewares/incorrectRouteHandler');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
app.listen(PORT, () => {
  console.warn(`App listening on port ${PORT}`);
});

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.warn('db connected');
  })
  .catch(() => {
    console.error('db connection error');
  });

app.use(cookieParser());

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);

app.use(auth);

app.use('/cards', cardsRoutes);
app.use('/users', usersRoutes);
app.use('*', incorrectRouteHandler);

app.use(errors());
app.use(errorsHandler);

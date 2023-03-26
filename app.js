const express = require('express');
const mongoose = require('mongoose');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const {
  NOT_FOUND_STATUS_CODE,
} = require('./utils/responseStatusCode');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('db connected');
  })
  .catch(() => {
    console.log('db connection error');
  });

app.use((req, res, next) => {
  req.user = {
    _id: '641a0ffa7d0c6b1852545644',
  };

  next();
});

app.use('/', cardsRoutes);

app.use('/', usersRoutes);

app.use('*', (req, res) => {
  NOT_FOUND_STATUS_CODE(res, `Запрашиваемый ресурс ${req.path} не найден.`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

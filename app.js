/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

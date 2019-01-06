const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

mongoose
  .connect('mongodb://127.0.0.1:27017/NodeRestfulApiCrud', { useNewUrlParser: true })
  .then(() => {
    app.listen(3000, () => {
      console.info('App is connected to database and running...');
    });
  });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authorRoutes = require('./routes/authors');
const bookRoutes = require('./routes/books');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler.catch);

mongoose
  .connect('mongodb://127.0.0.1:27017/NodeRestfulApiCrud', { useNewUrlParser: true })
  .then(() => {
    app.listen(3000, () => {
      console.info('App is connected to database and running...');
    });
  });

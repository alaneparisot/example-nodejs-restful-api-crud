require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const authorRoutes = require('./routes/authors');
const bookRoutes = require('./routes/books');
const errorHandler = require('./middlewares/error-handler');
const db = require('./db/db');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

// Error Handler
app.use(errorHandler.catch);

// Initialization
if (process.env.NODE_ENV !== 'test') {
  init();
}

async function init () {
  // Database Connection
  await db.connect();

  // Event Listener
  await app.listen(process.env.PORT);
  console.info(`App is RUNNING on port ${process.env.PORT}.`);
};

module.exports = {app, init};

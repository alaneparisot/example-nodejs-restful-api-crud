const { Router } = require('express');

const bookController = require('../controllers/books');
const bookValidators = require('../middlewares/book-validators');
const isValid = require('../middlewares/is-valid');

const router = Router();

// POST /books
router.post('/',
  bookValidators.insert('create'), isValid,
  bookController.postBook);

// GET /books
router.get('/', bookController.getBooks);

// GET /books/:id
router.get('/:id',
  bookValidators.insert('find'), isValid,
  bookController.getBook);

// PATCH /books/:id
router.patch('/:id',
  bookValidators.insert('find'), isValid,
  bookController.patchBook);

// DELETE /books/:id
router.delete('/:id',
  bookValidators.insert('find'), isValid,
  bookController.deleteBook);

module.exports = router;

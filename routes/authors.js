const { Router } = require('express');

const authorController = require('../controllers/authors');
const authorValidators = require('../middlewares/author-validators');
const isValid = require('../middlewares/is-valid');

const router = Router();

// POST /authors
router.post('/',
  authorValidators.insert('create'), isValid,
  authorController.postAuthor);

// GET /authors
router.get('/', authorController.getAuthors);

// GET /authors/:id
router.get('/:id',
  authorValidators.insert('find'), isValid,
  authorController.getAuthor);

// PATCH /authors/:id
router.patch('/:id',
  authorValidators.insert('find'),
  authorValidators.insert('update'), isValid,
  authorController.patchAuthor);

// DELETE /authors/:id
router.delete('/:id',
  authorValidators.insert('find'), isValid,
  authorController.deleteAuthor);

module.exports = router;

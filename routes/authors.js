const { Router } = require('express');

const authorController = require('../controllers/authors');
const isValid = require('../middlewares/is-valid');

const router = Router();

// POST /authors
router.post('/',
  authorController.addValidators('create'), isValid,
  authorController.postAuthor);

// GET /authors
router.get('/', authorController.getAuthors);

// GET /authors/:id
router.get('/:id',
  authorController.addValidators('find'), isValid,
  authorController.getAuthor);

// PATCH /authors/:id
router.patch('/:id',
  authorController.addValidators('find'),
  authorController.addValidators('update'), isValid,
  authorController.patchAuthor);

// DELETE /authors/:id
router.delete('/:id',
  authorController.addValidators('find'), isValid,
  authorController.deleteAuthor);

module.exports = router;

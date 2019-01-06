const { Router } = require('express');

const bookController = require('../controllers/books');

const router = Router();

// POST /books
router.post('/', bookController.postBook);

// GET /books
router.get('/', bookController.getBooks);

// GET /books/:id
router.get('/:id', bookController.getBook);

// PATCH /books/:id
router.patch('/:id', bookController.patchBook);

// DELETE /books/:id
router.delete('/:id', bookController.deleteBook);

module.exports = router;
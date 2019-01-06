const { Router } = require('express');

const authorController = require('../controllers/authors');

const router = Router();

// POST /authors
router.post('/', authorController.postAuthor);

// GET /authors
router.get('/', authorController.getAuthors);

// GET /authors/:id
router.get('/:id', authorController.getAuthor);

// PATCH /authors/:id
router.patch('/:id', authorController.patchAuthor);

// DELETE /authors/:id
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
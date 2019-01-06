const { Router } = require('express');

const authorController = require('../controllers/authors');

const router = Router();

// POST /authors
router.post('/', authorController.postAuthor);

module.exports = router;
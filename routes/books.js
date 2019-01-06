const { Router } = require('express');

const bookController = require('../controllers/books');

const router = Router();

// POST /books
router.post('/', bookController.postBook);

module.exports = router;
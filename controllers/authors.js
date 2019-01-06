const Author = require('../models/author');

// POST /authors
exports.postAuthor = async (req, res) => {
  const { name } = req.body.author;
  const newAuthor = new Author({ name });
  const author = await newAuthor.save();
  res.status(201).json({ author });
};
const Author = require('../models/author');

// POST /authors
exports.postAuthor = async (req, res) => {
  const { name } = req.body.author;
  const newAuthor = new Author({ name });
  const author = await newAuthor.save();
  res.status(201).json({ author });
};

// GET /authors
exports.getAuthors = async (req, res) => {
  const authors = await Author.find();
  res.status(200).json({ authors });
};
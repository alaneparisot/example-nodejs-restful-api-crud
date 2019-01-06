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

// GET /authors/:id
exports.getAuthor = async (req, res) => {
  const { id } = req.params;
  const author = await Author.findById(id);
  res.status(200).json({ author });
};

// PATCH /authors/:id
exports.patchAuthor = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body.author;
  const author = await Author.findByIdAndUpdate(id, { name }, { new: true });
  res.status(200).json({ author });
};

// DELETE /authors/:id
exports.deleteAuthor = async (req, res) => {
  const { id } = req.params;
  await Author.findByIdAndDelete(id);
  res.status(200).end();
};
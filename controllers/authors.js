const Author = require('../models/author');

// POST /authors
exports.postAuthor = async (req, res) => {
  const newAuthor = new Author(req.body.author);
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
  res.status(200).json({
    author: await req.author.populate('books', '-author').execPopulate()
  });
};

// PATCH /authors/:id
exports.patchAuthor = async (req, res) => {
  const author = await Author.findByIdAndUpdate(
    req.params.id,
    req.body.author,
    { new: true, runValidators: true }
  );
  res.status(200).json({ author });
};

// DELETE /authors/:id
exports.deleteAuthor = async (req, res) => {
  await Author.deleteOne({ _id: req.author._id });
  res.status(200).end();
};

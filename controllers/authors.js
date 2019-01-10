const Author = require('../models/author');

// POST /authors
exports.postAuthor = async (req, res, next) => {
  try {
    const newAuthor = new Author(req.body.author);
    const author = await newAuthor.save();
    res.status(201).json({ author });
  } catch (error) {
    next(error);
  }
};

// GET /authors
exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.status(200).json({ authors });
  } catch (error) {
    next(error);
  }
};

// GET /authors/:id
exports.getAuthor = async (req, res, next) => {
  try {
    const author = await req.author.populate('books', '-author').execPopulate();
    res.status(200).json({ author });
  } catch (error) {
    next(error);
  }
};

// PATCH /authors/:id
exports.patchAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      req.body.author,
      { new: true, runValidators: true }
    );
    res.status(200).json({ author });
  } catch (error) {
    next(error);
  }
};

// DELETE /authors/:id
exports.deleteAuthor = async (req, res, next) => {
  try {
    await Author.deleteOne({ _id: req.author._id });
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const Book = require('../models/book');
const Author = require('../models/author');

// POST /books
exports.postBook = async (req, res) => {
  try {
    const newBook = new Book(req.body.book);
    const book = await newBook.save();

    req.author.books.push(book);
    await req.author.save();

    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
};

// GET /books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (error) {
    next(error);
  }
};

// GET /books/:id
exports.getBook = async (req, res) => {
  try {
    res.status(200).json({
      book: await req.book.populate('author', '-books').execPopulate()
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /books/:id
exports.patchBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body.book,
      { new: true, runValidators: true }
    );
    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

// DELETE /books/:id
exports.deleteBook = async (req, res) => {
  try {
    await Book.deleteOne({ _id: req.book._id });
    const author = await Author.findById(req.book.author);
    author.books = author.books.filter((bookId) => bookId !== req.book._id);
    await author.save();
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const Book = require('../models/book');
const Author = require('../models/author');

// POST /books
exports.postBook = async (req, res) => {
  // For now, let's assume the author exists,
  // and the book isn't already registered.
  const { title, year, authorId } = req.body.book;
  const author = await Author.findById(authorId);
  const newBook = new Book({ title, year, author: authorId });
  const book = await newBook.save();
  author.books.push(book);
  await author.save();
  res.status(201).json({ book });
};

// GET /books
exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.status(200).json({ books });
};

// GET /books/:id
exports.getBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.status(200).json({ book });
};

// PATCH /books/:id
exports.patchBook = async (req, res) => {
  const { id } = req.params;
  const update = req.body.book;
  const book = await Book.findByIdAndUpdate(id, update, { new: true });
  res.status(200).json({ book });
};
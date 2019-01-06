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
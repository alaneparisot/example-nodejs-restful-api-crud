const { body, param } = require('express-validator/check');
const { Types } = require('mongoose');

const Book = require('../models/book');
const authorValidators = require('./author-validators');

exports.insert = (method) => {
  switch (method) {

    case 'create':
      return [
        body('book.author').custom(authorValidators.findById),
        body('book.title')
          .not().isEmpty().withMessage(`Book's title is required.`)
          .isString().withMessage(`Book's title must be a string.`)
          .trim()
          .escape()
          .custom(async (title, { req }) => {
            if (await Book.findOne({ title })) {
              return Promise.reject('Book already exists.');
            }
          }),
        body('book.year')
          .not().isEmpty().withMessage(`Book's year is required.`)
          .isInt().withMessage(`Book's year must be an integer.`)
          .trim()
      ];

    case 'find':
      return [
        param('id').custom(async (id, { req }) => {

          if (!Types.ObjectId.isValid(id)) {
            return Promise.reject(`Book's ID must be a MongoDB ObjectId.`);
          }

          const book = await Book.findById(id);

          if (!book) {
            return Promise.reject(`Book doesn't exist.`);
          }

          req.book = book;
        })
      ];

    case 'update':
      return [
        body('book.title')
          .optional()
          .not().isEmpty().withMessage(`Book's title cannot be empty.`)
          .isString().withMessage(`Book's title must be a string.`)
          .trim()
          .escape(),
        body('book.year')
          .optional()
          .not().isEmpty().withMessage(`Book's year cannot be empty.`)
          .isInt().withMessage(`Book's year must be an integer.`)
          .trim()
          .escape()
      ];

  }
};

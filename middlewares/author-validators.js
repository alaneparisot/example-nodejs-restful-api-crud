const { body, param } = require('express-validator/check');
const { Types } = require('mongoose');

const Author = require('../models/author');

exports.insert = (method) => {
  switch (method) {

    case 'create':
      return [
        body('author.name')
          .not().isEmpty().withMessage(`Author's name is required.`)
          .isString().withMessage(`Author's name must be a string.`)
          .trim()
          .escape()
          .custom(async (name, { req }) => {
            if (await Author.findOne({ name })) {
              return Promise.reject('Author already exists.');
            }
          }),
        body('author.country')
          .not().isEmpty().withMessage(`Author's country is required.`)
          .isString().withMessage(`Author's country must be a string.`)
          .trim()
          .escape()
      ];

    case 'find':
      return [
        param('id').custom(exports.findById)
      ];

    case 'update':
      return [
        body('author.name')
          .optional()
          .not().isEmpty().withMessage(`Author's name cannot be empty.`)
          .isString().withMessage(`Author's name must be a string.`)
          .trim()
          .escape(),
        body('author.country')
          .optional()
          .not().isEmpty().withMessage(`Author's country cannot be empty.`)
          .isString().withMessage(`Author's country must be a string.`)
          .trim()
          .escape()
      ];

  }
};

exports.findById = async (id, { req }) => {

  if (!Types.ObjectId.isValid(id)) {
    return Promise.reject(`Author's ID must be a MongoDB ObjectId.`);
  }

  const author = await Author.findById(id);

  if (!author) {
    return Promise.reject(`Author doesn't exist.`);
  }

  req.author = author;
};

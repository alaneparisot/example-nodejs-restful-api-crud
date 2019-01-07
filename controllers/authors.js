const { body, param } = require('express-validator/check');
const { Types } = require('mongoose');

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
  res.status(200).json({ author: req.author });
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
  await Author.deleteOne({ _id: req.params.id });
  res.status(200).end();
};

// Validation
exports.addValidators = (method) => {
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
        param('id').custom(async (id, { req }) => {

          if (!Types.ObjectId.isValid(id)) {
            return Promise.reject(`Author's ID must be a MongoDB ObjectId.`);
          }

          const author = await Author.findById(id);

          if (!author) {
            return Promise.reject(`Author doesn't exist.`);
          }

          req.author = author;
        })
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

const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
});

module.exports = model('Book', bookSchema);
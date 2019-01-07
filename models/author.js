const { model, Schema } = require('mongoose');

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

module.exports = model('Author', authorSchema);

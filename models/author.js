const { model, Schema } = require('mongoose');

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = model('Author', authorSchema);
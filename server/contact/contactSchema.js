const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  relation: { type: String, required: true },
  comments: { type: String, required: false }
});

module.exports = mongoose.model('Contact', ContactSchema);

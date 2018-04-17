const mongoose = require('mongoose');
const { Schema } = mongoose;

const AllergySchema = new Schema({
  name: { type: String, required: true },
  severity: { type: Number, required: false },
  reaction: { type: String, required: false },
  comments: { type: String, required: false },
  treatment: { type: String, required: false }
});

module.exports = mongoose.model('Allergy', AllergySchema);

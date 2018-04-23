const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReactionSchema = new Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Reaction', ReactionSchema);

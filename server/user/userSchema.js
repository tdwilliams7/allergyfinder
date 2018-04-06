const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const BCRYPT_COST = 11;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, index: true },
  email: { type: String, required: true, index: true }
});

UserSchema.pre('save', function() {
  console.log(this.password);
});

module.exports = mongoose.model('User', UserSchema);

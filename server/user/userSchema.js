const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const BCRYPT_COST = 11;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, index: true },
  email: { type: String, required: true, index: true, unique: true }
});

UserSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, BCRYPT_COST)
    .then(hashed => {
      this.password = hashed;
      next();
    })
    .catch(err => {
      console.log('error hashing password');
    });
});

module.exports = mongoose.model('User', UserSchema);

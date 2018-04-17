const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Allergy = require('../allergy/allergySchema').schema;
const Contact = require('../contact/contactSchema').schema;
const Doctor = require('../doctor/doctorSchema').schema;
const { Schema } = mongoose;
const BCRYPT_COST = 11;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, index: true },
  email: { type: String, required: true, index: true, unique: true },
  profileUrl: { type: String, required: false },
  dob: { type: String, required: false },
  allergies: [Allergy],
  contacts: [Contact],
  doctors: [Doctor]
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

UserSchema.methods.checkPassword = function(plainTextPass, cb) {
  bcrypt.compare(plainTextPass, this.password, (err, isMatch) => {
    if (err) return err;
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);

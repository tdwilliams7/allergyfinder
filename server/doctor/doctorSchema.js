const mongoose = require('mongoose');
const { Schema } = mongoose;

const DoctorSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  specialty: { type: String, required: true },
  comments: { type: String, required: false }
});

module.exports = mongoose.model('Doctor', DoctorSchema);

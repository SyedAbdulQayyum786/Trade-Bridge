// models/User.js
const mongoose = require('../Config/db');

const userSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  signUpAs: { type: String, required: true }, 
  image: { type: String, required: true },
  companyDescription:{type:String, required: true},
});

const User = mongoose.model('User', userSchema);

module.exports = User;


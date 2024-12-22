const mongoose = require('../Config/db');

const gigSchema = new mongoose.Schema({
  category: { type: String, required: true },
  product:{type: String, required: true},
  description: { type: String, required: true },
  price: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true }
});

const Gig = mongoose.model('Gig', gigSchema);

module.exports = Gig;
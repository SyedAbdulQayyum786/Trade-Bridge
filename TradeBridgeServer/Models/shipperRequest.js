const mongoose = require('../Config/db');

const shipperRequestSchema = new mongoose.Schema({
  shipperId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  traderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  docLink: { type: String, required: false },
  details: { type: String, required: true },
  status: { type: String, enum: ['p', 'a', 'd', 's', 'c', 'u', 'f'], default: 'p' }, // 'p' for pending, 'a' for approved
  amount: { type: Number, default: null } // Set default to null
});

const ShipperRequest = mongoose.model('ShipperRequest', shipperRequestSchema);

module.exports = ShipperRequest;

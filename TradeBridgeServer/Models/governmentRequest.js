const mongoose = require('../Config/db');

const governmentRequestSchema = new mongoose.Schema({
  shipperId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  docLink: { type: String, required: false },
  details: { type: String, required: true },
  status: { type: String, enum: ['p', 'a', 'd'], default: 'p' } // 'p' for pending, 'a' for approved, 'd' for denied
});

const GovernmentRequest = mongoose.model('GovernmentRequest', governmentRequestSchema);

module.exports = GovernmentRequest;

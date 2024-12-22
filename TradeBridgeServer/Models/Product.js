// models/product.js
const mongoose = require('../Config/db');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
  productId: { type: Number },
  productName: { type: String, required: true },
});

productSchema.plugin(AutoIncrement, { inc_field: 'productId' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

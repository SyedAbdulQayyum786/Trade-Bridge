// models/category.js
const mongoose = require('../Config/db');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new mongoose.Schema({
  categoryId: { type: Number },
  tax:{type:Number},
  categoryName: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

// Apply auto-increment plugin to categoryId field
categorySchema.plugin(AutoIncrement, { inc_field: 'categoryId' });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

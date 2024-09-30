const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  categoryImage: { type: String },  // New field for image
  merchant: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
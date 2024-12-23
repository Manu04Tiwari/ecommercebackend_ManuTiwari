const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: String,
  category: { type: String, required: true },
  rating: Number,
  productId: { type: String, unique: true }, // Added productId field
  inStockValue: Number, // Available stock value
  soldStockValue: Number, // Number of items sold
  visibility: { type: String, default: 'on' }, // Visibility field with default 'on'
  inStockValue: { type: Number, required: true },
  soldStockValue: { type: Number, required: true },
  visibility: { type: Boolean, default: true },
  images: [{ type: String }], // Array to store image URLs
  description: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the seller
});


module.exports = mongoose.model('Product', productSchema);


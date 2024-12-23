const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
import React, { useState } from 'react';
const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  sellerId: { type: String, unique: true, required: true },
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  phoneNumber: { type: String, required: true },
  businessName: { type: String, required: true },
  businessAddress: { type: String, required: true },
  businessType: { type: String, required: true },
  otp: { type: String },
  loggedIn: { type: String, enum: ['loggedin', 'loggedout'], default: 'loggedout' }
});

// Hash password before saving
SellerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Seller', SellerSchema);



const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [token] = useState(localStorage.getItem('authToken')); // Get seller's token

  // Add Product
  const addProduct = async (productDetails) => {
    try {
      const response = await fetch('/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productDetails),
      });
      const data = await response.json();
      if (data.success) {
        setProducts([...products, data.product]);
        alert('Product added successfully!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Delete Product
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setProducts(products.filter(product => product._id !== productId));
        alert('Product removed successfully!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <button onClick={() => addProduct({ name: 'Sample Product', description: 'Sample Description', price: 100 })}>
        Add Product
      </button>
      {products.map(product => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <button onClick={() => deleteProduct(product._id)}>Delete Product</button>
        </div>
      ))}
    </div>
  );
};

export default SellerDashboard;
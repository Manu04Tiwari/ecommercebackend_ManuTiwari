const Product = require('../models/productModel');

// Controller to add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, images } = req.body; // Add other required fields
    const sellerId = req.user.id; // Assuming you're using authentication

    const newProduct = new Product({
      name,
      description,
      price,
      images,
      seller: sellerId, // Link product to the seller
    });

    await newProduct.save();

    res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding product', error: error.message });
  }
};

// Controller to delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if the logged-in seller owns the product
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this product' });
    }

    await product.remove();

    res.status(200).json({ success: true, message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error removing product', error: error.message });
  }
};

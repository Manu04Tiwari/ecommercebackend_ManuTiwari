const express = require('express');
const { addProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Route to add a new product
router.post('/add', addProduct);

// Route to delete a product
router.delete('/delete/:id', deleteProduct);

module.exports = router;

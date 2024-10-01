const express = require('express');
const {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");
const router = express.Router();
const { authenticate} = require("../middlewares/Auth")

// Public Routes
router.get('/category', getAllCategories); // Get all categories (public)
router.get('/category/:categoryId', getCategory); // Get one category (public)

// Protected Routes (Require Authentication)
router.post('/category/:merchantId', createCategory); // Create a category (auth required)
router.put('/category/:categoryId', authenticate, updateCategory); // Update a category (auth required)
router.delete('/category/:categoryId', authenticate, deleteCategory); // Delete a category (auth required)

module.exports = router;
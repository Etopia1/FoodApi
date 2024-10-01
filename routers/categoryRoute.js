const express = require('express');
const {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");
const router = express.Router();
const { authMiddleware } = require("../middlewares/categoryAuth")

// Public Routes
router.get('/category', getAllCategories); // Get all categories (public)
router.get('/category/:categoryId', getCategory); // Get one category (public)

// Protected Routes (Require Authentication)
router.post('/category/:merchantId', authMiddleware, createCategory); // Create a category (auth required)
router.put('/category/:categoryId', authMiddleware, updateCategory); // Update a category (auth required)
router.delete('/category/:categoryId', authMiddleware, deleteCategory); // Delete a category (auth required)

module.exports = router;

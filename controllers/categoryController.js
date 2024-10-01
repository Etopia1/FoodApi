const merchantModel = require(`../models/merchantModel`);
const cloudinary = require(`../utils/cloudinary`);
const Category = require(`../models/categoriModel`);
const fs = require(`fs`);

// Create a Category (Authenticated)
const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const { merchantId } = req.params;

        if (!categoryName) {
            return res.status(400).json({ message: "Category name is required." });
        }

        const merchant = await merchantModel.findById(merchantId);
        if (!merchant) {
            return res.status(404).json({ message: "Merchant not found." });
        }

        let categoryImage = null;
        if (req.files && req.files.categoryImage) {
            const file = req.files.categoryImage;
            const uploadedImage = await cloudinary.uploader.upload(file.tempFilePath);
            categoryImage = uploadedImage.secure_url;
            fs.unlink(file.tempFilePath, (err) => {
                if (err) {
                    console.log("Failed to delete the file locally:", err);
                }
            });
        }

        const newCategory = await Category.create({
            categoryName,
            categoryImage,
            merchant: merchantId,
        });

        res.status(201).json({
            message: "Category created successfully.",
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Categories (Public)
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('merchant');
        res.status(200).json({
            message: "Categories fetched successfully.",
            data: categories,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get One Category (Public)
const getCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId).populate('merchant');

        if (!category) {
            return res.status(404).json({ message: "Category not found." });
        }

        res.status(200).json({
            message: "Category fetched successfully.",
            data: category,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Category (Authenticated)
const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ message: "Category name is required." });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { categoryName },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found." });
        }

        res.status(200).json({
            message: "Category updated successfully.",
            data: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Category (Authenticated)
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found." });
        }

        res.status(200).json({
            message: "Category deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};

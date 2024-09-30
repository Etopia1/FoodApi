const merchantModel = require(`../models/merchantModel`);
const productModel = require(`../models/productModel`);
const userModel = require(`../models/userModel`)
const cloudinary = require(`../utils/cloudinary`);
const Category = require(`../models/categoriModel`);
const mongoose = require(`mongoose`)
const fs = require(`fs`);
const path = require('path');

const createCategory = async (req, res) => {
    try {
      const { categoryName } = req.body;
      const { merchantId } = req.params;
  
      // Validate input
      if (!categoryName) {
        return res.status(400).json({ message: "Category name is required." });
      }
  
      // Check if the merchant exists
      const merchant = await merchantModel.findById(merchantId);
      if (!merchant) {
        return res.status(404).json({ message: "Merchant not found." });
      }
  
      let categoryImage = null;
  
      // Check if an image file is uploaded
      if (req.files && req.files.categoryImage) {
        const file = req.files.categoryImage;
        // Upload image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(file.tempFilePath);
        categoryImage = uploadedImage.secure_url;
        fs.unlink(file.tempFilePath, (err) => {
          if (err) {
            console.log("Failed to delete the file locally:", err);
          }
        });
      }
  
      // Create a new category
      const newCategory = await categoryModel.create({
        categoryName,
        categoryImage,  // Save the uploaded image URL
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
  
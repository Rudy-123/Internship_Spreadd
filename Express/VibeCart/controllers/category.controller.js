//CRUD for the category
const Category = require("../models/category");

exports.createCategory = async (erq, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({
      name,
      description,
    });
    const savedCategory = await category.save();
    res.status(201).json({
      success: true,
      message: "Category created Successfully",
      data: savedCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getallcategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};
exports.getCategorybyId = async (req, res) => {
  try {
    const category = await Category.findbyId(req.params.id);
    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const category = await findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidatos: true,
    });
    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.statis(404).json({
        success: false,
        message: "Category Not Found",
      });
      res.status(200).json({
        success: true,
        message: "Category Deleted Successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// controllers/userController.js

const Category = require("../Models/Category");
const addCategory = async (req, res) => {
  try {
    let {categoryName,tax}= req.body 

    categoryName = req.body.categoryName.toLowerCase();
    const existingCategory = await Category.findOne({
      categoryName: categoryName,

    });
    if (existingCategory) {
      return res.status(202).json({ message: "Category already exists" });
    }
    const newCategory = new Category({ categoryName: categoryName,tax:tax });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const allcategories = async(req, res) => {
  const categories = await Category.find({}).populate("products")
  if (categories) {
    res.status(200).json({ categories: categories });
  } else {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addCategory,
  allcategories,
};

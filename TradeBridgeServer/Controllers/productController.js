const Product = require("../Models/Product");
const Category = require("../Models/Category");

const addProduct = async (req, res) => {
  const { productName, categoryId } = req.body;

  try {
    // Check if the product name already exists in the category
    const category = await Category.findOne({ categoryId: categoryId });

    const existingProduct = await Product.findOne({ productName: productName });
    console.log(existingProduct);
    if (existingProduct) {
      return res
        .status(202)
        .json({ message: "Product name already exists in the category" });
    }

    const product = new Product({
      productName: productName,
    });

    const savedProduct = await product.save();
    category.products.push(savedProduct);
    await category.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
const fetchProductByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const products = await Category.findOne({
      categoryId: categoryId,
    }).populate("products");

    if (products) {
      res.status(200).json({ products: products.products });
    } else {
      res
        .status(404)
        .json({ message: "No products found for the specified category ID" });
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const tax = async (req, res) => {
  let { name } = req.query;
  name=name.toLowerCase()
  console.log(name)
  try {
    // Find the product by name
    const product = await Product.findOne({ productName: name });

    if (!product) {
      console.log("not")
      return res.status(201).json({ message: "Product not found" })
    }

    // Log the product ID
    const productId = product._id;

    // Find the category that contains this product ID in its products array
    const category = await Category.findOne({ products: productId });

    if (!category) {
      return res
        .status(201)
        .json({ message: "Category not found for the given product" });
    }

    // Return the product and category details including tax information
    res.status(200).json({ tax: category.tax });
  } catch (error) {
    console.error("Error fetching product or category:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { addProduct, fetchProductByCategoryId, tax };

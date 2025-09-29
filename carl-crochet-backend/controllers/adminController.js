import Product from "../models/Product.js";
import Order from "../models/Order.js";

// ======== Products ========

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Add a product
export const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// Toggle stock
export const updateProductStock = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { inStock: req.body.inStock },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update stock" });
  }
};

// Update sizes
export const updateProductSizes = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { sizes: req.body.sizes },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update sizes" });
  }
};

// ======== Orders ========

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

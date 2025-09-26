import Order from "../models/Order.js";

// Create order
export const createOrder = async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      customer: {
        ...req.body.customer,
        email: req.user?.email || req.body.customer.email, // prefer token email
      },
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error while creating order" });
  }
};

// Get all orders (supports email filter)
export const getOrders = async (req, res) => {
  try {
    const { email } = req.query;
    let orders;
    if (email) {
      orders = await Order.find({ "customer.email": { $regex: new RegExp(email, "i") } }).sort({ date: -1 });
    } else {
      orders = await Order.find().sort({ date: -1 });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching order" });
  }
};

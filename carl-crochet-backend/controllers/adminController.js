import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { sendEmail } from "../utils/sendEmail.js"; // email utility

        //Products
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

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

         //  Orders 
// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const normalizedOrders = orders.map((order) => ({
      ...order.toObject(),
      id: order._id,
    }));
    res.json(normalizedOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Update order status with shipping info and send email
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, shippingDay, shippingDate } = req.body; 
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });
    let sendEmailFlag = false;

    // Update status
    if (status && status !== order.status) {
      order.status = status;

      if (status === "To Be Shipped") {
        order.shippingDay = shippingDay;
        order.shippingDate = shippingDate;
        sendEmailFlag = true;
      } 
      else if (status === "Delivered") {
        if (!order.shippingDate) {
          return res.status(400).json({ message: "Cannot deliver order without shipping info" });
        }
        sendEmailFlag = true;
      }
      else if (status === "Cancelled") {
        sendEmailFlag = true;
      }
    }

    await order.save();

    // Send email only if needed
    if (sendEmailFlag) {
      const itemsList = Object.keys(order.items)
        .map((productId) => {
          const itemSizes = order.items[productId];
          return Object.keys(itemSizes)
            .map((size) => {
              const qty = itemSizes[size];
              return `<li>${productId} (Size: ${size}) × ${qty}</li>`;
            })
            .join("");
        })
        .join("");

      let message = "";
      if (order.status === "To Be Shipped") {
        message = `<p>Your order will be shipped to the pickup agent you provided on checkout.</p>
                   <p>Shipping Day: ${order.shippingDay}, Shipping Date: ${new Date(order.shippingDate).toLocaleDateString()}</p>`;
      } 
      else if (order.status === "Delivered") {
        message = `<p>Your order has been delivered. We hope you enjoy your purchase!</p>`;
      }
      else if (order.status === "Cancelled") {
        message = `<p>We are very sorry, but your order is out of stock and has been cancelled.</p>`;
      }

      const emailContent = `
        <h2>Your Carl Crochet Order Update</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Items:</strong></p>
        <ul>${itemsList}</ul>
        <p><strong>Status:</strong> ${order.status}</p>
        ${message}
        <p>Thank you for shopping with Carl Crochet!</p>
      `;

      await sendEmail(order.customer.email, "Your Carl Crochet Order Update", emailContent);
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

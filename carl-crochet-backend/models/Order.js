import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: { type: Object, required: true },
  customer: {
    name: String,
    email: String,
    phone: String,
    county: String,   // ✅ added county
    address: String,
  },
  delivery: {
    name: String,     // ✅ pickup agent name
    fee: Number,      // ✅ pickup agent fee
  },
  total: { type: Number, required: true },
  payment: { type: String, default: "Cash on Delivery" },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], 
    default: "Pending",
  },
  date: { type: Date, default: Date.now },
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model("Order", orderSchema);

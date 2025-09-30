import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: { type: Object, required: true },
  customer: {
    name: String,
    email: String,
    phone: String,
    county: String, 
    address: String,
  },
  delivery: {
    name: String,     
    fee: Number,   
  },
  total: { type: Number, required: true },
  payment: { type: String, default: "Cash on Delivery" },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipping", "Delivered", "Cancelled"], 
    default: "Pending",
  },
  date: { type: Date, default: Date.now },
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._v;
  },
});

export default mongoose.model("Order", orderSchema);

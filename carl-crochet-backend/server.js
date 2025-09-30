import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// ===== CORS Setup =====
const allowedOrigins = [
  "http://localhost:3000",   // React default
  "http://localhost:5173",   // Vite default
  "https://ccsharon26.github.io",       // GH Pages base
  "https://ccsharon26.github.io/Crochet" // GH Pages repo path
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin) return callback(null, true);

      // Allow if origin starts with any allowed origin
      if (allowedOrigins.some(o => origin.startsWith(o))) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ===== Middleware =====
app.use(express.json());

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

// ===== MongoDB Connection =====
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ===== Default Route =====
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

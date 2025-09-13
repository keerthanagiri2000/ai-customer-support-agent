import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS to allow requests from frontend
app.use(
  cors({
    origin: ["https://customer-support-ai.netlify.app"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Connect to MongoDB
connectDb();

// Middleware to Parse Json
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: "Too many requests, please try again later."
  },
});

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message })
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
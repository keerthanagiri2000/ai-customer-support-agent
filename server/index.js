import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Enable CORS to allow requests from frontend
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Connect to MongoDB
connectDb();

// Middleware to Parse Json
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
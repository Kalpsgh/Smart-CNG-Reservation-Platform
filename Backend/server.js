import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoute.js";



dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/pump", bookingRoutes);

app.listen(5000, () =>
  console.log("Server Running")
);
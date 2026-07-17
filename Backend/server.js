import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoute.js";
import dns from 'dns';

dns.setServers(["1.1.1.1","8.8.8.8"]);



dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/pump", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
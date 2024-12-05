import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import { FRONTEND_URL, PORT } from "./config/config";
import productRoutes from "./routes/productRoute";
import authRoutes from "./routes/authRoute";
import cartRoutes from "./routes/cartRoute";
import paymentRoutes from "./routes/paymentRoute";

export const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/stripe", paymentRoutes);

app.listen(PORT);
console.log("Server running on port", PORT);

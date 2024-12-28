import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import { FRONTEND_URL, PORT } from "./config/config";
import productRoutes from "./routes/productRoute";
import userRoutes from "./routes/userRoute";
import cartRoutes from "./routes/cartRoute";
import paymentRoutes from "./routes/paymentRoute";
import orderRoutes from "./routes/orderRoute";

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
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/stripe", paymentRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT);
console.log("Server running on port", PORT);

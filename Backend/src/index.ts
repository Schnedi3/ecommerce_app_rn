import express from "express";
import cors from "cors";

import { FRONTEND_URL, PORT } from "./config/config";
import productRoutes from "./routes/productRoute";
import authRoutes from "./routes/authRoute";

export const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT);
console.log("Server running on port", PORT);

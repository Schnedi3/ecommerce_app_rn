import express from "express";
import cors from "cors";

import { FRONTEND_URL, PORT } from "./config/config";
import productRoutes from "./routes/productRoute";

export const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productRoutes);

app.listen(PORT);
console.log("Server running on port", PORT);

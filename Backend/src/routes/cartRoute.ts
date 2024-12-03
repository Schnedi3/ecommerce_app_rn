import { Router } from "express";
import { requireAuth } from "@clerk/express";

import {
  getCart,
  addToCart,
  deleteFromCart,
} from "../controllers/cartController";

const router = Router();

router.get("/", requireAuth(), getCart);
router.post("/:id", requireAuth(), addToCart);
router.delete("/:id", requireAuth(), deleteFromCart);

export default router;

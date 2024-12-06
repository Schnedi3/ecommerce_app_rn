import { Router } from "express";
import { requireAuth } from "@clerk/express";

import { addOrder, getUserOrders } from "../controllers/orderController";

const router = Router();

router.post("/", requireAuth(), addOrder);
router.get("/user", requireAuth(), getUserOrders);

export default router;

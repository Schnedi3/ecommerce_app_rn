import { Router } from "express";
import { requireAuth } from "@clerk/express";

import { paymentSheet } from "../controllers/paymentController";

const router = Router();

router.post("/payment-sheet", requireAuth(), paymentSheet);

export default router;

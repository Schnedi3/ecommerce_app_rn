import { Router } from "express";

import { User } from "../controllers/authController";

const router = Router();

router.post("/", User);

export default router;

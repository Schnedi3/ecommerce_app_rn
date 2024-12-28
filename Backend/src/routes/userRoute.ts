import { Router } from "express";

import { saveUser } from "../controllers/userController";

const router = Router();

router.post("/", saveUser);

export default router;

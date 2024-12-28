import { Request, Response } from "express";

import { saveUserDB } from "../database/userDB";
import { createCartDB } from "../database/cartDB";

export const saveUser = async (req: Request, res: Response): Promise<void> => {
  const { id, firstName, lastName, email } = req.body;

  try {
    const result = await saveUserDB(id, firstName, lastName, email);

    // create cart
    await createCartDB(result.id);

    res.status(200).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

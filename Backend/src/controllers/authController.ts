import { Request, Response } from "express";

import { UserDB } from "../database/authDB";

export const User = async (req: Request, res: Response): Promise<void> => {
  const { id, name, email } = req.body;

  try {
    await UserDB(id, name, email);

    res.status(200).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

import { Request, Response } from "express";

import { addOrderDB, getUserOrdersDB } from "../database/orderDB";
import { emptyCartDb, getCartByUserDB } from "../database/cartDB";

export const addOrder = async (req: Request, res: Response): Promise<void> => {
  const { userId } = (req as any).auth;
  const { totalCart } = req.body;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const cartId = await getCartByUserDB(userId);
    const result = await addOrderDB(userId, cartId, totalCart);

    // empty cart
    await emptyCartDb(cartId);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = (req as any).auth;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const result = await getUserOrdersDB(userId);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

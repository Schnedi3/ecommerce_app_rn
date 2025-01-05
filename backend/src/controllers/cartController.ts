import { Request, Response } from "express";
import { getAuth } from "@clerk/express";

import {
  addToCartDB,
  getCartByUserDB,
  getCartDB,
  deleteFromCartDB,
} from "../database/cartDB";

export const getCart = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const cartId = await getCartByUserDB(userId);
    const result = await getCartDB(cartId);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  const productId = Number(req.params.id);
  const { quantity } = req.body;
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const cartId = await getCartByUserDB(userId);
    await addToCartDB(cartId, productId, quantity);

    res.status(200).json({ message: "Product added to cart" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFromCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productId = Number(req.params.id);
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const cartId = await getCartByUserDB(userId);
    await deleteFromCartDB(cartId, productId);

    res.status(200).json({ message: "Product removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

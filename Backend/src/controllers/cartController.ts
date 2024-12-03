import { Request, Response } from "express";

import {
  addToCartDB,
  createCartDB,
  getCartDB,
  deleteFromCartDB,
} from "../database/cartDB";

export const getCart = async (req: Request, res: Response): Promise<void> => {
  const { userId } = (req as any).auth;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const cartId = await createCartDB(userId);
    const result = await getCartDB(cartId);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  const productId = Number(req.params.id);
  const { quantity } = req.body;
  const { userId } = (req as any).auth;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const cartId = await createCartDB(userId);
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
  const { userId } = (req as any).auth;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const cartId = await createCartDB(userId);
    await deleteFromCartDB(cartId, productId);

    res.status(200).json({ message: "Product removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

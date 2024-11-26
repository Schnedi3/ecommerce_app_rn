import { Request, Response } from "express";

import { getProductsDB, getProductDB } from "../database/productDB";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getProductsDB();

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  try {
    const result = await getProductDB(id);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

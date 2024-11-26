import { pool } from "./db";

export const getProductsDB = async (): Promise<any> => {
  const getProductsQuery = `SELECT * FROM product`;

  const result = await pool.query(getProductsQuery);
  return result.rows;
};

export const getProductDB = async (id: number): Promise<any> => {
  const getProductQuery = `
    SELECT * FROM product
    WHERE id = $1`;

  const result = await pool.query(getProductQuery, [id]);
  return result.rows[0];
};

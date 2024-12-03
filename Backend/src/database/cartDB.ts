import { pool } from "./db";

export const createCartDB = async (userId: string) => {
  const findCartQuery = `
    SELECT id FROM cart
    WHERE user_id = $1`;

  const foundCart = await pool.query(findCartQuery, [userId]);

  if (foundCart.rows.length === 0) {
    const createCartQuery = `
      INSERT INTO cart (user_id)
      VALUES ($1)
      RETURNING *`;
    const resultCreate = await pool.query(createCartQuery, [userId]);
    return resultCreate.rows[0];
  }

  return foundCart.rows[0].id;
};

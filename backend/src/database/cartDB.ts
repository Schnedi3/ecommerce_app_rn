import { pool } from "./db";

export const createCartDB = async (userId: string) => {
  const createCartQuery = `
    INSERT INTO cart (user_id)
    VALUES ($1)
    RETURNING *`;

  await pool.query(createCartQuery, [userId]);
};

export const getCartByUserDB = async (userId: string) => {
  const findCartQuery = `
    SELECT id FROM cart
    WHERE user_id = $1`;

  const result = await pool.query(findCartQuery, [userId]);
  return result.rows[0].id;
};

export const getCartDB = async (cartId: number) => {
  const getCartQuery = `
    SELECT p.id AS product_id, p.title, p.image, p.price, ci.quantity
    FROM cart_item ci
    JOIN product p ON ci.product_id = p.id
    WHERE ci.cart_id = $1`;

  const result = await pool.query(getCartQuery, [cartId]);
  return result.rows;
};

export const addToCartDB = async (
  cartId: number,
  productId: number,
  quantity: number
) => {
  const addToCartQuery = `
    INSERT INTO cart_item (cart_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *`;

  await pool.query(addToCartQuery, [cartId, productId, quantity]);
};

export const deleteFromCartDB = async (cartId: number, productId: number) => {
  const deleteFromCartQuery = `
    DELETE FROM cart_item
    WHERE cart_id = $1
    AND product_id = $2`;

  await pool.query(deleteFromCartQuery, [cartId, productId]);
};

export const emptyCartDB = async (cartId: number) => {
  const emptyCartQuery = `
    DELETE FROM cart_item
    WHERE cart_id = $1`;

  await pool.query(emptyCartQuery, [cartId]);
};

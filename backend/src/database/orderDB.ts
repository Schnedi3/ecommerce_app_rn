import { pool } from "./db";

export const addOrderDB = async (
  userId: string,
  cartId: number,
  totalCart: number
) => {
  const addOrderQuery = `
    INSERT INTO orders (user_id, cart_id, total)
    VALUES ($1, $2, $3)
    RETURNING *`;

  const result = await pool.query(addOrderQuery, [userId, cartId, totalCart]);

  const addOrderItemQuery = `
    INSERT INTO order_item (order_id, product_id, quantity)
    SELECT $1, product_id, quantity
    FROM cart_item
    WHERE cart_id = $2
    RETURNING *`;

  await pool.query(addOrderItemQuery, [result.rows[0].id, cartId]);
  return result.rows[0];
};

export const getUserOrdersDB = async (userId: string) => {
  const getUserOrdersQuery = `
    SELECT p.image, p.title, oi.quantity, p.price, (oi.quantity * p.price) AS total_price, o.createdAt
    FROM "order" o
    JOIN order_item oi ON o.id = oi.order_id
    JOIN product p ON oi.product_id = p.id
    WHERE o.user_id = $1
    ORDER BY o.createdAt DESC;`;

  const result = await pool.query(getUserOrdersQuery, [userId]);
  return result.rows;
};

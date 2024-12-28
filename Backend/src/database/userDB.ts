import { pool } from "./db";

export const saveUserDB = async (
  id: string,
  firstName: string,
  lastName: string,
  email: string
) => {
  const saveUserQuery = `
    INSERT INTO users (id, first_name, last_name, email)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (id) DO NOTHING
    RETURNING *`;

  const result = await pool.query(saveUserQuery, [
    id,
    firstName,
    lastName,
    email,
  ]);

  if (result.rows.length === 0) {
    throw new Error("User already exists");
  }

  return result.rows[0];
};

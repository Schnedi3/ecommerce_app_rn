import { pool } from "./db";

export const UserDB = async (id: string, name: string, email: string) => {
  const getUserQuery = `
    SELECT * FROM "user"
    WHERE id = $1`;

  const foundUser = await pool.query(getUserQuery, [id]);

  if (foundUser.rows.length === 0) {
    const saveUserQuery = `
      INSERT INTO "user" (id, name, email)
      VALUES ($1, $2, $3)
      RETURNING *`;

    const savedUser = await pool.query(saveUserQuery, [id, name, email]);
    return savedUser.rows[0];
  }

  return foundUser.rows[0];
};

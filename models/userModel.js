import pool from "../config/db.js";

export const findByEmail = async (email) => {

    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    return rows[0] || null;
}


export const create = async (email, passwordHash) => {
  const { rows } = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at",
    [email, passwordHash]
  );
  return rows[0];
};
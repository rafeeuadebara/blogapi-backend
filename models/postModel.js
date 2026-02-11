import pool from "../config/db.js";

export const getAllPosts = async () => {
  const { rows } = await pool.query(
    `SELECT posts.id, posts.title, posts.content, posts.created_at, users.email
     FROM posts
     JOIN users ON users.id = posts.user_id
     ORDER BY posts.created_at DESC`
  );
  return rows;
};


export const getPostById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

export const createPost = async (userId, title, content) => {
  const { rows } = await pool.query(
    `INSERT INTO posts (user_id, title, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, title, content]
  );
  return rows[0];
};

export const updatePost = async (id, userId, title, content) => {
  const { rows } = await pool.query(
    `UPDATE posts 
     SET title = $1, content = $2 
     WHERE id = $3 AND user_id = $4
     RETURNING *`,
    [title, content, id, userId]
  );
  return rows[0] || null;
};

export const deletePost = async (id, userId) => {
  const { rowCount } = await pool.query(
    "DELETE FROM posts WHERE id = $1 AND user_id = $2",
    [id, userId]
  );
  return rowCount > 0;
};

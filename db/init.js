import pool from "../config/db.js";
import fs from "fs";
import path from "path";

async function runMigrations() {
  try {
    const filePath = path.join(process.cwd(), "db", "schema.sql");
    const sql = fs.readFileSync(filePath, "utf8");
    await pool.query(sql);
  } catch (err) {
    console.error("Failed to apply schema:", err);
    process.exit(1);
  }
}

export default runMigrations;

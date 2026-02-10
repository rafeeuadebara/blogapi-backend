import "dotenv/config";
import express from "express";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cors from "cors";

const app = express();


if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing");
  process.exit(1);
}

// middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 8000;



// Starts the HTTP server
app.listen(PORT, () => {});


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userModel from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ error: "email and password required" });
   
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ error: "password must be at least 8 characters" });
    }

    const existing = await userModel.findByEmail(email);
    if (existing) return res.status(409).json({ error: "email already in use" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await userModel.create(email, passwordHash);

    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const user = await userModel.findByEmail(email);
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "invalid credentials" });

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal server error" });
  }
};

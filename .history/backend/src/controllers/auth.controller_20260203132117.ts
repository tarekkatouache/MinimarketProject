// login controller
import { Request, Response } from "express";
import prisma from "../utiles/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log("LOGIN REQ BODY 👉", req.body);
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" },
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error("LOGIN ERROR 👉", error);
    return res.status(500).json({
      message: "Internal server error during login",
      error: error instanceof Error ? error.message : error,
    });
  }
};

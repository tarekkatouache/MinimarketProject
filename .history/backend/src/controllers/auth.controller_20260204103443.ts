// login controller
import { Request, Response } from "express";
import prisma from "../utiles/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utiles/jwt";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const login = async (req: Request, res: Response) => {
  try {
    // ✅ ADD VALIDATION FIRST
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "Request body is empty or missing",
        hint: "Check Content-Type header is application/json",
      });
    }

    const { username, password } = req.body;
    // ✅ Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required",
        received: { username: !!username, password: !!password },
      });
    }

    // Rest of your login logic...
    console.log("Login attempt for username:", username);

    // 1. Find user
    const user = await prisma.user.findUnique({
      where: {
        username: username.trim(), // Trim whitespace
        is_active: true,
      },
    });

    if (!user) {
      console.log("User not found:", username);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log("Password to check:", password);
    console.log("Stored hash:", user.password_hash);
    console.log("Hash length:", user.password_hash?.length);

    // 2. Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      console.log("Invalid password for user:", username);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { last_login: new Date() },
    });

    // 4. Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "8h",
    });

    // 5. Return user info (without password) and token
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
    // audit log // TODO
  } catch (error: any) {
    console.error("Login error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// logout controller
export const logout = async (req: Request, res: Response) => {
  try {
    // Since JWT is stateless, logout can be handled on the client side by deleting the token.
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

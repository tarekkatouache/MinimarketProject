// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const JWT_SECRET =
  process.env.JWT_SECRET || "the-super-secret-key-change-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "10h";

export interface JwtPayload {
  userId: number;
  username: string;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

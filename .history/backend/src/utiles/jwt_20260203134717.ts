import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";

dotenv.config();

const JWT_SECRET =
  process.env.JWT_SECRET || "the-super-secret-key-change-in-production";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "10h";

export interface JwtPayload {
  userId: number;
  username: string;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

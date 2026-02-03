import jwt from "jsonwebtoken";

export const generateToken = (
  userId: number,
  username: string,
  role: string,
  secret: string,
) => {
  return jwt.sign({ userId, username, role }, secret, { expiresIn: "10h" });
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

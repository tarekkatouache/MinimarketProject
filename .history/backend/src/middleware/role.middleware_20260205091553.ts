import { Request, Response, NextFunction } from "express";
import { Jwt } from "jsonwebtoken";
import Prisma from "../utiles/prisma";
export const requireRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Check for token
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      // 2. Verify token
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // 3. Get user from DB
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, username: true, role: true },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // 4. Store user in request
      (req as any).user = user;

      // 5. Check role
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message: `Access denied. Required roles: ${roles.join(", ")}`,
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

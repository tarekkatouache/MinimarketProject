import { Request, Response, NextFunction } from "express";

export const requireRole = (roles: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Type assertion or use custom interface
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        message: "Authentication required. Please login first.",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: `Access denied. Required roles: ${roles.join(", ")}`,
        yourRole: user.role,
      });
    }
    next();
  };
};

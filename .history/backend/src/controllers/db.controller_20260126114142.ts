import prisma from "../utiles/prisma.js";

export const dbHealthCheck = async (req, res) => {
  try {
    // simple query
    const result = await prisma.$queryRaw`SELECT 1`;
    res.json({
      database: "connected",
      result,
    });
  } catch (error) {
    res.status(500).json({
      database: "error",
      error: message,
    });
  }
};

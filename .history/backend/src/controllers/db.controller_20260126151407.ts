import prisma from "../utils/prisma";

export const dbHealthCheck = async (req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ database: "connected" });
};

import prisma from "../utiles/prisma.js";
export const dbHealthCheck = async (req, res) => {
  try{
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    res.json({database : 'connected', result});
  } catch (error) {
    res.status(500).json({database : 'ERROOOR', error: error.message});
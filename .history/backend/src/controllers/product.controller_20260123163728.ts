import prisma from "../utiles/prisma";

export const getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  wh
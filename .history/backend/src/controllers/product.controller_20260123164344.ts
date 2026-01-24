import prisma from "../utiles/prisma.js";

export const getAllProducts = async (req, res) => {
  const products = await prisma.products.findMany({
    where: { is_active: true },
    orderBy: { created_at: "desc" },
  });
  res.json(products);
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

import prisma from "../utiles/prisma.js";

export const getAllProducts = async (type :req,type: res) => {
  const products = await prisma.products.findMany({
    where: { is_active: true },
    orderBy: { created_at: "desc" },
  });
  res.json(products);
};

export const getProductById = async (req, res) => {
  const id = Number(req.params.id);
  const product = await prisma.products.findUnique({
    where: { id },
  });
  res.json(product);
};

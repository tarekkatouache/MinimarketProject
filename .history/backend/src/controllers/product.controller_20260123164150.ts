import prisma from "../utiles/prisma";

export const getAllProducts = async (req, res) => {
  const products = await prisma.products.findMany({
    where: { is_active: true },
    orderBy: { created_at: "desc" },
  });
  res.json(products);
};

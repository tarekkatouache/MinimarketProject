import prisma from "../utiles/prisma";
import express, { type Request, type Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.products.findMany({
    where: { is_active: true },
    orderBy: { created_at: "desc" },
  });
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await prisma.products.findUnique({
    where: { id },
  });
  res.json(product);
};

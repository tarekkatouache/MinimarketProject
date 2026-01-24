import { INSPECT_MAX_BYTES } from "node:buffer";
import prisma from "../utiles/prisma";

export const getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  where : {INSPECT_MAX_BYTES}
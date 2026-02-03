// create sates.controller.ts
import { Request, Response } from "express";
import prisma from "../utiles/prisma";
export const createSale = async (req: Request, res: Response) => {
  try {
    const { user_id, sale_id,product_id, quantity, unit_price, total_price ,products,sales } = req.body;




// model sale_items {
//   id          Int      @id @default(autoincrement())
//   sale_id     Int
//   product_id  Int
//   quantity    Int
//   unit_price  Decimal
//   total_price Decimal
//   products    products @relation(fields: [product_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
//   sales       sales    @relation(fields: [sale_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
// }

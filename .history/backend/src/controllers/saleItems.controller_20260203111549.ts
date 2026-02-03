// create sates.controller.ts
import { Request, Response } from "express";
import prisma from "../utiles/prisma";
export const createSale = async (req: Request, res: Response) => {
  try {
    const { username, role, first_name, last_name } = req.body;
    if (!username || !role) {
      return res
        .status(400)
        .json({ message: "Username and role are required" });
    }
    const newUser = await prisma.user.create({
      data: {
        username,
        role,
        first_name,
        last_name,
        password_hash: "hashed_password_placeholder",
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("CREATE USER ERROR 👉", error);

    return res.status(500).json({
      message: "Internal server error while creating user",
      error: error instanceof Error ? error.message : error,
    });
  }
};

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

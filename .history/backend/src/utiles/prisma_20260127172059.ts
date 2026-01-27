import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasource: {
    url: process.env.DATABASE_URL || "file:./prisma/Minimarket.db",
  },
});

export default prisma;

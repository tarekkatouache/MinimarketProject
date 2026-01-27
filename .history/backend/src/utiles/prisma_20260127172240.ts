import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL || "file:./prisma/Minimarket.db";

const prisma = new PrismaClient({
  connectionString: databaseUrl,
});

export default prisma;

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  db: {
    provider: "sqlite",
    url: "file:./prisma/Minimarket.db",
  },
});

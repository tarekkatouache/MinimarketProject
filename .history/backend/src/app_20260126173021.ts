import express from "express";
import cors from "cors";
console.log("ROUTES FILE LOADED");
import router from "./routes/db.routes";
import prisma from "./utiles/prisma";
// import productRoutes from "./routes/product.routes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// app.use("/api/db", dbRoutes);
// app.use("/api/products", productRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
/////////////////////////////

//////////////////////////////////////
async function testConnection() {
  console.log("🔍 Testing database connection...\n");

  // 1. Test raw SQL connection
  console.log("1. Testing raw SQL connection...");

  // console.log("✅ Raw SQL connection successful:", result);
  // try {
  //   // 2. Check if tables exist
  //   console.log("\n2. Checking database tables...");
  //   const tables = await prisma.$queryRaw`
  //     SELECT name FROM sqlite_master
  //     WHERE type='table' AND name NOT LIKE 'sqlite_%'
  //   `;
  //   console.log("✅ Available tables:", tables);
  //   // 3. Try to count products (if table exists)
  //   console.log("\n3. Testing Prisma model access...");
  //   try {
  //     const productCount = await prisma.products.count();
  //     console.log(`✅ Products table accessible. Count: ${productCount}`);
  //   } catch (error) {
  //     console.log(
  //       "⚠️ Products table might not exist yet. This is OK if you haven't migrated.",
  //     );
  //   }
  //   // 4. Get database info
  //   console.log("\n4. Database information:");
  //   const dbInfo = await prisma.$queryRaw`SELECT sqlite_version() as version`;
  //   console.log("✅ SQLite version:", dbInfo);
  //   console.log("\n🎉 Database connection test PASSED!");
  // } catch (error: any) {
  //   console.error("\n❌ Database connection FAILED:");
  //   console.error("Error message:", error.message);
  //   console.error("\n🔧 Troubleshooting steps:");
  //   console.error("1. Check if Minimarket.db exists in backend/prisma/");
  //   console.error("2. Check file permissions");
  //   console.error("3. Run: npx prisma generate");
  //   console.error("4. Run: npx prisma db push");
  // } finally {
  //   await prisma.$disconnect();
  // }
}
////////////////////////////////////////

app.get("/api/test", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    res.json({
      status: "ok",
      database: "connected",
      test: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
//////////////////////////////
testConnection();
export default app;

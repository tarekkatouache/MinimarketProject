import "dotenv/config";
import express from "express";
import cors from "cors";
console.log("ROUTES FILE LOADED");
import router from "./routes/db.routes";
import prisma from "./utiles/prisma";
import dbRoutes from "./routes/db.routes";
import userRoutes from "./routes/user.routes";
// import saleItemsRoutes from "./routes/saleItems.routes";
// import productRoutes from "./routes/product.routes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/db", dbRoutes);
// app.use("/api/products", productRoutes);

// user routes
app.use("/api/users", userRoutes);
// app.use("/api/saleItems", saleItemsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
/////////////////////////////

//////////////////////////////////////

export default app;

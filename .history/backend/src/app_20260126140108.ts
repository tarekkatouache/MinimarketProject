import express from "express";
import cors from "cors";
import routes from "./routes/db.routes.js";
import dbRoutes from "./routes/db.routes.js";

// import dbRoutes from "./routes/db.routes";
// import productRoutes from "./routes/product.routes";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/db", dbRoutes);
// app.use("/api/products", productRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

export default app;

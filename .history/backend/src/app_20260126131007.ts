import express from "express";
import cors from "cors";
import dbRoutes from "../routes/db.routes";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/db", dbRoutes);
app.use("/api/products", productRoutes);

export default app;

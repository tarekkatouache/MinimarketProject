import { Router } from "express";
import { createSale } from "../controllers/saleItems.controller";

const router = Router();

router.post("/", createSale);

export default router;

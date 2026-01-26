import { Router } from "express";

const router = Router();

// Add your database routes here
router.get("/db", (req, res) => {
  res.json({ message: "Database routes are working!" });
});

// Add more routes as needed
router.get("/test", (req, res) => {
  res.json({ message: "Test route works!" });
});

export default router;

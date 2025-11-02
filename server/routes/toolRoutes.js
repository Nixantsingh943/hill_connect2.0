import express from "express";
const router = express.Router();

// Example: Get all tools
router.get("/", (req, res) => {
  res.json({ message: "Get all tools - works!" });
});

// Example: Add a tool
router.post("/", (req, res) => {
  const { name, type } = req.body;
  res.json({ message: `Tool ${name} of type ${type} added!` });
});

export default router;

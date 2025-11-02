import express from "express";
const router = express.Router();

// Example: Get all homestays
router.get("/", (req, res) => {
  res.json({ message: "Get all homestays - works!" });
});

// Example: Add a homestay
router.post("/", (req, res) => {
  const { name, location } = req.body;
  res.json({ message: `Homestay ${name} in ${location} added!` });
});

export default router;

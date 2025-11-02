import express from "express";
const router = express.Router();

// Example: Get all rides
router.get("/", (req, res) => {
  res.json({ message: "Get all rides - works!" });
});

// Example: Create a ride
router.post("/", (req, res) => {
  const { from, to, date } = req.body;
  res.json({ message: `Ride from ${from} to ${to} on ${date} created!` });
});

export default router;

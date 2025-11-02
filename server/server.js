// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: "http://localhost:5173", // Your React frontend URL
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("HillConnect API running");
});

// Import routes
import userRoutes from "./routes/userRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import toolRoutes from "./routes/toolRoutes.js";
// import homestayRoutes from "./routes/homestayRoutes.js";

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/tools", toolRoutes);
// app.use("/api/homestays", homestayRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

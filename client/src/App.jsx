// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import RideSharing from "./pages/RideSharing";
import Homestay from "./pages/Homestay";
import ToolsSharing from "./pages/ToolSharing";
import Dashboard from "./pages/Dashboard";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";

// CSS
import "./App.css";

function App() {
  // ======= State Management =======
  const [ridesList, setRidesList] = useState([]);
  const [homestays, setHomestays] = useState([]);
  const [tools, setTools] = useState([]);

  // ======= Fetch Data from Backend =======
  useEffect(() => {
    const API_BASE = "http://localhost:5001/api";

    async function fetchData() {
      try {
        // Fetch rides
        const ridesRes = await fetch(`${API_BASE}/rides`);
        const ridesData = await ridesRes.json();
        setRidesList(ridesData);

        // Fetch homestays
        const homestayRes = await fetch(`${API_BASE}/homestays`);
        const homestayData = await homestayRes.json();
        setHomestays(homestayData);

        // Fetch tools
        const toolsRes = await fetch(`${API_BASE}/tools`);
        const toolsData = await toolsRes.json();
        setTools(toolsData);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // ======= Protected Route Wrapper =======
  const Private = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
  };

  // ======= Render App =======
  return (
    <BrowserRouter>
      <Navbar />
 <main className="fade">
      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ---------- Protected Routes ---------- */}
        <Route
          path="/rides"
          element={
            <Private>
              <RideSharing />
            </Private>
          }
        />
        <Route
          path="/homestay"
          element={
            <Private>
              <Homestay />
            </Private>
          }
        />
        <Route
          path="/toolsharing"
          element={
            <Private>
              <ToolsSharing />
            </Private>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Private>
              <Dashboard
                ridesList={ridesList}
                homestays={homestays}
                tools={tools}
              />
            </Private>
          }
        />

        {/* ---------- Catch-All Redirect ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

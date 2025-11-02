// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("You must login to access this page!");
    return <Navigate to="/login" />;
  }

  return children;
}

import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav>
      <Link to="/" className={isActive("/")}>Home</Link>

      {!user && <Link to="/login" className={isActive("/login")}>Login</Link>}
      {!user && <Link to="/register" className={isActive("/register")}>Register</Link>}

      {user && (
        <>
          <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
          <Link to="/rides" className={isActive("/rides")}>Rides</Link>
          <Link to="/homestay" className={isActive("/homestay")}>Homestays</Link>
          <Link to="/toolsharing" className={isActive("/toolsharing")}>Tools</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

import { Link } from "react-router-dom";
import { FaTools, FaCarSide, FaHome } from "react-icons/fa"; // Add icons
import "./Home.css";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Explore the Hills, Connect with Locals</h1>
          <p>Share tools, rides, and homestays with your community effortlessly.</p>
          {!user && (
            <Link to="/login" className="hero-btn">Get Started</Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <FaTools className="feature-icon" />
          <h3>Tool Sharing</h3>
          <p>Borrow or lend local tools safely and easily.</p>
        </div>
        <div className="feature-card">
          <FaCarSide className="feature-icon" />
          <h3>Ride Sharing</h3>
          <p>Find rides or offer trips to nearby villages.</p>
        </div>
        <div className="feature-card">
          <FaHome className="feature-icon" />
          <h3>Homestays</h3>
          <p>Offer your home to travelers or find local stays.</p>
        </div>
      </section>
    </div>
  );
}

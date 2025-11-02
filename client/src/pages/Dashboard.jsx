import { useState, useEffect } from "react";
import { FaCarSide, FaHammer, FaHome, FaUser } from "react-icons/fa"; // icons
import "./Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  // Example data (temporary)
  const [usedRides, setUsedRides] = useState([
    { from: "Town A", to: "Hill B", date: "2025-10-20", seats: 2 },
  ]);
  const [addedRides, setAddedRides] = useState([
    { from: "Hill B", to: "Town C", date: "2025-10-22", seats: 3 },
  ]);

  const [usedTools, setUsedTools] = useState([
    { name: "Shovel", location: "Community Shed" },
  ]);
  const [addedTools, setAddedTools] = useState([
    { name: "Hammer", location: "My House" },
  ]);

  const [usedHomestays, setUsedHomestays] = useState([
    { name: "Cozy Cottage", location: "Hilltop", price: "$30/night" },
  ]);
  const [addedHomestays, setAddedHomestays] = useState([
    { name: "Sunny Cabin", location: "River Side", price: "$25/night" },
  ]);

  // Load current logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Helper function for card rendering
  const renderCard = (item, type, category) => (
    <div className={`card ${category}`} key={item.name || item.from}>
      <div className="card-icon">
        {category === "ride" && <FaCarSide />}
        {category === "tool" && <FaHammer />}
        {category === "homestay" && <FaHome />}
      </div>
      <div className="card-content">
        {category === "ride" && <h4>{item.from} → {item.to}</h4>}
        {category !== "ride" && <h4>{item.name}</h4>}

        {category === "ride" && (
          <>
            <p>Date: {item.date}</p>
            <p>Seats: {item.seats}</p>
          </>
        )}
        {category === "tool" && <p>Location: {item.location}</p>}
        {category === "homestay" && (
          <>
            <p>Location: {item.location}</p>
            <p>Price: {item.price}</p>
          </>
        )}

        {/* Badge */}
        <span className={`badge ${type}`}>{type.toUpperCase()}</span>

        {/* Delete button for added items */}
        {type === "added" && <button className="delete-btn">Delete</button>}
      </div>
    </div>
  );

  // If no user logged in
  if (!user) {
    return (
      <div className="dashboard-container">
        <h2>Please log in to view your dashboard.</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* User Info */}
      <div className="user-details-card">
        <h2><FaUser style={{ marginRight: "8px" }} /> Welcome, {user.name}!</h2>
        <p><strong>Email:</strong> {user.email}</p>
        {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
      </div>

      {/* Used Section */}
      <section className="dashboard-section">
        <h2>Items You're Using</h2>

        <h3>Rides</h3>
        <div className="cards-container">
          {usedRides.map((ride) => renderCard(ride, "used", "ride"))}
        </div>

        <h3>Tools</h3>
        <div className="cards-container">
          {usedTools.map((tool) => renderCard(tool, "used", "tool"))}
        </div>

        <h3>Homestays</h3>
        <div className="cards-container">
          {usedHomestays.map((stay) => renderCard(stay, "used", "homestay"))}
        </div>
      </section>

      {/* Added Section */}
      <section className="dashboard-section">
        <h2>Items You Added</h2>

        <h3>Rides</h3>
        <div className="cards-container">
          {addedRides.map((ride) => renderCard(ride, "added", "ride"))}
        </div>

        <h3>Tools</h3>
        <div className="cards-container">
          {addedTools.map((tool) => renderCard(tool, "added", "tool"))}
        </div>

        <h3>Homestays</h3>
        <div className="cards-container">
          {addedHomestays.map((stay) => renderCard(stay, "added", "homestay"))}
        </div>
      </section>
    </div>
  );
}

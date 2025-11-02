import { useState } from "react";
import "./Homestay.css";

export default function Homestay() {
  const [homestays, setHomestays] = useState([
    { name: "Mountain View", location: "Village A", price: 100 },
    { name: "River Side", location: "Village B", price: 150 },
  ]);

  const [newStay, setNewStay] = useState({ name: "", location: "", price: "" });
  const [error, setError] = useState("");

  const [searchLocation, setSearchLocation] = useState("");
  const [searchMaxPrice, setSearchMaxPrice] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleChange = (e) => {
    setNewStay({ ...newStay, [e.target.name]: e.target.value });
    setError("");
  };

  const handleAddStay = (e) => {
    e.preventDefault();

    if (!newStay.name || !newStay.location || !newStay.price) {
      setError("All fields are required!");
      return;
    }

    const priceNumber = parseFloat(newStay.price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      setError("Price must be a positive number!");
      return;
    }

    setHomestays([...homestays, { ...newStay, price: priceNumber }]);
    setNewStay({ name: "", location: "", price: "" });
    setError("");
  };

  const filteredStays = homestays.filter((stay) => {
    const matchLocation = stay.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchPrice = !searchMaxPrice || stay.price <= parseFloat(searchMaxPrice);
    return matchLocation && matchPrice;
  });

  return (
    <div className="homestay-container">
      <h2>Homestays</h2>

      {/* -------- Add Homestay Section -------- */}
      {user && (
        <div className="add-homestay-section">
          <h3>Add a Homestay</h3>
          {error && <p className="error-message">{error}</p>}
          <form className="homestay-form" onSubmit={handleAddStay}>
            <input
              type="text"
              placeholder="Homestay Name"
              name="name"
              value={newStay.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={newStay.location}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Price per night"
              name="price"
              value={newStay.price}
              onChange={handleChange}
              min="1"
            />
            <button type="submit">Add Homestay</button>
          </form>
        </div>
      )}

      {/* -------- Available Homestays Section -------- */}
      <div className="available-homestays-section">
        <h3>Available Homestays</h3>

        {/* Search Section */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={searchMaxPrice}
            onChange={(e) => setSearchMaxPrice(e.target.value)}
            min="1"
          />
        </div>

        {/* Homestay Cards */}
        <div className="homestay-list">
          {filteredStays.length === 0 && <p>No homestays found.</p>}
          {filteredStays.map((stay, i) => (
            <div className="homestay-card" key={i}>
              <h4>{stay.name}</h4>
              <p><strong>Location:</strong> {stay.location}</p>
              <p><strong>Price:</strong> ${stay.price}</p>
              <button>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

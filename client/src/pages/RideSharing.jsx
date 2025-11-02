import { useState } from "react";
import "./Rides.css";

export default function Rides() {
  const [ridesList, setRidesList] = useState([
   
  ]);

  const [newRide, setNewRide] = useState({ from: "", to: "", date: "", persons: "" });
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleChange = (e) => {
    setNewRide({ ...newRide, [e.target.name]: e.target.value });
    setError("");
  };

  const handleAddRide = (e) => {
    e.preventDefault();

    if (!newRide.from || !newRide.to || !newRide.date || !newRide.persons) {
      setError("All fields are required");
      return;
    }

    if (newRide.from === newRide.to) {
      setError("From and To locations cannot be the same!");
      return;
    }

    const rideDate = new Date(newRide.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (rideDate < today) {
      setError("Ride date cannot be in the past!");
      return;
    }

    const personsNumber = parseInt(newRide.persons);
    if (isNaN(personsNumber) || personsNumber <= 0) {
      setError("Number of persons must be a positive number!");
      return;
    }

    setRidesList([...ridesList, { ...newRide, persons: personsNumber }]);
    setNewRide({ from: "", to: "", date: "", persons: "" });
    setError("");
  };

  const filteredRides = ridesList.filter((ride) => {
    const matchFrom = ride.from.toLowerCase().includes(searchFrom.toLowerCase());
    const matchTo = ride.to.toLowerCase().includes(searchTo.toLowerCase());
    const matchDate = searchDate === "" || ride.date === searchDate;
    return matchFrom && matchTo && matchDate;
  });

  return (
    <div className="rides-container">
      <h2>Ride Sharing</h2>

      {/* Add Ride Section */}
      {user && (
        <div className="add-ride-section">
          <h3>Add a Ride</h3>
          {error && <p className="error-message">{error}</p>}
          <form className="rides-form" onSubmit={handleAddRide}>
            <input
              type="text"
              placeholder="From"
              name="from"
              value={newRide.from}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="To"
              name="to"
              value={newRide.to}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              value={newRide.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
            <input
              type="number"
              placeholder="Number of Persons"
              name="persons"
              value={newRide.persons}
              onChange={handleChange}
              min="1"
            />
            <button type="submit">Add Ride</button>
          </form>
        </div>
      )}

      {/* Available Rides Section */}
      <div className="available-rides-section">
        <h3>Available Rides</h3>

        {/* Search Section */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search From"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search To"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
          />
          <input
            type="date"
            placeholder="Search Date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Ride Cards */}
        <div className="view-rides-section">
          {filteredRides.length === 0 && <p>No rides found.</p>}
          {filteredRides.map((ride, i) => (
            <div className="ride-card" key={i}>
              <p><strong>From:</strong> {ride.from}</p>
              <p><strong>To:</strong> {ride.to}</p>
              <p><strong>Date:</strong> {ride.date}</p>
              <p><strong>Seats Available:</strong> {ride.persons}</p>
              <button>Join Ride</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

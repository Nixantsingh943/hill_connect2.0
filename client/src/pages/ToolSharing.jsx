import { useState } from "react";
import "./ToolsSharing.css";

export default function ToolsSharing() {
  const [tools, setTools] = useState([
    { name: "Hammer", location: "Village A" },
    { name: "Drill", location: "City B" },
  ]);

  const [newTool, setNewTool] = useState({ name: "", location: "" });
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleChange = (e) => {
    setNewTool({ ...newTool, [e.target.name]: e.target.value });
    setError("");
  };

  const handleAddTool = (e) => {
    e.preventDefault();
    if (!newTool.name || !newTool.location) {
      setError("All fields are required!");
      return;
    }

    setTools([...tools, newTool]);
    setNewTool({ name: "", location: "" });
    setError("");
  };

  return (
    <div className="tools-container">
      <h2>Tool Sharing</h2>

      {/* -------- Add Tool Section -------- */}
      {user && (
        <div className="add-tool-section">
          <h3>Add a Tool</h3>
          {error && <p className="error-message">{error}</p>}
          <form className="tools-form" onSubmit={handleAddTool}>
            <input
              type="text"
              placeholder="Tool Name"
              name="name"
              value={newTool.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={newTool.location}
              onChange={handleChange}
            />
            <button type="submit">Add Tool</button>
          </form>
        </div>
      )}

      {/* -------- Available Tools Section -------- */}
      <div className="available-tools-section">
        <h3>Available Tools</h3>
        <div className="tools-list">
          {tools.length === 0 && <p>No tools available.</p>}
          {tools.map((tool, i) => (
            <div className="tool-card" key={i}>
              <h4>{tool.name}</h4>
              <p><strong>Location:</strong> {tool.location}</p>
              <button>Request Tool</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

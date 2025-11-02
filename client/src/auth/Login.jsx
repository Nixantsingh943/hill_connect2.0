import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Auth0 hook
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  // ========= Manual Email/Password Login =========
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        alert(`Welcome, ${data.user.name}!`);
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  // ========= If Auth0 user is already logged in =========
  if (isAuthenticated && user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("/");
  }

  // ========= UI =========
  return (
    <div className="auth-container">
      <h2>Login</h2>

      {/* Manual login form */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p className="line">Don't have an account? <a href="/register">Register here</a></p>

      <hr style={{ margin: "20px 0" }} />

      {/* ✅ Auth0 Google Login */}
      <button
        onClick={() => loginWithRedirect()}
        style={{
          backgroundColor: "#4285F4",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>
    </div>
  );
}

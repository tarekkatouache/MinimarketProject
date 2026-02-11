import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // setIsLoggedIn(true);
      // setUser(user);

      alert("Connexion réussie !");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Échec de la connexion. Veuillez réessayer.");
      setError(err.response?.data?.message || "La connexion a échoué");
    }
  };
  return (
    <div className="signin-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none">
            <path d="M4 6L12 3L20 6L12 9L4 6Z" fill="#E74C3C" />
            <path d="M4 6V18L12 21L20 18V6" stroke="#E74C3C" strokeWidth="2" />
          </svg>
          <span className="logo-text">ROLLER</span>
        </div>

        <div className="pos-icon">
          <svg viewBox="0 0 120 140" fill="none">
            <rect x="20" y="20" width="80" height="100" rx="8" fill="#E74C3C" />
            <rect x="30" y="30" width="60" height="30" rx="4" fill="#2C3E50" />
            <circle cx="45" cy="80" r="8" fill="#2C3E50" />
            <circle cx="60" cy="80" r="8" fill="#2C3E50" />
            <circle cx="75" cy="80" r="8" fill="#2C3E50" />
            <circle cx="45" cy="95" r="8" fill="#2C3E50" />
            <circle cx="60" cy="95" r="8" fill="#2C3E50" />
            <circle cx="75" cy="95" r="8" fill="#2C3E50" />
            <rect x="35" y="105" width="50" height="8" rx="2" fill="#F8F9FA" />
          </svg>
        </div>

        <h1 className="left-title">Point of Sale</h1>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="signin-form">
          <p className="form-label">POINT OF SALE</p>
          <h2 className="form-title">Sign in</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                // type="email"
                className="input-field"
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <a href="#" className="forgot-link">
              Forgotten your password?
            </a>

            <button type="submit" className="signin-button">
              Roll in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    // Add your login logic here
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header - Exactly like image */}
        <div className="login-header">
          <div className="logo">
            <span className="logo-main">ROLLER</span>
          </div>
          <div className="subtitle-line">
            <span className="subtitle-text">Point of Sale</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          {/* Title Row - Exactly like image */}
          <div className="title-row">
            <span className="main-title">POINT OF SALE</span>
          </div>
          <div className="subtitle-row">
            <span className="login-subtitle">Sign in</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <div className="form-label">Email address</div>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <div className="form-label">Password</div>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
              />
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password-row">
              <button type="button" className="forgot-password-btn">
                Forgotten your password?
              </button>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Roll in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

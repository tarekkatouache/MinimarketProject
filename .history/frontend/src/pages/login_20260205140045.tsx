import React, { useState } from "react";
import "./login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt:", { email, password, rememberMe });
      setIsLoading(false);
      // Add your authentication logic here
    }, 1000);
  };

  const handleForgotPassword = () => {
    // Add forgot password logic
    alert("Password reset functionality would go here");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="logo">
            <span className="logo-text">ROLLER</span>
          </div>
          <h1 className="system-title">Point of Sale</h1>
        </div>

        <div className="divider"></div>

        {/* Login Form */}
        <div className="form-container">
          <h2 className="form-title">POINT OF SALE</h2>
          <h3 className="form-subtitle">Sign in</h3>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Input */}
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox"
                />
                <label htmlFor="remember" className="checkbox-label">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgotten your password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="button-loading">
                  <span className="spinner"></span>
                  Signing in...
                </span>
              ) : (
                "Roll in"
              )}
            </button>

            {/* Demo Credentials Hint */}
            <div className="demo-hint">
              <p>Demo credentials:</p>
              <p>Email: admin@roller.com | Password: demo123</p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p className="footer-text">
            © {new Date().getFullYear()} ROLLER POS System. All rights reserved.
          </p>
          <p className="footer-version">v2.1.4</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

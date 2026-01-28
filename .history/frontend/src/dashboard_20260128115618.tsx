import React, { useState, useEffect } from "react";

export default function Dashboard({
  user,
  setUser,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Fetch user from localStorage in case of refresh
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, [user, setUser]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded?.role === "admin");
    }
  }, []);

  return (
    // <SystemsProvider>
    <div className="Page">
      <div className="Top-Navbar">Hello from Dashboard</div>
    </div>
  );
}

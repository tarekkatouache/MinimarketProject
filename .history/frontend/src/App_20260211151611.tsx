// import { useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboardPage";
import Salepage from "./components/salePage";
import { Routes, Route, Navigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import Login from "./components/loginPage";
import Login from "./pages/login";
import Signup from "./components/signupPage";
import { useState } from "react";
// import { SystemsProvider } from "./context/systemsContext";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);  // Renamed!
  const [user, setUser] = useState(null);
  return (
    <div>
      <div>
        <Routes>
          <Route path="/"  element={<isUserLoggedIn ?(<Navigate to="/dashboard" /> ): (  <Login
                setIsLoggedIn={setIsUserLoggedIn}
                isLoggedIn={isUserLoggedIn}
                user={user}
                setUser={setUser}
              />)}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/salePage" element={<Salepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;

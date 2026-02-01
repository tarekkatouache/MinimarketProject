import { useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboardPage";
import Salepage from "./components/salePage";
import { Routes, Route } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import Login from "./components/loginPage";
import Signup from "./components/signupPage";
// import { SystemsProvider } from "./context/systemsContext";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
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

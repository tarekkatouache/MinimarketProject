import { useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboardPage";
import salepage from "./components/salePage";
import { Routes, Route } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import Login from "./components/loginPage";
import Signup from "./components/signupPage";
// import { SystemsProvider } from "./context/systemsContext";

function App() {
  const [count, setCount] = useState(0);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/salepage" element={<salepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <div></div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      {/* <Dashboard /> */}
    </div>
  );
}

export default App;

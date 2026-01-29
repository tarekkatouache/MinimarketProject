import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Dashboard from "./components/dashboardPage";
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
      <div></div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      {/* <Dashboard /> */}

      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

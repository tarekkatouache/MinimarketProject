// import { useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboardPage";
import Salepage from "./components/salePage";
import { Routes, Route } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import Login from "./components/loginPage";
import Login from "./pages/login";
import Signup from "./components/signupPage";
import { useState } from "react";
// import { SystemsProvider } from "./context/systemsContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [user, setUser] = useState<User | null>(null);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<isLoggedIn ? <Dashboard /> : <Login setIsLoggedIn={setIsLoggedIn} isLogged={isLoggedIn} user={JSON.parse(localStorage.getItem("user") || "{}")} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} isLogged={isLoggedIn} user={JSON.parse(localStorage.getItem("user") || "{}")} />} />
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

// filepath: h:\CODE\myportfolio\src\App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import EmailVerification from "./components/EmailVerification";
import PublicPortfolio from "./components/PublicPortfolio"; // Import the PublicPortfolio component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home isAuthenticated={isAuthenticated} onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Home onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/:username" element={<PublicPortfolio />} /> {/* Dynamic route for user portfolios */}
      </Routes>
    </Router>
  );
}

export default App;
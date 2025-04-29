// filepath: h:\CODE\myportfolio\src\App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import EmailVerification from "./components/EmailVerification";
import PublicPortfolio from "./components/PublicPortfolio"; // Import the PublicPortfolio component
import PortfolioEdition from "./components/PortfolioEdition";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Update the authentication state
    console.log("User logged out");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isAuthenticated={isAuthenticated}
              onLoginSuccess={handleLoginSuccess}
              onLogout={handleLogout} // Pass the handleLogout function
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Home
                onLoginSuccess={handleLoginSuccess}
                onLogout={handleLogout} // Pass the handleLogout function
              />
            )
          }
        />
        <Route path="/portfolio-edition/:username" element={<PortfolioEdition />} />
        <Route path="/:username" element={<PublicPortfolio />} /> {/* Use PublicPortfolio here */}
      </Routes>
    </Router>
  );
}

export default App;
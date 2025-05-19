// filepath: h:\CODE\myportfolio\src\App.js
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import EmailVerification from "./components/authentication/EmailVerification";
import PublicPortfolio from "./components/portfolio/PublicPortfolio";
import PortfolioEdition from "./components/portfolio/PortfolioEdition";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Home />}/>
        <Route path="/portfolio-edition/:username" element={isAuthenticated ? <PortfolioEdition /> : <Home />}/>
        <Route path="/:username" element={<PublicPortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
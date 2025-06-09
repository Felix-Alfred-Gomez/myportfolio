// filepath: h:\CODE\myportfolio\src\App.js
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import PublicPortfolioRouteGuard from "./components/portfolio/PublicPortfolioRouteGuard";
import ProtectedPortfolioEditionRoute from "./components/portfolio/ProtectedPortfolioEditionRoute";
import { AuthContext } from "./context/AuthContext";
import "./styles/EditionPen.css";
import "./styles/PortfolioTemplate.css";
import "./styles/AccueilSection.css";
import "./styles/ProjetSection.css";
import "./styles/OptionModal.css";
import "./styles/common.css"; 
import "./styles/dashboard.css";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Home />}/>
        <Route path="/portfolio-edition/:username" element={<ProtectedPortfolioEditionRoute />} />
        <Route path="/:username" element={<PublicPortfolioRouteGuard />} />
      </Routes>
    </Router>
  );
}

export default App;
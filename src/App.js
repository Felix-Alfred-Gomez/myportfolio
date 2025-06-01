// filepath: h:\CODE\myportfolio\src\App.js
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import PublicPortfolio from "./components/portfolio/PublicPortfolio";
import PortfolioEdition from "./components/portfolio/PortfolioEdition";
import { AuthContext } from "./context/AuthContext";
import "./styles/OptionWheel.css";
import "./styles/PortfolioTemplate.css";
import "./styles/AccueilSection.css";
import "./styles/ProjetSection.css";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Home />}/>
        <Route path="/portfolio-edition/:username" element={isAuthenticated ? <PortfolioEdition /> : <Home />}/>
        <Route path="/:username" element={<PublicPortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
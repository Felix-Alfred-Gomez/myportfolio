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
import "./styles/UpdateSkillsStack.css";
import "./styles/UpdateText.css";
import "./styles/UpdateLinkBox.css";
import "./styles/UpdateSocialLinks.css";
import './styles/ConfirmationModal.css';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Home />}/>
        <Route path="/portfolio-edition/:UserURL" element={<ProtectedPortfolioEditionRoute />} />
        <Route path="/:UserURL" element={<PublicPortfolioRouteGuard />} />
      </Routes>
    </Router>
  );
}

export default App;
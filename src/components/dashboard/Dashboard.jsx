// filepath: h:\CODE\myportfolio\src\components\Dashboard\Dashboard.js
import { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../common/LoginLogo"; 
import { AuthContext, FetchUsername} from "../../context/AuthContext"; 
import LogoButton from "../common/WebsiteLogo"; 
import dashboardBackground from "../../assets/dashboard.png";
import { getAuth, signOut } from "firebase/auth";
import { TiTick } from "react-icons/ti";

function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);
  const [ setShowLogin] = useState(false);
  // Function to modify the showLogin state and display/hide the login modal
  const toggleLoginModal = (state) => setShowLogin(state);

  // Fonction to modify the authentication state
  const handleAuthChange = async (status) => {
    if (!status) {
      const auth = getAuth();
      await signOut(auth);
      console.log("User logged out");
    }
    setIsAuthenticated(status);
  };

  useEffect(() => {
    const fetchAndSetUsername = async () => {
      const username = await FetchUsername();
      if (username) {
        setUsername(username);
      }
    };

    fetchAndSetUsername();
  }, []);

  const handleCreatePortfolio = () => {
    if (username) {
      navigate(`/portfolio-edition/${username}`);
    } else {
      alert("Veuillez vous connecter pour créer un portfolio.");
    }
  };

  // const handleViewPortfolio = () => {
  //   if (username) {
      // navigate(`/${username}`);
      // Open the portfolio in a new tab
  //     window.open(`/${username}`, "_blank", "noopener,noreferrer");
  //   } else {
  //     alert("Veuillez vous connecter pour voir votre portfolio.");
  //   }
  // };

  return (
    <div className="container">
      <section className="hero-section">

        <nav className="nav-site">
          <LogoButton />
          <LoginButton 
            onLoginClick={() => toggleLoginModal(true)} 
            onLogoutClick={() => handleAuthChange(false)} 
          />
        </nav>

        <img src={dashboardBackground} alt="Background" className="hero-background" />
        
        <div className="hero-overlay-dashboard">
          {/* <h2>Dashboard</h2> */}
          <h2>Créez votre portfolio web personnalisé en quelques clics</h2>
          <ul className="dashboard-features-list">
            <li>
              <span className="feature-tick"><TiTick /></span>
              <span>Présentez vos projets en quelques secondes</span>
            </li>
            <li>
              <span className="feature-tick"><TiTick /></span>
              Personnalisez chaque section avec des images, des textes et des liens
            </li>
            <li>
              <span className="feature-tick"><TiTick /></span>
              Partagez votre portfolio public avec votre adresse url personnelle
            </li>
          </ul>

          <div className="buttons-group">
            <button
              className="button"
              onClick={handleCreatePortfolio}>
              Editer mon Portfolio
            </button>

            {/* <button
              className="button"
              onClick={handleViewPortfolio}>
              Voir mon Portfolio
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
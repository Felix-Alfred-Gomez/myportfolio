import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../styles/common.css"; // Import the common CSS file
import logo from '../../assets/logo.png';

function WebsiteLogo() {
  const navigate = useNavigate(); // Use the navigate hook

  const navigatehome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div
      className="logo-button"
      onClick={navigatehome} 
      style={{ cursor: "pointer" }}>

      <img src={logo} alt="Logo" className="logo" />
      
      {/* <h1 className="title">{"MonFolioPerso"}</h1> */}

    </div>
  );
}

export default WebsiteLogo;
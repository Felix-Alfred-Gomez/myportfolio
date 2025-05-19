import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, reload } from "firebase/auth";
import { app } from "../../firebaseConfig";
import "../../styles/common.css"; // Import the dedicated CSS file

function LoginModal({ onLoginSuccess, onRegisterClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await reload(user);

      if (user.emailVerified) {
        onLoginSuccess(); // Notify parent component of successful login
      } else {
        setError("Please verify your email before logging in.");
        navigate("/verify-email");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-template">

      <h2> Connexion </h2>

      <div className="modal-header">
        Pas de compte?{" "}
        <button
          type="button"
          className="a"
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
            color: "#2575fc",
            fontWeight: "normal",}}
          onClick={onRegisterClick}
        >
          Inscrivez-vous ici
        </button>
      </div>

      <form 
        onSubmit={handleLogin}className="modal-login-format">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="modal-input-box"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="modal-input-box"
        />

        <button type="submit">Se connecter</button>
      </form>

      <div className="modal-footer">
        <div className="forgot-password-container">
          <Link to="/forgot-password" className="forgot-password-link">
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
      
      {error && <p className="modal-input modal-error">{error}</p>}

    </div>
  );
}

export default LoginModal;
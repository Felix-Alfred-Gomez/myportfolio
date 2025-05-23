import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, reload } from "firebase/auth";
import { app } from "../../firebaseConfig";
import "../../styles/common.css"; // Import the dedicated CSS file
import { X } from "lucide-react";

function LoginModal({ onLoginSuccess, onRegisterClick, onForgotPasswordClick, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-template">
      <button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="modal-close-button">
        <X size={20} color="white" />
      </button>

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
          <button
            type="button"
            className="forgot-password-link"
            style={{
              background: "none",
              border: "none",
              color: "#2575fc",
              cursor: "pointer",
              padding: 0,
              fontWeight: "normal",
            }}
            onClick={onForgotPasswordClick}
          >
            Mot de passe oublié ?
          </button>
        </div>
      </div>
      
      {error && <p className="modal-input modal-error">{error}</p>}
    </div>
  );
}

export default LoginModal;
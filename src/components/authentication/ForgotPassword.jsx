import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebaseConfig";
import "../../styles/Login.css";
import "../../styles/common.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const auth = getAuth(app);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
    <div className="login-card">
      <h2>Mot de passe oublié</h2>
      <form onSubmit={handleReset} className="login-form">
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Envoyer l'email de réinitialisation
        </button>
      </form>
      {message && <p className="login-footer">{message}</p>}
      {error && <p className="login-error">{error}</p>}
    </div>
    </div>  
  );
}

export default ForgotPassword;
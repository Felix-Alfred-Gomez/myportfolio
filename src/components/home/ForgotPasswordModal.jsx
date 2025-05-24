import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebaseConfig";
import "../../styles/common.css";
import { X } from "lucide-react";

function ForgotPasswordModal({ onClose }) {
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
      setMessage("Un email de réinitialisation a été envoyé.");
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

      <h2 style={{ marginBottom: "1.5rem" }}>Mot de passe oublié</h2>
      <form onSubmit={handleReset} className="modal-login-format">
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="modal-input-box"
        />
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p className="modal-error">{error}</p>}
    </div>
  );
}

export default ForgotPasswordModal;
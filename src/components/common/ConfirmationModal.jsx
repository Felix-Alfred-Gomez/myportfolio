import { useState, useEffect } from "react";
import { getCurrentUserEmail, authenticateWithEmailPassword } from "../../hooks/HandlePortfolioData";

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError("");
      setPassword("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setError("");
    setLoading(true);
    try {
      const email = getCurrentUserEmail();
      if (!email) {
        setError("Impossible de récupérer l'adresse email de l'utilisateur.");
        setLoading(false);
        return;
      }
      await authenticateWithEmailPassword(email, password);
      setLoading(false);
      onConfirm(password); // Continue with user deletion or next step
    } catch (err) {
      setError("Mot de passe incorrect ou erreur d'authentification.");
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Veuillez entrer votre mot de passe pour confirmer cette action :</p>
        <input
          type="password"
          className="modal-password-input"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        {error && <div className="modal-error-message">{error}</div>}
        <div className="modal-actions">
          <button className="confirm-btn" onClick={handleConfirm} disabled={loading}>
            {loading ? "Connexion..." : "Confirmer"}
          </button>
          <button className="cancel-btn" onClick={onCancel} disabled={loading}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

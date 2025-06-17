import { X } from "lucide-react";
import { useState } from "react";
import { updateUsername } from "../../hooks/HandlePortfolioData";

export default function ParametresModal({ show, onClose, app }) {
  const [newUsername, setNewUsername] = useState(""); // State for new username
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(false); // State for success
  const [loading, setLoading] = useState(false); // State for loading

  if (!show) return null;

  const handleChangeUsername = async () => {
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const result = await updateUsername(newUsername, app);
      if (result.success) {
        setSuccess(true);
        setNewUsername("");
      } else {
        setError(result.error || "Erreur inconnue");
      }
    } catch (e) {
      setError(e.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay z10 grey">
      <div className="modal-template" onClick={e => e.stopPropagation()}>
        <h2>Paramètres</h2>
        {/* Section to modify username */}
        <div style={{ marginTop: 24 }}>
          <h3>Modifier votre nom d'utilisateur</h3>
          <label htmlFor="new-username" style={{ display: 'block', marginTop: 12 }}>Nouveau nom d'utilisateur:</label>
          <input
            id="new-username"
            type="text"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            style={{ width: '250px', marginRight: 8, marginTop: 8, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            placeholder="Entrez un nouveau nom d'utilisateur"
            disabled={loading}
          />
          <button
            type="button"
            style={{ marginTop: 12, padding: '8px 16px', borderRadius: 4, background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
            onClick={handleChangeUsername}
            disabled={loading || !newUsername.trim()}
          >
            {loading ? "Modification..." : "Modifier"}
          </button>
          {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginTop: 10 }}>Nom d'utilisateur modifié avec succès !</div>}
        </div>
        <button
          type="button"
          aria-label="Fermer"
          onClick={onClose}
          className="modal-close-button">
          <X size={15} color="white" />
        </button>
      </div>
    </div>
  );
}

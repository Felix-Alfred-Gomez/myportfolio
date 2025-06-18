import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { SetUserURL, GetUserURL } from "../../hooks/HandlePortfolioData";

export default function ParametresModal({ show, onClose }) {
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    async function fetchURL() {
      const baseUrl = window.location.origin;
      try {
      const url = await GetUserURL();
      setCurrentURL(url ? `${baseUrl}/${url}` : "Aucune URL publique");
      } catch (e) {
      setCurrentURL("Erreur lors de la récupération de l'URL");
      }
    }
    fetchURL();
  }, [show, success]);

  if (!show) return null;

  // Updated handler to use SetUserURL
  const handleChangeUserURL = async () => {
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const result = await SetUserURL(newUsername); // Only pass newUsername
      if (result === true) {
        setSuccess(true);
        setNewUsername("");
      } else if (typeof result === "string") {
        setError(result); // Use the error message returned by SetUserURL
      } else {
        setError("Erreur inconnue lors de la modification de l'URL utilisateur.");
      }
    } catch (e) {
      setError(e.message || "Erreur inconnue lors de la modification de l'URL utilisateur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay z10 grey">
      <div className="modal-template" onClick={e => e.stopPropagation()}>
        <h2>Paramètres</h2>
        <div style={{ marginTop: 12, marginBottom: 12 }}>
          <h3>Votre URL publique actuelle est :</h3> {currentURL || "..."}
        </div>
        {/* Section to modify username */}
        <div style={{ marginTop: 24 }}>
          <h3>Modifier votre nom d'utilisateur (et donc votre url publique) :</h3>
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
            onClick={handleChangeUserURL}
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

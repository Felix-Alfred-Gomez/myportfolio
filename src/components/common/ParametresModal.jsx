import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { SetUserURL, GetUserURL, deleteUserAndData, FetchUsername } from "../../hooks/HandlePortfolioData";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from './ConfirmationModal';

export default function ParametresModal({ show, onClose }) {
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [currentURL, setCurrentURL] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (show) {
      setError("");
      setSuccess(false);
    }
  }, [show]);

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

  // Handler for account deletion
  const handleDeleteAccount = async () => {
    setShowConfirm(false);
    setDeleteLoading(true);
    setDeleteError("");
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("Utilisateur non authentifié.");
      const uid = user.uid;
      const username = await FetchUsername();
      if (!username) throw new Error("Nom d'utilisateur introuvable.");
      await deleteUserAndData(username, uid);
      await auth.signOut();
      navigate("/");
      if (onClose) onClose();
    } catch (e) {
      setDeleteError(e.message || "Erreur lors de la suppression du compte.");
    } finally {
      setDeleteLoading(false);
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
        {/* Suppression du compte */}
        <div style={{ marginTop: 20, borderTop: '1px solid #ccc' }}>
          <button
            type="button"
            style={{ marginTop: 20, padding: '10px 20px', borderRadius: 4, background: '#d32f2f', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => setShowConfirm(true)}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Suppression..." : "Supprimer mon compte"}
          </button>
          {deleteError && <div style={{ color: 'red', marginTop: 10 }}>{deleteError}</div>}
        </div>
        <ConfirmationModal
          isOpen={showConfirm}
          message="Êtes-vous sûr de vouloir supprimer votre compte ?"
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowConfirm(false)}
        />
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

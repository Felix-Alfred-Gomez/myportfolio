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
    // Redirect immediately
    navigate("/");
    if (onClose) onClose();
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("Utilisateur non authentifié.");
      // const uid = user.uid;
      const username = await FetchUsername();
      if (!username) throw new Error("Nom d'utilisateur introuvable.");
      await deleteUserAndData(username);
      await auth.signOut();
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
        <div className="parametres-url-section">
          <h3>Votre URL publique actuelle est :</h3>
          <span>{currentURL || "..."}</span>
        </div>
        {/* Section to modify username */}
        <div className="parametres-username-section">
          <h3>Modifier votre nom d'utilisateur (url publique) :</h3>
          <div className="parametres-username-row">
            <input
              id="new-username"
              type="text"
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              className="parametres-username-input"
              placeholder="Nouveau nom"
              disabled={loading}
            />
            <button
              type="button"
              className="parametres-username-button"
              onClick={handleChangeUserURL}
              disabled={loading || !newUsername.trim()}
            >
              {loading ? "Modification..." : "Modifier"}
            </button>
          </div>
          {error && <div className="parametres-error">{error}</div>}
          {success && <div className="parametres-success">Nom d'utilisateur modifié avec succès !</div>}
        </div>
        {/* Suppression du compte */}
        <div className="parametres-delete-section">
          <button
            type="button"
            className="parametres-delete-button"
            onClick={() => setShowConfirm(true)}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Suppression..." : "Supprimer mon compte"}
          </button>
          {deleteError && <div className="parametres-error">{deleteError}</div>}
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

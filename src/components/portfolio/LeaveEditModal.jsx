import { FaSave } from "react-icons/fa";

export default function LeaveEditModal({ show, onClose, onContinue, onPublish}) {
  if (!show) return null;

  return (
    <div className="modal-overlay z10 grey">
      <div className="modal-template">
        <h2>Vous allez quitter votre espace d'édition</h2>
        <p>
          Avez-vous sauvegardé vos modifications ?
        </p>
        <div className="center-button">
          <button className="button-template publish-modal" onClick={onPublish}>
            <FaSave className="button-template-icon" />
          </button>
        </div>
        <div >
          <button onClick={onContinue}>
            Quitter
          </button>
          <button onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
      <div className="modal-overlay" onClick={onClose} />
    </div>
  );
}

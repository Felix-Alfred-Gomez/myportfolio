const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>Confirmer</button>
          <button className="cancel-btn" onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

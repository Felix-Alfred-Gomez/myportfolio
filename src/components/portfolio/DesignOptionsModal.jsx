export default function DesignOptionsModal({ show, onClose }) {
  if (!show) return null;

  return (
    <>
      <div className="modal-template">
        <h2>Options de Design</h2>
        <p>Ici, vous pouvez personnaliser le design de votre portfolio.</p>
        {/* Ajoutez ici vos options de design */}
        <button onClick={onClose}>Fermer</button>
      </div>
      <div className="modal-overlay" onClick={onClose} />
    </>
  );
}
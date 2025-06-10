export default function PublishModal({ show, url, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay z10 grey">
      <div className="modal-template">
        <h2>Votre portfolio a été sauvegardé</h2>
        <p>
          Partagez le avec cette adresse:{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </p>
        <button onClick={onClose}>Fermer</button>
      </div>
      <div className="modal-overlay" onClick={onClose} />
    </div>
  );
}
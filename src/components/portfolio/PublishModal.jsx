import React from "react";

export default function PublishModal({ show, url, onClose }) {
  if (!show) return null;

  return (
    <>
      <div className="modal">
        <h2>Votre portfolio a été publié !</h2>
        <p>
          Visitez-le à :{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </p>
        <button onClick={onClose}>Fermer</button>
      </div>
      <div className="modal-overlay" onClick={onClose} />
    </>
  );
}
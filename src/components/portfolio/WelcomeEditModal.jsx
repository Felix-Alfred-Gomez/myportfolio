import { FaSave } from "react-icons/fa";
import { LuLink } from "react-icons/lu";

export default function WelcomeEditModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay z10 grey">
      <div className="modal-template">
        <h2>Vous venez d'accéder à la section édition de votre portfolio</h2>
        <div>
          <p>Pensez à sauvegarder et publier régulièrement vos modifications avec:</p>
          <div className="center-flex">
            <button className="button-welcome publish-modal-welcome" disabled>
              <FaSave className="button-template-icon" />
            </button>
          </div>
          <p>Vous pouvez ensuite partager votre portfolio public avec:</p>
        </div>
        <div className="center-flex">
          <button className="button-welcome copy-url-welcome" disabled title="Copier le lien public">
            <LuLink className="button-template-icon" />
          </button>
        </div>
        {/* <div className="center-button">
          <button onClick={onClose} className="button-template">Fermer</button>
        </div> */}
        <button
          onClick={onClose}
          style={{
            backgroundColor: '#9e9e9e',
            color: '#fff',
          }}
        >
          J'ai compris
        </button>
      </div>
      <div className="modal-overlay" />
    </div>
  );
}

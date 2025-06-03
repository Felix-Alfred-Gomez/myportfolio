import { useState, useRef } from "react";
import '../../../styles/NavSection.css';
import '../../../styles/AccueilSection.css';
import '../../../styles/PortfolioTemplate.css';
import '../../../styles/common.css';
import UpdateBackground from "../../common/UpdateBackground";
import Draggable from 'react-draggable';
import { X } from "lucide-react";

export default function ProjetOptionsModal({
  show,
  onClose,
  isPublished,
  handleBackgroundUpload,
}) {
  // Utilisation directe de handleNestedFieldChange importée
  const [collapseBg, setCollapseBg] = useState(false);
  const nodeRef = useRef(null);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <Draggable
        nodeRef={nodeRef}
        cancel=".modal-slider, 
      input, .modal-font-select-wrapper, 
      .modal-close-button, .collapse-toggle, 
      .modal-color-preview-wrapper, 
      .modal-update-background,
      .modal-SketchPicker">
        <div ref={nodeRef}
          className="modal-template option"
          style={{ cursor: 'grab' }}>

          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="modal-close-button">
            <X size={20} color="white" />
          </button>

          <h2 className="modal-heading" style={{ cursor: 'grab' }}>
            Section Projets
          </h2>

          {/* Image de fond */}
          <button className="collapse-toggle" onClick={() => setCollapseBg(v => !v)}>
            {/* <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span> */}
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{collapseBg ? '▼' : '►'} <span>Image de fond</span></span>
            <span style={{ flex: 1, height: 1, background: '#ccc', display: 'block', borderRadius: 2 }}></span>
          </button>
          <div className={`collapsible-content${collapseBg ? ' open' : ''}`}>
            {collapseBg && (
              <div className="modal-update-background">
                <label className="modal-label-black"> Chargez une image de fond: </label>
                <UpdateBackground
                  onUpload={handleBackgroundUpload}
                  disabled={isPublished} />
              </div>
            )}
          </div>
        </div>
      </Draggable>
      <div
        className="modal-overlay"
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  );
}
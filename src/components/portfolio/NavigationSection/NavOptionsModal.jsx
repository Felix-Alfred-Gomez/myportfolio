import { useState } from "react";
import { SketchPicker } from "react-color";

export default function DesignOptionsModal({ show, onClose, navBarColor, setNavBarColor, navLinkColor, setNavLinkColor }) {
  const [showNavBarColorPicker, setShowNavBarColorPicker] = useState(false);
  const [showNavLinkColorPicker, setShowNavLinkColorPicker] = useState(false);

  if (!show) return null;

  return (
    <>
      <div className="modal-template">
        <h2>Barre de navigation</h2>
        <div style={{ margin: '10px 0' }}>
          <label style={{ display: 'block', marginBottom: 10 }}>
            Couleur de fond :
            <div style={{ display: "inline-block", marginLeft: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 18,
                  borderRadius: 5,
                  background: navBarColor,
                  border: "1px solid #ccc",
                  display: "inline-block",
                  cursor: "pointer",
                  verticalAlign: "middle"
                }}
                onClick={() => setShowNavBarColorPicker(true)}
              />
              {showNavBarColorPicker && (
                <div style={{ position: "fixed", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 10001, background: "#fff", borderRadius: 10, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "none !important", filter: "none" }}>
                  <div style={{ boxShadow: 'none', filter: 'none' }}>
                    <SketchPicker
                      color={navBarColor}
                      onChange={color => setNavBarColor(color.hex)}
                      styles={{ default: { picker: { boxShadow: 'none' } } }}
                      disableAlpha={true}
                    />
                  </div>
                  <button style={{ marginTop: 16 }} onClick={() => setShowNavBarColorPicker(false)}>Fermer</button>
                </div>
              )}
            </div>
          </label>
          <label style={{ display: 'block', marginBottom: 10 }}>
            Couleur du texte :
            <div style={{ display: "inline-block", marginLeft: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 18,
                  borderRadius: 5,
                  background: navLinkColor,
                  border: "1px solid #ccc",
                  display: "inline-block",
                  cursor: "pointer",
                  verticalAlign: "middle" // <-- Add this line
                }}
                onClick={() => setShowNavLinkColorPicker(true)}
              />
              {showNavLinkColorPicker && (
                <div style={{ position: "fixed", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 10001, background: "#fff", borderRadius: 10, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "none !important", filter: "none" }}>
                  <div style={{ boxShadow: 'none', filter: 'none' }}>
                    <SketchPicker
                      color={navLinkColor}
                      onChange={color => setNavLinkColor(color.hex)}
                      styles={{ default: { picker: { boxShadow: 'none' } } }}
                      disableAlpha={true}
                    />
                  </div>
                  <button style={{ marginTop: 16 }} onClick={() => setShowNavLinkColorPicker(false)}>Fermer</button>
                </div>
              )}
            </div>
          </label>
        </div>
        <button onClick={onClose}>Fermer</button>
      </div>
      <div
        className="modal-overlay"
        style={{ backgroundColor: "transparent" }}
      />
    </>
  );
}
import { useState } from "react";
import { SketchPicker } from "react-color";

export default function DesignOptionsModal({ show, onClose, navPropsWithSetters }) {
  const {
    navBarColor,
    setNavBarColor,
    navLinkColor,
    setNavLinkColor,
    navBarAlpha,
    setNavBarAlpha
  } = navPropsWithSetters;
  const [showNavBarColorPicker, setShowNavBarColorPicker] = useState(false);
  const [showNavLinkColorPicker, setShowNavLinkColorPicker] = useState(false);

  if (!show) return null;

  return (
    <>
      <div className="modal-template" style={{ maxWidth: 300 }}>
        <h2>Barre de navigation</h2>
        <div style={{ margin: '10px 0' }}>
          {/* 1) Couleur du texte */}
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
                  verticalAlign: "middle"
                }}
                onClick={() => setShowNavLinkColorPicker(true)}
              />
              {showNavLinkColorPicker && (
                <div
                  style={{
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 4,
                    background: "#fff",
                    borderRadius: 10,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                    filter: "none"
                  }}>
                  <div
                    style={{
                      boxShadow: 'none',
                      filter: 'none'
                    }}>
                    <SketchPicker
                      color={navLinkColor}
                      onChange={color => setNavLinkColor(color.hex)}
                      styles={{
                        default: { picker: { boxShadow: 'none' } }
                      }}
                    />
                  </div>
                  <button style={{ marginTop: 16 }} onClick={() => setShowNavLinkColorPicker(false)}>Fermer</button>
                </div>
              )}
            </div>
          </label>
          {/* 2) Couleur de la barre de navigation */}
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
                <div
                  style={{
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 4,
                    background: "#fff",
                    borderRadius: 10,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                    filter: "none"
                  }}>
                  <div
                    style={{
                      boxShadow: "none",
                      filter: 'none'
                    }}>
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
          {/* 3) Transparence */}
          <label style={{ display: 'block', marginBottom: 10 }}>
            Transparence :
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(navBarAlpha * 100)}
              onChange={e => setNavBarAlpha(Number(e.target.value) / 100)}
              style={{ marginLeft: 10, verticalAlign: 'middle' }}
            />
            <span style={{ marginLeft: 8 }}>{Math.round(navBarAlpha * 100)}%</span>
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
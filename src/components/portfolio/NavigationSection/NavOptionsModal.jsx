import { useState } from "react";
import { SketchPicker } from "react-color";
import Select from "react-select";
import fontFamilies from "../../common/fontFamilies";
import '../../../styles/NavSection.css';

export default function DesignOptionsModal({ show, onClose, navPropsWithSetters }) {
  const {
    navBarColor,
    setNavBarColor,
    navLinkColor,
    setNavLinkColor,
    navBarAlpha,
    setNavBarAlpha,
    navFontFamily,
    setNavFontFamily
  } = navPropsWithSetters;
  const [showNavBarColorPicker, setShowNavBarColorPicker] = useState(false);
  const [showNavLinkColorPicker, setShowNavLinkColorPicker] = useState(false);

  if (!show) return null;

  return (
    <>
      <div className="modal-template">
        <h2 >Barre de navigation</h2>
        <div style={{ margin: '10px 0' }}>
          {/* Font Family Dropdown using react-select */}
          <div className="nav-font-row">
            <span className="nav-font-label">Police du texte :</span>
            <div className="nav-font-select-wrapper">
              <Select
                options={fontFamilies.map(f => ({ label: f.label, value: f.value }))}
                value={fontFamilies.find(f => f.value === navFontFamily) || fontFamilies[0]}
                onChange={option => setNavFontFamily(option.value)}
                styles={{
                  control: (base) => ({ ...base, fontFamily: navFontFamily}),
                  option: (base, state) => ({ ...base, fontFamily: state.data.value})
                }}
                menuPlacement="auto"
                isSearchable={false}
              />
            </div>
          </div>
          {/* 1) Couleur du texte */}
          <label style={{ display: 'block', marginBottom: 10 }}>
            Couleur du texte :
            <div style={{ display: "inline-block", marginLeft: 10 }}>
              <div
                className="nav-color-preview"
                style={{ background: navLinkColor }}
                onClick={() => setShowNavLinkColorPicker(true)}
              />
              {showNavLinkColorPicker && (
                <div className="modal-color-picker">
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
                className="nav-color-preview"
                style={{ background: navBarColor }}
                onClick={() => setShowNavBarColorPicker(true)}
              />
              {showNavBarColorPicker && (
                <div className="modal-color-picker">
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
          <label >
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
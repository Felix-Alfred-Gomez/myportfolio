import { useState, useRef } from "react";
import { SketchPicker } from "react-color";
import Select from "react-select";
import fontFamilies from "../../common/fontFamilies";
import '../../../styles/NavSection.css';
import { handleNestedFieldChange } from '../../../hooks/HandlePortfolioData';
import Draggable from 'react-draggable';
import { X } from "lucide-react";

export default function NavOptionsModal({ show, onClose, navProps, setData, data }) {
  const { navBarColor, navLinkColor, navBarAlpha, navFontFamily } = navProps;
  // Utilisation directe de handleNestedFieldChange importée
  const [showNavBarColorPicker, setShowNavBarColorPicker] = useState(false);
  const [showNavLinkColorPicker, setShowNavLinkColorPicker] = useState(false);
  const nodeRef = useRef(null);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <Draggable
        nodeRef={nodeRef}
        cancel=".nav-font-size-slider, 
        input, .nav-font-select-wrapper,
        .modal-close-button,
        .nav-SketchPicker, .nav-color-preview-wrapper">

        <div 
        className="modal-template option"
        ref={nodeRef}
        style={{cursor: 'grab'}}>

          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="modal-close-button">
            <X size={20} color="white" />
          </button>

          <h2 style={{ marginBottom: 20 }}>Barre de navigation</h2>

          <div style={{ margin: '10px 0' }}>

            {/* Font Family Dropdown using react-select */}
            <div className="nav-font-row">
              {/* <span className="nav-font-label">Police :</span> */}
              <div className="nav-font-select-wrapper">
                <Select
                  options={fontFamilies.map(f => ({ label: f.label, value: f.value }))}
                  value={fontFamilies.find(f => f.value === navFontFamily) || fontFamilies[0]}
                  onChange={option => handleNestedFieldChange(setData, data, 'navProps', 'navFontFamily')(option.value)}
                  styles={{
                    control: (base) => ({ ...base, fontFamily: navFontFamily }),
                    option: (base, state) => ({ ...base, fontFamily: state.data.value })
                  }}
                  menuPlacement="auto"
                  isSearchable={false}
                />
              </div>
            </div>

            {/* Font Size Slider */}
            <div className="nav-font-row">
              {/* <span className="nav-font-label">Taille :</span> */}
              <input
                type="range"
                min={20}
                max={60}
                value={parseInt(navProps.navFontSize) || 16}
                onChange={e => handleNestedFieldChange(setData, data, 'navProps', 'navFontSize')(e.target.value + 'px')}
                className="nav-font-size-slider"
              />
              <span style={{ marginLeft: 8 }}>{parseInt(navProps.navFontSize) || 16}px</span>
            </div>

            {/* Font Weight Selector */}
            <div className="nav-font-row">
              {/* <span className="nav-font-label">Graisse :</span> */}
              <div className="nav-font-select-wrapper">
                <Select
                  options={[{ label: 'Normal', value: 'normal' }, { label: 'Gras', value: 'bold' }]
                  }
                  value={{ label: navProps.navFontWeight === 'bold' ? 'Gras' : 'Normal', value: navProps.navFontWeight || 'bold' }}
                  onChange={option => handleNestedFieldChange(setData, data, 'navProps', 'navFontWeight')(option.value)}
                  styles={{
                    control: (base) => ({ ...base, minWidth: 80 }),
                    option: (base) => ({ ...base })
                  }}
                  menuPlacement="auto"
                  isSearchable={false}
                />
              </div>
            </div>

            {/* 1) Couleur du texte */}
            <label style={{ display: 'block', marginBottom: 10 }}>
              Couleur du texte :
              <div className="nav-color-preview-wrapper">
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
                        onChange={color => handleNestedFieldChange(setData, data, 'navProps', 'navLinkColor')(color.hex)}
                        styles={{default: { picker: { boxShadow: 'none' } }}}
                        className="nav-SketchPicker"
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
              <div className="nav-color-preview-wrapper">
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
                        onChange={color => handleNestedFieldChange(setData, data, 'navProps', 'navBarColor')(color.hex)}
                        styles={{default: { picker: { boxShadow: 'none' } }}}
                        className="nav-SketchPicker"
                        disableAlpha={true}
                      />
                    </div>
                    <button style={{ marginTop: 16 }} onClick={() => setShowNavBarColorPicker(false)}>Fermer</button>
                  </div>
                )}
              </div>
            </label>
            {/* 3) Transparence */}
            <label style={{ display: 'block', marginBottom: 5 }}>
              Transparence :
            </label>
            <div >
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(navBarAlpha * 100)}
                onChange={e => handleNestedFieldChange(setData, data, 'navProps', 'navBarAlpha')(Number(e.target.value) / 100)}
                className="nav-transparency-slider"
              />
              <span style={{ marginLeft: 8 }}>{Math.round(navBarAlpha * 100)}%</span>
            </div>
          </div>
          {/* <button onClick={onClose}>Fermer</button> */}
        </div>
        {/* <div
        className="modal-overlay"
        style={{ backgroundColor: "transparent" }}
      /> */}
      </Draggable>
    </div>
  );
}
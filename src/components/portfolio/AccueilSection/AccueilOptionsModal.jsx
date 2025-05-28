import { useState } from "react";
import { SketchPicker } from "react-color";
import Select from "react-select";
import fontFamilies from "../../common/fontFamilies";
import '../../../styles/NavSection.css';
import '../../../styles/AccueilSection.css';
import '../../../styles/PortfolioTemplate.css';
import '../../../styles/common.css';
import { handleNestedFieldChange } from '../../../hooks/HandlePortfolioData';
import UpdateBackground from "../../common/UpdateBackground";

export default function AccueilOptionsModal({ show, onClose, navProps, setData, data,
  isPublished,
  handleBackgroundUpload
}) {
  const { navLinkColor } = navProps;
  // Utilisation directe de handleNestedFieldChange importée
  const [showNavLinkColorPicker, setShowNavLinkColorPicker] = useState(false);

  if (!show) return null;

  return (
    <>
      <div className="modal-template option">
        <h2 className="modal-heading">Section Accueil</h2>

        <h3 className="sub-heading">Option du NOM</h3>
        <div style={{ margin: '10px 0' }}>
          {/* Font Family Dropdown using react-select */}
          <div className="accueil-font-row">
            {/* <span className="nav-font-label">Police :</span> */}
            <div className="accueil-font-select-wrapper">
              <Select
                options={fontFamilies.map(f => ({ label: f.label, value: f.value }))}
                value={fontFamilies.find(f => f.value === data.accueilProps.AccueilFontFamilyTitle) || fontFamilies[0]}
                onChange={option => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontFamilyTitle')(option.value)}
                styles={{
                  control: (base) => ({ ...base, fontFamily: data.accueilProps.AccueilFontFamilyTitle, color: 'black' }),
                  option: (base, state) => ({ ...base, fontFamily: state.data.value, color: 'black' })
                }}
                menuPlacement="auto"
                isSearchable={false}
              />
            </div>
          </div>

          {/* Font Size Slider */}
          <div className="accueil-font-row">
            {/* <span className="nav-font-label">Taille :</span> */}
            <input
              type="range"
              min={20}
              max={60}
              value={parseInt(data.accueilProps.AccueilFontSizeTitle) || 16}
              onChange={e => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontSizeTitle')(e.target.value + 'px')}
              className="accueil-font-size-slider"
            />
            <span className="modal-span-black">{parseInt(data.accueilProps.AccueilFontSizeTitle) || 16}px</span>
          </div>

          {/* Font Weight Selector */}
          <div className="accueil-font-row">
            {/* <span className="nav-font-label">Graisse :</span> */}
            <div className="accueil-font-select-wrapper">
              <Select
                options={[{ label: 'Normal', value: 'normal' }, { label: 'Gras', value: 'bold' }]
                }
                value={{ label: data.accueilProps.AccueilFontWeightTitle === 'bold' ? 'Gras' : 'Normal', value: data.accueilProps.AccueilFontWeightTitle || 'bold' }}
                onChange={option => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontWeightTitle')(option.value)}
                styles={{
                  control: (base) => ({ ...base, minWidth: 80, color: 'black' }),
                  option: (base) => ({ ...base, color: 'black' })
                }}
                menuPlacement="auto"
                isSearchable={false}
              />
            </div>
          </div>

          {/* 1) Couleur du texte */}
          <label className="modal-label-black">
            Couleur:
            <div style={{ display: "inline-block", marginLeft: 10 }}>
              <div
                className="accueil-color-preview"
                style={{ background: data.accueilProps.AccueilColorTitle }}
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
                      onChange={color => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilColorTitle')(color.hex)}
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
        </div>



        <h3 className="sub-heading">Option de la BIO</h3>
        <div style={{ margin: '10px 0' }}>
          {/* Font Family Dropdown using react-select */}
          <div className="accueil-font-row">
            {/* <span className="nav-font-label">Police :</span> */}
            <div className="accueil-font-select-wrapper">
              <Select
                options={fontFamilies.map(f => ({ label: f.label, value: f.value }))}
                value={fontFamilies.find(f => f.value === data.accueilProps.AccueilFontFamilyBIO) || fontFamilies[0]}
                onChange={option => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontFamilyBIO')(option.value)}
                styles={{
                  control: (base) => ({ ...base, fontFamily: data.accueilProps.AccueilFontFamilyBIO, color: 'black' }),
                  option: (base, state) => ({ ...base, fontFamily: state.data.value, color: 'black' })
                }}
                menuPlacement="auto"
                isSearchable={false}
              />
            </div>
          </div>

          {/* Font Size Slider */}
          <div className="accueil-font-row">
            {/* <span className="nav-font-label">Taille :</span> */}
            <input
              type="range"
              min={20}
              max={60}
              value={parseInt(data.accueilProps.AccueilFontSizeBIO) || 16}
              onChange={e => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontSizeBIO')(e.target.value + 'px')}
              className="accueil-font-size-slider"
            />
            <span className="modal-span-black">{parseInt(data.accueilProps.AccueilFontSizeBIO) || 16}px</span>
          </div>

          {/* Font Weight Selector */}
          <div className="accueil-font-row">
            {/* <span className="nav-font-label">Graisse :</span> */}
            <div className="accueil-font-select-wrapper">
              <Select
                options={[{ label: 'Normal', value: 'normal' }, { label: 'Gras', value: 'bold' }]
                }
                value={{ label: data.accueilProps.AccueilFontWeightBIO === 'bold' ? 'Gras' : 'Normal', value: data.accueilProps.AccueilFontWeightBIO || 'bold' }}
                onChange={option => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontWeightBIO')(option.value)}
                styles={{
                  control: (base) => ({ ...base, minWidth: 80, color: 'black' }),
                  option: (base) => ({ ...base, color: 'black' })
                }}
                menuPlacement="auto"
                isSearchable={false}
              />
            </div>
          </div>

          {/* 1) Couleur du texte */}
          <label className="modal-label-black">
            Couleur:
            <div style={{ display: "inline-block", marginLeft: 10 }}>
              <div
                className="accueil-color-preview"
                style={{ background: data.accueilProps.AccueilColorBIO }}
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
                      onChange={color => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilColorBIO')(color.hex)}
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

          {/* Ligne séparatrice */}
          <div style={{ borderTop: '1px solid #ccc', margin: '16px 0' }} />

          <label className="modal-label-black"> Chargez une image de fond: </label>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px 0' }}>
            <UpdateBackground
              onUpload={handleBackgroundUpload}
              disabled={isPublished} />
          </div>
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
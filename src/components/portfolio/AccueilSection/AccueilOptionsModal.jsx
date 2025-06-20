import { useState, useRef } from "react";
import { SketchPicker } from "react-color";
import Select from "react-select";
import fontFamilies from "../../common/fontFamilies";
import '../../../styles/NavSection.css';
import '../../../styles/AccueilSection.css';
import '../../../styles/PortfolioTemplate.css';
import '../../../styles/common.css';
import { handleNestedFieldChange } from '../../../hooks/HandlePortfolioData';
import UpdateBackground from "../../common/UpdateBackground";
import Draggable from 'react-draggable';
import { X } from "lucide-react";

export default function AccueilOptionsModal({ show, onClose, setData, data,
  isPublished,
  handleBackgroundUpload,
  handleProfileUpload
}) {
  const [activeSection, setActiveSection] = useState(null); // Single state for active section
  const [showNavLinkColorPickerTitle, setShowNavLinkColorPickerTitle] = useState(false);
  const [showNavLinkColorPickerBIO, setShowNavLinkColorPickerBIO] = useState(false);
  const [showSocialColorPicker, setShowSocialColorPicker] = useState(false); // For AccueilSocialColor
  const nodeRef = useRef(null);

  if (!show) return null;

  const toggleSection = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

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
          className="modal-template option drag"
          style={{cursor: 'grab'}}>
            
          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="modal-close-button">
            <X size={20} color="white" />
          </button>

          <h2 className="modal-heading" style={{cursor: 'grab'}}>
            Section Accueil
          </h2>

          {/* Option du NOM */}
          <button className="collapse-toggle" onClick={() => toggleSection('Nom')}>
            <span style={{display:'flex', alignItems:'center', gap:6}}>{activeSection === 'Nom' ? '▼' : '►'} <span>Option du NOM</span></span>
            <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span>
          </button>
          <div className={`collapsible-content${activeSection === 'Nom' ? ' open' : ''}`}>
            {activeSection === 'Nom' && (
              <div style={{ margin: '10px 0' }}>
                {/* Font Family Dropdown using react-select */}
                <div className="modal-font-row">
                  <div className="modal-font-select-wrapper">
                    <Select
                      options={fontFamilies.map(f => ({ label: f.label, value: f.value }))}
                      value={fontFamilies.find(f => f.value === data.accueilProps.AccueilFontFamilyTitle) || fontFamilies[0]}
                      onChange={option => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontFamilyTitle')(option.value)}
                      styles={{
                        control: (base) => ({ ...base, fontFamily: data.accueilProps.AccueilFontFamilyTitle, color: 'black' }),
                        option: (base, state) => ({ ...base, fontFamily: state.data.value, color: 'black' })
                      }}
                      menuPlacement="bottom"
                      maxMenuHeight={200}
                      isSearchable={false}
                    />
                  </div>
                </div>

                {/* Font Size Slider */}
                <div className="modal-font-row">
                  <input
                    type="range"
                    min={20}
                    max={60}
                    value={parseInt(data.accueilProps.AccueilFontSizeTitle) || 16}
                    onChange={e => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontSizeTitle')(e.target.value + 'px')}
                    className="modal-slider"
                  />
                  <span className="modal-span-black">{parseInt(data.accueilProps.AccueilFontSizeTitle) || 16}px</span>
                </div>

                {/* Font Weight Selector */}
                <div className="modal-font-row">
                  <div className="modal-font-select-wrapper">
                    <Select
                      options={[{ label: 'Normal', value: 'normal' }, { label: 'Gras', value: 'bold' }]
                      }
                      value={{ label: data.accueilProps.AccueilFontWeightTitle === 'bold' ? 'Gras' : 'Normal', value: data.accueilProps.AccueilFontWeightTitle || 'bold' }}
                      onChange={option => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontWeightTitle')(option.value)}
                      styles={{
                        control: (base) => ({ ...base, minWidth: 80, color: 'black' }),
                        option: (base) => ({ ...base, color: 'black' })
                      }}
                      menuPlacement="bottom"
                      maxMenuHeight={200}
                      isSearchable={false}
                    />
                  </div>
                </div>

                {/* Couleur du texte */}
                <label className="modal-label-black">
                  Couleur:
                  <div className="modal-color-preview-wrapper">
                    <div
                      className="modal-color-preview"
                      style={{ background: data.accueilProps.AccueilColorTitle }}
                      onClick={() => setShowNavLinkColorPickerTitle(true)}
                    />
                    {showNavLinkColorPickerTitle && (
                      <div className="modal-color-picker">
                        <div
                          style={{
                            boxShadow: 'none',
                            filter: 'none'
                          }}>
                          <SketchPicker
                            color={data.accueilProps.AccueilColorTitle}
                            onChange={color => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilColorTitle')(color.hex)}
                            styles={{default: { picker: { boxShadow: 'none' } }}}
                            className="modal-SketchPicker"
                          />
                        </div>
                        <button style={{ marginTop: 16 }} onClick={() => setShowNavLinkColorPickerTitle(false)}>Fermer</button>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* Option de la BIO */}
          <button className="collapse-toggle" onClick={() => toggleSection('Bio')}>
            <span style={{display:'flex', alignItems:'center', gap:6}}>{activeSection === 'Bio' ? '▼' : '►'} <span>Option de la BIO</span></span>
            <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span>
          </button>
          <div className={`collapsible-content${activeSection === 'Bio' ? ' open' : ''}`}>
            {activeSection === 'Bio' && (
              <div style={{ margin: '10px 0' }}>
                {/* Font Family Dropdown using react-select */}
                <div className="modal-font-row">
                  <div className="modal-font-select-wrapper">
                    <Select
                      options={fontFamilies.map(f => ({ label: f.label, value: f.value }))}
                      value={fontFamilies.find(f => f.value === data.accueilProps.AccueilFontFamilyBIO) || fontFamilies[0]}
                      onChange={option => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontFamilyBIO')(option.value)}
                      styles={{
                        control: (base) => ({ ...base, fontFamily: data.accueilProps.AccueilFontFamilyBIO, color: 'black' }),
                        option: (base, state) => ({ ...base, fontFamily: state.data.value, color: 'black' })
                      }}
                      menuPlacement="bottom"
                      maxMenuHeight={200}
                      isSearchable={false}
                    />
                  </div>
                </div>

                {/* Font Size Slider */}
                <div className="modal-font-row">
                  <input
                    type="range"
                    min={10}
                    max={40}
                    value={parseInt(data.accueilProps.AccueilFontSizeBIO) || 16}
                    onChange={e => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontSizeBIO')(e.target.value + 'px')}
                    className="modal-slider"
                  />
                  <span className="modal-span-black">{parseInt(data.accueilProps.AccueilFontSizeBIO) || 16}px</span>
                </div>

                {/* Font Weight Selector */}
                <div className="modal-font-row">
                  <div className="modal-font-select-wrapper">
                    <Select
                      options={[{ label: 'Normal', value: 'normal' }, { label: 'Gras', value: 'bold' }]
                      }
                      value={{ label: data.accueilProps.AccueilFontWeightBIO === 'bold' ? 'Gras' : 'Normal', value: data.accueilProps.AccueilFontWeightBIO || 'bold' }}
                      onChange={option => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilFontWeightBIO')(option.value)}
                      styles={{
                        control: (base) => ({ ...base, minWidth: 80, color: 'black' }),
                        option: (base) => ({ ...base, color: 'black' })
                      }}
                      menuPlacement="bottom"
                      maxMenuHeight={200}
                      isSearchable={false}
                    />
                  </div>
                </div>

                {/* Couleur du texte */}
                <label className="modal-label-black">
                  Couleur:
                  <div className="modal-color-preview-wrapper">
                    <div
                      className="modal-color-preview"
                      style={{ background: data.accueilProps.AccueilColorBIO }}
                      onClick={() => setShowNavLinkColorPickerBIO(true)}
                    />
                    {showNavLinkColorPickerBIO && (
                      <div className="modal-color-picker">
                        <div
                          style={{
                            boxShadow: 'none',
                            filter: 'none'
                          }}>
                          <SketchPicker
                            color={data.accueilProps.AccueilColorBIO}
                            onChange={color => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilColorBIO')(color.hex)}
                            styles={{default: { picker: { boxShadow: 'none' } }}}
                            className="modal-SketchPicker"
                          />
                        </div>
                        <button style={{ marginTop: 16 }} onClick={() => setShowNavLinkColorPickerBIO(false)}>Fermer</button>
                      </div>
                    )}
                  </div>
                </label>

              </div>
            )}
          </div>

          {/* Couleur des icônes sociales */}
          <button className="collapse-toggle" onClick={() => toggleSection('SocialColor')}>
            <span style={{display:'flex', alignItems:'center', gap:6}}>{activeSection === 'SocialColor' ? '▼' : '►'} <span>Couleur des icônes sociales</span></span>
            <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span>
          </button>
          <div className={`collapsible-content${activeSection === 'SocialColor' ? ' open' : ''}`}> 
            {activeSection === 'SocialColor' && (
              <div style={{ margin: '10px 0' }}>
                <label className="modal-label-black">
                  Couleur des icônes sociales:
                  <div className="modal-color-preview-wrapper">
                    <div
                      className="modal-color-preview"
                      style={{ background: data.accueilProps.AccueilSocialColor }}
                      onClick={() => setShowSocialColorPicker(true)}
                    />
                    {showSocialColorPicker && (
                      <div className="modal-color-picker">
                        <div style={{ boxShadow: 'none', filter: 'none' }}>
                          <SketchPicker
                            color={data.accueilProps.AccueilSocialColor}
                            onChange={color => handleNestedFieldChange(setData, data, 'accueilProps', 'AccueilSocialColor')(color.hex)}
                            styles={{default: { picker: { boxShadow: 'none' } }}}
                            className="modal-SketchPicker"
                          />
                        </div>
                        <button style={{ marginTop: 16 }} onClick={() => setShowSocialColorPicker(false)}>Fermer</button>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* Image de fond */}
          <button className="collapse-toggle" onClick={() => toggleSection('Background')}>
            <span style={{display:'flex', alignItems:'center', gap:6}}>{activeSection === 'Background' ? '▼' : '►'} <span>Image de fond</span></span>
            <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span>
          </button>
          <div className={`collapsible-content${activeSection === 'Background' ? ' open' : ''}`}>
            {activeSection === 'Background' && (
              <div className="modal-update-background">
                <label className="modal-label-black"> Chargez une image de fond: </label>
                <UpdateBackground
                  onUpload={handleBackgroundUpload}
                  disabled={isPublished} />
              </div>
            )}
          </div>

          {/* Image de profil */}
          <button className="collapse-toggle" onClick={() => toggleSection('Profile')}>
            <span style={{display:'flex', alignItems:'center', gap:6}}>{activeSection === 'Profile' ? '▼' : '►'} <span>Charger photo de profile</span></span>
            <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span>
          </button>
          <div className={`collapsible-content${activeSection === 'Profile' ? ' open' : ''}`}>
            {activeSection === 'Profile' && (
              <div className="modal-update-background">
                <label className="modal-label-black"> Charger une photo de profil: </label>
                <UpdateBackground
                  onUpload={handleProfileUpload}
                  disabled={isPublished} />
              </div>
            )}
          </div>

        </div>
      </Draggable>
    </div>
  );
}
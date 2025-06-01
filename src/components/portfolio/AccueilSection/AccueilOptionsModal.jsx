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
  handleBackgroundUpload
}) {
  // Utilisation directe de handleNestedFieldChange importée
  const [showNavLinkColorPickerTitle, setShowNavLinkColorPickerTitle] = useState(false);
  const [showNavLinkColorPickerBIO, setShowNavLinkColorPickerBIO] = useState(false);
  const [collapseNom, setCollapseNom] = useState(false);
  const [collapseBio, setCollapseBio] = useState(false);
  const [collapseBg, setCollapseBg] = useState(false);
  const nodeRef = useRef(null);

  if (!show) return null;

  return (
    <>
      <Draggable nodeRef={nodeRef} cancel=".accueil-font-size-slider, 
      input, .accueil-font-select-wrapper, 
      .modal-close-button, .collapse-toggle, 
      .accueil-color-preview, 
      .accueil-update-background,
      .accueil-SketchPicker">
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
          <button className="collapse-toggle" onClick={() => setCollapseNom(v => !v)}>
            {/* <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span> */}
            <span style={{display:'flex', alignItems:'center', gap:6}}>{collapseNom ? '▼' : '►'} <span>Option du NOM</span></span>
            <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span>
          </button>
          <div className={`collapsible-content${collapseNom ? ' open' : ''}`}>
            {collapseNom && (
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
                            className="accueil-SketchPicker"
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
          <button className="collapse-toggle" onClick={() => setCollapseBio(v => !v)}>
            {/* <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span> */}
            <span style={{display:'flex', alignItems:'center', gap:6}}>{collapseBio ? '▼' : '►'} <span>Option de la BIO</span></span>
            <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span>
          </button>
          <div className={`collapsible-content${collapseBio ? ' open' : ''}`}>
            {collapseBio && (
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
                    min={10}
                    max={40}
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
                            className="accueil-SketchPicker"
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

          {/* Image de fond */}
          <button className="collapse-toggle" onClick={() => setCollapseBg(v => !v)}>
            {/* <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span> */}
            <span style={{display:'flex', alignItems:'center', gap:6}}>{collapseBg ? '▼' : '►'} <span>Image de fond</span></span>
            <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span>
          </button>
          <div className={`collapsible-content${collapseBg ? ' open' : ''}`}>
            {collapseBg && (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '5px 0 16px 0' }}>
                <label className="modal-label-black"> Chargez une image de fond: </label>
                <UpdateBackground
                  className="accueil-update-background"
                  onUpload={handleBackgroundUpload}
                  disabled={isPublished} />
              </div>
            )}
          </div>

          {/* <button onClick={onClose}>Fermer</button> */}
        </div>
      </Draggable>
      <div
        className="modal-overlay"
        style={{ backgroundColor: "transparent" }}
      />
    </>
  );
}
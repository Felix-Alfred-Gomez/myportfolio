import { useState, useRef } from "react";
import Select from "react-select";
import '../../../styles/NavSection.css';
import '../../../styles/AccueilSection.css';
import '../../../styles/PortfolioTemplate.css';
import '../../../styles/common.css';
import UpdateBackground from "../../common/UpdateBackground";
import Draggable from 'react-draggable';
import { X } from "lucide-react";
import fontFamilies from "../../common/fontFamilies";
import { handleNestedFieldChange } from '../../../hooks/HandlePortfolioData';
import { SketchPicker } from "react-color";

export default function ProjetOptionsModal({
  data,
  setData,
  show,
  onClose,
  isPublished,
  handleBackgroundUpload,
}) {

  const [showNavLinkColorPickerTitle, setShowNavLinkColorPickerTitle] = useState(false);
  const [showNavLinkColorPickerText, setShowNavLinkColorPickerText] = useState(false);
  const [showCartoucheBgColorPicker, setShowCartoucheBgColorPicker] = useState(false);
  const [showCartoucheHoverColorPicker, setShowCartoucheHoverColorPicker] = useState(false);
  const [collapseNom, setCollapseNom] = useState(false);
  const [collapseBg, setCollapseBg] = useState(false);
  const [collapseDesc, setCollapseDesc] = useState(false);
  const [collapseCartouche, setCollapseCartouche] = useState(false);
  const nodeRef = useRef(null);

  if (!show) return null;

  return (
    <div className="modal-overlay z9">
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

          <button className="collapse-toggle" onClick={() => setCollapseNom(v => !v)}>
            {/* <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span> */}
            <span style={{display:'flex', alignItems:'center', gap:6}}>{collapseNom ? '▼' : '►'} <span>Nombre de projets</span></span>
            <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span>
          </button>
          <div className={`collapsible-content${collapseNom ? ' open' : ''}`}>
            {collapseNom && (
              <div style={{ margin: '10px 0' }}>

                {/* Font Size Slider */}
                <div className="modal-font-row">
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={parseInt(data.projetProps?.NbProjectsUser) || 8}
                    onChange={e => handleNestedFieldChange(setData, data, 'projetProps', 'NbProjectsUser')(e.target.value)}
                    className="modal-slider"
                  />
                  <span className="modal-span-black">{parseInt(data.projetProps?.NbProjectsUser) || 8}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Options for the project title font */}
          <button className="collapse-toggle" onClick={() => setCollapseNom(v => !v)}>
            {/* <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span> */}
            <span style={{display:'flex', alignItems:'center', gap:6}}>{collapseNom ? '▼' : '►'} <span>Options des titres</span></span>
            <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span>
          </button>
          <div className={`collapsible-content${collapseNom ? ' open' : ''}`}> 
            {collapseNom && (
              <div style={{ margin: '10px 0' }}>
                {/* Font Family Dropdown using react-select */}
                <div className="modal-font-row">
                  <div className="modal-font-select-wrapper">
                    <Select
                      options={fontFamilies.map(f => ({ label: f.label, value: f.value }))}
                      value={fontFamilies.find(f => f.value === data.projetProps.FontFamilyTitle) || fontFamilies[0]}
                      onChange={option => handleNestedFieldChange(setData, data, 'projetProps', 'FontFamilyTitle')(option.value)}
                      styles={{
                        control: (base) => ({ ...base, fontFamily: data.projetProps.FontFamilyTitle, color: 'black' }),
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
                    value={parseInt(data.projetProps.FontSizeTitle) || 20}
                    onChange={e => handleNestedFieldChange(setData, data, 'projetProps', 'FontSizeTitle')(e.target.value + 'px')}
                    className="modal-slider"
                  />
                  <span className="modal-span-black">{parseInt(data.projetProps.FontSizeTitle) || 20}px</span>
                </div>

                {/* Font Weight Selector */}
                <div className="modal-font-row">
                  <div className="modal-font-select-wrapper">
                    <Select
                      options={[{ label: 'Normal', value: 'normal' }, { label: 'Gras', value: 'bold' }]}
                      value={{ label: data.projetProps.FontWeightTitle === 'bold' ? 'Gras' : 'Normal', value: data.projetProps.FontWeightTitle || 'bold' }}
                      onChange={option => handleNestedFieldChange(setData, data, 'projetProps', 'FontWeightTitle')(option.value)}
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

                {/* 1) Couleur du texte */}
                <label className="modal-label-black">
                  Couleur:
                  <div className="modal-color-preview-wrapper">
                    <div
                      className="modal-color-preview"
                      style={{ background: data.projetProps.ColorTitle }}
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
                            color={data.projetProps.ColorTitle}
                            onChange={color => handleNestedFieldChange(setData, data, 'projetProps', 'ColorTitle')(color.hex)}
                            styles={{default: { picker: { boxShadow: 'none' } }}}
                            className="modal-SketchPicker"
                            disableAlpha={true}
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

          {/* Options for the project description font */}
          <button className="collapse-toggle" onClick={() => setCollapseDesc(v => !v)}>
            <span style={{display:'flex', alignItems:'center', gap:6}}>{collapseDesc ? '▼' : '►'} <span>Options des descriptions</span></span>
            <span style={{flex:1, height:1, background:'#ccc', display:'block', borderRadius:2}}></span>
          </button>
          <div className={`collapsible-content${collapseDesc ? ' open' : ''}`}> 
            {collapseDesc && (
              <div style={{ margin: '10px 0' }}>
                {/* Font Family Dropdown using react-select */}
                <div className="modal-font-row">
                  <div className="modal-font-select-wrapper">
                    <Select
                      options={fontFamilies.map(f => ({ label: f.label, value: f.value }))}
                      value={fontFamilies.find(f => f.value === data.projetProps.FontFamilyText) || fontFamilies[0]}
                      onChange={option => handleNestedFieldChange(setData, data, 'projetProps', 'FontFamilyText')(option.value)}
                      styles={{
                        control: (base) => ({ ...base, fontFamily: data.projetProps.FontFamilyText, color: 'black' }),
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
                    max={30}
                    value={parseInt(data.projetProps.FontSizeText) || 15}
                    onChange={e => handleNestedFieldChange(setData, data, 'projetProps', 'FontSizeText')(e.target.value + 'px')}
                    className="modal-slider"
                  />
                  <span className="modal-span-black">{parseInt(data.projetProps.FontSizeText) || 15}px</span>
                </div>

                {/* Font Weight Selector */}
                <div className="modal-font-row">
                  <div className="modal-font-select-wrapper">
                    <Select
                      options={[{ label: 'Normal', value: 'normal' }, { label: 'Gras', value: 'bold' }]}
                      value={{ label: data.projetProps.FontWeightText === 'bold' ? 'Gras' : 'Normal', value: data.projetProps.FontWeightText || 'bold' }}
                      onChange={option => handleNestedFieldChange(setData, data, 'projetProps', 'FontWeightText')(option.value)}
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
                      style={{ background: data.projetProps.ColorText }}
                      onClick={() => setShowNavLinkColorPickerText(true)}
                    />
                    {showNavLinkColorPickerText && (
                      <div className="modal-color-picker">
                        <div
                          style={{
                            boxShadow: 'none',
                            filter: 'none'
                          }}>
                          <SketchPicker
                            color={data.projetProps.ColorText}
                            onChange={color => handleNestedFieldChange(setData, data, 'projetProps', 'ColorText')(color.hex)}
                            styles={{default: { picker: { boxShadow: 'none' } }}}
                            className="modal-SketchPicker"
                            disableAlpha={true}
                          />
                        </div>
                        <button style={{ marginTop: 16 }} onClick={() => setShowNavLinkColorPickerText(false)}>Fermer</button>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* Couleurs de cartouches */}
          <button className="collapse-toggle" onClick={() => setCollapseCartouche(v => !v)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{collapseCartouche ? '▼' : '►'} <span>Couleurs de cartouches</span></span>
            <span style={{ flex: 1, height: 1, background: '#ccc', display: 'block', borderRadius: 2 }}></span>
          </button>
          <div className={`collapsible-content${collapseCartouche ? ' open' : ''}`}>
            {collapseCartouche && (
              <div style={{ margin: '10px 0' }}>
                {/* Background Color */}
                <label className="modal-label-black">
                  Couleur de fond:
                  <div className="modal-color-preview-wrapper">
                    <div
                      className="modal-color-preview"
                      style={{ background: data.projetProps.BackgroundColor || '#ffffff' }}
                      onClick={() => setShowCartoucheBgColorPicker(true)}
                    />
                    {showCartoucheBgColorPicker && (
                      <div className="modal-color-picker">
                        <div style={{ boxShadow: 'none', filter: 'none' }}>
                          <SketchPicker
                            color={data.projetProps.BackgroundColor || '#ffffff'}
                            onChange={color => handleNestedFieldChange(setData, data, 'projetProps', 'BackgroundColor')(color.hex)}
                            styles={{ default: { picker: { boxShadow: 'none' } } }}
                            className="modal-SketchPicker"
                            disableAlpha={true}
                          />
                        </div>
                        <button style={{ marginTop: 16 }} onClick={() => setShowCartoucheBgColorPicker(false)}>Fermer</button>
                      </div>
                    )}
                  </div>
                </label>
                {/* Hover Color */}
                <label className="modal-label-black" style={{ marginTop: 16 }}>
                  Couleur au survol:
                  <div className="modal-color-preview-wrapper">
                    <div
                      className="modal-color-preview"
                      style={{ background: data.projetProps.HoverColor || '#ffffff' }}
                      onClick={() => setShowCartoucheHoverColorPicker(true)}
                    />
                    {showCartoucheHoverColorPicker && (
                      <div className="modal-color-picker">
                        <div style={{ boxShadow: 'none', filter: 'none' }}>
                          <SketchPicker
                            color={data.projetProps.HoverColor || '#ffffff'}
                            onChange={color => handleNestedFieldChange(setData, data, 'projetProps', 'HoverColor')(color.hex)}
                            styles={{ default: { picker: { boxShadow: 'none' } } }}
                            className="modal-SketchPicker"
                            disableAlpha={true}
                          />
                        </div>
                        <button style={{ marginTop: 16 }} onClick={() => setShowCartoucheHoverColorPicker(false)}>Fermer</button>
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
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{collapseBg ? '▼' : '►'} <span>Image de fond de la section</span></span>
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
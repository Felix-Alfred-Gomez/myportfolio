import { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { getResponsiveFontSize } from "./responsiveFontSize";

export default function UpdateSkillsStack({
  isPublished,
  value,
  onChange,
  containerClass = "",
  boxClass = "",
  textareaClass = "",
  fontFamilyStyle,
  fontFamilySize = 16,
  fontFamilyWeight,
  fontColor = "#fff",
  boxColor
}) {
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef(null);
  const [responsiveFontSize, setResponsiveFontSize] = useState(fontFamilySize);

  // Parse skills from comma-separated string
  const skills = value
    ? value.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  // Auto-resize textarea
  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [editing, value]);

  // Handle click outside to exit editing
  useEffect(() => {
    if (!editing) return;
    function handleClick(e) {
      if (textareaRef.current && !textareaRef.current.contains(e.target)) {
        setEditing(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [editing]);

  // Update responsive font size on resize
  useEffect(() => {
    function handleResize() {
      setResponsiveFontSize(getResponsiveFontSize(fontFamilySize));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fontFamilySize]);

  // Render skills as red boxes
  const renderSkillBoxes = () => (
    <div className={`flex-wrap-center ${containerClass}`}>
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className={`${boxClass} editing-skill-box ${isPublished ? "published-skill-box" : ""}`}
          style={{
            color: fontColor,
            fontFamily: fontFamilyStyle,
            fontSize: responsiveFontSize,
            fontWeight: fontFamilyWeight,
            background: boxColor
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );

  // Published mode: always show boxes, but if no skills, render nothing
  if (isPublished) {
    if (skills.length === 0) return null;
    return renderSkillBoxes();
  }

  // Edit mode: show textarea if editing, else boxes (toggle edit by clicking a skill)
  if (editing) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          className={`${textareaClass} update-skills-editing`}
          style={{
            fontFamily: fontFamilyStyle,
            fontSize: responsiveFontSize,
            fontWeight: fontFamilyWeight,
            color: "#000" // Set font color to black in edition mode
          }}
          rows={1}
          onBlur={() => setEditing(false)}
          autoFocus
        />
        <button
          type="button"
          className="edit-pen"
          aria-label="Validate skills"
          onClick={() => setEditing(false)}
        >
          <FaCheck className="edit-tick" />
        </button>
      </div>
    );
  }

  // If no skills, show a placeholder box to allow editing
  if (skills.length === 0) {
    return (
      <div className={`flex-wrap-center ${containerClass}`}>
        <span
          className={`${boxClass} editing-skill-box`}
          style={{
            color: fontColor,
            fontFamily: fontFamilyStyle,
            fontSize: responsiveFontSize,
            fontWeight: fontFamilyWeight,
            background: boxColor,
            opacity: 0.6,
            cursor: "pointer"
          }}
          onClick={() => setEditing(true)}
        >
          Ajouter une compétence
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex-wrap-center ${containerClass}`}
    >
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className={`${boxClass} editing-skill-box`}
          style={{
            color: fontColor,
            fontFamily: fontFamilyStyle,
            fontSize: responsiveFontSize,
            fontWeight: fontFamilyWeight,
            background: boxColor,
            cursor: "pointer"
          }}
          onClick={() => setEditing(true)}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

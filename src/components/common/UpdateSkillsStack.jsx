import { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

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
  fontColor = "#fff"
}) {
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef(null);

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

  // Render skills as red boxes
  const renderSkillBoxes = () => (
    <div className={containerClass} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className={boxClass}
          style={{
            background: "#e53935",
            color: fontColor,
            borderRadius: 6,
            padding: "2px 10px",
            fontFamily: fontFamilyStyle,
            fontSize: fontFamilySize,
            fontWeight: fontFamilyWeight,
            marginBottom: 4
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );

  // Published mode: always show boxes
  if (isPublished) {
    return renderSkillBoxes();
  }

  // Edit mode: show textarea if editing, else boxes (toggle edit by clicking a skill)
  return editing ? (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        className={`${textareaClass} update-skills-editing`}
        style={{
          width: "100%",
          minHeight: 32,
          overflow: "hidden",
          fontFamily: fontFamilyStyle,
          fontSize: fontFamilySize,
          fontWeight: fontFamilyWeight,
          color: fontColor,
          border: "1px solid #e53935",
          borderRadius: 6,
          padding: 8
        }}
        rows={1}
        onBlur={() => setEditing(false)}
        autoFocus
      />
      <button
        type="button"
        className="skills-edit-pen"
        aria-label="Validate skills"
        onClick={() => setEditing(false)}
      >
        <FaCheck className="skills-edit-pen-icon" />
      </button>
    </div>
  ) : (
    <div className={containerClass} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className={`${boxClass} editing-skill-box`}
          style={{
            background: "#e53935",
            color: fontColor,
            borderRadius: 6,
            padding: "2px 10px",
            fontFamily: fontFamilyStyle,
            fontSize: fontFamilySize,
            fontWeight: fontFamilyWeight,
            marginBottom: 4,
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

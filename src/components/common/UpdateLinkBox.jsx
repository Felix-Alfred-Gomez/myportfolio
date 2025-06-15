import { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

export default function UpdateLinkBox({
  isPublished,
  value,
  onChange
}) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus input when editing
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  // Handle click outside to exit editing
  useEffect(() => {
    if (!editing) return;
    function handleClick(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setEditing(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [editing]);

  if (isPublished) {
    if (!value) return null;
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className={`link-box`}
      >
        Voir
      </a>
    );
  }

  return editing ? (
    <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        className={`update-link-editing`}
        onBlur={() => setEditing(false)}
        autoFocus
      />
      <button
        type="button"
        className="edit-pen"
        aria-label="Validate link"
        onClick={() => setEditing(false)}
      >
        <FaCheck className="edit-tick" />
      </button>
    </div>
  ) : (
    <span
      className={`link-box editing-link-box`}
      onClick={() => setEditing(true)}
    >
      URL du projet
    </span>
  );
}

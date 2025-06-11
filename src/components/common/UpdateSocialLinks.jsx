import { useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaCheck } from "react-icons/fa";

const SOCIALS = [
  { key: "linkedin", icon: FaLinkedin, label: "LinkedIn" },
  { key: "github", icon: FaGithub, label: "GitHub" },
  { key: "twitter", icon: FaTwitter, label: "Twitter" },
  { key: "website", icon: FaGlobe, label: "Website" },
];

export default function UpdateSocialLinks({ isPublished, socialLinks, onChange }) {
  const [editingKey, setEditingKey] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const getUrl = (key) => {
    const entry = socialLinks[key];
    if (typeof entry === "string") return entry;
    if (entry && typeof entry === "object") return entry.url || "";
    return "";
  };
  const isVisible = (key) => {
    // Only visible if url is not empty
    return !!getUrl(key);
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    setInputValue(getUrl(key));
  };

  const handleSave = (key) => {
    onChange(key, { url: inputValue, visible: true });
    setEditingKey(null);
  };

  return (
    <div className="update-social-links" style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 16 }}>
      {SOCIALS.map(({ key, icon: Icon, label }) => {
        if (isPublished && (!getUrl(key) || !isVisible(key))) return null;
        return (
          <div key={key} style={{ display: "flex", alignItems: "center" }}>
            {isPublished ? (
              <a href={getUrl(key)} target="_blank" rel="noopener noreferrer" title={label} className="social-link-icon">
                <Icon size={24} />
              </a>
            ) : editingKey === key ? (
              <>
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  className="update-link-editing"
                  style={{ width: 120 }}
                  autoFocus
                  onBlur={() => setEditingKey(null)}
                  placeholder={`URL ${label}`}
                />
                <button
                  type="button"
                  className="edit-pen"
                  aria-label="Validate link"
                  onClick={() => handleSave(key)}
                  style={{ marginLeft: 4 }}
                >
                  <FaCheck className="skills-edit-tick" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="social-link-icon-btn"
                  title={label}
                  onClick={() => handleEdit(key)}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <Icon size={24} color={getUrl(key) ? "#0077b5" : "#aaa"} />
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

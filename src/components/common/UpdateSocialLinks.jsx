import { useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaGlobe,
  FaCheck,
  FaGitlab,
  FaInstagram,
  FaYoutube,
  FaMedium,
} from "react-icons/fa";

const SOCIALS = [
  { key: "linkedin", icon: FaLinkedin },
  { key: "github", icon: FaGithub },
  { key: "gitlab", icon: FaGitlab },
  { key: "twitter", icon: FaTwitter },
  { key: "instagram", icon: FaInstagram },
  { key: "youtube", icon: FaYoutube },
  { key: "medium", icon: FaMedium },
  { key: "website", icon: FaGlobe },
];

export default function UpdateSocialLinks({ isPublished, socialLinks, onChange }) {
  const [editingKey, setEditingKey] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const getUrl = (key) => {
    const entry = socialLinks[key];
    return typeof entry === "string" ? entry : "";
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    setInputValue(getUrl(key));
  };

  const handleSave = (key) => {
    onChange(key, inputValue); // Save as a string only
    setEditingKey(null);
  };

  return (
    <div className="update-social-links" style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 16 }}>
      {SOCIALS.map(({ key, icon: Icon }) => {
        if (isPublished && !getUrl(key)) return null;
        return (
          <div key={key} style={{ display: "flex", alignItems: "center" }}>
            {isPublished ? (
              <a href={getUrl(key)} target="_blank" rel="noopener noreferrer" title={key} className="social-link-icon">
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
                  onBlur={() => handleSave(key)} // <-- Save on blur!
                  placeholder={`URL ${key}`}
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
                  title={key}
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

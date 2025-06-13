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

export default function UpdateSocialLinks({ isPublished, socialLinks, onChange, activeColor }) {
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
      {isPublished ? (
        SOCIALS.map(({ key, icon: Icon }) => {
          if (!getUrl(key)) return null;
          return (
            <div key={key} style={{ display: "flex", alignItems: "center" }}>
              <a
                href={getUrl(key)}
                target="_blank"
                rel="noopener noreferrer"
                title={key}
                className={`social-link-icon-btn${getUrl(key) ? " active" : ""}`}
              >
                <Icon size={24} style={getUrl(key) ? { color: activeColor || '#dfdfdf' } : {}} />
              </a>
            </div>
          );
        })
      ) : (
        <div className="editing-link-box-dashed" style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {SOCIALS.map(({ key, icon: Icon }) => (
            <div key={key} style={{ display: "flex", alignItems: "center" }}>
              {editingKey === key ? (
                <>
                  <Icon size={24} style={{ marginRight: 6, color: activeColor || '#dfdfdf' }} />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    className="update-link-editing"
                    style={{ width: 120 }}
                    autoFocus
                    onBlur={() => handleSave(key)}
                    placeholder={`URL ${key}`}
                  />
                  <button
                    type="button"
                    className="edit-pen"
                    aria-label="Validate link"
                    onMouseDown={() => handleSave(key)}
                    style={{ marginLeft: 4 }}
                  >
                    <FaCheck className="edit-tick" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className={`social-link-icon-btn${getUrl(key) ? " active" : ""}`}
                  title={key}
                  onClick={() => handleEdit(key)}
                  style={getUrl(key) ? {} : { background: "none", border: "none", cursor: "pointer" }}
                >
                  <Icon style={getUrl(key) ? { color: activeColor || '#dfdfdf' } : {}} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

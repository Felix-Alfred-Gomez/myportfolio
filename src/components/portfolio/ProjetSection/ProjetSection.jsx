import { useState } from "react";
import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import ProjetOptionsModal from "./ProjetOptionsModal";
import UpdateText from "../../common/UpdateText";
import { handleArrayFieldChange } from '../../../hooks/HandlePortfolioData';
import { X } from "lucide-react";
import UpdateBackground from "../../common/UpdateBackground";

export default function ProjetSection({ username, isPublished, data, setData }) {
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "ProjetBackground");
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(null);
  const selectedProject = selectedProjectIdx !== null ? data.projects[selectedProjectIdx] : null;

  // Add per-project image upload hook
  const {
    imageUrl: projectImageUrl,
    handleImageUpload: handleProjectImageUpload
  } = usePortfolioImage(
    username,
    selectedProjectIdx !== null ? `ProjectImage_${selectedProjectIdx}` : null
  );

  return (
    <section
      id="project"
      className="projet-section"
      style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})`,
      backgroundSize: "cover", backgroundPosition: "center" } : {}}>
      
      {!isPublished && (
        <button
          className="wheel-option template-page"
          title="Options"
          onClick={() => setShowDesignModal(true)}>
          <Cog6ToothIcon className="wheel-icon red" />
        </button>
      )}

      {/* Container for project cards */}
      <div className="projets-container">
        {Array.isArray(data?.projects) && data.projects.length > 0 ? (
          data.projects.map((projet, idx) => (
            <div
              key={projet.id || idx}
              className="projet-card"
              onClick={() => setSelectedProjectIdx(idx)}
              style={{ cursor: 'pointer' }}
            >
              <h3
                style={{
                  fontFamily: data.projetProps?.FontFamilyTitle,
                  fontSize: data.projetProps?.FontSizeTitle,
                  fontWeight: data.projetProps?.FontWeightTitle,
                  color: projet.ColorTitle
                }}
              >
                {projet.Title || `Projet ${idx + 1}`}
              </h3>
            </div>
          ))
        ) : (
          <p>Aucun projet à afficher.</p>
        )}
      </div>

      {/* Modal for enlarged project */}
      {selectedProject && (
        <div className="modal-overlay grey" onClick={() => setSelectedProjectIdx(null)}>
          <div className="modal-template" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setSelectedProjectIdx(null)}
              className="modal-close-button">
              <X size={20} color="white" />
            </button>
            
            <UpdateText
              isPublished={isPublished}
              value={selectedProject.Title}
              onChange={e => handleArrayFieldChange(setData, data,
                'projects', selectedProjectIdx, 'Title')(e.target.value)}
              containerClass="project-text-container"
              textClass="project-text-input"
              fontFamilyStyle={data.projetProps?.FontFamilyTitle}
              fontFamilySize={data.projetProps?.FontSizeTitle}
              fontFamilyWeight={data.projetProps?.FontWeightTitle}
              fontColor={selectedProject.ColorTitle}
            />
            
            {/* Project image if available */}
            {projectImageUrl && (
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <img
                  src={projectImageUrl}
                  alt="Project visual"
                  style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                />
              </div>
            )}

            <UpdateText
              isPublished={isPublished}
              value={selectedProject.Text}
              onChange={e => handleArrayFieldChange(setData, data,
                'projects', selectedProjectIdx, 'Text')(e.target.value)}
              containerClass="project-text-container"
              textClass="project-text-input"
              fontFamilyStyle={data.projetProps?.FontFamilyText}
              fontFamilySize={data.projetProps?.FontSizeText}
              fontFamilyWeight={data.projetProps?.FontWeightText}
              fontColor={selectedProject.ColorText}
            />
            {selectedProject.Link && selectedProject.Link !== '' && (
              <a href={selectedProject.Link} target="_blank" rel="noopener noreferrer" className="projet-link-modal">
                Voir le projet
              </a>
            )}
            {/* Project image upload at the bottom of the modal */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
              <UpdateBackground
                onUpload={handleProjectImageUpload}
                disabled={isPublished}
              />
            </div>

          </div>
        </div>
      )}

      {/* Design Options Modal */}
      <ProjetOptionsModal
        show={showDesignModal}
        onClose={() => setShowDesignModal(false)}
        isPublished={isPublished}
        handleBackgroundUpload={handleBackgroundUpload}
      />

    </section>
  );
}
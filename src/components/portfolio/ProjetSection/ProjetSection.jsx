import { useState } from "react";
import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import ProjetOptionsModal from "./ProjetOptionsModal";

export default function ProjetSection({ username, isPublished, data, setData }) {
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "ProjetBackground");
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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
              onClick={() => setSelectedProject(projet)}
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
              <p
                style={{
                  fontFamily: data.projetProps?.FontFamilyText,
                  fontSize: data.projetProps?.FontSizeText,
                  fontWeight: data.projetProps?.FontWeightText,
                  color: projet.ColorText
                }}
              >
                {projet.Text?.slice(0, 60)}{projet.Text && projet.Text.length > 60 ? '...' : ''}
              </p>
              {/* {Array.isArray(projet.Tech) && (
                <div className="projet-tech-list">
                  {projet.Tech.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="projet-tech"
                      style={{
                        fontFamily: data.projetProps?.FontFamilyTech,
                        fontSize: data.projetProps?.FontSizeTech,
                        fontWeight: data.projetProps?.FontWeightTech
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )} */}
            </div>
          ))
        ) : (
          <p>Aucun projet à afficher.</p>
        )}
      </div>

      {/* Modal for enlarged project */}
      {selectedProject && (
        <div className="projet-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="projet-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProject(null)}>X</button>
            <h2
              style={{
                fontFamily: data.projetProps?.FontFamilyTitle,
                fontSize: data.projetProps?.FontSizeTitle,
                fontWeight: data.projetProps?.FontWeightTitle,
                color: selectedProject.ColorTitle
              }}
            >
              {selectedProject.Title}
            </h2>
            <p
              style={{
                fontFamily: data.projetProps?.FontFamilyText,
                fontSize: data.projetProps?.FontSizeText,
                fontWeight: data.projetProps?.FontWeightText,
                color: selectedProject.ColorText
              }}
            >
              {selectedProject.Text}
            </p>
            {Array.isArray(selectedProject.Tech) && (
              <div className="projet-tech-list-modal">
                {selectedProject.Tech.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="projet-tech-modal"
                    style={{
                      fontFamily: data.projetProps?.FontFamilyTech,
                      fontSize: data.projetProps?.FontSizeTech,
                      fontWeight: data.projetProps?.FontWeightTech
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {selectedProject.Link && selectedProject.Link !== '' && (
              <a href={selectedProject.Link} target="_blank" rel="noopener noreferrer" className="projet-link-modal">
                Voir le projet
              </a>
            )}
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
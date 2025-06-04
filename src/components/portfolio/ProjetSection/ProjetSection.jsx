import { useState } from "react";
import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import ProjetOptionsModal from "./ProjetOptionsModal";
import UpdateText from "../../common/UpdateText";
import { handleArrayFieldChange } from '../../../hooks/HandlePortfolioData';

export default function ProjetSection({ username, isPublished, data, setData }) {
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "ProjetBackground");
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(null);
  const selectedProject = selectedProjectIdx !== null ? data.projects[selectedProjectIdx] : null;

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
        <div className="projet-modal-overlay" onClick={() => setSelectedProjectIdx(null)}>
          <div className="projet-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProjectIdx(null)}>X</button>
            {/* <h2
              style={{
                fontFamily: data.projetProps?.FontFamilyTitle,
                fontSize: data.projetProps?.FontSizeTitle,
                fontWeight: data.projetProps?.FontWeightTitle,
                color: selectedProject.ColorTitle
              }}
            >
              {selectedProject.Title}
            </h2> */}
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
              fontColor={selectedProject.ColorTitle}/>

            {/* <p
              style={{
                fontFamily: data.projetProps?.FontFamilyText,
                fontSize: data.projetProps?.FontSizeText,
                fontWeight: data.projetProps?.FontWeightText,
                color: selectedProject.ColorText
              }}
            >
              {selectedProject.Text}
            </p> */}

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

            {/* {Array.isArray(selectedProject.Tech) && (
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
            )} */}
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
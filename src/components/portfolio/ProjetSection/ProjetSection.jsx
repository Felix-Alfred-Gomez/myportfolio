import { useState, useEffect } from "react";
import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import { FaPencilAlt } from "react-icons/fa";
import ProjetOptionsModal from "./ProjetOptionsModal";
import { handleArrayFieldChange } from '../../../hooks/HandlePortfolioData';
import BackgroundDefault from "../../../assets/Projets_default.jpg";
import projectDefault from "../../../assets/OneProject_default.jpg";
import ProjectModal from "./ProjectModal";
import ProjectImage from "./ProjectImage";
import { getResponsiveFontSize } from "../../common/responsiveFontSize";


export default function ProjetSection({ username, isPublished, data, setData }) {
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "ProjetBackground", undefined, BackgroundDefault);
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(null);
  const [imageRefreshKeys, setImageRefreshKeys] = useState({});
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const selectedProject = selectedProjectIdx !== null ? data.projects[selectedProjectIdx] : null;

  // Add per-project image upload hook
  const {
    imageUrl: projectImageUrl,
    handleImageUpload,
    loading: projectImageLoading
  } = usePortfolioImage(
    username,
    selectedProjectIdx !== null ? `ProjectImage_${selectedProjectIdx}` : null,
    undefined, projectDefault
  );

  const handleProjectImageUpload = async (file) => {
    await handleImageUpload(file);
    setImageRefreshKeys(prev => ({
      ...prev,
      [selectedProjectIdx]: Date.now()
    }));
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="project"
      className="projet-section"
      style={backgroundUrl ? {
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover", backgroundPosition: "center"
      } : {}}>

      {!isPublished && (
        <button
          className="pen-edition template-page zlevel9"
          title="Options"
          onClick={() => setShowDesignModal(true)}>
          <FaPencilAlt className="pen-icon red" />
        </button>
      )}

      {/* Container for project cards */}
      <div className="projets-container">
        {Array.isArray(data?.projects) && data.projects.length > 0 ? (
          data.projects.slice(0, data.projetProps?.NbProjectsUser || 8).map((projet, idx) => (
            <div
              key={projet.id || idx}
              className="projet-card"
              onClick={() => setSelectedProjectIdx(idx)}
              onMouseEnter={() => setHoveredCardIdx(idx)}
              onMouseLeave={() => setHoveredCardIdx(null)}
              style={{
                cursor: 'pointer',
                background: hoveredCardIdx === idx
                  ? data.projetProps?.HoverColor || '#ffffff'
                  : data.projetProps?.BackgroundColor || '#ffffff',
                transition: 'background 0.2s'
              }}>
              <h3
                style={{
                  fontFamily: data.projetProps?.FontFamilyTitle,
                  fontSize: getResponsiveFontSize(data.projetProps?.FontSizeTitle),
                  fontWeight: data.projetProps?.FontWeightTitle,
                  color: data.projetProps?.ColorTitle
                }}
              >
                {projet.Title || `Projet ${idx + 1}`}
              </h3>

              {/* Project image (if any) */}
              <ProjectImage username={username} index={idx} refreshKey={imageRefreshKeys[idx]} />
            </div>
          ))
        ) : (
          <p>Aucun projet à afficher.</p>
        )}
      </div>

      {/* Modal for enlarged project */}
      {selectedProject && !projectImageLoading && projectImageUrl && (
        <ProjectModal
          isPublished={isPublished}
          selectedProject={selectedProject}
          selectedProjectIdx={selectedProjectIdx}
          data={data}
          setData={setData}
          handleArrayFieldChange={handleArrayFieldChange}
          projectImageUrl={projectImageUrl}
          projectImageLoading={projectImageLoading}
          handleProjectImageUpload={handleProjectImageUpload}
          onClose={() => setSelectedProjectIdx(null)}
        />
      )}

      {/* Design Options Modal */}
      <ProjetOptionsModal
        data={data}
        setData={setData}
        show={showDesignModal}
        onClose={() => setShowDesignModal(false)}
        isPublished={isPublished}
        handleBackgroundUpload={handleBackgroundUpload}
      />

    </section>
  );
}
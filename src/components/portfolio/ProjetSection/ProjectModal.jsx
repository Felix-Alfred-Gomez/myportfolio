import UpdateText from "../../common/UpdateText";
import UpdateBackground from "../../common/UpdateBackground";

function ProjectModal({
  isPublished,
  selectedProject,
  selectedProjectIdx,
  data,
  setData,
  handleArrayFieldChange,
  projectImageUrl,
  projectImageLoading,
  handleProjectImageUpload,
  onClose
}) {
  if (!selectedProject || projectImageLoading || !projectImageUrl) return null;
  return (
    <div className="modal-overlay z8 grey" onClick={onClose}>
      <div
        className="modal-template large"
        onClick={e => e.stopPropagation()}
        style={{ background: data.projetProps?.BackgroundColor || '#ffffff', transition: 'background 0.2s' }}
      >
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
          fontColor={data.projetProps?.ColorTitle}
        />
        {projectImageUrl && (
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <img
              src={projectImageUrl}
              alt="Project visual"
              className="projet-modal-image"
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
          fontColor={data.projetProps?.ColorText}
        />
        {selectedProject.Link && selectedProject.Link !== '' && (
          <a href={selectedProject.Link} target="_blank" rel="noopener noreferrer" className="projet-link-modal">
            Voir le projet
          </a>
        )}
        {!isPublished && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
            <UpdateBackground
              onUpload={handleProjectImageUpload}
              disabled={isPublished}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectModal;

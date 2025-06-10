import UpdateText from "../../common/UpdateText";
import UpdateBackground from "../../common/UpdateBackground";
import UpdateSkillsStack from "../../common/UpdateSkillsStack";

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
          <div className="projet-modal-image-container">
            <img
              src={projectImageUrl}
              alt="Project visual"
              className="projet-modal-image"
            />
            {!isPublished && (
              <div className="projet-modal-image-upload-btn">
                <UpdateBackground
                  onUpload={handleProjectImageUpload}
                  disabled={isPublished}
                />
              </div>
            )}
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
        <UpdateSkillsStack
          isPublished={isPublished}
          value={selectedProject.Skills}
          onChange={e => handleArrayFieldChange(setData, data,
            'projects', selectedProjectIdx, 'Skills')(e.target.value)}
          containerClass="project-skills-container"
          boxClass="project-skill-box"
          textareaClass="project-skills-textarea"
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
      </div>
    </div>
  );
}

export default ProjectModal;

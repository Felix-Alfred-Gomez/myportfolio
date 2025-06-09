import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import projectDefault from "../../../assets/OneProject_default.jpg";

function ProjectImage({ username, index, refreshKey }) {
  const { imageUrl } = usePortfolioImage(username, `ProjectImage_${index}`, refreshKey, projectDefault);
  return (
    <img
      src={imageUrl || projectDefault}
      alt={`Projet ${index + 1}`}
      className="projet-card-image"
    />
  );
}

export default ProjectImage;

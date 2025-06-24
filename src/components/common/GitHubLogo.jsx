import { FaGithub } from "react-icons/fa";
import "../../styles/common.css";

function GitHubLogo({ repositoryUrl = "https://github.com/your-username/your-repo" }) {
  const handleGitHubClick = () => {
    window.open(repositoryUrl, "_blank", "noopener,noreferrer");
  };  return (
    <div
      className="github-logo-container"
      onClick={handleGitHubClick}
      title="View source code on GitHub"
    >
      <div className="github-logo-button">
        <FaGithub className="github-icon" />
      </div>
      <svg className="curved-text" viewBox="0 0 120 120">
        <defs>
          <path
            id="circle-path"
            d="M 60, 60 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
        </defs>
        <text className="github-curved-label">
          <textPath href="#circle-path" startOffset="0%">
            • CODE SOURCE •
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default GitHubLogo;

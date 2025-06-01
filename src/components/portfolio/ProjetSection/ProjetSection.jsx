import { useState } from "react";
import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import ProjetOptionsModal from "./ProjetOptionsModal";

export default function AccueilSection({ username, isPublished, data, setData }) {
  const { handleImageUpload: handleProfileUpload } = usePortfolioImage(username, "Profile");
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "AccueilBackground");
  const [showDesignModal, setShowDesignModal] = useState(false);

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
          <Cog6ToothIcon className="wheel-icon" />
        </button>
      )}

      {/* Design Options Modal */}
      <ProjetOptionsModal
        show={showDesignModal}
        onClose={() => setShowDesignModal(false)}
        setData={setData}
        data={data}
        isPublished={isPublished}
        handleBackgroundUpload={handleBackgroundUpload}
        handleProfileUpload={handleProfileUpload}
      />

    </section>
  );
}
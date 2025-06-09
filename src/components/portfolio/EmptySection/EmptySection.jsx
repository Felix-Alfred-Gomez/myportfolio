import { useState } from "react";
import { usePortfolioImage } from "../../../hooks/HandlePortfolioImage";
// import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { FaPencilAlt } from "react-icons/fa";
import EmptyOptionsModal from "./EmptyOptionsModal";

export default function EmptySection({ username, isPublished }) {
  const { imageUrl: backgroundUrl, handleImageUpload: handleBackgroundUpload } = usePortfolioImage(username, "AccueilBackground");
  const [showDesignModal, setShowDesignModal] = useState(false);

  return (
    <section
      id="empty"
      className="empty-section"
      style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})`,
      backgroundSize: "cover", backgroundPosition: "center" } : {}}>
      
      {!isPublished && (
        <button
          className="pen-edition template-page"
          title="Options"
          onClick={() => setShowDesignModal(true)}>
          <FaPencilAlt className="pen-icon" />
        </button>
      )}

      {/* Design Options Modal */}
      <EmptyOptionsModal
        show={showDesignModal}
        onClose={() => setShowDesignModal(false)}
        isPublished={isPublished}
        handleBackgroundUpload={handleBackgroundUpload}
      />

    </section>
  );
}
import { PortfolioContent } from "./PortfolioTemplate"; // Import only PortfolioContent

function PortfolioEdition() {

  return (
    <div>
      {/* Render Portfolio Content Only for Editing */}
        <PortfolioContent
          isPublished={false}
        />
    </div>
  );
}

export default PortfolioEdition;
import { PortfolioContent } from "./PortfolioTemplate"; // Import only PortfolioContent

function PublicPortfolio() {

  return (
    <div>
      <PortfolioContent
        isPublished={true} // Ensure the portfolio is displayed in non-editable mode
      />
    </div>
  );
}

export default PublicPortfolio;
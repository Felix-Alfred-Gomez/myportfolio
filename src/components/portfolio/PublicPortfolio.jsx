import React from "react";
import { PortfolioContent } from "./PortfolioTemplate1"; // Import only PortfolioContent

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
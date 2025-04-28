import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore
import { PortfolioContent } from "./PortfolioTemplate"; // Import only PortfolioContent

function PublicPortfolio() {
  const { username } = useParams(); // Get the username from the URL
  const [portfolio, setPortfolio] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const docRef = doc(db, "publicPortfolios", username);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPortfolio(docSnap.data());
        } else {
          console.error("Portfolio not found");
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };

    fetchPortfolio();
  }, [username, db]);

  if (!portfolio) {
    return <h1>Portfolio not found</h1>;
  }

  return (
    <div>
      <PortfolioContent
        username={portfolio.username}
        skills={portfolio.skills}
        isPublished={true} // Ensure the portfolio is displayed in non-editable mode
        handleSkillChange={() => {}} // No need for skill change in public view
      />
    </div>
  );
}

export default PublicPortfolio;
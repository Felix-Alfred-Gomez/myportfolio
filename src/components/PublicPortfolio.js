import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";

function PublicPortfolio() {
  const { username } = useParams(); // Get the username from the URL
  const [portfolio, setPortfolio] = useState(null);
  const database = getDatabase();

  useEffect(() => {
    const fetchPortfolio = async () => {
      const portfolioRef = ref(database, `publicPortfolios/${username}`);
      const snapshot = await get(portfolioRef);
      if (snapshot.exists()) {
        setPortfolio(snapshot.val());
      }
    };

    fetchPortfolio();
  }, [username, database]);

  if (!portfolio) {
    return <h1>Portfolio not found</h1>;
  }

  return (
    <div>
      <h1>This is the portfolio of {portfolio.username}</h1>
    </div>
  );
}

export default PublicPortfolio;
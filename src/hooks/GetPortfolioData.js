import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export function GetPortfolioData(username) {
  const [data, setData] = useState({
    skills: ["Compétence 1", "Compétence 2", "Compétence 3"],
  });

  useEffect(() => {
    const fetchPortfolio = async () => {
      const db = getFirestore();
      const docRef = doc(db, "publicPortfolios", username);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const portfolioData = docSnap.data();
          setData({
            skills: portfolioData.skills || ["Compétence 1", "Compétence 2", "Compétence 3"],
          });
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };
    if (username) {
      fetchPortfolio();
    }
  }, [username]);

  return [data, setData];
}
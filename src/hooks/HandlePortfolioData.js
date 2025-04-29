import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Fetches portfolio data from Firestore.
 * @param {string} username - The username of the portfolio owner.
 * @returns {[object, function]} - The portfolio data and a function to update it.
 */
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

/**
 * Pushes portfolio data to Firestore.
 * @param {string} username - The username of the portfolio owner.
 * @param {object} data - The portfolio data to be saved.
 * @returns {Promise<void>} - Resolves when the data is successfully saved.
 */
export async function PushPortfolioData(username, data) {
  const db = getFirestore();
  const { skills } = data;

  try {
    await setDoc(doc(db, "publicPortfolios", username), {
      username,
      skills,
      publishedAt: new Date().toISOString(),
    });
    console.log("Portfolio data pushed successfully:", { username, skills });
  } catch (error) {
    console.error("Error pushing portfolio data:", error);
    throw error;
  }
}
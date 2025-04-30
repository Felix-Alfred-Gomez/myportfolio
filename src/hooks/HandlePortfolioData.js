import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Default portfolio data structure
const defaultPortfolioData = {
  skills: ["Compétence 1", "Compétence 2", "Compétence 3"],
  projects: ["Projet 1", "Projet 2", "Projet 3"], // Example: Add other fields like projects
  name: "Votre Nom", // Example: Add a bio field
};

/**
 * Fetches portfolio data from Firestore.
 * @param {string} username - The username of the portfolio owner.
 * @returns {[object, function]} - The portfolio data and a function to update it.
 */
export function GetPortfolioData(username) {
  const [data, setData] = useState(defaultPortfolioData);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const db = getFirestore();
      const docRef = doc(db, "publicPortfolios", username);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const portfolioData = docSnap.data();
          setData({
            ...defaultPortfolioData, // Ensure all default fields are included
            ...portfolioData,
          });
        } else {
          console.warn("No portfolio found for username:", username);
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

  try {
    await setDoc(doc(db, "publicPortfolios", username), {
      ...data, // Spread the data object to include all its fields
      username, // Add the username explicitly
      publishedAt: new Date().toISOString(), // Add the timestamp
    });
    console.log("Portfolio data pushed successfully:", { username, ...data });
  } catch (error) {
    console.error("Error pushing portfolio data:", error);
    throw error;
  }
}
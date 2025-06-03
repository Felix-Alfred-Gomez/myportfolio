import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";
import { defaultPortfolioData } from "./defaultPortfolioData";

// /**
//  * Fetches portfolio data from Firestore.
//  * @param {string} username - The username of the portfolio owner.
//  * @returns {[object, function]} - The portfolio data and a function to update it.
//  */
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
          setData(deepMerge(defaultPortfolioData, portfolioData));
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
    // Deep merge with defaultPortfolioData before pushing
    const mergedData = deepMerge(defaultPortfolioData, data);
    await setDoc(doc(db, "publicPortfolios", username), {
      ...mergedData, // Spread the merged data object
      username, // Add the username explicitly
      publishedAt: new Date().toISOString(), // Add the timestamp
    });
    console.log("Portfolio data pushed successfully:", { username, ...mergedData });
  } catch (error) {
    console.error("Error pushing portfolio data:", error);
    throw error;
  }
}

/**
 * Fetches the username of the currently authenticated user from Firebase Realtime Database.
 * @returns {Promise<string|null>} - The username if found, or null if not found or not logged in.
 */
export async function FetchUsername() {
  const auth = getAuth();
  const database = getDatabase();
  const user = auth.currentUser;

  if (user) {
    const userRef = ref(database, `users/${user.uid}`);
    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return data.username || null; // Return the username or null if not found
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  }

  return null; // Return null if no user is logged in
}

// Check if username is available in Realtime Database
export const checkUsernameAvailable = async (username, app) => {
  const database = getDatabase(app);
  const usersRef = ref(database, "users");
  const q = query(usersRef, orderByChild("username"), equalTo(username));
  const snapshot = await get(q);
  return !snapshot.exists(); // true if available
};

// Deep merge utility for objects
function deepMerge(target, source) {
  const output = { ...target };
  if (typeof source !== "object" || source === null) return output;
  Object.keys(source).forEach((key) => {
    if (
      typeof source[key] === "object" &&
      source[key] !== null &&
      !Array.isArray(source[key]) &&
      typeof output[key] === "object" &&
      output[key] !== null &&
      !Array.isArray(output[key])
    ) {
      output[key] = deepMerge(output[key], source[key]);
    } else {
      output[key] = source[key];
    }
  });
  return output;
}

// functions to handle field changes in forms
export const handleFieldChange = (setData, data, field) => (e) => {
  setData({ ...data, [field]: e.target.value });
};

// function to handle changes in nested fields
export const handleNestedFieldChange = (setData, data, parentField, field) => (value) => {
  setData({...data, [parentField]: {...data[parentField], [field]: value}});
};
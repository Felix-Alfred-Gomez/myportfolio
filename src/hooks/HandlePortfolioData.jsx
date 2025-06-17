import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, query, orderByChild, equalTo, update } from "firebase/database";
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
    let mergedData = deepMerge(defaultPortfolioData, data);
    // Prune extra keys not present in defaultPortfolioData
    mergedData = pruneExtraKeys(mergedData, defaultPortfolioData);
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

// Deep merge utility for objects and arrays
export function deepMerge(target, source) {
  // If source is not a plain object or array, return a shallow copy of target
  if (
    source === null ||
    typeof source !== "object" ||
    (Array.isArray(source) !== Array.isArray(target))
  ) {
    if (Array.isArray(target)) return [...target];
    if (typeof target === "object" && target !== null) return { ...target };
    return target;
  }
  if (Array.isArray(target) && Array.isArray(source)) {
    // Merge arrays by index, recursively merge objects inside arrays
    return target.map((item, idx) => {
      if (idx in source) {
        if (
          typeof item === "object" && item !== null &&
          typeof source[idx] === "object" && source[idx] !== null &&
          !Array.isArray(item) && !Array.isArray(source[idx])
        ) {
          return deepMerge(item, source[idx]);
        } else {
          return source[idx];
        }
      } else {
        return item;
      }
    }).concat(source.slice(target.length));
  }
  if (
    typeof target === "object" && target !== null &&
    typeof source === "object" && source !== null &&
    !Array.isArray(target) && !Array.isArray(source)
  ) {
    const output = { ...target };
    Object.keys(source).forEach((key) => {
      if (
        typeof source[key] === "object" && source[key] !== null &&
        typeof output[key] === "object" && output[key] !== null &&
        !Array.isArray(source[key]) && !Array.isArray(output[key])
      ) {
        output[key] = deepMerge(output[key], source[key]);
      } else if (Array.isArray(source[key]) && Array.isArray(output[key])) {
        output[key] = deepMerge(output[key], source[key]);
      } else {
        output[key] = source[key];
      }
    });
    return output;
  }
  // fallback (should not be reached)
  return target;
}

// Utility to prune keys not present in the reference object
export function pruneExtraKeys(target, reference) {
  if (Array.isArray(target) && Array.isArray(reference)) {
    return target.map((item, idx) =>
      idx < reference.length ? pruneExtraKeys(item, reference[idx]) : undefined
    ).filter(item => item !== undefined);
  }
  if (
    typeof target === "object" && target !== null &&
    typeof reference === "object" && reference !== null &&
    !Array.isArray(target) && !Array.isArray(reference)
  ) {
    const pruned = {};
    Object.keys(reference).forEach(key => {
      if (key in target) {
        pruned[key] = pruneExtraKeys(target[key], reference[key]);
      }
    });
    return pruned;
  }
  return target;
}

// functions to handle field changes in forms
export const handleFieldChange = (setData, data, field) => (e) => {
  setData({ ...data, [field]: e.target.value });
};

// function to handle changes in nested fields
export const handleNestedFieldChange = (setData, data, parentField, field) => (value) => {
  setData({ ...data, [parentField]: { ...data[parentField], [field]: value } });
};

// function to handle changes in a field of an object inside an array
export const handleArrayFieldChange = (setData, data, arrayField, idx, field) => (value) => {
  setData({
    ...data,
    [arrayField]: data[arrayField].map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    ),
  });
};

/**
 * Updates the current user's username in Firebase (Realtime Database, Firestore, and Storage).
 * Moves all storage files from the old username folder to the new username folder.
 * @param {string} newUsername - The new username to set.
 * @returns {Promise<boolean>} - Resolves true if successful, false otherwise.
 */
export async function updateUsername(newUsername, app) {
  // Prevent CORS issues on localhost
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    const errorMsg = "CORS: This function cannot be tested on localhost. Please deploy to a remote environment.";
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }

  const db = getFirestore(app); // Instead of getFirestore()
  const database = getDatabase(app); // Instead of getDatabase()
  const auth = getAuth(app); // Instead of getAuth()
  const storage = (await import("firebase/storage")).getStorage(); // Dynamically import and get Firebase Storage instance
  const { ref: storageRef, listAll, uploadBytes, deleteObject, getBlob } = await import("firebase/storage"); // Import storage utility functions with alias
  const { ref: dbRef } = await import("firebase/database"); // Import db ref with alias
  const user = auth.currentUser; // Get the currently authenticated user
  console.log("updateUsername called, user:", user); // Log the user object

  if (!user) { // If no user is authenticated
    console.error("No authenticated user found."); // Log error
    return { success: false, error: "No authenticated user found." }; // Return failure
  }

  // Fetch current username from database
  let currentUsername = null; // Initialize currentUsername variable
  try {
    const userRef = dbRef(database, `users/${user.uid}`); // Reference to user's data in Realtime Database
    const snapshot = await (await import("firebase/database")).get(userRef); // Get user data snapshot
    if (snapshot.exists()) { // If user data exists
      currentUsername = snapshot.val().username; // Set currentUsername from database
      console.log("Fetched current username:", currentUsername); // Log the fetched username
    } else {
      console.log("No username found for user in database.");
    }
  } catch (e) {
    console.warn("Could not fetch current username, proceeding anyway."); // Warn if fetch fails
  }

  // If the new username is the same as the current one, do nothing
  if (currentUsername && currentUsername === newUsername) {
    console.log("New username is the same as current username. No update needed.");
    return { success: true }; // Return success, nothing to update
  }

  // Check if the new username is available
  const available = await checkUsernameAvailable(newUsername, app); // Check username availability
  console.log("Is new username available?", available);
  if (!available) { // If not available
    console.warn("Username is already taken.");
    return { success: false, error: "Username is already taken." }; // Return failure
  }

  try {
    // Update username in Realtime Database
    const userRef = dbRef(database, `users/${user.uid}`); // Reference to user's data in Realtime Database
    await update(userRef, { username: newUsername }); // Update username in Realtime Database
    console.log("Updated username in Realtime Database.");
    // Update username in Firestore (users collection)
    try {
      await setDoc(doc(db, "users", user.uid), { username: newUsername }, { merge: true });
      console.log("Updated username in Firestore users collection.");
    } catch (firestoreError) {
      console.error("Firestore setDoc failed:", firestoreError);
      return { success: false, error: firestoreError.message || String(firestoreError) }; // Return failure
    }
    // Optionally, update username in publicPortfolios if it exists
    const portfolioRef = doc(db, "publicPortfolios", newUsername); // Reference to new publicPortfolio doc
    if (currentUsername) { // If current username exists
      const currentPortfolioRef = doc(db, "publicPortfolios", currentUsername); // Reference to current publicPortfolio doc
      const currentPortfolioSnap = await getDoc(currentPortfolioRef); // Get current portfolio snapshot
      if (currentPortfolioSnap.exists()) { // If current portfolio exists
        const data = currentPortfolioSnap.data(); // Get current portfolio data
        await setDoc(portfolioRef, { ...data, username: newUsername }); // Copy data to new portfolio doc with new username
        console.log("Copied portfolio data to new username document.");
        // Optionally, delete the current portfolio document
        await deleteDoc(currentPortfolioRef);
        console.log("Deleted old portfolio document.");
      } else {
        console.log("No current portfolio document to migrate.");
      }
    }
    // --- Handle Storage files ---
    if (currentUsername && currentUsername !== newUsername) { // If username changed
      const currentFolderRef = storageRef(storage, `${currentUsername}`); // Reference to current username folder in storage
      const files = await listAll(currentFolderRef); // List all files in current folder
      console.log(`Found ${files.items.length} files in current username folder.`);
      for (const itemRef of files.items) { // For each file in current folder
        const fileName = itemRef.name; // Get file name
        // Use getBlob to avoid CORS issues
        const fileData = await getBlob(itemRef); // Download file data as blob
        const newFileRef = storageRef(storage, `${newUsername}/${fileName}`); // Reference to new file location
        await uploadBytes(newFileRef, fileData); // Upload file to new location
        // Récupère l'URL de téléchargement sécurisée via le SDK
        const { getDownloadURL } = await import("firebase/storage");
        try {
          const downloadURL = await getDownloadURL(newFileRef);
          console.log(`URL de téléchargement pour ${fileName} :`, downloadURL);
          // Tu peux ici stocker ou utiliser l'URL selon tes besoins
        } catch (urlError) {
          console.error(`Erreur lors de la récupération de l'URL pour ${fileName} :`, urlError);
        }
        console.log(`Moved file ${fileName} to new username folder.`);
        await deleteObject(itemRef); // Remove current file
      }
    }
    console.log("Username update process completed successfully.");
    return { success: true }; // Return success
  } catch (error) {
    console.error("Error updating username:", error); // Log error
    return { success: false, error: error.message || String(error) }; // Return failure
  }
}
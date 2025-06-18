import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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
    // console.log("Portfolio data pushed successfully:", { username, ...mergedData });
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

export async function GetUserURL() {
  const auth = getAuth();
  const user = auth.currentUser;
  // console.log('GetUserURL: currentUser', user);
  if (!user) return null;
  const database = getDatabase();
  const userRef = ref(database, `users/${user.uid}`);
  // console.log('GetUserURL: userRef path', `users/${user.uid}`);
  try {
    const snapshot = await get(userRef);
    // console.log('GetUserURL: snapshot.exists()', snapshot.exists());
    if (snapshot.exists()) {
      const data = snapshot.val();
      // console.log('GetUserURL: data', data);
      if (!data.UserURL || data.UserURL === "None") {
        // console.log('GetUserURL: returning username', data.username || null);
        return data.username || null;
      } else {
        // console.log('GetUserURL: returning UserURL', data.UserURL);
        return data.UserURL;
      }
    }
    // console.log('GetUserURL: snapshot does not exist');
    return null;
  } catch (e) {
    // console.error('GetUserURL: error', e);
    return null;
  }
}

/**
 * Checks if the NewUserURL is available among all users in the database.
 * If available, sets the current user's UserURL to NewUserURL.
 * @param {string} NewUserURL - The new URL to check for availability.
 * @returns {Promise<true|string>} - Resolves true if set (available), or an error message string if not.
 */
export async function SetUserURL(NewUserURL) {
  // console.log('[SetUserURL] Called with:', NewUserURL);
  // Enforce username standards (same as RegisterModal.jsx)
  const regex = /^[a-zA-Z0-9-_]+$/;
  if (!regex.test(NewUserURL)) {
    return "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des tirets et des underscores.";
  }
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    // console.log('[SetUserURL] No authenticated user.');
    return "Utilisateur non authentifié.";
  }
  const database = getDatabase();
  const usersRef = ref(database, "users");
  try {
    // console.log('[SetUserURL] Fetching all users from database...');
    const snapshot = await get(usersRef);
    // if (snapshot.exists()) {
    const users = snapshot.val();
    // console.log('[SetUserURL] Users fetched:', Object.keys(users).length);
    for (const uid in users) {
      const otherUser = users[uid];
      const userURL = (otherUser.UserURL && otherUser.UserURL !== "None") ? otherUser.UserURL : otherUser.username;
      if (userURL === NewUserURL) {
        // console.log(`[SetUserURL] URL '${NewUserURL}' is already taken by user: ${uid}`);
        return "Ce nom d'utilisateur ou URL est déjà pris.";
      }
    }
    // If available, set UserURL in database for current user
    const userRef = ref(database, `users/${user.uid}`);
    // console.log(`[SetUserURL] URL available. Updating user: ${user.uid}`);
    await update(userRef, { UserURL: NewUserURL });
    return true;
    // }
    // No users found, so available
    // const userRef = ref(database, `users/${user.uid}`);
    // console.log('[SetUserURL] No users found. Setting URL for current user.');
    // await update(userRef, { UserURL: NewUserURL });
    // return true;
  } catch (error) {
    console.error('[SetUserURL] Error checking/setting UserURL:', error);
    return error.message || "Erreur lors de la modification de l'URL utilisateur.";
  }
}

/**
 * Checks if the given UserURL exists among all users in the database.
 * @param {string} CheckUserURL - The UserURL to check for existence.
 * @returns {Promise<boolean>} - Resolves true if the UserURL exists, false otherwise.
 */
export async function IsUserURL(CheckUserURL) {
  const regex = /^[a-zA-Z0-9-_]+$/;
  if (!regex.test(CheckUserURL)) {
    // Invalid format, treat as not existing
    return false;
  }
  const database = getDatabase();
  const usersRef = ref(database, "users");
  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const users = snapshot.val();
      for (const uid in users) {
        const otherUser = users[uid];
        const userURL = (otherUser.UserURL && otherUser.UserURL !== "None") ? otherUser.UserURL : otherUser.username;
        if (userURL === CheckUserURL) {
          return true; // UserURL exists
        }
      }
    }
    return false; // Not found
  } catch (error) {
    console.error('[IsUserURL] Error checking UserURL:', error);
    return false;
  }
}

/**
 * Finds and returns the username associated with a given UserURL.
 * @param {string} UserURL - The UserURL to look up.
 * @returns {Promise<string|null>} - The username if found, or null if not found.
 */
export async function GetUserNameWithUserURL(UserURL) {
  // console.log('[GetUserNameWithUserURL] Called with:', UserURL);
  const regex = /^[a-zA-Z0-9-_]+$/;
  if (!regex.test(UserURL)) {
    // console.log('[GetUserNameWithUserURL] Invalid UserURL format:', UserURL);
    return null;
  }
  const database = getDatabase();
  const usersRef = ref(database, "users");
  try {
    // console.log('[GetUserNameWithUserURL] Fetching all users from database...');
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const users = snapshot.val();
      // console.log('[GetUserNameWithUserURL] Users fetched:', Object.keys(users).length);
      for (const uid in users) {
        const otherUser = users[uid];
        // console.log(`[GetUserNameWithUserURL] UserURL: ${UserURL}, username: ${otherUser.username}`);
        const userURL = (otherUser.UserURL && otherUser.UserURL !== "None") ? otherUser.UserURL : otherUser.username;
        if (userURL === UserURL) {
          // console.log(`[GetUserNameWithUserURL] Match found for UserURL: ${UserURL}, username: ${otherUser.username}`);
          return otherUser.username || null;
        }
      }
      // console.log(`[GetUserNameWithUserURL] No match found for UserURL: ${UserURL}`);
    } else {
      // console.log('[GetUserNameWithUserURL] No users found in database.');
    }
    return null;
  } catch (error) {
    // console.error('[GetUserNameWithUserURL] Error:', error);
    return null;
  }
}

/**
 * Deletes a user and all their related data from Firestore and Realtime Database.
 * @param {string} username - The username of the user to delete.
 * @param {string} uid - The Firebase Auth UID of the user to delete.
 * @returns {Promise<void>} - Resolves when deletion is complete.
 */
export async function deleteUserAndData(username, uid) {
  const db = getFirestore();
  const database = getDatabase();
  try {
    // Delete user document from Firestore (publicPortfolios)
    await (await import("firebase/firestore")).deleteDoc(doc(db, "publicPortfolios", username));
    // Delete user entry from Realtime Database (users)
    await (await import("firebase/database")).remove(ref(database, `users/${uid}`));
    // Delete all files in Firebase Storage under the user's folder
    const storage = (await import("firebase/storage")).getStorage();
    const listAll = (await import("firebase/storage")).listAll;
    const deleteObject = (await import("firebase/storage")).deleteObject;
    const userFolderRef = (await import("firebase/storage")).ref(storage, `${username}`);
    const res = await listAll(userFolderRef);
    // Delete all files in the user's folder
    await Promise.all(res.items.map(itemRef => deleteObject(itemRef)));
    // Optionally: Delete subfolders if needed (Firebase Storage does not have real folders, so deleting all files is enough)
    // Delete user from Firebase Auth
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && user.uid === uid) {
      await user.delete();
    }
    // Optionally: Delete user from Firebase Auth (must be done from backend or admin SDK)
  } catch (error) {
    console.error("Error deleting user and data:", error);
    throw error;
  }
}
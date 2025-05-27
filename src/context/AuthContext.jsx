import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

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

// Component to create the authentication context as a global state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user && user.emailVerified);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
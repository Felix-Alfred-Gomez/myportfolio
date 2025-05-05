import React, { createContext, useState } from "react";

// Créez le contexte
export const AuthContext = createContext();

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
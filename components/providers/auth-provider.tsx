'use client';

import React, { ReactNode, createContext, useState, useEffect, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const initialAuthContext: AuthContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};

export const Auth = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedAuth = window.localStorage.getItem("isAuthenticated");
      return storedAuth ? JSON.parse(storedAuth) : false;
    }
    return false;
  });


  useEffect(() => {
    window.localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    console.log("Updated localStorage with isAuthenticated:", isAuthenticated); // Debugging
  }, [isAuthenticated]);

  const contextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return <Auth.Provider value={contextValue}>{children}</Auth.Provider>;
};
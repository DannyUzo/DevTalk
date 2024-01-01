"use client";

import React, { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const contextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return <Auth.Provider value={contextValue}>{children}</Auth.Provider>;
};

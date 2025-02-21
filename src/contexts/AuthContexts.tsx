"use client";
import { createContext, use, useEffect, useState } from "react";
import { getToken, removeToken, setToken } from "../lib/auth";

interface AuthContextType {
  token: string | null;
  loginHandler: (token: string) => void;
  logoutHandler: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) setAuthToken(storedToken);
  }, []);

  const loginHandler = (newToken: string) => {
    setAuthToken(newToken);
    setToken(newToken);
  };

  const logoutHandler = () => {
    setAuthToken(null);
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ token, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

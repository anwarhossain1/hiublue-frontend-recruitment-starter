"use client";
import { createContext, use, useEffect, useState } from "react";
import {
  getToken,
  getUserInfo,
  removeTokenAndInfo,
  setToken,
  setUserInfo,
} from "../lib/auth";

interface AuthContextType {
  token: string | null;
  loginHandler: (token: string) => void;
  logoutHandler: () => void;
  isLoading: boolean;
  user: UserProps | null;
  userHandler: (user: UserProps) => void;
}

export interface UserProps {
  id: number;
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUserInfo();
    if (storedToken) setAuthToken(storedToken);
    if (storedUser) setUser(storedUser);
    setIsLoading(false);
  }, []);

  const loginHandler = (newToken: string) => {
    setAuthToken(newToken);
    setToken(newToken);
  };

  const logoutHandler = () => {
    setAuthToken(null);
    setUser(null);
    removeTokenAndInfo();
  };

  const userHandler = (newUser: UserProps) => {
    setUser(newUser);
    setUserInfo(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        loginHandler,
        logoutHandler,
        userHandler,
        user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

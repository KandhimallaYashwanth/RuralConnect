
import React, { createContext, useContext, useState, ReactNode } from "react";
import { notify } from "@/lib/notification";

type User = {
  id: string;
  name: string;
  email: string;
};

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = () => {
    // In a real app, this would authenticate with backend
    const user = {
      id: "user123",
      name: "Demo User",
      email: "user@example.com",
    };
    
    setCurrentUser(user);
    setIsLoggedIn(true);
    notify("Login successful! Welcome back.", "success");
    
    // Save in localStorage for persistence
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    notify("You have been logged out.", "info");
    
    // Clear localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

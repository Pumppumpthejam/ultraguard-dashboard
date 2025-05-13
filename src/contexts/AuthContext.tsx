import React, { createContext, useState, useEffect } from "react";

export interface User {
  id: number;
  email: string;
  role: "admin" | "client";
}

export interface AuthContextType {
  user: User | null;
  setAuth: ({ user }: { user: User }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/login/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else localStorage.removeItem("token");
      })
      .catch(() => localStorage.removeItem("token"));
  }, []);

  const setAuth = ({ user }: { user: User }) => setUser(user);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

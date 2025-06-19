import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // { name, role }
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
  console.log("Login function called with:", email, password);

  if (!email || !password) {
    console.warn("Login aborted due to missing input");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || `Login failed with status ${res.status}`);
    }

    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
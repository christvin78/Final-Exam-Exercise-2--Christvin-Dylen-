"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("Guest");
  const [selectedCategory, setSelectedCategory] = useState("");

  const value = {
    theme,
    setTheme,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    selectedCategory,
    setSelectedCategory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

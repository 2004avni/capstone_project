import React, { createContext, useState, useContext, useEffect } from "react";

// ✅ Create context
const LanguageContext = createContext();

// ✅ Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Keep in sync if another tab changes language
  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = localStorage.getItem("language") || "en";
      setLanguage(storedLang);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ✅ Hook for easy access
export const useLanguage = () => useContext(LanguageContext);

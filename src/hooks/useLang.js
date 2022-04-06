import React, { useState, useEffect, useContext, createContext } from "react";
import { currentLanguage } from "lang/currentLanguage";

const authContext = createContext();

// Provider component that wraps your app and makes langx object ...
// ... available to any child component that calls useLang().
export function ProvideLang({ children }) {
  const lang = useProvideLang();
  return <authContext.Provider value={lang}>{children}</authContext.Provider>;
}

// Hook for child components to get the lang object ...
// ... and re-render when it changes.
export const useLang = () => {
  return useContext(authContext);
};

// Provider hook that creates lang object and handles state
function useProvideLang() {
  const [lang, setLang] = useState("en");
  const [labels, setLabels] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let result = currentLanguage(lang);
    setLabels(result.labels);
    setErrors(result.errors);
  }, [lang]);

  const changeLang = (value) => {
    setLang(value);
  };

  // Return the user object and lang methods
  return {
    Labels: labels,
    errorText: errors,
    changeLang,
  };
}

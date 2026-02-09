/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useState } from "react";

export const UiContext = createContext();
export const UiProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const setLoading = useCallback((loading) => {
      setIsLoading(loading);
    }, []);

  return (
    <UiContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </UiContext.Provider>
  );
}
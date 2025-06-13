// SIdContext.js

import React, { createContext, useContext, useState } from "react";

// Create a Context
const SIdContext = createContext();

// Custom Hook to use the context
export const useSId = () => {
  return useContext(SIdContext);
};

// Context Provider Component
export const SIdProvider = ({ children }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState(10); // The global state for selected subject

  const setSelectedId = (newSubject) => {
    setSelectedSubjectId(newSubject);
  };

  return (
    <SIdContext.Provider
      value={{ selectedSubjectId, setSelectedId }}
    >
      {children}
    </SIdContext.Provider>
  );
};

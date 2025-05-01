// SubjectContext.js

import React, { createContext, useContext, useState } from "react";

// Create a Context
const SubjectContext = createContext();

// Custom Hook to use the context
export const useSubject = () => {
  return useContext(SubjectContext);
};

// Context Provider Component
export const SubjectProvider = ({ children }) => {
  const [selectedAcademicSubject, setSelectedAcademicSubject] = useState(10); // The global state for selected subject

  const setSelectedSubject = (newSubject) => {
    setSelectedAcademicSubject(newSubject);
  };

  return (
    <SubjectContext.Provider
      value={{ selectedAcademicSubject, setSelectedSubject }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

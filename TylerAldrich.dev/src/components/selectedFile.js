import React, { createContext, useState, useContext } from "react";

const SelectedFileContext = createContext();
const SelectedProjectContext = createContext();

// Context wrapper for letting a user select files.
export const useSelectedFile = () => {
  const context = useContext(SelectedFileContext);
  if( !context ){
    throw new Error('useSelectedFile must be used within a SelectedFileProvider');
  }
  return context;
};

export const SelectedFileProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <SelectedFileContext.Provider value={{ selectedFile, setSelectedFile }}>
      {children}
    </SelectedFileContext.Provider>
  );
};

// Conext for Selecting a Project in our Portfolio-Cards
export const useSelectedProject = () => {
  const context = useContext(SelectedProjectContext);
  if( !context ){
    throw new Error("userSelectedProject must be used within a SelectProjectProvider")
  }
  return context;
};

export const SelectProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <SelectedProjectContext.Provider value={{ selectedProject, setSelectedProject}}>
      { children }
    </SelectedProjectContext.Provider>
  )
}

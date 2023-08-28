import React, { useState, useEffect } from 'react';


const CodeBlockContext = React.createContext(null);

export const useCodeBlock = () => React.useContext(CodeBlockContext);

// For User Interactions within the Code block. Which includes interactions
// with the Codeblock itself, the Directory and the file Tabs. Inspriaton
// for this context came out of my want to 'click' outside of the directory
// to close it.
export const CodeBlockProvider = ({ children }) => {
  const [dirExpanded, setDirExpanded] = useState(false);
  const [dirHover, setDirHover] = useState(false);

  return (
    <CodeBlockContext.Provider value={{
      dirExpanded,
      setDirExpanded,
      dirHover,
      setDirHover,
    }}>
    { children }
    </CodeBlockContext.Provider>
  )
}

import React, { useContext, createContext, useState } from 'react';


const AutoOpenContext = createContext();

export const useAutoOpen = () => {
  return useContext(AutoOpenContext);
};

export const  AutoOpenProvider = ({ children }) => {
  const [ shouldAutoOpen, setShouldAutoOpen ] = useState(true);

  return (
    <AutoOpenContext.Provider value={{
      shouldAutoOpen,
      setShouldAutoOpen,
    }}>
      { children }
    </AutoOpenContext.Provider>
  )
};

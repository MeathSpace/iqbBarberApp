import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useAdminGlobal = () => useContext(GlobalContext);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [currentSalon, setCurrentSalon] = useState({
    loading: false,
    data: null
  });

  return (
    <GlobalContext.Provider
      value={{
        currentSalon,
        setCurrentSalon
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

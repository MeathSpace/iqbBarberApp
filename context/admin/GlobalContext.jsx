import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useAdminGlobal = () => useContext(GlobalContext);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [global] = useState("Global Context From Admin");

  return (
    <GlobalContext.Provider
      value={{
        global,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

import { createContext, useContext } from "react";

const GlobalContext = createContext();

export const useBarberGlobal = () => useContext(GlobalContext);

// Provider component
export const GlobalProvider = ({ children }) => {
  // const [global] = useState("Global Context From Barber");
  const global = "Global Context From Barber";
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

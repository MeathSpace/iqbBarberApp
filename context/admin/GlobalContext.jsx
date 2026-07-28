import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useAdminGlobal = () => useContext(GlobalContext);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [currentSalon, setCurrentSalon] = useState({
    loading: false,
    data: null,
  });

  const [salonInfo, setSalonInfo] = useState({
    salonName: "cas",
    salonEmail: "ac@yopmail.com",
    description: "svsdv descp",
    phoneNumber: "1234567890",
  });

  const [salonBusinessInfo, setSalonBusinessInfo] = useState({
    salonBusinessType: "",
    salonCoordinates: {
      lattitude: "",
      longitude: ""
    }
  });

  const [serviceForm, setServiceForm] = useState({
    serviceIcon: "",
    serviceName: "",
    serviceDescription: "",
    serviceCategory: "",
    serviceType: "",
    servicePrice: "",
    serviceEstimatedTime: "",
  });
  

  const [servicesList, setServicesList] = useState({
    loading: false,
    data: [],
  });

  return (
    <GlobalContext.Provider
      value={{
        currentSalon,
        setCurrentSalon,
        salonInfo,
        setSalonInfo,
        salonBusinessInfo,
        setSalonBusinessInfo,
        serviceForm,
        setServiceForm,
        servicesList,
        setServicesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

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
    salonName: "",
    salonEmail: "",
    description: "",
    phoneNumber: "",
    countryCode: "44",
    countryCca2: "GB"
  });

  const [salonBusinessInfo, setSalonBusinessInfo] = useState({
    salonBusinessType: "",
    salonCoordinates: {
      lattitude: "",
      longitude: "",
    },
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

  const [salonImages, setSalonImages] = useState({
    salonLogo: "",
    salonGallery: [],
  });

  const [salonSocialLinks, setSalonSocialLinks] = useState({
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
    tiktok: "",
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
        salonSocialLinks,
        setSalonSocialLinks,
        salonImages,
        setSalonImages
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

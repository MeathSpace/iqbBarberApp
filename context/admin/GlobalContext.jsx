import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const useAdminGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [currentSalon, setCurrentSalon] = useState({
    loading: false,
    data: null,
  });

  useEffect(() => {
    if (!currentSalon?.data) return;

    const salon = currentSalon.data;

    setEditSalonInfo({
      salonName: salon.salonName,
      salonEmail: salon.salonEmail,
      description: salon.salonDesc,
      phoneNumber: salon.contactTel,
      countryCode: salon.mobileCountryCode,
      countryCca2: salon.countryCca2,
    });

    setEditSalonBusinessInfo({
      salonBusinessType: salon.salonType,
      salonCoordinates: {
        lattitude: salon?.location?.coordinates?.latitude,
        longitude: salon?.location?.coordinates?.longitude,
      },
    });

    setEditServicesList({
      loading: false,
      data: salon?.services,
    });

    setEditSalonImages({
      salonLogo: salon.salonLogo,
      salonGallery: salon.gallery,
    });

    setEditSalonSocialLinks({
      website: salon?.webLink,
      facebook: salon?.fbLink,
      instagram: salon?.instraLink,
      twitter: salon?.twitterLink,
      tiktok: salon?.tiktokLink,
    });
  }, [currentSalon?.data]);

  const [salonInfo, setSalonInfo] = useState({
    salonName: "",
    salonEmail: "",
    description: "",
    phoneNumber: "",
    countryCode: "44",
    countryCca2: "GB",
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

  // Edit Salon Info

  const [editSalonInfo, setEditSalonInfo] = useState({
    salonName: "",
    salonEmail: "",
    description: "",
    phoneNumber: "",
    countryCode: "44",
    countryCca2: "GB",
  });

  const [editSalonBusinessInfo, setEditSalonBusinessInfo] = useState({
    salonBusinessType: "",
    salonCoordinates: {
      lattitude: "",
      longitude: "",
    },
  });

  const [editServiceForm, setEditServiceForm] = useState({
    serviceIcon: "",
    serviceName: "",
    serviceDescription: "",
    serviceCategory: "",
    serviceType: "",
    servicePrice: "",
    serviceEstimatedTime: "",
  });

  const [editServicesList, setEditServicesList] = useState({
    loading: false,
    data: [],
  });

  const [editSalonImages, setEditSalonImages] = useState({
    salonLogo: "",
    salonGallery: [],
  });

  const [editSalonSocialLinks, setEditSalonSocialLinks] = useState({
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
        setSalonImages,
        editSalonInfo,
        setEditSalonInfo,
        editSalonBusinessInfo,
        setEditSalonBusinessInfo,
        editServiceForm,
        setEditServiceForm,
        editServicesList,
        setEditServicesList,
        editSalonImages,
        setEditSalonImages,
        editSalonSocialLinks,
        setEditSalonSocialLinks
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

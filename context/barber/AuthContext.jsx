import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

import api from "../../utils/api";

const AuthContext = createContext();

export const useBarberAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const userLogut = async () => {
    try {
      await SecureStore.deleteItemAsync("barberRefreshToken");
      await SecureStore.deleteItemAsync("barberEmail");

      router.replace("/(barberauth)/signin");
    } catch (error) {
      console.error("Error during logout sequence:", error);
    }
  };

  // Setup Axios interceptors
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        const refreshToken =
          await SecureStore.getItemAsync("barberRefreshToken");

        if (refreshToken) {
          config.headers.Authorization = `Bearer ${refreshToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          userLogut();
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [router]);

  // Pass this fetchLoggedInAdmin and use it explicitly

  const fetchLoggedInBarber = async () => {
    try {
      const { data } = await api.get("/barber/barberloggedin");
      setAuthenticatedUser(data?.user?.[0] ?? null);
    } catch (error) {
      console.log("Error fetching barber:", error);
    }
  };

  useEffect(() => {
    fetchLoggedInBarber();
  }, []);

  console.log("Current barber user:", authenticatedUser); // Log the current user state

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        userLogut,
        fetchLoggedInBarber
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

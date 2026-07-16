import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

import api from "../../utils/api";

const AuthContext = createContext();

export const useAdminAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const userLogut = async () => {
    try {
      await SecureStore.deleteItemAsync("adminRefreshToken");
      await SecureStore.deleteItemAsync("adminEmail");

      router.replace("/(adminauth)/signin");
    } catch (error) {
      console.error("Error during logout sequence:", error);
    }
  };

  // Setup Axios interceptors
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        const refreshToken =
          await SecureStore.getItemAsync("adminRefreshToken");

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

  const fetchLoggedInAdmin = async () => {
    try {
      const { data } = await api.get("/admin/adminloggedin");
      setAuthenticatedUser(data?.user?.[0] ?? null);
    } catch (error) {
      console.log("Error fetching admin:", error);
    }
  };

  useEffect(() => {
    fetchLoggedInAdmin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        userLogut,
        fetchLoggedInAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

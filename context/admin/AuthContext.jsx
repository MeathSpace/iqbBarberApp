import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../../utils/api";

const AuthContext = createContext();

export const useAdminAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userSalonId, setUserSalonId] = useState(0);
  const [user, setUser] = useState(null);

  const router = useRouter();

  const fetch_user_email_from_storage = async () => {
    try {
      const savedUserEmail = (await AsyncStorage.getItem("adminEmail")) || "";
      const savedUserSalonId =
        (await AsyncStorage.getItem("adminSalonId")) || 0;

      if (savedUserEmail) {
        setUserEmail(savedUserEmail);
        setUserSalonId(Number(savedUserSalonId));
      } else {
        router.replace("/(adminauth)/signin");
      }
    } catch (error) {
      console.log("Failed to fetch user email ", error);
    }
  };

  // This code is basically fetching the saved email.
  // I am writing because without async i cannot use async-storage
  useEffect(() => {
    fetch_user_email_from_storage();
  }, [userEmail]);

  const fetch_loggedin_admin_data = async () => {
    try {
      const { data } = await api.post("/web-app/admin/adminloggedin", {
        email: userEmail,
      });
      setUser(data?.user?.[0]);
    } catch (error) {
      console.log("Error fetching admin loggedin data ", error);
    }
  };

  // i can pass here multiple dependency of example salon chage , update and trigger this api

  useEffect(() => {
    if (userEmail) {
      fetch_loggedin_admin_data();
    }
  }, [userEmail, userSalonId]);


  //   ✅ Why removing setUser made it log once

  // Without setUser, React doesn’t schedule a re-render → no second pass occurs.
  // That’s why you saw a single console.log(data.user[0]) (only from the fetch).

  // But once you call setUser, React:

  // Renders once with old state. (VVP) - i will see this console.log very fast and instant

  // Applies new state (user).

  // Renders again with new state. -> this takes time to show and print

  // In dev mode, runs that process twice (to detect bad side effects).

  // Hence, your log appears twice.

  return (
    <AuthContext.Provider
      value={{
        setUserSalonId,
        setUserEmail,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

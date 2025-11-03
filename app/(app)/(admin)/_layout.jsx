import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { AuthProvider as AdminAuthProvider } from "../../../context/admin/AuthContext";
import { GlobalProvider as AdminGlobalProvider } from "../../../context/admin/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// **THIS IS WHERE YOU ADD THE AUTH CHECK**

const AdminLayout = () => {

  // const router = useRouter()

  // useEffect(() => {
  //   const is_user_not_authenticated = async () => {
  //     const savedAdminEmail = (await AsyncStorage.getItem("adminEmail")) || "";

  //     if(!savedAdminEmail){
  //       router.replace("/")
  //     }
  //   };

  //   is_user_not_authenticated();
  // }, []);

  return (
    <AdminGlobalProvider>
      <AdminAuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(admintabs)" />
          <Stack.Screen name="createSalon" />
          <Stack.Screen name="createSalonForm" />
        </Stack>
      </AdminAuthProvider>
    </AdminGlobalProvider>
  );
};

export default AdminLayout;

const styles = StyleSheet.create({});

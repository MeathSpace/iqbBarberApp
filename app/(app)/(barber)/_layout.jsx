import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { AuthProvider as AdminAuthProvider } from "../../../context/admin/AuthContext";
import { GlobalProvider as AdminGlobalProvider } from "../../../context/admin/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// **THIS IS WHERE YOU ADD THE AUTH CHECK**

const AdminLayout = () => {

  return (
    <AdminGlobalProvider>
      {/* <AdminAuthProvider> This is responsible for redirection */} 
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(barbertabs)" />
          {/* <Stack.Screen name="(payments)" />
          <Stack.Screen name="(subscriptions)" /> */}
        </Stack>
      {/* </AdminAuthProvider> */}
    </AdminGlobalProvider>
  );
};

export default AdminLayout;

const styles = StyleSheet.create({});

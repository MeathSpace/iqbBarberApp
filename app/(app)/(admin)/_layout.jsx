import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { AuthProvider as AdminAuthProvider } from "../../../context/admin/AuthContext";
import { GlobalProvider as AdminGlobalProvider } from "../../../context/admin/GlobalContext";
// **THIS IS WHERE YOU ADD THE AUTH CHECK**

const AdminLayout = () => {
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

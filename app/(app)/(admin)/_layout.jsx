import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { AuthProvider as AdminAuthProvider } from "../../../context/admin/AuthContext";
import { GlobalProvider as AdminGlobalProvider } from "../../../context/admin/GlobalContext";
// **THIS IS WHERE YOU ADD THE AUTH CHECK**

const AdminLayout = () => {
  return (
    <AdminAuthProvider>
      <AdminGlobalProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(admintabs)" />
          <Stack.Screen name="(barber)" />
          <Stack.Screen name="(customer)" />
          <Stack.Screen name="(profile)" />
          <Stack.Screen name="(reports)" />
          <Stack.Screen name="(salon)" />
          <Stack.Screen name="(payments)" />
          <Stack.Screen name="(subscriptions)" />
        </Stack>
      </AdminGlobalProvider>
    </AdminAuthProvider>
  );
};

export default AdminLayout;

const styles = StyleSheet.create({});

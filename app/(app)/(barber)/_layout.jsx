import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { GlobalProvider as AdminGlobalProvider } from "../../../context/admin/GlobalContext";
// **THIS IS WHERE YOU ADD THE AUTH CHECK**

const AdminLayout = () => {
  return (
    <AdminGlobalProvider>
      {/* <AdminAuthProvider> This is responsible for redirection */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(barbertabs)" />
        <Stack.Screen name="(reports)" />
        <Stack.Screen name="(profile)" />
        <Stack.Screen
          name="(editServices)"
          options={{
            presentation: "modal",
          }}
        />

        {/* <Stack.Screen name="(payments)" />
          <Stack.Screen name="(subscriptions)" /> */}
      </Stack>
      {/* </AdminAuthProvider> */}
    </AdminGlobalProvider>
  );
};

export default AdminLayout;

const styles = StyleSheet.create({});

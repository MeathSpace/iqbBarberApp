import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { AuthProvider as BarberAuthProvider } from "../../../context/barber/AuthContext";
import { GlobalProvider as BarberGlobalProvider } from "../../../context/barber/GlobalContext";

const AdminLayout = () => {
  return (
    <BarberGlobalProvider>
      <BarberAuthProvider>
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
      </BarberAuthProvider>
    </BarberGlobalProvider>
  );
};

export default AdminLayout;

const styles = StyleSheet.create({});

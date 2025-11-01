import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { AuthProvider as BarberAuthProvider } from "../../../context/barber/AuthContext";
import { GlobalProvider as BarberGlobalProvider } from "../../../context/barber/GlobalContext";

// **THIS IS WHERE YOU ADD THE AUTH CHECK**

const BarberLayout = () => {
  return (
    <BarberGlobalProvider>
      <BarberAuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(barbertabs)" />
        </Stack>
      </BarberAuthProvider>
    </BarberGlobalProvider>
  );
};

export default BarberLayout;

const styles = StyleSheet.create({});

import { Stack } from "expo-router";

const AppointmentLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="appointmentHistory" />
    </Stack>
  );
};

export default AppointmentLayout;

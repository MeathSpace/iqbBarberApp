import { Stack } from "expo-router";

const ReportLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="charts" />
    </Stack>
  );
};

export default ReportLayout;

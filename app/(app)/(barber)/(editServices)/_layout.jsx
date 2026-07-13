import { Stack } from "expo-router";

const EditServicesLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default EditServicesLayout;

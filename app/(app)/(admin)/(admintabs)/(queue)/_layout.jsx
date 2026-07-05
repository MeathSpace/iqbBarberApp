import { Stack } from "expo-router";

const QueueLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="queueHistory" />
    </Stack>
  );
};

export default QueueLayout;

import { Stack } from "expo-router";

const PaymentLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="paymentSettings" />
    </Stack>
  );
};

export default PaymentLayout;

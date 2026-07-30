import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const EditSalonSteps = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="businessInformation" />
      <Stack.Screen name="selectServices" />
      <Stack.Screen name="gallery" />
      <Stack.Screen name="socialLinks" />
    </Stack>
  );
};

export default EditSalonSteps;

const styles = StyleSheet.create({});

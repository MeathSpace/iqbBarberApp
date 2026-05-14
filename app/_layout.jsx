import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import ToastManager from "toastify-react-native";
import { LanguageProvider } from "../context/LanguageContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  // Load custom fonts
  const [loaded, error] = useFonts({
    AirbnbCereal_W_Bd: require("../assets/fonts/AirbnbCereal_W_Bd.otf"),
    AirbnbCereal_W_Md: require("../assets/fonts/AirbnbCereal_W_Md.otf"),
    AirbnbCereal_W_Lt: require("../assets/fonts/AirbnbCereal_W_Lt.otf"),
    AirbnbCereal_W_Bk: require("../assets/fonts/AirbnbCereal_W_Bk.otf"),
    AirbnbCereal_W_XBd: require("../assets/fonts/AirbnbCereal_W_XBd.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="auto" />
      <ToastManager />
    </LanguageProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});

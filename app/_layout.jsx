import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import ToastManager from "toastify-react-native";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const colorScheme = useColorScheme();

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

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#f8fafc",
      background2: "#ffffff",
      textColor1: "#111827",
      textColor2: "#808080",
      borderColor1: "#e5e7eb",
      inputColor: "#ffffff",
      progressBgColor: "#e2e8f0",
    },
  };

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#111827",
      background2: "#0d131f",
      textColor1: "#ffffff",
      textColor2: "#F4F4F5B2",
      borderColor1: "#374151",
      inputColor: "#0d131f",
      progressBgColor: "#475569",
    },
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="auto" />
     <ToastManager/>
    </ThemeProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});

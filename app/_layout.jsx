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
import { LanguageProvider } from "../context/LanguageContext";

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

      background: {
        color1: "#FFF8F6",
        color2: "#FBEAE5",
        color3: "#ffffff",
        color4: "#FFF1ED",
        color5: "#ddd",
      },

      borderColor: {
        color1: "#F3B6A9",
      },

      textColor: {
        color1: "#111827",
        color2: "#808080",
        color3: "#FF5722",
        color4: "#ffffff",
        color5: "#999",
        color6: "#777",
        color7: "#FF3B30",
        color8: "#AB2D00",
      },

      button: {
        typeOne: {
          linearOne: "#FFB5A0",
          linearTwo: "#FF5722",
        },
        typeTwo: {
          linearOne: "#FFF1ED",
          linearTwo: "#FFDDD3",
          linearThree: "#FFF1ED",
        },
        typeThree: {
          linearOne: "#AB2D00",
          linearTwo: "#FF7851",
        },
      },
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
    <LanguageProvider>
      <ThemeProvider
        value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
        <StatusBar style="auto" />
        <ToastManager />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});

import { Platform } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const MyLightTheme = {
  colors: {
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

export const darkTheme = {
  colors: {
    background: "#0D0D0D",
    card: "#1A1A1A",
    accent: "#FF9500",
    textMain: "#FFFFFF",
    textMuted: "#8E8E93",
    border: "#262626",
  },
  status: {
    success: { text: "#34C759", bg: "rgba(52, 199, 89, 0.1)" },
    neutral: { text: "#AEAEB2", bg: "rgba(174, 174, 178, 0.15)" },
    error: { text: "#FF3B30", bg: "rgba(255, 59, 48, 0.1)" },
  },
  icons: {
    queue: "#FF9500",
    appointments: "#34C759",
    cancellations: "#FF3B30",
    barbers: "#AF52DE",
    wait: "#5856D6",
    revenue: "#34C759",
  },
  layout: {
    componentHeight: verticalScale(40),
    buttonHeight: verticalScale(44),
    paddingHorizontal: scale(16),
    borderRadiusLarge: scale(12),
    borderRadiusMedium: scale(8),
    borderRadiusSmall: scale(4),
  },
  typography: {
    headerTitle: {
      fontSize: scale(20),
      fontWeight: "700",
      letterSpacing: -0.5,
      color: "#FFFFFF",
    },
    headerSubtitle: {
      fontSize: scale(13),
      fontWeight: "400",
      letterSpacing: -0.1,
      color: "#8E8E93",
    },
    inputLabel: {
      fontSize: scale(11),
      fontWeight: "500",
      color: "#8E8E93",
    },
    dropdownText: {
      fontSize: scale(15),
      fontWeight: "500",
      color: "#FFFFFF",
    },
    tabText: {
      fontSize: scale(13),
      fontWeight: "500",
      color: "#8E8E93",
    },
    cardTitle: {
      fontSize: scale(15),
      fontWeight: "700",
      letterSpacing: -0.2,
      color: "#FFFFFF",
    },
    cardValue: {
      fontSize: scale(20),
      fontWeight: "bold",
      color: "#FFFFFF",
    },
    bodyMain: {
      fontSize: scale(13),
      fontWeight: "400",
      color: "#FFFFFF",
    },
    bodyMuted: {
      fontSize: scale(11),
      fontWeight: "400",
      color: "#8E8E93",
    },
    btnText: {
      fontSize: scale(14),
      fontWeight: "700",
      letterSpacing: -0.2,
      ...Platform.select({
        ios: { fontFamily: "System" },
        android: { fontFamily: "sans-serif-medium" },
      }),
    },
  },
};
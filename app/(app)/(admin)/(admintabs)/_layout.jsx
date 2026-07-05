import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { darkTheme } from "../../../../constants/appTheme";
import {
  HomeIcon,
  QueueIcon,
  CalendarIcon,
  AdvertisementIcon,
} from "../../../../constants/icons";

const AdminTabLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarAllowFontScaling: false,

        tabBarStyle: {
          backgroundColor: darkTheme.colors.background,
          borderTopWidth: 1,
          borderTopColor: darkTheme.colors.border,
          height:
            verticalScale(60) +
            (insets.bottom > 0 ? insets.bottom : verticalScale(10)),
          paddingBottom: insets.bottom > 0 ? insets.bottom : verticalScale(8),
          paddingTop: verticalScale(10),
          elevation: 0,
          shadowOpacity: 0,
        },

        tabBarLabelStyle: {
          fontSize: scale(10),
          fontFamily: "AirbnbCereal_W_Md",
          marginTop: verticalScale(4),
          fontWeight: "500",
        },

        tabBarActiveTintColor: darkTheme.colors.accent,
        tabBarInactiveTintColor: darkTheme.colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon color={color} size={scale(22)} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="(queue)"
        options={{
          title: "Queue",
          tabBarIcon: ({ color, focused }) => (
            <QueueIcon color={color} size={scale(22)} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="(appointment)"
        options={{
          title: "Appointment",
          tabBarIcon: ({ color, focused }) => (
            <CalendarIcon color={color} size={scale(22)} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="(advertisement)"
        options={{
          title: "Advertisements",
          href: "/(advertisement)",
          tabBarIcon: ({ color, focused }) => (
            <AdvertisementIcon
              color={color}
              size={scale(22)}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AdminTabLayout;
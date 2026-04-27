// import { Tabs } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";
// import {
//   CalendarIcon,
//   HomeIcon,
//   ProfileIcon,
//   QueueIcon,
//   SalonIcon,
// } from "../../../../constants/icons";
// import { useTheme } from "@react-navigation/native";

// const AdminTabLayout = () => {
//   const insets = useSafeAreaInsets();
//   const { colors } = useTheme();

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           paddingBottom: insets.bottom + verticalScale(8), // dynamically adjust for system nav
//           paddingTop: verticalScale(8),
//           height: verticalScale(65) + insets.bottom,
//         },
//         tabBarLabelStyle: {
//           fontSize: scale(9),
//           fontFamily: "AirbnbCereal_W_Md",
//           marginBottom: verticalScale(5),
//         },
//         tabBarActiveTintColor: colors.textColor.color3,
//       }}
//     >
//       <Tabs.Screen
//         name="(home)"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => <HomeIcon color={color} />,
//         }}
//       />

//       <Tabs.Screen
//         name="(queue)"
//         options={{
//           title: "Queue",
//           tabBarIcon: ({ color }) => <QueueIcon color={color} />,
//         }}
//       />

//       <Tabs.Screen
//         name="(salon)"
//         options={{
//           title: "Salon",
//           tabBarIcon: ({ color }) => <SalonIcon color={color} />,
//         }}
//       />

//       <Tabs.Screen
//         name="(appointment)"
//         options={{
//           title: "Appointment",
//           tabBarIcon: ({ color }) => <CalendarIcon color={color} />,
//         }}
//       />

//       <Tabs.Screen
//         name="(profile)"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// };

// export default AdminTabLayout;

import { useTheme } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import {
  CalendarIcon,
  HomeIcon,
  ProfileIcon,
  QueueIcon,
  SalonIcon,
} from "../../../../constants/icons";

const AdminTabLayout = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarAllowFontScaling: false, // CRITICAL: Prevents text from growing and cutting off
        tabBarStyle: {
          backgroundColor: colors.background.color1,
          borderTopWidth: 1,
          borderTopColor: colors.borderColor?.color1 || "#F3F4F6",
          // Adjust height to ensure label has room
          height:
            verticalScale(60) +
            (insets.bottom > 0 ? insets.bottom : verticalScale(10)),
          paddingBottom: insets.bottom > 0 ? insets.bottom : verticalScale(8),
          paddingTop: verticalScale(8),
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          // Reduce size slightly for 5-tab layouts to avoid "..."
          fontSize: scale(8.5),
          fontFamily: "AirbnbCereal_W_Md",
          marginTop: verticalScale(2),
          paddingHorizontal: 2, // Minimum padding to allow max width for text
        },
        tabBarActiveTintColor: colors.textColor.color3,
        tabBarInactiveTintColor: colors.textColor.color2,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color} size={scale(20)} />
          ),
        }}
      />
      <Tabs.Screen
        name="(queue)"
        options={{
          title: "Queue",
          tabBarIcon: ({ color }) => (
            <QueueIcon color={color} size={scale(20)} />
          ),
        }}
      />
      <Tabs.Screen
        name="(salon)"
        options={{
          title: "Salon",
          tabBarIcon: ({ color }) => (
            <SalonIcon color={color} size={scale(20)} />
          ),
        }}
      />
      <Tabs.Screen
        name="(appointment)"
        options={{
          title: "Appointment", // This will now fit without "..."
          tabBarIcon: ({ color }) => (
            <CalendarIcon color={color} size={scale(20)} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <ProfileIcon color={color} size={scale(20)} />
          ),
        }}
      />
    </Tabs>
  );
};

export default AdminTabLayout;

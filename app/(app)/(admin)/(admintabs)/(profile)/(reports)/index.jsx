import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ThemeSafeAreaView from "../../../../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../../../../components/ThemeTextPrimary";
import {
  CalendarIcon,
  LeftIcon,
  QueueIcon,
  RightIcon,
} from "../../../../../../constants/icons";

const index = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const reportOptions = [
    {
      label: "Appointment Reports",
      icon: <CalendarIcon color="#2563eb" />,
      lightBg: "#dbeafe", 
      darkBg: "#1e3a8a33",
      lightColor: "#2563eb", 
      darkColor: "#93c5fd", 
      route: "/appointmentReport",
      display: true,
    },
    {
      label: "Queue Reports",
      icon: <QueueIcon color="#059669" />,
      lightBg: "#d1fae5",
      darkBg: "#065f4633",
      lightColor: "#059669",
      darkColor: "#6ee7b7",
      route: "/queueReport",
      display: true,
    },
  ];

  return (
    <ThemeSafeAreaView
      style={{
        backgroundColor: colors.background,
        padding: scale(15),
      }}
      edges={["top", "left", "right"]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: scale(10),
          marginBottom: verticalScale(20),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <LeftIcon color={colors.textColor1} size={scale(18)} />
        </TouchableOpacity>
        <ThemeTextPrimary
          style={{
            flex: 1,
            fontSize: scale(18),
            fontFamily: "AirbnbCereal_W_XBd",
          }}
        >
          Reports
        </ThemeTextPrimary>
      </View>

      <View
        style={[
          styles.optionsBox,
          {
            backgroundColor: colors.background2,
            borderColor: colors.borderColor1,
          },
        ]}
      >
        {reportOptions.map((opt, idx) => {
          if (!opt.display) return null; // Skip if display is false

          return (
            <View key={idx}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.optionRow}
                onPress={() => {
                  router.push(opt.route);
                }}
              >
                <View
                  style={[
                    styles.optionIconWrapper,
                    { backgroundColor: opt.lightBg },
                  ]}
                >
                  {opt.icon}
                </View>
                <ThemeTextPrimary style={[styles.optionLabel]}>
                  {opt.label}
                </ThemeTextPrimary>
                <RightIcon
                  size={moderateScale(16)}
                  color={colors.text}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
              {idx !== reportOptions.length - 1 && (
                <View
                  style={[
                    styles.separator,
                    { backgroundColor: colors.borderColor1 },
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    </ThemeSafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  optionsBox: {
    borderRadius: scale(16),
    borderWidth: scale(1),
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: scale(16),
  },
  optionIconWrapper: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  optionLabel: {
    marginLeft: scale(12),
    fontFamily: "AirbnbCereal_W_Bd",
    fontSize: scale(16),
  },
  separator: {
    height: verticalScale(0.5),
    marginHorizontal: scale(16),
  },
});

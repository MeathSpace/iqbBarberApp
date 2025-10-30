import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { scale, verticalScale } from "react-native-size-matters";
import ThemeSafeAreaView from "../../../../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../../../../components/ThemeTextPrimary";
import {
  CheckCircleIcon,
  CrossCircleIcon,
} from "../../../../../../constants/icons";

const appointmentReport = () => {
  const { colors } = useTheme();

  const [tabData, setTabData] = useState(["Daily", "Weekly", "Monthly"]);

  const [selectedTab, setSelectedTab] = useState("Daily");
  const colorScheme = useColorScheme();

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
          justifyContent: "space-between",
          borderRadius: scale(12),
        }}
      >
        {tabData.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabBtn,
                {
                  backgroundColor:
                    selectedTab === item
                      ? "#14b8a6"
                      : colorScheme === "dark"
                      ? "#3f3f46"
                      : "#e4e4e7",
                },
              ]}
              onPress={() => {
                setSelectedTab(item);
              }}
            >
              {/* <ThemeTextPrimary
                style={{
                  fontSize: scale(12),
                  color:
                    selectedTab === item
                      ? "#fff"
                      : colorScheme === "dark"
                      ? "#fff"
                      : "#000",
                }}
              >
                {item}
              </ThemeTextPrimary> */}
              <ThemeTextPrimary
                style={{
                  fontSize: scale(14),
                  color:
                    selectedTab === item
                      ? "#fff"
                      : colorScheme === "dark"
                      ? "#fff"
                      : "#000",
                }}
              >
                {item}
              </ThemeTextPrimary>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedTab === "Daily" && (
        <ScrollView
          style={{
            flex: 1,
            marginTop: verticalScale(20),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: colors.background2,
              // height: verticalScale(150),
              borderRadius: scale(8),
              borderWidth: scale(1),
              borderColor: colors.borderColor1,
              padding: scale(12),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: scale(15),
            }}
          >
            <AnimatedCircularProgress
              size={scale(85)}
              width={scale(10)}
              fill={95}
              tintColor="#9333ea"
              // onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor={colors.progressBgColor}
            >
              {() => <ThemeTextPrimary>{28}</ThemeTextPrimary>}
            </AnimatedCircularProgress>

            <AnimatedCircularProgress
              size={scale(85)}
              width={scale(10)}
              fill={80}
              tintColor="#16a34a"
              // onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor={colors.progressBgColor}
            >
              {() => <ThemeTextPrimary>{25}</ThemeTextPrimary>}
            </AnimatedCircularProgress>

            <AnimatedCircularProgress
              size={scale(85)}
              width={scale(10)}
              fill={60}
              tintColor="#ef4444"
              // onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor={colors.progressBgColor}
            >
              {() => <ThemeTextPrimary>{3}</ThemeTextPrimary>}
            </AnimatedCircularProgress>
          </View>

          <View
            style={{
              marginTop: verticalScale(20),
              gap: verticalScale(10),
            }}
          >
            <View
              style={[
                styles.daily_appointment_item,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <CheckCircleIcon color="#22c55e" />
                <ThemeTextPrimary>John Smith</ThemeTextPrimary>
              </View>

              <ThemeTextPrimary
                style={{
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                10:30 AM
              </ThemeTextPrimary>
            </View>

            <View
              style={[
                styles.daily_appointment_item,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <CrossCircleIcon color="#ef4444" />
                <ThemeTextPrimary>John Smith</ThemeTextPrimary>
              </View>

              <ThemeTextPrimary
                style={{
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                11:00 AM
              </ThemeTextPrimary>
            </View>

            <View
              style={[
                styles.daily_appointment_item,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <CheckCircleIcon color="#22c55e" />
                <ThemeTextPrimary>John Smith</ThemeTextPrimary>
              </View>

              <ThemeTextPrimary
                style={{
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                10:30 AM
              </ThemeTextPrimary>
            </View>

            <View
              style={[
                styles.daily_appointment_item,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <CrossCircleIcon color="#ef4444" />
                <ThemeTextPrimary>John Smith</ThemeTextPrimary>
              </View>

              <ThemeTextPrimary
                style={{
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                11:00 AM
              </ThemeTextPrimary>
            </View>

            <View
              style={[
                styles.daily_appointment_item,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <CheckCircleIcon color="#22c55e" />
                <ThemeTextPrimary>John Smith</ThemeTextPrimary>
              </View>

              <ThemeTextPrimary
                style={{
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                10:30 AM
              </ThemeTextPrimary>
            </View>

            <View
              style={[
                styles.daily_appointment_item,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <CrossCircleIcon color="#ef4444" />
                <ThemeTextPrimary>John Smith</ThemeTextPrimary>
              </View>

              <ThemeTextPrimary
                style={{
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                11:00 AM
              </ThemeTextPrimary>
            </View>

            <View
              style={[
                styles.daily_appointment_item,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <CheckCircleIcon color="#22c55e" />
                <ThemeTextPrimary>John Smith</ThemeTextPrimary>
              </View>

              <ThemeTextPrimary
                style={{
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                10:30 AM
              </ThemeTextPrimary>
            </View>

            <View
              style={[
                styles.daily_appointment_item,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <CrossCircleIcon color="#ef4444" />
                <ThemeTextPrimary>John Smith</ThemeTextPrimary>
              </View>

              <ThemeTextPrimary
                style={{
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                11:00 AM
              </ThemeTextPrimary>
            </View>
          </View>
        </ScrollView>
      )}
    </ThemeSafeAreaView>
  );
};

export default appointmentReport;

const styles = StyleSheet.create({
  tabBtn: {
    height: verticalScale(30),
    backgroundColor: "gray",
    flex: 1,
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },

  daily_appointment_item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: scale(8),
    borderWidth: scale(1),
    paddingHorizontal: scale(12),
    height: verticalScale(50),
  },
});

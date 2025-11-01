import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { BarChart } from "react-native-gifted-charts";
import { scale, verticalScale } from "react-native-size-matters";
import ThemeSafeAreaView from "../../../../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../../../../components/ThemeTextPrimary";
import {
  CheckCircleIcon,
  CrossCircleIcon,
  LeftIcon,
} from "../../../../../../constants/icons";
import { useAdminAuth } from "../../../../../../context/admin/AuthContext";

const queueReport = () => {
  const { user } = useAdminAuth();

  console.log("Admin user Home ", user);

  const router = useRouter();
  const { colors } = useTheme();

  const [tabData, setTabData] = useState(["Daily", "Weekly", "Monthly"]);

  const [selectedTab, setSelectedTab] = useState("Daily");
  const colorScheme = useColorScheme();

  const serveData = [
    { value: 50, label: "Mon" },
    { value: 80, label: "Tue" },
    { value: 90, label: "Wed" },
    { value: 70, label: "Thu" },
    { value: 60, label: "Fri" },
    { value: 40, label: "Sat" },
    { value: 30, label: "Sun" },
  ];

  const cancelData = [
    { value: 35, label: "Mon" },
    { value: 55, label: "Tue" },
    { value: 25, label: "Wed" },
    { value: 70, label: "Thu" },
    { value: 45, label: "Fri" },
    { value: 60, label: "Sat" },
    { value: 30, label: "Sun" },
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
          Queue Report
        </ThemeTextPrimary>
      </View>
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

      {selectedTab === "Weekly" && (
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
              fill={99}
              tintColor="#9333ea"
              // onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor={colors.progressBgColor}
            >
              {() => <ThemeTextPrimary>{230}</ThemeTextPrimary>}
            </AnimatedCircularProgress>

            <AnimatedCircularProgress
              size={scale(85)}
              width={scale(10)}
              fill={85}
              tintColor="#16a34a"
              // onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor={colors.progressBgColor}
            >
              {() => <ThemeTextPrimary>{180}</ThemeTextPrimary>}
            </AnimatedCircularProgress>

            <AnimatedCircularProgress
              size={scale(85)}
              width={scale(10)}
              fill={30}
              tintColor="#ef4444"
              // onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor={colors.progressBgColor}
            >
              {() => <ThemeTextPrimary>{50}</ThemeTextPrimary>}
            </AnimatedCircularProgress>
          </View>

          <View
            style={{
              marginTop: verticalScale(20),
              gap: verticalScale(15),
            }}
          >
            <View
              style={[
                styles.report_card,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <ThemeTextPrimary
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontSize: scale(14),
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                Serve Appointments
              </ThemeTextPrimary>
              <BarChart
                data={serveData}
                barWidth={scale(25)}
                spacing={scale(20)}
                frontColor="#a3e635" // bottom color
                gradientColor="#22c55e" // top color
                showGradient // enables gradient
                yAxisThickness={0}
                yAxisTextStyle={{ color: "gray", fontSize: scale(12) }}
                xAxisThickness={0}
                xAxisLabelTextStyle={{ color: "gray", fontSize: scale(12) }}
                hideRules={true}
                isAnimated
                animationDuration={300}
                barBorderRadius={scale(3)}
                height={verticalScale(190)}
              />
            </View>

            <View
              style={[
                styles.report_card,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <ThemeTextPrimary
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontSize: scale(14),
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                Cancel Appointments
              </ThemeTextPrimary>
              <BarChart
                data={cancelData}
                barWidth={scale(25)}
                spacing={scale(20)}
                frontColor="#f87171" // bottom (light red)
                gradientColor="#dc2626" // top (deep red)
                showGradient // enables gradient
                yAxisThickness={0}
                yAxisTextStyle={{ color: "gray", fontSize: scale(12) }}
                xAxisThickness={0}
                xAxisLabelTextStyle={{ color: "gray", fontSize: scale(12) }}
                hideRules={true}
                isAnimated
                animationDuration={300}
                barBorderRadius={scale(3)}
                height={verticalScale(190)}
              />
            </View>
          </View>
        </ScrollView>
      )}

      {selectedTab === "Monthly" && (
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
              fill={99}
              tintColor="#9333ea"
              // onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor={colors.progressBgColor}
            >
              {() => <ThemeTextPrimary>{950}</ThemeTextPrimary>}
            </AnimatedCircularProgress>

            <AnimatedCircularProgress
              size={scale(85)}
              width={scale(10)}
              fill={85}
              tintColor="#16a34a"
              // onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor={colors.progressBgColor}
            >
              {() => <ThemeTextPrimary>{780}</ThemeTextPrimary>}
            </AnimatedCircularProgress>

            <AnimatedCircularProgress
              size={scale(85)}
              width={scale(10)}
              fill={30}
              tintColor="#ef4444"
              // onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor={colors.progressBgColor}
            >
              {() => <ThemeTextPrimary>{150}</ThemeTextPrimary>}
            </AnimatedCircularProgress>
          </View>

          <View
            style={{
              marginTop: verticalScale(20),
              gap: verticalScale(15),
            }}
          >
            <View
              style={[
                styles.report_card,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <ThemeTextPrimary
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontSize: scale(14),
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                Serve Appointments
              </ThemeTextPrimary>
              <BarChart
                data={serveData}
                barWidth={scale(25)}
                spacing={scale(20)}
                frontColor="#a3e635" // bottom color
                gradientColor="#22c55e" // top color
                showGradient // enables gradient
                yAxisThickness={0}
                yAxisTextStyle={{ color: "gray", fontSize: scale(12) }}
                xAxisThickness={0}
                xAxisLabelTextStyle={{ color: "gray", fontSize: scale(12) }}
                hideRules={true}
                isAnimated
                animationDuration={300}
                barBorderRadius={scale(3)}
                height={verticalScale(190)}
              />
            </View>

            <View
              style={[
                styles.report_card,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <ThemeTextPrimary
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontSize: scale(14),
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                Cancel Appointments
              </ThemeTextPrimary>
              <BarChart
                data={cancelData}
                barWidth={scale(25)}
                spacing={scale(20)}
                frontColor="#f87171" // bottom (light red)
                gradientColor="#dc2626" // top (deep red)
                showGradient // enables gradient
                yAxisThickness={0}
                yAxisTextStyle={{ color: "gray", fontSize: scale(12) }}
                xAxisThickness={0}
                xAxisLabelTextStyle={{ color: "gray", fontSize: scale(12) }}
                hideRules={true}
                isAnimated
                animationDuration={300}
                barBorderRadius={scale(3)}
                height={verticalScale(190)}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </ThemeSafeAreaView>
  );
};

export default queueReport;

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

  report_card: {
    width: "100%",
    padding: scale(12),
    borderWidth: scale(1),
    flexDirection: "column",
    gap: verticalScale(10),
    borderRadius: scale(8),
  },
});

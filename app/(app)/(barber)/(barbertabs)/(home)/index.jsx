import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ThemeSafeAreaView from "../../../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../../../components/ThemeTextPrimary";
import ThemeTextSecondary from "../../../../../components/ThemeTextSecondary";
import {
  CalendarIcon,
  NotificationIcon,
  QueueIcon,
  WifiIcon,
} from "../../../../../constants/icons";
import { useBarberGlobal } from "../../../../../context/barber/GlobalContext";
import { useBarberAuth } from "../../../../../context/barber/AuthContext";

const index = () => {
  const { colors } = useTheme();
  const [isOnline, setIsOnline] = useState(true);

  const reports = [
    {
      icon: <CalendarIcon color="#9333ea" size={scale(16)} />,
      iconBg: "#f3e8ff", // purple-100
      iconColor: "#9333ea", // purple-600
      title: "Appointments",
      total: "32 Total",
      data: [
        { label: "Completed", color: "#22c55e", value: 87.5, count: "28 / 32" },
        { label: "No-Shows", color: "#ef4444", value: 12.5, count: "4 / 32" },
      ],
    },
    {
      icon: <QueueIcon color="#2563eb" size={scale(16)} />,
      iconBg: "#dbeafe", // blue-100
      iconColor: "#2563eb", // blue-600
      title: "Queue Bookings",
      total: "48 Total",
      data: [
        { label: "Served", color: "#22c55e", value: 87.5, count: "42 / 48" },
        { label: "Cancelled", color: "#ef4444", value: 12.5, count: "6 / 48" },
      ],
    },
  ];

  return (
    <ThemeSafeAreaView
      style={{
        backgroundColor: colors.background2,
      }}
      edges={["top", "left", "right"]}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: verticalScale(60),
          backgroundColor: colors.background2,
          borderBottomColor: colors.borderColor1,
          borderBottomWidth: scale(1),
          paddingHorizontal: scale(12),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: scale(10),
          }}
        >
          <Image
            style={styles.image}
            source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
            contentFit="cover"
            transition={1000}
          />
          <View>
            <ThemeTextPrimary>Jessica</ThemeTextPrimary>
            <ThemeTextSecondary>Modern Stylist Salon</ThemeTextSecondary>
          </View>
        </View>

        <View>
          <NotificationIcon color={colors.textColor1} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Section 1 */}
        <View style={styles.upcommingAppointmentSection}>
          <ThemeTextPrimary
            style={[
              styles.sectionTitle,
              {
                fontSize: scale(18),
                fontFamily: "AirbnbCereal_W_Bd",
              },
            ]}
          >
            Upcoming Appointments
          </ThemeTextPrimary>

          <LinearGradient
            colors={["#14b8a6", "#0d9488"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.topRow}>
              {/* DATE BOX */}
              <View style={styles.dateBox}>
                <ThemeTextPrimary style={styles.dateDay}>17</ThemeTextPrimary>
                <ThemeTextPrimary style={styles.dateMonth}>
                  July
                </ThemeTextPrimary>
                <ThemeTextSecondary style={styles.dateTime}>
                  12:30
                </ThemeTextSecondary>
              </View>

              {/* CLIENT INFO */}
              <View style={{ flex: 1 }}>
                <ThemeTextPrimary style={styles.clientName}>
                  Michael Swath
                </ThemeTextPrimary>
                <ThemeTextSecondary style={styles.clientDetails}>
                  3 Services | $79.00
                </ThemeTextSecondary>
                <ThemeTextSecondary style={styles.clientDetails}>
                  Approx. 25 mins
                </ThemeTextSecondary>
              </View>
            </View>

            {/* ACTION BUTTONS */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.cancelBtn,
                  {
                    borderColor: "#e5e7eb",
                    borderWidth: scale(0.5),
                  },
                ]}
              >
                <ThemeTextPrimary style={styles.cancelText}>
                  Cancel
                </ThemeTextPrimary>
              </TouchableOpacity>

              <TouchableOpacity style={styles.serveBtn}>
                <ThemeTextPrimary style={styles.serveText}>
                  Serve
                </ThemeTextPrimary>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Section 2 */}

        <View style={styles.liveStatusSection}>
          <ThemeTextPrimary
            style={[
              styles.sectionTitle,
              {
                fontSize: scale(18),
                fontFamily: "AirbnbCereal_W_Bd",
              },
            ]}
          >
            Live Status
          </ThemeTextPrimary>

          <View
            style={[
              styles.liveQueueCard,
              {
                backgroundColor: colors.background,
                borderColor: colors.borderColor1,
              },
            ]}
          >
            {/* Top Section */}
            <View style={styles.liveQueueTopRow}>
              <View style={styles.liveQueueLeft}>
                <View
                  style={[
                    styles.liveQueueIconContainer,
                    { backgroundColor: isOnline ? "#99f6e4" : "#fecaca" },
                  ]}
                >
                  <WifiIcon
                    size={scale(18)}
                    color={isOnline ? "#0d9488" : "#dc2626"}
                  />
                </View>

                <View>
                  <ThemeTextPrimary style={styles.liveQueueActiveTitle}>
                    Active Station
                  </ThemeTextPrimary>
                  <ThemeTextPrimary
                    style={[
                      styles.liveQueueStatusText,
                      { color: isOnline ? "#0d9488" : "#dc2626" },
                    ]}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </ThemeTextPrimary>
                </View>
              </View>

              {/* Switch Toggle */}
              <Switch
                value={isOnline}
                onValueChange={setIsOnline}
                thumbColor={isOnline ? "#fff" : "#cbd5e1"}
                trackColor={{ false: "#e2e8f0", true: "#14b8a6" }}
              />
            </View>

            {/* Divider */}
            <View
              style={[
                styles.liveQueueDivider,
                { borderColor: colors.borderColor1 },
              ]}
            />

            {/* Stats Row */}
            <View style={styles.liveQueueGrid}>
              {[
                { label: "System", value: "On", color: "#22c55e" },
                { label: "Booking", value: "4", color: "#a855f7" },
                { label: "In Queue", value: "0", color: "#3b82f6" },
                { label: "Clock", value: "In", color: "#eab308" },
              ].map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.liveQueueGridBox,
                    { backgroundColor: colors.background2 },
                  ]}
                >
                  <ThemeTextSecondary style={styles.liveQueueGridLabel}>
                    {item.label}
                  </ThemeTextSecondary>
                  <ThemeTextPrimary
                    style={[styles.liveQueueGridValue, { color: item.color }]}
                  >
                    {item.value}
                  </ThemeTextPrimary>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.weeklyReportsSection}>
          <ThemeTextPrimary
            style={[
              styles.sectionTitle,
              {
                fontSize: scale(18),
                fontFamily: "AirbnbCereal_W_Bd",
              },
            ]}
          >
            Weekly Reports
          </ThemeTextPrimary>

          <View style={{ gap: verticalScale(12) }}>
            {reports.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.weeklyReportCard,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.borderColor1,
                  },
                ]}
              >
                {/* Header Row */}
                <View style={styles.weeklyReportHeader}>
                  <View
                    style={[
                      styles.weeklyReportIconContainer,
                      { backgroundColor: item.iconBg },
                    ]}
                  >
                    {item.icon}
                  </View>

                  <ThemeTextPrimary
                    style={[
                      styles.weeklyReportHeaderTitle,
                      {
                        // color: colors.textColor3
                      },
                    ]}
                  >
                    {item.title}
                  </ThemeTextPrimary>

                  <ThemeTextPrimary style={styles.weeklyReportTotal}>
                    {item.total}
                  </ThemeTextPrimary>
                </View>

                {/* Progress Rows */}
                <View style={{ gap: verticalScale(10) }}>
                  {item.data.map((progress, i) => (
                    <View key={i}>
                      <View style={styles.weeklyReportProgressTop}>
                        <ThemeTextPrimary
                          style={[
                            styles.weeklyReportProgressLabel,
                            { color: progress.color },
                          ]}
                        >
                          {progress.label}
                        </ThemeTextPrimary>
                        <ThemeTextSecondary
                          style={[
                            styles.weeklyReportProgressCount,
                            {
                              color: colors.textColor2,
                            },
                          ]}
                        >
                          {progress.count}
                        </ThemeTextSecondary>
                      </View>

                      <View
                        style={[
                          styles.weeklyReportProgressBarBackground,
                          {
                            backgroundColor: colors.progressBgColor,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.weeklyReportProgressBarFill,
                            {
                              width: `${progress.value}%`,
                              backgroundColor: progress.color,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemeSafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    gap: verticalScale(15),
  },

  image: {
    width: scale(40),
    height: scale(40),
    backgroundColor: "#0553",
    borderRadius: scale(20),
  },

  upcommingAppointmentSection: {
    flexDirection: "column",
    gap: verticalScale(10),
  },

  card: {
    width: "100%",
    borderRadius: scale(20),
    padding: scale(14),
    marginRight: scale(12),
  },
  topRow: {
    flexDirection: "row",
    gap: scale(12),
  },
  dateBox: {
    width: scale(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: scale(10),
    paddingVertical: verticalScale(10),
  },
  dateDay: {
    color: "#fff",
    fontSize: scale(22),
    fontFamily: "AirbnbCereal_W_Bd",
  },
  dateMonth: {
    color: "#fff",
    fontSize: scale(18),
  },
  dateTime: {
    color: "#fff",
    fontSize: scale(12),
  },
  clientName: {
    color: "#fff",
    fontSize: scale(18),
    fontFamily: "AirbnbCereal_W_Bd",
  },
  clientDetails: {
    color: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: verticalScale(20),
    gap: scale(12),
  },
  cancelBtn: {
    flex: 1,
    borderRadius: scale(10),
    paddingVertical: scale(10),
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
  },
  serveBtn: {
    flex: 1,
    borderRadius: scale(10),
    paddingVertical: scale(10),
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
  },
  serveText: {
    color: "#0d9488",
  },

  liveStatusSection: {
    flexDirection: "column",
    gap: verticalScale(10),
  },

  liveQueueCard: {
    borderWidth: 1,
    borderRadius: moderateScale(16),
    padding: moderateScale(12),
  },
  liveQueueTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  liveQueueLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  liveQueueIconContainer: {
    padding: moderateScale(6),
    borderRadius: 999,
  },
  liveQueueActiveTitle: {
    fontSize: scale(14),
  },
  liveQueueStatusText: {
    fontSize: scale(14),
  },
  liveQueueDivider: {
    borderTopWidth: 1,
    marginVertical: verticalScale(10),
  },
  liveQueueGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: scale(8),
  },
  liveQueueGridBox: {
    flex: 1,
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(10),
    alignItems: "center",
  },
  liveQueueGridLabel: {
    fontSize: scale(13),
    fontFamily: "AirbnbCereal_W_Bd",
    opacity: 0.8,
  },
  liveQueueGridValue: {
    fontWeight: "700",
    marginTop: verticalScale(3),
  },

  weeklyReportsSection: {
    flexDirection: "column",
    gap: verticalScale(10),
  },

  weeklyReportCard: {
    borderWidth: 1,
    borderRadius: moderateScale(16),
    padding: moderateScale(12),
  },
  weeklyReportHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  weeklyReportIconContainer: {
    padding: moderateScale(6),
    borderRadius: 999,
    marginRight: scale(8),
  },
  weeklyReportHeaderTitle: {
    fontSize: scale(14),
    flex: 1,
  },
  weeklyReportTotal: {
    fontWeight: "700",
    fontSize: moderateScale(12),
    // color: "#1e293b", // slate-800
  },
  weeklyReportProgressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(4),
  },
  weeklyReportProgressLabel: {
    fontSize: moderateScale(12),
  },
  weeklyReportProgressCount: {
    fontSize: moderateScale(12),
  },
  weeklyReportProgressBarBackground: {
    width: "100%",
    height: verticalScale(8),
    borderRadius: moderateScale(8),
    overflow: "hidden",
  },
  weeklyReportProgressBarFill: {
    height: "100%",
    borderRadius: moderateScale(8),
  },
});

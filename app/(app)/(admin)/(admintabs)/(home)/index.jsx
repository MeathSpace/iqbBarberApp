import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ThemeSafeAreaView from "../../../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../../../components/ThemeTextPrimary";
import ThemeTextSecondary from "../../../../../components/ThemeTextSecondary";
import {
  CalendarIcon,
  NotificationIcon,
  ProfileIcon,
  QueueIcon,
  ScissorIcon,
} from "../../../../../constants/icons";
import i18n from "../../../../src/localization/i18n";

const index = () => {
  const baseContent = i18n.t("app.admin.admintabs.home");

  const { colors } = useTheme();
  const [isOnline, setIsOnline] = useState(true);

  const statusData = [
    {
      id: 1,
      label: baseContent.status.inQueue,
      value: 53,
      iconBg: "#f3e8ff",
      icon: <QueueIcon size={scale(20)} color="#9333ea" />,
    },
    {
      id: 2,
      label: baseContent.status.appointment,
      value: 1,
      iconBg: "#dbeafe",
      icon: <CalendarIcon size={scale(20)} color="#2563eb" />,
    },
    {
      id: 3,
      label: baseContent.status.onDuty,
      value: 5,
      iconBg: "#ffedd5",
      icon: <ProfileIcon size={scale(20)} color="#ea580c" />,
    },
    {
      id: 4,
      label: baseContent.status.customer,
      value: 12,
      iconBg: "#dcfce7",
      icon: <ProfileIcon size={scale(20)} color="#16a34a" />,
    },
  ];

  const reports = [
    {
      icon: <CalendarIcon color="#9333ea" size={scale(16)} />,
      iconBg: "#f3e8ff",
      iconColor: "#9333ea",
      title: baseContent.reports.appointments.title,
      total: baseContent.reports.appointments.total.replace("{{count}}", 32),
      data: [
        {
          label: baseContent.reports.appointments.completed,
          color: "#22c55e",
          value: 87.5,
          count: "28 / 32",
        },
        {
          label: baseContent.reports.appointments.noShows,
          color: "#ef4444",
          value: 12.5,
          count: "4 / 32",
        },
      ],
    },
    {
      icon: <QueueIcon color="#2563eb" size={scale(16)} />,
      iconBg: "#dbeafe",
      iconColor: "#2563eb",
      title: baseContent.reports.queueBookings.title,
      total: baseContent.reports.queueBookings.total.replace("{{count}}", 48),
      data: [
        {
          label: baseContent.reports.queueBookings.served,
          color: "#22c55e",
          value: 87.5,
          count: "42 / 48",
        },
        {
          label: baseContent.reports.queueBookings.cancelled,
          color: "#ef4444",
          value: 12.5,
          count: "6 / 48",
        },
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
            <ThemeTextSecondary>
              {baseContent.header.salonName}
            </ThemeTextSecondary>
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
          <LinearGradient
            colors={["#14b8a6", "#0d9488"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View
              style={[
                styles.topRow,
                {
                  borderBottomColor: "#efefef",
                },
              ]}
            >
              {/* ICON BOX */}
              <View style={styles.iconBox}>
                <ScissorIcon size={moderateScale(26)} color="#fff" />
              </View>

              {/* SALON INFO */}
              <View style={{ flex: 1 }}>
                <ThemeTextPrimary style={styles.clientName}>
                  {baseContent.salonCard.title}
                </ThemeTextPrimary>

                <ThemeTextSecondary style={styles.clientDetails}>
                  {baseContent.salonCard.subtitle}
                </ThemeTextSecondary>
              </View>
            </View>

            {/* ACTION BUTTONS */}
            <View style={styles.buttonRow}>
              <View>
                <ThemeTextSecondary style={{ color: "#efefef" }}>
                  {baseContent.salonCard.statusLabel}
                </ThemeTextSecondary>

                <ThemeTextPrimary
                  style={{ color: "#fff", fontFamily: "AirbnbCereal_W_Bd" }}
                >
                  {baseContent.salonCard.open}
                </ThemeTextPrimary>
              </View>

              <Switch
                value={isOnline}
                onValueChange={setIsOnline}
                thumbColor={isOnline ? "#fff" : "#fff"}
                trackColor={{
                  false: "#ef4444", // Tailwind red-500
                  true: "#14b8a6", // Tailwind teal-500
                }}
              />
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
            {baseContent.sections.liveStatus}
          </ThemeTextPrimary>

          <View style={styles.statusGrid}>
            {statusData.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.statusCard,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.borderColor1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.statusIconContainer,
                    { backgroundColor: item.iconBg },
                  ]}
                >
                  {item.icon}
                </View>

                <View>
                  <ThemeTextSecondary>{item.label}</ThemeTextSecondary>
                  <ThemeTextPrimary>{item.value}</ThemeTextPrimary>
                </View>
              </View>
            ))}
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
            {baseContent.sections.weeklyReports}
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
  image: {
    width: scale(40),
    height: scale(40),
    backgroundColor: "#0553",
    borderRadius: scale(20),
  },

  scrollContainer: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    gap: verticalScale(15),
  },

  card: {
    width: "100%",
    borderRadius: scale(20),
    padding: scale(14),
    marginRight: scale(12),
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    paddingBottom: verticalScale(10),
    borderBottomWidth: 1,
  },
  iconBox: {
    width: scale(50),
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: scale(10),
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
    justifyContent: "space-between",
    marginTop: verticalScale(15),
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

  liveStatusSection: {
    flexDirection: "column",
    gap: verticalScale(10),
  },

  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: verticalScale(16),
  },
  statusCard: {
    borderWidth: scale(1),
    borderRadius: scale(16),
    height: verticalScale(60),
    paddingHorizontal: scale(8),
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: verticalScale(16),
    gap: scale(12),
  },

  statusIconContainer: {
    padding: scale(7),
    borderRadius: scale(12),
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

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import BarberHeader from "../../../../../components/Header/BarberHeader";
import { darkTheme } from "../../../../../constants/appTheme";
import { useBarberAuth } from "../../../../../context/barber/AuthContext";
import api from "../../../../../utils/api";

const Shimmer = ({ width, height, borderRadius = 6, style }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1300,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, 250],
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            "transparent",
            "rgba(255, 255, 255, 0.12)",
            "rgba(255, 255, 255, 0.18)",
            "rgba(255, 255, 255, 0.12)",
            "transparent",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1, width: "100%" }}
        />
      </Animated.View>
    </View>
  );
};

const Dashboard = () => {
  const router = useRouter();
  const { authenticatedUser } = useBarberAuth();

  const salonId = authenticatedUser?.salonId;
  const barberId = authenticatedUser?.barberId;

  const [dashboardReport, setDashboardReport] = useState(null);
  const [liveQueueList, setLiveQueueList] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState({
    totalCount: 0,
    appointments: [],
  });
  const [salonInfo, setSalonInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = useCallback(
    async (isRefresh = false) => {
      if (!salonId || !barberId) return;

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const [reportRes, queueRes, todayApptRes, salonInfoRes] =
          await Promise.allSettled([
            api.post("/reports/getnewbarberdashboardReports", {
              salonId,
              barberId,
            }),
            api.get(
              `/queue/getQlistByBarberId?salonId=${salonId}&barberId=${barberId}&page=1&search=`,
            ),
            api.post("/appointments/getAllAppointmentsByBarberForToday", {
              salonId,
              barberId,
            }),
            api.post("/barber/getSalonInfoBySalonId", {
              salonId,
            }),
          ]);

        if (
          reportRes.status === "fulfilled" &&
          reportRes.value?.data?.response
        ) {
          setDashboardReport(reportRes.value.data.response);
        }

        if (queueRes.status === "fulfilled") {
          setLiveQueueList(queueRes.value?.data?.response || []);
        }

        if (
          todayApptRes.status === "fulfilled" &&
          todayApptRes.value?.data?.response
        ) {
          setTodayAppointments({
            totalCount: todayApptRes.value.data.response.totalCount ?? 0,
            appointments: todayApptRes.value.data.response.appointments || [],
          });
        }

        if (salonInfoRes.status === "fulfilled") {
          const info = salonInfoRes.value?.data?.response;
          if (typeof info === "string") {
            setSalonInfo(info);
          } else if (info?.salonInfo) {
            setSalonInfo(info.salonInfo);
          }
        }
      } catch (error) {
        console.log("Error fetching barber dashboard:", error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [salonId, barberId],
  );

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const queueMetrics = dashboardReport?.queue || {};
  const appointmentMetrics = dashboardReport?.appointment || {};

  const isQueueRise = queueMetrics?.queueTrend === "Rise";
  const queuePercentChange = Number(
    queueMetrics?.percentageChangelast30Days ?? 0,
  );
  const servedQueuePct = Number(queueMetrics?.servedHistoryPercentage ?? 50);
  const cancelledQueuePct = Number(
    queueMetrics?.cancelledHistoryPercentage ?? 50,
  );

  const totalApptCount = Number(
    appointmentMetrics?.totalAppointmentHistoryCount ?? 0,
  );
  const servedApptCount = Number(
    appointmentMetrics?.servedAppointmenthistoryCount ?? 0,
  );
  const cancelledApptCount = Number(
    appointmentMetrics?.cancelledAppointmentHistoryCount ?? 0,
  );

  const chartMaxValue = Math.max(
    totalApptCount,
    servedApptCount,
    cancelledApptCount,
    3,
  );

  const appointmentChartData = [
    {
      value: totalApptCount,
      label: "Total",
      frontColor: darkTheme.colors.accent,
      topLabelComponent: () => (
        <Text style={styles.chartTopLabel}>{totalApptCount}</Text>
      ),
    },
    {
      value: servedApptCount,
      label: "Served",
      frontColor: "#34C759",
      topLabelComponent: () => (
        <Text style={styles.chartTopLabel}>{servedApptCount}</Text>
      ),
    },
    {
      value: cancelledApptCount,
      label: "Canceled",
      frontColor: "#FF3B30",
      topLabelComponent: () => (
        <Text style={styles.chartTopLabel}>{cancelledApptCount}</Text>
      ),
    },
  ];

  const upNextCustomer = liveQueueList?.[0] || null;
  const nextAppt = todayAppointments?.appointments?.[0] || null;

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <BarberHeader
        title="Dashboard"
        subTitle="Personal Chair Overview"
        showBack={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchDashboardData(true)}
            tintColor={darkTheme.colors.accent}
            colors={[darkTheme.colors.accent]}
          />
        }
      >
        {/* 1. Compact Performance Quick-Metrics Split Row */}
        <View style={styles.splitGridRow}>
          <View
            style={[
              styles.compactDataCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: "rgba(255,255,255,0.05)",
              },
            ]}
          >
            <View style={styles.compactMetricHeader}>
              <Text style={styles.miniCapsTitle}>QUEUE HISTORY</Text>
              <Ionicons
                name={isQueueRise ? "trending-up" : "trending-down"}
                size={scale(14)}
                color={isQueueRise ? "#34C759" : "#FF3B30"}
              />
            </View>
            {loading ? (
              <Shimmer
                width={scale(80)}
                height={verticalScale(22)}
                style={{ marginVertical: verticalScale(6) }}
              />
            ) : (
              <Text style={styles.massiveMetricText}>
                {isQueueRise ? "+" : "-"}
                {Math.abs(queuePercentChange)}%
              </Text>
            )}
            <View style={styles.miniProgressTrack}>
              <View
                style={[
                  styles.miniProgressFill,
                  {
                    width: `${
                      servedQueuePct + cancelledQueuePct > 0
                        ? servedQueuePct
                        : 50
                    }%`,
                    backgroundColor: "#34C759",
                  },
                ]}
              />
              <View
                style={[
                  styles.miniProgressFill,
                  {
                    width: `${
                      servedQueuePct + cancelledQueuePct > 0
                        ? cancelledQueuePct
                        : 50
                    }%`,
                    backgroundColor: "#FF3B30",
                  },
                ]}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/(barbertabs)/(appointment)")}
            style={[
              styles.compactDataCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: "rgba(255,255,255,0.05)",
              },
            ]}
          >
            <View style={styles.compactMetricHeader}>
              <Text style={styles.miniCapsTitle}>TODAY BOOKINGS</Text>
              <Ionicons
                name="calendar-outline"
                size={scale(14)}
                color={darkTheme.colors.accent}
              />
            </View>
            {loading ? (
              <Shimmer
                width={scale(70)}
                height={verticalScale(22)}
                style={{ marginVertical: verticalScale(6) }}
              />
            ) : (
              <Text style={styles.massiveMetricText}>
                {todayAppointments?.totalCount ?? 0}{" "}
                <Text style={styles.metricUnit}>Appts</Text>
              </Text>
            )}
            <Text style={styles.metricContextHint}>
              {liveQueueList.length} in live queue
            </Text>
          </TouchableOpacity>
        </View>

        {/* Shift Status Banner */}
        <View
          style={[
            styles.statusBannerCard,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: "rgba(255,255,255,0.05)",
            },
          ]}
        >
          <View style={styles.statusBannerLeft}>
            <MaterialCommunityIcons
              name="clock-check-outline"
              size={scale(16)}
              color={
                authenticatedUser?.isClockedIn
                  ? "#34C759"
                  : darkTheme.colors.textMuted
              }
            />
            <Text
              style={[
                styles.statusBannerTitle,
                { color: darkTheme.colors.textMain },
              ]}
            >
              Shift Profile:{" "}
              {authenticatedUser?.isClockedIn
                ? authenticatedUser?.isOnline
                  ? "Online"
                  : "Clocked In"
                : "Offline"}
            </Text>
          </View>
          <Text
            style={[
              styles.statusBannerRightText,
              { color: darkTheme.colors.accent },
            ]}
          >
            {nextAppt?.startTime
              ? `Next Appt: ${nextAppt.startTime}`
              : `Queue EWT: ${authenticatedUser?.barberEWT ?? 0}m`}
          </Text>
        </View>

        {/* 2. High-Fidelity Queue Spotlight Focus Box */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/(barbertabs)/(queue)")}
          style={[
            styles.spotlightQueueCard,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: "rgba(255,255,255,0.06)",
            },
          ]}
        >
          <View style={styles.spotlightBadgeRow}>
            <View style={styles.liveIndicatorContainer}>
              <View style={styles.pulseDot} />
              <Text style={styles.liveIndicatorText}>
                LIVE QUEUE STATUS ({liveQueueList.length})
              </Text>
            </View>
            <View style={styles.nextPillContainer}>
              <Text style={styles.nextPillText}>
                {upNextCustomer
                  ? `POS #${upNextCustomer.qPosition ?? 1}`
                  : "IDLE"}
              </Text>
            </View>
          </View>

          {loading ? (
            <View style={styles.spotlightProfileRow}>
              <Shimmer
                width={scale(42)}
                height={scale(42)}
                borderRadius={scale(12)}
              />
              <View style={{ flex: 1, gap: verticalScale(6) }}>
                <Shimmer width={scale(120)} height={verticalScale(14)} />
                <Shimmer width={scale(90)} height={verticalScale(10)} />
              </View>
            </View>
          ) : (
            <View style={styles.spotlightProfileRow}>
              <View
                style={[
                  styles.spotlightAvatarBox,
                  { backgroundColor: "rgba(255,149,0,0.08)" },
                ]}
              >
                <Ionicons
                  name="flash"
                  size={scale(18)}
                  color={darkTheme.colors.accent}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.spotlightClientName,
                    { color: darkTheme.colors.textMain },
                  ]}
                >
                  {upNextCustomer
                    ? upNextCustomer.customerName
                    : "No Customer in Queue"}
                </Text>
                <Text
                  style={[
                    darkTheme.typography.bodyMuted,
                    styles.spotlightStylistSub,
                  ]}
                  numberOfLines={1}
                >
                  {upNextCustomer
                    ? upNextCustomer.services
                        ?.map((s) => s.serviceName)
                        .join(", ") ||
                      `Assigned: ${
                        upNextCustomer.barberName || authenticatedUser?.name
                      }`
                    : `Assigned: ${authenticatedUser?.name || "Barber"}`}
                </Text>
              </View>
              <View style={styles.timeAlignmentColumn}>
                <Text style={styles.timeValueText}>
                  {upNextCustomer
                    ? (upNextCustomer.customerEWT ??
                      upNextCustomer.serviceEWT ??
                      "--")
                    : "--"}
                </Text>
                <Text style={styles.timeLabelText}>EST. MINS</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* 3. Analytics Overview Container */}
        <View
          style={[
            styles.premiumCard,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: "rgba(255,255,255,0.06)",
            },
          ]}
        >
          <View style={styles.chartHeaderBlock}>
            <Text
              style={[
                darkTheme.typography.cardTitle,
                styles.sectionTitleLabel,
                { color: darkTheme.colors.textMain },
              ]}
            >
              Appointments Overview
            </Text>
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                styles.chartSubtitleLabel,
              ]}
            >
              Dynamic active logs •{" "}
              {appointmentMetrics?.dateFormat || "Last 7 days"}
            </Text>
          </View>

          <View style={styles.chartWrapperAlignmentFrame}>
            <BarChart
              data={appointmentChartData}
              barWidth={scale(38)}
              spacing={scale(32)}
              roundedTop
              noOfSections={3}
              maxValue={chartMaxValue}
              isAnimated
              yAxisThickness={0}
              xAxisThickness={1}
              xAxisColor="rgba(255,255,255,0.08)"
              yAxisTextStyle={styles.chartAxisLabelTextStyle}
              xAxisLabelTextStyle={styles.chartAxisLabelTextStyle}
              rulesType="solid"
              rulesColor="rgba(255,255,255,0.03)"
              height={verticalScale(110)}
            />
          </View>
        </View>

        {/* Salon Announcement Card (when available) */}
        {Boolean(salonInfo) && (
          <View
            style={[
              styles.premiumCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: "rgba(255,255,255,0.06)",
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: scale(8),
                marginBottom: verticalScale(8),
              }}
            >
              <Ionicons
                name="megaphone-outline"
                size={scale(15)}
                color={darkTheme.colors.accent}
              />
              <Text
                style={[
                  darkTheme.typography.cardTitle,
                  styles.sectionTitleLabel,
                  { color: darkTheme.colors.textMain },
                ]}
              >
                Salon Announcement
              </Text>
            </View>
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                { fontSize: scale(12), lineHeight: verticalScale(18) },
              ]}
            >
              {salonInfo}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
    gap: verticalScale(20),
  },
  premiumCard: {
    borderWidth: 1,
    borderRadius: scale(16),
    padding: scale(16),
  },
  splitGridRow: {
    flexDirection: "row",
    gap: scale(12),
    width: "100%",
  },
  compactDataCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: scale(14),
    padding: scale(12),
    justifyContent: "space-between",
    minHeight: verticalScale(85),
  },
  compactMetricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  miniCapsTitle: {
    fontSize: scale(9),
    fontWeight: "700",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 0.5,
  },
  massiveMetricText: {
    fontSize: scale(20),
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    marginVertical: verticalScale(6),
  },
  metricUnit: {
    fontSize: scale(11),
    fontWeight: "400",
    color: "rgba(255,255,255,0.4)",
  },
  metricContextHint: {
    fontSize: scale(9.5),
    color: "rgba(255,255,255,0.35)",
  },
  miniProgressTrack: {
    width: "100%",
    height: scale(4),
    borderRadius: scale(2),
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  miniProgressFill: {
    height: "100%",
  },
  statusBannerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
  },
  statusBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  statusBannerTitle: {
    fontSize: scale(12),
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  statusBannerRightText: {
    fontSize: scale(11.5),
    fontWeight: "700",
    letterSpacing: -0.1,
  },
  spotlightQueueCard: {
    borderWidth: 1,
    borderRadius: scale(16),
    padding: scale(16),
  },
  spotlightBadgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(14),
  },
  liveIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  pulseDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: darkTheme.colors.accent,
  },
  liveIndicatorText: {
    fontSize: scale(9.5),
    fontWeight: "700",
    color: darkTheme.colors.accent,
    letterSpacing: 0.5,
  },
  nextPillContainer: {
    backgroundColor: "rgba(52, 199, 89, 0.12)",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: scale(20),
  },
  nextPillText: {
    fontSize: scale(9),
    fontWeight: "700",
    color: "#34C759",
  },
  spotlightProfileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(14),
  },
  spotlightAvatarBox: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  spotlightClientName: {
    fontSize: scale(15),
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  spotlightStylistSub: {
    fontSize: scale(11.5),
    opacity: 0.5,
    marginTop: verticalScale(2),
  },
  timeAlignmentColumn: {
    alignItems: "center",
  },
  timeValueText: {
    fontSize: scale(18),
    fontWeight: "800",
    color: "#FFFFFF",
  },
  timeLabelText: {
    fontSize: scale(8),
    fontWeight: "600",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 0.2,
  },
  sectionTitleLabel: {
    fontSize: scale(14),
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  chartHeaderBlock: {
    marginBottom: verticalScale(18),
  },
  chartSubtitleLabel: {
    fontSize: scale(11),
    marginTop: verticalScale(2),
    opacity: 0.45,
  },
  chartWrapperAlignmentFrame: {
    width: "100%",
    alignItems: "center",
    paddingLeft: scale(8),
  },
  chartTopLabel: {
    color: "#FFFFFF",
    fontSize: scale(9.5),
    fontWeight: "600",
    marginBottom: verticalScale(4),
  },
  chartAxisLabelTextStyle: {
    color: "rgba(255,255,255,0.3)",
    fontSize: scale(9),
  },
});
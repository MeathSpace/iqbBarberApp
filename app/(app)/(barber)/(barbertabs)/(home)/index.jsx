import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// Native interactive charting engine components
import { BarChart } from "react-native-gifted-charts";

import BarberHeader from "../../../../../components/Header/BarberHeader"; // Adjust path as needed
import { darkTheme } from "../../../../../constants/appTheme";

const Dashboard = () => {
  const appointmentChartData = [
    {
      value: 1,
      label: "Total",
      frontColor: darkTheme.colors.accent,
      topLabelComponent: () => <Text style={styles.chartTopLabel}>1</Text>,
    },
    {
      value: 1,
      label: "Served",
      frontColor: "#34C759",
      topLabelComponent: () => <Text style={styles.chartTopLabel}>1</Text>,
    },
    {
      value: 0,
      label: "Canceled",
      frontColor: "#FF3B30",
      topLabelComponent: () => <Text style={styles.chartTopLabel}>0</Text>,
    },
  ];

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
              <Ionicons name="trending-down" size={scale(14)} color="#FF3B30" />
            </View>
            <Text style={styles.massiveMetricText}>-97.6%</Text>
            <View style={styles.miniProgressTrack}>
              <View
                style={[
                  styles.miniProgressFill,
                  { width: "50%", backgroundColor: "#34C759" },
                ]}
              />
              <View
                style={[
                  styles.miniProgressFill,
                  { width: "50%", backgroundColor: "#FF3B30" },
                ]}
              />
            </View>
          </View>

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
              <Text style={styles.miniCapsTitle}>FLOOR CAPACITY</Text>
              <Ionicons
                name="people-outline"
                size={scale(14)}
                color={darkTheme.colors.accent}
              />
            </View>
            <Text style={styles.massiveMetricText}>
              7 <Text style={styles.metricUnit}>Staff</Text>
            </Text>
            <Text style={styles.metricContextHint}>Active floor roster</Text>
          </View>
        </View>

        {/* NEW ADDITION: Shift Status Banner (Fulfills visual composition & adds contextual value) */}
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
              color="#34C759"
            />
            <Text style={[styles.statusBannerTitle, { color: darkTheme.colors.textMain }]}>
              Shift Profile: Active
            </Text>
          </View>
          <Text style={[styles.statusBannerRightText, { color: darkTheme.colors.accent }]}>
            Next Open Slot: 2:45 PM
          </Text>
        </View>

        {/* 2. High-Fidelity Queue Spotlight Focus Box */}
        <View
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
              <Text style={styles.liveIndicatorText}>LIVE QUEUE STATUS</Text>
            </View>
            <View style={styles.nextPillContainer}>
              <Text style={styles.nextPillText}>UP NEXT</Text>
            </View>
          </View>

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
                Shyam Sharma
              </Text>
              <Text
                style={[
                  darkTheme.typography.bodyMuted,
                  styles.spotlightStylistSub,
                ]}
              >
                Assigned: Stylist John Doe
              </Text>
            </View>
            <View style={styles.timeAlignmentColumn}>
              <Text style={styles.timeValueText}>--</Text>
              <Text style={styles.timeLabelText}>EST. MINS</Text>
            </View>
          </View>
        </View>

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
              Dynamic active logs • Last 7 days
            </Text>
          </View>

          <View style={styles.chartWrapperAlignmentFrame}>
            <BarChart
              data={appointmentChartData}
              barWidth={scale(38)}
              spacing={scale(32)}
              roundedTop
              noOfSections={3}
              maxValue={3}
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
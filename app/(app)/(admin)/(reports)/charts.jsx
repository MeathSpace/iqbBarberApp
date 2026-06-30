import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment"; // Premium dynamic dates calculation layer
import { useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../components/Header/Header"; // Adjust path as needed
import { darkTheme } from "../../../../constants/appTheme";

const TIME_FILTERS = ["Daily", "Weekly", "Monthly"];

const LEGEND_DATA = [
  { name: "John Doe", color: "#FF3B30" },
  { name: "Bob", color: "#34C759" },
  { name: "vivob", color: "#AF52DE" },
];

const ANALYTICS_FEED = [
  {
    id: "a1",
    title: "Appointments serve",
    desc: "General analytics overview of customer check-ins.",
    icon: "chart-box-outline",
  },
  {
    id: "a2",
    title: "Cancellations logs",
    desc: "Insight summary tracking real-time storefront no-shows.",
    icon: "alert-circle-outline",
  },
];

const ChartsDetailScreen = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState("Weekly");
  const [chartType, setChartType] = useState("bar");
  const [calendarVisible, setCalendarVisible] = useState(false);

  // Tracking baseline date context (defaults to current date context)
  const [currentMonthMoment, setCurrentMonthMoment] = useState(
    moment("2026-03-01"),
  );
  const [startDate, setStartDate] = useState(moment("2026-03-01"));
  const [endDate, setEndDate] = useState(moment("2026-03-15"));

  // Dynamic Calendar Grid Engine using Moment
  const calendarGridData = useMemo(() => {
    const startOfMonth = currentMonthMoment.clone().startOf("month");
    const endOfMonth = currentMonthMoment.clone().endOf("month");

    const totalDaysInMonth = currentMonthMoment.daysInMonth();

    // Finds the day of week index (0 = Sun, 1 = Mon...) to establish leading buffer alignment
    const startDayOfWeek = startOfMonth.day();

    // Calculate greyed-out trailing days from previous month
    const prevMonthMoment = currentMonthMoment.clone().subtract(1, "month");
    const totalDaysInPrevMonth = prevMonthMoment.daysInMonth();
    const prevPadding = [];
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      prevPadding.push({
        dayNum: totalDaysInPrevMonth - i,
        isCurrentMonth: false,
        momentObj: prevMonthMoment.clone().date(totalDaysInPrevMonth - i),
      });
    }

    // Build active current month day matrices
    const currentDays = [];
    for (let i = 1; i <= totalDaysInMonth; i++) {
      currentDays.push({
        dayNum: i,
        isCurrentMonth: true,
        momentObj: currentMonthMoment.clone().date(i),
      });
    }

    // Calculate dynamic leading padding days from future next month to balance 7-column matrix rows
    const absoluteTotalCells = prevPadding.length + currentDays.length;
    const missingGridCells =
      absoluteTotalCells % 7 === 0 ? 0 : 7 - (absoluteTotalCells % 7);
    const nextMonthMoment = currentMonthMoment.clone().add(1, "month");
    const nextPadding = [];
    for (let i = 1; i <= missingGridCells; i++) {
      nextPadding.push({
        dayNum: i,
        isCurrentMonth: false,
        momentObj: nextMonthMoment.clone().date(i),
      });
    }

    return [...prevPadding, ...currentDays, ...nextPadding];
  }, [currentMonthMoment]);

  const barData = [
    {
      value: 1450,
      label: "01 Mar",
      frontColor: "#FF3B30",
      topLabelComponent: () => (
        <Text style={styles.chartTopValueText}>1.45K</Text>
      ),
    },
    {
      value: 385,
      frontColor: "#34C759",
      topLabelComponent: () => (
        <Text style={styles.chartTopValueText}>385</Text>
      ),
    },
    {
      value: 2100,
      label: "08 Mar",
      frontColor: "#FF3B30",
      topLabelComponent: () => (
        <Text style={styles.chartTopValueText}>2.1K</Text>
      ),
    },
    {
      value: 1200,
      frontColor: "#AF52DE",
      topLabelComponent: () => (
        <Text style={styles.chartTopValueText}>1.2K</Text>
      ),
    },
    {
      value: 2800,
      label: "15 Mar",
      frontColor: "#34C759",
      topLabelComponent: () => (
        <Text style={styles.chartTopValueText}>2.8K</Text>
      ),
    },
    {
      value: 950,
      frontColor: "#FF3B30",
      topLabelComponent: () => (
        <Text style={styles.chartTopValueText}>950</Text>
      ),
    },
  ];

  const lineData = barData.map((item) => ({
    value: item.value,
    label: item.label,
    dataPointText:
      item.value >= 1000
        ? `₹${(item.value / 1000).toFixed(1)}k`
        : `₹${item.value}`,
  }));

  const chartCommonConfig = {
    noOfSections: 4,
    maxValue: 3000,
    initialSpacing: scale(12),
    isAnimated: true,
    animationDuration: 400,
    yAxisThickness: 0,
    xAxisThickness: 1,
    xAxisColor: "rgba(255,255,255,0.1)",
    rulesType: "dashed",
    rulesColor: "rgba(255,255,255,0.05)",
    xAxisLabelTextStyle: styles.xAxisLabelStyle,
    hideRules: false,
    hideYAxisText: true,
    width: scale(barData.length * 44 + 32),
  };

  const handleDayPress = (dayObj) => {
    const targetMoment = dayObj.momentObj;
    if (!startDate || (startDate && endDate)) {
      setStartDate(targetMoment);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (targetMoment.isBefore(startDate, "day")) {
        setStartDate(targetMoment);
      } else {
        setEndDate(targetMoment);
      }
    }
  };

  const handlePrevMonthToggle = () => {
    setCurrentMonthMoment((prev) => prev.clone().subtract(1, "month"));
  };

  const handleNextMonthToggle = () => {
    setCurrentMonthMoment((prev) => prev.clone().add(1, "month"));
  };

  const formatDateLabel = (dateObj) =>
    dateObj ? dateObj.format("DD/MM/YYYY") : "--/--/----";
  const formatBannerLabel = (dateObj) =>
    dateObj ? dateObj.format("DD MMMM") : "Select End Date";

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header
        title="Performance Dashboard"
        subTitle="Appointment breakdown summary"
        showBack={true}
      />

      <View style={styles.premiumMinimalistStatusBar}>
        <TouchableOpacity
          style={[
            styles.dateTextPillBadge,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: darkTheme.colors.border,
            },
          ]}
          activeOpacity={0.7}
          onPress={() => setCalendarVisible(true)}
        >
          <Feather
            name="calendar"
            size={scale(12)}
            color={darkTheme.colors.accent}
            style={{ marginRight: scale(6) }}
          />
          <Text
            style={[
              darkTheme.typography.bodyMain,
              styles.statusBarDateText,
              { color: darkTheme.colors.textMain },
            ]}
          >
            {startDate ? startDate.format("DD/MM/YY") : "Start"} —{" "}
            {endDate ? endDate.format("DD/MM/YY") : "End"}
          </Text>
          <Ionicons
            name="chevron-down"
            size={scale(11)}
            color={darkTheme.colors.textMuted}
            style={{ marginLeft: scale(4) }}
          />
        </TouchableOpacity>

        <View style={styles.rightActionToolsSubgroup}>
          <TouchableOpacity
            style={[
              styles.minimalistSquareTool,
              { borderColor: darkTheme.colors.border },
              chartType === "line" && {
                backgroundColor: "rgba(255, 149, 0, 0.12)",
                borderColor: darkTheme.colors.accent,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => setChartType(chartType === "bar" ? "line" : "bar")}
          >
            <MaterialCommunityIcons
              name={chartType === "bar" ? "chart-line" : "chart-bar"}
              size={scale(14)}
              color={
                chartType === "line"
                  ? darkTheme.colors.accent
                  : darkTheme.colors.textMain
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.minimalistSquareTool,
              { borderColor: darkTheme.colors.border },
            ]}
            activeOpacity={0.7}
          >
            <Ionicons
              name="refresh"
              size={scale(13)}
              color={darkTheme.colors.textMain}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View
          style={[
            styles.chartContainerCard,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: darkTheme.colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.segmentedPillTrack,
              { backgroundColor: "rgba(255,255,255,0.02)" },
            ]}
          >
            {TIME_FILTERS.map((filter) => {
              const isSelected = activeTimeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveTimeFilter(filter)}
                  style={[
                    styles.segmentTabNode,
                    isSelected && { backgroundColor: "rgba(255, 149, 0, 0.1)" },
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.segmentNodeText,
                      {
                        color: isSelected
                          ? darkTheme.colors.accent
                          : darkTheme.colors.textMuted,
                        fontWeight: isSelected ? "700" : "500",
                      },
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.chartMasterLayoutFrame}>
            <View style={styles.fixedYAxisLayoutColumn}>
              {["₹3.00K", "₹2.25K", "₹1.50K", "₹750", "₹0"].map(
                (yLabel, yIdx) => (
                  <Text key={yIdx} style={styles.fixedYAxisTextLabel}>
                    {yLabel}
                  </Text>
                ),
              )}
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chartHorizontalScrollContainer}
            >
              {chartType === "bar" ? (
                <BarChart
                  {...chartCommonConfig}
                  data={barData}
                  barWidth={scale(24)}
                  spacing={scale(16)}
                  roundedTop
                />
              ) : (
                <LineChart
                  {...chartCommonConfig}
                  data={lineData}
                  color={darkTheme.colors.accent}
                  thickness={3}
                  textFontSize={scale(9)}
                  textColor="#FFFFFF"
                  dataPointsColor="#FFFFFF"
                  dataPointsRadius={4}
                />
              )}
            </ScrollView>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.legendsHorizontalScrollTrack}
          >
            {LEGEND_DATA.map((legend, index) => (
              <View
                key={index}
                style={[
                  styles.legendPillItemNode,
                  {
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.legendStatusColorDot,
                    { backgroundColor: legend.color },
                  ]}
                />
                <Text
                  style={[
                    darkTheme.typography.bodyMuted,
                    styles.legendLabelNodeText,
                    { color: darkTheme.colors.textMain },
                  ]}
                >
                  {legend.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Text
          style={[
            darkTheme.typography.cardTitle,
            styles.sectionTitleOverviewText,
          ]}
        >
          Analytics Overview
        </Text>
        <Text
          style={[
            darkTheme.typography.bodyMuted,
            styles.sectionSubtitleOverviewText,
          ]}
        >
          Track performance insights across your salon
        </Text>

        <View style={styles.asymmetricBalancedGridRow}>
          {ANALYTICS_FEED.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.88}
              style={[
                styles.gridBalancedMetricBox,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.gridBoxIconMask,
                  { backgroundColor: "rgba(255, 149, 0, 0.06)" },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={scale(16)}
                  color={darkTheme.colors.accent}
                />
              </View>
              <Text
                style={[
                  darkTheme.typography.cardTitle,
                  styles.gridItemTitleText,
                  { color: darkTheme.colors.textMain },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  darkTheme.typography.bodyMuted,
                  styles.gridItemDescText,
                  { color: darkTheme.colors.textMuted },
                ]}
              >
                {item.desc}
              </Text>
              <View style={styles.topCornerArrowLink}>
                <Ionicons
                  name="arrow-forward-sharp"
                  size={scale(11)}
                  color={darkTheme.colors.accent}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Production Range Calendar Input Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={calendarVisible}
        onRequestClose={() => setCalendarVisible(false)}
      >
        <View style={styles.modalOverlayScrim}>
          <View
            style={[
              styles.calendarModalContent,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
              },
            ]}
          >
            <View style={styles.modalHeaderRow}>
              <View>
                <Text
                  style={[
                    darkTheme.typography.cardTitle,
                    { fontWeight: "700" },
                  ]}
                >
                  Custom Range Picker
                </Text>
                <Text
                  style={[
                    darkTheme.typography.bodyMuted,
                    { fontSize: scale(11), marginTop: verticalScale(2) },
                  ]}
                >
                  {currentMonthMoment.format("MMMM YYYY")}
                </Text>
              </View>
              <View style={styles.calendarPaginatorTrack}>
                <TouchableOpacity
                  onPress={handlePrevMonthToggle}
                  style={[
                    styles.arrowNavCircleButton,
                    { borderColor: darkTheme.colors.border },
                  ]}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-back"
                    size={scale(14)}
                    color={darkTheme.colors.textMain}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextMonthToggle}
                  style={[
                    styles.arrowNavCircleButton,
                    { borderColor: darkTheme.colors.border },
                  ]}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={scale(14)}
                    color={darkTheme.colors.textMain}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.selectionTrackPreviewBanner}>
              <Text style={styles.previewBannerText}>
                {formatBannerLabel(startDate)} — {formatBannerLabel(endDate)}
              </Text>
            </View>

            <View style={styles.calendarDaysGrid}>
              {calendarGridData.map((cell, idx) => {
                const isCurrent = cell.isCurrentMonth;
                const cellMoment = cell.momentObj;

                const isStart =
                  startDate && cellMoment.isSame(startDate, "day") && isCurrent;
                const isEnd =
                  endDate && cellMoment.isSame(endDate, "day") && isCurrent;
                const isInRange =
                  startDate &&
                  endDate &&
                  cellMoment.isBetween(startDate, endDate, "day") &&
                  isCurrent;
                const isSelected = isStart || isEnd;

                return (
                  <TouchableOpacity
                    key={`cell-${idx}`}
                    disabled={!isCurrent}
                    activeOpacity={0.6}
                    onPress={() => handleDayPress(cell)}
                    style={[
                      styles.dayGridCellNode,
                      !isCurrent && styles.greyedOutBufferCell,
                      isInRange && {
                        backgroundColor: "rgba(255, 149, 0, 0.12)",
                      },
                      isStart && styles.startDayCellBorderRadius,
                      isEnd && styles.endDayCellBorderRadius,
                      isSelected && {
                        backgroundColor: darkTheme.colors.accent,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.calendarCellDayNumberText,
                        {
                          color: !isCurrent
                            ? "rgba(255,255,255,0.2)"
                            : isSelected
                              ? "#000000"
                              : darkTheme.colors.textMain,
                        },
                        isSelected && { fontWeight: "700" },
                      ]}
                    >
                      {cell.dayNum}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={[
                styles.confirmSelectionActionButton,
                { backgroundColor: darkTheme.colors.accent },
              ]}
              activeOpacity={0.8}
              onPress={() => setCalendarVisible(false)}
            >
              <Text style={styles.confirmButtonTextLabel}>
                Apply Range Matrix
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChartsDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  premiumMinimalistStatusBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(14),
    width: "100%",
  },
  dateTextPillBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(12),
    height: scale(32),
    borderRadius: scale(16),
    borderWidth: 1,
  },
  statusBarDateText: {
    fontSize: scale(12),
    fontWeight: "600",
  },
  rightActionToolsSubgroup: {
    flexDirection: "row",
    gap: scale(6),
  },
  minimalistSquareTool: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(8),
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.01)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
  },
  chartContainerCard: {
    borderWidth: 1,
    borderRadius: scale(12),
    padding: scale(14),
    marginBottom: verticalScale(24),
  },
  segmentedPillTrack: {
    flexDirection: "row",
    borderRadius: scale(8),
    padding: scale(3),
    marginBottom: verticalScale(20),
  },
  segmentTabNode: {
    flex: 1,
    height: scale(26),
    borderRadius: scale(6),
    justifyContent: "center",
    alignItems: "center",
  },
  segmentNodeText: {
    fontSize: scale(11),
  },
  chartMasterLayoutFrame: {
    width: "100%",
    flexDirection: "row",
    marginBottom: verticalScale(14),
    height: verticalScale(195),
  },
  fixedYAxisLayoutColumn: {
    width: scale(44),
    height: verticalScale(158),
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: verticalScale(14),
    zIndex: 10,
  },
  fixedYAxisTextLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: scale(9),
    fontWeight: "500",
  },
  chartHorizontalScrollContainer: {
    paddingRight: scale(24),
  },
  chartTopValueText: {
    fontSize: scale(9),
    fontWeight: "700",
    color: "#FFFFFF",
    width: scale(32),
    textAlign: "center",
    marginBottom: verticalScale(50),
  },
  xAxisLabelStyle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: scale(9),
    width: scale(70),
    textAlign: "center",
    marginTop: verticalScale(6),
  },
  legendsHorizontalScrollTrack: {
    flexDirection: "row",
    gap: scale(8),
    paddingVertical: verticalScale(2),
  },
  legendPillItemNode: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(10),
    height: scale(26),
    borderRadius: scale(13),
    borderWidth: 1,
  },
  legendStatusColorDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    marginRight: scale(6),
  },
  legendLabelNodeText: {
    fontSize: scale(11),
    fontWeight: "500",
  },
  sectionTitleOverviewText: {
    fontSize: scale(14),
    fontWeight: "700",
    letterSpacing: -0.1,
  },
  sectionSubtitleOverviewText: {
    fontSize: scale(11),
    marginTop: verticalScale(2),
    marginBottom: verticalScale(16),
    opacity: 0.5,
  },
  asymmetricBalancedGridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: scale(12),
  },
  gridBalancedMetricBox: {
    width: "48.2%",
    borderWidth: 1,
    borderRadius: scale(14),
    padding: scale(14),
    position: "relative",
    height: scale(132),
  },
  gridBoxIconMask: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  gridItemTitleText: {
    fontSize: scale(12),
    fontWeight: "700",
    lineHeight: scale(15),
    marginBottom: verticalScale(3),
  },
  gridItemDescText: {
    fontSize: scale(10),
    lineHeight: scale(13),
    opacity: 0.4,
  },
  topCornerArrowLink: {
    position: "absolute",
    right: scale(14),
    top: scale(14),
    opacity: 0.5,
  },
  modalOverlayScrim: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  calendarModalContent: {
    width: "100%",
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    borderTopWidth: 1,
    padding: scale(20),
    paddingBottom: verticalScale(36),
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  calendarPaginatorTrack: {
    flexDirection: "row",
    gap: scale(6),
  },
  arrowNavCircleButton: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  selectionTrackPreviewBanner: {
    width: "100%",
    paddingVertical: verticalScale(10),
    backgroundColor: "rgba(255, 149, 0, 0.06)",
    borderRadius: scale(8),
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  previewBannerText: {
    color: darkTheme.colors.accent,
    fontSize: scale(13),
    fontWeight: "700",
  },
  calendarDaysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: scale(4),
    marginBottom: verticalScale(20),
  },
  dayGridCellNode: {
    width: `${100 / 7 - 1.2}%`,
    height: scale(34),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(2),
  },
  greyedOutBufferCell: {
    backgroundColor: "transparent",
  },
  startDayCellBorderRadius: {
    borderTopLeftRadius: scale(8),
    borderBottomLeftRadius: scale(8),
  },
  endDayCellBorderRadius: {
    borderTopRightRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },
  calendarCellDayNumberText: {
    fontSize: scale(12),
    fontWeight: "500",
  },
  confirmSelectionActionButton: {
    width: "100%",
    height: scale(44),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(4),
  },
  confirmButtonTextLabel: {
    color: "#000000",
    fontWeight: "700",
    fontSize: scale(13),
  },
});

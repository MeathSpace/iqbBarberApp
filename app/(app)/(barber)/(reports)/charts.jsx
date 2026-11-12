import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import BarberHeader from "../../../../components/Header/BarberHeader";
import RangeCalendarModal from "../../../../components/RangeCalender";
import { darkTheme } from "../../../../constants/appTheme";
import { useBarberAuth } from "../../../../context/barber/AuthContext";
import api from "../../../../utils/api";

const TIME_FILTERS = ["Daily", "Weekly", "Monthly"];

const ANALYTICS_FEED = [
  {
    id: "a1",
    reportType: "appointmentServed",
    title: "Appointments serve",
    desc: "General analytics overview of customer check-ins.",
    icon: "chart-box-outline",
  },
  {
    id: "a2",
    reportType: "appointmentCancelled",
    title: "Cancellations logs",
    desc: "Insight summary tracking real-time storefront no-shows.",
    icon: "alert-circle-outline",
  },
];

const ChartsDetailScreen = () => {
  const params = useLocalSearchParams();
  const { authenticatedUser } = useBarberAuth();

  const salonId = authenticatedUser?.salonId;
  const barberId = authenticatedUser?.barberId;

  const [currentReportType, setCurrentReportType] = useState(
    params?.reportType || "appointmentPerformance",
  );
  const [headerTitle, setHeaderTitle] = useState(
    params?.title || "Performance Dashboard",
  );
  const [headerSubTitle, setHeaderSubTitle] = useState(
    params?.description || "Appointment breakdown summary",
  );

  const [activeTimeFilter, setActiveTimeFilter] = useState("Daily");
  const [chartType, setChartType] = useState("bar");
  const [calendarVisible, setCalendarVisible] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [chartRawData, setChartRawData] = useState([]);
  const [lineRawData, setLineRawData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReportData = useCallback(async () => {
    if (!salonId || !barberId) return;

    try {
      setLoading(true);

      const basePayload = {
        salonId,
        barberId,
        reportType: currentReportType,
        ...(startDate && endDate
          ? {
              startDate: startDate.format("DD-MM-YYYY"),
              endDate: endDate.format("DD-MM-YYYY"),
            }
          : {
              reportValue: activeTimeFilter.toLowerCase(),
            }),
      };

      const [barRes, lineRes] = await Promise.allSettled([
        api.post("/reports/getBarberChartReport", basePayload),
        api.post("/reports/getBarberLineGraphReport", basePayload),
      ]);

      if (barRes.status === "fulfilled") {
        const arr = Array.isArray(barRes.value?.data?.response)
          ? barRes.value.data.response
          : [];
        setChartRawData(arr);
      } else {
        setChartRawData([]);
      }

      if (lineRes.status === "fulfilled") {
        const lineArr = Array.isArray(lineRes.value?.data?.response?.data)
          ? lineRes.value.data.response.data
          : Array.isArray(lineRes.value?.data?.response)
            ? lineRes.value.data.response
            : [];
        setLineRawData(lineArr);
      } else {
        setLineRawData([]);
      }
    } catch (error) {
      console.log("Error fetching barber chart report:", error);
    } finally {
      setLoading(false);
    }
  }, [salonId, barberId, currentReportType, activeTimeFilter, startDate, endDate]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  const barData = useMemo(() => {
    if (!chartRawData || chartRawData.length === 0) {
      return [
        {
          value: 0,
          label: "No Data",
          frontColor: darkTheme.colors.accent,
          topLabelComponent: () => (
            <Text style={styles.chartTopValueText}>0</Text>
          ),
        },
      ];
    }

    return chartRawData.map((item) => {
      const val = Number(item?.yaxis ?? 0);
      const displayVal =
        val >= 1000 ? `${(val / 1000).toFixed(1)}K` : String(val);
      return {
        value: val,
        label: item?.xaxis || "",
        frontColor: item?.fill || darkTheme.colors.accent,
        topLabelComponent: () => (
          <Text style={styles.chartTopValueText}>{displayVal}</Text>
        ),
      };
    });
  }, [chartRawData]);

  const lineData = useMemo(() => {
    if (lineRawData && lineRawData.length > 0) {
      return lineRawData.map((item) => {
        const val = Number(item?.[barberId] ?? item?.yaxis ?? 0);
        return {
          value: val,
          label: item?.xaxis || "",
          dataPointText:
            val >= 1000 ? `${(val / 1000).toFixed(1)}k` : String(val),
        };
      });
    }

    return barData.map((item) => ({
      value: item.value,
      label: item.label,
      dataPointText:
        item.value >= 1000
          ? `${(item.value / 1000).toFixed(1)}k`
          : String(item.value),
    }));
  }, [lineRawData, barData, barberId]);

  const maxChartValue = useMemo(() => {
    const values = [
      ...barData.map((d) => d.value),
      ...lineData.map((d) => d.value),
    ];
    const highest = Math.max(...values, 0);
    return highest > 0 ? Math.ceil(highest * 1.25) : 10;
  }, [barData, lineData]);

  const yAxisLabels = useMemo(() => {
    const step = maxChartValue / 4;
    return [4, 3, 2, 1, 0].map((mult) => {
      const v = Math.round(step * mult);
      return v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v);
    });
  }, [maxChartValue]);

  const chartCommonConfig = {
    noOfSections: 4,
    maxValue: maxChartValue,
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
    width: Math.max(scale(barData.length * 54 + 32), scale(240)),
  };

  const legendItems = [
    {
      name: authenticatedUser?.name || "Barber",
      color: chartRawData?.[0]?.fill || darkTheme.colors.accent,
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
        title={headerTitle}
        subTitle={headerSubTitle}
        showBack={true}
      />

      <View style={styles.premiumMinimalistStatusBar}>
        <TouchableOpacity
          style={[
            styles.dateTextPillBadge,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor:
                startDate && endDate
                  ? darkTheme.colors.accent
                  : darkTheme.colors.border,
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
            onPress={fetchReportData}
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
              const isSelected =
                !startDate && !endDate && activeTimeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  onPress={() => {
                    setStartDate(null);
                    setEndDate(null);
                    setActiveTimeFilter(filter);
                  }}
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

          {loading ? (
            <View
              style={[
                styles.chartMasterLayoutFrame,
                { justifyContent: "center", alignItems: "center" },
              ]}
            >
              <ActivityIndicator color={darkTheme.colors.accent} />
            </View>
          ) : (
            <View style={styles.chartMasterLayoutFrame}>
              <View style={styles.fixedYAxisLayoutColumn}>
                {yAxisLabels.map((yLabel, yIdx) => (
                  <Text key={yIdx} style={styles.fixedYAxisTextLabel}>
                    {yLabel}
                  </Text>
                ))}
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
                    spacing={scale(22)}
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
          )}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.legendsHorizontalScrollTrack}
          >
            {legendItems.map((legend, index) => (
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
          Track performance insights across your chair
        </Text>

        <View style={styles.asymmetricBalancedGridRow}>
          {ANALYTICS_FEED.map((item) => {
            const isActiveCard = currentReportType === item.reportType;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.88}
                onPress={() => {
                  setCurrentReportType(item.reportType);
                  setHeaderTitle(item.title);
                  setHeaderSubTitle(item.desc);
                }}
                style={[
                  styles.gridBalancedMetricBox,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: isActiveCard
                      ? darkTheme.colors.accent
                      : darkTheme.colors.border,
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
            );
          })}
        </View>
      </ScrollView>

      <RangeCalendarModal
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        startDate={startDate}
        endDate={endDate}
        onSelectRange={({ startDate: newStart, endDate: newEnd }) => {
          setStartDate(newStart);
          setEndDate(newEnd);
        }}
      />
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
    width: scale(36),
    textAlign: "center",
    marginBottom: verticalScale(6),
  },
  xAxisLabelStyle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: scale(9),
    width: scale(64),
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
});

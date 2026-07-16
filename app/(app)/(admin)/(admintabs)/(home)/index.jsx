// import {
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";
// import Header from "../../../../../components/Header/Header";
// import { darkTheme } from "../../../../../constants/appTheme";
// import {
//   BarberIcon,
//   CalendarIcon,
//   CrossCircleIcon,
//   DownIcon,
//   HistoryIcon,
//   HomeIcon,
//   ScissorIcon,
// } from "../../../../../constants/icons";

// const index = () => {
//   return (
//     <SafeAreaView
//       edges={["top", "right", "left"]}
//       style={[styles.container, {
//         backgroundColor: darkTheme.colors.background
//       }]}
//     >
//       <Header title={"Dashboard"} subTitle={"Manage your barbershop"} />
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}
//       >
//         <Text style={[darkTheme.typography.inputLabel, { color: darkTheme.colors.textMuted }]}>Salon</Text>
//         <TouchableOpacity
//           style={[styles.dropdown, { borderColor: darkTheme.colors.border }]}
//           activeOpacity={0.8}
//         >
//           <Text style={darkTheme.typography.dropdownText}>Baba-Z</Text>
//           <DownIcon
//             size={scale(20)}
//             color={darkTheme.colors.textMuted}
//           />
//         </TouchableOpacity>

//         <Text style={[darkTheme.typography.inputLabel, { color: darkTheme.colors.textMuted }]}>Date Range</Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.dateSelectorContainer}
//         >
//           <TouchableOpacity
//             style={[
//               styles.dateTab,
//               { backgroundColor: darkTheme.colors.accent },
//             ]}
//             activeOpacity={0.8}
//           >
//             <Text style={[darkTheme.typography.tabText, styles.dateTabTextActive]}>
//               Today
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.dateTab} activeOpacity={0.8}>
//             <Text style={darkTheme.typography.tabText}>This Week</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.dateTab} activeOpacity={0.8}>
//             <Text style={darkTheme.typography.tabText}>This Month</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.dateTab} activeOpacity={0.8}>
//             <Text style={darkTheme.typography.tabText}>This Year</Text>
//           </TouchableOpacity>
//         </ScrollView>

//         <View style={styles.gridContainer}>
//           <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
//             <View
//               style={[
//                 styles.iconWrapper,
//                 { backgroundColor: "rgba(255, 149, 0, 0.1)" },
//               ]}
//             >
//               <HomeIcon
//                 size={scale(18)}
//                 color={darkTheme.icons.queue}
//               />
//             </View>
//             <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Virtual Queue</Text>
//             <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>8</Text>
//           </View>

//           <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
//             <View
//               style={[
//                 styles.iconWrapper,
//                 { backgroundColor: "rgba(52, 199, 89, 0.1)" },
//               ]}
//             >
//               <CalendarIcon
//                 size={scale(18)}
//                 color={darkTheme.icons.appointments}
//               />
//             </View>
//             <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Appointments</Text>
//             <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>24</Text>
//           </View>

//           <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
//             <View
//               style={[
//                 styles.iconWrapper,
//                 { backgroundColor: "rgba(255, 59, 48, 0.1)" },
//               ]}
//             >
//               <CrossCircleIcon
//                 size={scale(18)}
//                 color={darkTheme.icons.cancellations}
//               />
//             </View>
//             <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Cancellations</Text>
//             <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>2</Text>
//           </View>

//           <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
//             <View
//               style={[
//                 styles.iconWrapper,
//                 { backgroundColor: "rgba(175, 82, 222, 0.1)" },
//               ]}
//             >
//               <ScissorIcon
//                 size={scale(18)}
//                 color={darkTheme.icons.barbers}
//               />
//             </View>
//             <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Barbers on Duty</Text>
//             <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>4</Text>
//           </View>

//           <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
//             <View
//               style={[
//                 styles.iconWrapper,
//                 { backgroundColor: "rgba(88, 86, 214, 0.1)" },
//               ]}
//             >
//               <HistoryIcon
//                 size={scale(18)}
//                 color={darkTheme.icons.wait}
//               />
//             </View>
//             <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Avg Wait Time</Text>
//             <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>15 min</Text>
//           </View>

//           <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
//             <View
//               style={[
//                 styles.iconWrapper,
//                 { backgroundColor: "rgba(52, 199, 89, 0.1)" },
//               ]}
//             >
//               <BarberIcon
//                 size={scale(18)}
//                 color={darkTheme.icons.revenue}
//               />
//             </View>
//             <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Revenue</Text>
//             <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>£850.00</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default index;

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = (width - scale(44)) / 2;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     paddingHorizontal: scale(16),
//     paddingBottom: verticalScale(24),
//   },
//   dropdown: {
//     backgroundColor: "#1A1A1A",
//     borderRadius: scale(8),
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: scale(14),
//     height: darkTheme.layout.componentHeight,
//     marginTop: verticalScale(6),
//     marginBottom: verticalScale(16),
//     borderWidth: 1,
//   },
//   dateSelectorContainer: {
//     flexDirection: "row",
//     marginTop: verticalScale(6),
//     marginBottom: verticalScale(20),
//   },
//   dateTab: {
//     paddingHorizontal: scale(14),
//     paddingVertical: verticalScale(6),
//     borderRadius: scale(20),
//     marginRight: scale(8),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   dateTabTextActive: {
//     color: "#000000",
//     fontWeight: "700",
//   },
//   gridContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   card: {
//     backgroundColor: "#1A1A1A",
//     width: CARD_WIDTH,
//     borderRadius: scale(12),
//     padding: scale(14),
//     marginBottom: verticalScale(12),
//     borderWidth: 1,
//   },
//   iconWrapper: {
//     width: scale(34),
//     height: scale(34),
//     borderRadius: scale(8),
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: verticalScale(12),
//   },
// });

import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Shimmer from "react-native-modern-shimmer";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";
import api from "../../../../../utils/api";

const Dashboard = () => {
  const { currentSalon } = useAdminGlobal();
  const { authenticatedUser } = useAdminAuth();

  // Input & Update Status States
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [salonDescription, setSalonDescription] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongDescription = salonDescription && salonDescription.length > 120;

  // Server data states
  const [barbersData, setBarberData] = useState({ loading: false, data: [] });
  const [queuelistData, setQueuelistData] = useState({
    loading: false,
    data: [],
  });
  const [reportData, setReportData] = useState({ loading: false, data: null });

  // Sync profile details when context loads
  useFocusEffect(
    useCallback(() => {
      if (currentSalon?.data?.salonInfo) {
        setSalonDescription(currentSalon.data.salonInfo);
      }
    }, [currentSalon?.data?.salonInfo]),
  );

  // Consolidated parallel API initiator
  const fetchDashboardData = useCallback(async () => {
    const salonId = authenticatedUser?.salonId;
    if (!salonId) return;

    setBarberData((prev) => ({ ...prev, loading: true }));
    setQueuelistData((prev) => ({ ...prev, loading: true }));
    setReportData((prev) => ({ ...prev, loading: true }));

    try {
      const [barbersRes, queueRes, reportRes] = await Promise.all([
        api.get(`/admin/getAllBarbersForDashboard?salonId=${salonId}`),
        api.get(`/queue/getQListBySalonId?salonId=${salonId}`),
        api.post(`reports/getnewdashboardReports`, { salonId }),
      ]);

      setBarberData({
        loading: false,
        data: barbersRes.data?.getAllBarbers || [],
      });
      setQueuelistData({ loading: false, data: queueRes.data?.response || [] });

      // FIX: Capture the nested "response" sub-object directly into state
      setReportData({ loading: false, data: reportRes.data?.response || null });
    } catch (error) {
      console.error("Dashboard data aggregation error:", error);
      setBarberData((prev) => ({ ...prev, loading: false }));
      setQueuelistData((prev) => ({ ...prev, loading: false }));
      setReportData((prev) => ({ ...prev, loading: false }));
    }
  }, [authenticatedUser?.salonId]);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        fetchDashboardData();
      }
      return () => {
        isMounted = false;
      };
    }, [fetchDashboardData]),
  );

  // Dummy API handler to update the Salon Profile text
  const handleSaveSalonProfile = async () => {
    if (isEditingInfo) {
      try {
        setIsSavingProfile(true);

        const payload = {
          salonId: authenticatedUser?.salonId,
          salonInfo: salonDescription,
        };

        await api.post(`/salon/updateSalonInfo`, payload);
  
      } catch (error) {
        console.error("Failed to update salon profile text:", error);
      } finally {
        setIsSavingProfile(false);
        setIsEditingInfo(false);
      }
    } else {
      setIsEditingInfo(true);
    }
  };

  // Extract nested properties cleanly
  const queueReport = reportData?.data?.queue;
  const appointmentReport = reportData?.data?.appointment;
  const nextUpClient = queuelistData.data?.[0];

  // Map backend last7daysCount array elements to the Bar Chart configuration keys
  const rawChartData = appointmentReport?.last7daysCount || [];

  const appointmentChartData = rawChartData.map((item) => ({
    value: item.TotalAppoinment,
    label: item.date,
    frontColor: darkTheme.colors.accent,
    topLabelComponent: () => (
      <Text style={styles.chartTopLabel}>{item.TotalAppoinment}</Text>
    ),
  }));

  // Auto-scale the max height bounds dynamically depending on absolute backend parameters
  const maxChartValue = Math.max(
    ...rawChartData.map((d) => d.TotalAppoinment),
    3,
  );

  // Dynamic Trend Indicator styling based on backend return strings
  const isTrendFall = queueReport?.queueTrend === "Fall";

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header
        title="Dashboard"
        subTitle="Salon Administration Ecosystem"
        showBack={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* 1. Immersive Salon Info Section */}
        <View style={styles.editorialHeaderBlock}>
          <View style={styles.editorialRow}>
            <Text
              style={[
                styles.editorialTitle,
                { color: darkTheme.colors.textMain },
              ]}
            >
              The Salon Profile
            </Text>
            <TouchableOpacity
              style={[
                styles.minimalEditTrigger,
                isEditingInfo && { backgroundColor: "rgba(255, 149, 0, 0.1)" },
              ]}
              onPress={handleSaveSalonProfile}
              disabled={isSavingProfile}
              activeOpacity={0.7}
            >
              <Feather
                name={
                  isSavingProfile
                    ? "loader"
                    : isEditingInfo
                      ? "check-circle"
                      : "edit-2"
                }
                size={scale(13)}
                color={
                  isEditingInfo
                    ? darkTheme.colors.accent
                    : darkTheme.colors.textMuted
                }
              />
              <Text
                style={[
                  styles.minimalEditText,
                  {
                    color: isEditingInfo
                      ? darkTheme.colors.accent
                      : darkTheme.colors.textMuted,
                  },
                ]}
              >
                {isSavingProfile
                  ? "Saving..."
                  : isEditingInfo
                    ? "Save Changes"
                    : "Edit Details"}
              </Text>
            </TouchableOpacity>
          </View>

          {isEditingInfo ? (
            <TextInput
              style={[
                styles.premiumInlineInput,
                { color: darkTheme.colors.textMain },
              ]}
              value={salonDescription}
              onChangeText={setSalonDescription}
              multiline
              autoFocus
              editable={!isSavingProfile}
            />
          ) : currentSalon?.loading ? (
            <View style={{ gap: 8 }}>
              {[...Array(4)].map((_, i) => (
                <Shimmer key={i} width="100%" height={16} isDark />
              ))}
            </View>
          ) : (
            <View>
              <Text
                style={[
                  styles.editorialParagraph,
                  { color: darkTheme.colors.textMuted },
                ]}
                numberOfLines={isExpanded ? undefined : 3}
              >
                {salonDescription || "No profile description configured."}
              </Text>

              {isLongDescription && (
                <TouchableOpacity
                  onPress={() => setIsExpanded(!isExpanded)}
                  activeOpacity={0.6}
                  style={styles.seeMoreToggleContainer}
                >
                  <Text
                    style={[
                      styles.seeMoreText,
                      { color: darkTheme.colors.accent },
                    ]}
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* 2. Compact Performance Quick-Metrics Split Row */}
        <View style={styles.splitGridRow}>
          {reportData.loading ? (
            <>
              <Shimmer
                isDark
                style={{
                  flex: 1,
                  padding: scale(12),
                  minHeight: verticalScale(70),
                }}
              />
              <Shimmer
                isDark
                style={{
                  flex: 1,
                  padding: scale(12),
                  minHeight: verticalScale(70),
                }}
              />
            </>
          ) : (
            <>
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
                    name={isTrendFall ? "trending-down" : "trending-up"}
                    size={scale(14)}
                    color={isTrendFall ? "#FF3B30" : "#34C759"}
                  />
                </View>
                <Text style={styles.massiveMetricText}>
                  {queueReport?.percentageChangelast30Days || 0}%
                </Text>
                <View style={styles.miniProgressTrack}>
                  <View
                    style={[
                      styles.miniProgressFill,
                      {
                        width: `${queueReport?.servedHistoryPercentage || 0}%`,
                        backgroundColor: "#34C759",
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.miniProgressFill,
                      {
                        width: `${queueReport?.cancelledHistoryPercentage || 0}%`,
                        backgroundColor: "#FF3B30",
                      },
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
                <Text style={styles.metricContextHint}>
                  Active floor roster
                </Text>
              </View>
            </>
          )}
        </View>

        {/* 3. Live Queue Card */}
        {queuelistData.loading ? (
          <Shimmer width="100%" height={100} isDark />
        ) : (
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
                  {nextUpClient
                    ? nextUpClient.customerName
                    : "No active live clients"}
                </Text>
                {nextUpClient && (
                  <Text
                    style={[
                      darkTheme.typography.bodyMuted,
                      styles.spotlightStylistSub,
                    ]}
                  >
                    Assigned: {nextUpClient.barberName}
                  </Text>
                )}
              </View>
              <View style={styles.timeAlignmentColumn}>
                <Text style={styles.timeValueText}>--</Text>
                <Text style={styles.timeLabelText}>EST. MINS</Text>
              </View>
            </View>
          </View>
        )}

        {/* 4. Barbers Horizontal Deck */}
        <View style={styles.sectionHeaderSpacing}>
          <Text
            style={[
              darkTheme.typography.cardTitle,
              styles.sectionTitleLabel,
              { color: darkTheme.colors.textMain },
            ]}
          >
            Barbers On Duty
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cleanHorizontalRosterTrack}
          >
            {barbersData.loading ? (
              <View style={{ flexDirection: "row", gap: scale(10) }}>
                {[...Array(5)].map((_, i) => (
                  <Shimmer
                    key={i}
                    width={scale(46)}
                    height={scale(46)}
                    borderRadius={scale(23)}
                    isDark
                  />
                ))}
              </View>
            ) : barbersData.data.length > 0 ? (
              barbersData.data.map((staff) => (
                <View key={staff._id} style={styles.minimalRosterNode}>
                  <View
                    style={[
                      styles.rosterRingFrame,
                      { backgroundColor: darkTheme.colors.card },
                    ]}
                  >
                    {staff?.profile?.[0]?.url ? (
                      <Image
                        source={staff.profile[0].url}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: scale(26),
                        }}
                        contentFit="cover"
                        transition={300}
                      />
                    ) : (
                      <Text style={styles.fallbackInitialText}>
                        {staff.initial || staff.name?.[0]}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.minimalStaffLabel,
                      { color: darkTheme.colors.textMain },
                    ]}
                    numberOfLines={1}
                  >
                    {staff.name}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={{ color: darkTheme.colors.textMuted }}>
                No active staff available
              </Text>
            )}
          </ScrollView>
        </View>

        {/* 5. Analytics Overview Container */}
        {reportData.loading ? (
          <Shimmer width="100%" height={230} isDark />
        ) : appointmentChartData.length > 0 ? (
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
                {appointmentReport?.dateFormat || "Last 7 days"}
              </Text>
            </View>

            <View style={styles.chartWrapperAlignmentFrame}>
              <BarChart
                data={appointmentChartData}
                barWidth={scale(24)}
                spacing={scale(16)}
                roundedTop
                noOfSections={4}
                maxValue={maxChartValue}
                isAnimated
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor="rgba(255,255,255,0.08)"
                yAxisTextStyle={styles.chartAxisLabelTextStyle}
                xAxisLabelTextStyle={styles.chartAxisLabelTextStyle}
                rulesType="solid"
                rulesColor="rgba(255,255,255,0.03)"
                height={verticalScale(130)}
              />
            </View>
          </View>
        ) : (
          <Text
            style={{
              alignSelf: "center",
              color: darkTheme.colors.textMuted,
              marginVertical: 20,
            }}
          >
            No report metrics collected.
          </Text>
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
    // paddingTop: verticalScale(16),
    paddingBottom: verticalScale(32),
    gap: verticalScale(20),
  },
  premiumCard: {
    borderWidth: 1,
    borderRadius: scale(16),
    padding: scale(16),
  },
  editorialHeaderBlock: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(2),
  },
  editorialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  editorialTitle: {
    fontSize: scale(18),
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  minimalEditTrigger: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(6),
  },
  minimalEditText: {
    fontSize: scale(11),
    fontWeight: "600",
  },
  editorialParagraph: {
    fontSize: scale(12.5),
    lineHeight: scale(19),
    opacity: 0.7,
    letterSpacing: -0.1,
  },
  premiumInlineInput: {
    fontSize: scale(12.5),
    lineHeight: scale(19),
    letterSpacing: -0.1,
    borderWidth: 1,
    borderRadius: scale(10),
    padding: scale(12),
    backgroundColor: "rgba(0,0,0,0.25)",
    borderColor: "rgba(255, 255, 255, 0.12)",
    textAlignVertical: "top",
    minHeight: verticalScale(70),
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
  sectionHeaderSpacing: {
    gap: verticalScale(12),
  },
  sectionTitleLabel: {
    fontSize: scale(14),
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  cleanHorizontalRosterTrack: {
    flexDirection: "row",
    gap: scale(12),
    paddingVertical: verticalScale(2),
  },
  minimalRosterNode: {
    alignItems: "center",
    gap: verticalScale(6),
  },
  rosterRingFrame: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  fallbackInitialText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
  },
  absoluteStatusDot: {
    position: "absolute",
    right: scale(1),
    bottom: scale(1),
    width: scale(9),
    height: scale(9),
    borderRadius: scale(4.5),
    backgroundColor: "#34C759",
    borderWidth: 1.5,
    borderColor: "#1C1C1E",
  },
  minimalStaffLabel: {
    fontSize: scale(10.5),
    fontWeight: "500",
    opacity: 0.8,
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

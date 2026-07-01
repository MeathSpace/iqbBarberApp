import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import {
  BarberIcon,
  CalendarIcon,
  CrossCircleIcon,
  DownIcon,
  HistoryIcon,
  HomeIcon,
  ScissorIcon,
} from "../../../../../constants/icons";

const index = () => {
  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { 
        backgroundColor: darkTheme.colors.background 
      }]}
    >
      <Header title={"Dashboard"} subTitle={"Manage your barbershop"} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[darkTheme.typography.inputLabel, { color: darkTheme.colors.textMuted }]}>Salon</Text>
        <TouchableOpacity
          style={[styles.dropdown, { borderColor: darkTheme.colors.border }]}
          activeOpacity={0.8}
        >
          <Text style={darkTheme.typography.dropdownText}>Baba-Z</Text>
          <DownIcon
            size={scale(20)}
            color={darkTheme.colors.textMuted}
          />
        </TouchableOpacity>

        <Text style={[darkTheme.typography.inputLabel, { color: darkTheme.colors.textMuted }]}>Date Range</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateSelectorContainer}
        >
          <TouchableOpacity
            style={[
              styles.dateTab,
              { backgroundColor: darkTheme.colors.accent },
            ]}
            activeOpacity={0.8}
          >
            <Text style={[darkTheme.typography.tabText, styles.dateTabTextActive]}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateTab} activeOpacity={0.8}>
            <Text style={darkTheme.typography.tabText}>This Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateTab} activeOpacity={0.8}>
            <Text style={darkTheme.typography.tabText}>This Month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateTab} activeOpacity={0.8}>
            <Text style={darkTheme.typography.tabText}>This Year</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.gridContainer}>
          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(255, 149, 0, 0.1)" },
              ]}
            >
              <HomeIcon
                size={scale(18)}
                color={darkTheme.icons.queue}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Virtual Queue</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>8</Text>
          </View>

          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(52, 199, 89, 0.1)" },
              ]}
            >
              <CalendarIcon
                size={scale(18)}
                color={darkTheme.icons.appointments}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Appointments</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>24</Text>
          </View>

          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(255, 59, 48, 0.1)" },
              ]}
            >
              <CrossCircleIcon
                size={scale(18)}
                color={darkTheme.icons.cancellations}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Cancellations</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>2</Text>
          </View>

          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(175, 82, 222, 0.1)" },
              ]}
            >
              <ScissorIcon
                size={scale(18)}
                color={darkTheme.icons.barbers}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Barbers on Duty</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>4</Text>
          </View>

          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(88, 86, 214, 0.1)" },
              ]}
            >
              <HistoryIcon
                size={scale(18)}
                color={darkTheme.icons.wait}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Avg Wait Time</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>15 min</Text>
          </View>

          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(52, 199, 89, 0.1)" },
              ]}
            >
              <BarberIcon
                size={scale(18)}
                color={darkTheme.icons.revenue}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Revenue</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>£850.00</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - scale(44)) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(24),
  },
  dropdown: {
    backgroundColor: "#1A1A1A",
    borderRadius: scale(8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(14),
    height: darkTheme.layout.componentHeight,
    marginTop: verticalScale(6),
    marginBottom: verticalScale(16),
    borderWidth: 1,
  },
  dateSelectorContainer: {
    flexDirection: "row",
    marginTop: verticalScale(6),
    marginBottom: verticalScale(20),
  },
  dateTab: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
    marginRight: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  dateTabTextActive: {
    color: "#000000",
    fontWeight: "700",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1A1A1A",
    width: CARD_WIDTH,
    borderRadius: scale(12),
    padding: scale(14),
    marginBottom: verticalScale(12),
    borderWidth: 1,
  },
  iconWrapper: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
});


// import React from "react";
// import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";
// import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
// // Native interactive charting engine components
// import { BarChart } from "react-native-gifted-charts";

// import Header from "../../../../../components/Header/Header"; // Adjust path as needed
// import { darkTheme } from "../../../../../constants/appTheme";

// const STAFF_ROSTER = [
//   { id: "s1", name: "Jazz", hasAvatar: true },
//   { id: "s2", name: "Hercules", hasAvatar: true },
//   { id: "s3", name: "New barber", hasAvatar: false, initial: "N" },
//   { id: "s4", name: "Buch", hasAvatar: false, initial: "B" },
//   { id: "s5", name: "Jum", hasAvatar: false, initial: "J" },
// ];

// const MainAdminDashboard = () => {
//   // Configured high-fidelity active metrics chart data parameters
//   const appointmentChartData = [
//     { value: 1, label: "Total", frontColor: darkTheme.colors.accent, topLabelComponent: () => <Text style={styles.chartTopLabel}>1</Text> },
//     { value: 1, label: "Served", frontColor: "#34C759", topLabelComponent: () => <Text style={styles.chartTopLabel}>1</Text> },
//     { value: 0, label: "Canceled", frontColor: "#FF3B30", topLabelComponent: () => <Text style={styles.chartTopLabel}>0</Text> },
//   ];

//   return (
//     <SafeAreaView
//       edges={["top", "right", "left"]}
//       style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
//     >
//       <Header title="IQB" subTitle="Salon Administration Ecosystem" showBack={false} />

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
//         {/* 1. Re-engineered Salon Info Presentation Banner Block */}
//         <View style={[styles.salonInfoCardWrapper, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
//           <View style={styles.cardHeaderActionRow}>
//             <View style={styles.salonTitleLeftGroup}>
//               <View style={[styles.titleIconBox, { backgroundColor: "rgba(255, 149, 0, 0.1)" }]}>
//                 <MaterialCommunityIcons name="storefront-outline" size={scale(14)} color={darkTheme.colors.accent} />
//               </View>
//               <Text style={[darkTheme.typography.cardTitle, styles.sectionTitleLabel, { color: darkTheme.colors.textMain }]}>
//                 Salon Info
//               </Text>
//             </View>
//             <TouchableOpacity style={[styles.miniSquareEditTool, { borderColor: darkTheme.colors.border }]} activeOpacity={0.7}>
//               <Feather name="edit-3" size={scale(12)} color={darkTheme.colors.textMain} />
//             </TouchableOpacity>
//           </View>
          
//           <View style={[styles.editorialQuoteContainer, { backgroundColor: "rgba(255,255,255,0.02)" }]}>
//             <Text style={[darkTheme.typography.bodyMuted, styles.salonDescriptionParagraph, { color: darkTheme.colors.textMuted }]}>
//               Welcome to our salon — a space designed for comfort, style, and confidence. We believe every visit should feel relaxing, personal, and rewarding. Our experienced barbers and stylists are dedicated to understanding your preferences...
//             </Text>
//           </View>
//         </View>

//         {/* 2. Live Queue Spotlight Module */}
//         <View style={[styles.dashboardCard, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
//           <View style={styles.cardHeaderActionRow}>
//             <View>
//               <Text style={[darkTheme.typography.cardTitle, styles.sectionTitleLabel, { color: darkTheme.colors.textMain }]}>
//                 Queue List
//               </Text>
//               <Text style={[darkTheme.typography.bodyMuted, styles.cardSubtitleLabel]}>
//                 Current active backlog status
//               </Text>
//             </View>
//             <View style={[styles.statusBadgePill, { backgroundColor: "rgba(255, 149, 0, 0.1)" }]}>
//               <Text style={[styles.statusBadgeText, { color: darkTheme.colors.accent }]}>1 Active</Text>
//             </View>
//           </View>

//           <TouchableOpacity style={[styles.queueActionStripNode, { backgroundColor: "rgba(255,255,255,0.01)", borderColor: darkTheme.colors.border }]} activeOpacity={0.85}>
//             <View style={styles.queueStripLeftGroup}>
//               <View style={[styles.circularAvatarPlaceholder, { backgroundColor: "#2C2C2E" }]}>
//                 <Ionicons name="person" size={scale(14)} color={darkTheme.colors.textMuted} />
//               </View>
//               <View>
//                 <Text style={[darkTheme.typography.bodyMain, styles.clientNameHeading, { color: darkTheme.colors.textMain }]}>
//                   Shyam sharma
//                 </Text>
//                 <Text style={[darkTheme.typography.bodyMuted, styles.stylistAssignmentSub, { color: darkTheme.colors.textMuted }]}>
//                   Stylist: John Doe
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.queueStripRightGroup}>
//               <Text style={styles.nextIndicatorText}>Next</Text>
//               <Text style={[darkTheme.typography.bodyMuted, styles.estMinutesText]}>Est. Time: -- mins</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* 3. New Live Appointments Interactive Graph Module Component */}
//         <View style={[styles.dashboardCard, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
//           <Text style={[darkTheme.typography.cardTitle, styles.sectionTitleLabel, { color: darkTheme.colors.textMain }]}>
//             Appointments Overview
//           </Text>
//           <Text style={[darkTheme.typography.bodyMuted, styles.cardSubtitleLabel, { marginBottom: verticalScale(16) }]}>
//             Last 7 days dynamic snapshot activity logs
//           </Text>

//           <View style={styles.chartWrapperAlignmentFrame}>
//             <BarChart
//               data={appointmentChartData}
//               barWidth={scale(32)}
//               spacing={scale(24)}
//               roundedTop
//               noOfSections={3}
//               maxValue={3}
//               isAnimated
//               animationDuration={500}
//               yAxisThickness={0}
//               xAxisThickness={1}
//               xAxisColor="rgba(255,255,255,0.1)"
//               yAxisTextStyle={styles.chartAxisLabelTextStyle}
//               xAxisLabelTextStyle={styles.chartAxisLabelTextStyle}
//               rulesType="dashed"
//               rulesColor="rgba(255,255,255,0.05)"
//               hideRules={false}
//               height={verticalScale(100)}
//             />
//           </View>
//         </View>

//         {/* 4. Barbers On Duty Roster Sub-row */}
//         <View style={[styles.dashboardCard, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
//           <View style={styles.cardHeaderActionRow}>
//             <View>
//               <Text style={[darkTheme.typography.cardTitle, styles.sectionTitleLabel, { color: darkTheme.colors.textMain }]}>
//                 Barbers On Duty
//               </Text>
//               <Text style={[darkTheme.typography.bodyMuted, styles.cardSubtitleLabel]}>
//                 Active floor staff management
//               </Text>
//             </View>
//             <Text style={[darkTheme.typography.bodyMuted, styles.rosterCounterPillText]}>7 Total Available</Text>
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rosterHorizontalScrollTrack}>
//             {STAFF_ROSTER.map((staff) => (
//               <View key={staff.id} style={styles.rosterAvatarWrapperNode}>
//                 <View style={[styles.rosterCircularAvatarFrame, { backgroundColor: "#2C2C2E", borderColor: darkTheme.colors.border }]}>
//                   {staff.hasAvatar ? (
//                     <MaterialCommunityIcons name="account-tie" size={scale(16)} color={darkTheme.colors.accent} />
//                   ) : (
//                     <Text style={styles.rosterFallbackInitialText}>{staff.initial}</Text>
//                   )}
//                   <View style={styles.onlineStatusIndicatorDot} />
//                 </View>
//                 <Text style={[darkTheme.typography.bodyMuted, styles.staffNameLabel, { color: darkTheme.colors.textMain }]} numberOfLines={1}>
//                   {staff.name}
//                 </Text>
//               </View>
//             ))}
//           </ScrollView>
//         </View>

//         {/* 5. Queue Performance Diagnostics Section */}
//         <View style={[styles.dashboardCard, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
//           <Text style={[darkTheme.typography.cardTitle, styles.sectionTitleLabel, { color: darkTheme.colors.textMain }]}>
//             Queue Performance History
//           </Text>
//           <View style={styles.queuePerformanceMetricsHeaderRow}>
//             <Text style={[darkTheme.typography.bodyMuted, styles.cardSubtitleLabel]}>Last 30 days efficiency log</Text>
//             <Text style={styles.performanceLossPercentageValueText}>-97.67% delta conversion</Text>
//           </View>

//           <View style={styles.premiumDualProgressBarTrack}>
//             <View style={[styles.progressBarSectionFill, { width: "50%", backgroundColor: "#34C759" }]} />
//             <View style={[styles.progressBarSectionFill, { width: "50%", backgroundColor: "#FF3B30" }]} />
//           </View>

//           <View style={styles.progressDataLegendsMetricsDeckRow}>
//             <View style={styles.legendMetricsLabelItem}>
//               <View style={[styles.legendIndicatorColorSquareDot, { backgroundColor: "#34C759" }]} />
//               <Text style={[darkTheme.typography.bodyMuted, styles.legendReportText]}>50% Served volume (2)</Text>
//             </View>
            
//             <View style={styles.legendMetricsLabelItem}>
//               <View style={[styles.legendIndicatorColorSquareDot, { backgroundColor: "#FF3B30" }]} />
//               <Text style={[darkTheme.typography.bodyMuted, styles.legendReportText]}>50% Canceled records (2)</Text>
//             </View>
//           </View>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default MainAdminDashboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     paddingHorizontal: scale(16),
//     paddingTop: verticalScale(12),
//     paddingBottom: verticalScale(32),
//     gap: verticalScale(14),
//   },
//   dashboardCard: {
//     borderWidth: 1,
//     borderRadius: scale(12),
//     padding: scale(14),
//   },
//   salonInfoCardWrapper: {
//     borderWidth: 1,
//     borderRadius: scale(12),
//     padding: scale(14),
//   },
//   salonTitleLeftGroup: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(8),
//   },
//   titleIconBox: {
//     width: scale(26),
//     height: scale(26),
//     borderRadius: scale(6),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   editorialQuoteContainer: {
//     borderRadius: scale(8),
//     padding: scale(12),
//     marginTop: verticalScale(2),
//   },
//   cardHeaderActionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: verticalScale(12),
//     width: "100%",
//   },
//   sectionTitleLabel: {
//     fontSize: scale(14),
//     fontWeight: "700",
//     letterSpacing: -0.1,
//   },
//   cardSubtitleLabel: {
//     fontSize: scale(11),
//     marginTop: verticalScale(1),
//     opacity: 0.5,
//   },
//   miniSquareEditTool: {
//     width: scale(26),
//     height: scale(26),
//     borderWidth: 1,
//     borderRadius: scale(6),
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.02)",
//   },
//   salonDescriptionParagraph: {
//     fontSize: scale(11.5),
//     lineHeight: scale(17),
//     opacity: 0.7,
//   },
//   statusBadgePill: {
//     paddingHorizontal: scale(8),
//     height: scale(22),
//     borderRadius: scale(6),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   statusBadgeText: {
//     fontSize: scale(10),
//     fontWeight: "700",
//   },
//   queueActionStripNode: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderWidth: 1,
//     borderRadius: scale(10),
//     padding: scale(10),
//     marginTop: verticalScale(2),
//     width: "100%",
//   },
//   queueStripLeftGroup: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(10),
//   },
//   circularAvatarPlaceholder: {
//     width: scale(34),
//     height: scale(34),
//     borderRadius: scale(17),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   clientNameHeading: {
//     fontSize: scale(13),
//     fontWeight: "600",
//   },
//   stylistAssignmentSub: {
//     fontSize: scale(11),
//     opacity: 0.5,
//     marginTop: verticalScale(1),
//   },
//   queueStripRightGroup: {
//     alignItems: "flex-end",
//     gap: verticalScale(2),
//   },
//   nextIndicatorText: {
//     fontSize: scale(13),
//     fontWeight: "700",
//     color: "#34C759",
//   },
//   estMinutesText: {
//     fontSize: scale(9),
//     opacity: 0.4,
//   },
//   chartWrapperAlignmentFrame: {
//     width: "100%",
//     paddingTop: verticalScale(8),
//     alignItems: "center",
//   },
//   chartTopLabel: {
//     color: "#FFFFFF",
//     fontSize: scale(9),
//     fontWeight: "600",
//     marginBottom: verticalScale(4),
//   },
//   chartAxisLabelTextStyle: {
//     color: "rgba(255,255,255,0.4)",
//     fontSize: scale(9),
//   },
//   rosterCounterPillText: {
//     fontSize: scale(11),
//     opacity: 0.4,
//   },
//   rosterHorizontalScrollTrack: {
//     flexDirection: "row",
//     gap: scale(14),
//     paddingVertical: verticalScale(4),
//   },
//   rosterAvatarWrapperNode: {
//     alignItems: "center",
//     width: scale(54),
//   },
//   rosterCircularAvatarFrame: {
//     width: scale(44),
//     height: scale(44),
//     borderRadius: scale(22),
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//   },
//   rosterFallbackInitialText: {
//     fontSize: scale(14),
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },
//   onlineStatusIndicatorDot: {
//     position: "absolute",
//     right: scale(1),
//     bottom: scale(1),
//     width: scale(9),
//     height: scale(9),
//     borderRadius: scale(4.5),
//     backgroundColor: "#34C759",
//     borderWidth: 1.5,
//     borderColor: "#1C1C1E",
//   },
//   staffNameLabel: {
//     fontSize: scale(10),
//     fontWeight: "500",
//     marginTop: verticalScale(6),
//     textAlign: "center",
//     width: "100%",
//   },
//   queuePerformanceMetricsHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: verticalScale(14),
//     width: "100%",
//   },
//   performanceLossPercentageValueText: {
//     fontSize: scale(11),
//     fontWeight: "600",
//     color: "#FF3B30",
//   },
//   premiumDualProgressBarTrack: {
//     width: "100%",
//     height: scale(8),
//     borderRadius: scale(4),
//     overflow: "hidden",
//     flexDirection: "row",
//     backgroundColor: "rgba(255,255,255,0.05)",
//     marginBottom: verticalScale(14),
//   },
//   progressBarSectionFill: {
//     height: "100%",
//   },
//   progressDataLegendsMetricsDeckRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   legendMetricsLabelItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(6),
//   },
//   legendIndicatorColorSquareDot: {
//     width: scale(8),
//     height: scale(8),
//     borderRadius: scale(2),
//   },
//   legendReportText: {
//     fontSize: scale(11),
//     fontWeight: "500",
//   },
// });
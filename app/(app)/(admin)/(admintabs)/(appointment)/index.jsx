// import React, { useState, useMemo } from "react";
// import { FlatList, Platform, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";
// import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// import Header from "../../../../../components/Header/Header";
// import { darkTheme } from "../../../../../constants/appTheme";

// // Comprehensive 14-Day Dataset Matrix
// const DATA_TIMELINE = [
//   { id: "d1", dayName: "Mo", dayNum: "29", monthLabel: "June 2026", dateStr: "Jun 29, Monday", weekIndex: 0 },
//   { id: "d2", dayName: "Tu", dayNum: "30", monthLabel: "June 2026", dateStr: "Jun 30, Tuesday", weekIndex: 0 },
//   { id: "d3", dayName: "We", dayNum: "01", monthLabel: "July 2026", dateStr: "Jul 01, Wednesday", weekIndex: 0 },
//   { id: "d4", dayName: "Th", dayNum: "02", monthLabel: "July 2026", dateStr: "Jul 02, Thursday", weekIndex: 0 },
//   { id: "d5", dayName: "Fr", dayNum: "03", monthLabel: "July 2026", dateStr: "Jul 03, Friday", weekIndex: 0 },
//   { id: "d6", dayName: "Sa", dayNum: "04", monthLabel: "July 2026", dateStr: "Jul 04, Saturday", weekIndex: 0 },
//   { id: "d7", dayName: "Su", dayNum: "05", monthLabel: "July 2026", dateStr: "Jul 05, Sunday", weekIndex: 0 },
//   { id: "d8", dayName: "Mo", dayNum: "06", monthLabel: "July 2026", dateStr: "Jul 06, Monday", weekIndex: 1 },
//   { id: "d9", dayName: "Tu", dayNum: "07", monthLabel: "July 2026", dateStr: "Jul 07, Tuesday", weekIndex: 1 },
//   { id: "d10", dayName: "We", dayNum: "08", monthLabel: "July 2026", dateStr: "Jul 08, Wednesday", weekIndex: 1 },
//   { id: "d11", dayName: "Th", dayNum: "09", monthLabel: "July 2026", dateStr: "Jul 09, Thursday", weekIndex: 1 },
//   { id: "d12", dayName: "Fr", dayNum: "10", monthLabel: "July 2026", dateStr: "Jul 10, Friday", weekIndex: 1 },
//   { id: "d13", dayName: "Sa", dayNum: "11", monthLabel: "July 2026", dateStr: "Jul 11, Saturday", weekIndex: 1 },
//   { id: "d14", dayName: "Su", dayNum: "12", monthLabel: "July 2026", dateStr: "Jul 12, Sunday", weekIndex: 1 },
// ];

// const APPOINTMENT_DATA = [
//   { id: "1", targetDateId: "d1", clientName: "Arghya 12", email: "arghya@yopmail.com", stylist: "John Doe", timeSlot: "15:20 - 15:40", service: "Haircut", price: "₹ 100", phone: "+916291059885" },
//   { id: "2", targetDateId: "d1", clientName: "Shyam Sharma", email: "shyam@yopmail.com", stylist: "Bob", timeSlot: "16:00 - 16:30", service: "Massage", price: "₹ 345", phone: "+919876543210" },
// ];

// const AppointmentsDashboard = () => {
//   const [currentWeek, setCurrentWeek] = useState(0);
//   const [selectedDay, setSelectedDay] = useState(DATA_TIMELINE[0]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filters timeline segments by sliding window week index
//   const visibleDays = useMemo(() => {
//     return DATA_TIMELINE.filter(day => day.weekIndex === currentWeek);
//   }, [currentWeek]);

//   // Interactive Chevron State Shifter Actions
//   const handleNextWeek = () => {
//     if (currentWeek < 1) {
//       setCurrentWeek(prev => prev + 1);
//       const nextWeekMatch = DATA_TIMELINE.find(day => day.weekIndex === currentWeek + 1);
//       if (nextWeekMatch) setSelectedDay(nextWeekMatch);
//     }
//   };

//   const handlePrevWeek = () => {
//     if (currentWeek > 0) {
//       setCurrentWeek(prev => prev - 1);
//       const prevWeekMatch = DATA_TIMELINE.find(day => day.weekIndex === currentWeek - 1);
//       if (prevWeekMatch) setSelectedDay(prevWeekMatch);
//     }
//   };

//   const currentAppointments = APPOINTMENT_DATA.filter(item =>
//     item.targetDateId === selectedDay.id &&
//     (item.stylist.toLowerCase().includes(searchQuery.toLowerCase()) ||
//      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//      item.service.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const renderAppointmentCard = ({ item }) => (
//     <View
//       style={[
//         styles.premiumLuxuryCard,
//         {
//           backgroundColor: darkTheme.colors.card,
//           borderColor: darkTheme.colors.border,
//           borderRadius: scale(14),
//         },
//       ]}
//     >
//       {/* Upper Segment: Asymmetrical Profile Grid Layout */}
//       <View style={styles.cardHeaderRow}>
//         <View style={styles.headerLeftSubgroup}>
//           <View style={[styles.avatarBoxContainer, { backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }]}>
//             <Feather name="user" size={scale(15)} color={darkTheme.colors.accent} />
//           </View>
//           <View style={styles.clientMetaBlock}>
//             <Text style={[darkTheme.typography.cardTitle, styles.clientNameText]}>
//               {item.clientName}
//             </Text>
//             <Text style={[darkTheme.typography.bodyMuted, styles.emailText]}>
//               {item.email}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.headerRightSubgroup}>
//           <View style={[styles.stylistPillBadge, { backgroundColor: "rgba(255,255,255,0.04)" }]}>
//             <Text style={[darkTheme.typography.bodyMain, styles.stylistText, { color: darkTheme.colors.textMain }]}>
//               {item.stylist}
//             </Text>
//           </View>
//           <View style={styles.timeScheduleRow}>
//             <Ionicons name="time-outline" size={scale(11)} color={darkTheme.colors.textMuted} style={{ marginRight: scale(4) }} />
//             <Text style={[darkTheme.typography.bodyMuted, styles.timeText]}>
//               {item.timeSlot}
//             </Text>
//           </View>
//         </View>
//       </View>

//       <View style={[styles.fineDividerLine, { backgroundColor: "rgba(255,255,255,0.05)" }]} />

//       {/* Middle Segment: High-End Accounting Breakdown Box */}
//       <View style={styles.pricingSection}>
//         <View style={styles.pricingRow}>
//           <Text style={[darkTheme.typography.bodyMuted, styles.priceLabel]}>{item.service}</Text>
//           <Text style={[darkTheme.typography.bodyMain, styles.priceValue]}>{item.price}</Text>
//         </View>
//         <View style={styles.pricingRow}>
//           <Text style={[darkTheme.typography.bodyMain, styles.totalLabel]}>Total Balance</Text>
//           <Text style={[darkTheme.typography.bodyMain, styles.totalValue, { color: darkTheme.colors.accent }]}>
//             {item.price}
//           </Text>
//         </View>
//       </View>

//       <View style={[styles.fineDividerLine, { backgroundColor: "rgba(255,255,255,0.05)" }]} />

//       {/* Footer Segment: Direct Action Access Call String */}
//       <View style={styles.cardFooterRow}>
//         <TouchableOpacity
//           activeOpacity={0.7}
//           style={[styles.phoneActionButtonRow, { backgroundColor: "rgba(255, 149, 0, 0.04)", borderRadius: scale(8) }]}
//         >
//           <Ionicons name="call-outline" size={scale(11)} color={darkTheme.colors.accent} style={{ marginRight: scale(6) }} />
//           <Text style={[darkTheme.typography.bodyMuted, styles.footerText]}>
//             Contact Client: <Text style={[styles.phoneLink, { color: darkTheme.colors.accent }]}>{item.phone}</Text>
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView
//       edges={["top", "right", "left"]}
//       style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
//     >
//       <Header title="Appointment List" subTitle="Live appointment schedule manager" showBack={false} />

//       {/* Dynamic Scrolling Calendar Header Module */}
//       <View style={styles.calendarContainer}>
//         <View style={styles.calendarHeaderRow}>
//           <Text style={[darkTheme.typography.headerTitle, styles.monthTitleText]}>
//             {selectedDay.monthLabel}
//           </Text>
//           <View style={styles.monthToggleChevrons}>
//             <TouchableOpacity
//               onPress={handlePrevWeek}
//               disabled={currentWeek === 0}
//               style={[styles.chevronButton, currentWeek === 0 && { opacity: 0.2 }]}
//             >
//               <Ionicons name="chevron-back" size={scale(13)} color="#FFFFFF" />
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={handleNextWeek}
//               disabled={currentWeek === 1}
//               style={[styles.chevronButton, currentWeek === 1 && { opacity: 0.2 }]}
//             >
//               <Ionicons name="chevron-forward" size={scale(13)} color="#FFFFFF" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Dynamic Days Array Container Map */}
//         <View style={styles.daysHorizontalRow}>
//           {visibleDays.map((day) => {
//             const isSelected = selectedDay.id === day.id;
//             return (
//               <TouchableOpacity
//                 key={day.id}
//                 activeOpacity={0.8}
//                 onPress={() => setSelectedDay(day)}
//                 style={styles.daySelectionNode}
//               >
//                 <Text style={[darkTheme.typography.bodyMuted, styles.dayLabelName]}>
//                   {day.dayName}
//                 </Text>
//                 <View
//                   style={[
//                     styles.dayNumberCircle,
//                     {
//                       borderColor: isSelected ? darkTheme.colors.accent : "transparent",
//                       borderWidth: isSelected ? 1 : 0,
//                       backgroundColor: isSelected ? "rgba(255, 149, 0, 0.05)" : "transparent",
//                     },
//                   ]}
//                 >
//                   <Text style={[darkTheme.typography.bodyMain, styles.dayNumberText, isSelected && { fontWeight: "700" }]}>
//                     {day.dayNum}
//                   </Text>
//                   {day.hasAppointments && (
//                     <View style={[styles.activeIndicatorDot, { backgroundColor: darkTheme.colors.accent }]} />
//                   )}
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </View>

//       {/* Interactive Sub-Header Search Row Area */}
//       <View style={styles.searchTimelineSection}>
//         <View style={[styles.premiumSearchBox, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
//           <Ionicons name="search-outline" size={scale(13)} color={darkTheme.colors.textMuted} style={styles.searchIcon} />
//           <TextInput
//             placeholder="Search barber, client, or service profile..."
//             placeholderTextColor={darkTheme.colors.textMuted}
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             style={[darkTheme.typography.bodyMain, styles.searchFieldInput]}
//             autoCapitalize="none"
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery("")}>
//               <Ionicons name="close-circle" size={scale(14)} color={darkTheme.colors.textMuted} />
//             </TouchableOpacity>
//           )}
//         </View>

//         <Text style={[darkTheme.typography.bodyMain, styles.selectedTimelineLabel]}>
//           {selectedDay.dateStr}
//         </Text>
//       </View>

//       {/* Main Core FlatList Execution Frame */}
//       <FlatList
//         data={currentAppointments}
//         keyExtractor={(item) => item.id}
//         renderItem={renderAppointmentCard}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         maxToRenderPerBatch={10}
//         windowSize={5}
//         initialNumToRender={10}
//         removeClippedSubviews={Platform.OS === "android"}
//         ListEmptyComponent={
//           /* Ultra-Sleek Minimal Luxury Placeholder State Banner */
//           <View style={styles.luxuryEmptyStateBox}>
//             <View style={styles.glassCircleWrapper}>
//               <MaterialCommunityIcons name="calendar-blank-outline" size={scale(24)} color="rgba(255,255,255,0.15)" />
//               <View style={[styles.miniStatusOrbitDot, { backgroundColor: darkTheme.colors.accent }]} />
//             </View>
//             <Text style={[darkTheme.typography.cardTitle, styles.luxuryEmptyTitle]}>
//               No Bookings Scheduled
//             </Text>
//             <Text style={[darkTheme.typography.bodyMuted, styles.luxuryEmptySubtitle]}>
//               This timeline anchor is currently clear. Incoming client queue metrics will sync here in real time.
//             </Text>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// export default AppointmentsDashboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   calendarContainer: {
//     paddingHorizontal: darkTheme.layout.paddingHorizontal,
//     marginBottom: verticalScale(16),
//   },
//   calendarHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: verticalScale(14),
//   },
//   monthTitleText: {
//     fontSize: scale(14),
//     fontWeight: "700",
//     letterSpacing: -0.1,
//   },
//   monthToggleChevrons: {
//     flexDirection: "row",
//     gap: scale(6),
//   },
//   chevronButton: {
//     width: scale(26),
//     height: scale(26),
//     borderRadius: scale(13),
//     backgroundColor: "rgba(255,255,255,0.04)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   daysHorizontalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   daySelectionNode: {
//     alignItems: "center",
//     flex: 1,
//   },
//   dayLabelName: {
//     fontSize: scale(11),
//     marginBottom: verticalScale(6),
//     opacity: 0.35,
//   },
//   dayNumberCircle: {
//     width: scale(34),
//     height: scale(34),
//     borderRadius: scale(17),
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//   },
//   dayNumberText: {
//     fontSize: scale(12),
//   },
//   activeIndicatorDot: {
//     width: scale(3),
//     height: scale(3),
//     borderRadius: scale(1.5),
//     position: "absolute",
//     bottom: scale(4),
//   },
//   searchTimelineSection: {
//     paddingHorizontal: darkTheme.layout.paddingHorizontal,
//     marginBottom: verticalScale(14),
//     gap: verticalScale(12),
//   },
//   selectedTimelineLabel: {
//     fontSize: scale(13),
//     fontWeight: "700",
//     letterSpacing: -0.1,
//     opacity: 0.9,
//   },
//   premiumSearchBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderRadius: scale(10),
//     paddingHorizontal: scale(12),
//     height: scale(38),
//     width: "100%",
//   },
//   searchIcon: {
//     marginRight: scale(8),
//   },
//   searchFieldInput: {
//     flex: 1,
//     fontSize: scale(12),
//     padding: 0,
//     color: "#FFFFFF",
//   },
//   listContent: {
//     paddingHorizontal: darkTheme.layout.paddingHorizontal,
//     paddingBottom: verticalScale(32),
//     gap: verticalScale(12),
//   },
//   premiumLuxuryCard: {
//     borderWidth: 1,
//     padding: scale(16),
//   },
//   cardHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
//   headerLeftSubgroup: {
//     flexDirection: "row",
//     gap: scale(12),
//     flex: 1,
//   },
//   avatarBoxContainer: {
//     width: scale(36),
//     height: scale(36),
//     borderRadius: scale(10),
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   clientMetaBlock: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   clientNameText: {
//     fontSize: scale(13),
//     fontWeight: "700",
//     letterSpacing: -0.1,
//   },
//   emailText: {
//     fontSize: scale(11),
//     marginTop: verticalScale(2),
//     opacity: 0.5,
//   },
//   headerRightSubgroup: {
//     alignItems: "flex-end",
//     gap: verticalScale(4),
//   },
//   stylistPillBadge: {
//     paddingHorizontal: scale(8),
//     paddingVertical: verticalScale(3),
//     borderRadius: scale(6),
//   },
//   stylistText: {
//     fontSize: scale(11),
//     fontWeight: "600",
//   },
//   timeScheduleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: verticalScale(2),
//   },
//   timeText: {
//     fontSize: scale(11),
//   },
//   fineDividerLine: {
//     height: 1,
//     width: "100%",
//     marginVertical: verticalScale(12),
//   },
//   pricingSection: {
//     gap: verticalScale(6),
//   },
//   pricingRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   priceLabel: {
//     fontSize: scale(12),
//     opacity: 0.6,
//   },
//   priceValue: {
//     fontSize: scale(12),
//     fontWeight: "600",
//   },
//   totalLabel: {
//     fontSize: scale(12),
//     fontWeight: "600",
//   },
//   totalValue: {
//     fontSize: scale(14),
//     fontWeight: "700",
//   },
//   cardFooterRow: {
//     width: "100%",
//   },
//   phoneActionButtonRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: verticalScale(6),
//     paddingHorizontal: scale(10),
//     alignSelf: "flex-start",
//   },
//   footerText: {
//     fontSize: scale(11),
//   },
//   phoneLink: {
//     fontWeight: "600",
//   },
//   luxuryEmptyStateBox: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: verticalScale(48),
//     paddingHorizontal: scale(32),
//     marginTop: verticalScale(16),
//   },
//   glassCircleWrapper: {
//     width: scale(52),
//     height: scale(52),
//     borderRadius: scale(26),
//     backgroundColor: "rgba(255,255,255,0.02)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: verticalScale(14),
//     position: "relative",
//   },
//   miniStatusOrbitDot: {
//     width: scale(6),
//     height: scale(6),
//     borderRadius: scale(3),
//     position: "absolute",
//     right: scale(14),
//     top: scale(12),
//   },
//   luxuryEmptyTitle: {
//     fontSize: scale(14),
//     fontWeight: "700",
//     letterSpacing: -0.1,
//     marginBottom: verticalScale(6),
//     textAlign: "center",
//   },
//   luxuryEmptySubtitle: {
//     fontSize: scale(11),
//     textAlign: "center",
//     lineHeight: scale(16),
//     opacity: 0.35,
//     paddingHorizontal: scale(12),
//   },
// });

import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

// Layout & Configuration Context Imports
import { useFocusEffect } from "expo-router";
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";
import api from "../../../../../utils/api";

// --- DUMMY DATA MATRIX (For Preview & Initial Layout Verification) ---
const STATIC_APPOINTMENT_DATA = [
  {
    _id: "1",
    appointmentDate: "2026-07-17",
    customerName: "Arghya Nandy",
    customerEmail: "arghya@yopmail.com",
    barbername: "John Doe",
    timeSlots: "15:20 - 15:40",
    mobileNumber: "6291059885",
    countryCode: "91",
    appointmentNotes: "Prefers scissor cut on the sides.",
    services: [{ serviceName: "Haircut", servicePrice: "100" }],
  },
  {
    _id: "2",
    appointmentDate: "2026-07-17",
    customerName: "Shyam Sharma",
    customerEmail: "shyam@yopmail.com",
    barbername: "Bob Builder",
    timeSlots: "16:00 - 16:30",
    mobileNumber: "9876543210",
    countryCode: "91",
    services: [
      { serviceName: "Beard Trim", servicePrice: "150" },
      { serviceName: "Head Massage", servicePrice: "200" },
    ],
  },
];

const AppointmentsDashboard = () => {
  const { currentSalon } = useAdminGlobal();
  const { authenticatedUser } = useAdminAuth();

  // --- CONFIGURATION PARAMETERS ---
  const maxAppointmentDays = Number(
    currentSalon?.data?.salonSettings?.appointmentAdvanceDays || 14,
  );
  const currentSalonType = currentSalon?.data?.salonType || "Barber Shop";
  const currencySymbol = currentSalon?.data?.currency || "₹";

  // --- COMPONENT LOCAL STATES ---
  const [dates, setDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment().startOf("month"));
  const [selectedDay, setSelectedDay] = useState(null);
  const [searchBarber, setSearchBarber] = useState("");
  const [openNoteId, setOpenNoteId] = useState(null);

  // --- CALENDAR GENERATION PIECE ---
  const generateDatesForMonth = useCallback((monthMoment, maxDays) => {
    const today = moment().startOf("day");
    const tomorrow = today.clone().add(1, "day");
    const maxAllowedDate = today.clone().add(maxDays, "days").startOf("day");

    let temporaryTimelineArray = [];

    const loopStart = monthMoment.isSame(today, "month")
      ? tomorrow
      : monthMoment.clone().startOf("month");

    for (
      let day = loopStart.clone();
      day.isSameOrBefore(maxAllowedDate) && day.isSame(monthMoment, "month");
      day.add(1, "day")
    ) {
      temporaryTimelineArray.push({
        dayName: day.format("ddd").slice(0, 2),
        dayFullName: day.format("dddd"),
        date: day.format("DD"),
        month: day.format("MMM"),
        year: day.format("YYYY"),
        fullDate: day.format("YYYY-MM-DD"),
        monthLabel: day.format("MMMM YYYY"),
        dateStr: day.format("MMM DD, dddd"),
      });
    }

    setDates(temporaryTimelineArray);

    if (temporaryTimelineArray.length > 0) {
      setSelectedDay((prev) => {
        const baselineMatch = temporaryTimelineArray.find(
          (d) => d.fullDate === prev?.fullDate,
        );
        return baselineMatch || temporaryTimelineArray[0];
      });
    }
  }, []);

  useEffect(() => {
    generateDatesForMonth(currentMonth, maxAppointmentDays);
  }, [currentMonth, maxAppointmentDays, generateDatesForMonth]);

  const [appointmentData, setAppointmentData] = useState({
    loading: false,
    data: [],
  });

  useFocusEffect(
    useCallback(() => {
      const fetchAppointments = async () => {
        try {
          setAppointmentData((prev) => {
            return {
              ...prev,
              loading: true,
            };
          });
          const { data } = await api.post(
            "/appointments/getAppointmentListBySalonIdAndAppointmentDate",

            {
              salonId: authenticatedUser?.salonId,
              appointmentDate: selectedDay?.fullDate,
            },
          );
          setAppointmentData({
            loading: false,
            data: data?.response,
          });
        } catch (error) {
          console.error("Failed to fetch appointments:", error);
        } finally {
          setAppointmentData((prev) => {
            return {
              ...prev,
              loading: false,
            };
          });
        }
      };

      if (authenticatedUser?.salonId && selectedDay?.fullDate) {
        fetchAppointments();
      }
    }, [authenticatedUser?.salonId, selectedDay?.fullDate]),
  );

  const [allAppointments, setAllAppointments] = useState({
    loading: false,
    data: [],
  });

  useFocusEffect(
    useCallback(() => {
      const fetchAppointments = async () => {
        try {
          setAllAppointments((prev) => {
            return {
              ...prev,
              loading: true,
            };
          });
          const { data } = await api.post(
            "/appointments/getAllAppointmentsBySalonId",
            { salonId: authenticatedUser?.salonId },
          );
          setAllAppointments({
            loading: true,
            data: data?.response,
          });
        } catch (error) {
          console.error("Failed to fetch appointments:", error);
        } finally {
          setAllAppointments((prev) => {
            return {
              ...prev,
              loading: false,
            };
          });
        }
      };

      if (authenticatedUser?.salonId) {
        fetchAppointments();
      }
    }, [authenticatedUser?.salonId]),
  );

  console.log("Appointment Data ", appointmentData);

  // --- FILTERING SUBSYSTEM MANAGEMENT PIPELINES ---
  const displayAppointments = useMemo(() => {
    if (!selectedDay) return [];

    return STATIC_APPOINTMENT_DATA.filter((item) => {
      const matchDate = item.appointmentDate === selectedDay.fullDate;
      const matchSearch =
        !searchBarber.trim() ||
        item.barbername.toLowerCase().includes(searchBarber.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchBarber.toLowerCase());

      return matchDate && matchSearch;
    });
  }, [selectedDay, searchBarber]);

  const nextMonthFunc = () =>
    setCurrentMonth((prev) => prev.clone().add(1, "month"));
  const prevMonthFunc = () =>
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));

  const isPrevDisabled = currentMonth.isSame(moment(), "month");
  const isNextDisabled = currentMonth
    .clone()
    .add(1, "month")
    .startOf("month")
    .isAfter(moment().add(maxAppointmentDays, "days"));

  const renderAppointmentCard = (item) => {

    const isNoteOpen = openNoteId === item._id;
    const totalCalculatedBalance = item?.services?.reduce(
      (acc, service) => acc + Number(service.servicePrice || 0),
      0,
    );

    const handlePhoneCall = async (countryCode, mobileNumber) => {
      const phoneNumber = `tel:+${countryCode}${mobileNumber}`;

      try {
        const supported = await Linking.canOpenURL(phoneNumber);
        if (supported) {
          await Linking.openURL(phoneNumber);
        } else {
          Alert.alert("Error", "Phone calls are not supported on this device.");
        }
      } catch (error) {
        console.error("Failed to make a phone call:", error);
      }
    };

    return (
      <View
        key={item?._id}
        style={[
          styles.premiumLuxuryCard,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: darkTheme.colors.border,
          },
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <View style={styles.headerLeftSubgroup}>
            <View
              style={[
                styles.avatarBoxContainer,
                {
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.05)",
                },
              ]}
            >
              <Feather
                name="user"
                size={scale(15)}
                color={darkTheme.colors.accent}
              />
            </View>
            <View style={styles.clientMetaBlock}>
              <Text
                style={[darkTheme.typography.cardTitle, styles.clientNameText]}
                numberOfLines={1}
              >
                {item?.customerName}
              </Text>
              <Text
                style={[darkTheme.typography.bodyMuted, styles.emailText]}
                numberOfLines={1}
              >
                {item?.customerEmail}
              </Text>
            </View>
          </View>

          <View style={styles.headerRightSubgroup}>
            <View
              style={[
                styles.stylistPillBadge,
                { backgroundColor: "rgba(255,255,255,0.04)" },
              ]}
            >
              <Text
                style={[
                  darkTheme.typography.bodyMain,
                  styles.stylistText,
                  { color: darkTheme.colors.textMain },
                ]}
                numberOfLines={1}
              >
                {item?.barbername}
              </Text>
            </View>
            <View style={styles.timeScheduleRow}>
              <Ionicons
                name="time-outline"
                size={scale(11)}
                color={darkTheme.colors.textMuted}
                style={{ marginRight: scale(4) }}
              />
              <Text style={[darkTheme.typography.bodyMuted, styles.timeText]}>
                {item?.timeSlots}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.fineDividerLine,
            { backgroundColor: "rgba(255,255,255,0.05)" },
          ]}
        />

        <View style={styles.pricingSection}>
          {item?.services?.map((service, idx) => (
            <View key={idx} style={styles.pricingRow}>
              <Text style={[darkTheme.typography.bodyMuted, styles.priceLabel]}>
                {service.serviceName}
              </Text>
              <Text style={[darkTheme.typography.bodyMain, styles.priceValue]}>
                {currencySymbol} {service.servicePrice}
              </Text>
            </View>
          ))}

          <View
            style={[
              styles.pricingRow,
              {
                marginTop: scale(6),
                paddingTop: scale(6),
                borderTopWidth: 1,
                borderTopColor: "rgba(255,255,255,0.03)",
              },
            ]}
          >
            <Text style={[darkTheme.typography.bodyMain, styles.totalLabel]}>
              Total Balance
            </Text>
            <Text
              style={[
                darkTheme.typography.bodyMain,
                styles.totalValue,
                { color: darkTheme.colors.accent },
              ]}
            >
              {currencySymbol} {totalCalculatedBalance}
            </Text>
          </View>
        </View>

        {item?.appointmentNotes && (
          <View style={styles.notesOuterWrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setOpenNoteId(isNoteOpen ? null : item._id)}
              style={styles.notesToggleButton}
            >
              <Text
                style={{
                  color: darkTheme.colors.textMain,
                  fontSize: scale(11),
                  fontWeight: "500",
                }}
              >
                View Customer Note
              </Text>
              <Ionicons
                name={isNoteOpen ? "chevron-up" : "chevron-down"}
                size={scale(12)}
                color={darkTheme.colors.textMuted}
              />
            </TouchableOpacity>
            {isNoteOpen && (
              <View
                style={[
                  styles.notesExpandedContentContainer,
                  {
                    backgroundColor: "rgba(0,0,0,0.15)",
                    padding: scale(8),
                    marginTop: scale(4),
                    borderRadius: scale(6),
                  },
                ]}
              >
                <Text
                  style={{
                    color: darkTheme.colors.textMuted,
                    fontSize: scale(12),
                    lineHeight: scale(16),
                  }}
                >
                  {item?.appointmentNotes}
                </Text>
              </View>
            )}
          </View>
        )}

        <View
          style={[
            styles.fineDividerLine,
            { backgroundColor: "rgba(255,255,255,0.05)" },
          ]}
        />

        <View style={styles.cardFooterRow}>
          {item?.mobileNumber ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                handlePhoneCall(item.countryCode, item.mobileNumber)
              }
              style={[
                styles.phoneActionButtonRow,
                { backgroundColor: "rgba(255, 149, 0, 0.04)" },
              ]}
            >
              <Ionicons
                name="call-outline"
                size={scale(11)}
                color={darkTheme.colors.accent}
                style={{ marginRight: scale(6) }}
              />
              <Text style={[darkTheme.typography.bodyMuted, styles.footerText]}>
                Contact Client:{" "}
                <Text
                  style={{ color: darkTheme.colors.accent, fontWeight: "600" }}
                >
                  +{item?.countryCode}
                  {item?.mobileNumber}
                </Text>
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                { fontSize: scale(11), color: darkTheme.colors.textMuted },
              ]}
            >
              No client contact configuration registered.
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header
        title="Appointment List"
        subTitle="Live appointment schedule manager"
        showBack={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {/* Restored Clean Spacing Calendar Structure */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeaderRow}>
            <Text
              style={[darkTheme.typography.headerTitle, styles.monthTitleText]}
            >
              {currentMonth.format("MMMM YYYY")}
            </Text>
            <View style={styles.monthToggleChevrons}>
              <TouchableOpacity
                onPress={prevMonthFunc}
                disabled={isPrevDisabled}
                style={[
                  styles.chevronButton,
                  isPrevDisabled && { opacity: 0.15 },
                ]}
              >
                <Ionicons
                  name="chevron-back"
                  size={scale(14)}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={nextMonthFunc}
                disabled={isNextDisabled}
                style={[
                  styles.chevronButton,
                  isNextDisabled && { opacity: 0.15 },
                ]}
              >
                <Ionicons
                  name="chevron-forward"
                  size={scale(14)}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Restored Clean DaySelectionNodes map list using the correct 'dates' state */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: scale(14) }}
          >
            {dates?.map((item) => {
              const isSelected = selectedDay?.fullDate === item.fullDate;
              const hasIndicatorDot = allAppointments?.data?.some(
                (appt) => appt.appointmentDate === item.fullDate,
              );

              return (
                <TouchableOpacity
                  key={item.fullDate}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDay(item)}
                  style={styles.daySelectionNode}
                >
                  <Text
                    style={[
                      darkTheme.typography.bodyMuted,
                      styles.dayLabelName,
                    ]}
                  >
                    {item.dayName}
                  </Text>
                  <View
                    style={[
                      styles.dayNumberCircle,
                      {
                        borderColor: isSelected
                          ? darkTheme.colors.accent
                          : "transparent",
                        borderWidth: isSelected ? 1 : 0,
                        backgroundColor: isSelected
                          ? "rgba(255, 149, 0, 0.05)"
                          : "transparent",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        darkTheme.typography.bodyMain,
                        styles.dayNumberText,
                        isSelected && { fontWeight: "700" },
                      ]}
                    >
                      {item.date}
                    </Text>
                    {hasIndicatorDot && (
                      <View
                        style={[
                          styles.activeIndicatorDot,
                          { backgroundColor: darkTheme.colors.textMain },
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Sub-Header Inputs Searching Section Layout Wrap */}
        {selectedDay && (
          <View style={styles.searchTimelineSection}>
            <View
              style={[
                styles.premiumSearchBox,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                },
              ]}
            >
              <Ionicons
                name="search-outline"
                size={scale(13)}
                color={darkTheme.colors.textMuted}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder={`Search by ${currentSalonType === "Barber Shop" ? "barber" : "stylist"}...`}
                placeholderTextColor={darkTheme.colors.textMuted}
                value={searchBarber}
                onChangeText={setSearchBarber}
                style={[darkTheme.typography.bodyMain, styles.searchFieldInput]}
                autoCapitalize="none"
              />
              {searchBarber.length > 0 && (
                <TouchableOpacity onPress={() => setSearchBarber("")}>
                  <Ionicons
                    name="close-circle"
                    size={scale(14)}
                    color={darkTheme.colors.textMuted}
                  />
                </TouchableOpacity>
              )}
            </View>

            <Text
              style={[
                darkTheme.typography.bodyMain,
                styles.selectedTimelineLabel,
              ]}
            >
              {selectedDay.dateStr}
            </Text>
          </View>
        )}

        {/* Main Framework Items Data Render Gate */}
        {appointmentData?.data?.length > 0 ? (
          appointmentData?.data?.map((item) => renderAppointmentCard(item))
        ) : (
          <View style={styles.luxuryEmptyStateBox}>
            <View style={styles.glassCircleWrapper}>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={scale(24)}
                color="rgba(255,255,255,0.15)"
              />
              <View
                style={[
                  styles.miniStatusOrbitDot,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
              />
            </View>
            <Text
              style={[darkTheme.typography.cardTitle, styles.luxuryEmptyTitle]}
            >
              No Bookings Scheduled
            </Text>
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                styles.luxuryEmptySubtitle,
              ]}
            >
              There are currently no appointments active for this selected date
              scope placeholder anchor.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentsDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    marginBottom: verticalScale(16),
  },
  calendarHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(14),
  },
  monthTitleText: {
    fontSize: scale(14),
    fontWeight: "700",
    letterSpacing: -0.1,
  },
  monthToggleChevrons: {
    flexDirection: "row",
    gap: scale(6),
  },
  chevronButton: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    backgroundColor: "rgba(255,255,255,0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
  daySelectionNode: {
    alignItems: "center",
  },
  dayLabelName: {
    fontSize: scale(11),
    marginBottom: verticalScale(6),
    opacity: 0.35,
  },
  dayNumberCircle: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dayNumberText: {
    fontSize: scale(12),
  },
  activeIndicatorDot: {
    width: scale(3),
    height: scale(3),
    borderRadius: scale(1.5),
    position: "absolute",
    bottom: scale(4),
  },
  searchTimelineSection: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    marginBottom: verticalScale(14),
    gap: verticalScale(12),
  },
  selectedTimelineLabel: {
    fontSize: scale(13),
    fontWeight: "700",
    letterSpacing: -0.1,
    opacity: 0.9,
  },
  premiumSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    height: scale(38),
    width: "100%",
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchFieldInput: {
    flex: 1,
    fontSize: scale(12),
    padding: 0,
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: verticalScale(32),
  },
  premiumLuxuryCard: {
    marginHorizontal: darkTheme.layout.paddingHorizontal,
    marginBottom: verticalScale(12),
    borderWidth: 1,
    padding: scale(16),
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeftSubgroup: {
    flexDirection: "row",
    gap: scale(12),
    flex: 1,
  },
  avatarBoxContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(10),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clientMetaBlock: {
    flex: 1,
    justifyContent: "center",
  },
  clientNameText: {
    fontSize: scale(13),
    fontWeight: "700",
    letterSpacing: -0.1,
  },
  emailText: {
    fontSize: scale(11),
    marginTop: verticalScale(2),
    opacity: 0.5,
  },
  headerRightSubgroup: {
    alignItems: "flex-end",
    gap: verticalScale(4),
  },
  stylistPillBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    borderRadius: scale(6),
  },
  stylistText: {
    fontSize: scale(11),
    fontWeight: "600",
  },
  timeScheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(2),
  },
  timeText: {
    fontSize: scale(11),
  },
  fineDividerLine: {
    height: 1,
    width: "100%",
    marginVertical: verticalScale(12),
  },
  pricingSection: {
    gap: verticalScale(6),
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: scale(12),
    opacity: 0.6,
  },
  priceValue: {
    fontSize: scale(12),
    fontWeight: "600",
  },
  totalLabel: {
    fontSize: scale(12),
    fontWeight: "600",
  },
  totalValue: {
    fontSize: scale(14),
    fontWeight: "700",
  },
  cardFooterRow: {
    width: "100%",
  },
  phoneActionButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(10),
    alignSelf: "flex-start",
  },
  footerText: {
    fontSize: scale(11),
  },
  phoneLink: {
    fontWeight: "600",
  },
  luxuryEmptyStateBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(48),
    paddingHorizontal: scale(32),
    marginTop: verticalScale(16),
  },
  glassCircleWrapper: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(26),
    backgroundColor: "rgba(255,255,255,0.02)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(14),
    position: "relative",
  },
  miniStatusOrbitDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    position: "absolute",
    right: scale(14),
    top: scale(12),
  },
  luxuryEmptyTitle: {
    fontSize: scale(14),
    fontWeight: "700",
    letterSpacing: -0.1,
    marginBottom: verticalScale(6),
    textAlign: "center",
  },
  luxuryEmptySubtitle: {
    fontSize: scale(11),
    textAlign: "center",
    lineHeight: scale(16),
    opacity: 0.35,
    paddingHorizontal: scale(12),
  },
});

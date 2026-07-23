// import React, { useState } from "react";
// import { FlatList, Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";
// import { Ionicons, Feather, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

// import Header from "../../../../../components/Header/Header"; // Adjust path as needed
// import { darkTheme } from "../../../../../constants/appTheme";

// const HISTORIC_DATA = [
//   { id: "1", clientName: "Shyam sharma", barberName: "Bob", service: "Massage", price: "₹ 345", date: "23/06/2026", status: "Served", mode: "Walk-In", type: "Regular" },
//   { id: "2", clientName: "Abc", barberName: "John Doe", service: "Haircut", price: "₹ 100", date: "08/06/2026", status: "Cancelled", mode: "Mobile", type: "VIP" },

// ];

// const QueueHistory = () => {
//   const [history] = useState(HISTORIC_DATA);

//   const renderHistoryItem = ({ item }) => {
//     const isServed = item.status === "Served";
//     const isVIP = item.type === "VIP";

//     // Dynamic icon picker for booking modes
//     const getModeIcon = (mode) => {
//       if (mode === "Walk-In") return "walk";
//       if (mode === "Mobile") return "smartphone";
//       return "globe-outline"; // Web platform fallback
//     };

//     return (
//       <View
//         style={[
//           styles.historyCard,
//           {
//             backgroundColor: darkTheme.colors.card,
//             borderColor: darkTheme.colors.border,
//             borderRadius: darkTheme.layout.borderRadiusLarge,
//           },
//         ]}
//       >
//         {/* Main Info Row */}
//         <View style={styles.cardHeader}>
//           <View style={styles.profileRow}>
//             <View style={[styles.avatarFrame, { backgroundColor: "#2C2C2E" }]}>
//               <Ionicons name="person" size={scale(16)} color={darkTheme.colors.textMuted} />
//             </View>
//             <View style={styles.metaData}>
//               <Text style={[darkTheme.typography.cardTitle, styles.clientName]}>
//                 {item.clientName}
//               </Text>
//               <Text style={[darkTheme.typography.bodyMuted, styles.barberText]}>
//                 Stylist: {item.barberName}
//               </Text>
//               <Text style={[darkTheme.typography.bodyMuted, styles.serviceText]}>
//                 {item.service}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.priceDateBlock}>
//             <Text style={[darkTheme.typography.bodyMain, styles.priceText, { color: darkTheme.colors.accent }]}>
//               {item.price}
//             </Text>
//             <Text style={[darkTheme.typography.bodyMuted, styles.dateText]}>
//               {item.date}
//             </Text>
//           </View>
//         </View>

//         <View style={[styles.divider, { backgroundColor: darkTheme.colors.border }]} />

//         {/* Footer Metrics Row: Unified high-contrast badge items */}
//         <View style={styles.cardFooterRow}>

//           {/* 1. Clear Booking Mode Label */}
//           <View style={[styles.metricMiniBadge, { backgroundColor: "rgba(255, 255, 255, 0.03)", borderColor: darkTheme.colors.border }]}>
//             <Ionicons
//               name={getModeIcon(item.mode)}
//               size={scale(11)}
//               color={darkTheme.colors.textMuted}
//               style={{ marginRight: scale(4) }}
//             />
//             <Text style={[darkTheme.typography.bodyMuted, styles.metricBadgeText, { color: darkTheme.colors.textMuted }]}>
//               {item.mode}
//             </Text>
//           </View>

//           {/* 2. Customer Type Highlight Badge */}
//           <View
//             style={[
//               styles.metricMiniBadge,
//               {
//                 backgroundColor: isVIP ? "rgba(255, 149, 0, 0.08)" : "rgba(255, 255, 255, 0.03)",
//                 borderColor: isVIP ? "rgba(255, 149, 0, 0.2)" : darkTheme.colors.border
//               }
//             ]}
//           >
//             <MaterialCommunityIcons
//               name={isVIP ? "crown" : "account"}
//               size={scale(11)}
//               color={isVIP ? darkTheme.colors.accent : darkTheme.colors.textMuted}
//               style={{ marginRight: scale(4) }}
//             />
//             <Text style={[darkTheme.typography.bodyMuted, styles.metricBadgeText, { color: isVIP ? darkTheme.colors.accent : darkTheme.colors.textMuted }]}>
//               {item.type}
//             </Text>
//           </View>

//           {/* 3. High-Contrast Status Highlight Badge */}
//           <View
//             style={[
//               styles.metricMiniBadge,
//               {
//                 backgroundColor: isServed ? "rgba(52, 199, 89, 0.08)" : "rgba(255, 59, 48, 0.08)",
//                 borderColor: isServed ? "rgba(52, 199, 89, 0.2)" : "rgba(255, 59, 48, 0.2)"
//               }
//             ]}
//           >
//             <Ionicons
//               name={isServed ? "checkmark-circle" : "close-circle"}
//               size={scale(11)}
//               color={isServed ? darkTheme.status.success.text : darkTheme.status.error.text}
//               style={{ marginRight: scale(4) }}
//             />
//             <Text
//               style={[
//                 darkTheme.typography.bodyMuted,
//                 styles.metricBadgeText,
//                 { color: isServed ? darkTheme.status.success.text : darkTheme.status.error.text, fontWeight: "600" }
//               ]}
//             >
//               {item.status}
//             </Text>
//           </View>

//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView
//       edges={["top", "right", "left"]}
//       style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
//     >
//       <Header title="Queue History" subTitle="Log of past walk-in customers and arrivals" showBack={false} />

//       <View style={styles.topContainer}>
//         <View style={styles.filterActionRow}>
//           <View style={styles.toolsLeftGroup}>
//             <TouchableOpacity
//               activeOpacity={0.7}
//               style={[styles.toolButton, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
//             >
//               <Ionicons name="refresh" size={scale(15)} color={darkTheme.colors.textMain} />
//             </TouchableOpacity>

//             <TouchableOpacity
//               activeOpacity={0.7}
//               style={[styles.toolButton, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
//             >
//               <Feather name="calendar" size={scale(14)} color={darkTheme.colors.textMain} />
//             </TouchableOpacity>

//             <TouchableOpacity
//               activeOpacity={0.7}
//               style={[styles.toolButton, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
//             >
//               <Ionicons name="search" size={scale(14)} color={darkTheme.colors.textMain} />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={[styles.filterLabelButton, { backgroundColor: "rgba(255, 149, 0, 0.1)", borderColor: darkTheme.colors.accent }]}
//           >
//             <MaterialIcons name="filter-list" size={scale(15)} color={darkTheme.colors.accent} style={styles.filterIcon} />
//             <Text style={[darkTheme.typography.bodyMain, styles.filterButtonText, { color: darkTheme.colors.accent }]}>
//               Filter
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <FlatList
//         data={history}
//         keyExtractor={(item) => item.id}
//         renderItem={renderHistoryItem}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         maxToRenderPerBatch={10}
//         windowSize={5}
//         initialNumToRender={10}
//         removeClippedSubviews={Platform.OS === "android"}
//       />
//     </SafeAreaView>
//   );
// };

// export default QueueHistory;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   topContainer: {
//     paddingHorizontal: darkTheme.layout.paddingHorizontal,
//     marginBottom: verticalScale(16),
//   },
//   filterActionRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   toolsLeftGroup: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(10),
//   },
//   toolButton: {
//     width: scale(36),
//     height: scale(36),
//     borderWidth: 1,
//     borderRadius: scale(18),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filterLabelButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     height: scale(36),
//     borderWidth: 1,
//     borderRadius: scale(18),
//     paddingHorizontal: scale(14),
//   },
//   filterIcon: {
//     marginRight: scale(6),
//   },
//   filterButtonText: {
//     fontSize: scale(12),
//     fontWeight: "600",
//     letterSpacing: -0.1,
//   },
//   listContent: {
//     paddingHorizontal: darkTheme.layout.paddingHorizontal,
//     paddingBottom: verticalScale(32),
//     gap: verticalScale(14),
//   },
//   historyCard: {
//     borderWidth: 1,
//     padding: scale(14),
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
//   profileRow: {
//     flexDirection: "row",
//     gap: scale(12),
//     flex: 1,
//   },
//   avatarFrame: {
//     width: scale(36),
//     height: scale(36),
//     borderRadius: scale(18),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   metaData: {
//     flex: 1,
//   },
//   clientName: {
//     fontSize: scale(14),
//     fontWeight: "600",
//   },
//   barberText: {
//     fontSize: scale(12),
//     marginTop: verticalScale(2),
//   },
//   serviceText: {
//     fontSize: scale(12),
//     marginTop: verticalScale(1),
//   },
//   priceDateBlock: {
//     alignItems: "flex-end",
//   },
//   priceText: {
//     fontSize: scale(14),
//     fontWeight: "700",
//   },
//   dateText: {
//     fontSize: scale(11),
//     marginTop: verticalScale(4),
//   },
//   divider: {
//     height: 1,
//     width: "100%",
//     marginVertical: verticalScale(12),
//   },
//   cardFooterRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//   },
//   metricMiniBadge: {
//     flexDirection: "row",
//     paddingHorizontal: scale(8),
//     paddingVertical: verticalScale(5),
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: scale(4),
//     borderWidth: 1,
//     flex: 1,
//     maxWidth: "31%",
//   },
//   metricBadgeText: {
//     fontSize: scale(11),
//   },
// });

import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Shimmer from "react-native-modern-shimmer";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../../components/Header/Header";
import RangeCalendarModal from "../../../../../components/RangeCalender";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import api from "../../../../../utils/api";

// Theme tokens for multi-tone stealth dark shimmer effect
const SKELETON_THEME = {
  header: { baseColor: "#221f1c", highlightColor: "#332e2a" },
  button: { baseColor: "#2a2a2a", highlightColor: "#333333" },
  card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
  text: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
};

const QueueHistory = () => {
  const { authenticatedUser } = useAdminAuth();
  const salonId = authenticatedUser?.salonId;

  // Screen level master loading gate to prevent UI flashing
  const [isScreenLoading, setIsScreenLoading] = useState(true);

  // Data & Pagination state
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const rowsPerPage = 10;

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Calendar Modal States
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Barber Filter Modal States
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterBarberList, setFilterBarberList] = useState([]);
  const [selectedFilterBarber, setSelectedFilterBarber] = useState(null);

  // 1. Fetch Barber List for Filter Modal
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const { data } = await api.post(
          `/barber/getAllBarberBySalonId?salonId=${salonId}`,
        );
        setFilterBarberList(data?.getAllBarbers || []);
      } catch (error) {
        console.error("Error fetching barbers:", error);
      }
    };

    if (salonId) {
      fetchBarbers();
    }
  }, [salonId]);

  // 2. Fetch Queue History Data
  const fetchData = async (pageNum = 1, isRefresh = false) => {
    // Single date guard
    if ((startDate && !endDate) || (!startDate && endDate)) {
      return;
    }

    // Date range validation (Max 30 days)
    if (startDate && endDate) {
      const durationDays = endDate.diff(startDate, "days") + 1;
      if (durationDays > 30) {
        setStartDate(null);
        setEndDate(null);
        alert("Date range cannot exceed 30 days");
        return;
      }
    }

    if (!isRefresh && pageNum === 1) setLoading(true);

    try {
      const fromDate = startDate ? startDate.format("YYYY-MM-DD") : "";
      const toDate = endDate ? endDate.format("YYYY-MM-DD") : "";

      const { data } = await api.post(
        "/queueHistory/getQueueHistoryBySalonId",
        {
          salonId,
          barberId: selectedFilterBarber?.barberId || "",
          from: fromDate,
          to: toDate,
          page: pageNum,
          limit: rowsPerPage,
          search: searchQuery,
        },
      );

      const newItems = data?.response || [];

      setHistory((prev) => (pageNum === 1 ? newItems : [...prev, ...newItems]));
      setHasMore(newItems.length > 0);
    } catch (error) {
      console.error("Error fetching queue history:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setIsScreenLoading(false);
    }
  };

  // Re-fetch on filter change
  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [startDate, endDate, searchQuery, selectedFilterBarber]);

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchData(1, true);
  }, [startDate, endDate, searchQuery, selectedFilterBarber]);

  // Handle Infinite Scroll Load More
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  };

  // Helper for dynamic mode icon selection
  // Helper for dynamic mode icon selection
  const getModeIcon = (methodUsed) => {
    const mode = String(methodUsed || "").toLowerCase();

    if (mode === "app" || mode === "mobile") {
      return "hardware-chip-outline"; // or "phone-portrait-outline"
    }
    if (mode === "kiosk") {
      return "desktop-outline";
    }
    return "walk-outline";
  };

  // Render individual history item
  const renderHistoryItem = ({ item }) => {
    const isServed = item?.status === "served";
    const isSingle = item?.joinedQType === "Single-Join";

    const totalPrice = Array.isArray(item?.services)
      ? item.services.reduce(
          (sum, service) => sum + (service?.servicePrice || 0),
          0,
        )
      : 0;

    const serviceNames = Array.isArray(item?.services)
      ? item.services.map((s) => s?.serviceName).join(", ")
      : "";

    // Parse date safely from timeJoinedQ or fallback to current formatted string
    const formattedDate = item?.timeJoinedQ
      ? moment(item.timeJoinedQ).isValid()
        ? moment(item.timeJoinedQ).format("DD/MM/YYYY")
        : item.timeJoinedQ
      : "--/--/----";

    return (
      <View
        style={[
          styles.historyCard,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: darkTheme.colors.border,
            borderRadius: darkTheme.layout.borderRadiusLarge,
          },
        ]}
      >
        {/* Main Info Row */}
        <View style={styles.cardHeader}>
          <View style={styles.profileRow}>
            <View style={[styles.avatarFrame, { backgroundColor: "#2C2C2E" }]}>
              <Ionicons
                name="person"
                size={scale(16)}
                color={darkTheme.colors.textMuted}
              />
            </View>
            <View style={styles.metaData}>
              <Text style={[darkTheme.typography.cardTitle, styles.clientName]}>
                {item?.customerName || "N/A"}
              </Text>
              <Text style={[darkTheme.typography.bodyMuted, styles.barberText]}>
                Stylist: {item?.barberName || "N/A"}
              </Text>
              {serviceNames ? (
                <Text
                  style={[darkTheme.typography.bodyMuted, styles.serviceText]}
                >
                  {serviceNames}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={styles.priceDateBlock}>
            <Text
              style={[
                darkTheme.typography.bodyMain,
                styles.priceText,
                { color: darkTheme.colors.accent },
              ]}
            >
              ₹ {totalPrice}
            </Text>
            <Text style={[darkTheme.typography.bodyMuted, styles.dateText]}>
              {formattedDate}
            </Text>
          </View>
        </View>

        <View
          style={[styles.divider, { backgroundColor: darkTheme.colors.border }]}
        />

        {/* Footer Metrics Row */}
        <View style={styles.cardFooterRow}>
          {/* 1. Mode Badge */}
          <View
            style={[
              styles.metricMiniBadge,
              {
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderColor: darkTheme.colors.border,
              },
            ]}
          >
            <Ionicons
              name={getModeIcon(item?.methodUsed)}
              size={scale(11)}
              color={darkTheme.colors.textMuted}
              style={{ marginRight: scale(4) }}
            />
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                styles.metricBadgeText,
                { color: darkTheme.colors.textMuted },
              ]}
              numberOfLines={1}
            >
              {item?.methodUsed || "Walk-In"}
            </Text>
          </View>

          {/* 2. Type Badge */}
          <View
            style={[
              styles.metricMiniBadge,
              {
                backgroundColor: isSingle
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(255, 149, 0, 0.08)",
                borderColor: isSingle
                  ? darkTheme.colors.border
                  : "rgba(255, 149, 0, 0.2)",
              },
            ]}
          >
            <MaterialCommunityIcons
              name={isSingle ? "account" : "account-group"}
              size={scale(11)}
              color={
                isSingle ? darkTheme.colors.textMuted : darkTheme.colors.accent
              }
              style={{ marginRight: scale(4) }}
            />
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                styles.metricBadgeText,
                {
                  color: isSingle
                    ? darkTheme.colors.textMuted
                    : darkTheme.colors.accent,
                },
              ]}
              numberOfLines={1}
            >
              {item?.joinedQType || "Single"}
            </Text>
          </View>

          {/* 3. Status Badge */}
          <View
            style={[
              styles.metricMiniBadge,
              {
                backgroundColor: isServed
                  ? "rgba(52, 199, 89, 0.08)"
                  : "rgba(255, 59, 48, 0.08)",
                borderColor: isServed
                  ? "rgba(52, 199, 89, 0.2)"
                  : "rgba(255, 59, 48, 0.2)",
              },
            ]}
          >
            <Ionicons
              name={isServed ? "checkmark-circle" : "close-circle"}
              size={scale(11)}
              color={
                isServed
                  ? darkTheme.status.success.text
                  : darkTheme.status.error.text
              }
              style={{ marginRight: scale(4) }}
            />
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                styles.metricBadgeText,
                {
                  color: isServed
                    ? darkTheme.status.success.text
                    : darkTheme.status.error.text,
                  fontWeight: "600",
                },
              ]}
              numberOfLines={1}
            >
              {isServed ? "Served" : "Cancelled"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // State Gate - Render skeleton while loading screen
  if (isScreenLoading) {
    return <ScreenSkeletonView />;
  }

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header
        title="Queue History"
        subTitle="Log of past walk-in customers and arrivals"
        showBack={false}
      />

      <View style={styles.topContainer}>
        <View style={styles.filterActionRow}>
          {/* Search Input */}
          <View
            style={[
              styles.searchInputContainer,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
              },
            ]}
          >
            <Ionicons
              name="search"
              size={scale(14)}
              color={darkTheme.colors.textMuted}
              style={{ marginRight: scale(8) }}
            />
            <TextInput
              style={[styles.searchInput, { color: darkTheme.colors.textMain }]}
              placeholder="Search queue history..."
              placeholderTextColor={darkTheme.colors.textMuted}
              value={searchQuery}
              onChangeText={(text) => {
                if (selectedFilterBarber) setSelectedFilterBarber(null);
                setSearchQuery(text);
              }}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons
                  name="close-circle"
                  size={scale(14)}
                  color={darkTheme.colors.textMuted}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Controls Group */}
          <View style={styles.toolsRightGroup}>
            {/* Calendar Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.toolButton,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor:
                    startDate || endDate
                      ? darkTheme.colors.accent
                      : darkTheme.colors.border,
                },
              ]}
              onPress={() => setCalendarVisible(true)}
            >
              <Feather
                name="calendar"
                size={scale(14)}
                color={
                  startDate || endDate
                    ? darkTheme.colors.accent
                    : darkTheme.colors.textMain
                }
              />
            </TouchableOpacity>

            {/* Filter Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setFilterModalVisible(true)}
              style={[
                styles.filterLabelButton,
                {
                  backgroundColor: selectedFilterBarber
                    ? darkTheme.colors.accent
                    : "rgba(255, 149, 0, 0.1)",
                  borderColor: darkTheme.colors.accent,
                },
              ]}
            >
              <MaterialIcons
                name="filter-list"
                size={scale(15)}
                color={
                  selectedFilterBarber ? "#000000" : darkTheme.colors.accent
                }
                style={styles.filterIcon}
              />
              <Text
                style={[
                  darkTheme.typography.bodyMain,
                  styles.filterButtonText,
                  {
                    color: selectedFilterBarber
                      ? "#000000"
                      : darkTheme.colors.accent,
                  },
                ]}
              >
                {selectedFilterBarber ? "Filtered" : "Filter"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Queue History List */}
      <FlatList
        data={history}
        keyExtractor={(item) => item?._id || Math.random().toString()}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={Platform.OS === "android"}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={darkTheme.colors.accent}
            colors={[darkTheme.colors.accent]}
          />
        }
        ListFooterComponent={
          loading && !refreshing ? (
            <View style={styles.loaderFooter}>
              <ActivityIndicator size="small" color={darkTheme.colors.accent} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <View
                style={[
                  styles.emptyIconCard,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="people-outline"
                  size={scale(24)}
                  color={darkTheme.colors.textMuted}
                />
                <View
                  style={[
                    styles.emptyIconAccentDot,
                    { backgroundColor: darkTheme.colors.accent },
                  ]}
                />
              </View>

              <Text
                style={[
                  darkTheme.typography.cardTitle,
                  styles.emptyTitleText,
                  { color: darkTheme.colors.textMain },
                ]}
              >
                No Queue Records Found
              </Text>

              <Text
                style={[
                  darkTheme.typography.bodyMuted,
                  styles.emptySubtitleText,
                  { color: darkTheme.colors.textMuted },
                ]}
              >
                There are currently no queue records matching your active
                filters or date range selection.
              </Text>
            </View>
          )
        }
      />

      {/* Range Calendar Modal */}
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

      {/* Barber Filter Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
          <View style={styles.modalOverlayScrim}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View
                style={[
                  styles.bottomSheetContent,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <FlatList
                  data={filterBarberList}
                  keyExtractor={(item) =>
                    item?.barberId || Math.random().toString()
                  }
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.sheetScrollContainer}
                  renderItem={({ item: barber }) => {
                    const isSelected =
                      selectedFilterBarber?.barberId === barber?.barberId;

                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={[
                          styles.checkboxRowItem,
                          { borderColor: darkTheme.colors.border },
                        ]}
                        onPress={() => {
                          setSearchQuery("");
                          setSelectedFilterBarber(isSelected ? null : barber);
                        }}
                      >
                        <View
                          style={[
                            styles.checkboxBox,
                            { borderColor: darkTheme.colors.border },
                            isSelected && {
                              backgroundColor: darkTheme.colors.accent,
                              borderColor: darkTheme.colors.accent,
                            },
                          ]}
                        >
                          {isSelected && (
                            <Ionicons
                              name="checkmark"
                              size={scale(12)}
                              color="#000000"
                            />
                          )}
                        </View>
                        <Text
                          style={[
                            darkTheme.typography.bodyMain,
                            styles.checkboxLabelText,
                            {
                              color: isSelected
                                ? darkTheme.colors.textMain
                                : darkTheme.colors.textMuted,
                              fontWeight: isSelected ? "600" : "400",
                            },
                          ]}
                        >
                          {barber?.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />

                <View style={styles.sheetActionButtonsRow}>
                  <TouchableOpacity
                    style={[
                      styles.sheetResetButton,
                      { borderColor: darkTheme.colors.border },
                    ]}
                    activeOpacity={0.7}
                    onPress={() => setSelectedFilterBarber(null)}
                  >
                    <Text
                      style={[
                        styles.sheetResetText,
                        { color: darkTheme.colors.textMain },
                      ]}
                    >
                      Reset
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.sheetCloseButton,
                      { backgroundColor: darkTheme.colors.accent },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setFilterModalVisible(false)}
                  >
                    <Text style={styles.sheetCloseButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const ScreenSkeletonView = () => {
  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      {/* Skeleton Header */}
      <View style={styles.skeletonHeaderContainer}>
        <Shimmer
          width={scale(180)}
          height={verticalScale(22)}
          borderRadius={scale(6)}
          baseColor={SKELETON_THEME.header.baseColor}
          highlightColor={SKELETON_THEME.header.highlightColor}
        />
        <Shimmer
          width={scale(240)}
          height={verticalScale(12)}
          borderRadius={scale(4)}
          style={{ marginTop: verticalScale(6) }}
          baseColor={SKELETON_THEME.text.baseColor}
          highlightColor={SKELETON_THEME.text.highlightColor}
        />
      </View>

      {/* Top Action Controls Skeleton */}
      <View style={styles.topContainer}>
        <View style={styles.filterActionRow}>
          <View
            style={[
              styles.searchInputContainer,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
              },
            ]}
          >
            <Shimmer
              width={scale(140)}
              height={verticalScale(14)}
              borderRadius={scale(4)}
              baseColor={SKELETON_THEME.text.baseColor}
              highlightColor={SKELETON_THEME.text.highlightColor}
            />
          </View>

          <View style={styles.toolsRightGroup}>
            <Shimmer
              width={scale(36)}
              height={scale(36)}
              borderRadius={scale(18)}
              baseColor={SKELETON_THEME.button.baseColor}
              highlightColor={SKELETON_THEME.button.highlightColor}
            />
            <Shimmer
              width={scale(75)}
              height={scale(36)}
              borderRadius={scale(18)}
              baseColor={SKELETON_THEME.button.baseColor}
              highlightColor={SKELETON_THEME.button.highlightColor}
            />
          </View>
        </View>
      </View>

      {/* Skeleton Cards List */}
      <View style={styles.listContent}>
        {[1, 2, 3, 4].map((key) => (
          <View
            key={key}
            style={[
              styles.historyCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
                borderRadius: darkTheme.layout.borderRadiusLarge,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.profileRow}>
                <Shimmer
                  width={scale(36)}
                  height={scale(36)}
                  borderRadius={scale(18)}
                  baseColor={SKELETON_THEME.card.baseColor}
                  highlightColor={SKELETON_THEME.card.highlightColor}
                />
                <View style={styles.metaData}>
                  <Shimmer
                    width={scale(120)}
                    height={verticalScale(14)}
                    borderRadius={scale(4)}
                    baseColor={SKELETON_THEME.text.baseColor}
                    highlightColor={SKELETON_THEME.text.highlightColor}
                  />
                  <Shimmer
                    width={scale(90)}
                    height={verticalScale(10)}
                    borderRadius={scale(3)}
                    style={{ marginTop: verticalScale(6) }}
                    baseColor={SKELETON_THEME.text.baseColor}
                    highlightColor={SKELETON_THEME.text.highlightColor}
                  />
                  <Shimmer
                    width={scale(110)}
                    height={verticalScale(10)}
                    borderRadius={scale(3)}
                    style={{ marginTop: verticalScale(4) }}
                    baseColor={SKELETON_THEME.text.baseColor}
                    highlightColor={SKELETON_THEME.text.highlightColor}
                  />
                </View>
              </View>

              <View style={styles.priceDateBlock}>
                <Shimmer
                  width={scale(55)}
                  height={verticalScale(14)}
                  borderRadius={scale(4)}
                  baseColor={SKELETON_THEME.header.baseColor}
                  highlightColor={SKELETON_THEME.header.highlightColor}
                />
                <Shimmer
                  width={scale(65)}
                  height={verticalScale(10)}
                  borderRadius={scale(3)}
                  style={{ marginTop: verticalScale(6) }}
                  baseColor={SKELETON_THEME.text.baseColor}
                  highlightColor={SKELETON_THEME.text.highlightColor}
                />
              </View>
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: darkTheme.colors.border },
              ]}
            />

            <View style={styles.cardFooterRow}>
              <Shimmer
                width={scale(70)}
                height={verticalScale(20)}
                borderRadius={scale(4)}
                baseColor={SKELETON_THEME.button.baseColor}
                highlightColor={SKELETON_THEME.button.highlightColor}
              />
              <Shimmer
                width={scale(70)}
                height={verticalScale(20)}
                borderRadius={scale(4)}
                baseColor={SKELETON_THEME.button.baseColor}
                highlightColor={SKELETON_THEME.button.highlightColor}
              />
              <Shimmer
                width={scale(70)}
                height={verticalScale(20)}
                borderRadius={scale(4)}
                baseColor={SKELETON_THEME.button.baseColor}
                highlightColor={SKELETON_THEME.button.highlightColor}
              />
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default QueueHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skeletonHeaderContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(16),
  },
  topContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    marginBottom: verticalScale(16),
  },
  filterActionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: scale(10),
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: scale(36),
    borderWidth: 1,
    borderRadius: scale(18),
    paddingHorizontal: scale(12),
  },
  searchInput: {
    flex: 1,
    fontSize: scale(12),
    padding: 0,
  },
  toolsRightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  toolButton: {
    width: scale(36),
    height: scale(36),
    borderWidth: 1,
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
  },
  filterLabelButton: {
    flexDirection: "row",
    alignItems: "center",
    height: scale(36),
    borderWidth: 1,
    borderRadius: scale(18),
    paddingHorizontal: scale(14),
  },
  filterIcon: {
    marginRight: scale(6),
  },
  filterButtonText: {
    fontSize: scale(12),
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  listContent: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
    gap: verticalScale(14),
  },
  historyCard: {
    borderWidth: 1,
    padding: scale(14),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  profileRow: {
    flexDirection: "row",
    gap: scale(12),
    flex: 1,
  },
  avatarFrame: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
  },
  metaData: {
    flex: 1,
  },
  clientName: {
    fontSize: scale(14),
    fontWeight: "600",
  },
  barberText: {
    fontSize: scale(12),
    marginTop: verticalScale(2),
  },
  serviceText: {
    fontSize: scale(12),
    marginTop: verticalScale(1),
  },
  priceDateBlock: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: scale(14),
    fontWeight: "700",
  },
  dateText: {
    fontSize: scale(11),
    marginTop: verticalScale(4),
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: verticalScale(12),
  },
  cardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  metricMiniBadge: {
    flexDirection: "row",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(4),
    borderWidth: 1,
    flex: 1,
    maxWidth: "31%",
  },
  metricBadgeText: {
    fontSize: scale(11),
  },
  loaderFooter: {
    paddingVertical: verticalScale(16),
    alignItems: "center",
  },
  emptyContainer: {
    paddingVertical: verticalScale(80),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(32),
  },
  emptyIconCard: {
    width: scale(54),
    height: scale(54),
    borderRadius: scale(14),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: verticalScale(16),
  },
  emptyIconAccentDot: {
    position: "absolute",
    top: scale(12),
    right: scale(14),
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
  },
  emptyTitleText: {
    fontSize: scale(14),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: verticalScale(6),
  },
  emptySubtitleText: {
    fontSize: scale(11),
    textAlign: "center",
    lineHeight: scale(16),
    maxWidth: scale(260),
    opacity: 0.6,
  },
  modalOverlayScrim: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  bottomSheetContent: {
    width: "100%",
    maxHeight: "75%",
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    borderTopWidth: 1,
    padding: scale(20),
    paddingBottom: verticalScale(32),
  },
  sheetScrollContainer: {
    paddingBottom: verticalScale(16),
  },
  checkboxRowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    borderBottomWidth: 1,
  },
  checkboxBox: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(4),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  checkboxLabelText: {
    fontSize: scale(13),
  },
  sheetActionButtonsRow: {
    flexDirection: "row",
    gap: scale(10),
    marginTop: verticalScale(12),
  },
  sheetResetButton: {
    flex: 1,
    height: scale(40),
    borderRadius: scale(10),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  sheetResetText: {
    fontWeight: "600",
    fontSize: scale(12),
  },
  sheetCloseButton: {
    flex: 1,
    height: scale(40),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  sheetCloseButtonText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: scale(12),
  },
});

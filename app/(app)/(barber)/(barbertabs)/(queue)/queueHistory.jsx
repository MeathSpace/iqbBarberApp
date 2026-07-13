// import React, { useState } from "react";
// import { FlatList, Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";
// import { Ionicons, Feather, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

// import BarberHeader from "../../../../../components/Header/BarberHeader"; // Adjust path as needed
// import { darkTheme } from "../../../../../constants/appTheme";

// const HISTORIC_DATA = [
//   { id: "1", clientName: "Shyam sharma", barberName: "Bob", service: "Massage", price: "₹ 345", date: "23/06/2026", status: "Served", mode: "Walk-In", type: "Regular" },
//   { id: "2", clientName: "Abc", barberName: "John Doe", service: "Haircut", price: "₹ 100", date: "08/06/2026", status: "Cancelled", mode: "Mobile", type: "VIP" },
//   { id: "3", clientName: "Abc", barberName: "John Doe", service: "Massage, Haircut", price: "₹ 445", date: "08/06/2026", status: "Cancelled", mode: "Walk-In", type: "Regular" },
//   { id: "4", clientName: "Abc", barberName: "John Doe", service: "Massage", price: "₹ 345", date: "08/06/2026", status: "Served", mode: "Web", type: "Regular" },
//   { id: "5", clientName: "Rahul Sen", barberName: "Alex Crew", service: "Beard Trim", price: "₹ 150", date: "07/06/2026", status: "Served", mode: "Walk-In", type: "Regular" },
//   { id: "6", clientName: "Vikram Roy", barberName: "Bob", service: "Hair Color", price: "₹ 600", date: "06/06/2026", status: "Served", mode: "Mobile", type: "VIP" },
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
//       <BarberHeader title="Queue History" subTitle="Log of past walk-in customers and arrivals" showBack={false} />
      
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


import React, { useState, useMemo, useCallback } from "react";
import { FlatList, Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import BarberHeader from "../../../../../components/Header/BarberHeader"; // Adjust path as needed
import { darkTheme } from "../../../../../constants/appTheme";

const HISTORIC_DATA = [
  { id: "1", clientName: "Shyam sharma", barberName: "Bob", service: "Massage", price: "₹ 345", date: "23/06/2026", status: "Served", mode: "Walk-In", type: "Regular" },
  { id: "2", clientName: "Abc", barberName: "John Doe", service: "Haircut", price: "₹ 100", date: "08/06/2026", status: "Cancelled", mode: "Mobile", type: "VIP" },
  { id: "3", clientName: "Abc", barberName: "John Doe", service: "Massage, Haircut", price: "₹ 445", date: "08/06/2026", status: "Cancelled", mode: "Walk-In", type: "Regular" },
  { id: "4", clientName: "Abc", barberName: "John Doe", service: "Massage", price: "₹ 345", date: "08/06/2026", status: "Served", mode: "Web", type: "Regular" },
  { id: "5", clientName: "Rahul Sen", barberName: "Alex Crew", service: "Beard Trim", price: "₹ 150", date: "07/06/2026", status: "Served", mode: "Walk-In", type: "Regular" },
  { id: "6", clientName: "Vikram Roy", barberName: "Bob", service: "Hair Color", price: "₹ 600", date: "06/06/2026", status: "Served", mode: "Mobile", type: "VIP" },
];

const QueueHistory = () => {
  const [history] = useState(HISTORIC_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Filter dataset dynamically based on Client Name, Barber Name, or Services
  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return history;
    const cleanQuery = searchQuery.toLowerCase();
    return history.filter(
      (item) =>
        item.clientName.toLowerCase().includes(cleanQuery) ||
        item.barberName.toLowerCase().includes(cleanQuery) ||
        item.service.toLowerCase().includes(cleanQuery)
    );
  }, [searchQuery, history]);

  // Pull-to-refresh routine trigger
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Simulate real-world network/database fetch delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderHistoryItem = ({ item }) => {
    const isServed = item.status === "Served";
    const isVIP = item.type === "VIP";
    
    const getModeIcon = (mode) => {
      if (mode === "Walk-In") return "walk";
      if (mode === "Mobile") return "smartphone";
      return "globe-outline";
    };

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
              <Ionicons name="person" size={scale(16)} color={darkTheme.colors.textMuted} />
            </View>
            <View style={styles.metaData}>
              <Text style={[darkTheme.typography.cardTitle, styles.clientName]}>
                {item.clientName}
              </Text>
              <Text style={[darkTheme.typography.bodyMuted, styles.barberText]}>
                Stylist: {item.barberName}
              </Text>
              <Text style={[darkTheme.typography.bodyMuted, styles.serviceText]}>
                {item.service}
              </Text>
            </View>
          </View>

          <View style={styles.priceDateBlock}>
            <Text style={[darkTheme.typography.bodyMain, styles.priceText, { color: darkTheme.colors.accent }]}>
              {item.price}
            </Text>
            <Text style={[darkTheme.typography.bodyMuted, styles.dateText]}>
              {item.date}
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: darkTheme.colors.border }]} />

        {/* Footer Metrics Row */}
        <View style={styles.cardFooterRow}>
          {/* Booking Mode */}
          <View style={[styles.metricMiniBadge, { backgroundColor: "rgba(255, 255, 255, 0.03)", borderColor: darkTheme.colors.border }]}>
            <Ionicons 
              name={getModeIcon(item.mode)} 
              size={scale(11)} 
              color={darkTheme.colors.textMuted} 
              style={{ marginRight: scale(4) }}
            />
            <Text style={[darkTheme.typography.bodyMuted, styles.metricBadgeText, { color: darkTheme.colors.textMuted }]}>
              {item.mode}
            </Text>
          </View>

          {/* Customer Type */}
          <View 
            style={[
              styles.metricMiniBadge, 
              { 
                backgroundColor: isVIP ? "rgba(255, 149, 0, 0.08)" : "rgba(255, 255, 255, 0.03)",
                borderColor: isVIP ? "rgba(255, 149, 0, 0.2)" : darkTheme.colors.border 
              }
            ]}
          >
            <MaterialCommunityIcons 
              name={isVIP ? "crown" : "account"} 
              size={scale(11)} 
              color={isVIP ? darkTheme.colors.accent : darkTheme.colors.textMuted} 
              style={{ marginRight: scale(4) }}
            />
            <Text style={[darkTheme.typography.bodyMuted, styles.metricBadgeText, { color: isVIP ? darkTheme.colors.accent : darkTheme.colors.textMuted }]}>
              {item.type}
            </Text>
          </View>

          {/* Status Badge */}
          <View 
            style={[
              styles.metricMiniBadge, 
              { 
                backgroundColor: isServed ? "rgba(52, 199, 89, 0.08)" : "rgba(255, 59, 48, 0.08)",
                borderColor: isServed ? "rgba(52, 199, 89, 0.2)" : "rgba(255, 59, 48, 0.2)"
              }
            ]}
          >
            <Ionicons 
              name={isServed ? "checkmark-circle" : "close-circle"} 
              size={scale(11)} 
              color={isServed ? darkTheme.status.success.text : darkTheme.status.error.text} 
              style={{ marginRight: scale(4) }}
            />
            <Text 
              style={[
                darkTheme.typography.bodyMuted, 
                styles.metricBadgeText,
                { color: isServed ? darkTheme.status.success.text : darkTheme.status.error.text, fontWeight: "600" }
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      {/* Retained Main App Header */}
      <BarberHeader title="Queue History" subTitle="Log of past walk-in customers and arrivals" showBack={false} />
      
      <View style={styles.topContainer}>
        {/* Replaced Old Buttons Row with This Dedicated Search Field */}
        <View style={[styles.searchBarContainer, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
          <Ionicons name="search" size={scale(16)} color={darkTheme.colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: darkTheme.colors.textMain }]}
            placeholder="Search client, stylist, or service..."
            placeholderTextColor={darkTheme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && Platform.OS === "android" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={scale(16)} color={darkTheme.colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={10}
        removeClippedSubviews={Platform.OS === "android"}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={darkTheme.colors.accent}
            colors={[darkTheme.colors.accent]}
            backgroundColor="transparent"
          />
        }
      />
    </SafeAreaView>
  );
};

export default QueueHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    marginBottom: verticalScale(12),
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(42),
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    width: "100%",
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    fontSize: scale(13),
    paddingVertical: 0,
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
});
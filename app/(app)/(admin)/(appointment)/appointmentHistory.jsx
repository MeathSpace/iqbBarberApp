import React, { useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

import Header from "../../../../components/Header/Header";
import { darkTheme } from "../../../../constants/appTheme";

const HISTORIC_DATA = [
  { id: "1", clientName: "Shyam sharma", barberName: "Bob", service: "Massage", price: "₹ 345", date: "23/06/2026", status: "Served" },
  { id: "2", clientName: "Abc", barberName: "John Doe", service: "Haircut", price: "₹ 100", date: "08/06/2026", status: "Cancelled" },
  { id: "3", clientName: "Abc", barberName: "John Doe", service: "Massage, Haircut", price: "₹ 445", date: "08/06/2026", status: "Cancelled" },
  { id: "4", clientName: "Abc", barberName: "John Doe", service: "Massage", price: "₹ 345", date: "08/06/2026", status: "Served" },
  { id: "5", clientName: "Rahul Sen", barberName: "Alex Crew", service: "Beard Trim", price: "₹ 150", date: "07/06/2026", status: "Served" },
  { id: "6", clientName: "Vikram Roy", barberName: "Bob", service: "Hair Color", price: "₹ 600", date: "06/06/2026", status: "Served" },
  { id: "7", clientName: "Sam Wright", barberName: "Sarah", service: "Shave", price: "₹ 120", date: "05/06/2026", status: "Cancelled" },
  { id: "8", clientName: "Kabir Mehta", barberName: "John Doe", service: "Haircut", price: "₹ 200", date: "04/06/2026", status: "Served" },
  { id: "9", clientName: "Rohan Bajaj", barberName: "Alex Crew", service: "Facial", price: "₹ 400", date: "03/06/2026", status: "Served" },
  { id: "10", clientName: "David Miller", barberName: "Sarah", service: "Massage", price: "₹ 345", date: "02/06/2026", status: "Served" },
];

const AppointmentHistory = () => {
  const [history] = useState(HISTORIC_DATA);

  const renderHistoryItem = ({ item }) => {
    const isServed = item.status === "Served";

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

        <View style={styles.cardFooterRow}>
          <Text style={[darkTheme.typography.bodyMuted, { fontSize: scale(11) }]}>
            Status Profile
          </Text>
          
          <View 
            style={[
              styles.statusBadge, 
              { 
                backgroundColor: isServed ? "rgba(52, 199, 89, 0.1)" : "rgba(255, 59, 48, 0.1)",
                borderRadius: darkTheme.layout.borderRadiusSmall 
              }
            ]}
          >
            <Ionicons 
              name={isServed ? "checkmark-circle" : "close-circle"} 
              size={scale(13)} 
              color={isServed ? darkTheme.status.success.text : darkTheme.status.error.text} 
              style={{ marginRight: scale(4) }}
            />
            <Text 
              style={[
                darkTheme.typography.bodyMuted, 
                { color: isServed ? darkTheme.status.success.text : darkTheme.status.error.text, fontWeight: "600", fontSize: scale(11) }
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

      <Header title="Appoinment History" subTitle="Log of past walk-in customers and arrivals" showBack={false} />

      <View style={styles.topContainer}>
        <View style={styles.filterActionRow}>
          
          <View style={styles.toolsLeftGroup}>
            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.toolButton, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
            >
              <Ionicons name="refresh" size={scale(15)} color={darkTheme.colors.textMain} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.toolButton, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
            >
              <Feather name="calendar" size={scale(14)} color={darkTheme.colors.textMain} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.toolButton, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
            >
              <Ionicons name="search" size={scale(14)} color={darkTheme.colors.textMain} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            activeOpacity={0.8}
            style={[styles.filterLabelButton, { backgroundColor: "rgba(255, 149, 0, 0.1)", borderColor: darkTheme.colors.accent }]}
          >
            <MaterialIcons name="filter-list" size={scale(15)} color={darkTheme.colors.accent} style={styles.filterIcon} />
            <Text style={[darkTheme.typography.bodyMain, styles.filterButtonText, { color: darkTheme.colors.accent }]}>
              Filter
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={10}
        removeClippedSubviews={Platform.OS === "android"}
      />
    </SafeAreaView>
  );
};

export default AppointmentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  toolsLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
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
  statusBadge: {
    flexDirection: "row",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    alignItems: "center",
    justifyContent: "center",
  },
});
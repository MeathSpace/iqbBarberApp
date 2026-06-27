import React, { useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons, Feather } from "@expo/vector-icons";

import Header from "../../../../components/Header/Header"; // Adjust path as needed
import { darkTheme } from "../../../../constants/appTheme";

const SUBSCRIPTION_DATA = [
  {
    id: "1",
    salonName: "Modern Unisex Salon",
    items: [
      { id: "s1_1", type: "Queue", status: "Paid", date: "14 Aug, 2027 2:38 PM", action: "Renew" },
      { id: "s1_2", type: "Appointment", status: "Paid", date: "16 May, 2027 2:35 PM", action: "Renew" }
    ]
  },
  {
    id: "2",
    salonName: "Salon 2",
    items: [
      { id: "s2_1", type: "Queue", status: "Paid", date: "27 Mar, 2025 9:06 AM", action: "Renew" },
      { id: "s2_2", type: "Appointment", status: "select a plan", date: "select a plan", action: "Buy" }
    ]
  },
  {
    id: "3",
    salonName: "Salon 3",
    items: [
      { id: "s3_1", type: "Queue", status: "Free", date: "15 Mar, 2025 6:56 AM", action: "Buy" },
      { id: "s3_2", type: "Appointment", status: "Paid", date: "30 May, 2025 6:26 AM", action: "Renew" }
    ]
  },
  {
    id: "4",
    salonName: "Salon 4",
    items: [
      { id: "s4_1", type: "Queue", status: "Paid", date: "12 Jan, 2027 4:00 PM", action: "Renew" },
      { id: "s4_2", type: "Appointment", status: "select a plan", date: "select a plan", action: "Buy" }
    ]
  },
  {
    id: "5",
    salonName: "Elite Barber Hub",
    items: [
      { id: "s5_1", type: "Queue", status: "Paid", date: "19 Nov, 2026 11:15 AM", action: "Renew" },
      { id: "s5_2", type: "Appointment", status: "Paid", date: "05 Dec, 2026 1:45 PM", action: "Renew" }
    ]
  }
];

const SubscriptionsList = () => {
  const [subscriptions] = useState(SUBSCRIPTION_DATA);

  const renderSubscriptionCard = ({ item }) => (
    <View
      style={[
        styles.eliteCard,
        {
          backgroundColor: darkTheme.colors.card,
          borderColor: "rgba(255, 255, 255, 0.06)",
          borderRadius: scale(16),
        },
      ]}
    >
      {/* Structural Card Top Bar */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <View style={[styles.brandCircle, { backgroundColor: "rgba(255, 255, 255, 0.03)", borderColor: darkTheme.colors.border }]}>
            <Ionicons name="storefront-sharp" size={scale(14)} color={darkTheme.colors.accent} />
          </View>
          <View>
            <Text style={[darkTheme.typography.cardTitle, styles.salonTitle]}>
              {item.salonName}
            </Text>
            <Text style={styles.branchCountText}>
              Active Management Profile
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButtonActive}>
          <Feather name="arrow-up-right" size={scale(15)} color={darkTheme.colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Sub-Items Premium Layer Inner Blocks */}
      <View style={styles.subServicesContainer}>
        {item.items.map((subItem) => {
          const hasActivePlan = subItem.status !== "select a plan";
          const isFreeTier = subItem.status === "Free";
          const isRenewAction = subItem.action === "Renew";
          const isQueue = subItem.type === "Queue";

          return (
            <View
              key={subItem.id}
              style={[
                styles.luxuryServiceRow,
                { 
                  backgroundColor: "rgba(255, 255, 255, 0.015)",
                  borderColor: "rgba(255, 255, 255, 0.04)" 
                },
              ]}
            >
              <View style={styles.rowMainContent}>
                
                {/* Structural Left Column with Context Icons */}
                <View style={styles.iconContextWrapper}>
                  <View style={[styles.typeIconBox, { backgroundColor: isQueue ? "rgba(255, 149, 0, 0.06)" : "rgba(10, 132, 255, 0.06)" }]}>
                    <Ionicons 
                      name={isQueue ? "flash-sharp" : "calendar-sharp"} 
                      size={scale(13)} 
                      color={isQueue ? darkTheme.colors.accent : "#0A84FF"} 
                    />
                  </View>
                </View>

                {/* Core Descriptive Text Block */}
                <View style={styles.infoColumn}>
                  <View style={styles.typeBadgeRow}>
                    <Text style={[darkTheme.typography.bodyMain, styles.serviceTypeText]}>
                      {subItem.type}
                    </Text>
                    
                    {hasActivePlan && (
                      <View 
                        style={[
                          styles.planBadge, 
                          {
                            backgroundColor: isFreeTier
                              ? "rgba(10, 132, 255, 0.08)"
                              : "rgba(52, 199, 89, 0.08)",
                          },
                        ]}
                      >
                        <View style={[styles.pulseDot, { backgroundColor: isFreeTier ? "#0A84FF" : darkTheme.status.success.text }]} />
                        <Text 
                          style={[
                            styles.badgeText, 
                            { color: isFreeTier ? "#0A84FF" : darkTheme.status.success.text }
                          ]}
                        >
                          {subItem.status}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text style={[darkTheme.typography.bodyMuted, styles.timestampText]}>
                    {subItem.date}
                  </Text>
                </View>

                {/* Micro-Interaction Action Target Trigger */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: isRenewAction ? "rgba(255,255,255,0.03)" : darkTheme.colors.accent,
                      borderColor: isRenewAction ? "rgba(255,255,255,0.1)" : "transparent",
                      borderWidth: isRenewAction ? 1 : 0,
                      borderRadius: scale(6),
                    },
                  ]}
                >
                  <Text
                    style={[
                      darkTheme.typography.bodyMain,
                      styles.actionText,
                      {
                        color: isRenewAction ? darkTheme.colors.textMain : "#1C1C1E",
                      },
                    ]}
                  >
                    {subItem.action}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header
        title="Subscriptions"
        subTitle="Manage active salon plans"
        showBack={false}
      />

      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id}
        renderItem={renderSubscriptionCard}
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

export default SubscriptionsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
    gap: verticalScale(16),
  },
  eliteCard: {
    borderWidth: 1,
    padding: scale(16),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  brandCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(10),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  salonTitle: {
    fontSize: scale(14),
    fontWeight: "700",
    letterSpacing: -0.1,
  },
  branchCountText: {
    fontSize: scale(11),
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: verticalScale(2),
  },
  moreButtonActive: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(6),
    justifyContent: "center",
    alignItems: "center",
  },
  subServicesContainer: {
    width: "100%",
    gap: verticalScale(10),
  },
  luxuryServiceRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: scale(10),
    overflow: "hidden",
  },
  rowMainContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
  },
  iconContextWrapper: {
    marginRight: scale(10),
  },
  typeIconBox: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  infoColumn: {
    flex: 1,
    paddingRight: scale(8),
  },
  typeBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  serviceTypeText: {
    fontSize: scale(13),
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  planBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: scale(4),
    gap: scale(4),
  },
  pulseDot: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
  },
  badgeText: {
    fontSize: scale(9),
    fontWeight: "700",
    letterSpacing: 0.2,
    textTransform: "uppercase",
  },
  timestampText: {
    fontSize: scale(11),
    marginTop: verticalScale(4),
    color: "rgba(255,255,255,0.35)",
  },
  actionButton: {
    paddingHorizontal: scale(14),
    height: scale(28),
    minWidth: scale(72),
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontWeight: "700",
    fontSize: scale(11),
  },
});
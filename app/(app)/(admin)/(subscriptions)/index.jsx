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
      { id: "s1_1", type: "Queue", status: "Paid", date: "14 Aug, 2027", duration: "519days", action: "Renew" },
      { id: "s1_2", type: "Appointment", status: "Paid", date: "16 May, 2027", duration: "429days", action: "Renew" }
    ]
  },
  {
    id: "2",
    salonName: "Salon 2",
    items: [
      { id: "s2_1", type: "Queue", status: "Paid", date: "27 Mar, 2025", duration: "120days", action: "Renew" },
      { id: "s2_2", type: "Appointment", status: "Select plan", date: "No plan active", duration: "--", action: "Buy" }
    ]
  },
  {
    id: "3",
    salonName: "Salon 3",
    items: [
      { id: "s3_1", type: "Queue", status: "Free Tier", date: "15 Mar, 2025", duration: "30days", action: "Buy" },
      { id: "s3_2", type: "Appointment", status: "Paid", date: "30 May, 2025", duration: "489days", action: "Renew" }
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
          borderRadius: scale(14),
        },
      ]}
    >
      {/* Structural Card Top Bar (Salon Identity Group) */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <View style={[styles.brandCircle, { backgroundColor: "rgba(255, 255, 255, 0.02)", borderColor: darkTheme.colors.border }]}>
            <Ionicons name="storefront-sharp" size={scale(13)} color={darkTheme.colors.accent} />
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
          <Feather name="arrow-up-right" size={scale(14)} color={darkTheme.colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Sub-Items Rebuilt into a 10/10 Segmented Sub-Card Grid Matrix */}
      <View style={styles.subServicesContainer}>
        {item.items.map((subItem) => {
          const isPaid = subItem.status === "Paid";
          const isFree = subItem.status === "Free Tier";
          const isRenew = subItem.action === "Renew";

          return (
            <View
              key={subItem.id}
              style={[
                styles.luxuryServiceInnerBlock,
                { 
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderColor: "rgba(255, 255, 255, 0.04)" 
                },
              ]}
            >
              {/* Header inside row: Dynamic Label ID & Action Control */}
              <View style={styles.innerBlockTopRow}>
                <View>
                  <Text style={styles.innerBlockIdText}>
                    IQB-{subItem.type.toUpperCase()}-00101
                  </Text>
                  <Text style={styles.innerBlockSubLabel}>{subItem.type} Architecture</Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[
                    styles.gridActionButton,
                    {
                      backgroundColor: isRenew ? "rgba(255, 149, 0, 0.08)" : darkTheme.colors.accent,
                      borderColor: isRenew ? "rgba(255, 149, 0, 0.2)" : "transparent",
                      borderWidth: isRenew ? 1 : 0,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.gridActionText,
                      { color: isRenew ? darkTheme.colors.accent : "#000000" },
                    ]}
                  >
                    {subItem.action}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 3-Column Metrics Data Grid inspired by Screenshot 2026-07-03 at 2.09.28 PM.jpg */}
              <View style={styles.innerBlockMetricsGrid}>
                <View style={styles.metricColumn}>
                  <Text style={styles.metricLabelText}>PURCHASED</Text>
                  <Text style={styles.metricValueText}>13 Mar 2026</Text>
                </View>
                
                <View style={styles.verticalGridHairline} />

                <View style={styles.metricColumn}>
                  <Text style={styles.metricLabelText}>EXPIRES</Text>
                  <Text style={styles.metricValueText}>{subItem.date}</Text>
                </View>

                <View style={styles.verticalGridHairline} />

                <View style={styles.metricColumn}>
                  <Text style={styles.metricLabelText}>DURATION</Text>
                  <Text style={styles.metricValueText}>{subItem.duration}</Text>
                </View>
              </View>

              {/* Bottom Metadata & Status Layout Footer */}
              <View style={styles.innerBlockBottomRow}>
                <View style={styles.metaLeftGroup}>
                  <Text style={styles.metaLabelMicro}>TRANSACTION ID</Text>
                  <Text style={styles.metaValueMicro} numberOfLines={1}>
                    pi_3TAuBt6v7Mtr8QXs1P{subItem.id}
                  </Text>
                </View>

                <View style={[styles.statusMicroBadge, { backgroundColor: isPaid || isFree ? "rgba(52, 199, 89, 0.08)" : "rgba(255, 59, 48, 0.08)" }]}>
                  <Text style={[styles.statusBadgeText, { color: isPaid || isFree ? "#34C759" : "#FF3B30" }]}>
                    {isPaid ? "Paid" : isFree ? "Free" : "Hold"}
                  </Text>
                </View>
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
    padding: scale(14),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(14),
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  brandCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(8),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  salonTitle: {
    fontSize: scale(13.5),
    fontWeight: "700",
    letterSpacing: -0.1,
  },
  branchCountText: {
    fontSize: scale(10.5),
    color: "rgba(255, 255, 255, 0.35)",
    marginTop: verticalScale(1),
  },
  moreButtonActive: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(6),
    justifyContent: "center",
    alignItems: "center",
  },
  subServicesContainer: {
    width: "100%",
    gap: verticalScale(12),
  },
  luxuryServiceInnerBlock: {
    width: "100%",
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(12),
  },
  innerBlockTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  innerBlockIdText: {
    color: "#FFFFFF",
    fontSize: scale(12.5),
    fontWeight: "700",
    letterSpacing: 0.1,
  },
  innerBlockSubLabel: {
    color: "rgba(255, 255, 255, 0.35)",
    fontSize: scale(10.5),
    marginTop: verticalScale(1),
  },
  gridActionButton: {
    paddingHorizontal: scale(14),
    height: verticalScale(24),
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
    minWidth: scale(64),
  },
  gridActionText: {
    fontSize: scale(11),
    fontWeight: "700",
  },
  innerBlockMetricsGrid: {
    flexDirection: "row",
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(8),
    alignItems: "center",
  },
  metricColumn: {
    flex: 1,
  },
  metricLabelText: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: scale(8.5),
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  metricValueText: {
    color: "#FFFFFF",
    fontSize: scale(11),
    fontWeight: "600",
    marginTop: verticalScale(3),
  },
  verticalGridHairline: {
    width: 1,
    height: verticalScale(16),
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginHorizontal: scale(6),
  },
  innerBlockBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  metaLeftGroup: {
    flex: 1,
    paddingRight: scale(12),
  },
  metaLabelMicro: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: scale(8),
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  metaValueMicro: {
    color: "rgba(255, 255, 255, 0.45)",
    fontSize: scale(10),
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginTop: verticalScale(1),
  },
  statusMicroBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: scale(4),
  },
  statusBadgeText: {
    fontSize: scale(9.5),
    fontWeight: "700",
  },
});
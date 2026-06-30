import React, { useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Header from "../../../../components/Header/Header"; // Adjust path as needed
import { darkTheme } from "../../../../constants/appTheme";
import { useRouter } from "expo-router";

const REPORT_CATEGORIES = ["All", "Queue", "Appointment"];

const REPORTS_DATA = [
  {
    id: "r1",
    title: "Performance dashboard appointment",
    description: "Daily total payment received by each barber.",
    category: "Appointment",
  },
  {
    id: "r2",
    title: "Working hours dashboard",
    description: "Amount of busy time per day (service time)",
    category: "Appointment",
  },
  {
    id: "r3",
    title: "Queue serve",
    description: "General overview of queue trends and patterns, including cancellations and no-shows.",
    category: "Queue",
  },
  {
    id: "r4",
    title: "Queue cancellations & no-show summary",
    description: "Insight into queue cancellations and no-shows.",
    category: "Queue",
  }
];

const ReportsDashboard = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter()

  // Filters items matching selected category tab state
  const filteredReports = REPORTS_DATA.filter(
    (report) => activeCategory === "All" || report.category === activeCategory
  );

  const renderReportCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.reportCard,
        {
          backgroundColor: darkTheme.colors.card,
          borderColor: darkTheme.colors.border,
          borderRadius: darkTheme.layout.borderRadiusLarge,
        },
      ]}
      onPress={() => {
        router.push("/charts")
      }}
    >
      <View style={styles.cardContentRow}>
        {/* Re-styled Icon Box: White background removed, uses signature amber highlight */}
        <View style={[styles.iconWrapperCircle, { backgroundColor: "rgba(255, 149, 0, 0.1)", borderColor: "rgba(255, 149, 0, 0.15)" }]}>
          <MaterialCommunityIcons 
            name="chart-bar" 
            size={scale(15)} 
            color={darkTheme.colors.accent} 
          />
        </View>

        {/* Core Description Text Block */}
        <View style={styles.textContainerColumn}>
          <Text style={[darkTheme.typography.cardTitle, styles.reportTitleText, { color: darkTheme.colors.textMain }]}>
            {item.title}
          </Text>
          <Text style={[darkTheme.typography.bodyMuted, styles.reportDescriptionText, { color: darkTheme.colors.textMuted }]}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header title="Reports" subTitle="Live store analytical reports" showBack={false} />

      {/* Styled text-based selector matching your brand's highlight color rules */}
      <View style={styles.tabBarMainRow}>
        {REPORT_CATEGORIES.map((category) => {
          const isSelected = activeCategory === category;
          return (
            <TouchableOpacity
              key={category}
              activeOpacity={0.8}
              onPress={() => setActiveCategory(category)}
              style={[
                styles.filterCategoryTab,
                {
                  backgroundColor: isSelected ? "rgba(255, 149, 0, 0.1)" : "transparent",
                  borderColor: isSelected ? darkTheme.colors.accent : "transparent",
                  borderWidth: isSelected ? 1 : 0,
                }
              ]}
            >
              <Text
                style={[
                  darkTheme.typography.bodyMain,
                  styles.tabLabelText,
                  {
                    color: isSelected ? darkTheme.colors.accent : darkTheme.colors.textMuted,
                    fontWeight: isSelected ? "700" : "500",
                  }
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Primary Analytics Feed Stack */}
      <FlatList
        data={filteredReports}
        keyExtractor={(item) => item.id}
        renderItem={renderReportCard}
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

export default ReportsDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarMainRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    gap: scale(10),
    marginTop: verticalScale(4),
    marginBottom: verticalScale(16),
  },
  filterCategoryTab: {
    paddingHorizontal: scale(16),
    height: scale(32),
    borderRadius: scale(16),
    justifyContent: "center",
    alignItems: "center",
  },
  tabLabelText: {
    fontSize: scale(12),
    letterSpacing: -0.1,
  },
  listContent: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
    gap: verticalScale(14),
  },
  reportCard: {
    borderWidth: 1,
    padding: scale(14),
  },
  cardContentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  iconWrapperCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(6),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(14),
    marginTop: verticalScale(2),
  },
  textContainerColumn: {
    flex: 1,
    gap: verticalScale(4),
  },
  reportTitleText: {
    fontSize: scale(14),
    fontWeight: "600",
    lineHeight: scale(18),
  },
  reportDescriptionText: {
    fontSize: scale(12),
    lineHeight: scale(16),
  },
});
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import BarberHeader from "../../../../components/Header/BarberHeader";
import { darkTheme } from "../../../../constants/appTheme";

const REPORT_CATEGORIES = ["All", "Queue", "Appointment"];

const REPORTS_DATA = [
  {
    id: "r1",
    reportType: "appointmentPerformance",
    title: "Performance dashboard appointment",
    description: "Daily total payment received by each barber.",
    category: "Appointment",
  },
  {
    id: "r2",
    reportType: "appointmentWorkingHours",
    title: "Working hours dashboard",
    description: "Amount of busy time per day (service time)",
    category: "Appointment",
  },
  {
    id: "r3",
    reportType: "appointmentServed",
    title: "Appointment serve",
    description: "Overview of served appointments and check-ins.",
    category: "Appointment",
  },
  {
    id: "r4",
    reportType: "appointmentCancelled",
    title: "Appointment cancellations summary",
    description: "Insight into appointment cancellations and no-shows.",
    category: "Appointment",
  },
  {
    id: "r5",
    reportType: "queueServed",
    title: "Queue serve",
    description:
      "General overview of queue trends and patterns, including cancellations and no-shows.",
    category: "Queue",
  },
  {
    id: "r6",
    reportType: "queueCancelled",
    title: "Queue cancellations & no-show summary",
    description: "Insight into queue cancellations and no-shows.",
    category: "Queue",
  },
  {
    id: "r7",
    reportType: "queuePerformance",
    title: "Performance dashboard queue",
    description: "Revenue and performance breakdown from walk-in queue.",
    category: "Queue",
  },
  {
    id: "r8",
    reportType: "queueWorkingHours",
    title: "Queue working hours",
    description: "Amount of active service time spent on queue customers.",
    category: "Queue",
  },
];

const ReportsDashboard = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();

  const filteredReports = REPORTS_DATA.filter(
    (report) => activeCategory === "All" || report.category === activeCategory,
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
        router.push({
          pathname: "/(barber)/(reports)/charts",
          params: {
            reportType: item.reportType,
            title: item.title,
            description: item.description,
          },
        });
      }}
    >
      <View style={styles.cardContentRow}>
        <View
          style={[
            styles.iconWrapperCircle,
            {
              backgroundColor: "rgba(255, 149, 0, 0.1)",
              borderColor: "rgba(255, 149, 0, 0.15)",
            },
          ]}
        >
          <MaterialCommunityIcons
            name="chart-bar"
            size={scale(15)}
            color={darkTheme.colors.accent}
          />
        </View>

        <View style={styles.textContainerColumn}>
          <Text
            style={[
              darkTheme.typography.cardTitle,
              styles.reportTitleText,
              { color: darkTheme.colors.textMain },
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              darkTheme.typography.bodyMuted,
              styles.reportDescriptionText,
              { color: darkTheme.colors.textMuted },
            ]}
          >
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <BarberHeader
        title="Reports"
        subTitle="Live store analytical reports"
        showBack={false}
      />

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
                  backgroundColor: isSelected
                    ? "rgba(255, 149, 0, 0.1)"
                    : "transparent",
                  borderColor: isSelected
                    ? darkTheme.colors.accent
                    : "transparent",
                  borderWidth: isSelected ? 1 : 0,
                },
              ]}
            >
              <Text
                style={[
                  darkTheme.typography.bodyMain,
                  styles.tabLabelText,
                  {
                    color: isSelected
                      ? darkTheme.colors.accent
                      : darkTheme.colors.textMuted,
                    fontWeight: isSelected ? "700" : "500",
                  },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

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

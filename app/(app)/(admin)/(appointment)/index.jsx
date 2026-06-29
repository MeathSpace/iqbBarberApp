import React, { useState, useMemo } from "react";
import { FlatList, Platform, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import Header from "../../../../components/Header/Header"; // Adjust path as needed
import { darkTheme } from "../../../../constants/appTheme";

// Comprehensive 14-Day Dataset Matrix
const DATA_TIMELINE = [
  { id: "d1", dayName: "Mo", dayNum: "29", monthLabel: "June 2026", dateStr: "Jun 29, Monday", weekIndex: 0 },
  { id: "d2", dayName: "Tu", dayNum: "30", monthLabel: "June 2026", dateStr: "Jun 30, Tuesday", weekIndex: 0 },
  { id: "d3", dayName: "We", dayNum: "01", monthLabel: "July 2026", dateStr: "Jul 01, Wednesday", weekIndex: 0 },
  { id: "d4", dayName: "Th", dayNum: "02", monthLabel: "July 2026", dateStr: "Jul 02, Thursday", weekIndex: 0 },
  { id: "d5", dayName: "Fr", dayNum: "03", monthLabel: "July 2026", dateStr: "Jul 03, Friday", weekIndex: 0 },
  { id: "d6", dayName: "Sa", dayNum: "04", monthLabel: "July 2026", dateStr: "Jul 04, Saturday", weekIndex: 0 },
  { id: "d7", dayName: "Su", dayNum: "05", monthLabel: "July 2026", dateStr: "Jul 05, Sunday", weekIndex: 0 },
  { id: "d8", dayName: "Mo", dayNum: "06", monthLabel: "July 2026", dateStr: "Jul 06, Monday", weekIndex: 1 },
  { id: "d9", dayName: "Tu", dayNum: "07", monthLabel: "July 2026", dateStr: "Jul 07, Tuesday", weekIndex: 1 },
  { id: "d10", dayName: "We", dayNum: "08", monthLabel: "July 2026", dateStr: "Jul 08, Wednesday", weekIndex: 1 },
  { id: "d11", dayName: "Th", dayNum: "09", monthLabel: "July 2026", dateStr: "Jul 09, Thursday", weekIndex: 1 },
  { id: "d12", dayName: "Fr", dayNum: "10", monthLabel: "July 2026", dateStr: "Jul 10, Friday", weekIndex: 1 },
  { id: "d13", dayName: "Sa", dayNum: "11", monthLabel: "July 2026", dateStr: "Jul 11, Saturday", weekIndex: 1 },
  { id: "d14", dayName: "Su", dayNum: "12", monthLabel: "July 2026", dateStr: "Jul 12, Sunday", weekIndex: 1 },
];

const APPOINTMENT_DATA = [
  { id: "1", targetDateId: "d1", clientName: "Arghya 12", email: "arghya@yopmail.com", stylist: "John Doe", timeSlot: "15:20 - 15:40", service: "Haircut", price: "₹ 100", phone: "+916291059885" },
  { id: "2", targetDateId: "d1", clientName: "Shyam Sharma", email: "shyam@yopmail.com", stylist: "Bob", timeSlot: "16:00 - 16:30", service: "Massage", price: "₹ 345", phone: "+919876543210" },
];

const AppointmentsDashboard = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(DATA_TIMELINE[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filters timeline segments by sliding window week index
  const visibleDays = useMemo(() => {
    return DATA_TIMELINE.filter(day => day.weekIndex === currentWeek);
  }, [currentWeek]);

  // Interactive Chevron State Shifter Actions
  const handleNextWeek = () => {
    if (currentWeek < 1) {
      setCurrentWeek(prev => prev + 1);
      const nextWeekMatch = DATA_TIMELINE.find(day => day.weekIndex === currentWeek + 1);
      if (nextWeekMatch) setSelectedDay(nextWeekMatch);
    }
  };

  const handlePrevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(prev => prev - 1);
      const prevWeekMatch = DATA_TIMELINE.find(day => day.weekIndex === currentWeek - 1);
      if (prevWeekMatch) setSelectedDay(prevWeekMatch);
    }
  };

  const currentAppointments = APPOINTMENT_DATA.filter(item => 
    item.targetDateId === selectedDay.id &&
    (item.stylist.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderAppointmentCard = ({ item }) => (
    <View
      style={[
        styles.premiumLuxuryCard,
        {
          backgroundColor: darkTheme.colors.card,
          borderColor: darkTheme.colors.border,
          borderRadius: scale(14),
        },
      ]}
    >
      {/* Upper Segment: Asymmetrical Profile Grid Layout */}
      <View style={styles.cardHeaderRow}>
        <View style={styles.headerLeftSubgroup}>
          <View style={[styles.avatarBoxContainer, { backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }]}>
            <Feather name="user" size={scale(15)} color={darkTheme.colors.accent} />
          </View>
          <View style={styles.clientMetaBlock}>
            <Text style={[darkTheme.typography.cardTitle, styles.clientNameText]}>
              {item.clientName}
            </Text>
            <Text style={[darkTheme.typography.bodyMuted, styles.emailText]}>
              {item.email}
            </Text>
          </View>
        </View>

        <View style={styles.headerRightSubgroup}>
          <View style={[styles.stylistPillBadge, { backgroundColor: "rgba(255,255,255,0.04)" }]}>
            <Text style={[darkTheme.typography.bodyMain, styles.stylistText, { color: darkTheme.colors.textMain }]}>
              {item.stylist}
            </Text>
          </View>
          <View style={styles.timeScheduleRow}>
            <Ionicons name="time-outline" size={scale(11)} color={darkTheme.colors.textMuted} style={{ marginRight: scale(4) }} />
            <Text style={[darkTheme.typography.bodyMuted, styles.timeText]}>
              {item.timeSlot}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.fineDividerLine, { backgroundColor: "rgba(255,255,255,0.05)" }]} />

      {/* Middle Segment: High-End Accounting Breakdown Box */}
      <View style={styles.pricingSection}>
        <View style={styles.pricingRow}>
          <Text style={[darkTheme.typography.bodyMuted, styles.priceLabel]}>{item.service}</Text>
          <Text style={[darkTheme.typography.bodyMain, styles.priceValue]}>{item.price}</Text>
        </View>
        <View style={styles.pricingRow}>
          <Text style={[darkTheme.typography.bodyMain, styles.totalLabel]}>Total Balance</Text>
          <Text style={[darkTheme.typography.bodyMain, styles.totalValue, { color: darkTheme.colors.accent }]}>
            {item.price}
          </Text>
        </View>
      </View>

      <View style={[styles.fineDividerLine, { backgroundColor: "rgba(255,255,255,0.05)" }]} />

      {/* Footer Segment: Direct Action Access Call String */}
      <View style={styles.cardFooterRow}>
        <TouchableOpacity 
          activeOpacity={0.7}
          style={[styles.phoneActionButtonRow, { backgroundColor: "rgba(255, 149, 0, 0.04)", borderRadius: scale(8) }]}
        >
          <Ionicons name="call-outline" size={scale(11)} color={darkTheme.colors.accent} style={{ marginRight: scale(6) }} />
          <Text style={[darkTheme.typography.bodyMuted, styles.footerText]}>
            Contact Client: <Text style={[styles.phoneLink, { color: darkTheme.colors.accent }]}>{item.phone}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header title="Appointment List" subTitle="Live appointment schedule manager" showBack={false} />

      {/* Dynamic Scrolling Calendar Header Module */}
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeaderRow}>
          <Text style={[darkTheme.typography.headerTitle, styles.monthTitleText]}>
            {selectedDay.monthLabel}
          </Text>
          <View style={styles.monthToggleChevrons}>
            <TouchableOpacity 
              onPress={handlePrevWeek}
              disabled={currentWeek === 0}
              style={[styles.chevronButton, currentWeek === 0 && { opacity: 0.2 }]}
            >
              <Ionicons name="chevron-back" size={scale(13)} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleNextWeek}
              disabled={currentWeek === 1}
              style={[styles.chevronButton, currentWeek === 1 && { opacity: 0.2 }]}
            >
              <Ionicons name="chevron-forward" size={scale(13)} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic Days Array Container Map */}
        <View style={styles.daysHorizontalRow}>
          {visibleDays.map((day) => {
            const isSelected = selectedDay.id === day.id;
            return (
              <TouchableOpacity
                key={day.id}
                activeOpacity={0.8}
                onPress={() => setSelectedDay(day)}
                style={styles.daySelectionNode}
              >
                <Text style={[darkTheme.typography.bodyMuted, styles.dayLabelName]}>
                  {day.dayName}
                </Text>
                <View
                  style={[
                    styles.dayNumberCircle,
                    {
                      borderColor: isSelected ? darkTheme.colors.accent : "transparent",
                      borderWidth: isSelected ? 1 : 0,
                      backgroundColor: isSelected ? "rgba(255, 149, 0, 0.05)" : "transparent",
                    },
                  ]}
                >
                  <Text style={[darkTheme.typography.bodyMain, styles.dayNumberText, isSelected && { fontWeight: "700" }]}>
                    {day.dayNum}
                  </Text>
                  {day.hasAppointments && (
                    <View style={[styles.activeIndicatorDot, { backgroundColor: darkTheme.colors.accent }]} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Interactive Sub-Header Search Row Area */}
      <View style={styles.searchTimelineSection}>
        <View style={[styles.premiumSearchBox, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
          <Ionicons name="search-outline" size={scale(13)} color={darkTheme.colors.textMuted} style={styles.searchIcon} />
          <TextInput
            placeholder="Search barber, client, or service profile..."
            placeholderTextColor={darkTheme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[darkTheme.typography.bodyMain, styles.searchFieldInput]}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={scale(14)} color={darkTheme.colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={[darkTheme.typography.bodyMain, styles.selectedTimelineLabel]}>
          {selectedDay.dateStr}
        </Text>
      </View>

      {/* Main Core FlatList Execution Frame */}
      <FlatList
        data={currentAppointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointmentCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={10}
        removeClippedSubviews={Platform.OS === "android"}
        ListEmptyComponent={
          /* Ultra-Sleek Minimal Luxury Placeholder State Banner */
          <View style={styles.luxuryEmptyStateBox}>
            <View style={styles.glassCircleWrapper}>
              <MaterialCommunityIcons name="calendar-blank-outline" size={scale(24)} color="rgba(255,255,255,0.15)" />
              <View style={[styles.miniStatusOrbitDot, { backgroundColor: darkTheme.colors.accent }]} />
            </View>
            <Text style={[darkTheme.typography.cardTitle, styles.luxuryEmptyTitle]}>
              No Bookings Scheduled
            </Text>
            <Text style={[darkTheme.typography.bodyMuted, styles.luxuryEmptySubtitle]}>
              This timeline anchor is currently clear. Incoming client queue metrics will sync here in real time.
            </Text>
          </View>
        }
      />
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
  daysHorizontalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  daySelectionNode: {
    alignItems: "center",
    flex: 1,
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
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
    gap: verticalScale(12),
  },
  premiumLuxuryCard: {
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
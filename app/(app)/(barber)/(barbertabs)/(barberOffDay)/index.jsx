import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons, Feather } from "@expo/vector-icons";

import BarberHeader from "../../../../../components/Header/BarberHeader";
import { darkTheme } from "../../../../../constants/appTheme";

const SHIFT_DAYS_DATA = [
  { id: "1", name: "Sunday", hours: "10:00 - 19:00", active: true, start: "10:00", end: "19:00", interval: "20 mins", cost: "₹ 150", breaks: [] },
  { id: "2", name: "Monday", hours: "00:20 - 22:40", active: true, start: "00:20", end: "22:40", interval: "20 mins", cost: "₹ 200", breaks: [{ id: "b1", start: "03:30", end: "04:05" }] },
  { id: "3", name: "Tuesday", hours: "12:00 - 22:00", active: true, start: "12:00", end: "22:00", interval: "20 mins", cost: "₹ 180", breaks: [] },
  { id: "4", name: "Wednesday", hours: "-", active: false, start: "00:00", end: "00:00", interval: "20 mins", cost: "₹ 0", breaks: [] },
  { id: "5", name: "Thursday", hours: "-", active: false, start: "00:00", end: "00:00", interval: "20 mins", cost: "₹ 0", breaks: [] },
  { id: "6", name: "Friday", hours: "06:00 - 23:00", active: true, start: "06:00", end: "23:00", interval: "20 mins", cost: "₹ 250", breaks: [] },
];

const GENERATED_JULY_DAYS = Array.from({ length: 15 }, (_, index) => {
  const dayNum = index + 1;
  const dateObj = new Date(2026, 6, dayNum);
  const weekdayLabel = dateObj.toLocaleDateString("en-US", { weekday: "short" });
  return {
    id: `jul_${dayNum}`,
    label: `${weekdayLabel} ${dayNum.toString().padStart(2, "0")} Jul 2026`
  };
});

const BarberScheduleManager = () => {
  const [activeTab, setActiveTab] = useState("availability");
  const [days, setDays] = useState(SHIFT_DAYS_DATA);
  const [expandedDayId, setExpandedDayId] = useState(null);
  const [selectedOffDayIds, setSelectedOffDayIds] = useState(["jul_9", "jul_10", "jul_13"]);

  const toggleDayActive = (id) => {
    setDays(prev => prev.map(day => 
      day.id === id ? { ...day, active: !day.active, hours: !day.active ? "09:00 - 18:00" : "-" } : day
    ));
  };

  const handleToggleOffDay = (id) => {
    setSelectedOffDayIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderAsymmetricalDayCard = ({ item }) => {
    const isExpanded = expandedDayId === item.id;

    return (
      <View style={[styles.premiumLuxuryCard, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.headerLeftSubgroup}>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => toggleDayActive(item.id)}
              style={[
                styles.avatarBoxContainer, 
                { backgroundColor: item.active ? darkTheme.colors.accent : "rgba(255,255,255,0.02)" }
              ]}
            >
              {item.active && <Ionicons name="checkmark" size={scale(11)} color="#000000" />}
            </TouchableOpacity>
            
            <View style={styles.clientMetaBlock}>
              <Text style={styles.clientNameText}>{item.name}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.emailText}>Weekly Shift Allocation Node</Text>
            </View>
          </View>

          <View style={styles.headerRightSubgroup}>
            <View style={styles.stylistPillBadge}>
              <Text style={[styles.stylistText, { color: item.active ? darkTheme.colors.accent : darkTheme.colors.textMuted }]}>
                {item.active ? "ACTIVE" : "DISABLED"}
              </Text>
            </View>
            <View style={styles.timeScheduleRow}>
              <Ionicons name="time-outline" size={scale(11)} color={darkTheme.colors.textMuted} style={{ marginRight: scale(4) }} />
              <Text style={styles.timeText}>{item.hours}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.fineDividerLine, { backgroundColor: "rgba(255,255,255,0.05)" }]} />

        <View style={styles.pricingSection}>
          <View style={styles.pricingRow}>
            <Text style={styles.priceLabel}>Configured Shift Window</Text>
            <Text style={styles.priceValue}>{item.hours === "-" ? "None Specified" : item.hours}</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.totalLabel}>Base Shift Rate</Text>
            <Text style={[styles.totalValue, { color: darkTheme.colors.accent }]}>{item.cost}</Text>
          </View>
        </View>

        <View style={[styles.fineDividerLine, { backgroundColor: "rgba(255,255,255,0.05)" }]} />

        <View style={styles.cardFooterRow}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => setExpandedDayId(isExpanded ? null : item.id)}
            style={[styles.phoneActionButtonRow, { backgroundColor: "rgba(255, 255, 255, 0.02)" }]}
          >
            <Feather name="edit-2" size={scale(11)} color={darkTheme.colors.textMuted} style={{ marginRight: scale(6) }} />
            <Text style={styles.footerText}>Adjust Shift Timeline Matrices</Text>
          </TouchableOpacity>
        </View>

        {isExpanded && (
          <View style={styles.nestedManagementGrid}>
            <Text style={styles.matrixLabel}>APPOINTMENT HOURS</Text>
            <View style={styles.inputAdjustmentRow}>
              <View style={styles.customDropdownSelector}><Text style={styles.pickerValText}>{item.start}</Text><Ionicons name="chevron-down" size={scale(11)} color={darkTheme.colors.textMuted} /></View>
              <View style={styles.customDropdownSelector}><Text style={styles.pickerValText}>{item.end}</Text><Ionicons name="chevron-down" size={scale(11)} color={darkTheme.colors.textMuted} /></View>
            </View>

            <Text style={styles.matrixLabel}>INTERVAL TIME</Text>
            <View style={[styles.customDropdownSelector, { width: "100%", marginBottom: verticalScale(12) }]}>
              <Text style={styles.pickerValText}>{item.interval}</Text>
              <Ionicons name="chevron-down" size={scale(11)} color={darkTheme.colors.textMuted} />
            </View>

            <Text style={styles.matrixLabel}>ADD BREAK</Text>
            <View style={styles.breakItemEntityRow}>
              <View style={styles.customDropdownSelector}><Text style={styles.pickerValText}>00:00</Text></View>
              <View style={styles.customDropdownSelector}><Text style={styles.pickerValText}>00:00</Text></View>
              <TouchableOpacity style={[styles.addActionPillBadge, { backgroundColor: darkTheme.colors.accent }]}>
                <Text style={styles.addActionText}>Add</Text>
              </TouchableOpacity>
            </View>

            {/* Action Row containing your custom dark-shaded buttons */}
            <View style={styles.modalActionGroupRow}>
              <TouchableOpacity onPress={() => setExpandedDayId(null)} style={[styles.actionBtnBase, styles.cancelActionButton]}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setExpandedDayId(null)} style={[styles.actionBtnBase, styles.luxuryAccentShadedButton]}>
                <Text style={styles.luxuryAccentShadedButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={[styles.container, { backgroundColor: darkTheme.colors.background }]}>
      <BarberHeader title="IQB" subTitle="Manage shift logs and scheduling rules" showBack={false} />

      <View style={styles.tabSectionWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab("availability")}
          style={[styles.tabSelectorNode, activeTab === "availability" && { backgroundColor: darkTheme.colors.card, borderColor: "rgba(255,255,255,0.05)" }]}
        >
          <Text style={[styles.tabSelectorText, { color: activeTab === "availability" ? darkTheme.colors.textMain : darkTheme.colors.textMuted }]}>
            Availability
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab("offdays")}
          style={[styles.tabSelectorNode, activeTab === "offdays" && { backgroundColor: darkTheme.colors.card, borderColor: "rgba(255,255,255,0.05)" }]}
        >
          <Text style={[styles.tabSelectorText, { color: activeTab === "offdays" ? darkTheme.colors.textMain : darkTheme.colors.textMuted }]}>
            Barber Off Days
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "availability" ? (
        <FlatList
          data={days}
          keyExtractor={(item) => item.id}
          renderItem={renderAsymmetricalDayCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.structuralMatrixHeader}>
              <Text style={styles.matrixHeaderText}>#   DAYS</Text>
            </View>
          }
        />
      ) : (
        <View style={styles.offDaysFlexFrame}>
          <View style={styles.monthHeaderSubstrip}>
            <Ionicons name="chevron-back" size={scale(13)} color="#FFFFFF" />
            <Text style={styles.monthSubstripLabel}>July 2026</Text>
            <Ionicons name="chevron-forward" size={scale(13)} color="#FFFFFF" />
          </View>

          <FlatList
            data={GENERATED_JULY_DAYS}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.offDaysListContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = selectedOffDayIds.includes(item.id);
              return (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleToggleOffDay(item.id)}
                  style={[
                    styles.offDayRecordItemCard,
                    { 
                      backgroundColor: darkTheme.colors.card, 
                      borderColor: isSelected ? darkTheme.colors.accent : "transparent"
                    }
                  ]}
                >
                  <Text style={[styles.offDayRecordLabelText, isSelected && { color: darkTheme.colors.accent, fontWeight: "600" }]}>
                    {item.label}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={scale(13)} color={darkTheme.colors.accent} style={styles.absoluteCheckIcon} />
                  )}
                </TouchableOpacity>
              );
            }}
          />

          {/* Fixed Floating Bottom Bar with Dynamic Save Button Placement */}
          <View style={styles.floatingActionFooterContainer}>
            <TouchableOpacity 
              activeOpacity={0.9} 
              style={styles.luxuryAccentShadedButton}
              onPress={() => console.log("Saved selection list:", selectedOffDayIds)}
            >
              <Text style={styles.luxuryAccentShadedButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BarberScheduleManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabSectionWrapper: {
    flexDirection: "row",
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    gap: scale(10),
    marginBottom: verticalScale(14),
  },
  tabSelectorNode: {
    flex: 1,
    height: verticalScale(34),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  tabSelectorText: {
    fontSize: scale(12),
    fontWeight: "600",
  },
  structuralMatrixHeader: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(14),
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: scale(6),
    marginBottom: verticalScale(2),
  },
  matrixHeaderText: {
    color: "#FFFFFF",
    fontSize: scale(9),
    fontWeight: "600",
    letterSpacing: 0.5,
    opacity: 0.4,
  },
  listContent: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(24),
    gap: verticalScale(10),
  },
  premiumLuxuryCard: {
    borderWidth: 1,
    padding: scale(14),
    borderRadius: scale(12),
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeftSubgroup: {
    flexDirection: "row",
    gap: scale(12),
    flex: 1,
    alignItems: "center",
  },
  avatarBoxContainer: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(8),
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
    color: "#FFFFFF",
  },
  emailText: {
    fontSize: scale(11),
    marginTop: verticalScale(1),
    color: darkTheme.colors.textMuted,
    opacity: 0.5,
  },
  headerRightSubgroup: {
    alignItems: "flex-end",
  },
  stylistPillBadge: {
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(1),
    borderRadius: scale(4),
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  stylistText: {
    fontSize: scale(9),
    fontWeight: "700",
  },
  timeScheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(3),
  },
  timeText: {
    fontSize: scale(11),
    color: "#FFFFFF",
  },
  fineDividerLine: {
    height: 1,
    width: "100%",
    marginVertical: verticalScale(10),
  },
  pricingSection: {
    gap: verticalScale(4),
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: scale(12),
    color: darkTheme.colors.textMuted,
  },
  priceValue: {
    fontSize: scale(12),
    color: "#FFFFFF",
  },
  totalLabel: {
    fontSize: scale(12),
    color: "#FFFFFF",
  },
  totalValue: {
    fontSize: scale(13),
    fontWeight: "700",
  },
  cardFooterRow: {
    width: "100%",
  },
  phoneActionButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    borderRadius: scale(6),
    alignSelf: "flex-start",
  },
  footerText: {
    fontSize: scale(11),
    color: darkTheme.colors.textMuted,
  },
  nestedManagementGrid: {
    marginTop: verticalScale(10),
    paddingTop: verticalScale(10),
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  matrixLabel: {
    fontSize: scale(9),
    fontWeight: "600",
    letterSpacing: 0.5,
    color: darkTheme.colors.textMuted,
    marginBottom: verticalScale(6),
    textAlign: "center",
  },
  inputAdjustmentRow: {
    flexDirection: "row",
    gap: scale(12),
    marginBottom: verticalScale(12),
  },
  customDropdownSelector: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: verticalScale(34),
    borderRadius: scale(6),
    paddingHorizontal: scale(12),
    backgroundColor: "#1C1C1E",
  },
  pickerValText: {
    color: "#FFFFFF",
    fontSize: scale(12),
  },
  breakItemEntityRow: {
    flexDirection: "row",
    gap: scale(12),
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  addActionPillBadge: {
    height: verticalScale(34),
    paddingHorizontal: scale(16),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(6),
  },
  addActionText: {
    color: "#000000",
    fontSize: scale(11),
    fontWeight: "700",
  },
  modalActionGroupRow: {
    flexDirection: "row",
    gap: scale(12),
    marginTop: verticalScale(8),
  },
  actionBtnBase: {
    flex: 1,
    height: verticalScale(36),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  cancelActionButton: {
    backgroundColor: "rgba(255, 59, 48, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 59, 48, 0.15)",
  },
  cancelBtnText: {
    color: "#FF3B30",
    fontSize: scale(12),
    fontWeight: "600",
  },
  
  // Custom High-Contrast Translucent Dark-Shaded Buttons Configurations
  luxuryAccentShadedButton: {
    backgroundColor: "rgba(255, 149, 0, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 149, 0, 0.3)",
    height: verticalScale(36),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  luxuryAccentShadedButtonText: {
    color: darkTheme.colors.accent,
    fontSize: scale(12),
    fontWeight: "700",
  },
  
  // Calendar Offdays Modular Configurations
  offDaysFlexFrame: {
    flex: 1,
  },
  monthHeaderSubstrip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderRadius: scale(6),
    gap: scale(12),
    marginHorizontal: darkTheme.layout.paddingHorizontal,
    marginBottom: verticalScale(10),
  },
  monthSubstripLabel: {
    color: "#FFFFFF",
    fontSize: scale(11),
    fontWeight: "700",
  },
  offDaysListContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(75),
    gap: verticalScale(8),
  },
  offDayRecordItemCard: {
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: scale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(16),
    position: "relative",
  },
  offDayRecordLabelText: {
    color: "#FFFFFF",
    fontSize: scale(12),
    fontWeight: "500",
  },
  absoluteCheckIcon: {
    position: "absolute",
    right: scale(14),
  },
  floatingActionFooterContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: darkTheme.colors.background,
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingTop: verticalScale(8),
    paddingBottom: Platform.OS === "ios" ? verticalScale(20) : verticalScale(12),
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.03)",
  },
});
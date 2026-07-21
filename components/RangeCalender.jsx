import React, { useMemo, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { scale, verticalScale } from "react-native-size-matters";

import { darkTheme } from "../constants/appTheme"; 

const RangeCalendarModal = ({
  visible,
  onClose,
  startDate,
  endDate,
  onSelectRange,
  title = "Custom Range Picker",
  accentColor,
  theme = darkTheme,
}) => {
  const activeAccent = accentColor || theme.colors.accent;

  // Track month navigation state internally
  const [currentMonthMoment, setCurrentMonthMoment] = useState(
    startDate ? startDate.clone() : moment()
  );

  // Dynamic Calendar Grid Engine
  const calendarGridData = useMemo(() => {
    const startOfMonth = currentMonthMoment.clone().startOf("month");
    const startDayOfWeek = startOfMonth.day();
    const totalDaysInMonth = currentMonthMoment.daysInMonth();

    // Greyed-out padding from previous month
    const prevMonthMoment = currentMonthMoment.clone().subtract(1, "month");
    const totalDaysInPrevMonth = prevMonthMoment.daysInMonth();
    const prevPadding = [];
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      prevPadding.push({
        dayNum: totalDaysInPrevMonth - i,
        isCurrentMonth: false,
        momentObj: prevMonthMoment.clone().date(totalDaysInPrevMonth - i),
      });
    }

    // Active current month days
    const currentDays = [];
    for (let i = 1; i <= totalDaysInMonth; i++) {
      currentDays.push({
        dayNum: i,
        isCurrentMonth: true,
        momentObj: currentMonthMoment.clone().date(i),
      });
    }

    // Trailing padding days
    const absoluteTotalCells = prevPadding.length + currentDays.length;
    const missingGridCells =
      absoluteTotalCells % 7 === 0 ? 0 : 7 - (absoluteTotalCells % 7);
    const nextMonthMoment = currentMonthMoment.clone().add(1, "month");
    const nextPadding = [];
    for (let i = 1; i <= missingGridCells; i++) {
      nextPadding.push({
        dayNum: i,
        isCurrentMonth: false,
        momentObj: nextMonthMoment.clone().date(i),
      });
    }

    return [...prevPadding, ...currentDays, ...nextPadding];
  }, [currentMonthMoment]);

  const handleDayPress = (dayObj) => {
    const targetMoment = dayObj.momentObj;
    let newStart = startDate;
    let newEnd = endDate;

    if (!startDate || (startDate && endDate)) {
      newStart = targetMoment;
      newEnd = null;
    } else if (startDate && !endDate) {
      if (targetMoment.isBefore(startDate, "day")) {
        newStart = targetMoment;
        newEnd = null;
      } else {
        newEnd = targetMoment;
      }
    }

    if (onSelectRange) {
      onSelectRange({ startDate: newStart, endDate: newEnd });
    }
  };

  const handleReset = () => {
    if (onSelectRange) {
      onSelectRange({ startDate: null, endDate: null });
    }
  };

  const handlePrevMonthToggle = () => {
    setCurrentMonthMoment((prev) => prev.clone().subtract(1, "month"));
  };

  const handleNextMonthToggle = () => {
    setCurrentMonthMoment((prev) => prev.clone().add(1, "month"));
  };

  const formatBannerLabel = (dateObj, fallbackText) =>
    dateObj ? dateObj.format("DD MMMM") : fallbackText;

  const hasSelectedDates = Boolean(startDate || endDate);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Tap Outside Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlayScrim}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View
              style={[
                styles.calendarModalContent,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              {/* Modal Header & Month Navigation */}
              <View style={styles.modalHeaderRow}>
                <View>
                  <Text style={[theme.typography.cardTitle, styles.headerTitle]}>
                    {title}
                  </Text>
                  <Text
                    style={[
                      theme.typography.bodyMuted,
                      styles.headerSubtitle,
                    ]}
                  >
                    {currentMonthMoment.format("MMMM YYYY")}
                  </Text>
                </View>
                <View style={styles.calendarPaginatorTrack}>
                  <TouchableOpacity
                    onPress={handlePrevMonthToggle}
                    style={[
                      styles.arrowNavCircleButton,
                      { borderColor: theme.colors.border },
                    ]}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={scale(14)}
                      color={theme.colors.textMain}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNextMonthToggle}
                    style={[
                      styles.arrowNavCircleButton,
                      { borderColor: theme.colors.border },
                    ]}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={scale(14)}
                      color={theme.colors.textMain}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Range Preview Banner with Single Clean Inline Reset */}
              <View
                style={[
                  styles.selectionTrackPreviewBanner,
                  { backgroundColor: `${activeAccent}10` },
                ]}
              >
                <Text style={[styles.previewBannerText, { color: activeAccent }]}>
                  {formatBannerLabel(startDate, "Select Start Date")} —{" "}
                  {formatBannerLabel(endDate, "Select End Date")}
                </Text>

                {hasSelectedDates && (
                  <TouchableOpacity
                    onPress={handleReset}
                    style={styles.inlineResetButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="refresh-outline"
                      size={scale(13)}
                      color={theme.colors.textMuted}
                    />
                    <Text
                      style={[
                        styles.inlineResetText,
                        { color: theme.colors.textMuted },
                      ]}
                    >
                      Reset
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Days Grid */}
              <View style={styles.calendarDaysGrid}>
                {calendarGridData.map((cell, idx) => {
                  const isCurrent = cell.isCurrentMonth;
                  const cellMoment = cell.momentObj;

                  const isStart =
                    startDate && cellMoment.isSame(startDate, "day") && isCurrent;
                  const isEnd =
                    endDate && cellMoment.isSame(endDate, "day") && isCurrent;
                  const isInRange =
                    startDate &&
                    endDate &&
                    cellMoment.isBetween(startDate, endDate, "day") &&
                    isCurrent;
                  const isSelected = isStart || isEnd;

                  return (
                    <TouchableOpacity
                      key={`cell-${idx}`}
                      disabled={!isCurrent}
                      activeOpacity={0.6}
                      onPress={() => handleDayPress(cell)}
                      style={[
                        styles.dayGridCellNode,
                        !isCurrent && styles.greyedOutBufferCell,
                        isInRange && { backgroundColor: `${activeAccent}20` },
                        isStart && styles.startDayCellBorderRadius,
                        isEnd && styles.endDayCellBorderRadius,
                        isSelected && { backgroundColor: activeAccent },
                      ]}
                    >
                      <Text
                        style={[
                          styles.calendarCellDayNumberText,
                          {
                            color: !isCurrent
                              ? "rgba(255,255,255,0.2)"
                              : isSelected
                                ? "#000000"
                                : theme.colors.textMain,
                          },
                          isSelected && { fontWeight: "700" },
                        ]}
                      >
                        {cell.dayNum}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Clean Single Primary Action Button */}
              <TouchableOpacity
                style={[
                  styles.confirmSelectionActionButton,
                  { backgroundColor: activeAccent },
                ]}
                activeOpacity={0.8}
                onPress={onClose}
              >
                <Text style={styles.confirmButtonTextLabel}>
                  Apply Range Matrix
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RangeCalendarModal;

const styles = StyleSheet.create({
  modalOverlayScrim: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  calendarModalContent: {
    width: "100%",
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    borderTopWidth: 1,
    padding: scale(20),
    paddingBottom: verticalScale(36),
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  headerTitle: {
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: scale(11),
    marginTop: verticalScale(2),
  },
  calendarPaginatorTrack: {
    flexDirection: "row",
    gap: scale(6),
  },
  arrowNavCircleButton: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  selectionTrackPreviewBanner: {
    width: "100%",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    borderRadius: scale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
  },
  previewBannerText: {
    fontSize: scale(12),
    fontWeight: "700",
  },
  inlineResetButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(3),
  },
  inlineResetText: {
    fontSize: scale(11),
    fontWeight: "600",
  },
  calendarDaysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: scale(4),
    marginBottom: verticalScale(20),
  },
  dayGridCellNode: {
    width: `${100 / 7 - 1.2}%`,
    height: scale(34),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(2),
  },
  greyedOutBufferCell: {
    backgroundColor: "transparent",
  },
  startDayCellBorderRadius: {
    borderTopLeftRadius: scale(8),
    borderBottomLeftRadius: scale(8),
  },
  endDayCellBorderRadius: {
    borderTopRightRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },
  calendarCellDayNumberText: {
    fontSize: scale(12),
    fontWeight: "500",
  },
  confirmSelectionActionButton: {
    width: "100%",
    height: scale(44),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(4),
  },
  confirmButtonTextLabel: {
    color: "#000000",
    fontWeight: "700",
    fontSize: scale(13),
  },
});
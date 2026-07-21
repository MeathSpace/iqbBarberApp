import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Shimmer from "react-native-modern-shimmer";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import { useFocusEffect } from "expo-router";
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";
import api from "../../../../../utils/api";

const AppointmentsDashboard = () => {
  const { currentSalon } = useAdminGlobal();
  const { authenticatedUser } = useAdminAuth();

  // --- CONFIGURATION PARAMETERS ---
  const maxAppointmentDays = Number(
    currentSalon?.data?.salonSettings?.appointmentAdvanceDays || 14,
  );
  const currentSalonType = currentSalon?.data?.salonType || "Barber Shop";
  const currencySymbol = currentSalon?.data?.currency || "₹";

  // --- COMPONENT LOCAL STATES ---
  const [dates, setDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment().startOf("month"));
  const [selectedDay, setSelectedDay] = useState(null);
  const [searchBarber, setSearchBarber] = useState("");
  const [openNoteId, setOpenNoteId] = useState(null);

  // --- API DATA STATES ---
  const [appointmentData, setAppointmentData] = useState({
    loading: false,
    data: [],
  });

  const [allAppointments, setAllAppointments] = useState({
    loading: false,
    data: [],
  });

  // Global indicator for the content cards block below the inputs
  const isContentLoading = appointmentData.loading || allAppointments.loading;

  // --- CALENDAR GENERATION PIECE ---
  const generateDatesForMonth = useCallback((monthMoment, maxDays) => {
    const today = moment().startOf("day");
    const tomorrow = today.clone().add(1, "day");
    const maxAllowedDate = today.clone().add(maxDays, "days").startOf("day");

    let temporaryTimelineArray = [];

    const loopStart = monthMoment.isSame(today, "month")
      ? tomorrow
      : monthMoment.clone().startOf("month");

    for (
      let day = loopStart.clone();
      day.isSameOrBefore(maxAllowedDate) && day.isSame(monthMoment, "month");
      day.add(1, "day")
    ) {
      temporaryTimelineArray.push({
        dayName: day.format("ddd").slice(0, 2),
        dayFullName: day.format("dddd"),
        date: day.format("DD"),
        month: day.format("MMM"),
        year: day.format("YYYY"),
        fullDate: day.format("YYYY-MM-DD"),
        monthLabel: day.format("MMMM YYYY"),
        dateStr: day.format("MMM DD, dddd"),
      });
    }

    setDates(temporaryTimelineArray);

    if (temporaryTimelineArray.length > 0) {
      setSelectedDay((prev) => {
        const baselineMatch = temporaryTimelineArray.find(
          (d) => d.fullDate === prev?.fullDate,
        );
        return baselineMatch || temporaryTimelineArray[0];
      });
    }
  }, []);

  useEffect(() => {
    generateDatesForMonth(currentMonth, maxAppointmentDays);
  }, [currentMonth, maxAppointmentDays, generateDatesForMonth]);

  useFocusEffect(
    useCallback(() => {
      const fetchAppointments = async () => {
        try {
          setAppointmentData((prev) => ({ ...prev, loading: true }));
          const { data } = await api.post(
            "/appointments/getAppointmentListBySalonIdAndAppointmentDate",
            {
              salonId: authenticatedUser?.salonId,
              appointmentDate: selectedDay?.fullDate,
            },
          );
          setAppointmentData({
            loading: false,
            data: data?.response || [],
          });
        } catch (error) {
          console.error("Failed to fetch appointments:", error);
        } finally {
          setAppointmentData((prev) => ({ ...prev, loading: false }));
        }
      };

      if (authenticatedUser?.salonId && selectedDay?.fullDate) {
        fetchAppointments();
      }
    }, [authenticatedUser?.salonId, selectedDay?.fullDate]),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchAppointments = async () => {
        try {
          setAllAppointments((prev) => ({ ...prev, loading: true }));
          const { data } = await api.post(
            "/appointments/getAllAppointmentsBySalonId",
            { salonId: authenticatedUser?.salonId },
          );
          setAllAppointments({
            loading: false,
            data: data?.response || [],
          });
        } catch (error) {
          console.error("Failed to fetch all appointments:", error);
        } finally {
          setAllAppointments((prev) => ({ ...prev, loading: false }));
        }
      };

      if (authenticatedUser?.salonId) {
        fetchAppointments();
      }
    }, [authenticatedUser?.salonId]),
  );

  // --- SEARCH AND FILTER PIPELINE ---
  const displayAppointments = useMemo(() => {
    if (!selectedDay) return [];

    return appointmentData.data.filter((item) => {
      const matchSearch =
        !searchBarber.trim() ||
        item.barbername?.toLowerCase().includes(searchBarber.toLowerCase()) ||
        item.customerName?.toLowerCase().includes(searchBarber.toLowerCase());

      return matchSearch;
    });
  }, [appointmentData.data, selectedDay, searchBarber]);

  const nextMonthFunc = () =>
    setCurrentMonth((prev) => prev.clone().add(1, "month"));
  const prevMonthFunc = () =>
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));

  const isPrevDisabled = currentMonth.isSame(moment(), "month");
  const isNextDisabled = currentMonth
    .clone()
    .add(1, "month")
    .startOf("month")
    .isAfter(moment().add(maxAppointmentDays, "days"));

  const renderAppointmentCard = (item) => {
    const isNoteOpen = openNoteId === item._id;
    const totalCalculatedBalance = item?.services?.reduce(
      (acc, service) => acc + Number(service.servicePrice || 0),
      0,
    );

    const handlePhoneCall = async (countryCode, mobileNumber) => {
      const phoneNumber = `tel:+${countryCode}${mobileNumber}`;
      try {
        await Linking.openURL(phoneNumber);
      } catch (error) {
        Alert.alert(
          "Call Failed",
          "Phone calls are not supported on this device ecosystem (e.g. running on an emulator)."
        );
      }
    };

    return (
      <View
        key={item?._id}
        style={[
          styles.premiumLuxuryCard,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: darkTheme.colors.border,
          },
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <View style={styles.headerLeftSubgroup}>
            <View
              style={[
                styles.avatarBoxContainer,
                {
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.05)",
                },
              ]}
            >
              <Feather
                name="user"
                size={scale(15)}
                color={darkTheme.colors.accent}
              />
            </View>
            <View style={styles.clientMetaBlock}>
              <Text
                style={[darkTheme.typography.cardTitle, styles.clientNameText]}
                numberOfLines={1}
              >
                {item?.customerName}
              </Text>
              <Text
                style={[darkTheme.typography.bodyMuted, styles.emailText]}
                numberOfLines={1}
              >
                {item?.customerEmail}
              </Text>
            </View>
          </View>

          <View style={styles.headerRightSubgroup}>
            <View
              style={[
                styles.stylistPillBadge,
                { backgroundColor: "rgba(255,255,255,0.04)" },
              ]}
            >
              <Text
                style={[
                  darkTheme.typography.bodyMain,
                  styles.stylistText,
                  { color: darkTheme.colors.textMain },
                ]}
                numberOfLines={1}
              >
                {item?.barbername}
              </Text>
            </View>
            <View style={styles.timeScheduleRow}>
              <Ionicons
                name="time-outline"
                size={scale(11)}
                color={darkTheme.colors.textMuted}
                style={{ marginRight: scale(4) }}
              />
              <Text style={[darkTheme.typography.bodyMuted, styles.timeText]}>
                {item?.timeSlots}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.fineDividerLine,
            { backgroundColor: "rgba(255,255,255,0.05)" },
          ]}
        />

        <View style={styles.pricingSection}>
          {item?.services?.map((service, idx) => (
            <View key={idx} style={styles.pricingRow}>
              <Text style={[darkTheme.typography.bodyMuted, styles.priceLabel]}>
                {service.serviceName}
              </Text>
              <Text style={[darkTheme.typography.bodyMain, styles.priceValue]}>
                {currencySymbol} {service.servicePrice}
              </Text>
            </View>
          ))}

          <View
            style={[
              styles.pricingRow,
              {
                marginTop: scale(6),
                paddingTop: scale(6),
                borderTopWidth: 1,
                borderTopColor: "rgba(255,255,255,0.03)",
              },
            ]}
          >
            <Text style={[darkTheme.typography.bodyMain, styles.totalLabel]}>
              Total Balance
            </Text>
            <Text
              style={[
                darkTheme.typography.bodyMain,
                styles.totalValue,
                { color: darkTheme.colors.accent },
              ]}
            >
              {currencySymbol} {totalCalculatedBalance}
            </Text>
          </View>
        </View>

        {item?.appointmentNotes && (
          <View style={styles.notesOuterWrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setOpenNoteId(isNoteOpen ? null : item._id)}
              style={styles.notesToggleButton}
            >
              <Text style={styles.notesToggleText}>
                View Customer Note
              </Text>
              <Ionicons
                name={isNoteOpen ? "chevron-up" : "chevron-down"}
                size={scale(12)}
                color={darkTheme.colors.textMuted}
              />
            </TouchableOpacity>
            {isNoteOpen && (
              <View style={styles.notesExpandedContentContainer}>
                <Text style={styles.notesContentText}>
                  {item?.appointmentNotes}
                </Text>
              </View>
            )}
          </View>
        )}

        <View
          style={[
            styles.fineDividerLine,
            { backgroundColor: "rgba(255,255,255,0.05)" },
          ]}
        />

        <View style={styles.cardFooterRow}>
          {item?.mobileNumber ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                handlePhoneCall(item.countryCode, item.mobileNumber)
              }
              style={[
                styles.phoneActionButtonRow,
                { backgroundColor: "rgba(255, 149, 0, 0.04)" },
              ]}
            >
              <Ionicons
                name="call-outline"
                size={scale(11)}
                color={darkTheme.colors.accent}
                style={{ marginRight: scale(6) }}
              />
              <Text style={[darkTheme.typography.bodyMuted, styles.footerText]}>
                Contact Client:{" "}
                <Text style={{ color: darkTheme.colors.accent, fontWeight: "600" }}>
                  +{item?.countryCode}
                  {item?.mobileNumber}
                </Text>
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                { fontSize: scale(11), color: darkTheme.colors.textMuted },
              ]}
            >
              No client contact configuration registered.
            </Text>
          )}
        </View>
      </View>
    );
  };

  // Reusable multi-color skeleton elements builder for the dynamic list container only
  const ShimmerLoader = () => {
    const cardShimmer = { base: "#1c1c1e", highlight: "#2c2c2e" };
    const textShimmer = { base: "#2c2c2e", highlight: "#3a3a3c" };

    return (
      <View>
        {[1, 2].map((token) => (
          <View
            key={token}
            style={[
              styles.premiumLuxuryCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
              },
            ]}
          >
            <View style={styles.cardHeaderRow}>
              <View style={styles.headerLeftSubgroup}>
                <Shimmer
                  style={{ width: scale(36), height: scale(36), borderRadius: scale(10) }}
                  baseColor={cardShimmer.base}
                  highlightColor={cardShimmer.highlight}
                />
                <View style={[styles.clientMetaBlock, { gap: verticalScale(4) }]}>
                  <Shimmer
                    style={{ width: scale(110), height: verticalScale(14), borderRadius: 4 }}
                    baseColor={textShimmer.base}
                    highlightColor={textShimmer.highlight}
                  />
                  <Shimmer
                    style={{ width: scale(140), height: verticalScale(10), borderRadius: 3 }}
                    baseColor={textShimmer.base}
                    highlightColor={textShimmer.highlight}
                  />
                </View>
              </View>
              <View style={styles.headerRightSubgroup}>
                <Shimmer
                  style={{ width: scale(65), height: verticalScale(16), borderRadius: 6 }}
                  baseColor={cardShimmer.base}
                  highlightColor={cardShimmer.highlight}
                />
                <Shimmer
                  style={{ width: scale(50), height: verticalScale(10), borderRadius: 3 }}
                  baseColor={textShimmer.base}
                  highlightColor={textShimmer.highlight}
                />
              </View>
            </View>

            <View style={[styles.fineDividerLine, { backgroundColor: "rgba(255,255,255,0.05)" }]} />

            <View style={styles.pricingSection}>
              <View style={styles.pricingRow}>
                <Shimmer
                  style={{ width: scale(85), height: verticalScale(12), borderRadius: 3 }}
                  baseColor={textShimmer.base}
                  highlightColor={textShimmer.highlight}
                />
                <Shimmer
                  style={{ width: scale(35), height: verticalScale(12), borderRadius: 3 }}
                  baseColor={textShimmer.base}
                  highlightColor={textShimmer.highlight}
                />
              </View>
              <View
                style={[
                  styles.pricingRow,
                  {
                    marginTop: scale(6),
                    paddingTop: scale(6),
                    borderTopWidth: 1,
                    borderTopColor: "rgba(255,255,255,0.03)",
                  },
                ]}
              >
                <Shimmer
                  style={{ width: scale(75), height: verticalScale(14), borderRadius: 3 }}
                  baseColor={textShimmer.base}
                  highlightColor={textShimmer.highlight}
                />
                <Shimmer
                  style={{ width: scale(45), height: verticalScale(14), borderRadius: 4 }}
                  baseColor={textShimmer.base}
                  highlightColor={textShimmer.highlight}
                />
              </View>
            </View>

            <View style={[styles.fineDividerLine, { backgroundColor: "rgba(255,255,255,0.05)" }]} />

            <Shimmer
              style={{ width: scale(170), height: verticalScale(16), borderRadius: 4 }}
              baseColor={textShimmer.base}
              highlightColor={textShimmer.highlight}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header
        title="Appointment List"
        subTitle="Live appointment schedule manager"
        showBack={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {/* Calendar Navigation Track (Static Layout Maintained During Data Re-fetches) */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeaderRow}>
            <Text
              style={[darkTheme.typography.headerTitle, styles.monthTitleText]}
            >
              {currentMonth.format("MMMM YYYY")}
            </Text>
            <View style={styles.monthToggleChevrons}>
              <TouchableOpacity
                onPress={prevMonthFunc}
                disabled={isPrevDisabled}
                style={[
                  styles.chevronButton,
                  isPrevDisabled && { opacity: 0.15 },
                ]}
              >
                <Ionicons
                  name="chevron-back"
                  size={scale(14)}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={nextMonthFunc}
                disabled={isNextDisabled}
                style={[
                  styles.chevronButton,
                  isNextDisabled && { opacity: 0.15 },
                ]}
              >
                <Ionicons
                  name="chevron-forward"
                  size={scale(14)}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: scale(14) }}
          >
            {dates?.map((item) => {
              const isSelected = selectedDay?.fullDate === item.fullDate;
              const hasIndicatorDot = allAppointments?.data?.some(
                (appt) => appt.appointmentDate === item.fullDate,
              );

              return (
                <TouchableOpacity
                  key={item.fullDate}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDay(item)}
                  style={styles.daySelectionNode}
                >
                  <Text
                    style={[
                      darkTheme.typography.bodyMuted,
                      styles.dayLabelName,
                    ]}
                  >
                    {item.dayName}
                  </Text>
                  <View
                    style={[
                      styles.dayNumberCircle,
                      {
                        borderColor: isSelected
                          ? darkTheme.colors.accent
                          : "transparent",
                        borderWidth: isSelected ? 1 : 0,
                        backgroundColor: isSelected
                          ? "rgba(255, 149, 0, 0.05)"
                          : "transparent",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        darkTheme.typography.bodyMain,
                        styles.dayNumberText,
                        isSelected && { fontWeight: "700" },
                      ]}
                    >
                      {item.date}
                    </Text>
                    {hasIndicatorDot && (
                      <View
                        style={[
                          styles.activeIndicatorDot,
                          { backgroundColor: darkTheme.colors.textMain },
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {selectedDay && (
          <View style={styles.searchTimelineSection}>
            <View
              style={[
                styles.premiumSearchBox,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                },
              ]}
            >
              <Ionicons
                name="search-outline"
                size={scale(13)}
                color={darkTheme.colors.textMuted}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder={`Search by ${currentSalonType === "Barber Shop" ? "barber" : "stylist"}...`}
                placeholderTextColor={darkTheme.colors.textMuted}
                value={searchBarber}
                onChangeText={setSearchBarber}
                style={[darkTheme.typography.bodyMain, styles.searchFieldInput]}
                autoCapitalize="none"
              />
              {searchBarber.length > 0 && (
                <TouchableOpacity onPress={() => setSearchBarber("")}>
                  <Ionicons
                    name="close-circle"
                    size={scale(14)}
                    color={darkTheme.colors.textMuted}
                  />
                </TouchableOpacity>
              )}
            </View>

            <Text
              style={[
                darkTheme.typography.bodyMain,
                styles.selectedTimelineLabel,
              ]}
            >
              {selectedDay.dateStr}
            </Text>
          </View>
        )}

        {/* Dynamic Execution Gate for Content Area */}
        {isContentLoading ? (
          <ShimmerLoader />
        ) : displayAppointments?.length > 0 ? (
          displayAppointments?.map((item) => renderAppointmentCard(item))
        ) : (
          <View style={styles.luxuryEmptyStateBox}>
            <View style={styles.glassCircleWrapper}>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={scale(24)}
                color="rgba(255,255,255,0.15)"
              />
              <View
                style={[
                  styles.miniStatusOrbitDot,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
              />
            </View>
            <Text
              style={[darkTheme.typography.cardTitle, styles.luxuryEmptyTitle]}
            >
              No Bookings Scheduled
            </Text>
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                styles.luxuryEmptySubtitle,
              ]}
            >
              There are currently no appointments matching your view settings on this date.
            </Text>
          </View>
        )}
      </ScrollView>
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
  daySelectionNode: {
    alignItems: "center",
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
    paddingBottom: verticalScale(32),
  },
  premiumLuxuryCard: {
    marginHorizontal: darkTheme.layout.paddingHorizontal,
    marginBottom: verticalScale(12),
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
  notesOuterWrapper: {
    marginTop: verticalScale(10),
  },
  notesToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  notesToggleText: {
    color: darkTheme.colors.textMain,
    fontSize: scale(11),
    fontWeight: "500",
  },
  notesExpandedContentContainer: {
    backgroundColor: "rgba(0,0,0,0.15)",
    padding: scale(8),
    marginTop: scale(6),
    borderRadius: scale(6),
  },
  notesContentText: {
    color: darkTheme.colors.textMuted,
    fontSize: scale(12),
    lineHeight: scale(16),
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

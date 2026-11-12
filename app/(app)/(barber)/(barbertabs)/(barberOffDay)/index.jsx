import { Feather, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Toast } from "toastify-react-native";

import BarberHeader from "../../../../../components/Header/BarberHeader";
import { darkTheme } from "../../../../../constants/appTheme";
import { useBarberAuth } from "../../../../../context/barber/AuthContext";
import api from "../../../../../utils/api";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const INTERVAL_OPTIONS = [10, 15, 20, 25, 30, 45, 60].map((val) => ({
  label: `${val} mins`,
  value: val,
}));

const generateTimeSlots = (start = "06:00", end = "23:00", stepMinutes = 15) => {
  const slots = [];
  const current = moment(start, "HH:mm");
  const endMoment = moment(end, "HH:mm");
  while (current.isSameOrBefore(endMoment)) {
    slots.push({
      label: current.format("HH:mm"),
      value: current.format("HH:mm"),
    });
    current.add(stepMinutes, "minutes");
  }
  return slots;
};

const DEFAULT_TIME_OPTIONS = generateTimeSlots("06:00", "23:00", 15);

const BarberScheduleManager = () => {
  const { authenticatedUser } = useBarberAuth();
  const salonId = authenticatedUser?.salonId;
  const barberId = authenticatedUser?.barberId;

  const [activeTab, setActiveTab] = useState("availability");
  const [days, setDays] = useState(
    WEEK_DAYS.map((name, idx) => ({
      id: String(idx + 1),
      name,
      hours: "-",
      active: false,
      start: "09:00",
      end: "18:00",
      interval: 20,
      salonOff: false,
      breaks: [],
    })),
  );
  const [expandedDayId, setExpandedDayId] = useState(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [savingDayId, setSavingDayId] = useState(null);

  // Break states for currently expanded day
  const [breakStart, setBreakStart] = useState("12:00");
  const [breakEnd, setBreakEnd] = useState("12:30");
  const [breakRangeOptions, setBreakRangeOptions] =
    useState(DEFAULT_TIME_OPTIONS);
  const [breakLoading, setBreakLoading] = useState(false);

  // Off Days states
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [initialOffDates, setInitialOffDates] = useState([]);
  const [selectedOffDates, setSelectedOffDates] = useState([]);
  const [loadingOffDays, setLoadingOffDays] = useState(false);
  const [savingOffDays, setSavingOffDays] = useState(false);

  const monthDaysList = useMemo(() => {
    const daysInMonth = currentMonth.daysInMonth();
    const year = currentMonth.year();
    const month = currentMonth.month();
    return Array.from({ length: daysInMonth }, (_, index) => {
      const m = moment({ year, month, day: index + 1 });
      const dateStr = m.format("YYYY-MM-DD");
      return {
        id: dateStr,
        dateStr,
        label: m.format("ddd DD MMM YYYY"),
      };
    });
  }, [currentMonth]);

  const fetchAvailabilityData = useCallback(
    async (isRefresh = false) => {
      if (!salonId || !barberId) return;

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoadingAvailability(true);
        }

        const [apptDaysRes, apptTimesRes, salonSettingsRes] =
          await Promise.allSettled([
            api.post("/barberAppointmentDays/getBarberAppointmentDays", {
              salonId,
              barberId,
            }),
            api.post("/barberAppointmentTimes/getBarberAppointmentTime", {
              salonId,
              barberId,
            }),
            api.post("/salonSettings/getSalonSettingsForBarber", {
              salonId,
            }),
          ]);

        let activeDaysList = [];
        let hoursMap = new Map();
        let salonOffDays = [];
        let defaultStart = "09:00";
        let defaultEnd = "18:00";
        let defaultInterval = 20;

        if (salonSettingsRes.status === "fulfilled") {
          const settings = salonSettingsRes.value?.data?.response;
          salonOffDays = Array.isArray(settings?.salonOffDays)
            ? settings.salonOffDays
            : [];
          if (settings?.appointmentSettings?.appointmentStartTime) {
            defaultStart = settings.appointmentSettings.appointmentStartTime;
          }
          if (settings?.appointmentSettings?.appointmentEndTime) {
            defaultEnd = settings.appointmentSettings.appointmentEndTime;
          }
          if (settings?.appointmentSettings?.intervalInMinutes) {
            defaultInterval = Number(
              settings.appointmentSettings.intervalInMinutes,
            );
          }
        }

        if (apptDaysRes.status === "fulfilled") {
          const resData = apptDaysRes.value?.data;
          activeDaysList = Array.isArray(resData?.response?.appointmentDays)
            ? resData.response.appointmentDays
            : Array.isArray(resData?.response)
              ? resData.response
              : [];

          const apptHours = Array.isArray(resData?.appointmentHours)
            ? resData.appointmentHours
            : [];
          apptHours.forEach((h) => {
            if (h?.day) hoursMap.set(h.day, h);
          });
        }

        if (apptTimesRes.status === "fulfilled") {
          const resArr = apptTimesRes.value?.data?.response;
          const timesList = Array.isArray(resArr?.[0]?.appointmentTimes)
            ? resArr[0].appointmentTimes
            : Array.isArray(resArr?.appointmentTimes)
              ? resArr.appointmentTimes
              : Array.isArray(resArr)
                ? resArr
                : [];
          timesList.forEach((t) => {
            if (t?.day) hoursMap.set(t.day, t);
          });
        }

        setDays(
          WEEK_DAYS.map((dayName, idx) => {
            const isSalonOff = salonOffDays.includes(dayName);
            const isActive = activeDaysList.includes(dayName) && !isSalonOff;
            const hourConfig = hoursMap.get(dayName);
            const start = hourConfig?.startTime || defaultStart;
            const end = hourConfig?.endTime || defaultEnd;
            const interval = Number(
              hourConfig?.barberIntervalTime || defaultInterval || 20,
            );

            return {
              id: String(idx + 1),
              name: dayName,
              active: isActive,
              salonOff: isSalonOff,
              start,
              end,
              hours: isActive && hourConfig ? `${start} - ${end}` : "-",
              interval,
              breaks: [],
            };
          }),
        );
      } catch (error) {
        console.log("Error fetching barber availability:", error);
      } finally {
        setLoadingAvailability(false);
        setRefreshing(false);
      }
    },
    [salonId, barberId],
  );

  const fetchOffDays = useCallback(
    async (isRefresh = false) => {
      if (!salonId || !barberId) return;

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoadingOffDays(true);
        }

        const { data } = await api.post("/barberDayOff/getBarberDayOffs", {
          salonId,
          barberId,
        });

        const rawDates = Array.isArray(data?.response)
          ? data.response
          : Array.isArray(data?.response?.barberOffDays)
            ? data.response.barberOffDays
            : [];

        const normalized = rawDates
          .map((d) => moment(d).format("YYYY-MM-DD"))
          .filter((d) => d && d !== "Invalid date");

        setInitialOffDates(normalized);
        setSelectedOffDates(normalized);
      } catch (error) {
        console.log("Error fetching barber off days:", error);
      } finally {
        setLoadingOffDays(false);
        setRefreshing(false);
      }
    },
    [salonId, barberId],
  );

  useEffect(() => {
    fetchAvailabilityData();
    fetchOffDays();
  }, [fetchAvailabilityData, fetchOffDays]);

  const fetchDayBreaks = useCallback(
    async (dayName) => {
      if (!salonId || !barberId || !dayName) return;

      try {
        setBreakLoading(true);
        const [breaksRes, rangeRes] = await Promise.allSettled([
          api.post("/barberBreakTimes/getBarberBreakTimes", {
            salonId,
            barberId,
            day: dayName,
          }),
          api.post("/barberBreakTimes/getBarberBreakTimeRange", {
            salonId,
            barberId,
            day: dayName,
          }),
        ]);

        if (breaksRes.status === "fulfilled") {
          const breakList = Array.isArray(breaksRes.value?.data?.response)
            ? breaksRes.value.data.response
            : [];
          setDays((prev) =>
            prev.map((d) =>
              d.name === dayName ? { ...d, breaks: breakList } : d,
            ),
          );
        }

        if (
          rangeRes.status === "fulfilled" &&
          Array.isArray(rangeRes.value?.data?.response) &&
          rangeRes.value.data.response.length > 0
        ) {
          const opts = rangeRes.value.data.response.map((t) => ({
            label: t,
            value: t,
          }));
          setBreakRangeOptions(opts);
          setBreakStart(opts[0]?.value || "12:00");
          setBreakEnd(opts[Math.min(2, opts.length - 1)]?.value || "12:30");
        } else {
          setBreakRangeOptions(DEFAULT_TIME_OPTIONS);
        }
      } catch (error) {
        console.log("Error fetching breaks for day:", error);
      } finally {
        setBreakLoading(false);
      }
    },
    [salonId, barberId],
  );

  const handleExpandDay = (dayItem) => {
    if (expandedDayId === dayItem.id) {
      setExpandedDayId(null);
    } else {
      setExpandedDayId(dayItem.id);
      fetchDayBreaks(dayItem.name);
    }
  };

  const toggleDayActive = async (dayItem) => {
    if (!salonId || !barberId) return;
    if (dayItem.salonOff) {
      Toast.error(`${dayItem.name} is a Salon Off Day`);
      return;
    }

    const nextActive = !dayItem.active;
    const updatedDays = days.map((d) =>
      d.id === dayItem.id
        ? {
            ...d,
            active: nextActive,
            hours: nextActive ? `${d.start} - ${d.end}` : "-",
          }
        : d,
    );
    setDays(updatedDays);

    const appointmentDaysPayload = updatedDays
      .filter((d) => d.active)
      .map((d) => d.name);

    try {
      const { data } = await api.post(
        "/barberAppointmentDays/addBarberAppointmentDays",
        {
          salonId,
          barberId,
          appointmentDays: appointmentDaysPayload,
        },
      );

      if (!nextActive) {
        await api
          .post("/barberAppointmentTimes/deleteBarberAppointmentTime", {
            salonId,
            barberId,
            days: [dayItem.name],
          })
          .catch(() => {});
      }

      Toast.success(data?.message || "Appointment days updated");
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "Failed to update appointment days",
      );
      fetchAvailabilityData();
    }
  };

  const updateDayField = (dayId, field, value) => {
    setDays((prev) =>
      prev.map((d) => (d.id === dayId ? { ...d, [field]: value } : d)),
    );
  };

  const handleApplyDaySchedule = async (dayItem) => {
    if (!salonId || !barberId) return;

    try {
      setSavingDayId(dayItem.id);

      const updatedActiveDays = Array.from(
        new Set([
          ...days.filter((d) => d.active).map((d) => d.name),
          dayItem.name,
        ]),
      );

      await api.post("/barberAppointmentDays/addBarberAppointmentDays", {
        salonId,
        barberId,
        appointmentDays: updatedActiveDays,
      });

      const { data } = await api.post(
        "/barberAppointmentTimes/addBarberAppointmentTime",
        {
          salonId,
          barberId,
          appointmentTimes: [
            {
              day: dayItem.name,
              startTime: dayItem.start,
              endTime: dayItem.end,
              barberIntervalTime: Number(dayItem.interval) || 20,
            },
          ],
        },
      );

      setDays((prev) =>
        prev.map((d) =>
          d.id === dayItem.id
            ? {
                ...d,
                active: true,
                hours: `${dayItem.start} - ${dayItem.end}`,
              }
            : d,
        ),
      );
      Toast.success(data?.message || "Appointment times updated");
      setExpandedDayId(null);
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "Failed to save appointment times",
      );
    } finally {
      setSavingDayId(null);
    }
  };

  const handleAddBreak = async (dayItem) => {
    if (!salonId || !barberId) return;

    try {
      setBreakLoading(true);
      const { data } = await api.post(
        "/barberBreakTimes/addBarberBreakTimes",
        {
          salonId,
          barberId,
          day: dayItem.name,
          breakTimes: [
            {
              startTime: breakStart,
              endTime: breakEnd,
            },
          ],
        },
      );
      Toast.success(data?.message || "Break time added");
      await fetchDayBreaks(dayItem.name);
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "Failed to add break time",
      );
    } finally {
      setBreakLoading(false);
    }
  };

  const handleDeleteBreak = async (dayItem, slotId) => {
    if (!salonId || !barberId || !slotId) return;

    try {
      setBreakLoading(true);
      const { data } = await api.post(
        "/barberBreakTimes/deleteBarberbreakTime",
        {
          salonId,
          barberId,
          slotIds: [slotId],
        },
      );
      Toast.success(data?.message || "Break time deleted");
      await fetchDayBreaks(dayItem.name);
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "Failed to delete break time",
      );
    } finally {
      setBreakLoading(false);
    }
  };

  const handleToggleOffDay = (dateStr) => {
    setSelectedOffDates((prev) =>
      prev.includes(dateStr)
        ? prev.filter((item) => item !== dateStr)
        : [...prev, dateStr],
    );
  };

  const handleSaveOffDays = async () => {
    if (!salonId || !barberId || savingOffDays) return;

    const datesToAdd = selectedOffDates.filter(
      (d) => !initialOffDates.includes(d),
    );
    const datesToDelete = initialOffDates.filter(
      (d) => !selectedOffDates.includes(d),
    );

    if (datesToAdd.length === 0 && datesToDelete.length === 0) {
      Toast.info("No off-day changes to save");
      return;
    }

    try {
      setSavingOffDays(true);

      if (datesToAdd.length > 0) {
        await api.post("/barberDayOff/addBarberDayOffs", {
          salonId,
          barberId,
          barberDayOffs: datesToAdd,
        });
      }

      if (datesToDelete.length > 0) {
        await api.post("/barberDayOff/deleteBarberDayOffs", {
          salonId,
          barberId,
          dates: datesToDelete,
        });
      }

      Toast.success("Barber off days updated successfully");
      await fetchOffDays();
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "Failed to update barber off days",
      );
    } finally {
      setSavingOffDays(false);
    }
  };

  const renderAsymmetricalDayCard = ({ item }) => {
    const isExpanded = expandedDayId === item.id;
    const isSavingThisDay = savingDayId === item.id;

    return (
      <View
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
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => toggleDayActive(item)}
              style={[
                styles.avatarBoxContainer,
                {
                  backgroundColor: item.active
                    ? darkTheme.colors.accent
                    : "rgba(255,255,255,0.02)",
                },
              ]}
            >
              {item.active && (
                <Ionicons name="checkmark" size={scale(11)} color="#000000" />
              )}
            </TouchableOpacity>

            <View style={styles.clientMetaBlock}>
              <Text style={styles.clientNameText}>{item.name}</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.emailText}
              >
                {item.salonOff
                  ? "Salon Closed"
                  : "Weekly Shift Allocation Node"}
              </Text>
            </View>
          </View>

          <View style={styles.headerRightSubgroup}>
            <View style={styles.stylistPillBadge}>
              <Text
                style={[
                  styles.stylistText,
                  {
                    color: item.active
                      ? darkTheme.colors.accent
                      : darkTheme.colors.textMuted,
                  },
                ]}
              >
                {item.salonOff
                  ? "SALON OFF"
                  : item.active
                    ? "ACTIVE"
                    : "DISABLED"}
              </Text>
            </View>
            <View style={styles.timeScheduleRow}>
              <Ionicons
                name="time-outline"
                size={scale(11)}
                color={darkTheme.colors.textMuted}
                style={{ marginRight: scale(4) }}
              />
              <Text style={styles.timeText}>{item.hours}</Text>
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
          <View style={styles.pricingRow}>
            <Text style={styles.priceLabel}>Configured Shift Window</Text>
            <Text style={styles.priceValue}>
              {item.hours === "-" ? "None Specified" : item.hours}
            </Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.totalLabel}>Slot Interval</Text>
            <Text
              style={[styles.totalValue, { color: darkTheme.colors.accent }]}
            >
              {item.interval} mins
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.fineDividerLine,
            { backgroundColor: "rgba(255,255,255,0.05)" },
          ]}
        />

        <View style={styles.cardFooterRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleExpandDay(item)}
            style={[
              styles.phoneActionButtonRow,
              { backgroundColor: "rgba(255, 255, 255, 0.02)" },
            ]}
          >
            <Feather
              name="edit-2"
              size={scale(11)}
              color={darkTheme.colors.textMuted}
              style={{ marginRight: scale(6) }}
            />
            <Text style={styles.footerText}>
              Adjust Shift Timeline Matrices
            </Text>
          </TouchableOpacity>
        </View>

        {isExpanded && (
          <View style={styles.nestedManagementGrid}>
            <Text style={styles.matrixLabel}>APPOINTMENT HOURS</Text>
            <View style={styles.inputAdjustmentRow}>
              <Dropdown
                style={styles.customDropdownSelector}
                placeholderStyle={styles.pickerValText}
                selectedTextStyle={styles.pickerValText}
                containerStyle={styles.dropdownMenuContainer}
                itemTextStyle={styles.pickerValText}
                activeColor="rgba(255, 149, 0, 0.12)"
                data={DEFAULT_TIME_OPTIONS}
                maxHeight={200}
                labelField="label"
                valueField="value"
                value={item.start}
                onChange={(opt) => updateDayField(item.id, "start", opt.value)}
                renderRightIcon={() => (
                  <Ionicons
                    name="chevron-down"
                    size={scale(11)}
                    color={darkTheme.colors.textMuted}
                  />
                )}
              />
              <Dropdown
                style={styles.customDropdownSelector}
                placeholderStyle={styles.pickerValText}
                selectedTextStyle={styles.pickerValText}
                containerStyle={styles.dropdownMenuContainer}
                itemTextStyle={styles.pickerValText}
                activeColor="rgba(255, 149, 0, 0.12)"
                data={DEFAULT_TIME_OPTIONS}
                maxHeight={200}
                labelField="label"
                valueField="value"
                value={item.end}
                onChange={(opt) => updateDayField(item.id, "end", opt.value)}
                renderRightIcon={() => (
                  <Ionicons
                    name="chevron-down"
                    size={scale(11)}
                    color={darkTheme.colors.textMuted}
                  />
                )}
              />
            </View>

            <Text style={styles.matrixLabel}>INTERVAL TIME</Text>
            <Dropdown
              style={[
                styles.customDropdownSelector,
                { width: "100%", marginBottom: verticalScale(12) },
              ]}
              placeholderStyle={styles.pickerValText}
              selectedTextStyle={styles.pickerValText}
              containerStyle={styles.dropdownMenuContainer}
              itemTextStyle={styles.pickerValText}
              activeColor="rgba(255, 149, 0, 0.12)"
              data={INTERVAL_OPTIONS}
              maxHeight={200}
              labelField="label"
              valueField="value"
              value={item.interval}
              onChange={(opt) => updateDayField(item.id, "interval", opt.value)}
              renderRightIcon={() => (
                <Ionicons
                  name="chevron-down"
                  size={scale(11)}
                  color={darkTheme.colors.textMuted}
                />
              )}
            />

            <Text style={styles.matrixLabel}>ADD BREAK</Text>
            <View style={styles.breakItemEntityRow}>
              <Dropdown
                style={styles.customDropdownSelector}
                placeholderStyle={styles.pickerValText}
                selectedTextStyle={styles.pickerValText}
                containerStyle={styles.dropdownMenuContainer}
                itemTextStyle={styles.pickerValText}
                activeColor="rgba(255, 149, 0, 0.12)"
                data={breakRangeOptions}
                maxHeight={180}
                labelField="label"
                valueField="value"
                value={breakStart}
                onChange={(opt) => setBreakStart(opt.value)}
              />
              <Dropdown
                style={styles.customDropdownSelector}
                placeholderStyle={styles.pickerValText}
                selectedTextStyle={styles.pickerValText}
                containerStyle={styles.dropdownMenuContainer}
                itemTextStyle={styles.pickerValText}
                activeColor="rgba(255, 149, 0, 0.12)"
                data={breakRangeOptions}
                maxHeight={180}
                labelField="label"
                valueField="value"
                value={breakEnd}
                onChange={(opt) => setBreakEnd(opt.value)}
              />
              <TouchableOpacity
                style={[
                  styles.addActionPillBadge,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
                onPress={() => handleAddBreak(item)}
                disabled={breakLoading}
              >
                {breakLoading ? (
                  <ActivityIndicator size="small" color="#000000" />
                ) : (
                  <Text style={styles.addActionText}>Add</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Existing Breaks List */}
            {Array.isArray(item.breaks) && item.breaks.length > 0 && (
              <View style={styles.breaksListContainer}>
                {item.breaks.map((brk, bIdx) => (
                  <View
                    key={brk._id || `${brk.startTime}-${bIdx}`}
                    style={styles.breakSavedPill}
                  >
                    <Text style={styles.breakSavedText}>
                      Break: {brk.startTime} - {brk.endTime}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleDeleteBreak(item, brk._id)}
                      disabled={breakLoading}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={scale(13)}
                        color="#FF3B30"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Action Row */}
            <View style={styles.modalActionGroupRow}>
              <TouchableOpacity
                onPress={() => setExpandedDayId(null)}
                style={[styles.actionBtnBase, styles.cancelActionButton]}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleApplyDaySchedule(item)}
                disabled={isSavingThisDay}
                style={[styles.actionBtnBase, styles.luxuryAccentShadedButton]}
              >
                {isSavingThisDay ? (
                  <ActivityIndicator
                    size="small"
                    color={darkTheme.colors.accent}
                  />
                ) : (
                  <Text style={styles.luxuryAccentShadedButtonText}>Apply</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
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
      <BarberHeader
        title="IQB"
        subTitle="Manage shift logs and scheduling rules"
        showBack={false}
      />

      <View style={styles.tabSectionWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab("availability")}
          style={[
            styles.tabSelectorNode,
            activeTab === "availability" && {
              backgroundColor: darkTheme.colors.card,
              borderColor: "rgba(255,255,255,0.05)",
            },
          ]}
        >
          <Text
            style={[
              styles.tabSelectorText,
              {
                color:
                  activeTab === "availability"
                    ? darkTheme.colors.textMain
                    : darkTheme.colors.textMuted,
              },
            ]}
          >
            Availability
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab("offdays")}
          style={[
            styles.tabSelectorNode,
            activeTab === "offdays" && {
              backgroundColor: darkTheme.colors.card,
              borderColor: "rgba(255,255,255,0.05)",
            },
          ]}
        >
          <Text
            style={[
              styles.tabSelectorText,
              {
                color:
                  activeTab === "offdays"
                    ? darkTheme.colors.textMain
                    : darkTheme.colors.textMuted,
              },
            ]}
          >
            Barber Off Days
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "availability" ? (
        loadingAvailability ? (
          <ActivityIndicator
            color={darkTheme.colors.accent}
            style={{ marginTop: verticalScale(40) }}
          />
        ) : (
          <FlatList
            data={days}
            keyExtractor={(item) => item.id}
            renderItem={renderAsymmetricalDayCard}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchAvailabilityData(true)}
                tintColor={darkTheme.colors.accent}
                colors={[darkTheme.colors.accent]}
              />
            }
            ListHeaderComponent={
              <View style={styles.structuralMatrixHeader}>
                <Text style={styles.matrixHeaderText}># DAYS</Text>
              </View>
            }
          />
        )
      ) : (
        <View style={styles.offDaysFlexFrame}>
          <View style={styles.monthHeaderSubstrip}>
            <TouchableOpacity
              onPress={() =>
                setCurrentMonth((prev) => prev.clone().subtract(1, "month"))
              }
            >
              <Ionicons name="chevron-back" size={scale(14)} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.monthSubstripLabel}>
              {currentMonth.format("MMMM YYYY")}
            </Text>
            <TouchableOpacity
              onPress={() =>
                setCurrentMonth((prev) => prev.clone().add(1, "month"))
              }
            >
              <Ionicons
                name="chevron-forward"
                size={scale(14)}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          {loadingOffDays ? (
            <ActivityIndicator
              color={darkTheme.colors.accent}
              style={{ marginTop: verticalScale(40) }}
            />
          ) : (
            <FlatList
              data={monthDaysList}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.offDaysListContainer}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => fetchOffDays(true)}
                  tintColor={darkTheme.colors.accent}
                  colors={[darkTheme.colors.accent]}
                />
              }
              renderItem={({ item }) => {
                const isSelected = selectedOffDates.includes(item.dateStr);
                return (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => handleToggleOffDay(item.dateStr)}
                    style={[
                      styles.offDayRecordItemCard,
                      {
                        backgroundColor: darkTheme.colors.card,
                        borderColor: isSelected
                          ? darkTheme.colors.accent
                          : "transparent",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.offDayRecordLabelText,
                        isSelected && {
                          color: darkTheme.colors.accent,
                          fontWeight: "600",
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={scale(13)}
                        color={darkTheme.colors.accent}
                        style={styles.absoluteCheckIcon}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          )}

          {/* Fixed Floating Bottom Bar with Dynamic Save Button Placement */}
          <View style={styles.floatingActionFooterContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.luxuryAccentShadedButton}
              onPress={handleSaveOffDays}
              disabled={savingOffDays}
            >
              {savingOffDays ? (
                <ActivityIndicator
                  size="small"
                  color={darkTheme.colors.accent}
                />
              ) : (
                <Text style={styles.luxuryAccentShadedButtonText}>Save</Text>
              )}
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
    height: verticalScale(34),
    borderRadius: scale(6),
    paddingHorizontal: scale(12),
    backgroundColor: "#1C1C1E",
  },
  dropdownMenuContainer: {
    backgroundColor: "#161618",
    borderColor: darkTheme.colors.border,
    borderWidth: 1,
    borderRadius: scale(8),
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
  breaksListContainer: {
    gap: verticalScale(6),
    marginBottom: verticalScale(10),
  },
  breakSavedPill: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: scale(6),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  breakSavedText: {
    color: "#FFFFFF",
    fontSize: scale(11.5),
    fontWeight: "500",
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
    paddingBottom:
      Platform.OS === "ios" ? verticalScale(20) : verticalScale(12),
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.03)",
  },
});

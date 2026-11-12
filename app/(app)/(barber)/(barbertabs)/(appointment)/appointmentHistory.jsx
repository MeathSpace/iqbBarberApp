import { Feather, Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import moment from "moment";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import BarberHeader from "../../../../../components/Header/BarberHeader";
import RangeCalendarModal from "../../../../../components/RangeCalender";
import { darkTheme } from "../../../../../constants/appTheme";
import { useBarberAuth } from "../../../../../context/barber/AuthContext";
import api from "../../../../../utils/api";

const AppointmentHistory = () => {
  const { authenticatedUser } = useBarberAuth();
  const salonId = authenticatedUser?.salonId;
  const barberId = authenticatedUser?.barberId;

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const mapItem = useCallback(
    (item) => {
      const services = item.services || [];
      const price = services.reduce(
        (total, service) => total + Number(service.servicePrice || 0),
        0,
      );
      const rawStatus = item.status || "Pending";
      const normalizedStatus =
        rawStatus.toLowerCase() === "served"
          ? "Served"
          : rawStatus.toLowerCase() === "cancelled" ||
              rawStatus.toLowerCase() === "canceled"
            ? "Cancelled"
            : rawStatus;

      return {
        ...item,
        id: item._id,
        clientName: item.customerName || "Customer",
        barberName: item.barberName || authenticatedUser?.name || "Barber",
        service:
          services
            .map((service) => service.serviceName)
            .filter(Boolean)
            .join(", ") || "Service",
        price: `₹ ${price}`,
        date: item.appointmentDate
          ? moment(item.appointmentDate).format("DD/MM/YYYY")
          : "",
        status: normalizedStatus,
      };
    },
    [authenticatedUser?.name],
  );

  const fetchHistory = useCallback(
    async ({
      pageNum = 1,
      isRefresh = false,
      searchVal = searchQuery,
      fromDate = startDate,
      toDate = endDate,
    } = {}) => {
      if (!salonId || !barberId) {
        setHistory([]);
        return;
      }

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else if (pageNum === 1) {
          setHistoryLoading(true);
        } else {
          setLoadingMore(true);
        }

        const payload = {
          salonId,
          barberId,
          page: pageNum,
          limit: 10,
          search: searchVal.trim(),
          ...(fromDate ? { from: fromDate.format("YYYY-MM-DD") } : {}),
          ...(toDate ? { to: toDate.format("YYYY-MM-DD") } : {}),
        };

        const { data } = await api.post(
          "/appointmentHistory/getAppointmentHistoryByBarberIdSalonId",
          payload,
        );
        const items = Array.isArray(data?.response) ? data.response : [];
        const mapped = items.map(mapItem);

        if (pageNum === 1) {
          setHistory(mapped);
        } else {
          setHistory((prev) => [...prev, ...mapped]);
        }

        setPage(pageNum);
        setHasMore(items.length >= 10);
      } catch (error) {
        console.error(
          "Failed to fetch barber appointment history:",
          error?.response?.data || error.message,
        );
        if (pageNum === 1) {
          setHistory([]);
        }
      } finally {
        setHistoryLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [salonId, barberId, searchQuery, startDate, endDate, mapItem],
  );

  useFocusEffect(
    useCallback(() => {
      fetchHistory({ pageNum: 1 });
    }, [fetchHistory]),
  );

  const handleRefresh = useCallback(() => {
    fetchHistory({ pageNum: 1, isRefresh: true });
  }, [fetchHistory]);

  const handleLoadMore = () => {
    if (!historyLoading && !loadingMore && hasMore && history.length >= 10) {
      fetchHistory({ pageNum: page + 1 });
    }
  };

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
              <Ionicons
                name="person"
                size={scale(16)}
                color={darkTheme.colors.textMuted}
              />
            </View>
            <View style={styles.metaData}>
              <Text style={[darkTheme.typography.cardTitle, styles.clientName]}>
                {item.clientName}
              </Text>
              <Text style={[darkTheme.typography.bodyMuted, styles.barberText]}>
                Stylist: {item.barberName}
              </Text>
              <Text
                style={[darkTheme.typography.bodyMuted, styles.serviceText]}
              >
                {item.service}
              </Text>
            </View>
          </View>

          <View style={styles.priceDateBlock}>
            <Text
              style={[
                darkTheme.typography.bodyMain,
                styles.priceText,
                { color: darkTheme.colors.accent },
              ]}
            >
              {item.price}
            </Text>
            <Text style={[darkTheme.typography.bodyMuted, styles.dateText]}>
              {item.date}
            </Text>
          </View>
        </View>

        <View
          style={[styles.divider, { backgroundColor: darkTheme.colors.border }]}
        />

        <View style={styles.cardFooterRow}>
          <Text
            style={[darkTheme.typography.bodyMuted, { fontSize: scale(11) }]}
          >
            {item.timeSlots ? `Slot: ${item.timeSlots}` : "Status Profile"}
          </Text>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isServed
                  ? "rgba(52, 199, 89, 0.1)"
                  : "rgba(255, 59, 48, 0.1)",
                borderRadius: darkTheme.layout.borderRadiusSmall,
              },
            ]}
          >
            <Ionicons
              name={isServed ? "checkmark-circle" : "close-circle"}
              size={scale(13)}
              color={
                isServed
                  ? darkTheme.status.success.text
                  : darkTheme.status.error.text
              }
              style={{ marginRight: scale(4) }}
            />
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                {
                  color: isServed
                    ? darkTheme.status.success.text
                    : darkTheme.status.error.text,
                  fontWeight: "600",
                  fontSize: scale(11),
                },
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
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <BarberHeader
        title="Appointment History"
        subTitle="Log of past walk-in customers and arrivals"
        showBack={false}
      />

      <View style={styles.topContainer}>
        <View style={styles.filterActionRow}>
          <View style={styles.toolsLeftGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setCalendarVisible(true)}
              style={[
                styles.toolButton,
                {
                  backgroundColor:
                    startDate || endDate
                      ? "rgba(255, 149, 0, 0.12)"
                      : darkTheme.colors.card,
                  borderColor:
                    startDate || endDate
                      ? darkTheme.colors.accent
                      : darkTheme.colors.border,
                },
              ]}
            >
              <Feather
                name="calendar"
                size={scale(14)}
                color={
                  startDate || endDate
                    ? darkTheme.colors.accent
                    : darkTheme.colors.textMain
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (showSearch && searchQuery) {
                  setSearchQuery("");
                }
                setShowSearch((prev) => !prev);
              }}
              style={[
                styles.toolButton,
                {
                  backgroundColor: showSearch
                    ? "rgba(255, 149, 0, 0.12)"
                    : darkTheme.colors.card,
                  borderColor: showSearch
                    ? darkTheme.colors.accent
                    : darkTheme.colors.border,
                },
              ]}
            >
              <Ionicons
                name="search"
                size={scale(14)}
                color={
                  showSearch
                    ? darkTheme.colors.accent
                    : darkTheme.colors.textMain
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        {showSearch && (
          <View
            style={[
              styles.searchBarContainer,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
              },
            ]}
          >
            <Ionicons
              name="search"
              size={scale(15)}
              color={darkTheme.colors.textMuted}
              style={{ marginRight: scale(8) }}
            />
            <TextInput
              style={[styles.searchInput, { color: darkTheme.colors.textMain }]}
              placeholder="Search customer or service..."
              placeholderTextColor={darkTheme.colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons
                  name="close-circle"
                  size={scale(16)}
                  color={darkTheme.colors.textMuted}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <FlatList
        data={history}
        keyExtractor={(item, idx) => `${item.id}-${idx}`}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={10}
        removeClippedSubviews={Platform.OS === "android"}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={darkTheme.colors.accent}
            colors={[darkTheme.colors.accent]}
            backgroundColor="transparent"
          />
        }
        ListEmptyComponent={
          historyLoading ? (
            <ActivityIndicator
              color={darkTheme.colors.accent}
              style={{ marginTop: verticalScale(40) }}
            />
          ) : (
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                { textAlign: "center", marginTop: verticalScale(40) },
              ]}
            >
              No appointment history found
            </Text>
          )
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              color={darkTheme.colors.accent}
              style={{ marginVertical: verticalScale(16) }}
            />
          ) : null
        }
      />

      <RangeCalendarModal
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        startDate={startDate}
        endDate={endDate}
        onSelectRange={({ startDate: newStart, endDate: newEnd }) => {
          setStartDate(newStart);
          setEndDate(newEnd);
        }}
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
    gap: verticalScale(10),
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
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    width: "100%",
  },
  searchInput: {
    flex: 1,
    fontSize: scale(13),
    paddingVertical: 0,
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

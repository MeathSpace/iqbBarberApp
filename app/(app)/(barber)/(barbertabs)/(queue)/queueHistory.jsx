import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import moment from "moment";
import React, { useCallback, useState } from "react";
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

const QueueHistory = () => {
  const { authenticatedUser } = useBarberAuth();
  const salonId = authenticatedUser?.salonId;
  const barberId = authenticatedUser?.barberId;

  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const mapQueueHistoryItem = useCallback(
    (item) => {
      const services = Array.isArray(item?.services) ? item.services : [];
      const computedCost = services.reduce(
        (sum, s) => sum + Number(s?.servicePrice || 0),
        0,
      );
      const totalPrice = item?.totalCost ?? computedCost;
      const hasVip = services.some((s) => Boolean(s?.vipService));

      return {
        ...item,
        id: item?._id || `${item?.dateJoinedQ}-${item?.qPosition}`,
        clientName: item?.customerName || "Customer",
        barberName: item?.barberName || authenticatedUser?.name || "Barber",
        service:
          services
            .map((s) => s?.serviceName)
            .filter(Boolean)
            .join(", ") ||
          item?.serviceName ||
          "Service",
        price: `₹ ${totalPrice}`,
        date: item?.dateJoinedQ
          ? moment(item.dateJoinedQ).format("DD/MM/YYYY")
          : "",
        status:
          item?.status?.toLowerCase() === "served"
            ? "Served"
            : item?.status?.toLowerCase() === "cancelled" ||
                item?.status?.toLowerCase() === "canceled"
              ? "Cancelled"
              : item?.status || "Served",
        mode: item?.methodUsed || "Walk-In",
        type: hasVip ? "VIP" : item?.joinedQType || "Regular",
      };
    },
    [authenticatedUser?.name],
  );

  const fetchQueueHistory = useCallback(
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
          setLoading(true);
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
          "/queueHistory/getQueueHistoryBySalonIdBarberId",
          payload,
        );

        const rawItems = Array.isArray(data?.response) ? data.response : [];
        const mappedItems = rawItems.map(mapQueueHistoryItem);

        if (pageNum === 1) {
          setHistory(mappedItems);
        } else {
          setHistory((prev) => [...prev, ...mappedItems]);
        }

        setPage(pageNum);
        setHasMore(rawItems.length >= 10);
      } catch (error) {
        console.log(
          "Failed to fetch barber queue history:",
          error?.response?.data || error?.message,
        );
        if (pageNum === 1) {
          setHistory([]);
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [
      salonId,
      barberId,
      searchQuery,
      startDate,
      endDate,
      mapQueueHistoryItem,
    ],
  );

  useFocusEffect(
    useCallback(() => {
      fetchQueueHistory({ pageNum: 1 });
    }, [fetchQueueHistory]),
  );

  const handleRefresh = useCallback(() => {
    fetchQueueHistory({ pageNum: 1, isRefresh: true });
  }, [fetchQueueHistory]);

  const handleLoadMore = () => {
    if (!loading && !loadingMore && hasMore && history.length >= 10) {
      fetchQueueHistory({ pageNum: page + 1 });
    }
  };

  const renderHistoryItem = ({ item }) => {
    const isServed = item.status === "Served";
    const isVIP = item.type === "VIP";

    const getModeIcon = (mode) => {
      if (mode === "Walk-In") return "walk";
      if (mode === "Mobile" || mode === "App") return "phone-portrait-outline";
      return "globe-outline";
    };

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
        {/* Main Info Row */}
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

        {/* Footer Metrics Row */}
        <View style={styles.cardFooterRow}>
          {/* Booking Mode */}
          <View
            style={[
              styles.metricMiniBadge,
              {
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderColor: darkTheme.colors.border,
              },
            ]}
          >
            <Ionicons
              name={getModeIcon(item.mode)}
              size={scale(11)}
              color={darkTheme.colors.textMuted}
              style={{ marginRight: scale(4) }}
            />
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                styles.metricBadgeText,
                { color: darkTheme.colors.textMuted },
              ]}
              numberOfLines={1}
            >
              {item.mode}
            </Text>
          </View>

          {/* Customer Type */}
          <View
            style={[
              styles.metricMiniBadge,
              {
                backgroundColor: isVIP
                  ? "rgba(255, 149, 0, 0.08)"
                  : "rgba(255, 255, 255, 0.03)",
                borderColor: isVIP
                  ? "rgba(255, 149, 0, 0.2)"
                  : darkTheme.colors.border,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={isVIP ? "crown" : "account"}
              size={scale(11)}
              color={
                isVIP ? darkTheme.colors.accent : darkTheme.colors.textMuted
              }
              style={{ marginRight: scale(4) }}
            />
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                styles.metricBadgeText,
                {
                  color: isVIP
                    ? darkTheme.colors.accent
                    : darkTheme.colors.textMuted,
                },
              ]}
              numberOfLines={1}
            >
              {item.type}
            </Text>
          </View>

          {/* Status Badge */}
          <View
            style={[
              styles.metricMiniBadge,
              {
                backgroundColor: isServed
                  ? "rgba(52, 199, 89, 0.08)"
                  : "rgba(255, 59, 48, 0.08)",
                borderColor: isServed
                  ? "rgba(52, 199, 89, 0.2)"
                  : "rgba(255, 59, 48, 0.2)",
              },
            ]}
          >
            <Ionicons
              name={isServed ? "checkmark-circle" : "close-circle"}
              size={scale(11)}
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
                styles.metricBadgeText,
                {
                  color: isServed
                    ? darkTheme.status.success.text
                    : darkTheme.status.error.text,
                  fontWeight: "600",
                },
              ]}
              numberOfLines={1}
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
        title="Queue History"
        subTitle="Log of past walk-in customers and arrivals"
        showBack={false}
      />

      <View style={styles.topContainer}>
        <View style={styles.searchFilterRow}>
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
              size={scale(16)}
              color={darkTheme.colors.textMuted}
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, { color: darkTheme.colors.textMain }]}
              placeholder="Search client, stylist, or service..."
              placeholderTextColor={darkTheme.colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              clearButtonMode="while-editing"
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

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setCalendarVisible(true)}
            style={[
              styles.calendarBtn,
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
              size={scale(15)}
              color={
                startDate || endDate
                  ? darkTheme.colors.accent
                  : darkTheme.colors.textMain
              }
            />
          </TouchableOpacity>
        </View>
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
          loading ? (
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
              No queue history found
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

export default QueueHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    marginBottom: verticalScale(12),
  },
  searchFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(42),
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
  },
  calendarBtn: {
    width: verticalScale(42),
    height: verticalScale(42),
    borderWidth: 1,
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: scale(8),
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
  metricMiniBadge: {
    flexDirection: "row",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(4),
    borderWidth: 1,
    flex: 1,
    maxWidth: "31%",
  },
  metricBadgeText: {
    fontSize: scale(11),
  },
});

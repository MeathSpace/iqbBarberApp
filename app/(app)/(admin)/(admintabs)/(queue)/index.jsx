import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
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

import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import api from "../../../../../utils/api";

// --- Custom Stealth Dark Palette Tokens for Shimmer ---
const SHIMMER_COLORS = {
  header: { baseColor: "#221f1c", highlightColor: "#332e2a" },
  card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
  content: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
  button: { baseColor: "#2a2a2a", highlightColor: "#333333" },
};

// --- Full Screen Skeleton View ---
const ScreenSkeletonView = () => {
  return (
    <View style={styles.skeletonContainer}>
      {/* Search Bar Skeleton */}
      <View style={styles.topContainer}>
        <Shimmer
          style={styles.skeletonSearchBar}
          baseColor={SHIMMER_COLORS.card.baseColor}
          highlightColor={SHIMMER_COLORS.card.highlightColor}
        />
      </View>

      {/* Queue Cards Stack Skeleton */}
      <View style={styles.skeletonListContent}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={styles.skeletonCard}>
            <View style={styles.cardLeft}>
              {/* Position Circle Badge */}
              <Shimmer
                style={styles.skeletonCircle}
                baseColor={SHIMMER_COLORS.content.baseColor}
                highlightColor={SHIMMER_COLORS.content.highlightColor}
              />
              {/* Details Block */}
              <View style={styles.skeletonDetailsBlock}>
                <Shimmer
                  style={styles.skeletonTextTitle}
                  baseColor={SHIMMER_COLORS.content.baseColor}
                  highlightColor={SHIMMER_COLORS.content.highlightColor}
                />
                <Shimmer
                  style={styles.skeletonTextSub}
                  baseColor={SHIMMER_COLORS.content.baseColor}
                  highlightColor={SHIMMER_COLORS.content.highlightColor}
                />
              </View>
            </View>

            {/* Right Status Badge */}
            <Shimmer
              style={styles.skeletonStatusBadge}
              baseColor={SHIMMER_COLORS.content.baseColor}
              highlightColor={SHIMMER_COLORS.content.highlightColor}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

// API Helpers with Pagination & Search
const fetchQueueListApi = async (salonId, page = 1, query = "") => {
  const { data } = await api.get(
    `/queue/getQListBySalonId?salonId=${salonId}&page=${page}&limit=10${query ? `&search=${query}` : ""}`,
  );
  return {
    queueList: data?.response || [],
    pagination: data?.pagination || { page: 1, totalPages: 1 },
  };
};

const fetchBarberListApi = async (salonId) => {
  const { data } = await api.post(
    `/barber/getAllBarberBySalonId?salonId=${salonId}`,
  );
  return data?.getAllBarbers || [];
};

const serveQueueApi = async (queueData) => {
  const { data } = await api.post("/queue/barberServedQueue", queueData);
  return data;
};

const cancelQueueApi = async (queueData) => {
  const { data } = await api.post(`/queue/cancelQ`, queueData);
  return data;
};

const QueueList = () => {
  const { authenticatedUser } = useAdminAuth();
  const salonId = authenticatedUser?.salonId;
  const adminEmail = authenticatedUser?.email;

  // Queue List & Pagination State
  const [getAllQueueList, setGetAllQueueList] = useState({
    loading: false,
    queueList: [],
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Barbers List State
  const [getAdminBarberList, setGetAdminBarberList] = useState({
    loading: false,
    getAllBarbers: [],
  });

  // Action Loading States
  const [adminServeQueueLoading, setAdminServeQueueLoading] = useState(false);
  const [adminCancelQueueLoading, setAdminCancelQueueLoading] = useState(false);

  // Form & Selection State
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedQueueItem, setSelectedQueueItem] = useState(null);
  const [queueItemData, setQueueItemData] = useState({});
  const [choosebarber, setChoosebarber] = useState("");
  const [choosebarberemail, setChoosebarberemail] = useState("");
  const [copybarberlistdata, setCopybarberlistdata] = useState([]);

  // Unified Screen Loading Gate
  const isScreenLoading = getAllQueueList.loading && page === 1;

  // Debounce Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Exact Web Parity: Filter Clocked-In Barbers for copybarberlistdata
  useEffect(() => {
    const barberList = getAdminBarberList.getAllBarbers;
    if (barberList && barberList.length > 0) {
      const clockedinbarbers = barberList.filter((b) => b.isClockedIn);
      setCopybarberlistdata(clockedinbarbers);
    } else {
      setCopybarberlistdata([]);
    }
  }, [getAdminBarberList.getAllBarbers]);

  // Fetch Queue List (Initial / Refresh)
  const fetchQueueList = useCallback(
    async (pageNum = 1, query = "", isMore = false) => {
      if (!salonId) return;
      try {
        if (isMore) {
          setIsFetchingMore(true);
        } else {
          setGetAllQueueList((prev) => ({ ...prev, loading: true }));
        }

        const res = await fetchQueueListApi(salonId, pageNum, query);

        setGetAllQueueList((prev) => ({
          loading: false,
          queueList: isMore
            ? [...prev.queueList, ...(res.queueList || [])]
            : res.queueList || [],
        }));

        setPage(res.pagination?.page || 1);
        setTotalPages(res.pagination?.totalPages || 1);
      } catch (error) {
        console.error("Fetch Queue Error:", error);
        setGetAllQueueList((prev) => ({ ...prev, loading: false }));
      } finally {
        setIsFetchingMore(false);
      }
    },
    [salonId],
  );

  // Fetch Barber List
  const fetchBarberList = useCallback(async () => {
    if (!salonId) return;
    try {
      setGetAdminBarberList((prev) => ({ ...prev, loading: true }));
      const barbers = await fetchBarberListApi(salonId);

      setGetAdminBarberList({
        loading: false,
        getAllBarbers: barbers || [],
      });
    } catch (error) {
      console.error("Fetch Barber Error:", error);
      setGetAdminBarberList((prev) => ({ ...prev, loading: false }));
    }
  }, [salonId]);

  // Screen Focus Effect
  useFocusEffect(
    useCallback(() => {
      setPage(1);
      fetchQueueList(1, debouncedQuery, false);
      fetchBarberList();
    }, [fetchQueueList, fetchBarberList, debouncedQuery]),
  );

  // Load Next Page on Scroll End
  const handleLoadMore = () => {
    if (!isFetchingMore && page < totalPages && !getAllQueueList.loading) {
      fetchQueueList(page + 1, debouncedQuery, true);
    }
  };

  // Modal & Selection Handler (Only triggers if qPosition is 1)
  const handleOpenAssignmentModal = (b) => {
    if (b.qPosition !== 1) return;

    const queueData = {
      adminEmail,
      barberId: b.barberId,
      salonId,
      services: b.services,
      _id: b._id,
    };

    setQueueItemData(queueData);
    setSelectedQueueItem(b);
    setChoosebarber(b?.barberName || "");
    setChoosebarberemail(b?.barberEmail || "");
  };

  // Helper to safely close modal if not performing async API calls
  const handleDismissModal = () => {
    if (!adminServeQueueLoading && !adminCancelQueueLoading) {
      setSelectedQueueItem(null);
    }
  };

  // Serve Queue Handler with Confirmation Alert
  const serveQHandler = () => {
    if (adminServeQueueLoading || adminCancelQueueLoading) return;

    Alert.alert(
      "Confirm Serve",
      `Are you sure you want to mark ${selectedQueueItem?.customerName || "this customer"} as served by ${choosebarber || "selected barber"}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Serve",
          style: "default",
          onPress: async () => {
            const queuedata = {
              ...queueItemData,
              servedByEmail: choosebarberemail,
            };

            try {
              setAdminServeQueueLoading(true);
              await serveQueueApi(queuedata);
              setSelectedQueueItem(null);
              await fetchQueueList(1, debouncedQuery, false);
            } catch (error) {
              console.error("Serve Queue Error:", error);
            } finally {
              setAdminServeQueueLoading(false);
            }
          },
        },
      ],
    );
  };

  // Cancel Queue Handler with Confirmation Alert
  const cancelQHandler = (b) => {
    if (adminCancelQueueLoading || adminServeQueueLoading) return;

    const queueData = {
      adminEmail,
      barberId: b?.barberId || queueItemData?.barberId,
      salonId,
      _id: b?._id || queueItemData?._id,
    };

    Alert.alert(
      "Confirm Cancellation",
      `Are you sure you want to mark ${selectedQueueItem?.customerName || "this customer"} as cancelled by ${choosebarber || "selected barber"}?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel Queue",
          style: "destructive",
          onPress: async () => {
            try {
              setAdminCancelQueueLoading(true);
              await cancelQueueApi(queueData);
              setSelectedQueueItem(null);
              await fetchQueueList(1, debouncedQuery, false);
            } catch (error) {
              console.error("Cancel Queue Error:", error);
            } finally {
              setAdminCancelQueueLoading(false);
            }
          },
        },
      ],
    );
  };

  const renderQueueItem = ({ item }) => {
    const isNext = item.qPosition === 1;

    return (
      <TouchableOpacity
        activeOpacity={isNext ? 0.8 : 1}
        onPress={() => handleOpenAssignmentModal(item)}
        style={[
          styles.queueCard,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: isNext
              ? darkTheme.colors.accent
              : darkTheme.colors.border,
            borderRadius: darkTheme.layout.borderRadiusLarge,
          },
        ]}
      >
        <View style={styles.cardLeft}>
          {/* Left Badge: Strictly shows position number like #1, #2, etc. */}
          <View
            style={[
              styles.positionBadge,
              {
                backgroundColor: isNext ? "rgba(255, 149, 0, 0.15)" : "#2C2C2E",
              },
            ]}
          >
            <Text
              style={[
                darkTheme.typography.bodyMain,
                {
                  color: isNext
                    ? darkTheme.colors.accent
                    : darkTheme.colors.textMain,
                  fontWeight: "700",
                  fontSize: scale(11),
                },
              ]}
            >
              {`#${item.qPosition}`}
            </Text>
          </View>

          <View style={styles.detailsBlock}>
            <Text
              style={[darkTheme.typography.cardTitle, styles.clientName]}
              numberOfLines={1}
            >
              {item.customerName}
            </Text>
            <View style={styles.barberRow}>
              <Ionicons
                name="cut-outline"
                size={scale(12)}
                color={darkTheme.colors.textMuted}
              />
              <Text
                style={[darkTheme.typography.bodyMuted, styles.barberName]}
                numberOfLines={1}
              >
                Stylist: {item.barberName}
              </Text>
            </View>
          </View>
        </View>

        {/* Right Badge: Shows status ("Next" vs "Waiting") */}
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: isNext
                ? "rgba(255, 149, 0, 0.1)"
                : "rgba(142, 142, 147, 0.08)",
              borderRadius: darkTheme.layout.borderRadiusSmall,
            },
          ]}
        >
          <Text
            style={[
              darkTheme.typography.bodyMuted,
              {
                color: isNext ? darkTheme.colors.accent : "#AEAEB2",
                fontWeight: "600",
                fontSize: scale(11),
              },
            ]}
          >
            {isNext ? "Next" : "Waiting"}
          </Text>
        </View>
      </TouchableOpacity>
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
        title="Queue List"
        subTitle="Monitor and manage live customer arrivals"
        showBack={false}
      />

      {isScreenLoading ? (
        <ScreenSkeletonView />
      ) : (
        <>
          <View style={styles.topContainer}>
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
                placeholder="Search customer or stylist..."
                placeholderTextColor={darkTheme.colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={[darkTheme.typography.bodyMain, styles.searchField]}
                selectionColor={darkTheme.colors.accent}
                autoCapitalize="none"
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
          </View>

          <FlatList
            data={getAllQueueList.queueList}
            keyExtractor={(item) => item._id || item.id}
            renderItem={renderQueueItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.4}
            ListFooterComponent={
              isFetchingMore ? (
                <ActivityIndicator
                  size="small"
                  color={darkTheme.colors.accent}
                  style={{ marginVertical: verticalScale(16) }}
                />
              ) : null
            }
            maxToRenderPerBatch={10}
            windowSize={5}
            initialNumToRender={10}
            removeClippedSubviews={Platform.OS === "android"}
            ListEmptyComponent={
              <Text style={[darkTheme.typography.bodyMuted, styles.emptyText]}>
                No customers found in active queue
              </Text>
            }
          />
        </>
      )}

      {/* Assignment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedQueueItem !== null}
        onRequestClose={handleDismissModal}
      >
        <Pressable
          style={styles.modalOverlayScrim}
          onPress={handleDismissModal}
        >
          <Pressable
            style={[
              styles.calendarModalContent,
              { backgroundColor: darkTheme.colors.card },
            ]}
            onPress={(e) => e.stopPropagation()} // Prevents clicks inside modal from closing it
          >
            <View style={styles.modalHeaderRow}>
              <View>
                <Text
                  style={[
                    darkTheme.typography.cardTitle,
                    { fontWeight: "700" },
                  ]}
                >
                  Choose Barber
                </Text>
                <Text
                  style={[
                    darkTheme.typography.bodyMuted,
                    { fontSize: scale(11), marginTop: verticalScale(2) },
                  ]}
                >
                  Assign staff to {selectedQueueItem?.customerName}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeFormButtonCircle}
                disabled={adminServeQueueLoading || adminCancelQueueLoading}
                onPress={handleDismissModal}
              >
                <Ionicons name="close" size={scale(14)} color="#FF3B30" />
              </TouchableOpacity>
            </View>

            {/* Current Selected Input Box */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Current Selection
              </Text>
              <View
                style={[
                  styles.staticPillBannerInput,
                  {
                    backgroundColor: "rgba(0,0,0,0.25)",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <Text
                  style={[darkTheme.typography.bodyMain, { fontWeight: "700" }]}
                >
                  {choosebarber || "Select a barber"}
                </Text>
              </View>
            </View>

            {/* Available Barbers List Container with ScrollView */}
            <View style={[styles.inputGroup, { marginTop: verticalScale(14) }]}>
              <Text style={darkTheme.typography.inputLabel}>
                Available Barbers
              </Text>

              {getAdminBarberList.loading ? (
                <ActivityIndicator
                  size="small"
                  color={darkTheme.colors.accent}
                  style={{ marginVertical: verticalScale(10) }}
                />
              ) : copybarberlistdata?.length > 0 ? (
                <ScrollView
                  style={styles.barbersScrollContainer}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.barbersVerticalStack}>
                    {copybarberlistdata.map((barber) => {
                      const isSelected = choosebarberemail === barber.email;
                      const profilePic = barber?.profile?.[0]?.url;

                      return (
                        <TouchableOpacity
                          key={barber._id || barber.id}
                          activeOpacity={0.7}
                          onPress={() => {
                            setChoosebarberemail(barber.email);
                            setChoosebarber(barber.name);
                          }}
                          style={[
                            styles.barberSelectionRowCard,
                            {
                              backgroundColor: isSelected
                                ? "rgba(255, 149, 0, 0.05)"
                                : "rgba(255, 255, 255, 0.01)",
                              borderColor: isSelected
                                ? darkTheme.colors.accent
                                : darkTheme.colors.border,
                            },
                          ]}
                        >
                          <View style={styles.barberLeftGroup}>
                            <View style={styles.avatarCircle}>
                              {profilePic ? (
                                <Image
                                  source={{ uri: profilePic }}
                                  style={styles.avatarImage}
                                />
                              ) : (
                                <Ionicons
                                  name="person"
                                  size={scale(14)}
                                  color={darkTheme.colors.textMuted}
                                />
                              )}
                            </View>

                            <View>
                              <View style={styles.nameBadgeRowAlignment}>
                                <Text
                                  style={[
                                    styles.barberNameText,
                                    {
                                      color: isSelected
                                        ? darkTheme.colors.accent
                                        : darkTheme.colors.textMain,
                                    },
                                  ]}
                                >
                                  {barber.name}
                                </Text>
                                <View
                                  style={[
                                    styles.statusBadgeMicroPill,
                                    {
                                      backgroundColor: barber.isOnline
                                        ? "rgba(52, 199, 89, 0.1)"
                                        : "rgba(255, 59, 48, 0.1)",
                                    },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      styles.statusBadgePillText,
                                      {
                                        color: barber.isOnline
                                          ? "#34C759"
                                          : "#FF3B30",
                                      },
                                    ]}
                                  >
                                    {barber.isOnline ? "Online" : "Offline"}
                                  </Text>
                                </View>
                              </View>
                              <Text style={styles.queueCountTextSub}>
                                Queue Count : {barber.queueCount}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.ewtRightGroup}>
                            <Text style={styles.ewtTitleText}>EWT</Text>
                            <Text
                              style={[
                                darkTheme.typography.bodyMuted,
                                styles.ewtValueText,
                              ]}
                            >
                              {barber.barberEWT || barber.ewt || 0} mins
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              ) : (
                <Text
                  style={[
                    darkTheme.typography.bodyMuted,
                    { marginVertical: verticalScale(10) },
                  ]}
                >
                  No barbers available
                </Text>
              )}
            </View>

            {/* Bottom Actions Row */}
            <View style={styles.formActionControlsRow}>
              <TouchableOpacity
                style={[
                  styles.modalSubmitButton,
                  { backgroundColor: darkTheme.colors.accent, flex: 1 },
                ]}
                disabled={adminServeQueueLoading || adminCancelQueueLoading}
                onPress={serveQHandler}
                activeOpacity={0.8}
              >
                {adminServeQueueLoading ? (
                  <ActivityIndicator size="small" color="#000000" />
                ) : (
                  <Text
                    style={[
                      darkTheme.typography.btnText,
                      { color: "#000000", fontWeight: "700" },
                    ]}
                  >
                    Serve
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalSubmitButton,
                  {
                    backgroundColor: "rgba(255,59,48,0.06)",
                    borderColor: "rgba(255,59,48,0.15)",
                    borderWidth: 1,
                    flex: 1,
                  },
                ]}
                disabled={adminServeQueueLoading || adminCancelQueueLoading}
                onPress={() => cancelQHandler(selectedQueueItem)}
                activeOpacity={0.8}
              >
                {adminCancelQueueLoading ? (
                  <ActivityIndicator size="small" color="#FF3B30" />
                ) : (
                  <Text
                    style={[
                      darkTheme.typography.btnText,
                      { color: "#FF3B30", fontWeight: "700" },
                    ]}
                  >
                    Cancel
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default QueueList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    marginBottom: verticalScale(16),
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    height: darkTheme.layout.componentHeight || verticalScale(40),
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchField: {
    flex: 1,
    paddingVertical: 0,
  },
  listContent: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
    gap: verticalScale(10),
  },
  queueCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    padding: scale(12),
    minHeight: verticalScale(64),
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    flex: 1,
  },
  positionBadge: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    justifyContent: "center",
    alignItems: "center",
  },
  detailsBlock: {
    flex: 1,
    justifyContent: "center",
  },
  clientName: {
    fontSize: scale(14),
    fontWeight: "600",
  },
  barberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    marginTop: verticalScale(3),
  },
  barberName: {
    fontSize: scale(12),
  },
  statusBadge: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(8),
  },
  emptyText: {
    textAlign: "center",
    marginTop: verticalScale(40),
    fontSize: scale(13),
  },
  // --- Skeleton Styles ---
  skeletonContainer: {
    flex: 1,
  },
  skeletonSearchBar: {
    width: "100%",
    height: darkTheme.layout.componentHeight || verticalScale(40),
    borderRadius: scale(8),
  },
  skeletonListContent: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    gap: verticalScale(10),
  },
  skeletonCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scale(12),
    minHeight: verticalScale(64),
    borderRadius: darkTheme.layout.borderRadiusLarge,
    backgroundColor: darkTheme.colors.card,
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
  },
  skeletonCircle: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
  },
  skeletonDetailsBlock: {
    flex: 1,
    gap: verticalScale(6),
  },
  skeletonTextTitle: {
    width: "55%",
    height: scale(14),
    borderRadius: scale(4),
  },
  skeletonTextSub: {
    width: "35%",
    height: scale(10),
    borderRadius: scale(4),
  },
  skeletonStatusBadge: {
    width: scale(54),
    height: scale(22),
    borderRadius: darkTheme.layout.borderRadiusSmall,
  },
  // --- Modal Styles ---
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
    borderColor: "rgba(255,255,255,0.06)",
    padding: scale(20),
    paddingBottom: verticalScale(32),
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  closeFormButtonCircle: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: "rgba(255,59,48,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  inputGroup: {
    width: "100%",
  },
  staticPillBannerInput: {
    width: "100%",
    height: darkTheme.layout.componentHeight || verticalScale(40),
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    paddingHorizontal: scale(14),
    justifyContent: "center",
    marginTop: verticalScale(6),
  },
  barbersScrollContainer: {
    maxHeight: verticalScale(220),
    marginTop: verticalScale(6),
  },
  barbersVerticalStack: {
    width: "100%",
    gap: verticalScale(8),
  },
  barberSelectionRowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: verticalScale(54),
    borderWidth: 1,
    borderRadius: darkTheme.layout.borderRadiusMedium,
    paddingHorizontal: scale(14),
  },
  barberLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  avatarCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: "#2C2C2E",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  nameBadgeRowAlignment: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  statusBadgeMicroPill: {
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(1),
    borderRadius: scale(4),
  },
  statusBadgePillText: {
    fontSize: scale(9),
    fontWeight: "700",
  },
  barberNameText: {
    fontSize: scale(13),
    fontWeight: "600",
  },
  queueCountTextSub: {
    fontSize: scale(11),
    color: "rgba(255,255,255,0.4)",
    marginTop: verticalScale(2),
  },
  ewtRightGroup: {
    alignItems: "flex-end",
  },
  ewtTitleText: {
    fontSize: scale(10),
    fontWeight: "700",
    color: "rgba(255,255,255,0.3)",
  },
  ewtValueText: {
    fontSize: scale(11),
    marginTop: verticalScale(1),
  },
  formActionControlsRow: {
    flexDirection: "row",
    width: "100%",
    gap: scale(12),
    marginTop: verticalScale(24),
  },
  modalSubmitButton: {
    borderRadius: darkTheme.layout.borderRadiusMedium,
    alignItems: "center",
    justifyContent: "center",
    height: darkTheme.layout.buttonHeight || verticalScale(40),
  },
});

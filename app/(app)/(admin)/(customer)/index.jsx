import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import Shimmer from "react-native-modern-shimmer";
import Header from "../../../../components/Header/Header";
import { darkTheme } from "../../../../constants/appTheme";
import { useRouter } from "expo-router";
import { useAdminAuth } from "../../../../context/admin/AuthContext";
import api from "../../../../utils/api";

// Dark Theme Stealth Palette for Shimmer Elements
const SHIMMER_COLORS = {
  button: { baseColor: "#2a2a2a", highlightColor: "#333333" },
  card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
  text: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
};

// Seamless Pixel-Perfect Skeleton View
const ScreenSkeletonView = () => {
  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header
        title={
          <View style={styles.headerTitleContainerRow}>
            <Shimmer
              width={scale(110)}
              height={scale(20)}
              borderRadius={scale(4)}
              {...SHIMMER_COLORS.text}
            />
            <Shimmer
              width={scale(60)}
              height={scale(20)}
              borderRadius={scale(10)}
              {...SHIMMER_COLORS.button}
            />
          </View>
        }
        subTitle="Salon customer analytics database"
        showBack={true}
      />

      <View style={styles.topContainer}>
        <View style={styles.toolsControlActionRow}>
          <View style={styles.toolsLeftGroup}>
            <Shimmer
              width={scale(36)}
              height={scale(36)}
              borderRadius={scale(18)}
              {...SHIMMER_COLORS.button}
            />
            <Shimmer
              width={scale(36)}
              height={scale(36)}
              borderRadius={scale(18)}
              {...SHIMMER_COLORS.button}
            />
            <Shimmer
              width={scale(36)}
              height={scale(36)}
              borderRadius={scale(18)}
              {...SHIMMER_COLORS.button}
            />
          </View>
        </View>

        <View
          style={[
            styles.searchFieldInputFrame,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: darkTheme.colors.border,
            },
          ]}
        >
          <Shimmer
            width="100%"
            height={scale(16)}
            borderRadius={scale(4)}
            {...SHIMMER_COLORS.text}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <View
            key={item}
            style={[
              styles.customerCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
                borderRadius: darkTheme.layout.borderRadiusLarge,
                borderWidth: 1,
              },
            ]}
          >
            <View style={styles.cardHeaderAreaRow}>
              <View style={styles.profileLeftBlock}>
                <Shimmer
                  width={scale(18)}
                  height={scale(18)}
                  borderRadius={scale(9)}
                  {...SHIMMER_COLORS.button}
                />
                <Shimmer
                  width={scale(38)}
                  height={scale(38)}
                  borderRadius={scale(19)}
                  {...SHIMMER_COLORS.button}
                />
                <View style={styles.metaDetailsColumn}>
                  <Shimmer
                    width={scale(120)}
                    height={scale(14)}
                    borderRadius={scale(4)}
                    {...SHIMMER_COLORS.text}
                  />
                  <Shimmer
                    width={scale(160)}
                    height={scale(11)}
                    borderRadius={scale(4)}
                    style={{ marginTop: verticalScale(4) }}
                    {...SHIMMER_COLORS.text}
                  />
                  <Shimmer
                    width={scale(90)}
                    height={scale(11)}
                    borderRadius={scale(4)}
                    style={{ marginTop: verticalScale(4) }}
                    {...SHIMMER_COLORS.text}
                  />
                </View>
              </View>

              <Shimmer
                width={scale(30)}
                height={scale(30)}
                borderRadius={scale(15)}
                {...SHIMMER_COLORS.button}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const CustomerListScreen = () => {
  const router = useRouter();
  const { authenticatedUser } = useAdminAuth();
  let salonId = authenticatedUser?.salonId;

  const [isScreenLoading, setIsScreenLoading] = useState(true);

  // API Local States
  const [customerState, setCustomerState] = useState({
    loading: false,
    data: [],
    pagination: {},
  });

  const [emailState, setEmailState] = useState({
    loading: false,
    data: [],
  });

  const [notifState, setNotifState] = useState({
    loading: false,
    data: [],
  });

  // Pagination & Search Control States
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Selection & UI controls
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [checkedEmails, setCheckedEmails] = useState([]);
  const [checkedNames, setCheckedNames] = useState([]);
  const [isMasterSelected, setIsMasterSelected] = useState(false);
  const [activeCustomerId, setActiveCustomerId] = useState(null);

  // Modal Input States
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [notifModalVisible, setNotifModalVisible] = useState(false);

  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [notifTitle, setNotifTitle] = useState("");
  const [notifBody, setNotifBody] = useState("");

  // Fetch Customer List via direct API call
  const fetchCustomerList = async (isNewSearch = false) => {
    const currentPage = isNewSearch ? 1 : page;

    if (isNewSearch) {
      setPage(1);
      setIsFetchingMore(false);
    } else if (currentPage > 1) {
      setIsFetchingMore(true);
    }

    if (currentPage === 1 && !isScreenLoading) {
      setCustomerState((prev) => ({ ...prev, loading: true }));
    }

    try {
      const response = await api.get(
        `/customers/getAllCustomers?salonId=${salonId}&page=${currentPage}&limit=${rowsPerPage}&search=${searchQuery}`
      );

      const fetchedData = response?.data?.response || [];
      const pagination = response?.data?.pagination || {};

      setCustomerState({
        loading: false,
        data: isNewSearch
          ? fetchedData
          : [...customerState.data, ...fetchedData],
        pagination,
      });

      setHasMore(
        fetchedData.length > 0 && currentPage < (pagination.totalPages || 1)
      );
    } catch (error) {
      console.error("Error fetching customer list:", error);
      setCustomerState((prev) => ({ ...prev, loading: false }));
    } finally {
      setIsFetchingMore(false);
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerList(false);
  }, [page]);

  // Debounced Search Trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomerList(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Deduplicated Master Select fetching logic
  useEffect(() => {
    if (isMasterSelected) {
      const fetchAllEmails = async () => {
        try {
          const { data } = await api.get(
            `/customers/selectAllCustomerEmails?salonId=${salonId}`
          );
          const responseList = data?.response || [];

          // Remove potential duplicates from API response by _id
          const uniqueCustomers = Array.from(
            new Map(responseList.map((item) => [item._id, item])).values()
          );

          const emails = uniqueCustomers.map((c) => c.email).filter(Boolean);
          const names = uniqueCustomers.map((c) => c.name || "Customer").filter(Boolean);
          const ids = uniqueCustomers.map((c) => c._id).filter(Boolean);

          setCheckedEmails(emails);
          setCheckedNames(names);
          setSelectedCustomerIds(ids);
        } catch (error) {
          console.error("Error fetching all customer emails:", error);
        }
      };
      fetchAllEmails();
    }
  }, [isMasterSelected, salonId]);

  const handleMasterSelectToggle = () => {
    if (isMasterSelected) {
      setIsMasterSelected(false);
      setCheckedEmails([]);
      setCheckedNames([]);
      setSelectedCustomerIds([]);
    } else {
      setIsMasterSelected(true);
    }
  };

  // Selection Handlers for Individual Card
  const handleSelectCustomer = (customer) => {
    const isSelected = selectedCustomerIds.includes(customer._id);

    if (isSelected) {
      setSelectedCustomerIds((prev) =>
        prev.filter((id) => id !== customer._id)
      );
      setCheckedEmails((prev) =>
        prev.filter((email) => email !== customer.email)
      );
      setCheckedNames((prev) => prev.filter((name) => name !== customer.name));
      if (isMasterSelected) {
        setIsMasterSelected(false);
      }
    } else {
      setSelectedCustomerIds((prev) => [...prev, customer._id]);
      setCheckedEmails((prev) => [...prev, customer.email]);
      setCheckedNames((prev) => [...prev, customer.name]);
    }
  };

  // Index-safe removal inside Email Modal
  const handleRemoveEmailAtIndex = (indexToRemove) => {
    setCheckedEmails((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setCheckedNames((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setSelectedCustomerIds((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove)
    );

    if (isMasterSelected) {
      setIsMasterSelected(false);
    }
  };

  // Index-safe removal inside Push Notification Modal
  const handleRemoveNameAtIndex = (indexToRemove) => {
    setCheckedNames((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setCheckedEmails((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setSelectedCustomerIds((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove)
    );

    if (isMasterSelected) {
      setIsMasterSelected(false);
    }
  };

  // Navigation Handlers using Expo Router
  const handleAppointmentHistory = (item) => {
    router.push({
      pathname: "/(admintabs)/(appointment)/appointmentHistory",
      params: { customerId: item._id, customerName: item.name },
    });
  };

  const handleQueueHistory = (item) => {
    router.push({
      pathname: "/(admintabs)/(queue)/queueHistory",
      params: { customerId: item._id, customerName: item.name },
    });
  };

  // Direct API Calls for Actions
  const handleSendEmail = async () => {
    if (checkedEmails.length === 0) {
      Alert.alert("Notice", "Please select at least one customer.");
      return;
    }

    if (!emailSubject.trim() || !emailMessage.trim()) {
      Alert.alert(
        "Warning",
        "Please fill in both the subject and message fields."
      );
      return;
    }

    setEmailState({ loading: true, data: [] });

    try {
      const mailData = {
        subject: emailSubject,
        message: emailMessage,
        role: "Barber",
        recipientEmails: checkedEmails,
        salonId,
      };

      const response = await api.post(
        "/bulkMessageAndEmails/sendBulkEmails",
        mailData
      );

      setEmailState({ loading: false, data: response?.data || [] });
      setEmailSubject("");
      setEmailMessage("");
      setEmailModalVisible(false);
      Alert.alert("Success", "Emails sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error?.response);
      setEmailState({ loading: false, data: [] });
      Alert.alert("Error", "Failed to send email. Please try again.");
    }
  };

  const handleSendMessage = async () => {
    if (checkedEmails.length === 0) {
      Alert.alert("Notice", "Please select at least one customer.");
      return;
    }

    if (!notifTitle.trim() || !notifBody.trim()) {
      Alert.alert("Warning", "Please fill in all message fields.");
      return;
    }

    setNotifState({ loading: true, data: [] });

    try {
      const notificationData = {
        salonId,
        title: notifTitle,
        body: notifBody,
        emails: checkedEmails,
      };

      const response = await api.post(
        "/notifications/send-customer-multiple-notification",
        notificationData
      );

      setNotifState({ loading: false, data: response?.data || [] });
      setNotifTitle("");
      setNotifBody("");
      setNotifModalVisible(false);
      Alert.alert("Success", "Push notification dispatched!");
    } catch (error) {
      console.error("Error sending notification:", error);
      setNotifState({ loading: false, data: [] });
      Alert.alert("Error", "Failed to send notification.");
    }
  };

  // Render Customer Card
  const renderCustomerCard = ({ item }) => {
    const isDropdownOpen = activeCustomerId === item._id;
    const isSelected = selectedCustomerIds.includes(item._id);

    return (
      <View
        style={[
          styles.customerCard,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: isSelected
              ? darkTheme.colors.accent
              : isDropdownOpen
                ? darkTheme.colors.accent
                : darkTheme.colors.border,
            borderRadius: darkTheme.layout.borderRadiusLarge,
            borderWidth: 1,
            opacity: isMasterSelected ? 0.8 : 1,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          disabled={isMasterSelected}
          onPress={() => handleSelectCustomer(item)}
          style={styles.cardHeaderAreaRow}
        >
          <View style={styles.profileLeftBlock}>
            <View
              style={[
                styles.checkboxCircle,
                {
                  borderColor: isSelected
                    ? darkTheme.colors.accent
                    : darkTheme.colors.border,
                },
              ]}
            >
              {isSelected && (
                <View
                  style={[
                    styles.checkboxInnerDot,
                    { backgroundColor: darkTheme.colors.accent },
                  ]}
                />
              )}
            </View>

            <View
              style={[styles.avatarBoxFrame, { backgroundColor: "#2C2C2E" }]}
            >
              <Text
                style={[
                  darkTheme.typography.bodyMain,
                  styles.avatarText,
                  { color: darkTheme.colors.textMain },
                ]}
              >
                {item?.name ? item.name.charAt(0).toUpperCase() : "C"}
              </Text>
            </View>

            <View style={styles.metaDetailsColumn}>
              <Text
                style={[
                  darkTheme.typography.cardTitle,
                  styles.customerNameText,
                  { color: darkTheme.colors.textMain },
                ]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  darkTheme.typography.bodyMuted,
                  styles.metaSubText,
                  { color: darkTheme.colors.textMuted },
                ]}
              >
                {item.email}
              </Text>
              <Text
                style={[
                  darkTheme.typography.bodyMuted,
                  styles.metaSubText,
                  { color: darkTheme.colors.textMuted, opacity: 0.6 },
                ]}
              >
                +{item?.mobileCountryCode || "91"} {item?.mobileNumber || "--"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.settingsIconButton,
              {
                backgroundColor: isDropdownOpen
                  ? "rgba(255, 149, 0, 0.12)"
                  : "rgba(255,255,255,0.01)",
                borderColor: isDropdownOpen
                  ? darkTheme.colors.accent
                  : darkTheme.colors.border,
              },
            ]}
            activeOpacity={0.7}
            onPress={() =>
              setActiveCustomerId((prev) =>
                prev === item._id ? null : item._id
              )
            }
          >
            <Ionicons
              name="ellipsis-vertical"
              size={scale(14)}
              color={
                isDropdownOpen
                  ? darkTheme.colors.accent
                  : darkTheme.colors.textMuted
              }
            />
          </TouchableOpacity>
        </TouchableOpacity>

        {isDropdownOpen && (
          <View
            style={[
              styles.integratedActionShelf,
              { borderTopColor: "rgba(255,255,255,0.04)" },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.shelfActionItem,
                { backgroundColor: "rgba(255,255,255,0.04)" },
              ]}
              onPress={() => handleAppointmentHistory(item)}
            >
              <MaterialCommunityIcons
                name="calendar-clock"
                size={scale(12)}
                color={darkTheme.colors.textMain}
              />
              <Text
                style={[
                  styles.shelfItemText,
                  { color: darkTheme.colors.textMain },
                ]}
              >
                Appointment History
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.shelfActionItem,
                { backgroundColor: "rgba(255,255,255,0.04)" },
              ]}
              onPress={() => handleQueueHistory(item)}
            >
              <MaterialCommunityIcons
                name="account-clock-outline"
                size={scale(12)}
                color={darkTheme.colors.textMain}
              />
              <Text
                style={[
                  styles.shelfItemText,
                  { color: darkTheme.colors.textMain },
                ]}
              >
                Queue History
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (isScreenLoading) {
    return <ScreenSkeletonView />;
  }

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      {/* Header Container */}
      <Header
        title={
          <View style={styles.headerTitleContainerRow}>
            <Text style={[darkTheme.typography.headerTitle]}>
              Customer List
            </Text>
            <View
              style={[
                styles.countBadgePill,
                { backgroundColor: "rgba(255, 149, 0, 0.1)" },
              ]}
            >
              <Text
                style={[
                  styles.countBadgeText,
                  { color: darkTheme.colors.accent },
                ]}
              >
                {customerState.pagination?.total ?? customerState.data.length}{" "}
                Total
              </Text>
            </View>
          </View>
        }
        subTitle="Salon customer analytics database"
        showBack={true}
      />

      {/* Control Tools Bar */}
      <View style={styles.topContainer}>
        <View style={styles.toolsControlActionRow}>
          <View style={styles.toolsLeftGroup}>
            <TouchableOpacity
              style={[
                styles.toolButton,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: isMasterSelected
                    ? darkTheme.colors.accent
                    : darkTheme.colors.border,
                },
              ]}
              activeOpacity={0.7}
              onPress={handleMasterSelectToggle}
            >
              <Ionicons
                name={
                  isMasterSelected
                    ? "checkmark-done-circle"
                    : "list-circle-outline"
                }
                size={scale(16)}
                color={
                  isMasterSelected
                    ? darkTheme.colors.accent
                    : darkTheme.colors.textMain
                }
              />
            </TouchableOpacity>

  
            <TouchableOpacity
              disabled={selectedCustomerIds.length === 0 && !isMasterSelected}
              style={[
                styles.toolButton,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  opacity:
                    selectedCustomerIds.length === 0 && !isMasterSelected
                      ? 0.4
                      : 1,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => setEmailModalVisible(true)}
            >
              <Feather
                name="mail"
                size={scale(13)}
                color={darkTheme.colors.textMain}
              />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={selectedCustomerIds.length === 0 && !isMasterSelected}
              style={[
                styles.toolButton,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  opacity:
                    selectedCustomerIds.length === 0 && !isMasterSelected
                      ? 0.4
                      : 1,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => setNotifModalVisible(true)}
            >
              <Feather
                name="bell"
                size={scale(13)}
                color={darkTheme.colors.textMain}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Input Field */}
        <View
          style={[
            styles.searchFieldInputFrame,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: darkTheme.colors.border,
            },
          ]}
        >
          <Ionicons
            name="search"
            size={scale(14)}
            color={darkTheme.colors.textMuted}
            style={{ marginRight: scale(8) }}
          />
          <TextInput
            placeholder="Search customer files by name or email..."
            placeholderTextColor={darkTheme.colors.textMuted}
            value={searchQuery}
            onChangeText={(val) => {
              if (isMasterSelected) {
                Alert.alert(
                  "Notice",
                  "Deselect 'Select All' before searching."
                );
                return;
              }
              setSearchQuery(val);
            }}
            style={[darkTheme.typography.bodyMain, styles.searchTextInputStyle]}
            autoCapitalize="none"
            selectionColor={darkTheme.colors.accent}
          />
        </View>
      </View>

      {/* FlatList Customer Infinite Scroll */}
      <FlatList
        data={customerState.data}
        keyExtractor={(item) => item._id}
        renderItem={renderCustomerCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasMore && !isFetchingMore && !customerState.loading) {
            setPage((prev) => prev + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetchingMore ? (
            <View style={{ paddingVertical: scale(15) }}>
              <ActivityIndicator size="small" color={darkTheme.colors.accent} />
            </View>
          ) : null
        }
        ListEmptyComponent={() =>
          !customerState.loading ? (
            <View style={styles.emptyContainer}>
              <Text style={{ color: darkTheme.colors.textMuted }}>
                No customers available
              </Text>
            </View>
          ) : null
        }
      />

      {/* Send Email Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={emailModalVisible}
        onRequestClose={() => setEmailModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            style={styles.modalBackdropDismiss}
            activeOpacity={1}
            onPress={() => setEmailModalVisible(false)}
          />
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: "rgba(255,255,255,0.08)",
              },
            ]}
          >
            <View style={styles.sheetHandleIndicator} />

            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleGroup}>
                <View
                  style={[
                    styles.modalIconWrapper,
                    { backgroundColor: "rgba(255, 149, 0, 0.1)" },
                  ]}
                >
                  <Feather
                    name="mail"
                    size={scale(14)}
                    color={darkTheme.colors.accent}
                  />
                </View>
                <Text
                  style={[
                    darkTheme.typography.headerTitle,
                    styles.modalTitleText,
                  ]}
                >
                  Send Campaign Email
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setEmailModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons
                  name="close"
                  size={scale(16)}
                  color={darkTheme.colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>SENDER CONFIG</Text>
              <View
                style={[
                  styles.readOnlyInput,
                  {
                    backgroundColor: "rgba(0,0,0,0.25)",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    color: darkTheme.colors.textMuted,
                    fontSize: scale(12),
                  }}
                >
                  support@iqbook.io
                </Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>
                RECIPIENTS ({checkedEmails.length})
              </Text>
              <View
                style={[
                  styles.recipientPillContainer,
                  {
                    backgroundColor: "rgba(0,0,0,0.25)",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.pillScrollStyle}
                >
                  {checkedEmails.length === 0 ? (
                    <Text
                      style={{
                        color: darkTheme.colors.textMuted,
                        fontSize: scale(11),
                      }}
                    >
                      No recipients selected
                    </Text>
                  ) : (
                    checkedEmails.map((email, idx) => {
                      const customerId = selectedCustomerIds[idx] || idx;
                      return (
                        <View
                          key={`email-pill-${customerId}-${idx}`}
                          style={styles.recipientTagBadge}
                        >
                          <Text style={styles.recipientTagText}>{email}</Text>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => handleRemoveEmailAtIndex(idx)}
                            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                            style={styles.pillRemoveButton}
                          >
                            <Ionicons
                              name="close-circle"
                              size={scale(13)}
                              color={darkTheme.colors.accent}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  )}
                </ScrollView>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>SUBJECT LINE</Text>
              <TextInput
                value={emailSubject}
                onChangeText={setEmailSubject}
                placeholder="Enter email subject header..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                style={[
                  styles.textInput,
                  {
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderColor: darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                selectionColor={darkTheme.colors.accent}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>EMAIL BODY CONTENT</Text>
              <TextInput
                value={emailMessage}
                onChangeText={setEmailMessage}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                placeholder="Compose your rich text campaign update here..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                style={[
                  styles.textAreaInput,
                  {
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderColor: darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                selectionColor={darkTheme.colors.accent}
              />
            </View>

            <TouchableOpacity
              disabled={emailState.loading}
              style={[
                styles.submitButton,
                {
                  backgroundColor: darkTheme.colors.accent,
                  height: scale(42),
                },
              ]}
              activeOpacity={0.8}
              onPress={handleSendEmail}
            >
              {emailState.loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text
                  style={[
                    darkTheme.typography.btnText,
                    { color: "#000", fontWeight: "700" },
                  ]}
                >
                  Send Email
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Push Notification Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={notifModalVisible}
        onRequestClose={() => setNotifModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            style={styles.modalBackdropDismiss}
            activeOpacity={1}
            onPress={() => setNotifModalVisible(false)}
          />
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: "rgba(255,255,255,0.08)",
              },
            ]}
          >
            <View style={styles.sheetHandleIndicator} />

            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleGroup}>
                <View
                  style={[
                    styles.modalIconWrapper,
                    { backgroundColor: "rgba(255, 149, 0, 0.1)" },
                  ]}
                >
                  <Feather
                    name="bell"
                    size={scale(14)}
                    color={darkTheme.colors.accent}
                  />
                </View>
                <Text
                  style={[
                    darkTheme.typography.headerTitle,
                    styles.modalTitleText,
                  ]}
                >
                  Push Notification
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setNotifModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons
                  name="close"
                  size={scale(16)}
                  color={darkTheme.colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>CHANNEL SENDER</Text>
              <View
                style={[
                  styles.readOnlyInput,
                  {
                    backgroundColor: "rgba(0,0,0,0.25)",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    color: darkTheme.colors.textMuted,
                    fontSize: scale(12),
                  }}
                >
                  IQBook Gateway
                </Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>
                TARGET AUDIENCE ({checkedNames.length})
              </Text>
              <View
                style={[
                  styles.recipientPillContainer,
                  {
                    backgroundColor: "rgba(0,0,0,0.25)",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.pillScrollStyle}
                >
                  {checkedNames.length === 0 ? (
                    <Text
                      style={{
                        color: darkTheme.colors.textMuted,
                        fontSize: scale(11),
                      }}
                    >
                      No recipients selected
                    </Text>
                  ) : (
                    checkedNames.map((name, idx) => {
                      const customerId = selectedCustomerIds[idx] || idx;
                      return (
                        <View
                          key={`name-pill-${customerId}-${idx}`}
                          style={styles.recipientTagBadge}
                        >
                          <Text style={styles.recipientTagText}>{name}</Text>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => handleRemoveNameAtIndex(idx)}
                            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                            style={styles.pillRemoveButton}
                          >
                            <Ionicons
                              name="close-circle"
                              size={scale(13)}
                              color={darkTheme.colors.accent}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  )}
                </ScrollView>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>ALERT TITLE</Text>
              <TextInput
                value={notifTitle}
                onChangeText={setNotifTitle}
                placeholder="Enter high-conversion title alert..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                style={[
                  styles.textInput,
                  {
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderColor: darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                selectionColor={darkTheme.colors.accent}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>
                PUSH DESCRIPTION CONTENT
              </Text>
              <TextInput
                value={notifBody}
                onChangeText={setNotifBody}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                placeholder="Write your short immediate action notification text..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                style={[
                  styles.textAreaInput,
                  {
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderColor: darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                selectionColor={darkTheme.colors.accent}
              />
            </View>

            <TouchableOpacity
              disabled={notifState.loading}
              style={[
                styles.submitButton,
                {
                  backgroundColor: darkTheme.colors.accent,
                  height: scale(42),
                },
              ]}
              activeOpacity={0.8}
              onPress={handleSendMessage}
            >
              {notifState.loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text
                  style={[
                    darkTheme.typography.btnText,
                    { color: "#000", fontWeight: "700" },
                  ]}
                >
                  Broadcast Push System
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default CustomerListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    paddingVertical: verticalScale(40),
    alignItems: "center",
  },
  headerTitleContainerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  topContainer: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(4),
    marginBottom: verticalScale(14),
  },
  toolsControlActionRow: {
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
    borderRadius: scale(18),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  countBadgePill: {
    paddingHorizontal: scale(8),
    height: scale(20),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  countBadgeText: {
    fontSize: scale(9.5),
    fontWeight: "700",
  },
  searchFieldInputFrame: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    height: scale(40),
    marginTop: verticalScale(14),
    width: "100%",
  },
  searchTextInputStyle: {
    flex: 1,
    fontSize: scale(12),
    padding: 0,
    color: "#FFFFFF",
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
    gap: verticalScale(12),
  },
  customerCard: {
    padding: scale(12),
    width: "100%",
  },
  cardHeaderAreaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  profileLeftBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    flex: 1,
  },
  checkboxCircle: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(2),
  },
  checkboxInnerDot: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
  },
  avatarBoxFrame: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontWeight: "700",
    fontSize: scale(13),
  },
  metaDetailsColumn: {
    flex: 1,
  },
  customerNameText: {
    fontSize: scale(14),
    fontWeight: "600",
  },
  metaSubText: {
    fontSize: scale(11),
    lineHeight: scale(14),
    marginTop: verticalScale(1),
  },
  settingsIconButton: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  integratedActionShelf: {
    marginTop: verticalScale(12),
    paddingTop: verticalScale(10),
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(10),
    width: "100%",
  },
  shelfActionItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: scale(32),
    borderRadius: scale(6),
    gap: scale(6),
  },
  shelfItemText: {
    fontSize: scale(11),
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(10, 10, 12, 0.82)",
    justifyContent: "flex-end",
  },
  modalBackdropDismiss: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCard: {
    width: "100%",
    borderWidth: 1.5,
    borderTopLeftRadius: scale(18),
    borderTopRightRadius: scale(18),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(34),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  sheetHandleIndicator: {
    width: scale(36),
    height: scale(4),
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: scale(2),
    alignSelf: "center",
    marginBottom: verticalScale(14),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(18),
    width: "100%",
  },
  modalHeaderTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  modalIconWrapper: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitleText: {
    fontSize: scale(15),
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  modalCloseButton: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    backgroundColor: "rgba(255,255,255,0.04)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  inputGroup: {
    width: "100%",
    marginBottom: verticalScale(12),
  },
  premiumInputLabel: {
    fontSize: scale(9.5),
    fontWeight: "800",
    color: "rgba(255,255,255,0.45)",
    letterSpacing: 1,
    marginBottom: verticalScale(5),
  },
  readOnlyInput: {
    height: scale(36),
    borderWidth: 1,
    borderRadius: scale(8),
    justifyContent: "center",
    paddingHorizontal: scale(12),
  },
  recipientPillContainer: {
    minHeight: scale(38),
    borderWidth: 1,
    borderRadius: scale(8),
    justifyContent: "center",
    paddingVertical: verticalScale(4),
  },
  pillScrollStyle: {
    alignItems: "center",
    paddingHorizontal: scale(8),
    gap: scale(6),
  },
  recipientTagBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 149, 0, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 149, 0, 0.2)",
    paddingLeft: scale(8),
    paddingRight: scale(6),
    paddingVertical: verticalScale(3),
    borderRadius: scale(6),
    gap: scale(5),
  },
  recipientTagText: {
    color: "#FFFFFF",
    fontSize: scale(11),
    fontWeight: "500",
  },
  pillRemoveButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(8),
    borderWidth: 1,
    paddingHorizontal: scale(12),
    fontSize: scale(12),
  },
  textAreaInput: {
    width: "100%",
    height: verticalScale(90),
    borderRadius: scale(8),
    borderWidth: 1,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    fontSize: scale(12),
  },
  submitButton: {
    width: "100%",
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(10),
    shadowColor: "#FF9500",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});
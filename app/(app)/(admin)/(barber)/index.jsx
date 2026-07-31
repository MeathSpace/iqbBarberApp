import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
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

import Header from "../../../../components/Header/Header";
import { darkTheme } from "../../../../constants/appTheme";
import { useAdminAuth } from "../../../../context/admin/AuthContext";
import api from "../../../../utils/api";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";

const SHIMMER_THEME = {
  header: { baseColor: "#221f1c", highlightColor: "#332e2a" },
  card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
  interactive: { baseColor: "#2a2a2a", highlightColor: "#333333" },
  text: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
};


const ScreenSkeletonView = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >

      <View style={styles.actionRow}>
        <Shimmer
          width="100%"
          height={darkTheme.layout.buttonHeight}
          borderRadius={darkTheme.layout.borderRadiusMedium}
          baseColor={SHIMMER_THEME.interactive.baseColor}
          highlightColor={SHIMMER_THEME.interactive.highlightColor}
          style={{ marginBottom: verticalScale(10) }}
        />
        <View style={styles.commButtonsContainer}>
          {[1, 2, 3].map((item) => (
            <Shimmer
              key={item}
              width={scale(36)}
              height={scale(36)}
              borderRadius={scale(18)}
              baseColor={SHIMMER_THEME.interactive.baseColor}
              highlightColor={SHIMMER_THEME.interactive.highlightColor}
            />
          ))}
        </View>
      </View>

      <View style={styles.listContainer}>
        {[1, 2, 3, 4].map((key) => (
          <View
            key={key}
            style={[
              styles.barberCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
              },
            ]}
          >

            <View style={styles.cardHeaderRow}>
              <View style={styles.checkboxTouch}>
                <Shimmer
                  width={scale(20)}
                  height={scale(20)}
                  borderRadius={scale(4)}
                  baseColor={SHIMMER_THEME.text.baseColor}
                  highlightColor={SHIMMER_THEME.text.highlightColor}
                />
              </View>

              <Shimmer
                width={scale(40)}
                height={scale(40)}
                borderRadius={scale(20)}
                baseColor={SHIMMER_THEME.card.baseColor}
                highlightColor={SHIMMER_THEME.card.highlightColor}
                style={{ marginRight: scale(10) }}
              />

              <View style={styles.nameRoleContainer}>
                <Shimmer
                  width={scale(120)}
                  height={scale(14)}
                  borderRadius={scale(4)}
                  baseColor={SHIMMER_THEME.text.baseColor}
                  highlightColor={SHIMMER_THEME.text.highlightColor}
                  style={{ marginBottom: verticalScale(6) }}
                />
                <Shimmer
                  width={scale(150)}
                  height={scale(10)}
                  borderRadius={scale(4)}
                  baseColor={SHIMMER_THEME.text.baseColor}
                  highlightColor={SHIMMER_THEME.text.highlightColor}
                  style={{ marginBottom: verticalScale(4) }}
                />
                <Shimmer
                  width={scale(100)}
                  height={scale(10)}
                  borderRadius={scale(4)}
                  baseColor={SHIMMER_THEME.text.baseColor}
                  highlightColor={SHIMMER_THEME.text.highlightColor}
                />
              </View>

              <Shimmer
                width={scale(16)}
                height={scale(16)}
                borderRadius={scale(8)}
                baseColor={SHIMMER_THEME.text.baseColor}
                highlightColor={SHIMMER_THEME.text.highlightColor}
              />
            </View>

            {/* Toggle Row Skeleton */}
            <View style={styles.toggleRow}>
              {[1, 2, 3].map((badgeKey) => (
                <Shimmer
                  key={badgeKey}
                  width="31%"
                  height={verticalScale(28)}
                  borderRadius={darkTheme.layout.borderRadiusSmall}
                  baseColor={SHIMMER_THEME.interactive.baseColor}
                  highlightColor={SHIMMER_THEME.interactive.highlightColor}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const BarberListScreen = () => {
  const router = useRouter();
  const { authenticatedUser } = useAdminAuth();
  const salonId = authenticatedUser?.salonId || 0;

  const [barberList, setBarberList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBarberIds, setSelectedBarberIds] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);

  const [checkMap, setCheckMap] = useState(new Map());
  const [checkMapClock, setCheckMapClock] = useState(new Map());
  const [approveBarberMap, setApproveBarberMap] = useState(new Map());


  const [onlineLoadingId, setOnlineLoadingId] = useState(null);
  const [clockLoadingId, setClockLoadingId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailSending, setEmailSending] = useState(false);

  const [openNotifModal, setOpenNotifModal] = useState(false);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifBody, setNotifBody] = useState("");
  const [notifSending, setNotifSending] = useState(false);

  const fetchBarberList = async () => {
    if (!salonId) return;
    setLoading(true);
    try {
      const response = await api.post(
        `/barber/getAllBarberBySalonId?salonId=${salonId}`,
      );
      const list = response?.data?.getAllBarbers || [];

      setBarberList(list);

      const onlineMap = new Map();
      const clockMap = new Map();
      const approveMap = new Map();

      list.forEach((barber) => {
        const key = `${barber.salonId}-${barber.barberId || barber._id}`;
        const emailKey = `${barber.salonId}-${barber.email}`;

        onlineMap.set(key, barber.isOnline || false);
        clockMap.set(key, barber.isClockedIn || false);
        approveMap.set(emailKey, barber.isApproved || false);
      });

      setCheckMap(onlineMap);
      setCheckMapClock(clockMap);
      setApproveBarberMap(approveMap);
    } catch (error) {
      console.error("Error fetching barber list:", error?.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarberList();
  }, [salonId]);

  const toggleSelectBarber = (id) => {
    setSelectedBarberIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedBarberIds.length === barberList.length) {
      setSelectedBarberIds([]);
    } else {
      setSelectedBarberIds(barberList.map((b) => b._id));
    }
  };

  const selectedBarbers = barberList.filter((b) =>
    selectedBarberIds.includes(b._id),
  );

  const handleRemoveRecipientAtIndex = (indexToRemove) => {
    const targetBarber = selectedBarbers[indexToRemove];
    if (targetBarber) {
      setSelectedBarberIds((prev) =>
        prev.filter((id) => id !== targetBarber._id),
      );
    }
  };

  const toggleOnlineHandler = async (barber) => {
    const key = `${barber.salonId}-${barber.barberId || barber._id}`;
    const emailKey = `${barber.salonId}-${barber.email}`;
    const isApproved = approveBarberMap.get(emailKey) || false;

    if (!isApproved) {
      Alert.alert(
        "Action Restricted",
        "Cannot set online status as the barber is not approved.",
      );
      return;
    }

    const currentStatus = checkMap.get(key) || false;
    const newStatus = !currentStatus;

    setOnlineLoadingId(barber._id);

    try {
      await api.post("/admin/changeBarberOnlineStatus", {
        salonId: barber.salonId,
        barberId: barber.barberId,
        isOnline: newStatus,
      });

      setCheckMap((prev) => new Map(prev).set(key, newStatus));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to update online status.";

      Alert.alert("Error", errorMessage);
    } finally {
      setOnlineLoadingId(null);
    }
  };

  const toggleClockHandler = async (barber) => {
    const key = `${barber.salonId}-${barber.barberId || barber._id}`;
    const emailKey = `${barber.salonId}-${barber.email}`;
    const isApproved = approveBarberMap.get(emailKey) || false;

    if (!isApproved) {
      Alert.alert(
        "Action Restricted",
        "Cannot clock-in as the barber is not approved.",
      );
      return;
    }

    const currentClockStatus = checkMapClock.get(key) || false;
    const currentOnlineStatus = checkMap.get(key) || false;
    const newClockStatus = !currentClockStatus;

    setClockLoadingId(barber._id);

    try {
      await api.post("/barber/changeBarberClockedInStatus", {
        salonId: barber.salonId,
        barberId: barber.barberId,
        isClockedIn: newClockStatus,
      });

      setCheckMapClock((prev) => new Map(prev).set(key, newClockStatus));

      if (!newClockStatus && currentOnlineStatus) {
        setCheckMap((prev) => new Map(prev).set(key, false));
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to update clock status.";

      Alert.alert("Error", errorMessage);
    } finally {
      setClockLoadingId(null);
    }
  };

  const approveHandler = async (barber) => {
    const emailKey = `${barber.salonId}-${barber.email}`;
    const key = `${barber.salonId}-${barber.barberId || barber._id}`;

    const currentStatus = approveBarberMap.get(emailKey) || false;
    const newStatus = !currentStatus;

    setActionLoadingId(barber._id);

    try {
      await api.post("/admin/approvedBarber", {
        salonId: barber.salonId,
        email: barber.email,
        isApproved: newStatus,
      });

      setApproveBarberMap((prev) => new Map(prev).set(emailKey, newStatus));

      if (!newStatus) {
        setCheckMap((prev) => new Map(prev).set(key, false));
        setCheckMapClock((prev) => new Map(prev).set(key, false));

        Alert.alert(
          "Notice",
          "Barber is unapproved. Online status set to Offline and Clocked-In set to Clocked-Out.",
        );
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to update approval status.";

      Alert.alert("Error", errorMessage);
    } finally {
      setActionLoadingId(null);
    }
  };

  const deleteBarberHandler = (barber) => {
    setSelectedBarber(null);
    Alert.alert(
      "Delete Barber",
      `Are you sure you want to delete ${barber.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.post("/admin/barber/delete", {
                email: barber.email,
                salonId: barber.salonId,
              });

              setBarberList((prev) => prev.filter((b) => b._id !== barber._id));
              setSelectedBarberIds((prev) =>
                prev.filter((id) => id !== barber._id),
              );
            } catch (error) {
              Alert.alert("Error", "Failed to delete barber.");
            }
          },
        },
      ],
    );
  };

  const navigateToEdit = (barber) => {
    setSelectedBarber(null);
    router.push({
      pathname: `/(steps)/editbarber`,
      params: { barberData: JSON.stringify(barber) },
    });
  };

  const navigateToQueueHistory = (barber) => {
    setSelectedBarber(null);
    router.push({
      pathname: "/admin-quehistory",
      params: { barberId: barber.barberId, name: barber.name },
    });
  };

  const navigateToAppointmentHistory = (barber) => {
    setSelectedBarber(null);
    router.push({
      pathname: "/admin-appointmenthistory",
      params: { barberId: barber.barberId, name: barber.name },
    });
  };

  const handleSendEmail = async () => {
    const recipientEmails = selectedBarbers.map((b) => b.email);
    if (recipientEmails.length === 0) {
      Alert.alert("Notice", "Please select at least one barber.");
      return;
    }
    if (!emailSubject.trim() || !emailMessage.trim()) {
      Alert.alert("Validation", "Please enter both subject and message.");
      return;
    }
    setEmailSending(true);
    try {
      const { data } = await api.post("/bulkMessageAndEmails/sendBulkEmails", {
        salonId,
        subject: emailSubject,
        message: emailMessage,
        recipientEmails,
        role: "Barber",
      });

      setOpenEmailModal(false);
      setEmailSubject("");
      setEmailMessage("");
      Alert.alert("Success", data?.message || "Email dispatched successfully.");
    } catch (error) {
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to send email.",
      );
    } finally {
      setEmailSending(false);
    }
  };

  const handleSendNotification = async () => {
    const recipientEmails = selectedBarbers.map((b) => b.email);

    if (recipientEmails.length === 0) {
      Alert.alert("Notice", "Please select at least one barber.");
      return;
    }

    if (!notifTitle.trim() || !notifBody.trim()) {
      Alert.alert("Validation", "Please complete all fields.");
      return;
    }

    setNotifSending(true);

    try {
      const { data } = await api.post(
        "/notifications/send-multiple-notification",
        {
          salonId,
          title: notifTitle,
          body: notifBody,
          emails: recipientEmails,
        },
      );

      setOpenNotifModal(false);
      setNotifTitle("");
      setNotifBody("");

      Alert.alert(
        "Success",
        data?.message || "Notification sent successfully.",
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to send notification.",
      );
    } finally {
      setNotifSending(false);
    }
  };

  const selectedApprovedStatus = selectedBarber
    ? approveBarberMap.get(`${selectedBarber.salonId}-${selectedBarber.email}`)
    : false;

  const isAnyBarberSelected = selectedBarberIds.length > 0;

  const renderBarberItem = ({ item: barber }) => {
    const key = `${barber.salonId}-${barber.barberId || barber._id}`;
    const emailKey = `${barber.salonId}-${barber.email}`;

    const isOnline = checkMap.get(key) || false;
    const isClockedIn = checkMapClock.get(key) || false;
    const isApproved = approveBarberMap.get(emailKey) || false;
    const isSelected = selectedBarberIds.includes(barber._id);

    return (
      <View
        style={[
          styles.barberCard,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: isSelected
              ? darkTheme.colors.accent
              : darkTheme.colors.border,
          },
        ]}
      >

        <View style={styles.cardHeaderRow}>
          <TouchableOpacity
            style={styles.checkboxTouch}
            onPress={() => toggleSelectBarber(barber._id)}
          >
            <MaterialCommunityIcons
              name={isSelected ? "checkbox-marked" : "checkbox-blank-outline"}
              size={scale(20)}
              color={isSelected ? darkTheme.colors.accent : "#888"}
            />
          </TouchableOpacity>

          {barber.profile?.[0]?.url ? (
            <Image
              source={{ uri: barber.profile[0].url }}
              style={styles.avatarImage}
            />
          ) : (
            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: darkTheme.colors.accent },
              ]}
            >
              <Text style={styles.avatarText}>
                {barber.name?.charAt(0).toUpperCase() || "B"}
              </Text>
            </View>
          )}

          <View style={styles.nameRoleContainer}>
            <Text style={darkTheme.typography.cardTitle}>{barber.name}</Text>
            <Text style={styles.subText}>{barber.email}</Text>
            <Text style={styles.subText}>
              {barber.mobileNumber
                ? `+${barber.mobileCountryCode || ""} ${barber.mobileNumber}`
                : "Phone not provided"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.threeDotsBtn}
            onPress={() => setSelectedBarber(barber)}
          >
            <Entypo
              name="dots-three-vertical"
              size={scale(16)}
              color={darkTheme.colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.statusBadge,
              {
                backgroundColor: isOnline ? "#052E16" : "#450a0a",
                borderColor: isOnline ? "#1ADB6A" : "#FC3232",
              },
            ]}
            onPress={() => toggleOnlineHandler(barber)}
            disabled={onlineLoadingId === barber._id}
          >
            {onlineLoadingId === barber._id ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text
                style={[
                  styles.statusText,
                  { color: isOnline ? "#1ADB6A" : "#FC3232" },
                ]}
              >
                {isOnline ? "Online" : "Offline"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.statusBadge,
              {
                backgroundColor: isClockedIn ? "#052E16" : "#450a0a",
                borderColor: isClockedIn ? "#1ADB6A" : "#FC3232",
              },
            ]}
            onPress={() => toggleClockHandler(barber)}
            disabled={clockLoadingId === barber._id}
          >
            {clockLoadingId === barber._id ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text
                style={[
                  styles.statusText,
                  { color: isClockedIn ? "#1ADB6A" : "#FC3232" },
                ]}
              >
                {isClockedIn ? "Clock-In" : "Clock-Out"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.statusBadge,
              {
                backgroundColor: isApproved ? "#052E16" : "#450a0a",
                borderColor: isApproved ? "#1ADB6A" : "#FC3232",
              },
            ]}
            onPress={() => approveHandler(barber)}
            disabled={actionLoadingId === barber._id}
          >
            {actionLoadingId === barber._id ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text
                style={[
                  styles.statusText,
                  { color: isApproved ? "#1ADB6A" : "#FC3232" },
                ]}
              >
                {isApproved ? "Approved" : "Approve"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderHeaderActionControls = () => (
    <View style={styles.actionRow}>
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            height: darkTheme.layout.buttonHeight,
            backgroundColor: darkTheme.colors.accent,
          },
        ]}
        activeOpacity={0.8}
        onPress={() => router.push("/(steps)")}
      >
        <MaterialCommunityIcons
          name="content-cut"
          size={scale(16)}
          color="#000"
          style={styles.addIcon}
        />
        <Text style={styles.addBtnText}>Add barber</Text>
      </TouchableOpacity>

      <View style={styles.commButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.toolButton,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor:
                selectedBarberIds.length > 0
                  ? darkTheme.colors.accent
                  : darkTheme.colors.border,
            },
          ]}
          onPress={toggleSelectAll}
        >
          <Ionicons
            name={
              selectedBarberIds.length > 0
                ? "checkmark-done-circle"
                : "list-circle-outline"
            }
            size={scale(18)}
            color={
              selectedBarberIds.length > 0
                ? darkTheme.colors.accent
                : darkTheme.colors.textMain
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toolButton,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: darkTheme.colors.border,
              opacity: !isAnyBarberSelected ? 0.4 : 1,
            },
          ]}
          disabled={!isAnyBarberSelected}
          onPress={() => setOpenEmailModal(true)}
        >
          <Feather
            name="mail"
            size={scale(13)}
            color={darkTheme.colors.textMain}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toolButton,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: darkTheme.colors.border,
              opacity: !isAnyBarberSelected ? 0.4 : 1,
            },
          ]}
          disabled={!isAnyBarberSelected}
          onPress={() => setOpenNotifModal(true)}
        >
          <Feather
            name="bell"
            size={scale(13)}
            color={darkTheme.colors.textMain}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header title={"Barbers"} subTitle={"Manage your barber team"} />

      {loading ? (
        <ScreenSkeletonView />
      ) : (
        <FlatList
          data={barberList}
          renderItem={renderBarberItem}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={renderHeaderActionControls}
          ItemSeparatorComponent={() => (
            <View style={{ height: verticalScale(12) }} />
          )}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No barbers available</Text>
            </View>
          }
        />
      )}

      <Modal
        visible={Boolean(selectedBarber)}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedBarber(null)}
      >
        <Pressable
          style={styles.sheetOverlay}
          onPress={() => setSelectedBarber(null)}
        >
          <Pressable style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{selectedBarber?.name}</Text>
              <Text style={styles.sheetSubTitle}>{selectedBarber?.email}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.sheetActionItem,
                !selectedApprovedStatus && { opacity: 0.4 },
              ]}
              disabled={!selectedApprovedStatus}
              onPress={() => navigateToEdit(selectedBarber)}
            >
              <Feather name="edit-2" size={scale(16)} color="#FFF" />
              <Text style={styles.sheetActionText}>Edit Barber</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetActionItem}
              onPress={() => navigateToQueueHistory(selectedBarber)}
            >
              <MaterialCommunityIcons
                name="history"
                size={scale(18)}
                color="#FFF"
              />
              <Text style={styles.sheetActionText}>Queue History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetActionItem}
              onPress={() => navigateToAppointmentHistory(selectedBarber)}
            >
              <Feather name="calendar" size={scale(16)} color="#FFF" />
              <Text style={styles.sheetActionText}>Appointment History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetActionItem, { borderBottomWidth: 0 }]}
              onPress={() => deleteBarberHandler(selectedBarber)}
            >
              <Feather name="trash-2" size={scale(16)} color="#FC3232" />
              <Text style={[styles.sheetActionText, { color: "#FC3232" }]}>
                Delete Barber
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={openEmailModal}
        onRequestClose={() => setOpenEmailModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            style={styles.modalBackdropDismiss}
            activeOpacity={1}
            onPress={() => setOpenEmailModal(false)}
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
                onPress={() => setOpenEmailModal(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons
                  name="close"
                  size={scale(16)}
                  color={darkTheme.colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            {/* FROM */}
            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>FROM</Text>
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

            {/* TO */}
            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>
                TO ({selectedBarbers.length})
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
                  {selectedBarbers.length === 0 ? (
                    <Text
                      style={{
                        color: darkTheme.colors.textMuted,
                        fontSize: scale(11),
                      }}
                    >
                      No recipients selected
                    </Text>
                  ) : (
                    selectedBarbers.map((barber, idx) => (
                      <View
                        key={`email-pill-${barber._id}-${idx}`}
                        style={styles.recipientTagBadge}
                      >
                        <Text style={styles.recipientTagText}>
                          {barber.email}
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => handleRemoveRecipientAtIndex(idx)}
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
                    ))
                  )}
                </ScrollView>
              </View>
            </View>

            {/* SUBJECT */}
            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>SUBJECT</Text>
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

            {/* MESSAGE */}
            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>MESSAGE</Text>
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
              disabled={emailSending}
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
              {emailSending ? (
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

      <Modal
        animationType="slide"
        transparent
        visible={openNotifModal}
        onRequestClose={() => setOpenNotifModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            style={styles.modalBackdropDismiss}
            activeOpacity={1}
            onPress={() => setOpenNotifModal(false)}
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
                onPress={() => setOpenNotifModal(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons
                  name="close"
                  size={scale(16)}
                  color={darkTheme.colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            {/* FROM */}
            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>FROM</Text>
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

            {/* TO */}
            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>
                TO ({selectedBarbers.length})
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
                  {selectedBarbers.length === 0 ? (
                    <Text
                      style={{
                        color: darkTheme.colors.textMuted,
                        fontSize: scale(11),
                      }}
                    >
                      No recipients selected
                    </Text>
                  ) : (
                    selectedBarbers.map((barber, idx) => (
                      <View
                        key={`name-pill-${barber._id}-${idx}`}
                        style={styles.recipientTagBadge}
                      >
                        <Text style={styles.recipientTagText}>
                          {barber.name}
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => handleRemoveRecipientAtIndex(idx)}
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
                    ))
                  )}
                </ScrollView>
              </View>
            </View>

            {/* TITLE */}
            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>TITLE</Text>
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

            {/* BODY */}
            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>BODY</Text>
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
              disabled={notifSending}
              style={[
                styles.submitButton,
                {
                  backgroundColor: darkTheme.colors.accent,
                  height: scale(42),
                },
              ]}
              activeOpacity={0.8}
              onPress={handleSendNotification}
            >
              {notifSending ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text
                  style={[
                    darkTheme.typography.btnText,
                    { color: "#000", fontWeight: "700" },
                  ]}
                >
                  Send Notification
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default BarberListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(24),
  },
  actionRow: {
    marginBottom: verticalScale(16),
  },
  addButton: {
    width: "100%",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(10),
  },
  addIcon: {
    marginRight: scale(6),
  },
  addBtnText: {
    color: "#000000",
    fontSize: scale(13),
    fontWeight: "700",
  },
  commButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: scale(10),
  },
  listContainer: {
    gap: verticalScale(12),
  },
  emptyContainer: {
    paddingVertical: verticalScale(40),
    alignItems: "center",
  },
  emptyText: {
    color: darkTheme.colors.textMuted,
    fontSize: scale(13),
  },

  barberCard: {
    borderWidth: 1,
    borderRadius: darkTheme.layout.borderRadiusLarge,
    padding: scale(12),
    flexDirection: "column",
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: verticalScale(12),
  },
  checkboxTouch: {
    paddingRight: scale(8),
    paddingVertical: verticalScale(4),
  },
  avatarImage: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    marginRight: scale(10),
  },
  avatarCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(10),
  },
  avatarText: {
    color: "#000000",
    fontSize: scale(15),
    fontWeight: "700",
  },
  nameRoleContainer: {
    flex: 1,
    paddingRight: scale(6),
  },
  subText: {
    color: darkTheme.colors.textMuted,
    fontSize: scale(11),
    marginTop: verticalScale(1),
  },
  threeDotsBtn: {
    padding: scale(6),
  },

  toggleRow: {
    flexDirection: "row",
    gap: scale(8),
    paddingTop: verticalScale(12),
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
  },
  statusBadge: {
    flex: 1,
    paddingVertical: verticalScale(8),
    borderRadius: darkTheme.layout.borderRadiusSmall,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  statusText: {
    fontSize: scale(11),
    fontWeight: "600",
  },
  toolButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
  },
  sheetContent: {
    backgroundColor: darkTheme.colors.card || "#1C1C1E",
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
    paddingBottom: verticalScale(32),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: darkTheme.colors.border || "#2C2C2E",
  },
  sheetHeader: {
    paddingBottom: verticalScale(12),
    marginBottom: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  sheetTitle: {
    color: "#FFF",
    fontSize: scale(16),
    fontWeight: "700",
  },
  sheetSubTitle: {
    color: "#8E8E93",
    fontSize: scale(11),
    marginTop: verticalScale(2),
  },
  sheetActionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  sheetActionText: {
    color: "#FFF",
    fontSize: scale(13),
    fontWeight: "500",
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
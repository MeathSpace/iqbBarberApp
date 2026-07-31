import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
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

// Reusable Shimmer Palette Tokens
const SHIMMER_THEME = {
  header: { baseColor: "#221f1c", highlightColor: "#332e2a" },
  card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
  interactive: { baseColor: "#2a2a2a", highlightColor: "#333333" },
  text: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
};

// Unified Full-Screen Skeleton View
const ScreenSkeletonView = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {/* Action Row Skeleton */}
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

      {/* Barber Cards List Skeleton */}
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
            {/* Header Row: Checkbox, Avatar, Details */}
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

  const getSelectedEmails = () => {
    return barberList
      .filter((b) => selectedBarberIds.includes(b._id))
      .map((b) => b.email);
  };

  const toggleOnlineHandler = async (barber) => {
    const key = `${barber.salonId}-${barber.barberId || barber._id}`;
    const currentStatus = checkMap.get(key) || false;
    const newStatus = !currentStatus;

    setCheckMap((prev) => new Map(prev).set(key, newStatus));

    try {
      await api.post("/admin/changeBarberOnlineStatus", {
        salonId: barber.salonId,
        barberId: barber.barberId,
        isOnline: newStatus,
      });
    } catch (error) {
      setCheckMap((prev) => new Map(prev).set(key, currentStatus));

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to update online status.";

      Alert.alert("Error", errorMessage);
    }
  };

  const toggleClockHandler = async (barber) => {
    const key = `${barber.salonId}-${barber.barberId || barber._id}`;
    const currentStatus = checkMapClock.get(key) || false;
    const newStatus = !currentStatus;

    setCheckMapClock((prev) => new Map(prev).set(key, newStatus));

    try {
      await api.post("/barber/changeBarberClockedInStatus", {
        salonId: barber.salonId,
        barberId: barber.barberId,
        isClockedIn: newStatus,
      });
    } catch (error) {
      setCheckMapClock((prev) => new Map(prev).set(key, currentStatus));
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to update clock status.";

      Alert.alert("Error", errorMessage);
    }
  };

  const approveHandler = async (barber) => {
    const key = `${barber.salonId}-${barber.email}`;
    const currentStatus = approveBarberMap.get(key) || false;
    const newStatus = !currentStatus;

    setActionLoadingId(barber._id);
    setApproveBarberMap((prev) => new Map(prev).set(key, newStatus));

    try {
      await api.post("/admin/approvedBarber", {
        salonId: barber.salonId,
        email: barber.email,
        isApproved: newStatus,
      });
    } catch (error) {
      setApproveBarberMap((prev) => new Map(prev).set(key, currentStatus));
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
    if (!emailSubject.trim() || !emailMessage.trim()) {
      Alert.alert("Validation", "Please enter both subject and message.");
      return;
    }
    setEmailSending(true);
    try {
      await api.post("/admin/barbers/send-email", {
        salonId,
        subject: emailSubject,
        message: emailMessage,
        recipientEmails: getSelectedEmails(),
      });

      setOpenEmailModal(false);
      setEmailSubject("");
      setEmailMessage("");
      Alert.alert("Success", "Email dispatched successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to send email.");
    } finally {
      setEmailSending(false);
    }
  };

  const handleSendNotification = async () => {
    if (!notifTitle.trim() || !notifBody.trim()) {
      Alert.alert("Validation", "Please complete all fields.");
      return;
    }
    setNotifSending(true);
    try {
      await api.post("/admin/barbers/send-notification", {
        salonId,
        title: notifTitle,
        body: notifBody,
        emails: getSelectedEmails(),
      });

      setOpenNotifModal(false);
      setNotifTitle("");
      setNotifBody("");
      Alert.alert("Success", "Notification sent successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to send notification.");
    } finally {
      setNotifSending(false);
    }
  };

  const selectedApprovedStatus = selectedBarber
    ? approveBarberMap.get(`${selectedBarber.salonId}-${selectedBarber.email}`)
    : false;

  const isAnyBarberSelected = selectedBarberIds.length > 0;

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header title={"Barbers"} subTitle={"Manage your barber team"} />

      {/* Component-Level State Gate */}
      {loading ? (
        <ScreenSkeletonView />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Action Controls */}
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

          {/* List Section */}
          {barberList.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No barbers available</Text>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {barberList.map((barber) => {
                const key = `${barber.salonId}-${barber.barberId || barber._id}`;
                const emailKey = `${barber.salonId}-${barber.email}`;

                const isOnline = checkMap.get(key) || false;
                const isClockedIn = checkMapClock.get(key) || false;
                const isApproved = approveBarberMap.get(emailKey) || false;
                const isSelected = selectedBarberIds.includes(barber._id);

                return (
                  <View
                    key={barber._id}
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
                    {/* UPPER VIEW: Checkbox, Avatar & Details */}
                    <View style={styles.cardHeaderRow}>
                      <TouchableOpacity
                        style={styles.checkboxTouch}
                        onPress={() => toggleSelectBarber(barber._id)}
                      >
                        <MaterialCommunityIcons
                          name={
                            isSelected
                              ? "checkbox-marked"
                              : "checkbox-blank-outline"
                          }
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
                        <Text style={darkTheme.typography.cardTitle}>
                          {barber.name}
                        </Text>
                        <Text style={styles.subText}>{barber.email}</Text>
                        <Text style={styles.subText}>
                          {barber.mobileNumber
                            ? `+${barber.mobileCountryCode || ""} ${
                                barber.mobileNumber
                              }`
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

                    {/* LOWER VIEW: Full-Width Status Toggles */}
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
                      >
                        <Text
                          style={[
                            styles.statusText,
                            { color: isOnline ? "#1ADB6A" : "#FC3232" },
                          ]}
                        >
                          {isOnline ? "Online" : "Offline"}
                        </Text>
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
                      >
                        <Text
                          style={[
                            styles.statusText,
                            { color: isClockedIn ? "#1ADB6A" : "#FC3232" },
                          ]}
                        >
                          {isClockedIn ? "Clock-In" : "Clock-Out"}
                        </Text>
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
              })}
            </View>
          )}
        </ScrollView>
      )}

      {/* Slide-Up Bottom Action Sheet */}
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

      {/* Email Modal */}
      <Modal visible={openEmailModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: darkTheme.colors.card },
            ]}
          >
            <Text style={styles.modalTitle}>
              Send Email ({selectedBarberIds.length} Selected)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Subject"
              placeholderTextColor="#888"
              value={emailSubject}
              onChangeText={setEmailSubject}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Message..."
              placeholderTextColor="#888"
              multiline
              value={emailMessage}
              onChangeText={setEmailMessage}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setOpenEmailModal(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
                onPress={handleSendEmail}
                disabled={emailSending}
              >
                {emailSending ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <Text style={[styles.modalBtnText, { color: "#000" }]}>
                    Send
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Push Notification Modal */}
      <Modal visible={openNotifModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: darkTheme.colors.card },
            ]}
          >
            <Text style={styles.modalTitle}>
              Send Push Notification ({selectedBarberIds.length} Selected)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#888"
              value={notifTitle}
              onChangeText={setNotifTitle}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Body..."
              placeholderTextColor="#888"
              multiline
              value={notifBody}
              onChangeText={setNotifBody}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setOpenNotifModal(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
                onPress={handleSendNotification}
                disabled={notifSending}
              >
                {notifSending ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <Text style={[styles.modalBtnText, { color: "#000" }]}>
                    Send
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  /* Card Styling */
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
  /* Lower Controls View */
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
  /* Slide-Up Bottom Action Sheet Styling */
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
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    paddingHorizontal: scale(20),
  },
  modalContent: {
    borderRadius: darkTheme.layout.borderRadiusLarge,
    padding: scale(16),
  },
  modalTitle: {
    color: "#FFF",
    fontSize: scale(15),
    fontWeight: "700",
    marginBottom: verticalScale(12),
  },
  input: {
    backgroundColor: "#1A1A1A",
    color: "#FFF",
    borderRadius: darkTheme.layout.borderRadiusSmall,
    paddingHorizontal: scale(10),
    height: verticalScale(36),
    marginBottom: verticalScale(10),
  },
  textArea: {
    height: verticalScale(80),
    textAlignVertical: "top",
    paddingTop: verticalScale(8),
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: scale(10),
    marginTop: verticalScale(8),
  },
  cancelBtn: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
  },
  sendBtn: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: darkTheme.layout.borderRadiusSmall,
  },
  modalBtnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: scale(12),
  },
});
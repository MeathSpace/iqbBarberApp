import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../components/Header/Header"; // Adjust path as needed
import { darkTheme } from "../../../../constants/appTheme";

const CUSTOMERS_MOCK_DATA = [
  {
    id: "1",
    name: "Arghya 12",
    email: "arghya@yopmail.com",
    phone: "+91 6291059885",
    initial: "A",
  },
  {
    id: "2",
    name: "Bikki Choudhury",
    email: "bikki1@yopmail.com",
    phone: "+91 8240205351",
    initial: "B",
  },
  {
    id: "3",
    name: "Bikki Choudhury",
    email: "bikki@yopmail.com",
    phone: "+91 9883870854",
    initial: "B",
  },
  {
    id: "4",
    name: "Sagar Ghosh",
    email: "sagar1995ghosh@gmail.com",
    phone: "+91 91916300000",
    initial: "S",
  },
  {
    id: "5",
    name: "latest Latest",
    email: "latest@yopmail.com",
    phone: "--",
    initial: "L",
  },
];

const CustomerListScreen = () => {
  const [customers] = useState(CUSTOMERS_MOCK_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCustomerId, setActiveCustomerId] = useState(null);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [notifModalVisible, setNotifModalVisible] = useState(false);

  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [notifTitle, setNotifTitle] = useState("");
  const [notifBody, setNotifBody] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectCustomer = (id) => {
    setSelectedCustomerIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleMasterSelectToggle = () => {
    if (selectedCustomerIds.length === filteredCustomers.length) {
      setSelectedCustomerIds([]);
    } else {
      setSelectedCustomerIds(filteredCustomers.map((c) => c.id));
    }
  };

  const toggleDropdown = (id) => {
    setActiveCustomerId((prev) => (prev === id ? null : id));
  };

  const getSelectedEmailsArray = () => {
    return customers
      .filter((c) => selectedCustomerIds.includes(c.id))
      .map((c) => c.email);
  };

  const getSelectedNamesArray = () => {
    return customers
      .filter((c) => selectedCustomerIds.includes(c.id))
      .map((c) => c.name);
  };

  const renderCustomerCard = ({ item }) => {
    const isDropdownOpen = activeCustomerId === item.id;
    const isSelected = selectedCustomerIds.includes(item.id);

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
          },
        ]}
      >
        <View style={styles.cardHeaderAreaRow}>
          <View style={styles.profileLeftBlock}>
            <TouchableOpacity
              style={[
                styles.checkboxCircle,
                {
                  borderColor: isSelected
                    ? darkTheme.colors.accent
                    : darkTheme.colors.border,
                },
              ]}
              onPress={() => handleSelectCustomer(item.id)}
              activeOpacity={0.7}
            >
              {isSelected && (
                <View
                  style={[
                    styles.checkboxInnerDot,
                    { backgroundColor: darkTheme.colors.accent },
                  ]}
                />
              )}
            </TouchableOpacity>

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
                {item.initial}
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
                {item.phone}
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
            onPress={() => toggleDropdown(item.id)}
          >
            <Ionicons
              name="settings-outline"
              size={scale(13)}
              color={
                isDropdownOpen
                  ? darkTheme.colors.accent
                  : darkTheme.colors.textMuted
              }
            />
          </TouchableOpacity>
        </View>

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
              onPress={() => console.log("Appointment History Context")}
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
              onPress={() => console.log("Queue History Context")}
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

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
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
                {filteredCustomers.length} Total
              </Text>
            </View>
          </View>
        }
        subTitle="Salon customer analytics database"
        showBack={true}
      />

      <View style={styles.topContainer}>
        <View style={styles.toolsControlActionRow}>
          <View style={styles.toolsLeftGroup}>
            <TouchableOpacity
              style={[
                styles.toolButton,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor:
                    selectedCustomerIds.length > 0
                      ? darkTheme.colors.accent
                      : darkTheme.colors.border,
                },
              ]}
              activeOpacity={0.7}
              onPress={handleMasterSelectToggle}
            >
              <Ionicons
                name={
                  selectedCustomerIds.length === filteredCustomers.length
                    ? "checkmark-done-circle"
                    : "list-circle-outline"
                }
                size={scale(16)}
                color={
                  selectedCustomerIds.length > 0
                    ? darkTheme.colors.accent
                    : darkTheme.colors.textMain
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={selectedCustomerIds.length === 0}
              style={[
                styles.toolButton,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  opacity: selectedCustomerIds.length === 0 ? 0.4 : 1,
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
              disabled={selectedCustomerIds.length === 0}
              style={[
                styles.toolButton,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  opacity: selectedCustomerIds.length === 0 ? 0.4 : 1,
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

          <TouchableOpacity
            style={[
              styles.toolButton,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
              },
            ]}
            activeOpacity={0.7}
          >
            <Ionicons
              name="refresh"
              size={scale(14)}
              color={darkTheme.colors.textMain}
            />
          </TouchableOpacity>
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
            onChangeText={setSearchQuery}
            style={[darkTheme.typography.bodyMain, styles.searchTextInputStyle]}
            autoCapitalize="none"
            selectionColor={darkTheme.colors.accent}
          />
        </View>
      </View>

      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={renderCustomerCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* RE-ENGINEERED EMAIL MODAL */}
      <Modal animationType="fade" transparent visible={emailModalVisible}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: "rgba(255,255,255,0.08)",
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleGroup}>
                <View style={[styles.modalIconWrapper, { backgroundColor: "rgba(255, 149, 0, 0.1)" }]}>
                  <Feather name="mail" size={scale(14)} color={darkTheme.colors.accent} />
                </View>
                <Text style={[darkTheme.typography.headerTitle, styles.modalTitleText]}>Send Campaign Email</Text>
              </View>

              <TouchableOpacity 
                onPress={() => setEmailModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={scale(16)} color={darkTheme.colors.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>SENDER CONFIG</Text>
              <View style={[styles.readOnlyInput, { backgroundColor: "rgba(0,0,0,0.25)", borderColor: darkTheme.colors.border }]}>
                <Text style={{ color: darkTheme.colors.textMuted, fontSize: scale(12) }}>
                  support@iqbook.io
                </Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>RECIPIENTS ({getSelectedEmailsArray().length})</Text>
              <View style={[styles.recipientPillContainer, { backgroundColor: "rgba(0,0,0,0.25)", borderColor: darkTheme.colors.border }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillScrollStyle}>
                  {getSelectedEmailsArray().map((email, idx) => (
                    <View key={idx} style={styles.recipientTagBadge}>
                      <Text style={styles.recipientTagText}>{email}</Text>
                    </View>
                  ))}
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
              style={[
                styles.submitButton,
                {
                  backgroundColor: darkTheme.colors.accent,
                  height: scale(42),
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setEmailModalVisible(false)}
            >
              <Text style={[darkTheme.typography.btnText, { color: "#000", fontWeight: "700" }]}>
                Dispatch Email Queue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* RE-ENGINEERED NOTIFICATION MODAL */}
      <Modal animationType="fade" transparent visible={notifModalVisible}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: "rgba(255,255,255,0.08)",
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleGroup}>
                <View style={[styles.modalIconWrapper, { backgroundColor: "rgba(255, 149, 0, 0.1)" }]}>
                  <Feather name="bell" size={scale(14)} color={darkTheme.colors.accent} />
                </View>
                <Text style={[darkTheme.typography.headerTitle, styles.modalTitleText]}>Push Notification</Text>
              </View>

              <TouchableOpacity 
                onPress={() => setNotifModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={scale(16)} color={darkTheme.colors.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>CHANNEL SENDER</Text>
              <View style={[styles.readOnlyInput, { backgroundColor: "rgba(0,0,0,0.25)", borderColor: darkTheme.colors.border }]}>
                <Text style={{ color: darkTheme.colors.textMuted, fontSize: scale(12) }}>
                  IQBook Gateway
                </Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.premiumInputLabel}>TARGET AUDIENCE ({getSelectedNamesArray().length})</Text>
              <View style={[styles.recipientPillContainer, { backgroundColor: "rgba(0,0,0,0.25)", borderColor: darkTheme.colors.border }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillScrollStyle}>
                  {getSelectedNamesArray().map((name, idx) => (
                    <View key={idx} style={styles.recipientTagBadge}>
                      <Text style={styles.recipientTagText}>{name}</Text>
                    </View>
                  ))}
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
              <Text style={styles.premiumInputLabel}>PUSH DESCRIPTION CONTENT</Text>
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
              style={[
                styles.submitButton,
                {
                  backgroundColor: darkTheme.colors.accent,
                  height: scale(42),
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setNotifModalVisible(false)}
            >
              <Text style={[darkTheme.typography.btnText, { color: "#000", fontWeight: "700" }]}>
                Broadcast Push System
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CustomerListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  /* NEW PREMIUM MODAL UI STYLING STACK */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(10, 10, 12, 0.82)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(16),
  },
  modalCard: {
    width: "100%",
    borderWidth: 1.5,
    borderRadius: scale(14),
    padding: scale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
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
    backgroundColor: "rgba(255, 149, 0, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 149, 0, 0.2)",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    borderRadius: scale(6),
  },
  recipientTagText: {
    color: "#FFFFFF",
    fontSize: scale(11),
    fontWeight: "500",
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

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../../components/Header/Header";
import RangeCalendarModal from "../../../../../components/RangeCalender"; // Adjust path as needed
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import api from "../../../../../utils/api";

const HISTORIC_DATA = [
  {
    id: "1",
    clientName: "Shyam sharma",
    barberName: "Bob",
    service: "Massage",
    price: "₹ 345",
    date: "23/06/2026",
    status: "Served",
  },
  {
    id: "2",
    clientName: "Abc",
    barberName: "John Doe",
    service: "Haircut",
    price: "₹ 100",
    date: "08/06/2026",
    status: "Cancelled",
  },
  {
    id: "3",
    clientName: "Abc",
    barberName: "John Doe",
    service: "Massage, Haircut",
    price: "₹ 445",
    date: "08/06/2026",
    status: "Cancelled",
  },
];

const BARBER_FILTER_OPTIONS = [
  { id: "John Doe", name: "John Doe" },
  { id: "Bob", name: "Bob" },
  { id: "Jazz", name: "Jazz" },
  { id: "sun", name: "sun" },
  { id: "Rupesh", name: "Rupesh" },
  { id: "Appt. Barber", name: "Appt. Barber" },
];

const AppointmentHistory = () => {
  const { authenticatedUser } = useAdminAuth();

  // State management
  const [history, setHistory] = useState(HISTORIC_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Calendar Modal States
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Filter Modal States
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedBarbers, setSelectedBarbers] = useState([]);
  const [tempSelectedBarbers, setTempSelectedBarbers] = useState([]);

  const fetchAppointmentHistory = async () => {
    try {
      const { data } = await api.post(
        "/appointmentHistory/getAppointmentHistoryBySalonId",
        {
          from: startDate ? startDate.format("YYYY-MM-DD") : "",
          to: endDate ? endDate.format("YYYY-MM-DD") : "",
          limit: 10,
          page: 1,
          salonId: 1,
          search: searchQuery,
          barbers: selectedBarbers,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointmentHistory();
  }, [startDate, endDate, searchQuery, selectedBarbers]);

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAppointmentHistory();
    setRefreshing(false);
  }, [startDate, endDate, searchQuery, selectedBarbers]);

  const toggleBarberSelection = (name) => {
    setTempSelectedBarbers((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
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
            Status Profile
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
      <Header
        title="Appoinment History"
        subTitle="Log of past walk-in customers and arrivals"
        showBack={false}
      />

      <View style={styles.topContainer}>
        <View style={styles.filterActionRow}>
          {/* Search Input Box */}
          <View
            style={[
              styles.searchInputContainer,
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
              style={[styles.searchInput, { color: darkTheme.colors.textMain }]}
              placeholder="Search appointment..."
              placeholderTextColor={darkTheme.colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons
                  name="close-circle"
                  size={scale(14)}
                  color={darkTheme.colors.textMuted}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Action Tools Right */}
          <View style={styles.toolsRightGroup}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.toolButton,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: (startDate || endDate)
                    ? darkTheme.colors.accent
                    : darkTheme.colors.border,
                },
              ]}
              onPress={() => setCalendarVisible(true)}
            >
              <Feather
                name="calendar"
                size={scale(14)}
                color={
                  (startDate || endDate)
                    ? darkTheme.colors.accent
                    : darkTheme.colors.textMain
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setTempSelectedBarbers(selectedBarbers);
                setFilterModalVisible(true);
              }}
              style={[
                styles.filterLabelButton,
                {
                  backgroundColor: selectedBarbers.length > 0
                    ? darkTheme.colors.accent
                    : "rgba(255, 149, 0, 0.1)",
                  borderColor: darkTheme.colors.accent,
                },
              ]}
            >
              <MaterialIcons
                name="filter-list"
                size={scale(15)}
                color={selectedBarbers.length > 0 ? "#000000" : darkTheme.colors.accent}
                style={styles.filterIcon}
              />
              <Text
                style={[
                  darkTheme.typography.bodyMain,
                  styles.filterButtonText,
                  { color: selectedBarbers.length > 0 ? "#000000" : darkTheme.colors.accent },
                ]}
              >
                {selectedBarbers.length > 0 ? `Filter (${selectedBarbers.length})` : "Filter"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={10}
        removeClippedSubviews={Platform.OS === "android"}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={darkTheme.colors.accent}
            colors={[darkTheme.colors.accent]}
          />
        }
      />

      {/* Range Calendar Modal */}
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

      {/* Custom Stylist/Barber Filter Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
          <View style={styles.modalOverlayScrim}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View
                style={[
                  styles.bottomSheetContent,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.sheetScrollContainer}
                >
                  {BARBER_FILTER_OPTIONS.map((barber) => {
                    const isSelected = tempSelectedBarbers.includes(barber.id);

                    return (
                      <TouchableOpacity
                        key={barber.id}
                        activeOpacity={0.7}
                        style={[
                          styles.checkboxRowItem,
                          { borderColor: darkTheme.colors.border },
                        ]}
                        onPress={() => toggleBarberSelection(barber.id)}
                      >
                        <View
                          style={[
                            styles.checkboxBox,
                            { borderColor: darkTheme.colors.border },
                            isSelected && {
                              backgroundColor: darkTheme.colors.accent,
                              borderColor: darkTheme.colors.accent,
                            },
                          ]}
                        >
                          {isSelected && (
                            <Ionicons
                              name="checkmark"
                              size={scale(12)}
                              color="#000000"
                            />
                          )}
                        </View>
                        <Text
                          style={[
                            darkTheme.typography.bodyMain,
                            styles.checkboxLabelText,
                            {
                              color: isSelected
                                ? darkTheme.colors.textMain
                                : darkTheme.colors.textMuted,
                              fontWeight: isSelected ? "600" : "400",
                            },
                          ]}
                        >
                          {barber.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                <View style={styles.sheetActionButtonsRow}>
                  <TouchableOpacity
                    style={[
                      styles.sheetResetButton,
                      { borderColor: darkTheme.colors.border },
                    ]}
                    activeOpacity={0.7}
                    onPress={() => setTempSelectedBarbers([])}
                  >
                    <Text
                      style={[
                        styles.sheetResetText,
                        { color: darkTheme.colors.textMain },
                      ]}
                    >
                      Reset
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.sheetCloseButton,
                      { backgroundColor: darkTheme.colors.accent },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {
                      setSelectedBarbers(tempSelectedBarbers);
                      setFilterModalVisible(false);
                    }}
                  >
                    <Text style={styles.sheetCloseButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  },
  filterActionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: scale(10),
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: scale(36),
    borderWidth: 1,
    borderRadius: scale(18),
    paddingHorizontal: scale(12),
  },
  searchInput: {
    flex: 1,
    fontSize: scale(12),
    padding: 0,
  },
  toolsRightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  toolButton: {
    width: scale(36),
    height: scale(36),
    borderWidth: 1,
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
  },
  filterLabelButton: {
    flexDirection: "row",
    alignItems: "center",
    height: scale(36),
    borderWidth: 1,
    borderRadius: scale(18),
    paddingHorizontal: scale(14),
  },
  filterIcon: {
    marginRight: scale(6),
  },
  filterButtonText: {
    fontSize: scale(12),
    fontWeight: "600",
    letterSpacing: -0.1,
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
  modalOverlayScrim: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  bottomSheetContent: {
    width: "100%",
    maxHeight: "75%",
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    borderTopWidth: 1,
    padding: scale(20),
    paddingBottom: verticalScale(32),
  },
  sheetScrollContainer: {
    paddingBottom: verticalScale(16),
  },
  checkboxRowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    borderBottomWidth: 1,
  },
  checkboxBox: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(4),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  checkboxLabelText: {
    fontSize: scale(13),
  },
  sheetActionButtonsRow: {
    flexDirection: "row",
    gap: scale(10),
    marginTop: verticalScale(12),
  },
  sheetResetButton: {
    flex: 1,
    height: scale(40),
    borderRadius: scale(10),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  sheetResetText: {
    fontWeight: "600",
    fontSize: scale(12),
  },
  sheetCloseButton: {
    flex: 1,
    height: scale(40),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  sheetCloseButtonText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: scale(12),
  },
});
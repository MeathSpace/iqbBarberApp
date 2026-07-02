import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../components/Header/Header"; // Adjust relative path as needed
import { darkTheme } from "../../../../constants/appTheme";

// 10 Mock Datasets accurately capturing live multi-user workflow variables
const LIVE_QUEUE_DATA = [
  { id: "1", clientName: "Shyam Sharma", barberName: "John Doe", status: "Next", position: "1" },
  { id: "2", clientName: "Aditya Verma", barberName: "Alex Crew", status: "Waiting", position: "2" },
  { id: "3", clientName: "Rahul Mishra", barberName: "John Doe", status: "Waiting", position: "3" },
  { id: "4", clientName: "Michael Chang", barberName: "Sarah Connor", status: "Waiting", position: "4" },
  { id: "5", clientName: "Rohan Das", barberName: "Alex Crew", status: "Waiting", position: "5" },
  { id: "6", clientName: "Vikram Malhotra", barberName: "John Doe", status: "Waiting", position: "6" },
  { id: "7", clientName: "David Miller", barberName: "Sarah Connor", status: "Waiting", position: "7" },
  { id: "8", clientName: "Aman Preet", barberName: "Alex Crew", status: "Waiting", position: "8" },
  { id: "9", clientName: "George William", barberName: "John Doe", status: "Waiting", position: "9" },
  { id: "10", clientName: "Kabir Soni", barberName: "Sarah Connor", status: "Waiting", position: "10" },
];

const MOCK_BARBERS_API = [
  { id: "b1", name: "John Doe", queueCount: 1, ewt: "20 mins", isOnline: true },
  { id: "b2", name: "Bob", queueCount: 0, ewt: "0 mins", isOnline: true },
  { id: "b3", name: "Jazz", queueCount: 0, ewt: "0 mins", isOnline: true },
  { id: "b4", name: "Hercules", queueCount: 0, ewt: "0 mins", isOnline: false },
];

const QueueList = () => {
  const [queue] = useState(LIVE_QUEUE_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedQueueItem, setSelectedQueueItem] = useState(null);
  const [temporaryBarber, setTemporaryBarber] = useState(null);

  const filteredQueue = queue.filter(
    (item) =>
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barberName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpenAssignmentModal = (item) => {
    setSelectedQueueItem(item);
    setTemporaryBarber(item.barberName); 
  };

  const handleSaveBarberAssignment = () => {
    console.log(`Reassigning client ${selectedQueueItem?.clientName} to Stylist: ${temporaryBarber}`);
    setSelectedQueueItem(null);
  };

  const renderQueueItem = ({ item }) => {
    const isNext = item.status === "Next";

    return (
      <TouchableOpacity
        activeOpacity={0.8}
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
                },
              ]}
            >
              #{item.position}
            </Text>
          </View>

          <View style={styles.detailsBlock}>
            <Text style={[darkTheme.typography.cardTitle, styles.clientName]}>
              {item.clientName}
            </Text>
            <View style={styles.barberRow}>
              <Ionicons
                name="cut-outline"
                size={scale(12)}
                color={darkTheme.colors.textMuted}
              />
              <Text style={[darkTheme.typography.bodyMuted, styles.barberName]}>
                Stylist: {item.barberName}
              </Text>
            </View>
          </View>
        </View>

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
            {item.status}
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
        </View>
      </View>

      <FlatList
        data={filteredQueue}
        keyExtractor={(item) => item.id}
        renderItem={renderQueueItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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

      {/* Choose Barber Assignment Modal Sheet */}
      <Modal 
        animationType="slide" 
        transparent={true} 
        visible={selectedQueueItem !== null}
        onRequestClose={() => setSelectedQueueItem(null)}
      >
        <View style={styles.modalOverlayScrim}>
          <View style={[styles.calendarModalContent, { backgroundColor: darkTheme.colors.card }]}>
            
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={[darkTheme.typography.cardTitle, { fontWeight: "700" }]}>Choose Barber</Text>
                <Text style={[darkTheme.typography.bodyMuted, { fontSize: scale(11), marginTop: verticalScale(2) }]}>
                  Assign staff to {selectedQueueItem?.clientName}
                </Text>
              </View>
              <TouchableOpacity style={styles.closeFormButtonCircle} onPress={() => setSelectedQueueItem(null)}>
                <Ionicons name="close" size={scale(14)} color="#FF3B30" />
              </TouchableOpacity>
            </View>

            {/* Current Selected Input Box — Pinned Clean Dynamic Amber Outline Over Solid Black */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>Current Selection</Text>
              <View style={[styles.staticPillBannerInput, { backgroundColor: "rgba(0,0,0,0.25)", borderColor: darkTheme.colors.border }]}>
                <Text style={[darkTheme.typography.bodyMain, { fontWeight: "700" }]}>
                  {temporaryBarber || "Select a barber"}
                </Text>
              </View>
            </View>

            {/* Available Barbers List Container */}
            <View style={[styles.inputGroup, { marginTop: verticalScale(14) }]}>
              <Text style={darkTheme.typography.inputLabel}>Available Barbers</Text>
              
              <View style={styles.barbersVerticalStack}>
                {MOCK_BARBERS_API.map((barber) => {
                  const isSelected = temporaryBarber === barber.name;
                  return (
                    <TouchableOpacity
                      key={barber.id}
                      activeOpacity={0.7}
                      onPress={() => setTemporaryBarber(barber.name)}
                      style={[
                        styles.barberSelectionRowCard,
                        {
                          backgroundColor: isSelected ? "rgba(255, 149, 0, 0.05)" : "rgba(255, 255, 255, 0.01)",
                          borderColor: isSelected ? darkTheme.colors.accent : darkTheme.colors.border,
                        },
                      ]}
                    >
                      <View style={styles.barberLeftGroup}>
                        <View style={[styles.avatarCircle, { backgroundColor: "#2C2C2E" }]}>
                          <Ionicons name="person" size={scale(13)} color={darkTheme.colors.textMuted} />
                        </View>
                        
                        <View>
                          <View style={styles.nameBadgeRowAlignment}>
                            <Text style={[styles.barberNameText, { color: isSelected ? darkTheme.colors.accent : darkTheme.colors.textMain }]}>
                              {barber.name}
                            </Text>
                            {/* Premium Status Badge Injection Layer */}
                            <View style={[styles.statusBadgeMicroPill, { backgroundColor: barber.isOnline ? "rgba(52, 199, 89, 0.1)" : "rgba(255, 59, 48, 0.1)" }]}>
                              <Text style={[styles.statusBadgePillText, { color: barber.isOnline ? "#34C759" : "#FF3B30" }]}>
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
                        <Text style={[darkTheme.typography.bodyMuted, styles.ewtValueText]}>{barber.ewt}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Bottom Actions Row — Equal Width Split Framework */}
            <View style={styles.formActionControlsRow}>
              <TouchableOpacity 
                style={[styles.modalSubmitButton, { backgroundColor: darkTheme.colors.accent, flex: 1 }]} 
                onPress={handleSaveBarberAssignment}
                activeOpacity={0.8}
              >
                <Text style={[darkTheme.typography.btnText, { color: "#000000", fontWeight: "700" }]}>Serve</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalSubmitButton, { backgroundColor: "rgba(255,59,48,0.06)", borderColor: "rgba(255,59,48,0.15)", borderWidth: 1, flex: 1 }]} 
                onPress={() => setSelectedQueueItem(null)}
                activeOpacity={0.8}
              >
                <Text style={[darkTheme.typography.btnText, { color: "#FF3B30", fontWeight: "700" }]}>Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
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
  mainTitle: {
    fontSize: scale(22),
    fontWeight: "700",
    marginBottom: verticalScale(12),
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
    height: verticalScale(64), 
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
  },
  emptyText: {
    textAlign: "center",
    marginTop: verticalScale(40),
    fontSize: scale(13),
  },
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
  barbersVerticalStack: {
    width: "100%",
    gap: verticalScale(8),
    marginTop: verticalScale(6),
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
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    justifyContent: "center",
    alignItems: "center",
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
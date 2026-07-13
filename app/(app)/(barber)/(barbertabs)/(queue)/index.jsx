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

import BarberHeader from "../../../../../components/Header/BarberHeader"; 
import { darkTheme } from "../../../../../constants/appTheme";

const LIVE_QUEUE_DATA = [
  { id: "1", clientName: "Shyam Sharma", barberName: "John Doe", status: "Next", position: "1", ewt: "0 mins" },
  { id: "2", clientName: "Aditya Verma", barberName: "Alex Crew", status: "Waiting", position: "2", ewt: "15 mins" },
  { id: "3", clientName: "Rahul Mishra", barberName: "John Doe", status: "Waiting", position: "3", ewt: "30 mins" },
  { id: "4", clientName: "Michael Chang", barberName: "Sarah Connor", status: "Waiting", position: "4", ewt: "45 mins" },
  { id: "5", clientName: "Rohan Das", barberName: "Alex Crew", status: "Waiting", position: "5", ewt: "60 mins" },
  { id: "6", clientName: "Vikram Malhotra", barberName: "John Doe", status: "Waiting", position: "6", ewt: "75 mins" },
  { id: "7", clientName: "David Miller", barberName: "Sarah Connor", status: "Waiting", position: "7", ewt: "90 mins" },
  { id: "8", clientName: "Aman Preet", barberName: "Alex Crew", status: "Waiting", position: "8", ewt: "105 mins" },
  { id: "9", clientName: "George William", barberName: "John Doe", status: "Waiting", position: "9", ewt: "120 mins" },
  { id: "10", clientName: "Kabir Soni", barberName: "Sarah Connor", status: "Waiting", position: "10", ewt: "135 mins" },
];

const QueueList = () => {
  const [queue] = useState(LIVE_QUEUE_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedQueueItem, setSelectedQueueItem] = useState(null);

  const filteredQueue = queue.filter(
    (item) =>
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barberName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpenActionModal = (item) => {
    setSelectedQueueItem(item);
  };

  const handleServeClient = () => {
    console.log(`Serving customer: ${selectedQueueItem?.clientName}`);
    setSelectedQueueItem(null);
  };

  const renderQueueItem = ({ item }) => {
    const isNext = item.status === "Next";

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleOpenActionModal(item)}
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

        <View style={styles.cardRight}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isNext
                  ? "rgba(255, 149, 0, 0.1)"
                  : "rgba(255, 255, 255, 0.05)",
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
                  fontSize: scale(10),
                },
              ]}
            >
              {item.status.toUpperCase()}
            </Text>
          </View>
          
          {item.ewt && (
            <View style={styles.timeRow}>
              {!isNext && (
                <Ionicons 
                  name="time-outline" 
                  size={scale(11)} 
                  color={darkTheme.colors.textMuted} 
                />
              )}
              <Text 
                style={[
                  darkTheme.typography.bodyMuted, 
                  styles.cardEwtText, 
                  { color: isNext ? darkTheme.colors.accent : darkTheme.colors.textMain }
                ]}
              >
                {isNext ? "Ready" : item.ewt}
              </Text>
            </View>
          )}
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
      <BarberHeader
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

      {/* Slide-from-Bottom Action Sheet Modal */}
      <Modal 
        animationType="slide" 
        transparent={true} 
        visible={selectedQueueItem !== null}
        onRequestClose={() => setSelectedQueueItem(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlayScrim} 
          activeOpacity={1} 
          onPress={() => setSelectedQueueItem(null)}
        >
          {/* Action sheet box snaps directly to the bottom area */}
          <View 
            style={[styles.actionSheetBox, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
            onStartShouldSetResponder={() => true} // Prevents click-through dismissal on the box itself
          >
            {/* Visual Drag Handle Notch Indicator */}
            <View style={styles.dragHandle} />

            {/* Profile/Customer Avatar Container Block */}
            <View style={styles.profileHeaderBlock}>
              <View style={[styles.avatarWrapperCircle, { backgroundColor: "#2C2C2E" }]}>
                <Ionicons name="person" size={scale(24)} color={darkTheme.colors.textMuted} />
              </View>
              <Text style={[darkTheme.typography.cardTitle, styles.actionSheetTitle, { color: darkTheme.colors.textMain }]}>
                {selectedQueueItem?.clientName}
              </Text>
              <Text style={[darkTheme.typography.bodyMuted, { fontSize: scale(12) }]}>
                Stylist Assigned: {selectedQueueItem?.barberName}
              </Text>
            </View>

            {/* Structured Theme Actions Row */}
            <View style={styles.actionSheetRow}>
              {/* Confirm / Serve Action Button */}
              <TouchableOpacity 
                style={[styles.modalActionButton, { backgroundColor: darkTheme.colors.accent, borderRadius: darkTheme.layout.borderRadiusMedium }]} 
                onPress={handleServeClient}
                activeOpacity={0.8}
              >
                <Text style={[darkTheme.typography.btnText, { color: "#000000", fontWeight: "700" }]}>
                  Serve Customer
                </Text>
              </TouchableOpacity>

              {/* Dismiss / Cancel Action Button */}
              <TouchableOpacity 
                style={[
                  styles.modalActionButton, 
                  { 
                    backgroundColor: "rgba(255, 59, 48, 0.08)", 
                    borderWidth: 1, 
                    borderColor: "rgba(255, 59, 48, 0.2)",
                    borderRadius: darkTheme.layout.borderRadiusMedium 
                  }
                ]} 
                onPress={() => setSelectedQueueItem(null)}
                activeOpacity={0.8}
              >
                <Text style={[darkTheme.typography.btnText, { color: "#FF3B30", fontWeight: "700" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableOpacity>
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
    paddingHorizontal: scale(14),
    height: verticalScale(68), 
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    flex: 1,
  },
  cardRight: {
    alignItems: "flex-end",
    justifyContent: "center",
    gap: verticalScale(6),
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
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    justifyContent: "center",
    alignItems: "center",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  cardEwtText: {
    fontSize: scale(11),
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    marginTop: verticalScale(40),
    fontSize: scale(13),
  },
  
  /* Slide Up Action Sheet Style Configurations */
  modalOverlayScrim: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end", // Layout bottom execution alignment
  },
  actionSheetBox: {
    width: "100%",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(36),
    borderTopWidth: 1,
  },
  dragHandle: {
    width: scale(36),
    height: verticalScale(4),
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: scale(2),
    alignSelf: "center",
    marginBottom: verticalScale(20),
  },
  profileHeaderBlock: {
    alignItems: "center",
    marginBottom: verticalScale(24),
  },
  avatarWrapperCircle: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(10),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  actionSheetTitle: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: scale(16),
    marginBottom: verticalScale(2),
  },
  actionSheetRow: {
    flexDirection: "row",
    width: "100%",
    gap: scale(12),
  },
  modalActionButton: {
    flex: 1,
    height: darkTheme.layout.buttonHeight || verticalScale(44), // Slightly enhanced height for easier tap targeting
    justifyContent: "center",
    alignItems: "center",
  },
});


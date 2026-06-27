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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../components/Header/Header"; // Adjust relative path as needed
import { darkTheme } from "../../../../constants/appTheme";

// 10 Mock Datasets accurately capturing live multi-user workflow variables
const LIVE_QUEUE_DATA = [
  {
    id: "1",
    clientName: "Shyam Sharma",
    barberName: "John Doe",
    status: "Next",
    position: "1",
  },
  {
    id: "2",
    clientName: "Aditya Verma",
    barberName: "Alex Crew",
    status: "Waiting",
    position: "2",
  },
  {
    id: "3",
    clientName: "Rahul Mishra",
    barberName: "John Doe",
    status: "Waiting",
    position: "3",
  },
  {
    id: "4",
    clientName: "Michael Chang",
    barberName: "Sarah Connor",
    status: "Waiting",
    position: "4",
  },
  {
    id: "5",
    clientName: "Rohan Das",
    barberName: "Alex Crew",
    status: "Waiting",
    position: "5",
  },
  {
    id: "6",
    clientName: "Vikram Malhotra",
    barberName: "John Doe",
    status: "Waiting",
    position: "6",
  },
  {
    id: "7",
    clientName: "David Miller",
    barberName: "Sarah Connor",
    status: "Waiting",
    position: "7",
  },
  {
    id: "8",
    clientName: "Aman Preet",
    barberName: "Alex Crew",
    status: "Waiting",
    position: "8",
  },
  {
    id: "9",
    clientName: "George William",
    barberName: "John Doe",
    status: "Waiting",
    position: "9",
  },
  {
    id: "10",
    clientName: "Kabir Soni",
    barberName: "Sarah Connor",
    status: "Waiting",
    position: "10",
  },
];

const QueueList = () => {
  const [queue] = useState(LIVE_QUEUE_DATA);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQueue = queue.filter(
    (item) =>
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barberName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderQueueItem = ({ item }) => {
    const isNext = item.status === "Next";

    return (
      <TouchableOpacity
        activeOpacity={0.8}
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
          {/* Circular Position Number Badge */}
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

          {/* User Details metadata */}
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

        {/* Dynamic Action Target status badge */}
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
      {/* Structural Native Header Anchor */}
      <Header
        title="Queue List"
        subTitle="Monitor and manage live customer arrivals"
        showBack={false}
      />

      {/* Optimized Layout Header Section */}
      <View style={styles.topContainer}>
        {/* High-Fidelity Mobile Search Box */}
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

      {/* Main Performance Optimized List Component */}
      <FlatList
        data={filteredQueue}
        keyExtractor={(item) => item.id}
        renderItem={renderQueueItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={10} // Forces allocation initialization for all 10 records
        removeClippedSubviews={Platform.OS === "android"}
        ListEmptyComponent={
          <Text style={[darkTheme.typography.bodyMuted, styles.emptyText]}>
            No customers found in active queue
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default QueueList;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures total container viewport size is strictly managed
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
    height: darkTheme.layout.componentHeight || verticalScale(40), // Pulling component height strictly from theme
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchField: {
    flex: 1,
    paddingVertical: 0, // Clears layout overflow calculations
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
    height: verticalScale(64), // Set explicit row box boundaries to fix layout sizing distortion
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
});

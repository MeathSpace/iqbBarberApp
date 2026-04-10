import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import ThemeSafeAreaView from "../../../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../../../components/ThemeTextPrimary";
import i18n from "../../../../src/localization/i18n";

const index = () => {
  const baseContent = i18n.t("app.admin.admintabs.queue");
  const { colors } = useTheme();

  const [tabs, setTabs] = useState([
    { id: 1, name: baseContent.tabs.liveQueue },
    { id: 2, name: baseContent.tabs.history },
  ]);

  const [selectedTab, setSelectedTab] = useState(baseContent.tabs.liveQueue);

  const data = [
    { id: "1", barber: "John Doe", customer: "Michael", posWait: "5 / 10" },
    { id: "2", barber: "Jane Smith", customer: "Sarah", posWait: "2 / 5" },
    { id: "3", barber: "Alex Ray", customer: "David", posWait: "3 / 8" },
    { id: "4", barber: "Emily Clark", customer: "Olivia", posWait: "4 / 7" },
    { id: "5", barber: "David Lee", customer: "Ethan", posWait: "1 / 3" },
  ];

  const dataHistory = [
    {
      id: "1",
      barber: "John Doe",
      customer: "Michael",
      wait: "#1 / ~25m",
      status: "served",
    },
    {
      id: "2",
      barber: "Emma Smith",
      customer: "Sarah",
      wait: "#2 / ~15m",
      status: "waiting",
    },
    {
      id: "3",
      barber: "Liam Brown",
      customer: "David",
      wait: "#3 / ~20m",
      status: "served",
    },
    {
      id: "4",
      barber: "Olivia Johnson",
      customer: "Emily",
      wait: "#4 / ~18m",
      status: "cancelled",
    },
    {
      id: "5",
      barber: "Noah Davis",
      customer: "Chloe",
      wait: "#5 / ~22m",
      status: "served",
    },
  ];

  return (
    <ThemeSafeAreaView
      edges={["top", "left", "right"]}
      style={{
        padding: scale(15),
      }}
    >
      <View
        style={[
          styles.queueHeader,
          {
            backgroundColor: colors.progressBgColor,
          },
        ]}
      >
        {tabs.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedTab(item.name);
              }}
              key={item.id}
              style={[
                styles.tabButton,
                {
                  backgroundColor:
                    selectedTab === item.name
                      ? colors.background2
                      : "transparent",
                },
              ]}
            >
              <ThemeTextPrimary
                style={{
                  color:
                    selectedTab === item.name ? "#14b8a6" : colors.textColor1,
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                {item.name}
              </ThemeTextPrimary>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedTab === baseContent.tabs.liveQueue && (
        <View
          style={{
            backgroundColor: colors.background2,
            borderWidth: scale(0.5),
            borderColor: colors.borderColor1,
            borderRadius: scale(8),
            marginTop: verticalScale(10),
            flex: 1,
          }}
        >
          {/* Header */}
          <View
            style={[
              styles.liveQueueHeader,
              {
                borderColor: colors.borderColor1,
              },
            ]}
          >
            <ThemeTextPrimary
              style={[
                styles.liveQueueHeaderCell,
                styles.barberCol,
                { color: colors.textColor2 },
              ]}
            >
              {baseContent.liveQueue.header.barber}
            </ThemeTextPrimary>
            <ThemeTextPrimary
              style={[
                styles.liveQueueHeaderCell,
                styles.customerCol,
                { color: colors.textColor2 },
              ]}
            >
              {baseContent.liveQueue.header.customer}
            </ThemeTextPrimary>
            <ThemeTextPrimary
              style={[
                styles.liveQueueHeaderCell,
                styles.posCol,
                styles.right,
                { color: colors.textColor2 },
              ]}
            >
              {baseContent.liveQueue.header.posWait}
            </ThemeTextPrimary>
          </View>

          {/* FlatList */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            style={{ flex: 1 }}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.liveQueueRow,
                  {
                    borderBottomColor: colors.borderColor1,
                  },
                ]}
              >
                {/* Barber column with image + name */}
                <View style={[styles.barberCol, styles.barberCell]}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg",
                    }}
                    contentFit="cover"
                    transition={1000}
                  />
                  <ThemeTextPrimary
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      styles.liveQueueCell,
                      styles.left,
                      { flexShrink: 1, minWidth: 0, color: colors.textColor1 }, // 👈 This line fixes it
                    ]}
                  >
                    {item.barber}
                  </ThemeTextPrimary>
                </View>

                {/* Customer */}
                <ThemeTextPrimary
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    styles.liveQueueCell,
                    styles.customerCol,
                    styles.left,
                  ]}
                >
                  {item.customer}
                </ThemeTextPrimary>

                {/* Pos / Wait */}
                <ThemeTextPrimary
                  style={[styles.liveQueueCell, styles.posCol, styles.right]}
                >
                  {item.posWait}
                </ThemeTextPrimary>
              </View>
            )}
            contentContainerStyle={{}}
          />
        </View>
      )}

      {selectedTab === baseContent.tabs.history && (
        <View
          style={{
            backgroundColor: colors.background2,
            borderWidth: scale(0.5),
            borderColor: colors.borderColor1,
            borderRadius: scale(8),
            marginTop: verticalScale(10),
            flex: 1,
          }}
        >
          {/* Header */}
          <View
            style={[
              styles.liveQueueHeader,
              {
                borderColor: colors.borderColor1,
              },
            ]}
          >
            <ThemeTextPrimary
              style={[
                styles.liveQueueHeaderCell,
                styles.historyBarberCol,
                { color: colors.textColor2 },
              ]}
            >
              {baseContent.history.header.barber}
            </ThemeTextPrimary>
            <ThemeTextPrimary
              style={[
                styles.liveQueueHeaderCell,
                styles.historyCustomerCol,
                { color: colors.textColor2 },
              ]}
            >
              {baseContent.history.header.customer}
            </ThemeTextPrimary>
            <ThemeTextPrimary
              style={[
                styles.liveQueueHeaderCell,
                styles.historyWaitCol,
                styles.right,
                { color: colors.textColor2 },
              ]}
            >
              {baseContent.history.header.wait}
            </ThemeTextPrimary>
            <ThemeTextPrimary
              style={[
                styles.liveQueueHeaderCell,
                styles.historyStatusCol,
                styles.right,
                { color: colors.textColor2 },
              ]}
            >
              {baseContent.history.header.status}
            </ThemeTextPrimary>
          </View>

          {/* FlatList */}
          <FlatList
            data={dataHistory}
            keyExtractor={(item) => item.id}
            style={{ flex: 1 }}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.liveQueueRow,
                  {
                    borderBottomColor: colors.borderColor1,
                  },
                ]}
              >
                {/* Barber column with image + name */}
                <View style={[styles.historyBarberCol, styles.barberCell]}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg",
                    }}
                    contentFit="cover"
                    transition={1000}
                  />
                  <ThemeTextPrimary
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      styles.liveQueueCell,
                      styles.left,
                      { flexShrink: 1, minWidth: 0, color: colors.textColor1 }, // 👈 This line fixes it
                    ]}
                  >
                    {item.barber}
                  </ThemeTextPrimary>
                </View>

                {/* Customer */}
                <ThemeTextPrimary
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    styles.liveQueueCell,
                    styles.historyCustomerCol,
                    styles.left,
                  ]}
                >
                  {item.customer}
                </ThemeTextPrimary>

                {/* Wait */}
                <ThemeTextPrimary
                  style={[
                    styles.liveQueueCell,
                    styles.historyWaitCol,
                    styles.right,
                  ]}
                >
                  {item.wait}
                </ThemeTextPrimary>

                {/* Status */}
                <ThemeTextPrimary
                  style={[
                    styles.liveQueueCell,
                    styles.historyStatusCol,
                    styles.right,
                    { color: "green" },
                  ]}
                >
                  {item.status}
                </ThemeTextPrimary>
              </View>
            )}
            contentContainerStyle={{}}
          />
        </View>
      )}
    </ThemeSafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  queueHeader: {
    height: verticalScale(38),
    width: "100%",
    padding: scale(5),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    borderRadius: scale(8),
  },
  tabButton: {
    height: verticalScale(28),
    flex: 1,
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },

  liveQueueHeader: {
    flexDirection: "row",
    borderBottomWidth: scale(1),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
  },
  liveQueueHeaderCell: {
    fontSize: scale(11),
    fontFamily: "AirbnbCereal_W_Bd",
    textTransform: "uppercase",
  },
  liveQueueRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
  },
  liveQueueCell: {
    fontSize: scale(12),
  },
  left: { textAlign: "left" },
  right: { textAlign: "right" },

  // --- Column width control ---
  barberCol: { flex: 0.45, minWidth: 120 },
  customerCol: { flex: 0.35, minWidth: 90 },
  posCol: { flex: 0.2, minWidth: 70 },

  historyBarberCol: { flex: 0.4, minWidth: 10 }, // Barber names are usually longer
  historyCustomerCol: { flex: 0.25, minWidth: 10 }, // Customer names moderately long
  historyWaitCol: { flex: 0.2, minWidth: 10 }, // Short numeric value
  historyStatusCol: { flex: 0.2, minWidth: 10 }, // Small text like “Done” or “Waiting”

  // --- Barber cell with image ---
  barberCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },

  // --- Profile image ---
  image: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: "#E2E8F0",
  },
});

import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { useRouter } from "expo-router";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { EyeIcon, DragIcon } from "../../../../../constants/icons";

const AdvertisementsScreen = () => {
  const router = useRouter();
  
  const [advertisementsData, setAdvertisementsData] = useState([
    {
      id: "1",
      title: "Summer Promotion",
      ratio: "16:9 ratio",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop",
      status: "Active",
    },
    {
      id: "2",
      title: "Weekend Special",
      ratio: "16:9 ratio",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=600&auto=format&fit=crop",
      status: "Active",
    },
  ]);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <View
          style={[
            styles.adCard,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: isActive ? darkTheme.colors.accent : darkTheme.colors.border,
              shadowOpacity: isActive ? 0.3 : 0,
              elevation: isActive ? 5 : 0,
            },
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.adImage} />

          <View style={[styles.cardFooter, { borderColor: darkTheme.colors.border }]}>
            <View style={styles.leftFooterContent}>
              <TouchableOpacity 
                onPressIn={drag} 
                activeOpacity={1}
                style={styles.dragHandleTouch}
              >
                <DragIcon
                  size={scale(18)}
                  color={isActive ? darkTheme.colors.accent : darkTheme.colors.textMuted}
                  style={styles.dragIcon}
                />
              </TouchableOpacity>
              <View>
                <Text style={[darkTheme.typography.cardTitle, { fontSize: scale(13) }]}>
                  {item.title}
                </Text>
                <Text style={[darkTheme.typography.bodyMuted, { marginTop: verticalScale(1) }]}>
                  {item.ratio}
                </Text>
              </View>
            </View>

            <View style={[styles.statusBadge, { backgroundColor: darkTheme.status.success.bg }]}>
              <EyeIcon
                size={scale(12)}
                color={darkTheme.status.success.text}
                style={styles.statusIcon}
              />
              <Text style={[styles.statusText, { color: darkTheme.status.success.text }]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </ScaleDecorator>
    );
  };

  const ListHeaderComponent = () => (
    <View>
      <View style={styles.premiumBanner}>
        <Text style={[darkTheme.typography.inputLabel, { color: darkTheme.colors.accent, fontWeight: "700" }]}>
          Premium Feature
        </Text>
        <Text style={[darkTheme.typography.bodyMuted, { color: "#E5E5EA", lineHeight: scale(15), marginTop: verticalScale(4) }]}>
          Advertisements appear on customer apps and in-salon TV displays with your live queue.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: darkTheme.colors.accent, height: darkTheme.layout.buttonHeight }]}
        activeOpacity={0.8}
        onPress={() => {
          router.push("/createAdvertisement");
        }}
      >
        <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>New advertisement</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeaderRow}>
        <Text style={[darkTheme.typography.cardTitle, { fontSize: scale(13) }]}>Current Advertisements</Text>
        <Text style={darkTheme.typography.bodyMuted}>
          Drag to reorder
        </Text>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaView
        edges={["top", "right", "left", "bottom"]}
        style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
      >
        <Header title={"Advertisements"} subTitle={"Manage promotional content"} />
        
        <DraggableFlatList
          data={advertisementsData}
          onDragEnd={({ data }) => setAdvertisementsData(data)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default AdvertisementsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingTop: verticalScale(20),
    // Increased packing depth below the list elements to prevent viewport overflow cuts
    paddingBottom: verticalScale(44), 
  },
  premiumBanner: {
    backgroundColor: "#151311",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    padding: scale(14),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: "rgba(255, 149, 0, 0.15)",
  },
  addButton: {
    width: "100%",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(24),
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  separator: {
    height: verticalScale(16),
  },
  adCard: {
    borderWidth: 1,
    borderRadius: darkTheme.layout.borderRadiusLarge,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  adImage: {
    width: "100%",
    height: verticalScale(140),
    resizeMode: "cover",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scale(12),
    borderTopWidth: 1,
  },
  leftFooterContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dragHandleTouch: {
    paddingRight: scale(8),
    paddingVertical: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  dragIcon: {
    marginRight: scale(4),
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: darkTheme.layout.borderRadiusSmall,
  },
  statusIcon: {
    marginRight: scale(4),
  },
  statusText: {
    fontSize: scale(10),
    fontWeight: "600",
    letterSpacing: -0.1,
  },
});
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Shimmer from "react-native-modern-shimmer";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { DragIcon, EyeIcon } from "../../../../../constants/icons";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import api from "../../../../../utils/api";

// Reusable stealth dark theme palette tokens for react-native-modern-shimmer
const SKELETON_THEME = {
  header: {
    baseColor: "#221f1c",
    highlightColor: "#332e2a",
  },
  button: {
    baseColor: "#2a2a2a",
    highlightColor: "#333333",
  },
  card: {
    baseColor: "#1c1c1e",
    highlightColor: "#2c2c2e",
  },
  text: {
    baseColor: "#2c2c2e",
    highlightColor: "#3a3a3c",
  },
};

const AdvertisementsScreen = () => {
  const router = useRouter();
  const { authenticatedUser } = useAdminAuth();
  const salonId = authenticatedUser?.salonId;

  const [advState, setAdvState] = useState({ loading: false, data: [] });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const dragControllerRef = useRef(null);

  // 1. Fetch all advertisements on mount
  useFocusEffect(
    useCallback(() => {
      if (!salonId) return;

      const controller = new AbortController();

      const fetchAdvertisements = async () => {
        setAdvState({ loading: true, data: [] });

        try {
          const response = await api.post(
            `/advertisement/getAdvertisements`,
            { salonId },
            { signal: controller.signal },
          );

          setAdvState({
            loading: false,
            data: response?.data?.advertisements || [],
          });
        } catch (error) {
          if (error.name !== "CanceledError") {
            setAdvState({ loading: false, data: [] });

            Alert.alert(
              "Error",
              error?.response?.data?.message || "Failed to load advertisements",
            );
          }
        }
      };

      fetchAdvertisements();

      return () => {
        controller.abort();
      };
    }, [salonId]),
  );

  // 2. Handle Reordering API synchronization
  useFocusEffect(
    useCallback(() => {
      if (!salonId || !advState.data?.length) return;

      if (dragControllerRef.current) {
        dragControllerRef.current.abort();
      }

      const controller = new AbortController();
      dragControllerRef.current = controller;

      const syncDraggedOrder = async () => {
        try {
          await api.post(
            "/advertisement/setDragAdvertisements",
            {
              salonId,
              advertisements: advState.data,
            },
            {
              signal: controller.signal,
            },
          );
        } catch (error) {
          if (error.name !== "CanceledError") {
            Alert.alert(
              "Sync Failed",
              "Could not save your arrangement order.",
            );
          }
        }
      };

      syncDraggedOrder();

      return () => controller.abort();
    }, [advState.data, salonId]),
  );

  // 3. Delete Handler
  const deleteHandler = (publicId, mongoId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to proceed with deleting this advertisement?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleteLoading(true);
              const response = await api.delete(
                "/advertisement/deleteAdvertisements",
                {
                  data: { public_id: publicId, img_id: mongoId },
                },
              );

              setAdvState((prev) => ({
                ...prev,
                data: prev.data.filter((item) => item._id !== mongoId),
              }));

              Alert.alert(
                "Success",
                response?.data?.message || "Advertisement deleted successfully",
              );
            } catch (error) {
              Alert.alert(
                "Error",
                error?.response?.data?.message || "Something went wrong!",
              );
            } finally {
              setDeleteLoading(false);
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <View
          style={[
            styles.adCard,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: isActive
                ? darkTheme.colors.accent
                : darkTheme.colors.border,
              shadowOpacity: isActive ? 0.3 : 0,
              elevation: isActive ? 5 : 0,
            },
          ]}
        >
          <Image source={{ uri: item.url }} style={styles.adImage} />

          <View
            style={[
              styles.cardFooter,
              { borderColor: darkTheme.colors.border },
            ]}
          >
            <View style={styles.leftFooterContent}>
              <TouchableOpacity
                onPressIn={drag}
                activeOpacity={1}
                style={styles.dragHandleTouch}
              >
                <DragIcon
                  size={scale(18)}
                  color={
                    isActive
                      ? darkTheme.colors.accent
                      : darkTheme.colors.textMuted
                  }
                  style={styles.dragIcon}
                />
              </TouchableOpacity>
              <View style={{ flex: 1, marginRight: scale(8) }}>
                <Text
                  numberOfLines={1}
                  style={[
                    darkTheme.typography.cardTitle,
                    { fontSize: scale(13) },
                  ]}
                >
                  {item.link || "No redirect link available"}
                </Text>
                <Text
                  style={[
                    darkTheme.typography.bodyMuted,
                    { marginTop: verticalScale(1) },
                  ]}
                >
                  16:9 ratio
                </Text>
              </View>
            </View>

            {item.type !== "default" ? (
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editBtn]}
                  onPress={() => {
                    router.push({
                      pathname: "/editAdvertisement",
                      params: {
                        id: item._id,
                        currentLink: item.link || "",
                        currentUrl: item.url || "",
                        publicId: String(item.public_id || ""),
                      },
                    });
                  }}
                >
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteBtn]}
                  onPress={() => deleteHandler(item.public_id, item._id)}
                  disabled={deleteLoading}
                >
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: darkTheme.status.success.bg },
                ]}
              >
                <EyeIcon
                  size={scale(12)}
                  color={darkTheme.status.success.text}
                  style={styles.statusIcon}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: darkTheme.status.success.text },
                  ]}
                >
                  Default
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScaleDecorator>
    );
  };

  const ListHeaderComponent = () => (
    <View>
      <View style={styles.premiumBanner}>
        <Text
          style={[
            darkTheme.typography.inputLabel,
            { color: darkTheme.colors.accent, fontWeight: "700" },
          ]}
        >
          Premium Feature
        </Text>
        <Text
          style={[
            darkTheme.typography.bodyMuted,
            {
              color: "#E5E5EA",
              lineHeight: scale(15),
              marginTop: verticalScale(4),
            },
          ]}
        >
          Advertisements appear on customer apps and in-salon TV displays with
          your live queue.
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: darkTheme.colors.accent,
            height: darkTheme.layout.buttonHeight,
          },
        ]}
        activeOpacity={0.8}
        onPress={() => {
          router.push({
            pathname: "/createAdvertisement",
            params: { mode: "create" },
          });
        }}
      >
        <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
          New advertisement
        </Text>
      </TouchableOpacity>

      <View style={styles.sectionHeaderRow}>
        <Text style={[darkTheme.typography.cardTitle, { fontSize: scale(13) }]}>
          Current Advertisements
        </Text>
        <Text style={darkTheme.typography.bodyMuted}>Drag to reorder</Text>
      </View>
    </View>
  );

  // Unified skeleton loader accurately mirroring real layout structure
  const ShimmerLoader = () => (
    <View style={styles.shimmerContainer}>
      {/* Banner Skeleton */}
      <Shimmer
        style={[
          styles.premiumBanner,
          { height: verticalScale(75), borderRadius: darkTheme.layout.borderRadiusMedium },
        ]}
        baseColor={SKELETON_THEME.header.baseColor}
        highlightColor={SKELETON_THEME.header.highlightColor}
      />

      {/* Add Button Skeleton */}
      <Shimmer
        style={[
          styles.addButton,
          {
            height: darkTheme.layout.buttonHeight || verticalScale(45),
            borderRadius: darkTheme.layout.borderRadiusMedium,
          },
        ]}
        baseColor={SKELETON_THEME.button.baseColor}
        highlightColor={SKELETON_THEME.button.highlightColor}
      />

      {/* Section Header Row Skeleton */}
      <View style={styles.sectionHeaderRow}>
        <Shimmer
          style={{ width: scale(130), height: verticalScale(16), borderRadius: 4 }}
          baseColor={SKELETON_THEME.text.baseColor}
          highlightColor={SKELETON_THEME.text.highlightColor}
        />
        <Shimmer
          style={{ width: scale(80), height: verticalScale(14), borderRadius: 4 }}
          baseColor={SKELETON_THEME.text.baseColor}
          highlightColor={SKELETON_THEME.text.highlightColor}
        />
      </View>

      {/* Advertisement Card Skeletons */}
      {[1, 2].map((key) => (
        <View
          key={key}
          style={[
            styles.adCard,
            {
              marginBottom: verticalScale(16),
              backgroundColor: darkTheme.colors.card,
              borderColor: darkTheme.colors.border,
            },
          ]}
        >
          <Shimmer
            style={{ width: "100%", height: verticalScale(140) }}
            baseColor={SKELETON_THEME.card.baseColor}
            highlightColor={SKELETON_THEME.card.highlightColor}
          />
          <View style={[styles.cardFooter, { borderColor: darkTheme.colors.border }]}>
            <View style={{ gap: verticalScale(4) }}>
              <Shimmer
                style={{ width: scale(150), height: verticalScale(14), borderRadius: 4 }}
                baseColor={SKELETON_THEME.text.baseColor}
                highlightColor={SKELETON_THEME.text.highlightColor}
              />
              <Shimmer
                style={{ width: scale(60), height: verticalScale(10), borderRadius: 3 }}
                baseColor={SKELETON_THEME.text.baseColor}
                highlightColor={SKELETON_THEME.text.highlightColor}
              />
            </View>
            <Shimmer
              style={{
                width: scale(70),
                height: verticalScale(26),
                borderRadius: darkTheme.layout.borderRadiusSmall,
              }}
              baseColor={SKELETON_THEME.button.baseColor}
              highlightColor={SKELETON_THEME.button.highlightColor}
            />
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaView
        edges={["top", "right", "left", "bottom"]}
        style={[
          styles.container,
          { backgroundColor: darkTheme.colors.background },
        ]}
      >
        <Header
          title={"Advertisements"}
          subTitle={"Manage promotional content"}
        />

        {advState.loading && advState.data.length === 0 ? (
          <ShimmerLoader />
        ) : (
          <DraggableFlatList
            data={advState.data}
            onDragEnd={({ data }) => setAdvState((prev) => ({ ...prev, data }))}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            ListHeaderComponent={ListHeaderComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No advertisement available</Text>
            }
          />
        )}
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
    paddingBottom: verticalScale(44),
  },
  shimmerContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingTop: verticalScale(8),
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
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: darkTheme.layout.borderRadiusSmall,
    marginLeft: scale(6),
  },
  editBtn: {
    backgroundColor: "#333",
  },
  deleteBtn: {
    backgroundColor: "#8b0000",
  },
  actionText: {
    color: "#ffffff",
    fontSize: scale(11),
    fontWeight: "600",
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
  emptyText: {
    color: darkTheme.colors.textMuted,
    textAlign: "center",
    marginTop: verticalScale(40),
    fontSize: scale(13),
  },
});
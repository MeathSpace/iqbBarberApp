import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { EyeIcon, DragIcon } from "../../../../../constants/icons";

export const DragVerticalIcon = ({
  size = scale(18),
  color = "black",
  style,
}) => (
  <MaterialCommunityIcons
    name="drag-vertical"
    size={size}
    color={color}
    style={style}
  />
);

const AdvertisementsScreen = () => {
  const advertisementsData = [
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
  ];

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header title={"Advertisements"} subTitle={"Manage promotional content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
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
        >
          <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>New advertisement</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeaderRow}>
          <Text style={[darkTheme.typography.cardTitle, { fontSize: scale(13) }]}>Current Advertisements</Text>
          <Text style={darkTheme.typography.bodyMuted}>
            Drag to reorder
          </Text>
        </View>

        <View style={styles.listContainer}>
          {advertisementsData.map((ad) => (
            <View
              key={ad.id}
              style={[
                styles.adCard,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                },
              ]}
            >
              <Image source={{ uri: ad.image }} style={styles.adImage} />

              <View style={[styles.cardFooter, { borderColor: darkTheme.colors.border }]}>
                <View style={styles.leftFooterContent}>
                  <DragIcon
                    size={scale(18)}
                    color={darkTheme.colors.textMuted}
                    style={styles.dragIcon}
                  />
                  <View>
                    <Text style={[darkTheme.typography.cardTitle, { fontSize: scale(13) }]}>{ad.title}</Text>
                    <Text style={[darkTheme.typography.bodyMuted, { marginTop: verticalScale(1) }]}>
                      {ad.ratio}
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
                    {ad.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdvertisementsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(24),
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
  listContainer: {
    gap: verticalScale(16),
  },
  adCard: {
    borderWidth: 1,
    borderRadius: darkTheme.layout.borderRadiusLarge,
    overflow: "hidden",
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
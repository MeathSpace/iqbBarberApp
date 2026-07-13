import React, { useState, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { darkTheme } from "../../../../constants/appTheme";

const INITIAL_SERVICES = [
  {
    id: "s1",
    name: "Haircut",
    description: "dfgfs",
    category: "General",
    type: "Regular",
    price: "100",
    time: "20",
    isAdded: true,
    iconUri: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=150",
  },
  {
    id: "s2",
    name: "Nail Art",
    description: "asc",
    category: "Nailart",
    type: "VIP",
    price: "40",
    time: "45",
    isAdded: false,
    iconUri: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=150",
  },
];

const ServiceCardItem = memo(({ item, onToggleAction, onUpdatePrice, onUpdateTime }) => {
  const isVIP = item.type === "VIP";

  return (
    <View style={[styles.salonOuterContainerDeckCard, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
      <View style={styles.salonParentHeaderContainerRow}>
        <View style={styles.salonHeaderLeftBlockGroup}>
          <View style={[styles.brandLogoCircleContainer, { borderColor: "rgba(255,255,255,0.04)" }]}>
            <Image source={{ uri: item.iconUri }} style={styles.cardHeaderEmbeddedAvatar} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.cardHeaderTitleBadgeRow}>
              <Text style={styles.salonNameHeadingTextContentNode}>{item.name}</Text>
              {isVIP && (
                <View style={styles.vipPillBadgeContainer}>
                  <View style={styles.vipPulseDotIndicator} />
                  <Text style={styles.vipBadgeLabelText}>VIP</Text>
                </View>
              )}
            </View>
            <Text style={styles.salonSubTagTextLabelDescription}>{item.description}</Text>
            <Text style={styles.innerRowTypeLabelText}>{item.category} • {item.type}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardActionsHeaderTrackRow}>
        <TouchableOpacity 
          style={[
            styles.innerRowActionTriggerCTAButtonBox, 
            { 
              backgroundColor: item.isAdded ? "rgba(255, 59, 48, 0.1)" : "rgba(52, 199, 89, 0.1)" 
            }
          ]}
          activeOpacity={0.75}
          onPress={() => onToggleAction(item.id)}
        >
          <Text style={[styles.innerRowActionButtonTextLabel, { color: item.isAdded ? "#FF3B30" : "#34C759" }]}>
            {item.isAdded ? "Delete" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.innerSubscriptionRowItem}>
        <View style={styles.innerItemLabelsStackColumn}>
          <Text style={styles.innerItemNameHeadingTextText}>Price</Text>
          <View style={styles.inlineInputFieldWrapper}>
            <Text style={styles.currencyPrefixIndicatorLabel}>₹</Text>
            <TextInput
              style={styles.inlineEditableTextInputInstance}
              value={item.price}
              onChangeText={(text) => onUpdatePrice(item.id, text)}
              keyboardType="numeric"
              selectionColor={darkTheme.colors.accent}
            />
          </View>
        </View>

        <View style={[styles.innerItemLabelsStackColumn, { alignItems: "flex-end" }]}>
          <Text style={[styles.innerItemNameHeadingTextText, { marginRight: scale(4) }]}>Estimated Time</Text>
          <View style={styles.inlineInputFieldWrapper}>
            <TextInput
              style={[styles.inlineEditableTextInputInstance, { textAlign: "right", paddingRight: scale(4) }]}
              value={item.time}
              onChangeText={(text) => onUpdateTime(item.id, text)}
              keyboardType="numeric"
              selectionColor={darkTheme.colors.accent}
            />
          </View>
        </View>
      </View>
    </View>
  );
});

const EditServices = () => {
  const router = useRouter();
  const [services, setServices] = useState(INITIAL_SERVICES);

  const handleToggleAction = (id) => {
    setServices(prev =>
      prev.map(item => item.id === id ? { ...item, isAdded: !item.isAdded } : item)
    );
  };

  const updateInlinePrice = (id, text) => {
    setServices(prev => 
      prev.map(item => item.id === id ? { ...item, price: text } : item)
    );
  };

  const updateInlineTime = (id, text) => {
    setServices(prev => 
      prev.map(item => item.id === id ? { ...item, time: text } : item)
    );
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <View style={styles.modalViewportFrame}>
        
        <View style={styles.modalWorkspaceHeader}>
          <Text style={styles.modalTitleLabel}>Edit Services</Text>
          {/* Fixed Active Back Navigation Interaction Hook */}
          <TouchableOpacity 
            activeOpacity={0.7} 
            style={styles.closeCrossIconButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={scale(14)} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listScrollContentTrack}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={Platform.OS === "android"}
          renderItem={({ item }) => (
            <ServiceCardItem
              item={item}
              onToggleAction={handleToggleAction}
              onUpdatePrice={updateInlinePrice}
              onUpdateTime={updateInlineTime}
            />
          )}
        />

        <View style={styles.stickyFooterActionButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.luxuryMutedShadedButton}
            onPress={() => router.back()}
          >
            <Text style={styles.luxuryMutedShadedButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalViewportFrame: {
    flex: 1,
    marginTop: verticalScale(8),
  },
  modalWorkspaceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(16),
  },
  modalTitleLabel: {
    color: "#FFFFFF",
    fontSize: scale(15),
    fontWeight: "700",
    letterSpacing: -0.1,
  },
  closeCrossIconButton: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(6),
    backgroundColor: "rgba(255, 59, 48, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 59, 48, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  listScrollContentTrack: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(75),
    paddingTop: verticalScale(8),
  },
  salonOuterContainerDeckCard: {
    width: "100%",
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(14),
    marginBottom: verticalScale(12),
  },
  salonParentHeaderContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: verticalScale(4),
  },
  salonHeaderLeftBlockGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    flex: 1,
  },
  brandLogoCircleContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    overflow: "hidden",
    borderWidth: 1,
  },
  cardHeaderEmbeddedAvatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardHeaderTitleBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  salonNameHeadingTextContentNode: {
    color: "#FFFFFF",
    fontSize: scale(14),
    fontWeight: "700",
  },
  vipPillBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(52, 199, 89, 0.08)",
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(1),
    borderRadius: scale(4),
    gap: scale(3.5),
  },
  vipPulseDotIndicator: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: "#34C759",
  },
  vipBadgeLabelText: {
    fontSize: scale(9),
    color: "#34C759",
    fontWeight: "800",
  },
  salonSubTagTextLabelDescription: {
    color: "rgba(255,255,255,0.4)",
    fontSize: scale(11.5),
    marginTop: verticalScale(3),
  },
  innerRowTypeLabelText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: scale(10.5),
    marginTop: verticalScale(2),
  },
  cardActionsHeaderTrackRow: {
    flexDirection: "row",
    gap: scale(10),
    marginVertical: verticalScale(6),
  },
  innerRowActionTriggerCTAButtonBox: {
    flex: 1,
    height: verticalScale(26),
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
  },
  innerRowActionButtonTextLabel: {
    fontSize: scale(11.5),
    fontWeight: "700",
    color: "#FFFFFF",
  },
  innerSubscriptionRowItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.04)",
    paddingTop: verticalScale(12),
    marginTop: verticalScale(2),
  },
  innerItemLabelsStackColumn: {
    flex: 1,
  },
  innerItemNameHeadingTextText: {
    color: "rgba(255,255,255,0.35)",
    fontSize: scale(10.5),
    fontWeight: "600",
  },
  inlineInputFieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(4),
  },
  currencyPrefixIndicatorLabel: {
    color: "#FFFFFF",
    fontSize: scale(13),
    fontWeight: "600",
    marginRight: scale(3),
  },
  inlineEditableTextInputInstance: {
    color: "#FFFFFF",
    fontSize: scale(13),
    fontWeight: "600",
    padding: 0,
    minWidth: scale(60),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.15)",
    paddingBottom: verticalScale(4),
  },
  
  // Luxury Matte Dark Footer Layout Structure
  stickyFooterActionButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: darkTheme.colors.background,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(8),
    paddingBottom: Platform.OS === "ios" ? verticalScale(20) : verticalScale(12),
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.03)",
  },
  luxuryMutedShadedButton: {
    backgroundColor: "#2C2C2E",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    height: verticalScale(38),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  luxuryMutedShadedButtonText: {
    color: darkTheme.colors.accent,
    fontSize: scale(12),
    fontWeight: "700",
  },
});

export default EditServices;
import React, { useState, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";

import Header from "../../../../../components/Header/Header"; 
import { darkTheme } from "../../../../../constants/appTheme";
import { router, useRouter } from "expo-router";

const STOCK_ICONS = [
  { id: "i1", uri: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=150" },
  { id: "i2", uri: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=150" },
  { id: "i3", uri: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=150" },
  { id: "i4", uri: "https://images.unsplash.com/photo-1517832606589-7a598b647192?w=150" },
  { id: "i5", uri: "https://images.unsplash.com/photo-1605497746444-ac9da5848ba7?w=150" },
  { id: "i6", uri: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=150" },
];

const SERVICE_TYPE_OPTIONS = [
  { label: "Regular", value: "Regular" },
  { label: "VIP", value: "VIP" },
];

const SERVICE_CATEGORY_OPTIONS = [
  { label: "Beard", value: "Beard" },
  { label: "Haircut", value: "Haircut" },
  { label: "Nailart", value: "Nailart" },
  { label: "General", value: "General" },
];

const INITIAL_SERVICES = [
  {
    id: "1",
    name: "Massage",
    description: "Massage Description",
    category: "Beard",
    type: "Regular",
    price: "345",
    time: "34",
    iconUri: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=150",
  },
  {
    id: "2",
    name: "Haircut",
    description: "dfgfs",
    category: "Beard",
    type: "Regular",
    price: "100",
    time: "22",
    iconUri: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=150",
  },
  {
    id: "3",
    name: "Nail Art",
    description: "asc",
    category: "Nailart",
    type: "VIP",
    price: "40",
    time: "45",
    iconUri: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=150",
  },
];

const ServiceCardItem = memo(({ item, onEdit, onDelete, onUpdatePrice, onUpdateTime }) => {
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
          style={[styles.innerRowActionTriggerCTAButtonBox, { backgroundColor: "rgba(255, 255, 255, 0.05)", borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.08)" }]}
          activeOpacity={0.75}
          onPress={() => onEdit(item)}
        >
          <Text style={[styles.innerRowActionButtonTextLabel, { color: darkTheme.colors.textMain }]}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.innerRowActionTriggerCTAButtonBox, { backgroundColor: "rgba(255, 59, 48, 0.1)" }]}
          activeOpacity={0.75}
          onPress={() => onDelete(item.id)}
        >
          <Text style={[styles.innerRowActionButtonTextLabel, { color: "#FF3B30" }]}>Delete</Text>
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

const SelectServices = () => {
  const router = useRouter()
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDescription] = useState("");
  const [serviceCategory, setServiceCategory] = useState("General");
  const [serviceType, setServiceType] = useState("Regular");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [selectedIconId, setSelectedIconId] = useState("i1");
  const [addedServices, setAddedServices] = useState(INITIAL_SERVICES);

  const [isTypeFocused, setIsTypeFocused] = useState(false);
  const [isCategoryFocused, setIsCategoryFocused] = useState(false);

  const handleAddService = () => {
    if (!serviceName.trim()) return;
    
    const activeIconObj = STOCK_ICONS.find(i => i.id === selectedIconId);
    const newService = {
      id: String(Date.now()),
      name: serviceName.trim(),
      description: serviceDesc.trim() || "Workspace catalog specification",
      category: serviceCategory,
      type: serviceType,
      price: servicePrice.trim() || "0",
      time: serviceTime.trim() || "0",
      iconUri: activeIconObj ? activeIconObj.uri : STOCK_ICONS[0].uri,
    };

    setAddedServices([...addedServices, newService]);
    setServiceName("");
    setServiceDescription("");
    setServiceCategory("General");
    setServiceType("Regular");
    setServicePrice("");
    setServiceTime("");
  };

  const handleEditInteraction = (item) => {
    setServiceName(item.name);
    setServiceDescription(item.description);
    setServiceCategory(item.category);
    setServiceType(item.type);
    setServicePrice(item.price);
    setServiceTime(item.time);
    
    const matchingIcon = STOCK_ICONS.find(i => i.uri === item.iconUri);
    if (matchingIcon) {
      setSelectedIconId(matchingIcon.id);
    }
    setAddedServices(addedServices.filter(s => s.id !== item.id));
  };

  const updateInlinePrice = (id, text) => {
    setAddedServices(prev => 
      prev.map(item => item.id === id ? { ...item, price: text } : item)
    );
  };

  const updateInlineTime = (id, text) => {
    setAddedServices(prev => 
      prev.map(item => item.id === id ? { ...item, time: text } : item)
    );
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header title="Select Services" subTitle="Configure active service catalog options" showBack={true} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.listScrollContentTrack}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainerDeck}>
            <Text style={styles.premiumFieldLabelMicro}>SERVICE ICON</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.iconScrollerTrackRow}>
              {STOCK_ICONS.map((icon) => {
                const isSelected = selectedIconId === icon.id;
                return (
                  <TouchableOpacity
                    key={icon.id}
                    activeOpacity={0.8}
                    onPress={() => setSelectedIconId(icon.id)}
                    style={[styles.iconThumbnailContainer, isSelected && { borderColor: darkTheme.colors.accent }]}
                  >
                    <Image source={{ uri: icon.uri }} style={styles.thumbnailImageInstance} />
                    {isSelected && (
                      <View style={[styles.selectedIconCheckBadge, { backgroundColor: darkTheme.colors.accent }]}>
                        <Ionicons name="checkmark" size={scale(8)} color="#000000" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>SERVICE NAME</Text>
              <TextInput
                style={[styles.luxuryTextInput, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, color: darkTheme.colors.textMain }]}
                value={serviceName}
                onChangeText={setServiceName}
                placeholder="Enter your service name"
                placeholderTextColor={darkTheme.colors.textMuted}
                selectionColor={darkTheme.colors.accent}
              />
            </View>

            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>SERVICE DESCRIPTION</Text>
              <TextInput
                style={[styles.luxuryTextInput, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, color: darkTheme.colors.textMain }]}
                value={serviceDesc}
                onChangeText={setServiceDescription}
                placeholder="Enter your service description"
                placeholderTextColor={darkTheme.colors.textMuted}
                selectionColor={darkTheme.colors.accent}
              />
            </View>

            {/* Service Category Dropdown */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>SERVICE CATEGORY</Text>
              <Dropdown
                style={[
                  styles.dropdownElementShell,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: isCategoryFocused ? darkTheme.colors.accent : darkTheme.colors.border,
                  },
                ]}
                placeholderStyle={[styles.dropdownPlaceholderText, { color: darkTheme.colors.textMuted }]}
                selectedTextStyle={[styles.dropdownSelectedText, { color: darkTheme.colors.textMain }]}
                containerStyle={[styles.dropdownInnerMenuDeckBox, { backgroundColor: "#0C0C0E", borderColor: darkTheme.colors.border }]}
                itemContainerStyle={styles.dropdownItemRowUnit}
                itemTextStyle={[styles.dropdownItemRowText, { color: darkTheme.colors.textMain }]}
                activeColor="rgba(255, 149, 0, 0.08)"
                data={SERVICE_CATEGORY_OPTIONS}
                maxHeight={160}
                labelField="label"
                valueField="value"
                placeholder="Select category"
                value={serviceCategory}
                onFocus={() => setIsCategoryFocused(true)}
                onBlur={() => setIsCategoryFocused(false)}
                onChange={(item) => {
                  setServiceCategory(item.value);
                  setIsCategoryFocused(false);
                }}
                renderRightIcon={() => (
                  <Ionicons
                    name="chevron-down"
                    size={scale(13)}
                    color={isCategoryFocused ? darkTheme.colors.accent : darkTheme.colors.textMuted}
                  />
                )}
              />
            </View>

            {/* Service Type Dropdown */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>SERVICE TYPE (*VIP SERVICES HAVE TOP PRIORITY IN QUEUE)</Text>
              <Dropdown
                style={[
                  styles.dropdownElementShell,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: isTypeFocused ? darkTheme.colors.accent : darkTheme.colors.border,
                  },
                ]}
                placeholderStyle={[styles.dropdownPlaceholderText, { color: darkTheme.colors.textMuted }]}
                selectedTextStyle={[styles.dropdownSelectedText, { color: darkTheme.colors.textMain }]}
                containerStyle={[styles.dropdownInnerMenuDeckBox, { backgroundColor: "#0C0C0E", borderColor: darkTheme.colors.border }]}
                itemContainerStyle={styles.dropdownItemRowUnit}
                itemTextStyle={[styles.dropdownItemRowText, { color: darkTheme.colors.textMain }]}
                activeColor="rgba(255, 149, 0, 0.08)"
                data={SERVICE_TYPE_OPTIONS}
                maxHeight={160}
                labelField="label"
                valueField="value"
                placeholder="Select type"
                value={serviceType}
                onFocus={() => setIsTypeFocused(true)}
                onBlur={() => setIsTypeFocused(false)}
                onChange={(item) => {
                  setServiceType(item.value);
                  setIsTypeFocused(false);
                }}
                renderRightIcon={() => (
                  <Ionicons
                    name="chevron-down"
                    size={scale(13)}
                    color={isTypeFocused ? darkTheme.colors.accent : darkTheme.colors.textMuted}
                  />
                )}
              />
            </View>

            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>SERVICE PRICE (₹)</Text>
              <TextInput
                style={[styles.luxuryTextInput, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, color: darkTheme.colors.textMain }]}
                value={servicePrice}
                onChangeText={setServicePrice}
                placeholder="Enter your service price"
                placeholderTextColor={darkTheme.colors.textMuted}
                keyboardType="numeric"
                selectionColor={darkTheme.colors.accent}
              />
            </View>

            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>SERVICE ESTIMATED TIME (MINS)</Text>
              <TextInput
                style={[styles.luxuryTextInput, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, color: darkTheme.colors.textMain }]}
                value={serviceTime}
                onChangeText={setServiceTime}
                placeholder="Enter your service estimated time"
                placeholderTextColor={darkTheme.colors.textMuted}
                keyboardType="numeric"
                selectionColor={darkTheme.colors.accent}
              />
            </View>

            <View style={styles.dualFormActionRowTriggerSection}>
              <TouchableOpacity 
                style={[styles.secondaryRowFormActionBtnNode, { backgroundColor: "rgba(255,255,255,0.02)", borderColor: darkTheme.colors.border }]}
                activeOpacity={0.8}
                onPress={handleAddService}
              >
                <Text style={{ color: darkTheme.colors.textMain, fontWeight: "700", fontSize: scale(11.5) }}>Add Service</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.secondaryRowActionBtnNode, { backgroundColor: darkTheme.colors.accent }]}
                activeOpacity={0.8}
                onPress={() => router.push("/gallery")}
              >
                <Text style={{ color: "#000000", fontWeight: "700", fontSize: scale(11.5) }}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Render Active Services Section list sequentially below */}
          {addedServices.map((item) => (
            <ServiceCardItem
              key={item.id}
              item={item}
              onEdit={handleEditInteraction}
              onDelete={(id) => setAddedServices(addedServices.filter(s => s.id !== id))}
              onUpdatePrice={updateInlinePrice}
              onUpdateTime={updateInlineTime}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listScrollContentTrack: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(36),
    paddingTop: verticalScale(8),
  },
  formContainerDeck: {
    width: "100%",
  },
  premiumFieldLabelMicro: {
    fontSize: scale(9.5),
    fontWeight: "800",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 0.5,
    marginBottom: verticalScale(6),
    textTransform: "uppercase",
  },
  iconScrollerTrackRow: {
    gap: scale(10),
    paddingVertical: verticalScale(4),
    marginBottom: verticalScale(14),
  },
  iconThumbnailContainer: {
    width: scale(56),
    height: scale(44),
    borderRadius: scale(6),
    borderWidth: 1.5,
    borderColor: "transparent",
    position: "relative",
    overflow: "hidden",
  },
  thumbnailImageInstance: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  selectedIconCheckBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: scale(14),
    height: scale(14),
    borderBottomLeftRadius: scale(6),
    justifyContent: "center",
    alignItems: "center",
  },
  inputLayoutContainerGroup: {
    width: "100%",
    marginBottom: verticalScale(14),
  },
  luxuryTextInput: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(4),
    borderWidth: 1,
    paddingHorizontal: scale(12),
    fontSize: scale(13),
    fontWeight: "400",
  },
  dualFormActionRowTriggerSection: {
    flexDirection: "row",
    width: "100%",
    gap: scale(12),
    paddingBottom: verticalScale(18),
    marginBottom: verticalScale(14),
  },
  secondaryRowFormActionBtnNode: {
    flex: 1,
    height: scale(36),
    borderRadius: scale(4),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryRowActionBtnNode: {
    flex: 1,
    height: scale(36),
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
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
  dropdownElementShell: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(4),
    borderWidth: 1,
    paddingHorizontal: scale(12),
  },
  dropdownPlaceholderText: {
    fontSize: scale(13),
  },
  dropdownSelectedText: {
    fontSize: scale(13),
  },
  dropdownInnerMenuDeckBox: {
    borderRadius: scale(4),
    borderWidth: 1,
    marginTop: verticalScale(2),
    paddingVertical: verticalScale(4),
  },
  dropdownItemRowUnit: {
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(12),
  },
  dropdownItemRowText: {
    fontSize: scale(13),
  },
});

export default SelectServices;
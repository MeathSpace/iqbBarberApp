import { Ionicons } from "@expo/vector-icons";
import { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import { useRouter } from "expo-router";
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";
import api from "../../../../../utils/api";
import SalonProgressBar from "../../../../../components/Progess/SalonProgessBar";

const SERVICE_TYPE_OPTIONS = [
  { label: "Regular", value: "Regular" },
  { label: "VIP", value: "VIP" },
];

const ServiceCardItem = memo(
  ({ item, onEdit, onDelete, onUpdatePrice, onUpdateTime }) => {
    const isVIP = item.vipService === true || item.serviceType === "VIP";
    const iconUrl = item.serviceIcon?.url || item.serviceIcon || "";
    const description = item.serviceDesc || item.serviceDescription || "";
    const categoryName =
      item.serviceCategoryName || item.serviceCategory || "General";
    const estimatedTime =
      item.serviceEWT !== undefined
        ? String(item.serviceEWT)
        : item.serviceEstimatedTime || "";
    const price =
      item.servicePrice !== undefined
        ? String(item.servicePrice)
        : item.servicePrice || "";

    return (
      <View
        style={[
          styles.salonOuterContainerDeckCard,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: darkTheme.colors.border,
          },
        ]}
      >
        <View style={styles.salonParentHeaderContainerRow}>
          <View style={styles.salonHeaderLeftBlockGroup}>
            <View
              style={[
                styles.brandLogoCircleContainer,
                { borderColor: "rgba(255,255,255,0.04)" },
              ]}
            >
              {iconUrl ? (
                <Image
                  source={{ uri: iconUrl }}
                  style={styles.cardHeaderEmbeddedAvatar}
                />
              ) : (
                <View
                  style={[
                    styles.cardHeaderEmbeddedAvatar,
                    { backgroundColor: "rgba(255,255,255,0.1)" },
                  ]}
                />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.cardHeaderTitleBadgeRow}>
                <Text style={styles.salonNameHeadingTextContentNode}>
                  {item.serviceName}
                </Text>
                {isVIP && (
                  <View style={styles.vipPillBadgeContainer}>
                    <View style={styles.vipPulseDotIndicator} />
                    <Text style={styles.vipBadgeLabelText}>VIP</Text>
                  </View>
                )}
              </View>
              {description ? (
                <Text style={styles.salonSubTagTextLabelDescription}>
                  {description}
                </Text>
              ) : null}
              <Text style={styles.innerRowTypeLabelText}>
                {categoryName} • {isVIP ? "VIP" : "Regular"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardActionsHeaderTrackRow}>
          <TouchableOpacity
            style={[
              styles.innerRowActionTriggerCTAButtonBox,
              {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.08)",
              },
            ]}
            activeOpacity={0.75}
            onPress={() => onEdit(item)}
          >
            <Text
              style={[
                styles.innerRowActionButtonTextLabel,
                { color: darkTheme.colors.textMain },
              ]}
            >
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.innerRowActionTriggerCTAButtonBox,
              { backgroundColor: "rgba(255, 59, 48, 0.1)" },
            ]}
            activeOpacity={0.75}
            onPress={() => onDelete(item._id || item.serviceId || item.id)}
          >
            <Text
              style={[
                styles.innerRowActionButtonTextLabel,
                { color: "#FF3B30" },
              ]}
            >
              Delete
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
                value={price}
                onChangeText={(text) => {
                  const cleanedText = text.replace(/[^0-9]/g, "");
                  onUpdatePrice(
                    item._id || item.serviceId || item.id,
                    cleanedText,
                  );
                }}
                keyboardType="numeric"
                selectionColor={darkTheme.colors.accent}
              />
            </View>
          </View>

          <View
            style={[
              styles.innerItemLabelsStackColumn,
              { alignItems: "flex-end" },
            ]}
          >
            <Text
              style={[
                styles.innerItemNameHeadingTextText,
                { marginRight: scale(4) },
              ]}
            >
              Estimated Time (mins)
            </Text>
            <View style={styles.inlineInputFieldWrapper}>
              <TextInput
                style={[
                  styles.inlineEditableTextInputInstance,
                  { textAlign: "right", paddingRight: scale(4) },
                ]}
                value={estimatedTime}
                onChangeText={(text) => {
                  const cleanedText = text.replace(/[^0-9]/g, "");
                  onUpdateTime(
                    item._id || item.serviceId || item.id,
                    cleanedText,
                  );
                }}
                keyboardType="numeric"
                selectionColor={darkTheme.colors.accent}
              />
            </View>
          </View>
        </View>
      </View>
    );
  },
);

const SelectServices = () => {
  const router = useRouter();

  const { serviceForm, setServiceForm, servicesList, setServicesList } =
    useAdminGlobal();
  const { authenticatedUser } = useAdminAuth();

  const [categoriesList, setCategoriesList] = useState([]);
  const [iconsList, setIconsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isTypeFocused, setIsTypeFocused] = useState(false);
  const [isCategoryFocused, setIsCategoryFocused] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    // Set default value for serviceType if not set
    if (!serviceForm.serviceType) {
      setServiceForm((prev) => ({ ...prev, serviceType: "Regular" }));
    }

    const fetchCatalogData = async () => {
      setLoading(true);
      try {
        const [categoriesRes, iconsRes] = await Promise.all([
          api.get("/salon/getAllCategories"),
          api.get("/icons/getAllIcons"),
        ]);

        if (categoriesRes?.data?.success) {
          setCategoriesList(categoriesRes.data.response || []);
        }

        if (iconsRes?.data?.success) {
          setIconsList(iconsRes.data.response || []);
        }
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogData();
  }, []);

  const updateFormField = (key, value) => {
    setFieldErrors((prev) => ({ ...prev, [key]: null }));
    setServiceForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!serviceForm.serviceIcon?.trim()) {
      errors.serviceIcon = "Please select a service icon";
      isValid = false;
    }
    if (!serviceForm.serviceName?.trim()) {
      errors.serviceName = "Service name is required";
      isValid = false;
    }
    if (!serviceForm.serviceDescription?.trim()) {
      errors.serviceDescription = "Service description is required";
      isValid = false;
    }

    if (!serviceForm.serviceCategory?.trim()) {
      errors.serviceCategory = "Service category is required";
      isValid = false;
    }
    if (!serviceForm.servicePrice || Number(serviceForm.servicePrice) <= 0) {
      errors.servicePrice = "Valid service price is required";
      isValid = false;
    }
    if (
      !serviceForm.serviceEstimatedTime ||
      Number(serviceForm.serviceEstimatedTime) <= 0
    ) {
      errors.serviceEstimatedTime = "Valid estimated time is required";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleAddService = () => {
    if (!validateForm()) return;

    const isVipSelected = serviceForm.serviceType === "VIP";

    const newService = {
      _id: String(Date.now()),
      serviceId: Date.now(),
      serviceIcon: serviceForm.serviceIcon,
      serviceName: serviceForm.serviceName.trim(),
      serviceDesc: serviceForm.serviceDescription?.trim() || "",
      serviceDescription: serviceForm.serviceDescription?.trim() || "",
      serviceCategoryName: serviceForm.serviceCategory || "General",
      serviceCategory: serviceForm.serviceCategory || "General",
      serviceType: serviceForm.serviceType || "Regular",
      vipService: isVipSelected,
      servicePrice: Number(serviceForm.servicePrice) || 0,
      serviceEWT: Number(serviceForm.serviceEstimatedTime) || 0,
      serviceEstimatedTime: String(serviceForm.serviceEstimatedTime),
      isDeleted: false,
    };

    setServicesList((prev) => ({
      ...prev,
      data: [...(prev.data || []), newService],
    }));

    setServiceForm({
      serviceIcon: "",
      serviceName: "",
      serviceDescription: "",
      serviceCategory: "",
      serviceType: "Regular",
      servicePrice: "",
      serviceEstimatedTime: "",
    });
    setFieldErrors({});
  };

  const handleEditInteraction = (item) => {
    setServiceForm({
      serviceIcon: item.serviceIcon?.url || item.serviceIcon || "",
      serviceName: item.serviceName || "",
      serviceDescription: item.serviceDesc || item.serviceDescription || "",
      serviceCategory: item.serviceCategoryName || item.serviceCategory || "",
      serviceType:
        item.vipService || item.serviceType === "VIP" ? "VIP" : "Regular",
      servicePrice: String(item.servicePrice ?? ""),
      serviceEstimatedTime: String(
        item.serviceEWT ?? item.serviceEstimatedTime ?? "",
      ),
    });

    const targetId = item._id || item.serviceId || item.id;
    setServicesList((prev) => ({
      ...prev,
      data: (prev.data || []).filter(
        (s) => (s._id || s.serviceId || s.id) !== targetId,
      ),
    }));
  };

  const updateInlinePrice = (id, text) => {
    setServicesList((prev) => ({
      ...prev,
      data: (prev.data || []).map((item) => {
        const itemId = item._id || item.serviceId || item.id;
        if (itemId === id) {
          return { ...item, servicePrice: text };
        }
        return item;
      }),
    }));
  };

  const updateInlineTime = (id, text) => {
    setServicesList((prev) => ({
      ...prev,
      data: (prev.data || []).map((item) => {
        const itemId = item._id || item.serviceId || item.id;
        if (itemId === id) {
          return { ...item, serviceEWT: text, serviceEstimatedTime: text };
        }
        return item;
      }),
    }));
  };

  const handleDeleteService = (id) => {
    setServicesList((prev) => ({
      ...prev,
      data: (prev.data || []).filter(
        (s) => (s._id || s.serviceId || s.id) !== id,
      ),
    }));
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
        title="Select Services"
        subTitle="Configure active service catalog options"
        showBack={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.listScrollContentTrack}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <SalonProgressBar currentStep={3} totalSteps={5} />

          <View style={styles.formContainerDeck}>
            {/* SERVICE ICON SELECTION */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>SERVICE ICON *</Text>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={darkTheme.colors.accent}
                  style={{ marginVertical: verticalScale(10) }}
                />
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.iconScrollerTrackRow}
                >
                  {(iconsList || []).map((iconObj) => {
                    const iconUri = iconObj.url;
                    const isSelected = serviceForm.serviceIcon === iconUri;
                    return (
                      <TouchableOpacity
                        key={iconObj._id || iconObj.public_id}
                        activeOpacity={0.8}
                        onPress={() => updateFormField("serviceIcon", iconUri)}
                        style={[
                          styles.iconThumbnailContainer,
                          isSelected && {
                            borderColor: darkTheme.colors.accent,
                          },
                          fieldErrors.serviceIcon && {
                            borderColor: "#FF3B30",
                          },
                        ]}
                      >
                        <Image
                          source={{ uri: iconUri }}
                          style={styles.thumbnailImageInstance}
                        />
                        {isSelected && (
                          <View
                            style={[
                              styles.selectedIconCheckBadge,
                              { backgroundColor: darkTheme.colors.accent },
                            ]}
                          >
                            <Ionicons
                              name="checkmark"
                              size={scale(8)}
                              color="#000000"
                            />
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
              {fieldErrors.serviceIcon ? (
                <Text style={styles.fieldErrorText}>
                  {fieldErrors.serviceIcon}
                </Text>
              ) : null}
            </View>

            {/* SERVICE NAME */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>SERVICE NAME *</Text>
              <TextInput
                style={[
                  styles.luxuryTextInput,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: fieldErrors.serviceName
                      ? "#FF3B30"
                      : darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                value={serviceForm.serviceName}
                onChangeText={(text) => updateFormField("serviceName", text)}
                placeholder="Enter your service name"
                placeholderTextColor={darkTheme.colors.textMuted}
                selectionColor={darkTheme.colors.accent}
              />
              {fieldErrors.serviceName ? (
                <Text style={styles.fieldErrorText}>
                  {fieldErrors.serviceName}
                </Text>
              ) : null}
            </View>

            {/* SERVICE DESCRIPTION */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                SERVICE DESCRIPTION
              </Text>
              <TextInput
                style={[
                  styles.luxuryTextInput,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: fieldErrors.serviceDescription
                      ? "#FF3B30"
                      : darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                value={serviceForm.serviceDescription}
                onChangeText={(text) =>
                  updateFormField("serviceDescription", text)
                }
                placeholder="Enter your service description"
                placeholderTextColor={darkTheme.colors.textMuted}
                selectionColor={darkTheme.colors.accent}
              />
              {fieldErrors.serviceDescription ? (
                <Text style={styles.fieldErrorText}>
                  {fieldErrors.serviceDescription}
                </Text>
              ) : null}
            </View>

            {/* SERVICE CATEGORY DROPDOWN */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                SERVICE CATEGORY *
              </Text>
              <Dropdown
                style={[
                  styles.dropdownElementShell,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: fieldErrors.serviceCategory
                      ? "#FF3B30"
                      : isCategoryFocused
                        ? darkTheme.colors.accent
                        : darkTheme.colors.border,
                  },
                ]}
                placeholderStyle={[
                  styles.dropdownPlaceholderText,
                  { color: darkTheme.colors.textMuted },
                ]}
                selectedTextStyle={[
                  styles.dropdownSelectedText,
                  { color: darkTheme.colors.textMain },
                ]}
                containerStyle={[
                  styles.dropdownInnerMenuDeckBox,
                  {
                    backgroundColor: "#0C0C0E",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
                itemContainerStyle={styles.dropdownItemRowUnit}
                itemTextStyle={[
                  styles.dropdownItemRowText,
                  { color: darkTheme.colors.textMain },
                ]}
                activeColor="rgba(255, 149, 0, 0.08)"
                data={categoriesList || []}
                maxHeight={160}
                labelField="serviceCategoryName"
                valueField="serviceCategoryName"
                placeholder="Select category"
                value={serviceForm.serviceCategory}
                onFocus={() => setIsCategoryFocused(true)}
                onBlur={() => setIsCategoryFocused(false)}
                onChange={(item) => {
                  updateFormField("serviceCategory", item.serviceCategoryName);
                  setIsCategoryFocused(false);
                }}
                renderRightIcon={() => (
                  <Ionicons
                    name="chevron-down"
                    size={scale(13)}
                    color={
                      isCategoryFocused
                        ? darkTheme.colors.accent
                        : darkTheme.colors.textMuted
                    }
                  />
                )}
              />
              {fieldErrors.serviceCategory ? (
                <Text style={styles.fieldErrorText}>
                  {fieldErrors.serviceCategory}
                </Text>
              ) : null}
            </View>

            {/* SERVICE TYPE DROPDOWN */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                SERVICE TYPE (*VIP SERVICES HAVE TOP PRIORITY IN QUEUE)
              </Text>
              <Dropdown
                style={[
                  styles.dropdownElementShell,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: isTypeFocused
                      ? darkTheme.colors.accent
                      : darkTheme.colors.border,
                  },
                ]}
                placeholderStyle={[
                  styles.dropdownPlaceholderText,
                  { color: darkTheme.colors.textMuted },
                ]}
                selectedTextStyle={[
                  styles.dropdownSelectedText,
                  { color: darkTheme.colors.textMain },
                ]}
                containerStyle={[
                  styles.dropdownInnerMenuDeckBox,
                  {
                    backgroundColor: "#0C0C0E",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
                itemContainerStyle={styles.dropdownItemRowUnit}
                itemTextStyle={[
                  styles.dropdownItemRowText,
                  { color: darkTheme.colors.textMain },
                ]}
                activeColor="rgba(255, 149, 0, 0.08)"
                data={SERVICE_TYPE_OPTIONS}
                maxHeight={160}
                labelField="label"
                valueField="value"
                placeholder="Select type"
                value={serviceForm.serviceType || "Regular"}
                onFocus={() => setIsTypeFocused(true)}
                onBlur={() => setIsTypeFocused(false)}
                onChange={(item) => {
                  updateFormField("serviceType", item.value);
                  setIsTypeFocused(false);
                }}
                renderRightIcon={() => (
                  <Ionicons
                    name="chevron-down"
                    size={scale(13)}
                    color={
                      isTypeFocused
                        ? darkTheme.colors.accent
                        : darkTheme.colors.textMuted
                    }
                  />
                )}
              />
            </View>

            {/* PRICE INPUT */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                SERVICE PRICE (₹) *
              </Text>
              <TextInput
                style={[
                  styles.luxuryTextInput,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: fieldErrors.servicePrice
                      ? "#FF3B30"
                      : darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                value={serviceForm.servicePrice}
                onChangeText={(text) => {
                  const cleanedText = text.replace(/[^0-9]/g, "");
                  updateFormField("servicePrice", cleanedText);
                }}
                placeholder="Enter service price"
                placeholderTextColor={darkTheme.colors.textMuted}
                keyboardType="numeric"
                selectionColor={darkTheme.colors.accent}
              />
              {fieldErrors.servicePrice ? (
                <Text style={styles.fieldErrorText}>
                  {fieldErrors.servicePrice}
                </Text>
              ) : null}
            </View>

            {/* ESTIMATED TIME INPUT */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                SERVICE ESTIMATED TIME (MINS) *
              </Text>
              <TextInput
                style={[
                  styles.luxuryTextInput,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: fieldErrors.serviceEstimatedTime
                      ? "#FF3B30"
                      : darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                value={serviceForm.serviceEstimatedTime}
                onChangeText={(text) => {
                  const cleanedText = text.replace(/[^0-9]/g, "");
                  updateFormField("serviceEstimatedTime", cleanedText);
                }}
                placeholder="Enter estimated duration in minutes"
                placeholderTextColor={darkTheme.colors.textMuted}
                keyboardType="numeric"
                selectionColor={darkTheme.colors.accent}
              />
              {fieldErrors.serviceEstimatedTime ? (
                <Text style={styles.fieldErrorText}>
                  {fieldErrors.serviceEstimatedTime}
                </Text>
              ) : null}
            </View>

            <View style={styles.dualFormActionRowTriggerSection}>
              <TouchableOpacity
                style={[
                  styles.secondaryRowFormActionBtnNode,
                  {
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
                activeOpacity={0.8}
                onPress={handleAddService}
              >
                <Text
                  style={{
                    color: darkTheme.colors.textMain,
                    fontWeight: "700",
                    fontSize: scale(11.5),
                  }}
                >
                  Add Service
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.secondaryRowActionBtnNode,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  if (servicesList?.data?.length === 0) {
                    Alert.alert(
                      "Services Required",
                      "Please add at least one service before continuing.",
                    );
                    return;
                  }

                  router.push("/gallery");
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontWeight: "700",
                    fontSize: scale(11.5),
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* RENDER SALON SERVICES CARDS */}
          {(servicesList?.data || []).map((item) => (
            <ServiceCardItem
              key={item._id || item.serviceId || item.id}
              item={item}
              onEdit={handleEditInteraction}
              onDelete={handleDeleteService}
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
  fieldErrorText: {
    color: "#FF3B30",
    fontSize: scale(10),
    fontWeight: "600",
    marginTop: verticalScale(4),
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

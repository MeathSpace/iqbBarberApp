import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Shimmer from "react-native-modern-shimmer";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../../components/Header/Header";
import SalonProgressBar from "../../../../../components/Progess/SalonProgessBar";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";

// Allowed extensions for salon images
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

// Custom Dark Palette Tokens for Shimmer
const SKELETON_THEME = {
  header: { baseColor: "#221f1c", highlightColor: "#332e2a" },
  button: { baseColor: "#2a2a2a", highlightColor: "#333333" },
  card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
  line: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
};

// Skeleton Loader Component
const ScreenSkeletonView = () => (
  <ScrollView
    contentContainerStyle={styles.scrollContentTrack}
    showsVerticalScrollIndicator={false}
  >
    {/* Salon Logo Section Skeleton */}
    <View
      style={[
        styles.uploadSectionRowUnit,
        {
          backgroundColor: SKELETON_THEME.card.baseColor,
          borderColor: "transparent",
        },
      ]}
    >
      <View style={styles.uploadRowLeftTextGroup}>
        <Shimmer
          width={scale(160)}
          height={verticalScale(14)}
          borderRadius={scale(4)}
          baseColor={SKELETON_THEME.line.baseColor}
          highlightColor={SKELETON_THEME.line.highlightColor}
        />
        <Shimmer
          width={scale(84)}
          height={verticalScale(26)}
          borderRadius={scale(4)}
          baseColor={SKELETON_THEME.button.baseColor}
          highlightColor={SKELETON_THEME.button.highlightColor}
          style={{ marginTop: verticalScale(14) }}
        />
      </View>

      <Shimmer
        width={scale(60)}
        height={scale(60)}
        borderRadius={scale(4)}
        baseColor={SKELETON_THEME.line.baseColor}
        highlightColor={SKELETON_THEME.line.highlightColor}
      />
    </View>

    {/* Showcase Gallery Banner Skeleton */}
    <View
      style={[
        styles.uploadSectionRowUnit,
        {
          backgroundColor: SKELETON_THEME.card.baseColor,
          borderColor: "transparent",
          marginTop: verticalScale(14),
        },
      ]}
    >
      <View style={styles.uploadRowLeftTextGroup}>
        <Shimmer
          width={scale(220)}
          height={verticalScale(14)}
          borderRadius={scale(4)}
          baseColor={SKELETON_THEME.line.baseColor}
          highlightColor={SKELETON_THEME.line.highlightColor}
        />
        <Shimmer
          width={scale(84)}
          height={verticalScale(26)}
          borderRadius={scale(4)}
          baseColor={SKELETON_THEME.button.baseColor}
          highlightColor={SKELETON_THEME.button.highlightColor}
          style={{ marginTop: verticalScale(14) }}
        />
      </View>
    </View>

    {/* Showcase Gallery Grid Deck Skeleton */}
    <View style={styles.galleryShowcasePreviewVerticalDeckGrid}>
      {[1, 2].map((key) => (
        <View
          key={key}
          style={[
            styles.galleryShowcaseImageCardFrame,
            {
              backgroundColor: SKELETON_THEME.card.baseColor,
              borderColor: "transparent",
            },
          ]}
        >
          <Shimmer
            width="100%"
            height={verticalScale(154)}
            borderRadius={scale(4)}
            baseColor={SKELETON_THEME.line.baseColor}
            highlightColor={SKELETON_THEME.line.highlightColor}
          />
          <View style={styles.cardActionsHeaderTrackRow}>
            <Shimmer
              style={{ flex: 1 }}
              height={verticalScale(26)}
              borderRadius={scale(4)}
              baseColor={SKELETON_THEME.button.baseColor}
              highlightColor={SKELETON_THEME.button.highlightColor}
            />
            <Shimmer
              style={{ flex: 1 }}
              height={verticalScale(26)}
              borderRadius={scale(4)}
              baseColor={SKELETON_THEME.button.baseColor}
              highlightColor={SKELETON_THEME.button.highlightColor}
            />
          </View>
        </View>
      ))}
    </View>

    {/* Bottom Master Button Skeleton */}
    <Shimmer
      width="100%"
      height={scale(38)}
      borderRadius={scale(4)}
      baseColor={SKELETON_THEME.button.baseColor}
      highlightColor={SKELETON_THEME.button.highlightColor}
      style={{ marginTop: verticalScale(24) }}
    />
  </ScrollView>
);

const Gallery = () => {
  const router = useRouter();
  const { salonImages, setSalonImages } = useAdminGlobal();
  const [isScreenLoading] = useState(false);

  // Helper to validate file extensions
  const isValidImageExtension = (uri) => {
    if (!uri) return false;
    const cleanUri = uri.split("?")[0]; // handle any query parameters
    const extension = cleanUri.split(".").pop()?.toLowerCase();
    return ALLOWED_EXTENSIONS.includes(extension);
  };

  // Centralized image picker helper with extension validation
  const requestAndPickImage = async (options = {}) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Please grant photo library access in your device settings to select media.",
      );
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.IMAGES,
      quality: 0.8,
      ...options,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    // Filter assets by valid image extension
    const validAssets = result.assets.filter((asset) =>
      isValidImageExtension(asset.uri),
    );

    if (validAssets.length < result.assets.length) {
      Alert.alert(
        "Invalid File Type",
        `Only ${ALLOWED_EXTENSIONS.join(", ").toUpperCase()} formats are supported. Unsupported files were excluded.`,
      );
    }

    if (validAssets.length === 0) return null;

    return validAssets;
  };

  // 1. Pick/Upload Salon Logo
  const pickSalonLogoAsset = async () => {
    const assets = await requestAndPickImage({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (assets && assets[0]?.uri) {
      const selectedUri = assets[0].uri;
      setSalonImages((prev) => ({
        ...prev,
        salonLogo: selectedUri,
      }));
    }
  };

  // 2. Add New Showcase Gallery Asset(s)
  const pickShowcaseGalleryAsset = async () => {
    const assets = await requestAndPickImage({
      allowsEditing: false,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 0.8,
    });

    if (!assets || assets.length === 0) return;

    const newPickedItems = assets.map((asset) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      uri: asset.uri,
    }));

    setSalonImages((prev) => ({
      ...prev,
      salonGallery: [...(prev?.salonGallery || []), ...newPickedItems],
    }));
  };

  // 3. Edit / Reselect Individual Gallery Image
  const handleUpdateGalleryImage = async (targetImage) => {
    const assets = await requestAndPickImage({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!assets || !assets[0]?.uri) return;

    const newUri = assets[0].uri;

    setSalonImages((prev) => ({
      ...prev,
      salonGallery: (prev?.salonGallery || []).map((img) =>
        img.id === targetImage.id ? { ...img, uri: newUri } : img,
      ),
    }));
  };

  // 4. Remove Individual Gallery Image
  const handleRemoveGalleryImage = (targetImage) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to remove this image from the gallery?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setSalonImages((prev) => ({
              ...prev,
              salonGallery: (prev?.salonGallery || []).filter(
                (img) => img.id !== targetImage.id,
              ),
            }));
          },
        },
      ],
    );
  };

  const galleryList = salonImages?.salonGallery || [];

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header
        title="Gallery"
        subTitle="Configure active salon display assets"
        showBack={true}
      />

      {isScreenLoading ? (
        <ScreenSkeletonView />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContentTrack}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <SalonProgressBar currentStep={4} totalSteps={5} />
          <View style={styles.internalFormFieldsEnclosure}>
            {/* Salon Logo Section */}
            <View
              style={[
                styles.uploadSectionRowUnit,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                },
              ]}
            >
              <View style={styles.uploadRowLeftTextGroup}>
                <Text style={styles.uploadRowMainLabel}>
                  Upload your salon's logo
                </Text>
                <TouchableOpacity
                  style={styles.premiumActionUploadBtn}
                  activeOpacity={0.75}
                  onPress={pickSalonLogoAsset}
                >
                  <Text
                    style={[
                      styles.premiumActionUploadBtnText,
                      { color: darkTheme.colors.textMain },
                    ]}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.squareLogoPreviewContainerBox,
                  { borderColor: "rgba(255,255,255,0.05)" },
                ]}
              >
                {salonImages?.salonLogo ? (
                  <Image
                    source={{ uri: salonImages.salonLogo }}
                    style={styles.embeddedPreviewImageInstance}
                  />
                ) : (
                  <View style={styles.iconPlaceholderBox} />
                )}
              </View>
            </View>

            {/* Showcase Gallery Section */}
            <View
              style={[
                styles.uploadSectionRowUnit,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  marginTop: verticalScale(14),
                },
              ]}
            >
              <View style={styles.uploadRowLeftTextGroup}>
                <Text style={styles.uploadRowMainLabel}>
                  Select high-quality images to showcase your salon.
                </Text>
                <TouchableOpacity
                  style={styles.premiumActionUploadBtn}
                  activeOpacity={0.75}
                  onPress={pickShowcaseGalleryAsset}
                >
                  <Text
                    style={[
                      styles.premiumActionUploadBtnText,
                      { color: darkTheme.colors.textMain },
                    ]}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>

              {galleryList.length === 0 && (
                <View
                  style={[
                    styles.squareLogoPreviewContainerBox,
                    { borderColor: "rgba(255,255,255,0.05)" },
                  ]}
                />
              )}
            </View>

            {/* Gallery Deck */}
            {galleryList.length > 0 && (
              <View style={styles.galleryShowcasePreviewVerticalDeckGrid}>
                {galleryList.map((image) => (
                  <View
                    key={image.id}
                    style={[
                      styles.galleryShowcaseImageCardFrame,
                      {
                        backgroundColor: darkTheme.colors.card,
                        borderColor: darkTheme.colors.border,
                      },
                    ]}
                  >
                    <View style={{ position: "relative" }}>
                      <Image
                        source={{ uri: image.uri }}
                        style={styles.galleryPreviewImageInstance}
                      />
                    </View>

                    <View style={styles.cardActionsHeaderTrackRow}>
                      <TouchableOpacity
                        style={styles.innerRowActionTriggerCTAButtonBox}
                        activeOpacity={0.75}
                        onPress={() => handleUpdateGalleryImage(image)}
                      >
                        <Text
                          style={[
                            styles.innerRowActionButtonTextLabel,
                            { color: darkTheme.colors.textMain },
                          ]}
                        >
                          Edit Image
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.innerRowActionTriggerCTAButtonBox,
                          styles.deleteActionBtn,
                        ]}
                        activeOpacity={0.75}
                        onPress={() => handleRemoveGalleryImage(image)}
                      >
                        <Text
                          style={[
                            styles.innerRowActionButtonTextLabel,
                            { color: "#FF3B30" },
                          ]}
                        >
                          Delete Image
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Continue Action */}
            <TouchableOpacity
              style={[
                styles.masterSubmitActionBtnNode,
                { backgroundColor: darkTheme.colors.accent },
              ]}
              activeOpacity={0.85}
              onPress={() => router.push("/socialLinks")}
            >
              <Text style={styles.masterSubmitActionBtnText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentTrack: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
    paddingTop: verticalScale(8),
  },
  internalFormFieldsEnclosure: {
    width: "100%",
  },
  uploadSectionRowUnit: {
    width: "100%",
    borderWidth: 1,
    borderRadius: scale(6),
    padding: scale(14),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  uploadRowLeftTextGroup: {
    flex: 1,
    paddingRight: scale(14),
  },
  uploadRowMainLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: scale(13),
    fontWeight: "500",
    lineHeight: scale(18),
  },
  premiumActionUploadBtn: {
    width: scale(84),
    height: verticalScale(26),
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(14),
    backgroundColor: "#1C1C1E",
    borderColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
  },
  premiumActionUploadBtnText: {
    fontSize: scale(11.5),
    fontWeight: "700",
  },
  squareLogoPreviewContainerBox: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(4),
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.01)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  embeddedPreviewImageInstance: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconPlaceholderBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  galleryShowcasePreviewVerticalDeckGrid: {
    width: "100%",
    marginTop: verticalScale(14),
    gap: verticalScale(12),
  },
  galleryShowcaseImageCardFrame: {
    width: "100%",
    borderRadius: scale(6),
    borderWidth: 1,
    overflow: "hidden",
    padding: scale(10),
  },
  galleryPreviewImageInstance: {
    width: "100%",
    height: verticalScale(154),
    borderRadius: scale(4),
    resizeMode: "cover",
  },
  cardActionsHeaderTrackRow: {
    flexDirection: "row",
    gap: scale(10),
    marginTop: verticalScale(10),
  },
  innerRowActionTriggerCTAButtonBox: {
    flex: 1,
    height: verticalScale(26),
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  deleteActionBtn: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    borderColor: "transparent",
  },
  innerRowActionButtonTextLabel: {
    fontSize: scale(11.5),
    fontWeight: "700",
  },
  masterSubmitActionBtnNode: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(24),
  },
  masterSubmitActionBtnText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: scale(12),
  },
});

export default Gallery;

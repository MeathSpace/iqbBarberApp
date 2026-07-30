import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
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
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";
import api from "../../../../../utils/api";

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

const SKELETON_THEME = {
  header: { baseColor: "#221f1c", highlightColor: "#332e2a" },
  button: { baseColor: "#2a2a2a", highlightColor: "#333333" },
  card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
  line: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
};

const ScreenSkeletonView = () => (
  <ScrollView
    contentContainerStyle={styles.scrollContentTrack}
    showsVerticalScrollIndicator={false}
  >
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
  const { editSalonImages, setEditSalonImages } = useAdminGlobal();
  const { authenticatedUser } = useAdminAuth();

  const [isScreenLoading] = useState(false);
  const [activeEditingId, setActiveEditingId] = useState(null);

  // Helper to extract image URI (handles both server response and local uri)
  const getImageUri = (item) => {
    if (!item) return null;
    if (typeof item === "string") return item;
    if (Array.isArray(item)) return item[0]?.url || item[0]?.uri || null;
    return item.url || item.uri || null;
  };

  // Helper to extract item ID for gallery items
  const getItemId = (item) => {
    if (!item) return null;
    return item.id || item._id || item.public_id || item.uri || item.url;
  };

  // Helper to validate file extensions
  const isValidImageExtension = (uri) => {
    if (!uri) return false;
    const cleanUri = uri.split("?")[0];
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

  const [logoUploading, setLogoUploading] = useState(false);

  const pickSalonLogoAsset = async () => {
    try {
      const assets = await requestAndPickImage({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!assets || !assets.length || !assets[0]?.uri) {
        return;
      }

      setLogoUploading(true);

      const selectedAsset = assets[0];
      const uri = selectedAsset.uri;

      const extension = uri.split(".").pop() || "jpg";
      const mimeType = selectedAsset.mimeType || `image/${extension}`;

      const formData = new FormData();
      formData.append("salonId", String(authenticatedUser?.salonId));
      formData.append("salonLogo", {
        uri,
        name: `salon_logo.${extension}`,
        type: mimeType,
      });

      const { data } = await api.post("/salon/uploadSalonLogo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEditSalonImages((prev) => {
        return {
          ...prev,
          salonLogo: data?.response?.salonLogo,
        };
      });

      if (data?.success) {
        Alert.alert(
          "Success",
          data?.message || "Salon logo uploaded successfully.",
        );
      } else {
        Alert.alert(
          "Upload Failed",
          data?.message || "Unable to upload salon logo.",
        );
      }
    } catch (error) {
      console.log("Salon Logo Upload Error:", error);

      Alert.alert(
        "Upload Failed",
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while uploading the salon logo.",
      );
    } finally {
      setLogoUploading(false);
    }
  };

  // 2. Add New Showcase Gallery Asset(s)
  const [uploadSalonImageLoader, setUploadSalonImageLoader] = useState(false);

  const pickShowcaseGalleryAsset = async () => {
    try {
      const assets = await requestAndPickImage({
        allowsEditing: false,
        allowsMultipleSelection: true,
        selectionLimit: 10,
        quality: 0.8,
      });

      if (!assets || assets.length === 0) {
        return;
      }

      setUploadSalonImageLoader(true);

      const formData = new FormData();
      formData.append("salonId", String(authenticatedUser?.salonId));

      assets.forEach((asset, index) => {
        const extension = asset.uri.split(".").pop() || "jpg";

        formData.append("gallery", {
          uri: asset.uri,
          name: asset.fileName || `gallery_${index}.${extension}`,
          type: asset.mimeType || `image/${extension}`,
        });
      });

      const { data } = await api.post("/salon/uploadSalonImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEditSalonImages((prev) => {
        return {
          ...prev,
          salonGallery: [...prev.salonGallery, ...data?.response],
        };
      });

      if (data?.success) {
        Alert.alert(
          "Success",
          data?.message || "Salon images uploaded successfully.",
        );
      } else {
        Alert.alert(
          "Upload Failed",
          data?.message || "Unable to upload salon images.",
        );
      }
    } catch (error) {
      console.log("Gallery Upload Error:", error?.response?.data);

      Alert.alert(
        "Upload Failed",
        error?.response?.data?.message ||
          "Something went wrong while uploading salon images.",
      );
    } finally {
      setUploadSalonImageLoader(false);
    }
  };

  const [handleEditSalonLoader, setHandleEditSalonLoader] = useState(false);

  // 3. Edit / Reselect Individual Gallery Image
  const handleUpdateGalleryImage = async (imgObj) => {
    try {
      const assets = await requestAndPickImage({
        allowsEditing: false,
        quality: 0.8,
      });

      if (!assets || !assets.length || !assets[0]?.uri) return;

      const selectedAsset = assets[0];

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const mimeType =
        selectedAsset.mimeType ||
        `image/${selectedAsset.uri.split(".").pop() || "jpeg"}`;

      if (!allowedTypes.includes(mimeType)) {
        Alert.alert(
          "Invalid File",
          "Please upload only JPEG, PNG or WebP images.",
        );
        return;
      }

      // Validate file size (2 MB)
      const maxSizeInBytes = 2 * 1024 * 1024;

      if (selectedAsset.fileSize && selectedAsset.fileSize > maxSizeInBytes) {
        Alert.alert("Invalid File", "File size must be lower than 2 MB.");
        return;
      }

      setActiveEditingId(imgObj?._id);
      setHandleEditSalonLoader(true);

      const extension = selectedAsset.uri.split(".").pop() || "jpg";

      const formData = new FormData();
      formData.append("public_imgid", imgObj?.public_id);
      formData.append("id", imgObj?._id);
      formData.append("salonId", String(authenticatedUser?.salonId));

      formData.append("gallery", {
        uri: selectedAsset.uri,
        name: selectedAsset.fileName || `gallery.${extension}`,
        type: mimeType,
      });

      const { data } = await api.put("/salon/updateSalonImages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        setEditSalonImages((prev) => ({
          ...prev,
          salonGallery: (prev?.salonGallery || []).map((image) =>
            image._id === data?.response?._id
              ? {
                  ...image,
                  ...data.response,
                }
              : image,
          ),
        }));

        Alert.alert("Success", data?.message || "Image updated successfully.");
      } else {
        Alert.alert(
          "Update Failed",
          data?.message || "Unable to update image.",
        );
      }
    } catch (error) {
      console.log("Update Gallery Image Error:", error);

      Alert.alert(
        "Update Failed",
        error?.response?.data?.message ||
          "Something went wrong while updating the image.",
      );
    } finally {
      setHandleEditSalonLoader(false);
      setActiveEditingId(null);
    }
  };

  const handleRemoveGalleryImage = (imgObj) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to remove this image from the gallery?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const { data } = await api.delete("/salon/deleteSalonImages", {
                data: {
                  public_id: imgObj?.public_id,
                  img_id: imgObj?._id,
                },
              });

              if (data?.success) {
                setEditSalonImages((prev) => ({
                  ...prev,
                  salonGallery: (prev?.salonGallery || []).filter(
                    (img) => img?._id !== imgObj?._id,
                  ),
                }));

                Alert.alert(
                  "Success",
                  data?.message || "Image deleted successfully.",
                );
              } else {
                Alert.alert(
                  "Delete Failed",
                  data?.message || "Unable to delete image.",
                );
              }
            } catch (error) {
              console.log("Delete Gallery Image Error:", error);

              Alert.alert(
                "Delete Failed",
                error?.response?.data?.message ||
                  "Something went wrong while deleting the image.",
              );
            }
          },
        },
      ],
    );
  };

  const galleryList = editSalonImages?.salonGallery || [];
  const logoUri = getImageUri(editSalonImages?.salonLogo);

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
                  style={[
                    styles.premiumActionUploadBtn,
                    logoUploading && styles.disabledBtn,
                  ]}
                  activeOpacity={0.75}
                  disabled={logoUploading}
                  onPress={pickSalonLogoAsset}
                >
                  <Text
                    style={[
                      styles.premiumActionUploadBtnText,
                      { color: darkTheme.colors.textMain },
                    ]}
                  >
                    {logoUploading ? "Uploading..." : "Upload"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.squareLogoPreviewContainerBox,
                  { borderColor: "rgba(255,255,255,0.05)" },
                ]}
              >
                {logoUri ? (
                  <Image
                    source={{ uri: logoUri }}
                    style={styles.embeddedPreviewImageInstance}
                  />
                ) : (
                  <View style={styles.iconPlaceholderBox} />
                )}
                {logoUploading && (
                  <View style={styles.imageOverlayLoader}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  </View>
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
                  style={[
                    styles.premiumActionUploadBtn,
                    uploadSalonImageLoader && styles.disabledBtn,
                  ]}
                  activeOpacity={0.75}
                  disabled={uploadSalonImageLoader}
                  onPress={pickShowcaseGalleryAsset}
                >
                  <Text
                    style={[
                      styles.premiumActionUploadBtnText,
                      { color: darkTheme.colors.textMain },
                    ]}
                  >
                    {uploadSalonImageLoader ? "Uploading..." : "Upload"}
                  </Text>
                </TouchableOpacity>
              </View>

              {galleryList.length === 0 && (
                <View
                  style={[
                    styles.squareLogoPreviewContainerBox,
                    { borderColor: "rgba(255,255,255,0.05)" },
                  ]}
                >
                  {uploadSalonImageLoader && (
                    <View style={styles.imageOverlayLoader}>
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    </View>
                  )}
                </View>
              )}
            </View>

            {/* Gallery Deck */}
            {galleryList.length > 0 && (
              <View style={styles.galleryShowcasePreviewVerticalDeckGrid}>
                {galleryList.map((image) => {
                  const imageUri = getImageUri(image);
                  const itemId = getItemId(image);
                  const isThisItemUpdating =
                    handleEditSalonLoader && activeEditingId === image?._id;

                  return (
                    <View
                      key={itemId}
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
                          source={{ uri: imageUri }}
                          style={styles.galleryPreviewImageInstance}
                        />
                        {isThisItemUpdating && (
                          <View style={styles.imageOverlayLoader}>
                            <ActivityIndicator size="large" color="#FFFFFF" />
                          </View>
                        )}
                      </View>

                      <View style={styles.cardActionsHeaderTrackRow}>
                        <TouchableOpacity
                          style={[
                            styles.innerRowActionTriggerCTAButtonBox,
                            isThisItemUpdating && styles.disabledBtn,
                          ]}
                          activeOpacity={0.75}
                          disabled={isThisItemUpdating}
                          onPress={() => handleUpdateGalleryImage(image)}
                        >
                          <Text
                            style={[
                              styles.innerRowActionButtonTextLabel,
                              { color: darkTheme.colors.textMain },
                            ]}
                          >
                            {isThisItemUpdating ? "Updating..." : "Edit Image"}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.innerRowActionTriggerCTAButtonBox,
                            styles.deleteActionBtn,
                            isThisItemUpdating && styles.disabledBtn,
                          ]}
                          activeOpacity={0.75}
                          disabled={isThisItemUpdating}
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
                  );
                })}
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
    width: scale(96),
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
    position: "relative",
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
  imageOverlayLoader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(4),
  },
  disabledBtn: {
    opacity: 0.6,
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

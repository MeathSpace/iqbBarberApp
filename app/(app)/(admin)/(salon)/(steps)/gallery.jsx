import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// ✅ Correct default import
import Shimmer from "react-native-modern-shimmer";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import api from "../../../../../utils/api";

// Custom Stealth Dark Palette Tokens for Shimmer
const SKELETON_THEME = {
  header: { baseColor: "#221f1c", highlightColor: "#332e2a" },
  button: { baseColor: "#2a2a2a", highlightColor: "#333333" },
  card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
  line: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
};

// Component-Level Unified Custom Skeleton View
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
  const { authenticatedUser } = useAdminAuth();

  const salonId = authenticatedUser?.salonId || 1;
  const [salonLogoUri, setSalonLogoUri] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  // Full Screen Skeleton Loader State
  const [isScreenLoading, setIsScreenLoading] = useState(true);

  // Individual Action Loader States
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [updatingGalleryId, setUpdatingGalleryId] = useState(null);

  // Fetch initial salon data
  useEffect(() => {
    let isMounted = true;

    const fetchDefaultSalon = async () => {
      try {
        setIsScreenLoading(true);
        const { data } = await api.post("/admin/getDefaultSalonByAdmin", {
          adminEmail: authenticatedUser?.email,
        });

        if (!isMounted) return;

        // Extract Salon Logo
        const logoUrl = data?.response?.salonLogo?.[0]?.url || "";
        setSalonLogoUri(logoUrl);

        // Map Backend Schema -> Front-End Schema
        const rawGallery = data?.gallery || data?.response?.gallery || [];
        const normalizedGallery = rawGallery.map((img) => ({
          id: img._id || String(Date.now()),
          uri: img.url,
          public_id: img.public_id,
        }));

        setGalleryImages(normalizedGallery);
      } catch (error) {
        console.error("Error fetching salon data:", error);
      } finally {
        if (isMounted) {
          setIsScreenLoading(false);
        }
      }
    };

    if (authenticatedUser?.email) {
      fetchDefaultSalon();
    } else {
      setIsScreenLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [authenticatedUser?.email]);

  // Centralized image picker helper
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

    return result.assets;
  };

  // API 1: Upload Salon Logo (POST /salon/uploadSalonLogo)
  const uploadSalonLogoToBackend = async (uri) => {
    if (!salonId) {
      Alert.alert("Error", "Salon ID is missing. Cannot upload logo.");
      return;
    }

    try {
      setUploadingLogo(true);
      const formData = new FormData();
      formData.append("salonId", Number(salonId));

      const filename = uri.split("/").pop() || "salon-logo.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      formData.append("salonLogo", {
        uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
        name: filename,
        type,
      });

      const response = await api.post("/salon/uploadSalonLogo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Error uploading logo:", error?.response || error);
      Alert.alert(
        "Upload Failed",
        error?.response?.data?.message || "Could not upload salon logo.",
      );
    } finally {
      setUploadingLogo(false);
    }
  };

  // Pick Salon Logo
  const pickSalonLogoAsset = async () => {
    const assets = await requestAndPickImage({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (assets && assets[0]?.uri) {
      const selectedUri = assets[0].uri;
      setSalonLogoUri(selectedUri);
      await uploadSalonLogoToBackend(selectedUri);
    }
  };

  // API 2: Upload Single Showcase Gallery Image (POST /salon/uploadSalonImage)
  const uploadGalleryImageToBackend = async (uri) => {
    if (!salonId) {
      Alert.alert("Error", "Salon ID is missing.");
      return null;
    }

    const formData = new FormData();
    formData.append("salonId", Number(salonId));

    const filename = uri.split("/").pop() || "gallery-image.jpg";
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image/jpeg`;

    formData.append("gallery", {
      uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
      name: filename,
      type,
    });

    const response = await api.post("/salon/uploadSalonImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  };

  // Selection & Upload: Showcase Gallery Assets
  const pickShowcaseGalleryAsset = async () => {
    const assets = await requestAndPickImage({
      allowsEditing: false,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 0.8,
    });

    if (!assets || assets.length === 0) return;

    try {
      setUploadingGallery(true);
      const newUploadedItems = [];

      for (const asset of assets) {
        try {
          const resData = await uploadGalleryImageToBackend(asset.uri);
          const uploadedImgObj = resData?.image || resData?.data || resData;

          newUploadedItems.push({
            id: uploadedImgObj?._id || uploadedImgObj?.id || String(Date.now()),
            uri: uploadedImgObj?.url || asset.uri,
            public_id: uploadedImgObj?.public_id || "",
          });
        } catch (singleUploadErr) {
          console.error("Failed to upload image:", singleUploadErr);
        }
      }

      if (newUploadedItems.length > 0) {
        setGalleryImages((prev) => [...prev, ...newUploadedItems]);
      }
    } catch (error) {
      console.error(
        "Error uploading gallery image(s):",
        error?.response || error,
      );
      Alert.alert(
        "Upload Failed",
        error?.response?.data?.message || "Could not upload gallery image(s).",
      );
    } finally {
      setUploadingGallery(false);
    }
  };

  // API 3: Update Individual Gallery Asset (PUT /salon/updateSalonImages)
  // API 3: Update Individual Gallery Asset (PUT /salon/updateSalonImages)
  const handleUpdateGalleryImage = async (image) => {
    const assets = await requestAndPickImage({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!assets || !assets[0]?.uri) return;

    const newUri = assets[0].uri;

    try {
      setUpdatingGalleryId(image.id);

      const formData = new FormData();
      formData.append("salonId", Number(salonId));
      formData.append("id", String(image.id));
      formData.append("public_imgid", String(image.public_id || ""));

      const filename = newUri.split("/").pop() || "gallery-image.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      formData.append("gallery", {
        uri: Platform.OS === "ios" ? newUri.replace("file://", "") : newUri,
        name: filename,
        type,
      });

      const response = await api.put("/salon/updateSalonImages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Extract response payload according to server schema
      const updatedData = response?.data?.response;
      const updatedUrl = updatedData?.url || newUri;
      const updatedId = updatedData?._id || image.id;
      const updatedPublicId = updatedData?.public_id || image.public_id;

      // Update local state with the NEW id, public_id, and url from server
      setGalleryImages((prev) =>
        prev.map((img) =>
          img.id === image.id
            ? {
                ...img,
                id: updatedId,
                uri: updatedUrl,
                public_id: updatedPublicId,
              }
            : img,
        ),
      );

      Alert.alert("Success", "Gallery image updated successfully!");
    } catch (error) {
      console.error("Error updating image:", error?.response || error);
      Alert.alert(
        "Update Failed",
        error?.response?.data?.message || "Could not update gallery image.",
      );
    } finally {
      setUpdatingGalleryId(null);
    }
  };

  // API 4: Delete Individual Gallery Image (DELETE /salon/deleteSalonImages)
  const handleRemoveGalleryImage = async (image) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to remove this image from the gallery?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setUpdatingGalleryId(image.id);

              if (image.id && !image.id.startsWith("local-")) {
                await api.delete("/salon/deleteSalonImages", {
                  data: {
                    img_id: String(image.id),
                    public_id: String(image.public_id || ""),
                  },
                });
              }

              setGalleryImages((prev) =>
                prev.filter((img) => img.id !== image.id),
              );
            } catch (error) {
              console.error("Error deleting image:", error?.response || error);
              Alert.alert(
                "Delete Failed",
                error?.response?.data?.message || "Could not remove image.",
              );
            } finally {
              setUpdatingGalleryId(null);
            }
          },
        },
      ],
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
      <Header
        title="Gallery"
        subTitle="Configure active salon display assets"
        showBack={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {isScreenLoading ? (
          <ScreenSkeletonView />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContentTrack}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
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
                    disabled={uploadingLogo}
                  >
                    <Text
                      style={[
                        styles.premiumActionUploadBtnText,
                        { color: darkTheme.colors.textMain },
                      ]}
                    >
                      {uploadingLogo ? "Uploading..." : "Upload"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    styles.squareLogoPreviewContainerBox,
                    { borderColor: "rgba(255,255,255,0.05)" },
                  ]}
                >
                  {uploadingLogo ? (
                    <ActivityIndicator
                      size="small"
                      color={darkTheme.colors.accent}
                    />
                  ) : salonLogoUri ? (
                    <Image
                      source={{ uri: salonLogoUri }}
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
                    disabled={uploadingGallery}
                  >
                    <Text
                      style={[
                        styles.premiumActionUploadBtnText,
                        { color: darkTheme.colors.textMain },
                      ]}
                    >
                      {uploadingGallery ? "Uploading..." : "Upload"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {galleryImages.length === 0 && (
                  <View
                    style={[
                      styles.squareLogoPreviewContainerBox,
                      { borderColor: "rgba(255,255,255,0.05)" },
                    ]}
                  />
                )}
              </View>

              {/* Gallery Deck */}
              {galleryImages.length > 0 && (
                <View style={styles.galleryShowcasePreviewVerticalDeckGrid}>
                  {galleryImages.map((image) => {
                    const isBusy = updatingGalleryId === image.id;

                    return (
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
                          {isBusy && (
                            <View style={styles.overlayLoaderBox}>
                              <ActivityIndicator
                                size="small"
                                color={darkTheme.colors.accent}
                              />
                            </View>
                          )}
                        </View>

                        <View style={styles.cardActionsHeaderTrackRow}>
                          <TouchableOpacity
                            style={styles.innerRowActionTriggerCTAButtonBox}
                            activeOpacity={0.75}
                            onPress={() => handleUpdateGalleryImage(image)}
                            disabled={isBusy}
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
                            disabled={isBusy}
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
      </KeyboardAvoidingView>
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
  overlayLoaderBox: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
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

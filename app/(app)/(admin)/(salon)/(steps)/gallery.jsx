import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";

import Header from "../../../../../components/Header/Header"; // Adjust path dynamically
import { darkTheme } from "../../../../../constants/appTheme";
import { useRouter } from "expo-router";

const Gallery = () => {
  const router = useRouter();
  const [salonLogoUri, setSalonLogoUri] = useState("https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=150");
  const [galleryImages, setGalleryImages] = useState([
    { id: "g1", uri: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500" }
  ]);

  // Handle Salon Logo Asset Picker
  const pickSalonLogoAsset = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Please allow access to your photos to upload media.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSalonLogoUri(result.assets[0].uri);
    }
  };

  // Handle Adding New Showcase Gallery Asset
  const pickShowcaseGalleryAsset = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Please allow access to your photos to upload media.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.9,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImageBlock = {
        id: String(Date.now()),
        uri: result.assets[0].uri,
      };
      setGalleryImages([...galleryImages, newImageBlock]);
    }
  };

  // FIXED: Replaces a specific image inside the array directly without throwing away its array index position
  const handleUpdateGalleryImage = async (id) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Please allow access to your photos to upload media.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.9,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setGalleryImages(prev =>
        prev.map(img => img.id === id ? { ...img, uri: result.assets[0].uri } : img)
      );
    }
  };

  const handleRemoveGalleryImage = (id) => {
    setGalleryImages(galleryImages.filter((img) => img.id !== id));
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header title="Gallery" subTitle="Configure active salon display assets" showBack={false} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.scrollContentTrack}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.internalFormFieldsEnclosure}>
            
            {/* 1. Salon Logo Media Uploader Card */}
            <View style={[styles.uploadSectionRowUnit, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
              <View style={styles.uploadRowLeftTextGroup}>
                <Text style={styles.uploadRowMainLabel}>Upload your salon's logo</Text>
                <TouchableOpacity 
                  style={[styles.premiumActionUploadBtn, { backgroundColor: "#1C1C1E", borderColor: "rgba(255,255,255,0.08)", borderWidth: 1 }]}
                  activeOpacity={0.75}
                  onPress={pickSalonLogoAsset}
                >
                  <Text style={[styles.premiumActionUploadBtnText, { color: darkTheme.colors.textMain }]}>Upload</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.squareLogoPreviewContainerBox, { borderColor: "rgba(255,255,255,0.05)" }]}>
                {salonLogoUri ? (
                  <Image source={{ uri: salonLogoUri }} style={styles.embeddedPreviewImageInstance} />
                ) : (
                  <View style={styles.iconPlaceholderBox} />
                )}
              </View>
            </View>

            {/* 2. Portfolio Showcase Gallery Core Uploader Card */}
            <View style={[styles.uploadSectionRowUnit, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, marginTop: verticalScale(14) }]}>
              <View style={styles.uploadRowLeftTextGroup}>
                <Text style={styles.uploadRowMainLabel}>Please select high-quality images to showcase your salon.</Text>
                <TouchableOpacity 
                  style={[styles.premiumActionUploadBtn, { backgroundColor: "#1C1C1E", borderColor: "rgba(255,255,255,0.08)", borderWidth: 1 }]}
                  activeOpacity={0.75}
                  onPress={pickShowcaseGalleryAsset}
                >
                  <Text style={[styles.premiumActionUploadBtnText, { color: darkTheme.colors.textMain }]}>Upload</Text>
                </TouchableOpacity>
              </View>

              {galleryImages.length === 0 && (
                <View style={[styles.squareLogoPreviewContainerBox, { borderColor: "rgba(255,255,255,0.05)" }]} />
              )}
            </View>

            {/* Showcase Cards (Featuring Side-by-Side Edit and Delete Actions) */}
            {galleryImages.length > 0 && (
              <View style={styles.galleryShowcasePreviewVerticalDeckGrid}>
                {galleryImages.map((image) => (
                  <View 
                    key={image.id} 
                    style={[styles.galleryShowcaseImageCardFrame, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
                  >
                    <Image source={{ uri: image.uri }} style={styles.galleryPreviewImageInstance} />
                    
                    {/* Action Panel Button Split Grid Layout */}
                    <View style={styles.cardActionsHeaderTrackRow}>
                      <TouchableOpacity 
                        style={[styles.innerRowActionTriggerCTAButtonBox, { backgroundColor: "rgba(255, 255, 255, 0.05)", borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.08)" }]}
                        activeOpacity={0.75}
                        onPress={() => handleUpdateGalleryImage(image.id)}
                      >
                        <Text style={[styles.innerRowActionButtonTextLabel, { color: darkTheme.colors.textMain }]}>Edit Image</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={[styles.innerRowActionTriggerCTAButtonBox, { backgroundColor: "rgba(255, 59, 48, 0.1)" }]}
                        activeOpacity={0.75}
                        onPress={() => handleRemoveGalleryImage(image.id)}
                      >
                        <Text style={[styles.innerRowActionButtonTextLabel, { color: "#FF3B30" }]}>Delete Image</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Primary Action Workflow Progression Bar */}
            <TouchableOpacity 
              style={[styles.masterSubmitActionBtnNode, { backgroundColor: darkTheme.colors.accent }]}
              activeOpacity={0.85}
              onPress={() => router.push("/socialLinks")}
            >
              <Text style={styles.masterSubmitActionBtnText}>Continue</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
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
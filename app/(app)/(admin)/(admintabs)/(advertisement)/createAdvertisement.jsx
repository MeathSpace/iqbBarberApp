import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { CameraIcon, NotificationIcon } from "../../../../../constants/icons";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import api from "../../../../../utils/api";

const CreateAdvertisement = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { authenticatedUser } = useAdminAuth();
  const salonId = authenticatedUser?.salonId;

  // Determine if editing vs creating
  const isEditMode = params.mode === "edit";

  // Form states updated to represent advertisement link context
  const [adLink, setAdLink] = useState(params.currentLink || "");
  const [imageFile, setImageFile] = useState(
    params.currentUrl
      ? { uri: params.currentUrl, name: "Current Image", type: "image/jpeg" }
      : null,
  );

  const [submitLoading, setSubmitLoading] = useState(false);

  // Maximum image size allowed: 2MB (2 * 1024 * 1024 bytes)
  const MAX_FILE_SIZE_BYTES = 2097152;

  // Image Selection Handler
  const pickImageHandler = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos to upload advertisements.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // ✅ FIX: Universal string syntax that supports older and newer versions perfectly
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];

      // Check asset size boundary if available
      if (
        selectedAsset.fileSize &&
        selectedAsset.fileSize > MAX_FILE_SIZE_BYTES
      ) {
        Alert.alert("File Too Large", "Maximum image size allowed is 2MB.");
        return;
      }

      // Extract filename from URI string
      const uriParts = selectedAsset.uri.split("/");
      const fileName =
        uriParts[uriParts.length - 1] || `ad_image_${Date.now()}.png`;

      // Handle MIME type lookup
      const match = /\.(\w+)$/.exec(fileName);
      const mimeType = match ? `image/${match[1]}` : "image/png";

      setImageFile({
        uri: selectedAsset.uri,
        name: fileName,
        type: mimeType,
        size: selectedAsset.fileSize,
      });
    }
  };

  // Submit Handler using FormData
  const handleFinishSubmit = async () => {
    if (!salonId) {
      Alert.alert("Error", "Authentication context missing salon identifier.");
      return;
    }
    if (!adLink.trim()) {
      Alert.alert(
        "Validation Failed",
        "Please provide an advertisement redirect link.",
      );
      return;
    }
    if (!imageFile || (!isEditMode && imageFile.name === "Current Image")) {
      Alert.alert(
        "Validation Failed",
        "Please upload a promotional 16:9 graphic image.",
      );
      return;
    }

    try {
      setSubmitLoading(true);

      const formData = new FormData();
      formData.append("salonId", String(salonId));

      // Build out structural advertisementLink parameter array matching backend specifications
      const advertisementLinkArray = [
        {
          name: imageFile.name,
          size: imageFile.size || 1000000,
          type: imageFile.type,
          lastModified: Date.now(),
          link: adLink.trim(),
          file: {},
        },
      ];
      formData.append(
        "advertisementLink",
        JSON.stringify(advertisementLinkArray),
      );

      // Append binary object parameter if a brand new file was chosen locally
      if (
        imageFile.uri.startsWith("file://") ||
        imageFile.uri.startsWith("content://")
      ) {
        formData.append("advertisements", {
          uri: imageFile.uri,
          name: imageFile.name,
          type: imageFile.type,
        });
      }

      let response;
      if (isEditMode) {
        formData.append("img_id", String(params.id));
        formData.append("public_id", String(params.publicId));

        response = await api.post(
          "/advertisement/editAdvertisements",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
      } else {
        response = await api.post(
          "/advertisement/addAdvertisements",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
      }

      Alert.alert(
        "Success",
        response?.data?.message || "Advertisement handled successfully",
        [{ text: "OK", onPress: () => router.back() }],
      );
    } catch (error) {
      Alert.alert(
        "Upload Failure",
        error?.response?.data?.message ||
          "Something went wrong while synchronizing content items.",
      );
    } finally {
      setSubmitLoading(false);
    }
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
        title={isEditMode ? "Edit Advertisement" : "Add Advertisement"}
        subTitle={
          isEditMode
            ? "Modify custom banner elements"
            : "Upload promotional content"
        }
        showBack={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Advertisement Link *
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                    borderRadius: darkTheme.layout.borderRadiusMedium,
                    height: darkTheme.layout.componentHeight,
                  },
                ]}
                placeholder="e.g., https://your-salon-link.com/promo"
                placeholderTextColor={darkTheme.colors.textMuted}
                value={adLink}
                onChangeText={setAdLink}
              />
            </View>

            {/* Upload Area 16:9 box */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Image (16:9 ratio) *
              </Text>
              <TouchableOpacity
                style={[
                  styles.uploadDropzone,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                    borderRadius: darkTheme.layout.borderRadiusLarge,
                  },
                ]}
                activeOpacity={0.8}
                onPress={pickImageHandler}
              >
                {imageFile?.uri ? (
                  <View style={styles.previewContainer}>
                    <Image
                      source={{ uri: imageFile.uri }}
                      style={styles.previewImage}
                    />
                    <View style={styles.changeOverlay}>
                      <Text style={styles.changeText}>Tap to Replace</Text>
                    </View>
                  </View>
                ) : (
                  <>
                    <View
                      style={[
                        styles.uploadIconWrapper,
                        { backgroundColor: "rgba(255, 149, 0, 0.1)" },
                      ]}
                    >
                      <CameraIcon
                        size={scale(20)}
                        color={darkTheme.colors.accent}
                      />
                    </View>
                    <Text
                      style={[darkTheme.typography.bodyMain, styles.uploadText]}
                    >
                      Upload Image
                    </Text>
                    <Text
                      style={[
                        darkTheme.typography.bodyMuted,
                        styles.uploadSpecs,
                      ]}
                    >
                      Recommended: 1920×1080 or 1280×720{"\n"}16:9 aspect ratio
                      required (Max 2MB)
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.infoBanner,
                {
                  backgroundColor: "#151311",
                  borderColor: "rgba(255, 149, 0, 0.15)",
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                },
              ]}
            >
              <NotificationIcon
                size={scale(16)}
                color={darkTheme.colors.accent}
                style={styles.infoIcon}
              />
              <View style={styles.infoTextContainer}>
                <Text
                  style={[
                    darkTheme.typography.bodyMuted,
                    { color: "#E5E5EA", fontWeight: "700" },
                  ]}
                >
                  Image will be displayed on:
                </Text>
                <Text
                  style={[darkTheme.typography.bodyMuted, styles.infoListText]}
                >
                  • Customer mobile apps{"\n"}• In-salon TV displays{"\n"}•
                  Queue management screens
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.finishButton,
              {
                backgroundColor: submitLoading
                  ? darkTheme.colors.border
                  : darkTheme.colors.accent,
                height: darkTheme.layout.buttonHeight,
                borderRadius: darkTheme.layout.borderRadiusMedium,
              },
            ]}
            activeOpacity={0.8}
            onPress={handleFinishSubmit}
            disabled={submitLoading}
          >
            {submitLoading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text
                style={[darkTheme.typography.btnText, { color: "#000000" }]}
              >
                {isEditMode ? "Save Changes" : "Finish"}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAdvertisement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
  },
  formContainer: {
    gap: verticalScale(20),
    marginBottom: verticalScale(32),
  },
  inputGroup: {
    width: "100%",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: scale(14),
    fontSize: scale(14),
    fontWeight: "400",
    marginTop: verticalScale(8),
  },
  uploadDropzone: {
    width: "100%",
    height: verticalScale(150),
    borderWidth: 1,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(8),
    overflow: "hidden",
  },
  uploadIconWrapper: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  uploadText: {
    fontWeight: "600",
    fontSize: scale(13),
  },
  uploadSpecs: {
    textAlign: "center",
    fontSize: scale(11),
    lineHeight: scale(15),
    marginTop: verticalScale(4),
  },
  previewContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  changeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: verticalScale(4),
    alignItems: "center",
  },
  changeText: {
    color: "#ffffff",
    fontSize: scale(11),
    fontWeight: "600",
  },
  infoBanner: {
    flexDirection: "row",
    padding: scale(14),
    borderWidth: 1,
    alignItems: "flex-start",
  },
  infoIcon: {
    marginTop: verticalScale(1),
    marginRight: scale(10),
  },
  infoTextContainer: {
    flex: 1,
  },
  infoListText: {
    marginTop: verticalScale(4),
    lineHeight: scale(16),
    color: "#E5E5EA",
  },
  finishButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

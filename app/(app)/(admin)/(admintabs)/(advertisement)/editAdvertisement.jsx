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

const EditAdvertisementScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { authenticatedUser } = useAdminAuth();
  const salonId = authenticatedUser?.salonId;

  // Route parameters received from the parent list screen context
  const targetId = params.id;
  const publicId = params.publicId;

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

  // Media picker function
  const pickImageHandler = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos to edit advertisements.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // ✅ FIX: Universal string array structure matching create screen
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];

      // Structural 2MB verification boundary
      if (
        selectedAsset.fileSize &&
        selectedAsset.fileSize > MAX_FILE_SIZE_BYTES
      ) {
        Alert.alert("File Too Large", "Maximum image size allowed is 2MB.");
        return;
      }

      const uriParts = selectedAsset.uri.split("/");
      const fileName =
        uriParts[uriParts.length - 1] || `updated_ad_${Date.now()}.png`;

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

  const handleUpdateSubmit = async () => {
    if (!salonId || !targetId) {
      Alert.alert(
        "Error",
        "Missing required targeting parameters (salonId or ad ID).",
      );
      return;
    }
    if (!adLink.trim()) {
      Alert.alert(
        "Validation Failed",
        "Please provide a valid advertisement redirect link.",
      );
      return;
    }

    try {
      setSubmitLoading(true);

      const formData = new FormData();
      formData.append("id", String(targetId));
      formData.append("salonId", String(salonId));
      formData.append("advertisementLink", adLink.trim());

      // Check if a brand new image file was locally picked
      const isNewLocalFile =
        imageFile &&
        (imageFile.uri.includes("file://") ||
          imageFile.uri.includes("content://") ||
          imageFile.uri.includes("data:") ||
          !imageFile.uri.startsWith("http"));

      // 🛡️ Only touch Cloudinary variables if an actual new file exists!
      if (isNewLocalFile && imageFile.name !== "Current Image") {
        console.log(
          "New image detected. Appending binary and public_id targeting parameters.",
        );

        // Append the new binary file
        formData.append("advertisements", {
          uri: imageFile.uri,
          name: imageFile.name,
          type: imageFile.type,
        });

        // Append the replacement pointer token
        if (publicId) {
          formData.append("public_imgid", String(publicId));
        } else if (params.public_id) {
          formData.append("public_imgid", String(params.public_id));
        }
      } else {
        console.log(
          "Text-only modification update. Leaving image parameter keys out.",
        );
      }

      const response = await api.put(
        "/advertisement/updateAdvertisements",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      Alert.alert(
        "Success",
        response?.data?.message || "Advertisement updated successfully!",
        [{ text: "OK", onPress: () => router.back() }],
      );
    } catch (error) {
      console.log("🔴 Backend Rejection Reason:", error?.response?.data);
      Alert.alert(
        "Update Failed",
        error?.response?.data?.message ||
          "Something went wrong while updating.",
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
        title={"Edit Advertisement"}
        subTitle={"Modify custom layout asset properties"}
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
              {/* ✅ FIX: Corrected label mapping layout */}
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

            {/* Graphic Upload Area */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Advertisement Image (16:9 ratio) *
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
                      <Text style={styles.changeText}>
                        Tap to Replace Image
                      </Text>
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
                      Select Replacement
                    </Text>
                    <Text
                      style={[
                        darkTheme.typography.bodyMuted,
                        styles.uploadSpecs,
                      ]}
                    >
                      16:9 aspect ratio required (Max 2MB)
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
                  Editing note:
                </Text>
                <Text
                  style={[darkTheme.typography.bodyMuted, styles.infoListText]}
                >
                  Modifications deploy out instantly onto live display modules
                  and user application feeds.
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
            onPress={handleUpdateSubmit}
            disabled={submitLoading}
          >
            {submitLoading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text
                style={[darkTheme.typography.btnText, { color: "#000000" }]}
              >
                Save Changes
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditAdvertisementScreen;

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
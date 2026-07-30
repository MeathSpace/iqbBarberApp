import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
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

import { useRouter } from "expo-router";
import Header from "../../../../../components/Header/Header";
import SalonProgressBar from "../../../../../components/Progess/SalonProgessBar";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";
import api from "../../../../../utils/api";

const SocialLinks = () => {
  const { authenticatedUser } = useAdminAuth();
  const router = useRouter();

  const {
    salonSocialLinks,
    setSalonSocialLinks,
    salonInfo,
    salonBusinessInfo,
    serviceForm,
    servicesList,
    salonImages,
  } = useAdminGlobal();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const updateSocialLink = (key, value) => {
    setSalonSocialLinks((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFinishConfiguration = () => {
    const trimmedPayload = {
      website: (salonSocialLinks?.website || "").trim(),
      facebook: (salonSocialLinks?.facebook || "").trim(),
      instagram: (salonSocialLinks?.instagram || "").trim(),
      twitter: (salonSocialLinks?.twitter || "").trim(),
      tiktok: (salonSocialLinks?.tiktok || "").trim(),
    };

    setSalonSocialLinks(trimmedPayload);
    // Open the confirmation modal
    setIsModalVisible(true);
  };

  const uploadSalonLogo = async (salonId) => {
    if (!salonImages?.salonLogo) return;

    const formData = new FormData();

    formData.append("salonId", String(salonId));
    formData.append("salonLogo", {
      uri: salonImages.salonLogo,
      name: "salon_logo.jpg",
      type: "image/jpeg",
    });

    await api.post("/salon/uploadSalonLogo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const uploadSalonGallery = async (salonId) => {
    if (!salonImages?.salonGallery || salonImages.salonGallery.length === 0)
      return;

    const formData = new FormData();

    formData.append("salonId", String(salonId));

    salonImages.salonGallery.forEach((image, index) => {
      formData.append("gallery", {
        uri: image.uri,
        name: `gallery_${index}.jpg`,
        type: "image/jpeg",
      });
    });

    await api.post("/salon/uploadSalonImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const [salonConfirmLoader, setSalonConfirmLoader] = useState(false);

  const handleConfirmCreate = async () => {
    const salondata = {
      adminEmail: authenticatedUser?.email,
      salonEmail: salonInfo?.salonEmail,
      salonDesc: salonInfo?.description,
      salonName: salonInfo?.salonName,
      // Address & Location
      address: "B-12, Kalyani Main Road",
      location: {
        type: "Point",
        coordinates: {
          longitude: 88.4335,
          latitude: 22.9765,
        },
      },
      country: "India",
      city: "Kalyani",
      timeZone: "Asia/Kolkata",
      postCode: "741235",

      contactTel: Number(salonInfo?.phoneNumber),
      countryCode: Number(salonInfo?.countryCode),
      countryCca2: salonInfo?.countryCca2,
      salonType: salonBusinessInfo?.salonBusinessType,
      webLink: salonSocialLinks?.website,
      fbLink: salonSocialLinks?.facebook,
      instraLink: salonSocialLinks?.instagram,
      twitterLink: salonSocialLinks?.twitter,
      tiktokLink: salonSocialLinks?.tiktok,
      services: servicesList?.data,
    };

    try {
      setSalonConfirmLoader(true);

      const { data } = await api.post("/salon/createSalonByAdmin", salondata);

      const salonId = data?.response?.salonId;

      if (!salonId) {
        throw new Error("Salon ID not returned");
      }

      await uploadSalonLogo(salonId);

      await uploadSalonGallery(salonId);

      Alert.alert("Success", data?.message || "Salon created successfully.", [
        {
          text: "OK",
          onPress: () => router.push("/(salon)"),
        },
      ]);
    } catch (error) {
      console.error(
        "Create Salon Error:",
        error?.response?.data || error?.message || error,
      );

      Alert.alert(
        "Error",
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Something went wrong while creating the salon. Please try again.",
      );
    } finally {
      setSalonConfirmLoader(false);
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
        title="Social Links"
        subTitle="Configure customer facing platform hooks"
        showBack={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContentTrack}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <SalonProgressBar currentStep={5} totalSteps={5} />

          <View style={styles.internalFormFieldsEnclosure}>
            {/* Field Block Module: Website */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>WEBSITE URL</Text>
              <View
                style={[
                  styles.inlineInputWithIconWrapper,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <View style={styles.leftIconPrefixFrame}>
                  <Feather
                    name="globe"
                    size={scale(14)}
                    color="rgba(255,255,255,0.4)"
                  />
                </View>
                <TextInput
                  style={[
                    styles.luxuryTextInputInstance,
                    { color: darkTheme.colors.textMain },
                  ]}
                  value={salonSocialLinks?.website || ""}
                  onChangeText={(val) => updateSocialLink("website", val)}
                  placeholder="https://www.salon.com/"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="url"
                  selectionColor={darkTheme.colors.accent}
                />
              </View>
            </View>

            {/* Field Block Module: Facebook */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                FACEBOOK PROFILE
              </Text>
              <View
                style={[
                  styles.inlineInputWithIconWrapper,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <View style={styles.leftIconPrefixFrame}>
                  <FontAwesome
                    name="facebook"
                    size={scale(15)}
                    color="rgba(255,255,255,0.4)"
                  />
                </View>
                <TextInput
                  style={[
                    styles.luxuryTextInputInstance,
                    { color: darkTheme.colors.textMain },
                  ]}
                  value={salonSocialLinks?.facebook || ""}
                  onChangeText={(val) => updateSocialLink("facebook", val)}
                  placeholder="https://www.facebook.com/salon/"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="url"
                  selectionColor={darkTheme.colors.accent}
                />
              </View>
            </View>

            {/* Field Block Module: Instagram */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                INSTAGRAM HANDLE
              </Text>
              <View
                style={[
                  styles.inlineInputWithIconWrapper,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <View style={styles.leftIconPrefixFrame}>
                  <AntDesign
                    name="instagram"
                    size={scale(15)}
                    color="rgba(255,255,255,0.4)"
                  />
                </View>
                <TextInput
                  style={[
                    styles.luxuryTextInputInstance,
                    { color: darkTheme.colors.textMain },
                  ]}
                  value={salonSocialLinks?.instagram || ""}
                  onChangeText={(val) => updateSocialLink("instagram", val)}
                  placeholder="https://www.instagram.com/salon/"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="url"
                  selectionColor={darkTheme.colors.accent}
                />
              </View>
            </View>

            {/* Field Block Module: X / Twitter */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                X (FORMERLY TWITTER)
              </Text>
              <View
                style={[
                  styles.inlineInputWithIconWrapper,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <View style={styles.leftIconPrefixFrame}>
                  <FontAwesome6
                    name="x-twitter"
                    size={scale(13)}
                    color="rgba(255,255,255,0.4)"
                  />
                </View>
                <TextInput
                  style={[
                    styles.luxuryTextInputInstance,
                    { color: darkTheme.colors.textMain },
                  ]}
                  value={salonSocialLinks?.twitter || ""}
                  onChangeText={(val) => updateSocialLink("twitter", val)}
                  placeholder="https://x.com/salon"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="url"
                  selectionColor={darkTheme.colors.accent}
                />
              </View>
            </View>

            {/* Field Block Module: TikTok */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>TIKTOK CHANNEL</Text>
              <View
                style={[
                  styles.inlineInputWithIconWrapper,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <View style={styles.leftIconPrefixFrame}>
                  <FontAwesome6
                    name="tiktok"
                    size={scale(13)}
                    color="rgba(255,255,255,0.4)"
                  />
                </View>
                <TextInput
                  style={[
                    styles.luxuryTextInputInstance,
                    { color: darkTheme.colors.textMain },
                  ]}
                  value={salonSocialLinks?.tiktok || ""}
                  onChangeText={(val) => updateSocialLink("tiktok", val)}
                  placeholder="https://www.tiktok.com/salon/"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="url"
                  selectionColor={darkTheme.colors.accent}
                />
              </View>
            </View>

            {/* Master Submission Button */}
            <TouchableOpacity
              style={[
                styles.masterFinishActionBtnNode,
                { backgroundColor: darkTheme.colors.accent },
              ]}
              activeOpacity={0.85}
              onPress={handleFinishConfiguration}
            >
              <Text style={styles.masterFinishActionBtnText}>Finish Setup</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
              },
            ]}
          >

            <View
              style={[
                styles.modalIconBadge,
                { backgroundColor: "rgba(255, 149, 0, 0.12)" },
              ]}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={scale(28)}
                color={darkTheme.colors.accent}
              />
            </View>

            <Text
              style={[styles.modalTitle, { color: darkTheme.colors.textMain }]}
            >
              You're All Set!
            </Text>

            <Text
              style={[
                styles.modalSubText,
                { color: darkTheme.colors.textMuted },
              ]}
            >
              Ready to get started? Tap{" "}
              <Text
                style={{ color: darkTheme.colors.accent, fontWeight: "700" }}
              >
                Create Salon
              </Text>{" "}
              to publish your profile and go live.
            </Text>

            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={[
                  styles.modalCancelBtn,
                  { borderColor: darkTheme.colors.border },
                ]}
                activeOpacity={0.8}
                onPress={() => setIsModalVisible(false)}
              >
                <Text
                  style={[
                    styles.modalCancelBtnText,
                    { color: darkTheme.colors.textMain },
                  ]}
                >
                  Back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalConfirmBtn,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
                activeOpacity={0.85}
                onPress={handleConfirmCreate}
                disabled={salonConfirmLoader}
              >
                {salonConfirmLoader ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={styles.modalConfirmBtnText}>Create Salon</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    paddingTop: verticalScale(12),
  },
  internalFormFieldsEnclosure: {
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
  inputLayoutContainerGroup: {
    width: "100%",
    marginBottom: verticalScale(14),
  },
  inlineInputWithIconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: scale(38),
    borderRadius: scale(4),
    borderWidth: 1,
    overflow: "hidden",
  },
  leftIconPrefixFrame: {
    width: scale(36),
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.03)",
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  luxuryTextInputInstance: {
    flex: 1,
    height: "100%",
    paddingHorizontal: scale(12),
    fontSize: scale(13),
    fontWeight: "400",
  },
  masterFinishActionBtnNode: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  masterFinishActionBtnText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: scale(12),
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  modalCard: {
    width: "100%",
    maxWidth: scale(340),
    borderRadius: scale(12),
    borderWidth: 1,
    padding: scale(20),
    alignItems: "center",
  },
  modalIconBadge: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(26),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  modalTitle: {
    fontSize: scale(16),
    fontWeight: "700",
    marginBottom: verticalScale(8),
    textAlign: "center",
  },
  modalSubText: {
    fontSize: scale(12.5),
    lineHeight: scale(18),
    textAlign: "center",
    marginBottom: verticalScale(20),
  },
  modalActionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: scale(10),
  },
  modalCancelBtn: {
    flex: 1,
    height: scale(38),
    borderRadius: scale(6),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  modalCancelBtnText: {
    fontSize: scale(12),
    fontWeight: "600",
  },
  modalConfirmBtn: {
    flex: 1,
    height: scale(38),
    borderRadius: scale(6),
    justifyContent: "center",
    alignItems: "center",
  },
  modalConfirmBtnText: {
    color: "#000000",
    fontSize: scale(12),
    fontWeight: "700",
  },
});

export default SocialLinks;

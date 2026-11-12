import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import PhoneInput from "@linhnguyen96114/react-native-phone-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Toast } from "toastify-react-native";

import BarberHeader from "../../../../components/Header/BarberHeader";
import { darkTheme } from "../../../../constants/appTheme";
import { useBarberAuth } from "../../../../context/barber/AuthContext";
import api from "../../../../utils/api";

const phoneUtil = PhoneNumberUtil.getInstance();

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const EditProfileScreen = () => {
  const {
    authenticatedUser,
    setAuthenticatedUser,
    fetchLoggedInBarber,
  } = useBarberAuth();

  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password] = useState("********");
  const [mobNumber, setMobNumber] = useState("");
  const [countryCode, setCountryCode] = useState("44");
  const [countryCca2, setCountryCca2] = useState("GB");
  const [gender, setGender] = useState("Male");
  const [dobDate, setDobDate] = useState(new Date());
  const [profileImage, setProfileImage] = useState(null);

  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (!authenticatedUser) return;

    setName(authenticatedUser?.name || "");
    setNickName(authenticatedUser?.nickName || "");
    setEmail(authenticatedUser?.email || "");
    setGender(authenticatedUser?.gender || "Male");

    setDobDate(
      authenticatedUser?.dateOfBirth
        ? new Date(authenticatedUser.dateOfBirth)
        : new Date(),
    );

    setProfileImage(authenticatedUser?.profile?.[0]?.url || null);

    const dbPhone = authenticatedUser?.mobileNumber;
    const dbCountryCode = authenticatedUser?.countryCode || 44;

    if (dbPhone) {
      try {
        const rawPhoneStr = String(dbPhone);
        const codeStr = String(dbCountryCode);
        const fullNumber = rawPhoneStr.startsWith("+")
          ? rawPhoneStr
          : rawPhoneStr.startsWith(codeStr)
            ? `+${rawPhoneStr}`
            : `+${codeStr}${rawPhoneStr}`;
        const parsed = phoneUtil.parse(fullNumber);

        const detectedCallingCode = String(parsed.getCountryCode());
        const nationalNum = String(parsed.getNationalNumber());
        const regionCode =
          phoneUtil.getRegionCodeForCountryCode(parsed.getCountryCode()) ||
          "GB";

        setCountryCode(detectedCallingCode);
        setCountryCca2(regionCode);
        setMobNumber(nationalNum);
      } catch (_err) {
        const fallbackStr = String(dbPhone);
        const codeStr = String(dbCountryCode);
        const stripped = fallbackStr.startsWith(codeStr)
          ? fallbackStr.slice(codeStr.length)
          : fallbackStr;
        setMobNumber(stripped);
        setCountryCode(codeStr);
      }
    } else {
      setMobNumber("");
    }
  }, [authenticatedUser]);

  // Validation Error States
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");

  // Password Visibility States
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Date Picker & Dropdown Focus States
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isGenderFocused, setIsGenderFocused] = useState(false);

  // Modals & Loaders
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savePasswordLoader, setSavePasswordLoader] = useState(false);

  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);
  const [verificationTarget, setVerificationTarget] = useState({
    type: "",
    value: "",
  });
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [handleVerifyLoader, setHandleVerifyLoader] = useState(false);

  const [profilePicUploadLoader, setProfilePicUploadLoader] = useState(false);
  const [updateProfileLoader, setUpdateProfileLoader] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (verificationModalVisible && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [verificationModalVisible, countdown]);

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Access to your gallery is required to set a profile picture.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      const fileUri = selectedAsset.uri;
      const fileName =
        selectedAsset.fileName ||
        fileUri.split("/").pop() ||
        `barber_${Date.now()}.jpg`;

      const match = /\.(\w+)$/.exec(fileName);
      const fileType =
        selectedAsset.mimeType || (match ? `image/${match[1]}` : "image/jpeg");

      const formData = new FormData();
      formData.append("profile", {
        uri:
          Platform.OS === "ios" ? fileUri.replace("file://", "") : fileUri,
        name: fileName,
        type: fileType,
      });
      formData.append("email", authenticatedUser?.email);

      try {
        setProfilePicUploadLoader(true);

        const { data } = await api.post(
          "/barber/uploadBarberProfilePicture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        const uploadedUrl =
          data?.barberImage?.profile?.[0]?.url ||
          data?.response?.url ||
          fileUri;
        setProfileImage(uploadedUrl);
        await fetchLoggedInBarber();
        Toast.success(data?.message || "Profile picture updated successfully!");
      } catch (error) {
        Toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Image upload failed",
        );
      } finally {
        setProfilePicUploadLoader(false);
      }
    }
  };

  const formatDisplayDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (selectedDate) setDobDate(selectedDate);
  };

  const triggerVerificationFlow = async (type, currentVal, isVerified) => {
    if (!isVerified) {
      setVerificationTarget({ type, value: currentVal });
      setOtpCode("");
      setOtpError("");
      setCountdown(30);
      setVerificationModalVisible(true);

      if (type === "Email") {
        try {
          const { data } = await api.post(
            "/barber/sendVerificationCodeForBarberEmail",
            { email },
          );
          Toast.success(data?.message);
        } catch (error) {
          Toast.error(
            error?.response?.data?.message || "Failed to send verification code",
          );
        }
      } else if (type === "Mobile Phone") {
        try {
          const { data } = await api.post(
            "/barber/sendVerificationCodeForBarberMobile",
            { email },
          );
          Toast.success(data?.message);
        } catch (error) {
          Toast.error(
            error?.response?.data?.message || "Failed to send verification code",
          );
        }
      }
    }
  };

  const handleResendOTP = async () => {
    if (countdown === 0) {
      setCountdown(30);

      if (verificationTarget.type === "Email") {
        try {
          const { data } = await api.post(
            "/barber/sendVerificationCodeForBarberEmail",
            { email },
          );
          Toast.success(data?.message);
        } catch (error) {
          Toast.error(error?.response?.data?.message);
        }
      } else if (verificationTarget.type === "Mobile Phone") {
        try {
          const { data } = await api.post(
            "/barber/sendVerificationCodeForBarberMobile",
            { email },
          );
          Toast.success(data?.message);
        } catch (error) {
          Toast.error(error?.response?.data?.message);
        }
      }
    }
  };

  const handleVerifyOTP = async () => {
    setOtpError("");
    if (!otpCode.trim()) {
      setOtpError("Please enter the verification code");
      return;
    }
    if (otpCode.trim().length < 4) {
      setOtpError("Verification code must be 4 digits");
      return;
    }

    if (verificationTarget.type === "Email") {
      try {
        setHandleVerifyLoader(true);
        const { data } = await api.post(
          "/barber/changeBarberEmailVerifiedStatus",
          {
            email,
            verificationCode: otpCode,
          },
        );
        Toast.success(data?.message);
        if (data?.response) {
          setAuthenticatedUser((prev) => ({
            ...prev,
            emailVerified: data.response.emailVerified,
          }));
        }
        await fetchLoggedInBarber();
        setVerificationModalVisible(false);
      } catch (error) {
        Toast.error(error?.response?.data?.message);
        setOtpCode("");
      } finally {
        setHandleVerifyLoader(false);
      }
    } else if (verificationTarget.type === "Mobile Phone") {
      try {
        setHandleVerifyLoader(true);
        const { data } = await api.post(
          "/barber/changeBarberMobileVerifiedStatus",
          {
            email,
            verificationCode: otpCode,
          },
        );
        Toast.success(data?.message);
        if (data?.response) {
          setAuthenticatedUser((prev) => ({
            ...prev,
            mobileVerified: data.response.mobileVerified,
          }));
        }
        await fetchLoggedInBarber();
        setVerificationModalVisible(false);
      } catch (error) {
        Toast.error(error?.response?.data?.message);
        setOtpCode("");
      } finally {
        setHandleVerifyLoader(false);
      }
    }
  };

  const savePasswordHandler = async () => {
    let isValid = true;
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    if (!oldPassword.trim()) {
      setOldPasswordError("Current password is required");
      isValid = false;
    }
    if (!newPassword.trim()) {
      setNewPasswordError("New password is required");
      isValid = false;
    } else if (newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters");
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Confirm password does not match new password");
      isValid = false;
    }

    if (!isValid) return;

    try {
      setSavePasswordLoader(true);
      const { data } = await api.post("/barber/updateBarberPassword", {
        email: authenticatedUser?.email,
        oldPassword,
        password: newPassword,
      });

      Toast.success(data?.message || "Password updated successfully");
      setPasswordModalVisible(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "Failed to update password",
      );
    } finally {
      setSavePasswordLoader(false);
    }
  };

  const saveProfileHandler = async () => {
    let isValid = true;
    setNameError("");
    setEmailError("");
    setMobileError("");

    if (!name.trim()) {
      setNameError("Full Name is required");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!mobNumber || !mobNumber.trim()) {
      setMobileError("Mobile number is required");
      isValid = false;
    } else {
      try {
        const fullPhone = `+${countryCode}${mobNumber}`;
        const parsedNumber = phoneUtil.parseAndKeepRawInput(
          fullPhone,
          countryCca2,
        );
        if (!phoneUtil.isValidNumber(parsedNumber)) {
          setMobileError(`Invalid phone number for ${countryCca2}`);
          isValid = false;
        }
      } catch (_error) {
        setMobileError("Invalid mobile number format");
        isValid = false;
      }
    }

    if (!isValid) return;

    try {
      setUpdateProfileLoader(true);
      const payload = {
        salonId: authenticatedUser?.salonId,
        email,
        name,
        nickName: nickName || authenticatedUser?.nickName || "",
        countryCode: Number(countryCode),
        mobileNumber: Number(mobNumber),
        dateOfBirth: dobDate.toISOString().split("T")[0],
        gender,
        barberServices: authenticatedUser?.barberServices || [],
      };

      const { data } = await api.put(
        "/barber/updateBarberAccountDetails",
        payload,
      );

      if (data?.response) {
        setAuthenticatedUser((prev) => ({
          ...prev,
          ...data.response,
        }));
      }
      await fetchLoggedInBarber();
      Toast.success(data?.message || "Barber profile updated successfully");
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "Failed to update profile",
      );
    } finally {
      setUpdateProfileLoader(false);
    }
  };

  const handleStripeConnect = async () => {
    if (stripeLoading) return;
    try {
      setStripeLoading(true);
      const vendorAccountId =
        authenticatedUser?.vendorAccountDetails?.vendorAccountId;

      if (vendorAccountId) {
        const { data } = await api.post("/vendor-loginlink", {
          vendorAccountId,
        });
        const url = data?.url || data?.loginLink?.url;
        if (url) {
          await Linking.openURL(url);
        } else {
          Toast.info(data?.message || "Stripe account already connected");
        }
      } else {
        const { data } = await api.post("/onboard-vendor-account", {
          email: authenticatedUser?.email,
          vendorAccountId: "",
        });
        const url = data?.accountLink || data?.url;
        if (url) {
          await Linking.openURL(url);
        } else {
          Toast.info(data?.message || "Stripe onboarding initiated");
        }
      }
    } catch (error) {
      Toast.error(
        error?.response?.data?.message ||
          "Unable to open Stripe merchant portal",
      );
    } finally {
      setStripeLoading(false);
    }
  };

  const completionFields = [
    Boolean(name),
    Boolean(email),
    Boolean(mobNumber),
    Boolean(authenticatedUser?.emailVerified),
    Boolean(authenticatedUser?.mobileVerified),
    Boolean(profileImage),
  ];
  const completionPct = Math.round(
    (completionFields.filter(Boolean).length / completionFields.length) * 100,
  );

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <BarberHeader
        title="Profile"
        subTitle="Manage your workspace identity"
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
          {/* 1. Seamless Hero Identity Presentation Grid Block Layout */}
          <View style={styles.heroSectionContainer}>
            <TouchableOpacity
              style={styles.avatarWrapperContainer}
              activeOpacity={0.85}
              onPress={handleSelectImage}
              disabled={profilePicUploadLoader}
            >
              <View
                style={[
                  styles.avatarOuterRing,
                  { borderColor: darkTheme.colors.accent },
                ]}
              >
                <View style={styles.avatarInnerCircle}>
                  {profilePicUploadLoader ? (
                    <ActivityIndicator color={darkTheme.colors.accent} />
                  ) : profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.avatarImagePlacement}
                      contentFit="cover"
                      transition={200}
                    />
                  ) : (
                    <Ionicons
                      name="person"
                      size={scale(32)}
                      color="rgba(255,255,255,0.6)"
                    />
                  )}
                </View>
              </View>
              <View
                style={[
                  styles.cameraFloatingBadge,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
              >
                <Feather name="camera" size={scale(11)} color="#000000" />
              </View>
            </TouchableOpacity>

            <Text
              style={[darkTheme.typography.cardTitle, styles.userNameHeading]}
            >
              {name || "Barber"}
            </Text>
            <Text style={styles.userRoleTagLabel}>
              {authenticatedUser?.role || "Barber"}
            </Text>

            {/* Premium Hairline Metrics Ribbon Section */}
            <View style={styles.metricsRibbonTrack}>
              <View style={styles.metricStatBlock}>
                <Text style={styles.metricMainNumber}>
                  {authenticatedUser?.barberServices?.length ?? 0}
                </Text>
                <Text style={styles.metricSubLabel}>Services</Text>
              </View>
              <View style={styles.hairlineVerticalDivider} />
              <View style={styles.metricStatBlock}>
                <Text style={styles.metricMainNumber}>
                  {authenticatedUser?.queueCount ?? 0}
                </Text>
                <Text style={styles.metricSubLabel}>Queue</Text>
              </View>
              <View style={styles.hairlineVerticalDivider} />
              <View style={styles.metricStatBlock}>
                <Text style={styles.metricMainNumber}>
                  {authenticatedUser?.barberEWT ?? 0}m
                </Text>
                <Text style={styles.metricSubLabel}>Est. Wait</Text>
              </View>
            </View>
          </View>

          {/* 2. Cohesive Stripe Payout Integration Tile */}
          <TouchableOpacity
            style={[
              styles.premiumStripeActionTile,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
              },
            ]}
            activeOpacity={0.8}
            onPress={handleStripeConnect}
            disabled={stripeLoading}
          >
            <View style={styles.stripeLeftWrapper}>
              <View style={styles.stripeBrandIconBox}>
                {stripeLoading ? (
                  <ActivityIndicator size="small" color="#635BFF" />
                ) : (
                  <FontAwesome5
                    name="stripe-s"
                    size={scale(15)}
                    color="#635BFF"
                  />
                )}
              </View>
              <View style={styles.stripeTextStack}>
                <Text style={styles.stripeTitleText}>
                  Stripe Merchant Integration
                </Text>
                <Text style={styles.stripeSubtitleText}>
                  {authenticatedUser?.vendorAccountDetails?.vendorAccountId
                    ? "Manage connected payout account"
                    : "Configure dynamic multi-user payout routing"}
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={scale(14)}
              color={darkTheme.colors.textMuted}
            />
          </TouchableOpacity>

          {/* Minimalist Profile Progress Indicator Layout Section */}
          <View style={styles.progressTrackerHeaderSection}>
            <View style={styles.progressSplitTextRow}>
              <Text style={styles.progressLabelText}>PROFILE COMPLETION</Text>
              <Text
                style={[
                  styles.progressPercentText,
                  { color: darkTheme.colors.accent },
                ]}
              >
                {completionPct}%
              </Text>
            </View>
            <View style={styles.progressTrackBackgroundLine}>
              <View
                style={[
                  styles.progressActiveFillLine,
                  {
                    backgroundColor: darkTheme.colors.accent,
                    width: `${completionPct}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* 3. True Solid-Black Luxury Form Enclosures Workspace List */}
          <View style={styles.formContainerVerticalDeck}>
            {/* Input Element: Full Name */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>FULL NAME</Text>
              <TextInput
                style={[
                  styles.luxuryTextInput,
                  {
                    borderColor: nameError ? "red" : darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                    backgroundColor: darkTheme.colors.card,
                  },
                ]}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) setNameError("");
                }}
                placeholder="Enter full name..."
                placeholderTextColor={darkTheme.colors.textMuted}
                selectionColor={darkTheme.colors.accent}
              />
              {nameError ? (
                <Text
                  style={{ color: "red", fontSize: scale(11), marginTop: 4 }}
                >
                  {nameError}
                </Text>
              ) : null}
            </View>

            {/* Input Element: Nick Name */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>NICK NAME</Text>
              <TextInput
                style={[
                  styles.luxuryTextInput,
                  {
                    borderColor: darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                    backgroundColor: darkTheme.colors.card,
                  },
                ]}
                value={nickName}
                onChangeText={setNickName}
                placeholder="Enter nickname..."
                placeholderTextColor={darkTheme.colors.textMuted}
                selectionColor={darkTheme.colors.accent}
              />
            </View>

            {/* Input Element: Email Address */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>EMAIL ADDRESS</Text>
              <View style={styles.inputWithIconAnchorWrapper}>
                <TextInput
                  style={[
                    styles.luxuryTextInput,
                    {
                      borderColor: emailError
                        ? "red"
                        : darkTheme.colors.border,
                      color: darkTheme.colors.textMain,
                      backgroundColor: darkTheme.colors.card,
                      paddingRight: scale(40),
                    },
                  ]}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError("");
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  selectionColor={darkTheme.colors.accent}
                />
                <View style={styles.fieldRightStatusIconContainer}>
                  {authenticatedUser?.emailVerified ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={scale(16)}
                      color="#34C759"
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        triggerVerificationFlow(
                          "Email",
                          email,
                          authenticatedUser?.emailVerified,
                        )
                      }
                    >
                      <Ionicons
                        name="close-circle"
                        size={scale(16)}
                        color="#FF3B30"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {emailError ? (
                <Text
                  style={{ color: "red", fontSize: scale(11), marginTop: 4 }}
                >
                  {emailError}
                </Text>
              ) : null}
            </View>

            {/* Input Element: Security Password Modal Trigger */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                SECURITY PASSWORD
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setPasswordModalVisible(true)}
                style={[
                  styles.luxuryDropdownTriggerButton,
                  {
                    borderColor: darkTheme.colors.border,
                    backgroundColor: darkTheme.colors.card,
                  },
                ]}
              >
                <Text
                  style={{
                    color: darkTheme.colors.textMain,
                    fontSize: scale(13),
                  }}
                >
                  {password}
                </Text>
                <Ionicons
                  name="lock-closed-outline"
                  size={scale(13)}
                  color={darkTheme.colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            {/* Input Element: Mobile Number via PhoneInput */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>MOBILE NUMBER</Text>
              <View
                style={[
                  styles.inputWithIconAnchorWrapper,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderRadius: scale(8),
                    borderColor: mobileError
                      ? "red"
                      : darkTheme.colors.border,
                    borderWidth: 1,
                  },
                ]}
              >
                <PhoneInput
                  ref={phoneInputRef}
                  value={mobNumber}
                  defaultCode={countryCca2}
                  textInputProps={{
                    selectionColor: "#FFFFFF",
                  }}
                  onChangeText={(text) => {
                    setMobNumber(text);
                    if (mobileError) setMobileError("");
                  }}
                  onChangeCountry={(country) => {
                    const newCode = country?.callingCode?.[0];
                    const newCca2 = country?.cca2;

                    if (newCode && newCode !== countryCode)
                      setCountryCode(newCode);
                    if (newCca2 && newCca2 !== countryCca2)
                      setCountryCca2(newCca2);
                  }}
                  withDarkTheme={true}
                  containerStyle={[
                    styles.phoneContainer,
                    {
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      borderRadius: scale(8),
                      height: scale(38),
                    },
                  ]}
                  textContainerStyle={{
                    backgroundColor: "transparent",
                    paddingVertical: 0,
                  }}
                  textInputStyle={[
                    darkTheme.typography.bodyMain,
                    { height: "100%", fontSize: scale(13) },
                  ]}
                  codeTextStyle={{
                    color: darkTheme.colors.textMain,
                    fontSize: scale(13),
                  }}
                />

                <View style={styles.fieldRightStatusIconContainer}>
                  {authenticatedUser?.mobileVerified ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={scale(16)}
                      color="#34C759"
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        triggerVerificationFlow(
                          "Mobile Phone",
                          mobNumber,
                          authenticatedUser?.mobileVerified,
                        )
                      }
                    >
                      <Ionicons
                        name="close-circle"
                        size={scale(16)}
                        color="#FF3B30"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {mobileError ? (
                <Text
                  style={{ color: "red", fontSize: scale(11), marginTop: 4 }}
                >
                  {mobileError}
                </Text>
              ) : null}
            </View>

            {/* Input Element: Gender */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                GENDER ASSIGNMENT
              </Text>
              <Dropdown
                style={[
                  styles.dropdownMainElementContainer,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: isGenderFocused
                      ? darkTheme.colors.accent
                      : darkTheme.colors.border,
                  },
                ]}
                placeholderStyle={[
                  styles.dropdownPlaceholderTextStyle,
                  { color: darkTheme.colors.textMuted },
                ]}
                selectedTextStyle={[
                  styles.dropdownSelectedTextStyle,
                  { color: darkTheme.colors.textMain },
                ]}
                containerStyle={[
                  styles.dropdownMenuInnerContainerBox,
                  {
                    backgroundColor: "#0A0A0C",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
                itemContainerStyle={styles.dropdownItemRowUnit}
                itemTextStyle={[
                  styles.dropdownItemRowText,
                  { color: darkTheme.colors.textMain },
                ]}
                activeColor="rgba(255, 149, 0, 0.08)"
                data={GENDER_OPTIONS}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder="Select assigned gender"
                value={gender}
                onFocus={() => setIsGenderFocused(true)}
                onBlur={() => setIsGenderFocused(false)}
                onChange={(item) => {
                  setGender(item.value);
                  setIsGenderFocused(false);
                }}
                renderRightIcon={() => (
                  <Ionicons
                    name="chevron-down"
                    size={scale(13)}
                    color={
                      isGenderFocused
                        ? darkTheme.colors.accent
                        : darkTheme.colors.textMuted
                    }
                  />
                )}
              />
            </View>

            {/* Input Element: Date of Birth */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>DATE OF BIRTH</Text>
              <TouchableOpacity
                style={[
                  styles.luxuryDropdownTriggerButton,
                  {
                    borderColor: darkTheme.colors.border,
                    backgroundColor: darkTheme.colors.card,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => setShowDatePicker(true)}
              >
                <Text
                  style={{
                    color: darkTheme.colors.textMain,
                    fontSize: scale(13),
                  }}
                >
                  {formatDisplayDate(dobDate)}
                </Text>
                <Ionicons
                  name="calendar-outline"
                  size={scale(13)}
                  color={darkTheme.colors.textMuted}
                />
              </TouchableOpacity>

              <Modal
                transparent={true}
                visible={showDatePicker}
                animationType="fade"
                onRequestClose={() => setShowDatePicker(false)}
              >
                <TouchableWithoutFeedback
                  onPress={() => setShowDatePicker(false)}
                >
                  <View style={styles.modalOverlayScrim}>
                    <TouchableWithoutFeedback>
                      <View
                        style={[
                          styles.calendarModalContent,
                          { backgroundColor: darkTheme.colors.card },
                        ]}
                      >
                        <DateTimePicker
                          value={dobDate}
                          mode="date"
                          display={
                            Platform.OS === "ios" ? "spinner" : "default"
                          }
                          onChange={handleDateChange}
                          maximumDate={new Date()}
                          themeVariant="dark"
                        />

                        {Platform.OS === "ios" && (
                          <TouchableOpacity
                            style={[
                              styles.modalSubmitActionCTAButton,
                              { backgroundColor: darkTheme.colors.accent },
                            ]}
                            onPress={() => setShowDatePicker(false)}
                            activeOpacity={0.8}
                          >
                            <Text
                              style={{
                                color: "#000000",
                                fontWeight: "700",
                                fontSize: scale(13),
                              }}
                            >
                              Done
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
          </View>

          {/* Primary Profile Form Changes Action Submission Button */}
          <TouchableOpacity
            style={[
              styles.saveProfileChangesCTAButton,
              {
                backgroundColor: darkTheme.colors.accent,
                height: darkTheme.layout.buttonHeight || verticalScale(40),
              },
            ]}
            activeOpacity={0.8}
            onPress={saveProfileHandler}
            disabled={updateProfileLoader}
          >
            {updateProfileLoader ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text
                style={[
                  darkTheme.typography.btnText,
                  { color: "#000000", fontWeight: "700" },
                ]}
              >
                Save Profile Changes
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* A. System Password Update Sheet */}
      <Modal
        transparent={true}
        visible={passwordModalVisible}
        animationType="slide"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setPasswordModalVisible(false)}
        >
          <View style={styles.modalBottomOverlayScrim}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.bottomSheetPanelContentBox,
                  {
                    backgroundColor: "#0A0A0C",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <View style={styles.bottomSheetHeaderIndicatorNotch} />
                <Text
                  style={[
                    styles.modalLayoutHeadlineText,
                    { color: darkTheme.colors.textMain },
                  ]}
                >
                  Change your password
                </Text>

                <View style={styles.innerModalFormVerticalStackDeck}>
                  <View style={styles.inputLayoutContainerGroup}>
                    <Text style={styles.premiumFieldLabelMicro}>
                      CURRENT PASSWORD
                    </Text>
                    <View style={{ position: "relative" }}>
                      <TextInput
                        style={[
                          styles.luxuryTextInput,
                          {
                            borderColor: oldPasswordError
                              ? "red"
                              : darkTheme.colors.border,
                            color: darkTheme.colors.textMain,
                            backgroundColor: darkTheme.colors.card,
                          },
                        ]}
                        secureTextEntry={!showOldPassword}
                        value={oldPassword}
                        onChangeText={(text) => {
                          setOldPassword(text);
                          if (oldPasswordError) setOldPasswordError("");
                        }}
                        placeholder="Enter old password"
                        placeholderTextColor="rgba(255,255,255,0.2)"
                      />
                      <TouchableOpacity
                        onPress={() => setShowOldPassword(!showOldPassword)}
                        style={styles.eyeIconButton}
                      >
                        <Ionicons
                          name={
                            showOldPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={20}
                          color={darkTheme.colors.textMuted}
                        />
                      </TouchableOpacity>
                    </View>
                    {oldPasswordError ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: scale(11),
                          marginTop: 4,
                        }}
                      >
                        {oldPasswordError}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.inputLayoutContainerGroup}>
                    <Text style={styles.premiumFieldLabelMicro}>
                      NEW PASSWORD
                    </Text>
                    <View style={{ position: "relative" }}>
                      <TextInput
                        style={[
                          styles.luxuryTextInput,
                          {
                            borderColor: newPasswordError
                              ? "red"
                              : darkTheme.colors.border,
                            color: darkTheme.colors.textMain,
                            backgroundColor: darkTheme.colors.card,
                          },
                        ]}
                        secureTextEntry={!showNewPassword}
                        value={newPassword}
                        onChangeText={(text) => {
                          setNewPassword(text);
                          if (newPasswordError) setNewPasswordError("");
                        }}
                        placeholder="Enter new password"
                        placeholderTextColor="rgba(255,255,255,0.2)"
                      />
                      <TouchableOpacity
                        onPress={() => setShowNewPassword(!showNewPassword)}
                        style={styles.eyeIconButton}
                      >
                        <Ionicons
                          name={
                            showNewPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={20}
                          color={darkTheme.colors.textMuted}
                        />
                      </TouchableOpacity>
                    </View>
                    {newPasswordError ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: scale(11),
                          marginTop: 4,
                        }}
                      >
                        {newPasswordError}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.inputLayoutContainerGroup}>
                    <Text style={styles.premiumFieldLabelMicro}>
                      CONFIRM PASSWORD
                    </Text>
                    <View style={{ position: "relative" }}>
                      <TextInput
                        style={[
                          styles.luxuryTextInput,
                          {
                            borderColor: confirmPasswordError
                              ? "red"
                              : darkTheme.colors.border,
                            color: darkTheme.colors.textMain,
                            backgroundColor: darkTheme.colors.card,
                          },
                        ]}
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={(text) => {
                          setConfirmPassword(text);
                          if (confirmPasswordError) setConfirmPasswordError("");
                        }}
                        placeholder="Enter confirm password"
                        placeholderTextColor="rgba(255,255,255,0.2)"
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={styles.eyeIconButton}
                      >
                        <Ionicons
                          name={
                            showConfirmPassword
                              ? "eye-off-outline"
                              : "eye-outline"
                          }
                          size={20}
                          color={darkTheme.colors.textMuted}
                        />
                      </TouchableOpacity>
                    </View>
                    {confirmPasswordError ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: scale(11),
                          marginTop: 4,
                        }}
                      >
                        {confirmPasswordError}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.modalSubmitActionCTAButton,
                    {
                      backgroundColor: darkTheme.colors.accent,
                      marginTop: verticalScale(20),
                    },
                  ]}
                  disabled={savePasswordLoader}
                  onPress={savePasswordHandler}
                >
                  {savePasswordLoader ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <Text
                      style={{
                        color: "#000000",
                        fontWeight: "700",
                        fontSize: scale(13),
                      }}
                    >
                      Update password
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* B. OTP Verification Sheet with Integrated Cooldown */}
      <Modal
        transparent={true}
        visible={verificationModalVisible}
        animationType="slide"
        onRequestClose={() => setVerificationModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setVerificationModalVisible(false)}
        >
          <View style={styles.modalBottomOverlayScrim}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.bottomSheetPanelContentBox,
                  {
                    backgroundColor: "#0A0A0C",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <View style={styles.bottomSheetHeaderIndicatorNotch} />
                <Text
                  style={[
                    styles.modalLayoutHeadlineText,
                    { color: darkTheme.colors.textMain },
                  ]}
                >
                  Verify {verificationTarget.type}
                </Text>
                <Text style={styles.modalLayoutSubHeaderText}>
                  We have sent a code to{" "}
                  {verificationTarget.value || "your credentials"}.
                </Text>

                <View style={styles.innerModalFormVerticalStackDeck}>
                  <View style={styles.inputLayoutContainerGroup}>
                    <Text style={styles.premiumFieldLabelMicro}>
                      ENTER 4-DIGIT OTP AUTH CODE
                    </Text>
                    <TextInput
                      style={[
                        styles.luxuryTextInput,
                        {
                          borderColor: otpError
                            ? "red"
                            : darkTheme.colors.accent,
                          color: darkTheme.colors.textMain,
                          backgroundColor: darkTheme.colors.card,
                          letterSpacing: scale(4),
                          textAlign: "center",
                          fontSize: scale(16),
                          fontWeight: "700",
                        },
                      ]}
                      keyboardType="number-pad"
                      maxLength={6}
                      value={otpCode}
                      onChangeText={(text) => {
                        setOtpCode(text);
                        if (otpError) setOtpError("");
                      }}
                      placeholder="0000"
                      placeholderTextColor="rgba(255,255,255,0.15)"
                    />
                    {otpError ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: scale(11),
                          marginTop: 4,
                          textAlign: "center",
                        }}
                      >
                        {otpError}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.otpActionUtilityControlContextRow}>
                    <Text
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        fontSize: scale(11),
                      }}
                    >
                      Didn&apos;t receive the code?
                    </Text>
                    <TouchableOpacity
                      onPress={handleResendOTP}
                      disabled={countdown > 0}
                      style={{ opacity: countdown > 0 ? 0.5 : 1 }}
                    >
                      <Text
                        style={{
                          color: darkTheme.colors.accent,
                          fontWeight: "700",
                          fontSize: scale(11),
                        }}
                      >
                        {countdown > 0
                          ? ` Resend in ${countdown}s`
                          : " Resend Token"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.modalSubmitActionCTAButton,
                    {
                      backgroundColor: darkTheme.colors.accent,
                      marginTop: verticalScale(20),
                    },
                  ]}
                  disabled={handleVerifyLoader}
                  onPress={handleVerifyOTP}
                >
                  {handleVerifyLoader ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <Text
                      style={{
                        color: "#000000",
                        fontWeight: "700",
                        fontSize: scale(13),
                      }}
                    >
                      Verify
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: scale(18),
    paddingBottom: verticalScale(40),
    paddingTop: verticalScale(12),
  },
  heroSectionContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: verticalScale(18),
  },
  avatarWrapperContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: scale(84),
    height: scale(84),
  },
  avatarOuterRing: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.01)",
  },
  avatarInnerCircle: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    backgroundColor: "#161618",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImagePlacement: {
    width: "100%",
    height: "100%",
  },
  cameraFloatingBadge: {
    position: "absolute",
    bottom: scale(2),
    right: scale(2),
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  userNameHeading: {
    fontSize: scale(18),
    fontWeight: "700",
    marginTop: verticalScale(14),
    letterSpacing: -0.3,
  },
  userRoleTagLabel: {
    fontSize: scale(10),
    fontWeight: "700",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 1.2,
    marginTop: verticalScale(3),
  },
  metricsRibbonTrack: {
    flexDirection: "row",
    width: "100%",
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(4),
    justifyContent: "center",
    alignItems: "center",
  },
  metricStatBlock: {
    flex: 1,
    alignItems: "center",
  },
  metricMainNumber: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  metricSubLabel: {
    color: "rgba(255,255,255,0.35)",
    fontSize: scale(10),
    fontWeight: "600",
    marginTop: verticalScale(2),
  },
  hairlineVerticalDivider: {
    width: 1,
    height: verticalScale(16),
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  premiumStripeActionTile: {
    width: "100%",
    height: verticalScale(56),
    borderRadius: scale(10),
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(14),
    marginTop: verticalScale(6),
  },
  stripeLeftWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  stripeBrandIconBox: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(6),
    backgroundColor: "rgba(99, 91, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  stripeTextStack: {
    marginLeft: scale(12),
    flex: 1,
  },
  stripeTitleText: {
    color: "#FFFFFF",
    fontSize: scale(13),
    fontWeight: "600",
  },
  stripeSubtitleText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: scale(10),
    marginTop: verticalScale(2),
  },
  progressTrackerHeaderSection: {
    width: "100%",
    marginTop: verticalScale(24),
  },
  progressSplitTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  progressLabelText: {
    fontSize: scale(9),
    fontWeight: "800",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 0.8,
  },
  progressPercentText: {
    fontSize: scale(11),
    fontWeight: "800",
  },
  progressTrackBackgroundLine: {
    width: "100%",
    height: scale(2.5),
    backgroundColor: "#18181A",
    borderRadius: scale(1.5),
    marginTop: verticalScale(6),
    overflow: "hidden",
  },
  progressActiveFillLine: {
    height: "100%",
    borderRadius: scale(1.5),
  },
  formContainerVerticalDeck: {
    width: "100%",
    marginTop: verticalScale(16),
    gap: verticalScale(14),
  },
  inputLayoutContainerGroup: {
    width: "100%",
  },
  premiumFieldLabelMicro: {
    fontSize: scale(9),
    fontWeight: "800",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 1,
    marginBottom: verticalScale(6),
  },
  inputWithIconAnchorWrapper: {
    position: "relative",
    width: "100%",
  },
  phoneContainer: {
    width: "100%",
    paddingRight: scale(36),
  },
  luxuryTextInput: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(8),
    borderWidth: 1,
    paddingHorizontal: scale(12),
    fontSize: scale(13),
    fontWeight: "400",
  },
  luxuryDropdownTriggerButton: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(8),
    borderWidth: 1,
    paddingHorizontal: scale(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldRightStatusIconContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    height: scale(38),
    width: scale(38),
    justifyContent: "center",
    alignItems: "center",
  },
  saveProfileChangesCTAButton: {
    width: "100%",
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(28),
  },
  dropdownMainElementContainer: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(8),
    borderWidth: 1,
    paddingHorizontal: scale(12),
  },
  dropdownPlaceholderTextStyle: {
    fontSize: scale(13),
  },
  dropdownSelectedTextStyle: {
    fontSize: scale(13),
  },
  dropdownMenuInnerContainerBox: {
    borderRadius: scale(8),
    borderWidth: 1,
    marginTop: verticalScale(4),
    paddingVertical: verticalScale(4),
  },
  dropdownItemRowUnit: {
    paddingVertical: verticalScale(0),
    paddingHorizontal: scale(12),
  },
  dropdownItemRowText: {
    fontSize: scale(13),
  },
  modalOverlayScrim: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  calendarModalContent: {
    width: "100%",
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: scale(16),
    alignItems: "center",
    justifyContent: "center",
  },
  modalSubmitActionCTAButton: {
    width: "100%",
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
    height: scale(40),
    marginTop: verticalScale(14),
  },
  modalBottomOverlayScrim: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "flex-end",
  },
  bottomSheetPanelContentBox: {
    width: "100%",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    borderTopWidth: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(34),
  },
  bottomSheetHeaderIndicatorNotch: {
    width: scale(38),
    height: verticalScale(4),
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: scale(2),
    alignSelf: "center",
    marginBottom: verticalScale(16),
  },
  modalLayoutHeadlineText: {
    fontSize: scale(16),
    fontWeight: "700",
    marginBottom: verticalScale(6),
  },
  modalLayoutSubHeaderText: {
    color: "rgba(255,255,255,0.45)",
    fontSize: scale(12),
    marginBottom: verticalScale(16),
  },
  innerModalFormVerticalStackDeck: {
    gap: verticalScale(14),
    marginTop: verticalScale(8),
  },
  eyeIconButton: {
    position: "absolute",
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  otpActionUtilityControlContextRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(4),
  },
});

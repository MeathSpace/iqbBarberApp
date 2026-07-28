import PhoneInput from "@linhnguyen96114/react-native-phone-input";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
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

// Core Architecture & Design Pattern Imports
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SalonInfoStep = () => {
  const router = useRouter();
  const { salonInfo, setSalonInfo } = useAdminGlobal();

  // Phone Input Reference & Country Code State
  const phoneInputRef = useRef(null);
  const [countryCca2, setCountryCca2] = useState("GB");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // Field Specific Error States
  const [errors, setErrors] = useState({
    salonName: "",
    salonEmail: "",
    description: "",
    phoneNumber: "",
  });

  // Live Phone Validation Hook
  useEffect(() => {
    if (salonInfo?.phoneNumber && phoneInputRef.current) {
      const valid = phoneInputRef.current.isValidNumber(salonInfo.phoneNumber);
      setIsPhoneValid(valid);
      if (valid && errors.phoneNumber) {
        setErrors((prev) => ({ ...prev, phoneNumber: "" }));
      }
    } else {
      setIsPhoneValid(false);
    }
  }, [salonInfo?.phoneNumber]);

  // Handler to update specific fields in global context and reset error
  const handleInputChange = (key, value) => {
    setSalonInfo((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      salonName: "",
      salonEmail: "",
      description: "",
      phoneNumber: "",
    };

    // 1. Salon Name Validation
    if (!salonInfo?.salonName?.trim()) {
      newErrors.salonName = "Salon name is required.";
      isValid = false;
    }

    // 2. Salon Email Validation
    if (!salonInfo?.salonEmail?.trim()) {
      newErrors.salonEmail = "Salon email is required.";
      isValid = false;
    } else if (!EMAIL_REGEX.test(salonInfo.salonEmail.trim())) {
      newErrors.salonEmail = "Please enter a valid email address.";
      isValid = false;
    }

    // 3. Description Validation
    if (!salonInfo?.description?.trim()) {
      newErrors.description = "Salon description is required.";
      isValid = false;
    }

    // 4. Phone Number Validation
    if (!salonInfo?.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
      isValid = false;
    } else if (!isPhoneValid) {
      newErrors.phoneNumber = "Please enter a valid phone number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (!validateForm()) {
      return;
    }

    // Proceed to Step 2
    router.push("/businessInformation");
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
        title={"Salon Information"}
        subTitle={"Step 1 of 4"}
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
          {/* Multi-Step Horizontal Linear Progress Bar */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: darkTheme.colors.accent },
              ]}
            />
            <View style={styles.progressEmpty} />
            <View style={styles.progressEmpty} />
            <View style={styles.progressEmpty} />
          </View>

          <View style={styles.formContainer}>
            {/* Input Group: Salon Name */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>Salon Name</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: errors.salonName
                      ? "#EF4444"
                      : darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                placeholder="Enter salon name"
                placeholderTextColor={darkTheme.colors.textMuted}
                value={salonInfo?.salonName || ""}
                onChangeText={(text) => handleInputChange("salonName", text)}
                autoCapitalize="words"
              />
              {errors.salonName ? (
                <Text style={styles.errorText}>{errors.salonName}</Text>
              ) : null}
            </View>

            {/* Input Group: Salon Email */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>Salon Email</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: errors.salonEmail
                      ? "#EF4444"
                      : darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                placeholder="Enter salon email"
                placeholderTextColor={darkTheme.colors.textMuted}
                value={salonInfo?.salonEmail || ""}
                onChangeText={(text) => handleInputChange("salonEmail", text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.salonEmail ? (
                <Text style={styles.errorText}>{errors.salonEmail}</Text>
              ) : null}
            </View>

            {/* Input Group: Description */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>Description</Text>
              <TextInput
                style={[
                  styles.textAreaInput,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: errors.description
                      ? "#EF4444"
                      : darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                placeholder="Tell customers about your salon"
                placeholderTextColor={darkTheme.colors.textMuted}
                value={salonInfo?.description || ""}
                onChangeText={(text) => handleInputChange("description", text)}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
              {errors.description ? (
                <Text style={styles.errorText}>{errors.description}</Text>
              ) : null}
            </View>

            {/* Input Group: Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>Phone Number</Text>
              <View
                style={[
                  styles.phoneInputWrapper,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: errors.phoneNumber
                      ? "#EF4444"
                      : darkTheme.colors.border,
                  },
                ]}
              >
                <PhoneInput
                  ref={phoneInputRef}
                  value={salonInfo?.phoneNumber || ""}
                  defaultCode={countryCca2}
                  withDarkTheme={true}
                  onChangeText={(text) =>
                    handleInputChange("phoneNumber", text)
                  }
                  onChangeCountry={(country) => {
                    if (country?.cca2) {
                      setCountryCca2(country.cca2);
                    }
                  }}
                  containerStyle={styles.phoneContainer}
                  textContainerStyle={styles.phoneTextContainer}
                  textInputStyle={[
                    darkTheme.typography.bodyMain,
                    { color: darkTheme.colors.textMain, fontSize: scale(14) },
                  ]}
                  codeTextStyle={{
                    color: darkTheme.colors.textMain,
                    fontSize: scale(14),
                  }}
                  flagStyle={styles.phoneFlagAlignment}
                />
              </View>
              {errors.phoneNumber ? (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              ) : null}
            </View>
          </View>

          {/* Submission Trigger */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor: darkTheme.colors.accent,
                height: darkTheme.layout.buttonHeight,
              },
            ]}
            activeOpacity={0.8}
            onPress={handleNextStep}
          >
            <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
              Next: Business Information
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SalonInfoStep;

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
  progressTrack: {
    flexDirection: "row",
    width: "100%",
    height: verticalScale(4),
    backgroundColor: "#1C1C1E",
    borderRadius: darkTheme.layout.borderRadiusSmall,
    marginBottom: verticalScale(24),
    gap: scale(4),
  },
  progressFill: {
    flex: 1,
    height: "100%",
    borderRadius: scale(2),
  },
  progressEmpty: {
    flex: 1,
    height: "100%",
    backgroundColor: "#1C1C1E",
    borderRadius: scale(2),
  },
  formContainer: {
    gap: verticalScale(18),
    marginBottom: verticalScale(32),
  },
  inputGroup: {
    width: "100%",
  },
  textInput: {
    width: "100%",
    height: darkTheme.layout.componentHeight,
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    paddingHorizontal: scale(14),
    fontSize: scale(14),
    fontWeight: "400",
    marginTop: verticalScale(6),
  },
  textAreaInput: {
    width: "100%",
    height: verticalScale(100),
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    fontSize: scale(14),
    fontWeight: "400",
    marginTop: verticalScale(6),
  },
  phoneInputWrapper: {
    width: "100%",
    height: darkTheme.layout.componentHeight,
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    marginTop: verticalScale(6),
    overflow: "hidden",
  },
  phoneContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  phoneTextContainer: {
    backgroundColor: "transparent",
    paddingVertical: 0,
  },
  phoneFlagAlignment: {
    width: scale(24),
    height: scale(16),
  },
  errorText: {
    color: "#EF4444",
    fontSize: scale(11),
    marginTop: verticalScale(4),
  },
  nextButton: {
    width: "100%",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    alignItems: "center",
    justifyContent: "center",
  },
});
import PhoneInput from "@linhnguyen96114/react-native-phone-input";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
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
import { scale } from "react-native-size-matters";

// Core Architecture & Design Pattern Imports
import Header from "../../../../../components/Header/Header";
import SalonProgressBar from "../../../../../components/Progess/SalonProgessBar";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SalonInfoStep = () => {
  const router = useRouter();
  const { salonInfo, setSalonInfo } = useAdminGlobal();

  const phoneInputRef = useRef(null);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [errors, setErrors] = useState({
    salonName: "",
    salonEmail: "",
    description: "",
    phoneNumber: "",
  });

  // Live Phone Validation
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

  const handleInputChange = (key, value) => {
    setSalonInfo((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      salonName: "",
      salonEmail: "",
      description: "",
      phoneNumber: "",
    };

    if (!salonInfo?.salonName?.trim()) {
      newErrors.salonName = "Salon name is required.";
      isValid = false;
    }
    if (
      !salonInfo?.salonEmail?.trim() ||
      !EMAIL_REGEX.test(salonInfo.salonEmail.trim())
    ) {
      newErrors.salonEmail = "Please enter a valid email address.";
      isValid = false;
    }
    if (!salonInfo?.description?.trim()) {
      newErrors.description = "Salon description is required.";
      isValid = false;
    }
    if (!salonInfo?.phoneNumber?.trim() || !isPhoneValid) {
      newErrors.phoneNumber = "Please enter a valid phone number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateForm()) router.push("/businessInformation");
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

          <SalonProgressBar currentStep={1} totalSteps={5} />

          <View style={styles.formContainer}>
            {/* Salon Name */}
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
              />
              {errors.salonName ? (
                <Text style={styles.errorText}>{errors.salonName}</Text>
              ) : null}
            </View>

            {/* Email */}
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

            {/* Description */}
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
              />
              {errors.description ? (
                <Text style={styles.errorText}>{errors.description}</Text>
              ) : null}
            </View>

            {/* Phone Number */}
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
                  defaultCode={salonInfo?.countryCca2}
                  withDarkTheme={true}
                  onChangeText={(text) =>
                    handleInputChange("phoneNumber", text)
                  }
                  onChangeCountry={(country) => {
                    setSalonInfo((prev) => ({
                      ...prev,
                      countryCode:
                        country?.callingCode?.[0] || prev.countryCode,
                      countryCca2: country?.cca2 || prev.countryCca2,
                    }));
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

          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor: darkTheme.colors.accent,
                height: darkTheme.layout.buttonHeight,
              },
            ]}
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
  container: { flex: 1 },
  keyboardContainer: { flex: 1 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 32 },
  formContainer: { gap: 18, marginBottom: 32 },
  inputGroup: { width: "100%" },
  textInput: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
    marginTop: 6,
  },
  textAreaInput: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    marginTop: 6,
    textAlignVertical: "top",
  },
  phoneInputWrapper: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 6,
    overflow: "hidden",
  },
  phoneContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  phoneTextContainer: { backgroundColor: "transparent", paddingVertical: 0 },
  phoneFlagAlignment: { width: 24, height: 16 },
  errorText: { color: "#EF4444", fontSize: 11, marginTop: 4 },
  nextButton: {
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

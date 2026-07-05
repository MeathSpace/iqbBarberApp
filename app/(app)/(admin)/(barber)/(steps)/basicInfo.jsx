import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import Progess from "../../../../../components/Progess/Progess";
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { CameraIcon } from "../../../../../constants/icons";

const BasicInfo = () => {
  const router = useRouter();

  // Localized form state logic
  const [formData, setFormData] = useState({
    fullName: "",
    nickname: "",
    email: "",
    mobileNumber: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
  });

  const updateFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNextStep = () => {
    // Navigates to your separate second step page (selectServices.jsx)
    router.push("/selectServices");
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
        title="Basic Information"
        subTitle="Enter personal details for the new barber"
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
          <View style={styles.stepContainer}>
            <Progess />
            
            {/* Photo Upload */}
            <View style={styles.photoUploadContainer}>
              <TouchableOpacity
                style={[
                  styles.photoCircle,
                  { backgroundColor: darkTheme.colors.card },
                ]}
                activeOpacity={0.8}
              >
                <CameraIcon size={scale(18)} color={darkTheme.colors.textMain} />
                <Text style={styles.photoText}>Photo</Text>
              </TouchableOpacity>
            </View>

            {/* Inputs Form Section */}
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={darkTheme.typography.inputLabel}>Full Name *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: darkTheme.colors.card,
                      borderColor: darkTheme.colors.border,
                      color: darkTheme.colors.textMain,
                    },
                  ]}
                  placeholder="Enter full name"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  value={formData.fullName}
                  onChangeText={(val) => updateFields({ fullName: val })}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={darkTheme.typography.inputLabel}>Nickname *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: darkTheme.colors.card,
                      borderColor: darkTheme.colors.border,
                      color: darkTheme.colors.textMain,
                    },
                  ]}
                  placeholder="Enter nickname"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  value={formData.nickname}
                  onChangeText={(val) => updateFields({ nickname: val })}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={darkTheme.typography.inputLabel}>Email *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: darkTheme.colors.card,
                      borderColor: darkTheme.colors.border,
                      color: darkTheme.colors.textMain,
                    },
                  ]}
                  placeholder="barber@example.com"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  value={formData.email}
                  onChangeText={(val) => updateFields({ email: val })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={darkTheme.typography.inputLabel}>Mobile Number *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: darkTheme.colors.card,
                      borderColor: darkTheme.colors.border,
                      color: darkTheme.colors.textMain,
                    },
                  ]}
                  placeholder="+1 (555) 000-0000"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  value={formData.mobileNumber}
                  onChangeText={(val) => updateFields({ mobileNumber: val })}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={darkTheme.typography.inputLabel}>Date of Birth</Text>
                <View style={styles.dobRow}>
                  <TextInput
                    style={[
                      styles.dobInput,
                      styles.dobDayInput,
                      {
                        backgroundColor: darkTheme.colors.card,
                        borderColor: darkTheme.colors.border,
                        color: darkTheme.colors.textMain,
                      },
                    ]}
                    placeholder="DD"
                    placeholderTextColor={darkTheme.colors.textMuted}
                    value={formData.dobDay}
                    onChangeText={(val) => updateFields({ dobDay: val })}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                  <TextInput
                    style={[
                      styles.dobInput,
                      styles.dobMonthInput,
                      {
                        backgroundColor: darkTheme.colors.card,
                        borderColor: darkTheme.colors.border,
                        color: darkTheme.colors.textMain,
                      },
                    ]}
                    placeholder="MM"
                    placeholderTextColor={darkTheme.colors.textMuted}
                    value={formData.dobMonth}
                    onChangeText={(val) => updateFields({ dobMonth: val })}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                  <TextInput
                    style={[
                      styles.dobInput,
                      styles.dobYearInput,
                      {
                        backgroundColor: darkTheme.colors.card,
                        borderColor: darkTheme.colors.border,
                        color: darkTheme.colors.textMain,
                      },
                    ]}
                    placeholder="YYYY"
                    placeholderTextColor={darkTheme.colors.textMuted}
                    value={formData.dobYear}
                    onChangeText={(val) => updateFields({ dobYear: val })}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                </View>
              </View>
            </View>

            {/* Action Continue Button */}
            <TouchableOpacity
              style={[
                styles.continueButton,
                {
                  backgroundColor: darkTheme.colors.accent,
                  height: darkTheme.layout.buttonHeight,
                },
              ]}
              activeOpacity={0.8}
              onPress={handleNextStep}
            >
              <Text
                style={[
                  darkTheme.typography.btnText,
                  { color: "#000000", fontWeight: "700" },
                ]}
              >
                Next: Services setup
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BasicInfo;

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
  stepContainer: {
    width: "100%",
  },
  photoUploadContainer: {
    alignItems: "center",
    marginBottom: verticalScale(24),
    marginTop: verticalScale(8),
  },
  photoCircle: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: {
    color: "#FFFFFF",
    fontSize: scale(10),
    fontWeight: "500",
    marginTop: verticalScale(4),
  },
  formContainer: {
    gap: verticalScale(16),
    marginBottom: verticalScale(24),
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
  dobRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: verticalScale(6),
  },
  dobInput: {
    height: darkTheme.layout.componentHeight,
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    textAlign: "center",
    fontSize: scale(14),
    fontWeight: "400",
  },
  dobDayInput: {
    width: "22%",
  },
  dobMonthInput: {
    width: "22%",
  },
  dobYearInput: {
    width: "52%",
  },
  continueButton: {
    width: "100%",
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(8),
  },
});
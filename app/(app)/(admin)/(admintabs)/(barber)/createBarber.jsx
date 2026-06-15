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
import { darkTheme } from "../../../../../constants/appTheme";
import {
  CameraIcon,
  LeftArrowIcon,
} from "../../../../../constants/icons";

const CreateBarber = () => {
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <LeftArrowIcon size={scale(22)} color={darkTheme.colors.textMain} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={darkTheme.typography.cardTitle}>Basic Information</Text>
          <Text style={[darkTheme.typography.bodyMuted, { marginTop: verticalScale(1) }]}>
            Step 1 of 2
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { backgroundColor: darkTheme.colors.accent }]} />
            <View style={styles.progressEmpty} />
          </View>

          <View style={styles.photoUploadContainer}>
            <TouchableOpacity
              style={[styles.photoCircle, { backgroundColor: darkTheme.colors.card }]}
              activeOpacity={0.8}
            >
              <CameraIcon size={scale(18)} color={darkTheme.colors.textMain} />
              <Text style={styles.photoText}>Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Full Name *
              </Text>
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
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Nickname *
              </Text>
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
                value={nickname}
                onChangeText={setNickname}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Email *
              </Text>
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
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Mobile Number *
              </Text>
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
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Date of Birth
              </Text>
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
                  value={dobDay}
                  onChangeText={setDobDay}
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
                  value={dobMonth}
                  onChangeText={setDobMonth}
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
                  value={dobYear}
                  onChangeText={setDobYear}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: darkTheme.colors.accent, height: darkTheme.layout.buttonHeight }]}
            activeOpacity={0.8}
          >
            <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
              Continue
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateBarber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingVertical: verticalScale(12),
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitleContainer: {
    alignItems: "center",
    flex: 1,
  },
  headerSpacer: {
    width: scale(36),
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
    marginTop: verticalScale(8),
    marginBottom: verticalScale(24),
  },
  progressFill: {
    flex: 1,
    height: "100%",
    borderTopLeftRadius: scale(2),
    borderBottomLeftRadius: scale(2),
  },
  progressEmpty: {
    flex: 1,
    height: "100%",
  },
  photoUploadContainer: {
    alignItems: "center",
    marginBottom: verticalScale(24),
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
    marginBottom: verticalScale(28),
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
    width: "50%",
  },
  continueButton: {
    width: "100%",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(4),
  },
});
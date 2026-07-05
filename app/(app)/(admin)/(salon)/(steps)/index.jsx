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

// Core Architecture & Design Pattern Imports
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";

const SalonInfoStep = () => {
  const router = useRouter();
  
  // Local state properties dictionary mapping input structures
  const [salonName, setSalonName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
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
            <View style={[styles.progressFill, { backgroundColor: darkTheme.colors.accent }]} />
            <View style={styles.progressEmpty} />
            <View style={styles.progressEmpty} />
            <View style={styles.progressEmpty} />
          </View>

          <View style={styles.formContainer}>
            {/* Input Group: Salon Name */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Salon Name *
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
                placeholder="Enter salon name"
                placeholderTextColor={darkTheme.colors.textMuted}
                value={salonName}
                onChangeText={setSalonName}
                autoCapitalize="words"
              />
            </View>

            {/* Input Group: Description (Multi-line field asset) */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Description
              </Text>
              <TextInput
                style={[
                  styles.textAreaInput,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                  },
                ]}
                placeholder="Tell customers about your salon"
                placeholderTextColor={darkTheme.colors.textMuted}
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top" // Ensures cursor alignment stays locked top-left natively
              />
            </View>

            {/* Input Group: Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Phone Number *
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
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Core Submission Navigation Trigger */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor: darkTheme.colors.accent,
                height: darkTheme.layout.buttonHeight,
              },
            ]}
            activeOpacity={0.8}
            onPress={() => {
              router.push("/businessInformation")
            }}
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
    gap: scale(4), // Even breakdown spacing segmentation between layout ticks
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
    height: verticalScale(100), // Clean height depth box matching description layouts
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    fontSize: scale(14),
    fontWeight: "400",
    marginTop: verticalScale(6),
  },
  nextButton: {
    width: "100%",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    alignItems: "center",
    justifyContent: "center",
  },
});
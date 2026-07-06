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
import { DownIcon } from "../../../../../constants/icons";

const BusinessInformation = () => {
  const router = useRouter();

  // Business structure configurations fields state setup
  const [businessType, setBusinessType] = useState("Barbershop");
  const [address, setAddress] = useState("");

  // Days mapping structure matching the design list completely
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Store operational hours per day dictionary configuration state mapping
  const [hours, setHours] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = { from: "", to: "" };
      return acc;
    }, {})
  );

  const handleHoursChange = (day, field, value) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const applyMondayToAll = () => {
    const mondayHours = hours["Monday"];
    const updatedHours = {};
    daysOfWeek.forEach((day) => {
      updatedHours[day] = { ...mondayHours };
    });
    setHours(updatedHours);
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header
        title={"Business Information"}
        subTitle={"Step 2 of 4"}
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
          {/* Progress Tracking Bar - Step 2 Active Status */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { backgroundColor: darkTheme.colors.accent }]} />
            <View style={[styles.progressFill, { backgroundColor: darkTheme.colors.accent }]} />
            <View style={styles.progressEmpty} />
            <View style={styles.progressEmpty} />
          </View>

          <View style={styles.formContainer}>
            {/* Input Group: Business Type Custom Dropdown Selector View */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>Business Type *</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownContainer,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                    height: darkTheme.layout.componentHeight,
                    borderRadius: darkTheme.layout.borderRadiusMedium,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text style={[darkTheme.typography.bodyMain, { color: darkTheme.colors.textMain }]}>
                  {businessType}
                </Text>
                <DownIcon size={scale(16)} color={darkTheme.colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Input Group: Address Search Block */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>Address *</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                    height: darkTheme.layout.componentHeight,
                    borderRadius: darkTheme.layout.borderRadiusMedium,
                  },
                ]}
                placeholder="Search for address"
                placeholderTextColor={darkTheme.colors.textMuted}
                value={address}
                onChangeText={setAddress}
              />
            </View>

            {/* Input Group Section Header: Opening Hours with Apply All Feature Action */}
            <View style={styles.inputGroup}>
              <View style={styles.hoursSectionHeader}>
                <Text style={darkTheme.typography.inputLabel}>Opening Hours *</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={applyMondayToAll}>
                  <Text style={[styles.applyAllText, { color: darkTheme.colors.accent }]}>
                    Apply Monday to All
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Dynamic Operational Hours List Builder Grid */}
              <View style={styles.hoursListContainer}>
                {daysOfWeek.map((day) => (
                  <View key={day} style={styles.hourRowItem}>
                    <View style={styles.dayTextContainer}>
                      <Text style={darkTheme.typography.bodyMain}>{day}</Text>
                    </View>

                    <View style={styles.hoursInputsWrapper}>
                      <TextInput
                        style={[
                          styles.timeInput,
                          {
                            backgroundColor: darkTheme.colors.card,
                            borderColor: darkTheme.colors.border,
                            color: darkTheme.colors.textMain,
                            height: darkTheme.layout.componentHeight,
                            borderRadius: darkTheme.layout.borderRadiusMedium,
                          },
                        ]}
                        placeholder="09:00 AM"
                        placeholderTextColor={darkTheme.colors.textMuted}
                        value={hours[day].from}
                        onChangeText={(val) => handleHoursChange(day, "from", val)}
                      />
                      <Text style={[darkTheme.typography.bodyMuted, styles.toLabelText]}>to</Text>
                      <TextInput
                        style={[
                          styles.timeInput,
                          {
                            backgroundColor: darkTheme.colors.card,
                            borderColor: darkTheme.colors.border,
                            color: darkTheme.colors.textMain,
                            height: darkTheme.layout.componentHeight,
                            borderRadius: darkTheme.layout.borderRadiusMedium,
                          },
                        ]}
                        placeholder="07:00 PM"
                        placeholderTextColor={darkTheme.colors.textMuted}
                        value={hours[day].to}
                        onChangeText={(val) => handleHoursChange(day, "to", val)}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Form Action Next Page Trigger Controller */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor: darkTheme.colors.accent,
                height: darkTheme.layout.buttonHeight,
                borderRadius: darkTheme.layout.borderRadiusMedium,
              },
            ]}
            activeOpacity={0.8}
            onPress={() => {
              router.push('/selectServices');
              // Action routing sequence pipeline link goes here
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

export default BusinessInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(44), // Breathable safety room offset below list elements
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
    gap: verticalScale(20),
    marginBottom: verticalScale(32),
  },
  inputGroup: {
    width: "100%",
  },
  dropdownContainer: {
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: scale(14),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(6),
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: scale(14),
    fontSize: scale(14),
    fontWeight: "400",
    marginTop: verticalScale(6),
  },
  hoursSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  applyAllText: {
    fontSize: scale(11),
    fontWeight: "600",
  },
  hoursListContainer: {
    gap: verticalScale(10),
    marginTop: verticalScale(4),
  },
  hourRowItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  dayTextContainer: {
    width: "30%",
  },
  hoursInputsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    gap: scale(8),
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    textAlign: "center",
    fontSize: scale(13),
    fontWeight: "400",
  },
  toLabelText: {
    fontSize: scale(12),
    paddingHorizontal: scale(2),
  },
  nextButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
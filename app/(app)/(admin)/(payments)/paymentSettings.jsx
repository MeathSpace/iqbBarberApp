import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../components/Header/Header"; // Adjust relative path as needed
import { darkTheme } from "../../../../constants/appTheme";

const PERCENTAGE_OPTIONS = ["10%", "20%", "30%", "50%", "100%"];

const PaymentSettings = () => {
  const [isQueuePaymentEnabled, setIsQueuePaymentEnabled] = useState(false);
  const [queuePercentage, setQueuePercentage] = useState("10%");

  const [isAppointmentPaymentEnabled, setIsAppointmentPaymentEnabled] = useState(false);
  const [appointmentPercentage, setAppointmentPercentage] = useState("10%");

  // Render method bound strictly to darkTheme tokens matching Screenshot 2026-07-05 at 4.44.09 PM.jpg
  const renderPercentageOptions = (selectedOption, onSelect) => (
    <View style={styles.advancePaymentContainer}>
      <Text style={[darkTheme.typography.bodyMuted, styles.advancePaymentLabel]}>
        Advance Payment
      </Text>
      <View style={styles.percentageRow}>
        {PERCENTAGE_OPTIONS.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.8}
              onPress={() => onSelect(option)}
              style={[
                styles.percentageChip,
                {
                  backgroundColor: isSelected ? "rgba(255, 149, 0, 0.1)" : darkTheme.colors.background,
                  borderColor: isSelected ? darkTheme.colors.accent : darkTheme.colors.border,
                }
              ]}
            >
              <Text
                style={[
                  styles.percentageText,
                  {
                    color: isSelected ? darkTheme.colors.accent : darkTheme.colors.textMuted,
                    fontWeight: isSelected ? "700" : "500",
                  }
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header 
        title="Payment Settings" 
        subTitle="Manage advance payment options for queue and appointments" 
        showBack={true} 
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.contentWrapper}>
          
          {/* Queue Payment Setting */}
          <View 
            style={[
              styles.settingCard, 
              { 
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
                borderRadius: darkTheme.layout.borderRadiusMedium,
              }
            ]}
          >
            <View style={styles.mainRow}>
              <View style={styles.textContainer}>
                <Text style={[darkTheme.typography.cardTitle, styles.settingTitle, { color: darkTheme.colors.textMain }]}>
                  Queue Payment
                </Text>
                <Text style={[darkTheme.typography.bodyMuted, styles.settingDescription, { color: darkTheme.colors.textMuted }]}>
                  Collect advance payment for walk-in queue bookings
                </Text>
              </View>
              
              <Switch
                value={isQueuePaymentEnabled}
                onValueChange={setIsQueuePaymentEnabled}
                trackColor={{ false: darkTheme.colors.border, true: darkTheme.colors.accent }}
                thumbColor="#FFFFFF"
                ios_backgroundColor={darkTheme.colors.border}
              />
            </View>

            {isQueuePaymentEnabled && renderPercentageOptions(queuePercentage, setQueuePercentage)}
          </View>

          {/* Appointment Payment Setting */}
          <View 
            style={[
              styles.settingCard, 
              { 
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
                borderRadius: darkTheme.layout.borderRadiusMedium,
              }
            ]}
          >
            <View style={styles.mainRow}>
              <View style={styles.textContainer}>
                <Text style={[darkTheme.typography.cardTitle, styles.settingTitle, { color: darkTheme.colors.textMain }]}>
                  Appointment Payment
                </Text>
                <Text style={[darkTheme.typography.bodyMuted, styles.settingDescription, { color: darkTheme.colors.textMuted }]}>
                  Collect advance payment for scheduled appointments
                </Text>
              </View>
              
              <Switch
                value={isAppointmentPaymentEnabled}
                onValueChange={setIsAppointmentPaymentEnabled}
                trackColor={{ false: darkTheme.colors.border, true: darkTheme.colors.accent }}
                thumbColor="#FFFFFF"
                ios_backgroundColor={darkTheme.colors.border}
              />
            </View>

            {isAppointmentPaymentEnabled && renderPercentageOptions(appointmentPercentage, setAppointmentPercentage)}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
  },
  contentWrapper: {
    width: "100%",
    marginTop: verticalScale(10),
    gap: verticalScale(16),
  },
  settingCard: {
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  textContainer: {
    flex: 1,
    paddingRight: scale(16),
  },
  settingTitle: {
    fontSize: scale(15),
    fontWeight: "600",
  },
  settingDescription: {
    marginTop: verticalScale(4),
    fontSize: scale(12),
    lineHeight: scale(16),
  },
  advancePaymentContainer: {
    marginTop: verticalScale(16),
    width: "100%",
  },
  advancePaymentLabel: {
    fontSize: scale(11),
    fontWeight: "500",
    marginBottom: verticalScale(8),
  },
  percentageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  percentageChip: {
    flex: 1,
    height: verticalScale(32),
    borderRadius: scale(6),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontSize: scale(12),
  },
});
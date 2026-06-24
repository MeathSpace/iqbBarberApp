import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../components/Header/Header"; // Adjust relative path as needed
import { darkTheme } from "../../../../constants/appTheme";

const PaymentSettings = () => {
  const [isQueuePaymentEnabled, setIsQueuePaymentEnabled] = useState(false);
  const [isAppointmentPaymentEnabled, setIsAppointmentPaymentEnabled] = useState(false);

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      {/* Structural Header Component */}
      <Header 
        title="Payment Settings" 
        subTitle="Manage advance payment options for queue and appointments" 
        showBack={true} 
      />

      {/* Main Content Layout Container */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.contentWrapper}>
          
          {/* Queue Payment Setting Row Item */}
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
            <View style={styles.textContainer}>
              <Text style={[darkTheme.typography.cardTitle, styles.settingTitle]}>
                Queue Payment
              </Text>
              <Text style={[darkTheme.typography.bodyMuted, styles.settingDescription]}>
                Collect advance payment for walk-in queue bookings
              </Text>
            </View>
            
            <Switch
              value={isQueuePaymentEnabled}
              onValueChange={setIsQueuePaymentEnabled}
              trackColor={{ false: "#3A3A3C", true: darkTheme.colors.accent }}
              thumbColor={Platform.OS === "ios" ? "#FFFFFF" : isQueuePaymentEnabled ? "#FFFFFF" : "#E5E5EA"}
              ios_backgroundColor="#3A3A3C"
            />
          </View>

          {/* Appointment Payment Setting Row Item */}
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
            <View style={styles.textContainer}>
              <Text style={[darkTheme.typography.cardTitle, styles.settingTitle]}>
                Appointment Payment
              </Text>
              <Text style={[darkTheme.typography.bodyMuted, styles.settingDescription]}>
                Collect advance payment for scheduled appointments
              </Text>
            </View>
            
            <Switch
              value={isAppointmentPaymentEnabled}
              onValueChange={setIsAppointmentPaymentEnabled}
              trackColor={{ false: "#3A3A3C", true: darkTheme.colors.accent }}
              thumbColor={Platform.OS === "ios" ? "#FFFFFF" : isAppointmentPaymentEnabled ? "#FFFFFF" : "#E5E5EA"}
              ios_backgroundColor="#3A3A3C"
            />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
  },
  textContainer: {
    flex: 1,
    paddingRight: scale(16),
  },
  settingTitle: {
    fontSize: scale(15),
  },
  settingDescription: {
    marginTop: verticalScale(4),
    fontSize: scale(12),
    lineHeight: scale(16),
  },
});
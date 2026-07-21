import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Shimmer from "react-native-modern-shimmer";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../components/Header/Header";
import { darkTheme } from "../../../../constants/appTheme";
import { useAdminAuth } from "../../../../context/admin/AuthContext";
import api from "../../../../utils/api";

const PERCENTAGE_OPTIONS = [10, 20, 30, 50, 100];

const SKELETON_COLORS = {
  header: {
    baseColor: "#221f1c",
    highlightColor: "#332e2a",
  },
  card: {
    baseColor: "#1c1c1e",
    highlightColor: "#2c2c2e",
  },
  typography: {
    baseColor: "#2c2c2e",
    highlightColor: "#3a3a3c",
  },
  chip: {
    baseColor: "#2a2a2a",
    highlightColor: "#333333",
  },
};

const parsePercentNumber = (val) => {
  if (val === undefined || val === null) return 10;
  const num = parseInt(String(val).replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? 10 : num;
};

const ScreenSkeletonView = () => {
  return (
    <View style={styles.contentWrapper}>
      {[1, 2].map((key) => (
        <View
          key={key}
          style={[
            styles.settingCard,
            {
              backgroundColor: darkTheme.colors.card,
              borderColor: darkTheme.colors.border,
              borderRadius: darkTheme.layout.borderRadiusMedium,
            },
          ]}
        >
          <View style={styles.mainRow}>
            <View style={styles.textContainer}>
              <Shimmer
                width={scale(130)}
                height={verticalScale(15)}
                borderRadius={scale(4)}
                baseColor={SKELETON_COLORS.typography.baseColor}
                highlightColor={SKELETON_COLORS.typography.highlightColor}
              />
              <Shimmer
                width={scale(210)}
                height={verticalScale(12)}
                borderRadius={scale(4)}
                style={{ marginTop: verticalScale(6) }}
                baseColor={SKELETON_COLORS.typography.baseColor}
                highlightColor={SKELETON_COLORS.typography.highlightColor}
              />
            </View>

            <Shimmer
              width={scale(44)}
              height={verticalScale(24)}
              borderRadius={scale(12)}
              baseColor={SKELETON_COLORS.chip.baseColor}
              highlightColor={SKELETON_COLORS.chip.highlightColor}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const PaymentSettings = () => {
  const { authenticatedUser } = useAdminAuth();
  const salonId = authenticatedUser?.salonId;

  const [isQueuePaymentEnabled, setIsQueuePaymentEnabled] = useState(false);
  const [queuePercentage, setQueuePercentage] = useState(10);

  const [isAppointmentPaymentEnabled, setIsAppointmentPaymentEnabled] =
    useState(false);
  const [appointmentPercentage, setAppointmentPercentage] = useState(10);

  const [fetchPaymentLoading, setFetchPaymentLoading] = useState(true);

  const fetchPaymentSettings = async () => {
    if (!salonId) return;

    try {
      setFetchPaymentLoading(true);
      const { data } = await api.get(
        `/salon/getPaymentSettings?salonId=${salonId}`,
      );
      const settings = data?.response || [];

      settings.forEach((item) => {
        const numericPercent = parsePercentNumber(item.advancePaymentPercent);

        if (item.type === "queue") {
          setIsQueuePaymentEnabled(Boolean(item.enabled));
          setQueuePercentage(numericPercent);
        }

        if (item.type === "appointment") {
          setIsAppointmentPaymentEnabled(Boolean(item.enabled));
          setAppointmentPercentage(numericPercent);
        }
      });
    } catch (error) {
      console.error("Failed to fetch payment settings:", error);
    } finally {
      setFetchPaymentLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentSettings();
  }, [salonId]);

  const updatePaymentSettings = async ({
    isEnabled,
    type,
    advancePaymentPercent,
  }) => {
    if (!salonId) return;

    try {
      await api.post("/salon/updatePaymentSettings", {
        salonId,
        isEnabled,
        type,
        advancePaymentPercent,
      });
    } catch (error) {
      console.error("Payment settings update failed:", error);
    }
  };

  const handleToggle = (type, enabled) => {
    if (type === "queue") {
      setIsQueuePaymentEnabled(enabled);
      updatePaymentSettings({
        isEnabled: enabled,
        type,
        advancePaymentPercent: queuePercentage,
      });
    } else {
      setIsAppointmentPaymentEnabled(enabled);
      updatePaymentSettings({
        isEnabled: enabled,
        type,
        advancePaymentPercent: appointmentPercentage,
      });
    }
  };

  const handlePercentageSelect = (type, percent) => {
    if (type === "queue") {
      setQueuePercentage(percent);
      updatePaymentSettings({
        isEnabled: isQueuePaymentEnabled,
        type,
        advancePaymentPercent: percent,
      });
    } else {
      setAppointmentPercentage(percent);
      updatePaymentSettings({
        isEnabled: isAppointmentPaymentEnabled,
        type,
        advancePaymentPercent: percent,
      });
    }
  };

  const renderPercentageOptions = (selectedOption, onSelect) => (
    <View style={styles.advancePaymentContainer}>
      <Text
        style={[darkTheme.typography.bodyMuted, styles.advancePaymentLabel]}
      >
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
                  backgroundColor: isSelected
                    ? "rgba(255, 149, 0, 0.1)"
                    : darkTheme.colors.background,
                  borderColor: isSelected
                    ? darkTheme.colors.accent
                    : darkTheme.colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.percentageText,
                  {
                    color: isSelected
                      ? darkTheme.colors.accent
                      : darkTheme.colors.textMuted,
                    fontWeight: isSelected ? "700" : "500",
                  },
                ]}
              >
                {option}%
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
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header
        title="Payment Settings"
        subTitle="Manage advance payment options"
        showBack={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {fetchPaymentLoading ? (
          <ScreenSkeletonView />
        ) : (
          <View style={styles.contentWrapper}>
            <View
              style={[
                styles.settingCard,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                },
              ]}
            >
              <View style={styles.mainRow}>
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      darkTheme.typography.cardTitle,
                      styles.settingTitle,
                      { color: darkTheme.colors.textMain },
                    ]}
                  >
                    Queue Payment
                  </Text>
                  <Text
                    style={[
                      darkTheme.typography.bodyMuted,
                      styles.settingDescription,
                      { color: darkTheme.colors.textMuted },
                    ]}
                  >
                    Collect advance payment for walk-in queue bookings
                  </Text>
                </View>

                <Switch
                  value={isQueuePaymentEnabled}
                  onValueChange={(val) => handleToggle("queue", val)}
                  trackColor={{
                    false: darkTheme.colors.border,
                    true: darkTheme.colors.accent,
                  }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor={darkTheme.colors.border}
                />
              </View>

              {isQueuePaymentEnabled &&
                renderPercentageOptions(queuePercentage, (percent) =>
                  handlePercentageSelect("queue", percent),
                )}
            </View>

            <View
              style={[
                styles.settingCard,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                },
              ]}
            >
              <View style={styles.mainRow}>
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      darkTheme.typography.cardTitle,
                      styles.settingTitle,
                      { color: darkTheme.colors.textMain },
                    ]}
                  >
                    Appointment Payment
                  </Text>
                  <Text
                    style={[
                      darkTheme.typography.bodyMuted,
                      styles.settingDescription,
                      { color: darkTheme.colors.textMuted },
                    ]}
                  >
                    Collect advance payment for scheduled appointments
                  </Text>
                </View>

                <Switch
                  value={isAppointmentPaymentEnabled}
                  onValueChange={(val) => handleToggle("appointment", val)}
                  trackColor={{
                    false: darkTheme.colors.border,
                    true: darkTheme.colors.accent,
                  }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor={darkTheme.colors.border}
                />
              </View>

              {isAppointmentPaymentEnabled &&
                renderPercentageOptions(appointmentPercentage, (percent) =>
                  handlePercentageSelect("appointment", percent),
                )}
            </View>
          </View>
        )}
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
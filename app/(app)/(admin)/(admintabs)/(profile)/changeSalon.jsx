import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import ThemeTextPrimary from "../../../../../components/ThemeTextPrimary";
import ThemeTextSecondary from "../../../../../components/ThemeTextSecondary";

const ChangeSalon = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const [selectedSalon, setSelectedSalon] = useState("");

  const salonList = [
    "The Style Studio",
    "Urban Edge Salon",
    "Bliss & Glow",
    "Velvet Scissors",
    "Golden Comb",
    "Elegance Hair Lounge",
    "Radiance Salon & Spa",
    "The Cutting Room",
    "Lavish Locks",
    "Pure Essence Salon",
    "Serenity Hair Studio",
    "Glam District",
    "Mirror & Mane",
    "Luxe Beauty Bar",
    "Chic Avenue Salon",
  ];

  return (
    <View style={styles.overlay}>
      {/* Background tap area */}
      <TouchableWithoutFeedback onPress={() => router.back()}>
        <View style={StyleSheet.absoluteFillObject} />
      </TouchableWithoutFeedback>

      {/* Modal container */}
      <View
        style={[styles.modalContainer, { backgroundColor: colors.background }]}
      >
        {/* Title */}
        <ThemeTextPrimary style={styles.title}>Change Salon</ThemeTextPrimary>

        {/* Description */}
        <ThemeTextSecondary style={styles.description}>
          Switch your active connection by selecting a salon from the list
          below.
        </ThemeTextSecondary>

        {/* Selected salon field */}
        <View
          style={[
            styles.inputField,
            {
              backgroundColor: colors.inputColor,
              borderColor: colors.borderColor1,
            },
          ]}
        >
          {selectedSalon ? (
            <ThemeTextPrimary>{selectedSalon}</ThemeTextPrimary>
          ) : (
            <ThemeTextSecondary>Choose your salon</ThemeTextSecondary>
          )}
        </View>

        {/* Scrollable salon list */}
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={[
            styles.scrollBox,
            {
              backgroundColor: colors.inputColor,
              borderColor: colors.borderColor1,
            },
          ]}
          contentContainerStyle={{
            gap: verticalScale(10),
            padding: scale(15)
          }}
        >
          {salonList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedSalon(item)}
              >
                <ThemeTextPrimary>{item}</ThemeTextPrimary>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#14b8a6" }]}
            onPress={() => {
              // Handle Change salon logic
              router.back();
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.progressBgColor }]}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: colors.textColor1 }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangeSalon;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  modalContainer: {
    width: "100%",
    borderRadius: scale(16),
    padding: scale(20),
    maxHeight: "80%", // ✅ allows ScrollView to work correctly
  },
  title: {
    fontSize: scale(18),
    fontFamily: "AirbnbCereal_W_Bd",
    marginBottom: verticalScale(10),
  },
  description: {
    fontSize: scale(14),
    marginBottom: verticalScale(20),
  },
  inputField: {
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
  },
  scrollBox: {
    height: verticalScale(200),
    borderWidth: scale(1),
    borderRadius: scale(8),
    marginVertical: verticalScale(10),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(10),
    marginTop: verticalScale(10),
  },
  button: {
    flex: 1,
    borderRadius: scale(8),
    paddingVertical: verticalScale(10),
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(14),
    fontWeight: "500",
  },
});

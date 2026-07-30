import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";
import SalonProgressBar from "../../../../../components/Progess/SalonProgessBar";

// GOOGLE MAPS API KEY (Required for Google Places Autocomplete)
const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const SALON_TYPE_OPTIONS = [
  { label: "Barber Shop", value: "Barber Shop" },
  { label: "Hair Dresser", value: "Hair Dresser" },
];

const DEFAULT_COORDINATES = {
  lattitude: 22.9431,
  longitude: 88.4361,
};

const BusinessInformation = () => {
  const router = useRouter();
  const { salonBusinessInfo, setSalonBusinessInfo } = useAdminGlobal();
  const mapRef = useRef(null);

  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState("");
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [locationAddress, setLocationAddress] = useState(
    "Dangapara, Rahara, Kanchrapara, India - 743145",
  );

  const currentLat =
    parseFloat(salonBusinessInfo?.salonCoordinates?.lattitude) ||
    DEFAULT_COORDINATES.lattitude;
  const currentLng =
    parseFloat(salonBusinessInfo?.salonCoordinates?.longitude) ||
    DEFAULT_COORDINATES.longitude;

  // --- REVERSE GEOCODING: Convert Lat/Lng to Human Readable Address ---
  const fetchAddressFromCoords = async (lat, lng) => {
    try {
      setIsAddressLoading(true);
      const [addressResult] = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lng,
      });

      if (addressResult) {
        const formattedAddress = [
          addressResult.name,
          addressResult.street,
          addressResult.district,
          addressResult.city,
          addressResult.region,
          addressResult.postalCode,
          addressResult.country,
        ]
          .filter(Boolean)
          .join(", ");

        setLocationAddress(formattedAddress || "Address not found");
      }
    } catch (err) {
      console.warn("Error reverse geocoding:", err);
    } finally {
      setIsAddressLoading(false);
    }
  };

  const handleTypeChange = (item) => {
    setSalonBusinessInfo((prev) => ({
      ...prev,
      salonBusinessType: item.value,
    }));
    if (error) setError("");
  };

  // Update global coordinates, animate camera, and reverse-geocode
  const updateCoordinates = (lat, lng) => {
    setSalonBusinessInfo((prev) => ({
      ...prev,
      salonCoordinates: {
        lattitude: String(lat),
        longitude: String(lng),
      },
    }));

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        },
        300,
      );
    }

    // Fetch dynamic address
    fetchAddressFromCoords(lat, lng);
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    updateCoordinates(latitude, longitude);
  };

  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    updateCoordinates(latitude, longitude);
  };

  const handleResetLocation = () => {
    updateCoordinates(
      DEFAULT_COORDINATES.lattitude,
      DEFAULT_COORDINATES.longitude,
    );
  };

  const handleNextStep = () => {
    if (!salonBusinessInfo?.salonBusinessType?.trim()) {
      setError("Please select a business type.");
      return;
    }
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
          keyboardShouldPersistTaps="handled"
        >
          <SalonProgressBar currentStep={2} totalSteps={5} />

          <View style={styles.formContainer}>
            {/* Salon Business Type Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Salon Business Type
              </Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: error
                      ? "#EF4444"
                      : isFocus
                        ? darkTheme.colors.accent
                        : darkTheme.colors.border,
                  },
                ]}
                placeholderStyle={[
                  styles.placeholderStyle,
                  { color: darkTheme.colors.textMuted },
                ]}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: darkTheme.colors.textMain },
                ]}
                containerStyle={[
                  styles.dropdownMenuContainer,
                  {
                    backgroundColor: "#0A0A0C",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
                itemContainerStyle={styles.dropdownItemContainer}
                itemTextStyle={[
                  styles.dropdownItemText,
                  { color: darkTheme.colors.textMain },
                ]}
                activeColor="rgba(255, 149, 0, 0.08)"
                data={SALON_TYPE_OPTIONS}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select business type" : "..."}
                value={salonBusinessInfo?.salonBusinessType || ""}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={handleTypeChange}
                renderRightIcon={() => (
                  <Ionicons
                    name="chevron-down"
                    size={scale(16)}
                    color={
                      isFocus
                        ? darkTheme.colors.accent
                        : darkTheme.colors.textMuted
                    }
                  />
                )}
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            {/* Map Card Container */}
            <View
              style={[
                styles.mapCard,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                },
              ]}
            >
              {/* Google Places Autocomplete Input */}
              <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                  placeholder="Search city, address, or place..."
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    console.log("=== ON PRESS FIRED ===");
                    console.log("Selected Place Data:", data);
                    console.log("Selected Place Details:", details);

                    if (details?.geometry?.location) {
                      const { lat, lng } = details.geometry.location;
                      console.log(
                        `Updating Map Coordinates -> Lat: ${lat}, Lng: ${lng}`,
                      );
                      updateCoordinates(lat, lng);
                    } else {
                      console.warn(
                        "No geometry/location found in details object!",
                      );
                    }
                  }}
                  onFail={(error) => {
                    // Fires if API key fails, CORS is blocked, or network fails
                    console.error("=== GOOGLE PLACES API ERROR ===", error);
                  }}
                  onNotFound={() => {
                    console.warn("=== NO PLACES FOUND FOR QUERY ===");
                  }}
                  onTimeout={() => {
                    console.warn("=== GOOGLE PLACES REQUEST TIMED OUT ===");
                  }}
                  query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: "en",
                  }}
                  // Handles CORS restrictions on React Native Web
                  requestUrl={
                    Platform.OS === "web"
                      ? {
                          useGooglePlacesSearchAPIMD5: false,
                          url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place",
                        }
                      : undefined
                  }
                  styles={{
                    textInputContainer: styles.searchBar,
                    textInput: [
                      styles.searchInput,
                      { color: darkTheme.colors.textMain },
                    ],
                    listView: styles.autocompleteListView,
                    row: styles.autocompleteRow,
                    description: { color: "#FFFFFF" },
                  }}
                  enablePoweredByContainer={false}
                />
              </View>

              {/* Map Preview Canvas */}
              <View style={styles.mapWrapper}>
                <MapView
                  ref={mapRef}
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  onPress={handleMapPress}
                  region={{
                    latitude: currentLat,
                    longitude: currentLng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.015,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: currentLat,
                      longitude: currentLng,
                    }}
                    draggable
                    pinColor={darkTheme.colors.accent}
                    onDragEnd={handleMarkerDragEnd}
                  />
                </MapView>

                {/* Recenter Button */}
                <TouchableOpacity
                  style={styles.mapOverlayBottomRight}
                  activeOpacity={0.8}
                  onPress={() => {
                    if (mapRef.current) {
                      mapRef.current.animateToRegion(
                        {
                          latitude: currentLat,
                          longitude: currentLng,
                          latitudeDelta: 0.015,
                          longitudeDelta: 0.015,
                        },
                        400,
                      );
                    }
                  }}
                >
                  <Ionicons
                    name="navigate-outline"
                    size={scale(16)}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>

              {/* Location Description Text */}
              <View style={styles.locationContainer}>
                {isAddressLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={darkTheme.colors.accent}
                  />
                ) : (
                  <Text
                    style={[
                      styles.locationText,
                      { color: darkTheme.colors.textMain },
                    ]}
                  >
                    <Text style={{ fontWeight: "700" }}>Location: </Text>
                    {locationAddress}
                  </Text>
                )}
              </View>

              {/* Action Buttons Row */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.resetButton, { backgroundColor: "#27272A" }]}
                  activeOpacity={0.8}
                  onPress={handleResetLocation}
                >
                  <Text
                    style={[
                      styles.resetButtonText,
                      { color: darkTheme.colors.textMain },
                    ]}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.continueButton,
                    { backgroundColor: darkTheme.colors.accent },
                  ]}
                  activeOpacity={0.85}
                  onPress={handleNextStep}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BusinessInformation;

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardContainer: { flex: 1 },
  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
  },
  formContainer: { gap: verticalScale(16) },
  inputGroup: { width: "100%" },
  dropdown: {
    width: "100%",
    height: darkTheme.layout.componentHeight,
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    paddingHorizontal: scale(14),
    marginTop: verticalScale(6),
  },
  placeholderStyle: { fontSize: scale(14) },
  selectedTextStyle: { fontSize: scale(14), fontWeight: "400" },
  dropdownMenuContainer: {
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    marginTop: verticalScale(4),
    overflow: "hidden",
  },
  dropdownItemContainer: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
  },
  dropdownItemText: { fontSize: scale(14) },
  errorText: {
    color: "#EF4444",
    fontSize: scale(11),
    marginTop: verticalScale(4),
  },

  mapCard: {
    width: "100%",
    borderRadius: scale(12),
    borderWidth: 1,
    padding: scale(12),
    gap: verticalScale(12),
    zIndex: 10,
  },
  searchContainer: {
    zIndex: 1000,
    elevation: 5,
  },
  searchBar: {
    backgroundColor: "#18181B",
    borderColor: darkTheme.colors.border,
    borderWidth: 1,
    borderRadius: scale(8),
  },
  searchInput: {
    fontSize: scale(13),
    backgroundColor: "transparent",
    height: verticalScale(38),
  },
  autocompleteListView: {
    backgroundColor: "#18181B",
    borderRadius: scale(8),
    borderColor: darkTheme.colors.border,
    borderWidth: 1,
    marginTop: 4,
  },
  autocompleteRow: {
    backgroundColor: "#18181B",
    padding: scale(10),
  },
  mapWrapper: {
    width: "100%",
    height: verticalScale(220),
    borderRadius: scale(8),
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
  },
  map: { width: "100%", height: "100%" },
  mapOverlayBottomRight: {
    position: "absolute",
    bottom: scale(8),
    right: scale(8),
    backgroundColor: "#FFFFFF",
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  locationContainer: {
    minHeight: verticalScale(24),
    justifyContent: "center",
  },
  locationText: {
    fontSize: scale(11),
    lineHeight: scale(15),
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: scale(10),
  },
  resetButton: {
    flex: 1,
    height: verticalScale(36),
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  resetButtonText: { fontSize: scale(13), fontWeight: "500" },
  continueButton: {
    flex: 1,
    height: verticalScale(36),
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#000000",
    fontSize: scale(13),
    fontWeight: "600",
  },
});

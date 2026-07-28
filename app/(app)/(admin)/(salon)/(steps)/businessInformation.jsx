import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

// Core Architecture & Design Pattern Imports
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";

const SALON_TYPE_OPTIONS = [
  { label: "Barber Shop", value: "Barber Shop" },
  { label: "Hair Dresser", value: "Hair Dresser" },
];

const BusinessInformation = () => {
  const router = useRouter();
  const { salonBusinessInfo, setSalonBusinessInfo } = useAdminGlobal();

  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState("");

  const handleTypeChange = (item) => {
    setSalonBusinessInfo((prev) => ({
      ...prev,
      salonBusinessType: item.value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleNextStep = () => {
    if (!salonBusinessInfo?.salonBusinessType?.trim()) {
      setError("Please select a business type.");
      return;
    }

    // Console log global state data prior to navigation
    console.log("Step 2 Business Information Data:", salonBusinessInfo);

    // Proceed to Step 3
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
        >
          {/* Multi-Step Horizontal Linear Progress Bar (Step 2 of 4 Active) */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: darkTheme.colors.accent },
              ]}
            />
            <View
              style={[
                styles.progressFill,
                { backgroundColor: darkTheme.colors.accent },
              ]}
            />
            <View style={styles.progressEmpty} />
            <View style={styles.progressEmpty} />
          </View>

          <View style={styles.formContainer}>
            {/* Dropdown Group: Business Type */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Business Type
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
          </View>

          {/* Submission Navigation Trigger */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor: darkTheme.colors.accent,
                height: darkTheme.layout.buttonHeight,
              },
            ]}
            activeOpacity={0.8}
            onPress={handleNextStep}
          >
            <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
              Next: Services
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
    paddingBottom: verticalScale(32),
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
    gap: verticalScale(18),
    marginBottom: verticalScale(32),
  },
  inputGroup: {
    width: "100%",
  },
  dropdown: {
    width: "100%",
    height: darkTheme.layout.componentHeight,
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    paddingHorizontal: scale(14),
    marginTop: verticalScale(6),
  },
  placeholderStyle: {
    fontSize: scale(14),
  },
  selectedTextStyle: {
    fontSize: scale(14),
    fontWeight: "400",
  },
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
  dropdownItemText: {
    fontSize: scale(14),
  },
  errorText: {
    color: "#EF4444",
    fontSize: scale(11),
    marginTop: verticalScale(4),
  },
  nextButton: {
    width: "100%",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    alignItems: "center",
    justifyContent: "center",
  },
});

// import { Ionicons } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Dropdown } from "react-native-element-dropdown";
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";

// // Core Architecture & Design Pattern Imports
// import Header from "../../../../../components/Header/Header";
// import { darkTheme } from "../../../../../constants/appTheme";
// import { useAdminGlobal } from "../../../../../context/admin/GlobalContext";

// // Replace with your actual Google Maps API Key
// const GOOGLE_MAPS_APIKEY = "YOUR_GOOGLE_MAPS_API_KEY";

// const SALON_TYPE_OPTIONS = [
//   { label: "Barber Shop", value: "Barber Shop" },
//   { label: "Hair Dresser", value: "Hair Dresser" },
// ];

// const INITIAL_REGION = {
//   latitude: 22.9575,
//   longitude: 88.4556,
//   latitudeDelta: 0.05,
//   longitudeDelta: 0.05,
// };

// const BusinessInformation = () => {
//   const router = useRouter();
//   const { salonBusinessInfo, setSalonBusinessInfo } = useAdminGlobal();

//   const [isFocus, setIsFocus] = useState(false);
//   const [error, setError] = useState("");
//   const [address, setAddress] = useState("Loading address...");
//   const [isGeocoding, setIsGeocoding] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [userLocation, setUserLocation] = useState(null);

//   const selectedCoordinates = {
//     latitude:
//       parseFloat(salonBusinessInfo?.salonCoordinates?.lattitude) ||
//       INITIAL_REGION.latitude,
//     longitude:
//       parseFloat(salonBusinessInfo?.salonCoordinates?.longitude) ||
//       INITIAL_REGION.longitude,
//   };

//   // Fetch current user position and reverse geocode
//   useEffect(() => {
//     (async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           setAddress("Location permission denied");
//           return;
//         }

//         const currentPos = await Location.getCurrentPositionAsync({});
//         if (currentPos?.coords) {
//           setUserLocation({
//             latitude: currentPos.coords.latitude,
//             longitude: currentPos.coords.longitude,
//           });
//         }

//         fetchAddress(selectedCoordinates.latitude, selectedCoordinates.longitude);
//       } catch (err) {
//         setAddress("Error requesting location permissions");
//       }
//     })();
//   }, [
//     salonBusinessInfo?.salonCoordinates?.lattitude,
//     salonBusinessInfo?.salonCoordinates?.longitude,
//   ]);

//   const fetchAddress = async (lat, lng) => {
//     setIsGeocoding(true);
//     try {
//       const result = await Location.reverseGeocodeAsync({
//         latitude: lat,
//         longitude: lng,
//       });

//       if (result && result.length > 0) {
//         const item = result[0];
//         const formattedAddress = [
//           item.name,
//           item.street,
//           item.district || item.subregion,
//           item.city,
//           item.region,
//           item.postalCode,
//           item.country,
//         ]
//           .filter(Boolean)
//           .join(", ");

//         setAddress(formattedAddress || "Unknown location");
//       } else {
//         setAddress("Location details unavailable");
//       }
//     } catch (err) {
//       setAddress("Error resolving location");
//     } finally {
//       setIsGeocoding(false);
//     }
//   };

//   const handleTypeChange = (item) => {
//     setSalonBusinessInfo((prev) => ({
//       ...prev,
//       salonBusinessType: item.value,
//     }));

//     if (error) setError("");
//   };

//   const updateCoordinates = (lat, lng) => {
//     setSalonBusinessInfo((prev) => ({
//       ...prev,
//       salonCoordinates: {
//         lattitude: lat.toString(),
//         longitude: lng.toString(),
//       },
//     }));
//   };

//   const handleMapPress = (e) => {
//     const { latitude, longitude } = e.nativeEvent.coordinate;
//     updateCoordinates(latitude, longitude);
//   };

//   const handleResetLocation = () => {
//     updateCoordinates(INITIAL_REGION.latitude, INITIAL_REGION.longitude);
//     setSearchQuery("");
//   };

//   const handleNextStep = () => {
//     if (!salonBusinessInfo?.salonBusinessType?.trim()) {
//       setError("Please select a business type.");
//       return;
//     }

//     if (
//       !salonBusinessInfo?.salonCoordinates?.lattitude ||
//       !salonBusinessInfo?.salonCoordinates?.longitude
//     ) {
//       setError("Please select a valid location on the map.");
//       return;
//     }

//     console.log("Step 2 Business Information Data:", salonBusinessInfo);
//     router.push("/selectServices");
//   };

//   return (
//     <SafeAreaView
//       edges={["top", "right", "left"]}
//       style={[
//         styles.container,
//         { backgroundColor: darkTheme.colors.background },
//       ]}
//     >
//       <Header
//         title={"Business Information"}
//         subTitle={"Step 2 of 4"}
//         showBack={true}
//       />

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.keyboardContainer}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContainer}
//         >
//           {/* Progress Bar */}
//           <View style={styles.progressTrack}>
//             <View
//               style={[
//                 styles.progressFill,
//                 { backgroundColor: darkTheme.colors.accent },
//               ]}
//             />
//             <View
//               style={[
//                 styles.progressFill,
//                 { backgroundColor: darkTheme.colors.accent },
//               ]}
//             />
//             <View style={styles.progressEmpty} />
//             <View style={styles.progressEmpty} />
//           </View>

//           <View style={styles.formContainer}>
//             {/* Dropdown: Business Type */}
//             <View style={styles.inputGroup}>
//               <Text style={darkTheme.typography.inputLabel}>
//                 Business Type
//               </Text>
//               <Dropdown
//                 style={[
//                   styles.dropdown,
//                   {
//                     backgroundColor: darkTheme.colors.card,
//                     borderColor: error
//                       ? "#EF4444"
//                       : isFocus
//                         ? darkTheme.colors.accent
//                         : darkTheme.colors.border,
//                   },
//                 ]}
//                 placeholderStyle={[
//                   styles.placeholderStyle,
//                   { color: darkTheme.colors.textMuted },
//                 ]}
//                 selectedTextStyle={[
//                   styles.selectedTextStyle,
//                   { color: darkTheme.colors.textMain },
//                 ]}
//                 containerStyle={[
//                   styles.dropdownMenuContainer,
//                   {
//                     backgroundColor: "#0A0A0C",
//                     borderColor: darkTheme.colors.border,
//                   },
//                 ]}
//                 itemContainerStyle={styles.dropdownItemContainer}
//                 itemTextStyle={[
//                   styles.dropdownItemText,
//                   { color: darkTheme.colors.textMain },
//                 ]}
//                 activeColor="rgba(255, 149, 0, 0.08)"
//                 data={SALON_TYPE_OPTIONS}
//                 maxHeight={200}
//                 labelField="label"
//                 valueField="value"
//                 placeholder={!isFocus ? "Select business type" : "..."}
//                 value={salonBusinessInfo?.salonBusinessType || ""}
//                 onFocus={() => setIsFocus(true)}
//                 onBlur={() => setIsFocus(false)}
//                 onChange={handleTypeChange}
//                 renderRightIcon={() => (
//                   <Ionicons
//                     name="chevron-down"
//                     size={scale(16)}
//                     color={
//                       isFocus
//                         ? darkTheme.colors.accent
//                         : darkTheme.colors.textMuted
//                     }
//                   />
//                 )}
//               />
//               {error ? <Text style={styles.errorText}>{error}</Text> : null}
//             </View>

//             {/* Map Location Selector Block */}
//             <View style={styles.mapCard}>
//               {/* Location Search Bar */}
//               <View style={styles.searchBarContainer}>
//                 <Ionicons
//                   name="search"
//                   size={scale(16)}
//                   color={darkTheme.colors.textMuted}
//                 />
//                 <TextInput
//                   style={styles.searchInput}
//                   placeholder="Search city, address, or place..."
//                   placeholderTextColor={darkTheme.colors.textMuted}
//                   value={searchQuery}
//                   onChangeText={setSearchQuery}
//                 />
//               </View>

//               {/* Map Container */}
//               <View style={styles.mapWrapper}>
//                 <MapView
//                   provider={PROVIDER_GOOGLE}
//                   style={styles.map}
//                   region={{
//                     latitude: selectedCoordinates.latitude,
//                     longitude: selectedCoordinates.longitude,
//                     latitudeDelta: 0.05,
//                     longitudeDelta: 0.05,
//                   }}
//                   onPress={handleMapPress}
//                 >
//                   {/* Selected Salon Pin */}
//                   <Marker
//                     draggable
//                     coordinate={selectedCoordinates}
//                     title="Salon Location"
//                     onDragEnd={(e) =>
//                       updateCoordinates(
//                         e.nativeEvent.coordinate.latitude,
//                         e.nativeEvent.coordinate.longitude
//                       )
//                     }
//                   />

//                   {/* Optional Direction Path from User to Selected Salon */}
//                   {userLocation && GOOGLE_MAPS_APIKEY !== "YOUR_GOOGLE_MAPS_API_KEY" && (
//                     <MapViewDirections
//                       origin={userLocation}
//                       destination={selectedCoordinates}
//                       apikey={GOOGLE_MAPS_APIKEY}
//                       strokeWidth={3}
//                       strokeColor={darkTheme.colors.accent || "#FF9500"}
//                     />
//                   )}
//                 </MapView>
//               </View>

//               {/* Resolved Address Display */}
//               <View style={styles.locationFooter}>
//                 <Text style={styles.locationText} numberOfLines={2}>
//                   <Text style={styles.locationLabel}>Location: </Text>
//                   {isGeocoding ? "Fetching location..." : address}
//                 </Text>
//               </View>

//               {/* Map Actions Footer */}
//               <View style={styles.mapActionRow}>
//                 <TouchableOpacity
//                   style={styles.resetBtn}
//                   onPress={handleResetLocation}
//                   activeOpacity={0.7}
//                 >
//                   <Text style={styles.resetBtnText}>Reset</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.continueBtn}
//                   onPress={handleNextStep}
//                   activeOpacity={0.8}
//                 >
//                   <Text style={styles.continueBtnText}>Continue</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>

//           {/* Step Submission Navigation */}
//           <TouchableOpacity
//             style={[
//               styles.nextButton,
//               {
//                 backgroundColor: darkTheme.colors.accent,
//                 height: darkTheme.layout.buttonHeight,
//               },
//             ]}
//             activeOpacity={0.8}
//             onPress={handleNextStep}
//           >
//             <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
//               Next: Services
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default BusinessInformation;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   keyboardContainer: {
//     flex: 1,
//   },
//   scrollContainer: {
//     paddingHorizontal: darkTheme.layout.paddingHorizontal,
//     paddingBottom: verticalScale(32),
//   },
//   progressTrack: {
//     flexDirection: "row",
//     width: "100%",
//     height: verticalScale(4),
//     backgroundColor: "#1C1C1E",
//     borderRadius: darkTheme.layout.borderRadiusSmall,
//     marginBottom: verticalScale(24),
//     gap: scale(4),
//   },
//   progressFill: {
//     flex: 1,
//     height: "100%",
//     borderRadius: scale(2),
//   },
//   progressEmpty: {
//     flex: 1,
//     height: "100%",
//     backgroundColor: "#1C1C1E",
//     borderRadius: scale(2),
//   },
//   formContainer: {
//     gap: verticalScale(18),
//     marginBottom: verticalScale(24),
//   },
//   inputGroup: {
//     width: "100%",
//   },
//   dropdown: {
//     width: "100%",
//     height: darkTheme.layout.componentHeight,
//     borderRadius: darkTheme.layout.borderRadiusMedium,
//     borderWidth: 1,
//     paddingHorizontal: scale(14),
//     marginTop: verticalScale(6),
//   },
//   placeholderStyle: {
//     fontSize: scale(14),
//   },
//   selectedTextStyle: {
//     fontSize: scale(14),
//     fontWeight: "400",
//   },
//   dropdownMenuContainer: {
//     borderRadius: darkTheme.layout.borderRadiusMedium,
//     borderWidth: 1,
//     marginTop: verticalScale(4),
//     overflow: "hidden",
//   },
//   dropdownItemContainer: {
//     paddingHorizontal: scale(14),
//     paddingVertical: verticalScale(8),
//   },
//   dropdownItemText: {
//     fontSize: scale(14),
//   },
//   errorText: {
//     color: "#EF4444",
//     fontSize: scale(11),
//     marginTop: verticalScale(4),
//   },
//   mapCard: {
//     backgroundColor: "#121214",
//     borderRadius: scale(12),
//     borderWidth: 1,
//     borderColor: "#27272A",
//     padding: scale(12),
//     gap: verticalScale(10),
//   },
//   searchBarContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#1C1C1E",
//     borderRadius: scale(8),
//     paddingHorizontal: scale(12),
//     height: verticalScale(36),
//     gap: scale(8),
//   },
//   searchInput: {
//     flex: 1,
//     color: "#FFFFFF",
//     fontSize: scale(13),
//   },
//   mapWrapper: {
//     height: verticalScale(220),
//     borderRadius: scale(8),
//     overflow: "hidden",
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   locationFooter: {
//     paddingVertical: verticalScale(2),
//   },
//   locationText: {
//     color: "#E4E4E7",
//     fontSize: scale(12),
//     lineHeight: scale(16),
//   },
//   locationLabel: {
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },
//   mapActionRow: {
//     flexDirection: "row",
//     gap: scale(10),
//     marginTop: verticalScale(4),
//   },
//   resetBtn: {
//     flex: 1,
//     height: verticalScale(38),
//     backgroundColor: "#27272A",
//     borderRadius: scale(8),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   resetBtnText: {
//     color: "#FFFFFF",
//     fontSize: scale(13),
//     fontWeight: "500",
//   },
//   continueBtn: {
//     flex: 1,
//     height: verticalScale(38),
//     backgroundColor: "#FFFFFF",
//     borderRadius: scale(8),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   continueBtnText: {
//     color: "#000000",
//     fontSize: scale(13),
//     fontWeight: "600",
//   },
//   nextButton: {
//     width: "100%",
//     borderRadius: darkTheme.layout.borderRadiusMedium,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
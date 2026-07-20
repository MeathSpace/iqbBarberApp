// import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import { Dropdown } from "react-native-element-dropdown";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";

// import Header from "../../../../components/Header/Header"; // Adjust path dynamically
// import { darkTheme } from "../../../../constants/appTheme";
// import { useAdminAuth } from "../../../../context/admin/AuthContext";

// const GENDER_OPTIONS = [
//   { label: "Male", value: "Male" },
//   { label: "Female", value: "Female" },
//   { label: "Other", value: "Other" },
// ];

// const EditProfileScreen = () => {
//   const { fetchLoggedInAdmin, authenticatedUser } = useAdminAuth()

//   console.log(authenticatedUser)

//   // Local state properties dictionary mapping input structures
//   const [name, setName] = useState("Bikki u");
//   const [email, setEmail] = useState("bikki@yopmail.com");
//   const [password, setPassword] = useState("********");
//   const [mobNumber, setMobNumber] = useState("+91 82402-05322");
//   const [gender, setGender] = useState("Male");

//   // Date of Birth functional handling state mechanics
//   const [dobDate, setDobDate] = useState(new Date(2009, 11, 2));
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   // Focus tracking state context variables for dynamic border highlights
//   const [isGenderFocused, setIsGenderFocused] = useState(false);

//   // Auto-formats the selected platform timestamp into your visual format mask string
//   const formatDisplayDate = (date) => {
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleDateChange = (event, selectedDate) => {
//     // Android automatically dismisses on single touch select events
//     if (Platform.OS === "android") {
//       setShowDatePicker(false);
//     }
//     if (selectedDate) {
//       setDobDate(selectedDate);
//     }
//   };

//   // Real-time mobile number character length validation checker logic block
//   const validateMobileNumber = (text) => {
//     const rawNumbers = text.replace(/[^0-9]/g, "");
//     return rawNumbers.length >= 10;
//   };

//   const isMobileValid = validateMobileNumber(mobNumber);

//   const saveProfileHandler = async() => {
//     console.log("Profile Data Captured:", {
//       name,
//       email,
//       password,
//       mobileNumber: mobNumber,
//       gender,
//       dateOfBirthRaw: dobDate,
//       dateOfBirthFormatted: formatDisplayDate(dobDate),
//       isMobileValid, // Useful check to ensure it passes validation before sync
//     });
//     await fetchLoggedInAdmin()
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
//         title="Profile"
//         subTitle="Manage your workspace identity"
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
//           {/* 1. Seamless Hero Identity Presentation Grid Block Layout */}
//           <View style={styles.heroSectionContainer}>
//             <View style={styles.avatarWrapperContainer}>
//               <View
//                 style={[
//                   styles.avatarOuterRing,
//                   { borderColor: darkTheme.colors.accent },
//                 ]}
//               >
//                 <View style={styles.avatarInnerCircle}>
//                   <Ionicons
//                     name="person"
//                     size={scale(32)}
//                     color="rgba(255,255,255,0.6)"
//                   />
//                 </View>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.cameraFloatingBadge,
//                   { backgroundColor: darkTheme.colors.accent },
//                 ]}
//                 activeOpacity={0.9}
//               >
//                 <Feather name="camera" size={scale(11)} color="#000000" />
//               </TouchableOpacity>
//             </View>

//             <Text
//               style={[darkTheme.typography.cardTitle, styles.userNameHeading]}
//             >
//               {name}
//             </Text>
//             <Text style={styles.userRoleTagLabel}>System Administrator</Text>

//             {/* Premium Hairline Metrics Ribbon Section */}
//             <View style={styles.metricsRibbonTrack}>
//               <View style={styles.metricStatBlock}>
//                 <Text style={styles.metricMainNumber}>33</Text>
//                 <Text style={styles.metricSubLabel}>Salons</Text>
//               </View>
//               <View style={styles.hairlineVerticalDivider} />
//               <View style={styles.metricStatBlock}>
//                 <Text style={styles.metricMainNumber}>79</Text>
//                 <Text style={styles.metricSubLabel}>Barbers</Text>
//               </View>
//               <View style={styles.hairlineVerticalDivider} />
//               <View style={styles.metricStatBlock}>
//                 <Text style={styles.metricMainNumber}>74</Text>
//                 <Text style={styles.metricSubLabel}>Customers</Text>
//               </View>
//             </View>
//           </View>

//           {/* 2. Cohesive Stripe Payout Integration Tile */}
//           <TouchableOpacity
//             style={[
//               styles.premiumStripeActionTile,
//               {
//                 backgroundColor: darkTheme.colors.card,
//                 borderColor: darkTheme.colors.border,
//               },
//             ]}
//             activeOpacity={0.8}
//           >
//             <View style={styles.stripeLeftWrapper}>
//               <View style={styles.stripeBrandIconBox}>
//                 <FontAwesome5
//                   name="stripe-s"
//                   size={scale(15)}
//                   color="#635BFF"
//                 />
//               </View>
//               <View style={styles.stripeTextStack}>
//                 <Text style={styles.stripeTitleText}>
//                   Stripe Merchant Integration
//                 </Text>
//                 <Text style={styles.stripeSubtitleText}>
//                   Configure dynamic multi-user payout routing
//                 </Text>
//               </View>
//             </View>
//             <Ionicons
//               name="chevron-forward"
//               size={scale(14)}
//               color={darkTheme.colors.textMuted}
//             />
//           </TouchableOpacity>

//           {/* Minimalist Profile Progress Indicator Layout Section */}
//           <View style={styles.progressTrackerHeaderSection}>
//             <View style={styles.progressSplitTextRow}>
//               <Text style={styles.progressLabelText}>PROFILE COMPLETION</Text>
//               <Text
//                 style={[
//                   styles.progressPercentText,
//                   { color: darkTheme.colors.accent },
//                 ]}
//               >
//                 85%
//               </Text>
//             </View>
//             <View style={styles.progressTrackBackgroundLine}>
//               <View
//                 style={[
//                   styles.progressActiveFillLine,
//                   { backgroundColor: darkTheme.colors.accent },
//                 ]}
//               />
//             </View>
//           </View>

//           {/* 3. True Solid-Black Luxury Form Enclosures Workspace List */}
//           <View style={styles.formContainerVerticalDeck}>
//             {/* Input Element: Full Name */}
//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>FULL NAME</Text>
//               <TextInput
//                 style={[
//                   styles.luxuryTextInput,
//                   {
//                     borderColor: darkTheme.colors.border,
//                     color: darkTheme.colors.textMain,
//                     backgroundColor: darkTheme.colors.card,
//                   },
//                 ]}
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="Enter workspace name..."
//                 placeholderTextColor={darkTheme.colors.textMuted}
//                 selectionColor={darkTheme.colors.accent}
//               />
//             </View>

//             {/* Input Element: Email Address (Verified Checkmark State) */}
//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>EMAIL ADDRESS</Text>
//               <View style={styles.inputWithIconAnchorWrapper}>
//                 <TextInput
//                   style={[
//                     styles.luxuryTextInput,
//                     {
//                       borderColor: darkTheme.colors.border,
//                       color: darkTheme.colors.textMain,
//                       backgroundColor: darkTheme.colors.card,
//                       paddingRight: scale(40),
//                     },
//                   ]}
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   selectionColor={darkTheme.colors.accent}
//                 />
//                 <View style={styles.fieldRightStatusIconContainer}>
//                   <Ionicons
//                     name="checkmark-circle"
//                     size={scale(15)}
//                     color="#34C759"
//                   />
//                 </View>
//               </View>
//             </View>

//             {/* Input Element: Account Security Password */}
//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>
//                 SECURITY PASSWORD
//               </Text>
//               <View style={styles.inputWithIconAnchorWrapper}>
//                 <TextInput
//                   style={[
//                     styles.luxuryTextInput,
//                     {
//                       borderColor: darkTheme.colors.border,
//                       color: darkTheme.colors.textMain,
//                       backgroundColor: darkTheme.colors.card,
//                       paddingRight: scale(40),
//                     },
//                   ]}
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry={true}
//                   selectionColor={darkTheme.colors.accent}
//                 />
//                 <TouchableOpacity style={styles.fieldRightStatusIconContainer}>
//                   <Ionicons
//                     name="eye-off-outline"
//                     size={scale(14)}
//                     color={darkTheme.colors.textMuted}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Input Element: Mobile Number (Dynamic State Toggle Badge Check) */}
//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>MOBILE NUMBER</Text>
//               <View style={styles.inputWithIconAnchorWrapper}>
//                 <TextInput
//                   style={[
//                     styles.luxuryTextInput,
//                     {
//                       borderColor: isMobileValid
//                         ? darkTheme.colors.border
//                         : "#FF3B30",
//                       color: darkTheme.colors.textMain,
//                       backgroundColor: darkTheme.colors.card,
//                       paddingRight: scale(40),
//                     },
//                   ]}
//                   value={mobNumber}
//                   onChangeText={setMobNumber}
//                   keyboardType="phone-pad"
//                   placeholder="+1 (555) 000-0000"
//                   placeholderTextColor={darkTheme.colors.textMuted}
//                   selectionColor={darkTheme.colors.accent}
//                 />
//                 <View style={styles.fieldRightStatusIconContainer}>
//                   <Ionicons
//                     name={isMobileValid ? "checkmark-circle" : "alert-circle"}
//                     size={scale(15)}
//                     color={isMobileValid ? "#34C759" : "#FF3B30"}
//                   />
//                 </View>
//               </View>
//             </View>

//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>
//                 GENDER ASSIGNMENT
//               </Text>
//               <Dropdown
//                 style={[
//                   styles.dropdownMainElementContainer,
//                   {
//                     backgroundColor: darkTheme.colors.card,
//                     borderColor: isGenderFocused
//                       ? darkTheme.colors.accent
//                       : darkTheme.colors.border,
//                   },
//                 ]}
//                 placeholderStyle={[
//                   styles.dropdownPlaceholderTextStyle,
//                   { color: darkTheme.colors.textMuted },
//                 ]}
//                 selectedTextStyle={[
//                   styles.dropdownSelectedTextStyle,
//                   { color: darkTheme.colors.textMain },
//                 ]}
//                 containerStyle={[
//                   styles.dropdownMenuInnerContainerBox,
//                   {
//                     backgroundColor: "#0A0A0C",
//                     borderColor: darkTheme.colors.border,
//                   },
//                 ]}
//                 itemContainerStyle={styles.dropdownItemRowUnit}
//                 itemTextStyle={[
//                   styles.dropdownItemRowText,
//                   { color: darkTheme.colors.textMain },
//                 ]}
//                 activeColor="rgba(255, 149, 0, 0.08)"
//                 data={GENDER_OPTIONS}
//                 maxHeight={200}
//                 labelField="label"
//                 valueField="value"
//                 placeholder="Select assigned gender"
//                 value={gender}
//                 onFocus={() => setIsGenderFocused(true)}
//                 onBlur={() => setIsGenderFocused(false)}
//                 onChange={(item) => {
//                   setGender(item.value);
//                   setIsGenderFocused(false);
//                 }}
//                 renderRightIcon={() => (
//                   <Ionicons
//                     name="chevron-down"
//                     size={scale(13)}
//                     color={
//                       isGenderFocused
//                         ? darkTheme.colors.accent
//                         : darkTheme.colors.textMuted
//                     }
//                   />
//                 )}
//               />
//             </View>

//             {/* Input Element: Date of Birth Component with Embedded Scrim Dismiss Hooks */}
//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>DATE OF BIRTH</Text>
//               <TouchableOpacity
//                 style={[
//                   styles.luxuryDropdownTriggerButton,
//                   {
//                     borderColor: darkTheme.colors.border,
//                     backgroundColor: darkTheme.colors.card,
//                   },
//                 ]}
//                 activeOpacity={0.7}
//                 onPress={() => setShowDatePicker(true)}
//               >
//                 <Text
//                   style={{
//                     color: darkTheme.colors.textMain,
//                     fontSize: scale(13),
//                   }}
//                 >
//                   {formatDisplayDate(dobDate)}
//                 </Text>
//                 <Ionicons
//                   name="calendar-outline"
//                   size={scale(13)}
//                   color={darkTheme.colors.textMuted}
//                 />
//               </TouchableOpacity>

//               {/* Functional Dynamic Floating Platform Picker Overlay */}
//               <Modal
//                 transparent={true}
//                 visible={showDatePicker}
//                 animationType="fade"
//                 onRequestClose={() => setShowDatePicker(false)}
//               >
//                 <TouchableWithoutFeedback
//                   onPress={() => setShowDatePicker(false)}
//                 >
//                   <View style={styles.modalOverlayScrim}>
//                     <TouchableWithoutFeedback>
//                       <View
//                         style={[
//                           styles.calendarModalContent,
//                           { backgroundColor: darkTheme.colors.card },
//                         ]}
//                       >
//                         <DateTimePicker
//                           value={dobDate}
//                           mode="date"
//                           display={
//                             Platform.OS === "ios" ? "spinner" : "default"
//                           }
//                           onChange={handleDateChange}
//                           maximumDate={new Date()}
//                           themeVariant="dark"
//                         />

//                         {Platform.OS === "ios" && (
//                           <TouchableOpacity
//                             style={[
//                               styles.modalSubmitActionCTAButton,
//                               { backgroundColor: darkTheme.colors.accent },
//                             ]}
//                             onPress={() => setShowDatePicker(false)}
//                             activeOpacity={0.8}
//                           >
//                             <Text
//                               style={{
//                                 color: "#000000",
//                                 fontWeight: "700",
//                                 fontSize: scale(13),
//                               }}
//                             >
//                               Done
//                             </Text>
//                           </TouchableOpacity>
//                         )}
//                       </View>
//                     </TouchableWithoutFeedback>
//                   </View>
//                 </TouchableWithoutFeedback>
//               </Modal>
//             </View>
//           </View>

//           {/* Primary Profile Form Changes Action Submission Button */}
//           <TouchableOpacity
//             style={[
//               styles.saveProfileChangesCTAButton,
//               {
//                 backgroundColor: darkTheme.colors.accent,
//                 height: darkTheme.layout.buttonHeight || verticalScale(40),
//               },
//             ]}
//             activeOpacity={0.8}
//             onPress={() =>
//               saveProfileHandler()
//             }
//           >
//             <Text
//               style={[
//                 darkTheme.typography.btnText,
//                 { color: "#000000", fontWeight: "700" },
//               ]}
//             >
//               Save Profile Changes
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default EditProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   keyboardContainer: {
//     flex: 1,
//   },
//   scrollContainer: {
//     paddingHorizontal: scale(18),
//     paddingBottom: verticalScale(40),
//     paddingTop: verticalScale(12),
//   },
//   heroSectionContainer: {
//     width: "100%",
//     alignItems: "center",
//     marginBottom: verticalScale(18),
//   },
//   avatarWrapperContainer: {
//     position: "relative",
//     alignItems: "center",
//     justifyContent: "center",
//     width: scale(84),
//     height: scale(84),
//   },
//   avatarOuterRing: {
//     width: scale(80),
//     height: scale(80),
//     borderRadius: scale(40),
//     borderWidth: 1.5,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.01)",
//   },
//   avatarInnerCircle: {
//     width: scale(70),
//     height: scale(70),
//     borderRadius: scale(35),
//     backgroundColor: "#161618",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cameraFloatingBadge: {
//     position: "absolute",
//     bottom: scale(2),
//     right: scale(2),
//     width: scale(24),
//     height: scale(24),
//     borderRadius: scale(12),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   userNameHeading: {
//     fontSize: scale(18),
//     fontWeight: "700",
//     marginTop: verticalScale(14),
//     letterSpacing: -0.3,
//   },
//   userRoleTagLabel: {
//     fontSize: scale(10),
//     fontWeight: "700",
//     textTransform: "uppercase",
//     color: "rgba(255,255,255,0.3)",
//     letterSpacing: 1.2,
//     marginTop: verticalScale(3),
//   },
//   metricsRibbonTrack: {
//     flexDirection: "row",
//     width: "100%",
//     marginTop: verticalScale(20),
//     paddingVertical: verticalScale(4),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   metricStatBlock: {
//     flex: 1,
//     alignItems: "center",
//   },
//   metricMainNumber: {
//     color: "#FFFFFF",
//     fontSize: scale(16),
//     fontWeight: "800",
//     letterSpacing: -0.2,
//   },
//   metricSubLabel: {
//     color: "rgba(255,255,255,0.35)",
//     fontSize: scale(10),
//     fontWeight: "600",
//     marginTop: verticalScale(2),
//   },
//   hairlineVerticalDivider: {
//     width: 1,
//     height: verticalScale(16),
//     backgroundColor: "rgba(255,255,255,0.08)",
//   },
//   premiumStripeActionTile: {
//     width: "100%",
//     height: verticalScale(56),
//     borderRadius: scale(10),
//     borderWidth: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: scale(14),
//     marginTop: verticalScale(6),
//   },
//   stripeLeftWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   stripeBrandIconBox: {
//     width: scale(28),
//     height: scale(28),
//     borderRadius: scale(6),
//     backgroundColor: "rgba(99, 91, 255, 0.1)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   stripeTextStack: {
//     marginLeft: scale(12),
//     flex: 1,
//   },
//   stripeTitleText: {
//     color: "#FFFFFF",
//     fontSize: scale(13),
//     fontWeight: "600",
//   },
//   stripeSubtitleText: {
//     color: "rgba(255,255,255,0.4)",
//     fontSize: scale(10),
//     marginTop: verticalScale(2),
//   },
//   progressTrackerHeaderSection: {
//     width: "100%",
//     marginTop: verticalScale(24),
//   },
//   progressSplitTextRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//   },
//   progressLabelText: {
//     fontSize: scale(9),
//     fontWeight: "800",
//     color: "rgba(255,255,255,0.4)",
//     letterSpacing: 0.8,
//   },
//   progressPercentText: {
//     fontSize: scale(11),
//     fontWeight: "800",
//   },
//   progressTrackBackgroundLine: {
//     width: "100%",
//     height: scale(2.5),
//     backgroundColor: "#18181A",
//     borderRadius: scale(1.5),
//     marginTop: verticalScale(6),
//     overflow: "hidden",
//   },
//   progressActiveFillLine: {
//     height: "100%",
//     width: "85%",
//     borderRadius: scale(1.5),
//   },
//   formContainerVerticalDeck: {
//     width: "100%",
//     marginTop: verticalScale(16),
//     gap: verticalScale(14),
//   },
//   inputLayoutContainerGroup: {
//     width: "100%",
//   },
//   premiumFieldLabelMicro: {
//     fontSize: scale(9),
//     fontWeight: "800",
//     color: "rgba(255,255,255,0.4)",
//     letterSpacing: 1,
//     marginBottom: verticalScale(6),
//   },
//   inputWithIconAnchorWrapper: {
//     position: "relative",
//     width: "100%",
//   },
//   luxuryTextInput: {
//     width: "100%",
//     height: scale(38),
//     borderRadius: scale(8),
//     borderWidth: 1,
//     paddingHorizontal: scale(12),
//     fontSize: scale(13),
//     fontWeight: "400",
//   },
//   luxuryDropdownTriggerButton: {
//     width: "100%",
//     height: scale(38),
//     borderRadius: scale(8),
//     borderWidth: 1,
//     paddingHorizontal: scale(12),
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   fieldRightStatusIconContainer: {
//     position: "absolute",
//     right: 0,
//     top: 0,
//     height: scale(38),
//     width: scale(38),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   saveProfileChangesCTAButton: {
//     width: "100%",
//     borderRadius: scale(8),
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: verticalScale(28),
//   },

//   // Library Element-Dropdown Target Specific Styling Anchors
//   dropdownMainElementContainer: {
//     width: "100%",
//     height: scale(38),
//     borderRadius: scale(8),
//     borderWidth: 1,
//     paddingHorizontal: scale(12),
//   },
//   dropdownPlaceholderTextStyle: {
//     fontSize: scale(13),
//   },
//   dropdownSelectedTextStyle: {
//     fontSize: scale(13),
//   },
//   dropdownMenuInnerContainerBox: {
//     borderRadius: scale(8),
//     borderWidth: 1,
//     marginTop: verticalScale(4),
//     paddingVertical: verticalScale(4),
//   },
//   dropdownItemRowUnit: {
//     paddingVertical: verticalScale(0),
//     paddingHorizontal: scale(12),
//   },
//   dropdownItemRowText: {
//     fontSize: scale(13),
//   },

//   // Modal Scrim Design Variables
//   modalOverlayScrim: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.75)",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: scale(20),
//   },
//   calendarModalContent: {
//     width: "100%",
//     borderRadius: scale(14),
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.08)",
//     padding: scale(16),
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modalSubmitActionCTAButton: {
//     width: "100%",
//     borderRadius: scale(8),
//     alignItems: "center",
//     justifyContent: "center",
//     height: scale(40),
//     marginTop: verticalScale(14),
//   },
// });

// import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import * as ImagePicker from "expo-image-picker";
// import { useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import { Dropdown } from "react-native-element-dropdown";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";
// import Header from "../../../../components/Header/Header"; // Adjust path dynamically
// import { darkTheme } from "../../../../constants/appTheme";
// import { useAdminAuth } from "../../../../context/admin/AuthContext";
// import api from "../../../../utils/api";

// const GENDER_OPTIONS = [
//   { label: "Male", value: "Male" },
//   { label: "Female", value: "Female" },
//   { label: "Other", value: "Other" },
// ];

// const EditProfileScreen = () => {
//   const { fetchLoggedInAdmin, authenticatedUser } = useAdminAuth();

//   // Core Form Local States
//   const [name, setName] = useState(authenticatedUser?.name || "");
//   const [email, setEmail] = useState(authenticatedUser?.email || "");
//   const [password, setPassword] = useState("********");
//   const [gender, setGender] = useState(authenticatedUser?.gender || "Male");

//   const initialMobile = authenticatedUser?.mobileNumber
//     ? `+${authenticatedUser?.mobileCountryCode || "91"} ${authenticatedUser.mobileNumber}`
//     : "";
//   const [mobNumber, setMobNumber] = useState(initialMobile);

//   // Date & Structural Layout State Controls
//   const [dobDate, setDobDate] = useState(
//     authenticatedUser?.dateOfBirth
//       ? new Date(authenticatedUser.dateOfBirth)
//       : new Date(),
//   );
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [isGenderFocused, setIsGenderFocused] = useState(false);

//   // Modal Control States
//   const [passwordModalVisible, setPasswordModalVisible] = useState(false);
//   const [verificationModalVisible, setVerificationModalVisible] =
//     useState(false);
//   const [verificationTarget, setVerificationTarget] = useState({
//     type: "",
//     value: "",
//   });

//   console.log("852 ",verificationTarget)

//   // Password Sub-States
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // OTP Verification Sub-States
//   const [otpCode, setOtpCode] = useState("");

//   const [avatarUri, setAvatarUri] = useState(
//     authenticatedUser?.profile?.[0]?.url || null,
//   );
//   const [isUploadingImage, setIsUploadingImage] = useState(false);

//   const formatDisplayDate = (date) => {
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const handleDateChange = (event, selectedDate) => {
//     if (Platform.OS === "android") {
//       setShowDatePicker(false);
//     }
//     if (selectedDate) {
//       setDobDate(selectedDate);
//     }
//   };

//   const validateMobileNumber = (text) => {
//     const rawNumbers = text.replace(/[^0-9]/g, "");
//     return rawNumbers.length >= 10;
//   };

//   const isMobileValid = validateMobileNumber(mobNumber);
//   const isEmailValid = email.includes("@") && email.includes(".");

//   // ==================== IMAGE PICKING & UPLOAD HANDLING ====================
//   const handleSelectImage = async () => {
//     // Request system access capabilities via the non-deprecated permission interface
//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       Alert.alert(
//         "Permission Denied",
//         "Workspace requires access to your system camera roll parameters to select an avatar.",
//       );
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.8,
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       const selectedUri = result.assets[0].uri;
//       setAvatarUri(selectedUri); // Instantly update UI element view
//       await uploadAvatarToServer(selectedUri); // Dispatch network payload sync
//     }
//   };

//   const uploadAvatarToServer = async (image) => {
//     const extension = image.split(".").pop()?.toLowerCase();

//     const mimeType =
//       extension === "jpg" || extension === "jpeg"
//         ? "image/jpeg"
//         : extension === "png"
//           ? "image/png"
//           : extension === "webp"
//             ? "image/webp"
//             : "";

//     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

//     if (!allowedTypes.includes(mimeType)) {
//       Alert.alert(
//         "Invalid File",
//         "Please upload only JPEG, PNG or WebP images.",
//       );
//       return;
//     }

//     setIsUploadingImage(true);

//     const formData = new FormData();

//     formData.append("email", authenticatedUser.email);
//     formData.append("salonId", String(authenticatedUser.salonId));

//     formData.append("profile", {
//       uri: Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
//       name: image.fileName || "profile.jpg",
//       type: image.mimeType || "image/jpeg",
//     });

//     try {
//       const { data } = await api.post(
//         "/admin/uploadAdminProfilePicture",
//         formData,
//       );

//       if (!data.success) {
//         throw new Error(data.message);
//       }

//       Alert.alert("Success", data.message || "Profile uploaded successfully.");
//     } catch (error) {
//       Alert.alert(
//         "Upload Failed",
//         error.response?.data?.message || error.message,
//       );
//     } finally {
//       setIsUploadingImage(false);
//     }
//   };
//   // =========================================================================

//   // Verification flow wrapper handling backend entity truth state metrics
//   const triggerVerificationFlow = (type, value, isVerified) => {
//     if (isVerified) return; // Prevent workflow interaction if resource flag evaluates to true
//     setOtpCode("");
//     setVerificationTarget({ type, value });
//     setVerificationModalVisible(true);
//   };

//   // Submission Pipeline Logs
//   const handleVerifyOTP = () => {
//     console.log(
//       `Verifying OTP Code [${otpCode}] for context target sync:`,
//       verificationTarget,
//     );
//     setVerificationModalVisible(false);
//   };

//   const handleResendOTP = () => {
//     console.log(
//       `Re-routing verification dispatch handshake token directly to: ${verificationTarget.value}`,
//     );
//   };

//   const savePasswordHandler = () => {
//     console.log("Secure Password Credentials Captured for Execution:", {
//       oldPassword,
//       newPassword,
//       confirmPassword,
//     });
//     setPasswordModalVisible(false);
//     setOldPassword("");
//     setNewPassword("");
//     setConfirmPassword("");
//   };

//   const [updateProfileLoader, setUpdateProfileLoader] = useState(false);

//   const saveProfileHandler = async () => {
//     const localMobileNumber = mobNumber.replace(
//       `+${authenticatedUser?.mobileCountryCode}`,
//       "",
//     );

//     const profileData = {
//       name,
//       email,
//       mobileNumber: localMobileNumber,
//       gender,
//       dateOfBirth: dobDate.toISOString().split("T")[0] || "",
//       countryCode: authenticatedUser?.mobileCountryCode,
//     };

//     try {
//       setUpdateProfileLoader(true);
//       const response = await api.put(
//         "/admin/updateAdminAcoountDetails",
//         profileData,
//       );

//       await fetchLoggedInAdmin();

//       Alert.alert(
//         "Profile Updated",
//         response?.data?.message ||
//           "Workspace identity metrics successfully synchronized.",
//       );
//     } catch (error) {
//       const errorMessage =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Failed to synchronize profile adjustments with the server.";

//       Alert.alert("Update Failed", errorMessage);
//     } finally {
//       setUpdateProfileLoader(false);
//     }
//   };

//   // =========================================================================

//   // Completion Matrix calculations
//   const totalFields = 5;
//   let completedFieldsCount = 0;

//   if (name.trim().length > 0) completedFieldsCount++;
//   if (gender) completedFieldsCount++;
//   if (password.trim().length > 0) completedFieldsCount++;

//   // Explicitly require the backend flags to evaluate to true for verification fields
//   if (
//     email.trim().length > 0 &&
//     isEmailValid &&
//     authenticatedUser?.emailVerified
//   )
//     completedFieldsCount++;
//   if (isMobileValid && authenticatedUser?.mobileVerified)
//     completedFieldsCount++;

//   const completionPercentage = Math.round(
//     (completedFieldsCount / totalFields) * 100,
//   );

//   return (
//     <SafeAreaView
//       edges={["top", "right", "left"]}
//       style={[
//         styles.container,
//         { backgroundColor: darkTheme.colors.background },
//       ]}
//     >
//       <Header
//         title="Profile"
//         subTitle="Manage your workspace identity"
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
//           {/* 1. Hero Identity Block */}
//           <View style={styles.heroSectionContainer}>
//             <View style={styles.avatarWrapperContainer}>
//               <View
//                 style={[
//                   styles.avatarOuterRing,
//                   { borderColor: darkTheme.colors.accent },
//                 ]}
//               >
//                 <View style={styles.avatarInnerCircle}>
//                   {avatarUri ? (
//                     <Image
//                       source={{ uri: avatarUri }}
//                       style={styles.avatarImagePlacement}
//                       resizeMode="cover"
//                     />
//                   ) : (
//                     <Ionicons
//                       name="person"
//                       size={scale(32)}
//                       color="rgba(255,255,255,0.6)"
//                     />
//                   )}
//                 </View>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.cameraFloatingBadge,
//                   { backgroundColor: darkTheme.colors.accent },
//                 ]}
//                 activeOpacity={0.9}
//                 onPress={handleSelectImage}
//                 disabled={isUploadingImage}
//               >
//                 <Feather name="camera" size={scale(11)} color="#000000" />
//               </TouchableOpacity>
//             </View>

//             <Text
//               style={[darkTheme.typography.cardTitle, styles.userNameHeading]}
//             >
//               {name}
//             </Text>
//             <Text style={styles.userRoleTagLabel}>
//               {authenticatedUser?.role || "System Administrator"}
//             </Text>

//             <View style={styles.metricsRibbonTrack}>
//               <View style={styles.metricStatBlock}>
//                 <Text style={styles.metricMainNumber}>
//                   {authenticatedUser?.registeredSalons?.length ||
//                     authenticatedUser?.salonCount ||
//                     0}
//                 </Text>
//                 <Text style={styles.metricSubLabel}>Salons</Text>
//               </View>
//               <View style={styles.hairlineVerticalDivider} />
//               <View style={styles.metricStatBlock}>
//                 <Text style={styles.metricMainNumber}>
//                   {authenticatedUser?.barbersCount || 0}
//                 </Text>
//                 <Text style={styles.metricSubLabel}>Barbers</Text>
//               </View>
//               <View style={styles.hairlineVerticalDivider} />
//               <View style={styles.metricStatBlock}>
//                 <Text style={styles.metricMainNumber}>
//                   {authenticatedUser?.customersCount || 0}
//                 </Text>
//                 <Text style={styles.metricSubLabel}>Customers</Text>
//               </View>
//             </View>
//           </View>

//           {/* 2. Stripe Integration Tile */}
//           <TouchableOpacity
//             style={[
//               styles.premiumStripeActionTile,
//               {
//                 backgroundColor: darkTheme.colors.card,
//                 borderColor: darkTheme.colors.border,
//               },
//             ]}
//             activeOpacity={0.8}
//           >
//             <View style={styles.stripeLeftWrapper}>
//               <View style={styles.stripeBrandIconBox}>
//                 <FontAwesome5
//                   name="stripe-s"
//                   size={scale(15)}
//                   color="#635BFF"
//                 />
//               </View>
//               <View style={styles.stripeTextStack}>
//                 <Text style={styles.stripeTitleText}>
//                   Stripe Merchant Integration
//                 </Text>
//                 <Text style={styles.stripeSubtitleText}>
//                   Status:{" "}
//                   {authenticatedUser?.vendorAccountDetails
//                     ?.vendorCardPaymentStatus || "Inactive"}
//                 </Text>
//               </View>
//             </View>
//             <Ionicons
//               name="chevron-forward"
//               size={scale(14)}
//               color={darkTheme.colors.textMuted}
//             />
//           </TouchableOpacity>

//           {/* Progress Section */}
//           <View style={styles.progressTrackerHeaderSection}>
//             <View style={styles.progressSplitTextRow}>
//               <Text style={styles.progressLabelText}>PROFILE COMPLETION</Text>
//               <Text
//                 style={[
//                   styles.progressPercentText,
//                   { color: darkTheme.colors.accent },
//                 ]}
//               >
//                 {completionPercentage}%
//               </Text>
//             </View>
//             <View style={styles.progressTrackBackgroundLine}>
//               <View
//                 style={[
//                   styles.progressActiveFillLine,
//                   {
//                     backgroundColor: darkTheme.colors.accent,
//                     width: `${completionPercentage}%`,
//                   },
//                 ]}
//               />
//             </View>
//           </View>

//           {/* 3. Pure Dark Form Workspaces */}
//           <View style={styles.formContainerVerticalDeck}>
//             {/* Input Element: Full Name */}
//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>FULL NAME</Text>
//               <TextInput
//                 style={[
//                   styles.luxuryTextInput,
//                   {
//                     borderColor: darkTheme.colors.border,
//                     color: darkTheme.colors.textMain,
//                     backgroundColor: darkTheme.colors.card,
//                   },
//                 ]}
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="Enter workspace name..."
//                 placeholderTextColor={darkTheme.colors.textMuted}
//                 selectionColor={darkTheme.colors.accent}
//               />
//             </View>

//             {/* Input Element: Email Address */}
//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>EMAIL ADDRESS</Text>
//               <View style={styles.inputWithIconAnchorWrapper}>
//                 <TextInput
//                   style={[
//                     styles.luxuryTextInput,
//                     {
//                       borderColor: darkTheme.colors.border,
//                       color: darkTheme.colors.textMain,
//                       backgroundColor: darkTheme.colors.card,
//                       paddingRight: scale(45),
//                     },
//                   ]}
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   selectionColor={darkTheme.colors.accent}
//                 />
//                 <View style={styles.fieldStatusIconOverlayContainer}>
//                   {authenticatedUser?.emailVerified ? (
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={scale(16)}
//                       color="#34C759"
//                     />
//                   ) : (
//                     <TouchableOpacity
//                       onPress={() =>
//                         triggerVerificationFlow(
//                           "Email",
//                           email,
//                           authenticatedUser?.emailVerified,
//                         )
//                       }
//                     >
//                       <Ionicons
//                         name="close-circle"
//                         size={scale(16)}
//                         color="#FF3B30"
//                       />
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             </View>

//             {/* Input Element: Security Password Interceptor */}
//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>
//                 SECURITY PASSWORD
//               </Text>
//               <TouchableOpacity
//                 activeOpacity={1}
//                 onPress={() => setPasswordModalVisible(true)}
//                 style={[
//                   styles.luxuryDropdownTriggerButton,
//                   {
//                     borderColor: darkTheme.colors.border,
//                     backgroundColor: darkTheme.colors.card,
//                   },
//                 ]}
//               >
//                 <Text
//                   style={{
//                     color: darkTheme.colors.textMain,
//                     fontSize: scale(13),
//                   }}
//                 >
//                   {password}
//                 </Text>
//                 <Ionicons
//                   name="lock-closed-outline"
//                   size={scale(13)}
//                   color={darkTheme.colors.textMuted}
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Input Element: Mobile Number */}
//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>MOBILE NUMBER</Text>
//               <View style={styles.inputWithIconAnchorWrapper}>
//                 <TextInput
//                   style={[
//                     styles.luxuryTextInput,
//                     {
//                       borderColor: isMobileValid
//                         ? darkTheme.colors.border
//                         : "#FF3B30",
//                       color: darkTheme.colors.textMain,
//                       backgroundColor: darkTheme.colors.card,
//                       paddingRight: scale(45),
//                     },
//                   ]}
//                   value={mobNumber}
//                   onChangeText={setMobNumber}
//                   keyboardType="phone-pad"
//                   placeholder="+1 (555) 000-0000"
//                   placeholderTextColor={darkTheme.colors.textMuted}
//                   selectionColor={darkTheme.colors.accent}
//                 />
//                 <View style={styles.fieldStatusIconOverlayContainer}>
//                   {authenticatedUser?.mobileVerified ? (
//                     <Ionicons
//                       name="checkmark-circle"
//                       size={scale(16)}
//                       color="#34C759"
//                     />
//                   ) : (
//                     <TouchableOpacity
//                       onPress={() =>
//                         triggerVerificationFlow(
//                           "Mobile Phone",
//                           mobNumber,
//                           authenticatedUser?.mobileVerified,
//                         )
//                       }
//                     >
//                       <Ionicons
//                         name="close-circle"
//                         size={scale(16)}
//                         color="#FF3B30"
//                       />
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             </View>

//             {/* Input Element: Gender */}
//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>
//                 GENDER ASSIGNMENT
//               </Text>
//               <Dropdown
//                 style={[
//                   styles.dropdownMainElementContainer,
//                   {
//                     backgroundColor: darkTheme.colors.card,
//                     borderColor: isGenderFocused
//                       ? darkTheme.colors.accent
//                       : darkTheme.colors.border,
//                   },
//                 ]}
//                 placeholderStyle={[
//                   styles.dropdownPlaceholderTextStyle,
//                   { color: darkTheme.colors.textMuted },
//                 ]}
//                 selectedTextStyle={[
//                   styles.dropdownSelectedTextStyle,
//                   { color: darkTheme.colors.textMain },
//                 ]}
//                 containerStyle={[
//                   styles.dropdownMenuInnerContainerBox,
//                   {
//                     backgroundColor: "#0A0A0C",
//                     borderColor: darkTheme.colors.border,
//                   },
//                 ]}
//                 itemContainerStyle={styles.dropdownItemRowUnit}
//                 itemTextStyle={[
//                   styles.dropdownItemRowText,
//                   { color: darkTheme.colors.textMain },
//                 ]}
//                 activeColor="rgba(255, 149, 0, 0.08)"
//                 data={GENDER_OPTIONS}
//                 maxHeight={200}
//                 labelField="label"
//                 valueField="value"
//                 placeholder="Select assigned gender"
//                 value={gender}
//                 onFocus={() => setIsGenderFocused(true)}
//                 onBlur={() => setIsGenderFocused(false)}
//                 onChange={(item) => {
//                   setGender(item.value);
//                   setIsGenderFocused(false);
//                 }}
//                 renderRightIcon={() => (
//                   <Ionicons
//                     name="chevron-down"
//                     size={scale(13)}
//                     color={
//                       isGenderFocused
//                         ? darkTheme.colors.accent
//                         : darkTheme.colors.textMuted
//                     }
//                   />
//                 )}
//               />
//             </View>

//             {/* Input Element: Date of Birth Picker Overlay */}
//             <View style={styles.inputLayoutContainerGroup}>
//               <Text style={styles.premiumFieldLabelMicro}>DATE OF BIRTH</Text>
//               <TouchableOpacity
//                 style={[
//                   styles.luxuryDropdownTriggerButton,
//                   {
//                     borderColor: darkTheme.colors.border,
//                     backgroundColor: darkTheme.colors.card,
//                   },
//                 ]}
//                 activeOpacity={0.7}
//                 onPress={() => setShowDatePicker(true)}
//               >
//                 <Text
//                   style={{
//                     color: darkTheme.colors.textMain,
//                     fontSize: scale(13),
//                   }}
//                 >
//                   {formatDisplayDate(dobDate)}
//                 </Text>
//                 <Ionicons
//                   name="calendar-outline"
//                   size={scale(13)}
//                   color={darkTheme.colors.textMuted}
//                 />
//               </TouchableOpacity>

//               <Modal
//                 transparent={true}
//                 visible={showDatePicker}
//                 animationType="fade"
//                 onRequestClose={() => setShowDatePicker(false)}
//               >
//                 <TouchableWithoutFeedback
//                   onPress={() => setShowDatePicker(false)}
//                 >
//                   <View style={styles.modalOverlayScrim}>
//                     <TouchableWithoutFeedback>
//                       <View
//                         style={[
//                           styles.calendarModalContent,
//                           { backgroundColor: darkTheme.colors.card },
//                         ]}
//                       >
//                         <DateTimePicker
//                           value={dobDate}
//                           mode="date"
//                           display={
//                             Platform.OS === "ios" ? "spinner" : "default"
//                           }
//                           onChange={handleDateChange}
//                           maximumDate={new Date()}
//                           themeVariant="dark"
//                         />
//                         {Platform.OS === "ios" && (
//                           <TouchableOpacity
//                             style={[
//                               styles.modalSubmitActionCTAButton,
//                               { backgroundColor: darkTheme.colors.accent },
//                             ]}
//                             onPress={() => setShowDatePicker(false)}
//                             activeOpacity={0.8}
//                           >
//                             <Text
//                               style={{
//                                 color: "#000000",
//                                 fontWeight: "700",
//                                 fontSize: scale(13),
//                               }}
//                             >
//                               Done
//                             </Text>
//                           </TouchableOpacity>
//                         )}
//                       </View>
//                     </TouchableWithoutFeedback>
//                   </View>
//                 </TouchableWithoutFeedback>
//               </Modal>
//             </View>
//           </View>

//           {/* Primary Save Changes Trigger */}
//           <TouchableOpacity
//             style={[
//               styles.saveProfileChangesCTAButton,
//               {
//                 backgroundColor: darkTheme.colors.accent,
//                 height: darkTheme.layout.buttonHeight || verticalScale(40),
//               },
//             ]}
//             activeOpacity={0.8}
//             onPress={saveProfileHandler}
//             disabled={updateProfileLoader}
//           >
//             {updateProfileLoader ? (
//               <ActivityIndicator color={"#000000"} />
//             ) : (
//               <Text
//                 style={[
//                   darkTheme.typography.btnText,
//                   { color: "#000000", fontWeight: "700" },
//                 ]}
//               >
//                 Save Profile Changes
//               </Text>
//             )}
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>

//       {/* ==================== SCREEN MODALS MODIFICATION SHEETS ==================== */}

//       {/* A. System Password Update Sheet */}
//       <Modal
//         transparent={true}
//         visible={passwordModalVisible}
//         animationType="slide"
//         onRequestClose={() => setPasswordModalVisible(false)}
//       >
//         <TouchableWithoutFeedback
//           onPress={() => setPasswordModalVisible(false)}
//         >
//           <View style={styles.modalBottomOverlayScrim}>
//             <TouchableWithoutFeedback>
//               <View
//                 style={[
//                   styles.bottomSheetPanelContentBox,
//                   {
//                     backgroundColor: "#0A0A0C",
//                     borderColor: darkTheme.colors.border,
//                   },
//                 ]}
//               >
//                 <View style={styles.bottomSheetHeaderIndicatorNotch} />
//                 <Text
//                   style={[
//                     styles.modalLayoutHeadlineText,
//                     { color: darkTheme.colors.textMain },
//                   ]}
//                 >
//                   Change your password
//                 </Text>

//                 <View style={styles.innerModalFormVerticalStackDeck}>
//                   <View style={styles.inputLayoutContainerGroup}>
//                     <Text style={styles.premiumFieldLabelMicro}>
//                       CURRENT PASSWORD
//                     </Text>
//                     <TextInput
//                       style={[
//                         styles.luxuryTextInput,
//                         {
//                           borderColor: darkTheme.colors.border,
//                           color: darkTheme.colors.textMain,
//                           backgroundColor: darkTheme.colors.card,
//                         },
//                       ]}
//                       secureTextEntry
//                       value={oldPassword}
//                       onChangeText={setOldPassword}
//                       placeholder="Enter old password"
//                       placeholderTextColor="rgba(255,255,255,0.2)"
//                     />
//                   </View>

//                   <View style={styles.inputLayoutContainerGroup}>
//                     <Text style={styles.premiumFieldLabelMicro}>
//                       NEW PASSWORD
//                     </Text>
//                     <TextInput
//                       style={[
//                         styles.luxuryTextInput,
//                         {
//                           borderColor: darkTheme.colors.border,
//                           color: darkTheme.colors.textMain,
//                           backgroundColor: darkTheme.colors.card,
//                         },
//                       ]}
//                       secureTextEntry
//                       value={newPassword}
//                       onChangeText={setNewPassword}
//                       placeholder="Enter new password"
//                       placeholderTextColor="rgba(255,255,255,0.2)"
//                     />
//                   </View>

//                   <View style={styles.inputLayoutContainerGroup}>
//                     <Text style={styles.premiumFieldLabelMicro}>
//                       CONFIRM PASSWORD
//                     </Text>
//                     <TextInput
//                       style={[
//                         styles.luxuryTextInput,
//                         {
//                           borderColor: darkTheme.colors.border,
//                           color: darkTheme.colors.textMain,
//                           backgroundColor: darkTheme.colors.card,
//                         },
//                       ]}
//                       secureTextEntry
//                       value={confirmPassword}
//                       onChangeText={setConfirmPassword}
//                       placeholder="Enter confirm password"
//                       placeholderTextColor="rgba(255,255,255,0.2)"
//                     />
//                   </View>
//                 </View>

//                 <TouchableOpacity
//                   style={[
//                     styles.modalSubmitActionCTAButton,
//                     {
//                       backgroundColor: darkTheme.colors.accent,
//                       marginTop: verticalScale(20),
//                     },
//                   ]}
//                   onPress={savePasswordHandler}
//                 >
//                   <Text
//                     style={{
//                       color: "#000000",
//                       fontWeight: "700",
//                       fontSize: scale(13),
//                     }}
//                   >
//                     Update password
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>

//       {/* B. OTP Verification Sheet */}
//       <Modal
//         transparent={true}
//         visible={verificationModalVisible}
//         animationType="slide"
//         onRequestClose={() => setVerificationModalVisible(false)}
//       >
//         <TouchableWithoutFeedback
//           onPress={() => setVerificationModalVisible(false)}
//         >
//           <View style={styles.modalBottomOverlayScrim}>
//             <TouchableWithoutFeedback>
//               <View
//                 style={[
//                   styles.bottomSheetPanelContentBox,
//                   {
//                     backgroundColor: "#0A0A0C",
//                     borderColor: darkTheme.colors.border,
//                   },
//                 ]}
//               >
//                 <View style={styles.bottomSheetHeaderIndicatorNotch} />
//                 <Text
//                   style={[
//                     styles.modalLayoutHeadlineText,
//                     { color: darkTheme.colors.textMain },
//                   ]}
//                 >
//                   Verify {verificationTarget.type}
//                 </Text>
//                 <Text style={styles.modalLayoutSubHeaderText}>
//                   We have sent a code to your{" "}
//                   {verificationTarget.value || "your credentials"}.
//                 </Text>

//                 <View style={styles.innerModalFormVerticalStackDeck}>
//                   <View style={styles.inputLayoutContainerGroup}>
//                     <Text style={styles.premiumFieldLabelMicro}>
//                       ENTER 4-DIGIT OTP AUTH CODE
//                     </Text>
//                     <TextInput
//                       style={[
//                         styles.luxuryTextInput,
//                         {
//                           borderColor: darkTheme.colors.accent,
//                           color: darkTheme.colors.textMain,
//                           backgroundColor: darkTheme.colors.card,
//                           letterSpacing: scale(4),
//                           textAlign: "center",
//                           fontSize: scale(16),
//                           fontWeight: "700",
//                         },
//                       ]}
//                       keyboardType="number-pad"
//                       maxLength={6}
//                       value={otpCode}
//                       onChangeText={setOtpCode}
//                       placeholder="0000"
//                       placeholderTextColor="rgba(255,255,255,0.15)"
//                     />
//                   </View>

//                   <View style={styles.otpActionUtilityControlContextRow}>
//                     <Text
//                       style={{
//                         color: "rgba(255,255,255,0.3)",
//                         fontSize: scale(11),
//                       }}
//                     >
//                       Didn't acquire the payload?
//                     </Text>
//                     <TouchableOpacity onPress={handleResendOTP}>
//                       <Text
//                         style={{
//                           color: darkTheme.colors.accent,
//                           fontWeight: "700",
//                           fontSize: scale(11),
//                         }}
//                       >
//                         {" "}
//                         Resend Token
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>

//                 <TouchableOpacity
//                   style={[
//                     styles.modalSubmitActionCTAButton,
//                     {
//                       backgroundColor: darkTheme.colors.accent,
//                       marginTop: verticalScale(20),
//                     },
//                   ]}
//                   onPress={handleVerifyOTP}
//                 >
//                   <Text
//                     style={{
//                       color: "#000000",
//                       fontWeight: "700",
//                       fontSize: scale(13),
//                     }}
//                   >
//                     Confirm Authorization
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default EditProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   keyboardContainer: {
//     flex: 1,
//   },
//   scrollContainer: {
//     paddingHorizontal: scale(18),
//     paddingBottom: verticalScale(40),
//     paddingTop: verticalScale(12),
//   },
//   heroSectionContainer: {
//     width: "100%",
//     alignItems: "center",
//     marginBottom: verticalScale(18),
//   },
//   avatarWrapperContainer: {
//     position: "relative",
//     alignItems: "center",
//     justifyContent: "center",
//     width: scale(84),
//     height: scale(84),
//   },
//   avatarOuterRing: {
//     width: scale(80),
//     height: scale(80),
//     borderRadius: scale(40),
//     borderWidth: 1.5,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.01)",
//   },
//   avatarInnerCircle: {
//     width: scale(70),
//     height: scale(70),
//     borderRadius: scale(35),
//     backgroundColor: "#161618",
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//   },
//   avatarImagePlacement: {
//     width: "100%",
//     height: "100%",
//   },
//   cameraFloatingBadge: {
//     position: "absolute",
//     bottom: scale(2),
//     right: scale(2),
//     width: scale(24),
//     height: scale(24),
//     borderRadius: scale(12),
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 2,
//   },
//   userNameHeading: {
//     fontSize: scale(18),
//     fontWeight: "700",
//     marginTop: verticalScale(14),
//     letterSpacing: -0.3,
//   },
//   userRoleTagLabel: {
//     fontSize: scale(10),
//     fontWeight: "700",
//     textTransform: "uppercase",
//     color: "rgba(255,255,255,0.3)",
//     letterSpacing: 1.2,
//     marginTop: verticalScale(3),
//   },
//   metricsRibbonTrack: {
//     flexDirection: "row",
//     width: "100%",
//     marginTop: verticalScale(20),
//     paddingVertical: verticalScale(4),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   metricStatBlock: {
//     flex: 1,
//     alignItems: "center",
//   },
//   metricMainNumber: {
//     color: "#FFFFFF",
//     fontSize: scale(16),
//     fontWeight: "800",
//     letterSpacing: -0.2,
//   },
//   metricSubLabel: {
//     color: "rgba(255,255,255,0.35)",
//     fontSize: scale(10),
//     fontWeight: "600",
//     marginTop: verticalScale(2),
//   },
//   hairlineVerticalDivider: {
//     width: 1,
//     height: verticalScale(16),
//     backgroundColor: "rgba(255,255,255,0.08)",
//   },
//   premiumStripeActionTile: {
//     width: "100%",
//     height: verticalScale(56),
//     borderRadius: scale(10),
//     borderWidth: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: scale(14),
//     marginTop: verticalScale(6),
//   },
//   stripeLeftWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   stripeBrandIconBox: {
//     width: scale(28),
//     height: scale(28),
//     borderRadius: scale(6),
//     backgroundColor: "rgba(99, 91, 255, 0.1)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   stripeTextStack: {
//     marginLeft: scale(12),
//     flex: 1,
//   },
//   stripeTitleText: {
//     color: "#FFFFFF",
//     fontSize: scale(13),
//     fontWeight: "600",
//   },
//   stripeSubtitleText: {
//     color: "rgba(255,255,255,0.4)",
//     fontSize: scale(10),
//     marginTop: verticalScale(2),
//   },
//   progressTrackerHeaderSection: {
//     width: "100%",
//     marginTop: verticalScale(24),
//   },
//   progressSplitTextRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//   },
//   progressLabelText: {
//     fontSize: scale(9),
//     fontWeight: "800",
//     color: "rgba(255,255,255,0.4)",
//     letterSpacing: 0.8,
//   },
//   progressPercentText: {
//     fontSize: scale(11),
//     fontWeight: "800",
//   },
//   progressTrackBackgroundLine: {
//     width: "100%",
//     height: scale(2.5),
//     backgroundColor: "#18181A",
//     borderRadius: scale(1.5),
//     marginTop: verticalScale(6),
//     overflow: "hidden",
//   },
//   progressActiveFillLine: {
//     height: "100%",
//     borderRadius: scale(1.5),
//   },
//   formContainerVerticalDeck: {
//     width: "100%",
//     marginTop: verticalScale(16),
//     gap: verticalScale(14),
//   },
//   inputLayoutContainerGroup: {
//     width: "100%",
//   },
//   premiumFieldLabelMicro: {
//     fontSize: scale(9),
//     fontWeight: "800",
//     color: "rgba(255,255,255,0.4)",
//     letterSpacing: 1,
//     marginBottom: verticalScale(6),
//   },
//   inputWithIconAnchorWrapper: {
//     position: "relative",
//     width: "100%",
//   },
//   fieldStatusIconOverlayContainer: {
//     position: "absolute",
//     right: scale(12),
//     top: 0,
//     height: scale(38),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   luxuryTextInput: {
//     width: "100%",
//     height: scale(38),
//     borderRadius: scale(8),
//     borderWidth: 1,
//     paddingHorizontal: scale(12),
//     fontSize: scale(13),
//     fontWeight: "400",
//   },
//   luxuryDropdownTriggerButton: {
//     width: "100%",
//     height: scale(38),
//     borderRadius: scale(8),
//     borderWidth: 1,
//     paddingHorizontal: scale(12),
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   saveProfileChangesCTAButton: {
//     width: "100%",
//     borderRadius: scale(8),
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: verticalScale(28),
//   },
//   dropdownMainElementContainer: {
//     width: "100%",
//     height: scale(38),
//     borderRadius: scale(8),
//     borderWidth: 1,
//     paddingHorizontal: scale(12),
//   },
//   dropdownPlaceholderTextStyle: {
//     fontSize: scale(13),
//   },
//   dropdownSelectedTextStyle: {
//     fontSize: scale(13),
//   },
//   dropdownMenuInnerContainerBox: {
//     borderRadius: scale(8),
//     borderWidth: 1,
//     marginTop: verticalScale(4),
//     paddingVertical: verticalScale(4),
//   },
//   dropdownItemRowUnit: {
//     paddingVertical: verticalScale(0),
//     paddingHorizontal: scale(12),
//   },
//   dropdownItemRowText: {
//     fontSize: scale(13),
//   },
//   modalOverlayScrim: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.75)",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: scale(20),
//   },
//   calendarModalContent: {
//     width: "100%",
//     borderRadius: scale(14),
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.08)",
//     padding: scale(16),
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modalSubmitActionCTAButton: {
//     width: "100%",
//     borderRadius: scale(8),
//     alignItems: "center",
//     justifyContent: "center",
//     height: scale(40),
//   },
//   modalBottomOverlayScrim: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     justifyContent: "flex-end",
//   },
//   bottomSheetPanelContentBox: {
//     borderTopLeftRadius: scale(16),
//     borderTopRightRadius: scale(16),
//     borderWidth: 1,
//     borderBottomWidth: 0,
//     paddingHorizontal: scale(20),
//     paddingTop: verticalScale(12),
//     paddingBottom: verticalScale(34),
//   },
//   bottomSheetHeaderIndicatorNotch: {
//     width: scale(36),
//     height: verticalScale(4),
//     borderRadius: scale(2),
//     backgroundColor: "rgba(255,255,255,0.15)",
//     alignSelf: "center",
//     marginBottom: verticalScale(16),
//   },
//   modalLayoutHeadlineText: {
//     fontSize: scale(16),
//     fontWeight: "700",
//     letterSpacing: -0.2,
//   },
//   modalLayoutSubHeaderText: {
//     fontSize: scale(11),
//     color: "rgba(255,255,255,0.4)",
//     marginTop: verticalScale(3),
//     lineHeight: scale(15),
//   },
//   innerModalFormVerticalStackDeck: {
//     marginTop: verticalScale(20),
//     gap: verticalScale(14),
//   },
//   otpActionUtilityControlContextRow: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     marginTop: verticalScale(2),
//   },
// });

import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import PhoneInput from "@linhnguyen96114/react-native-phone-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../../../components/Header/Header";
import { darkTheme } from "../../../../constants/appTheme";
import { useAdminAuth } from "../../../../context/admin/AuthContext";
import api from "../../../../utils/api";

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const EditProfileScreen = () => {
  const { fetchLoggedInAdmin, authenticatedUser } = useAdminAuth();
  const phoneInputRef = useRef(null);
  const timerRef = useRef(null);

  // Core Form Local States
  const [name, setName] = useState(authenticatedUser?.name || "");
  const [email, setEmail] = useState(authenticatedUser?.email || "");
  const [password, setPassword] = useState("********");
  const [gender, setGender] = useState(authenticatedUser?.gender || "Male");

  const [mobNumber, setMobNumber] = useState(
    authenticatedUser?.mobileNumber
      ? String(authenticatedUser.mobileNumber)
      : "",
  );
  const [countryCode, setCountryCode] = useState(
    authenticatedUser?.mobileCountryCode
      ? String(authenticatedUser.mobileCountryCode)
      : "",
  );

  const [isMobileValid, setIsMobileValid] = useState(false);

  // Added Inline Error States
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");

  // Date & Structural Layout State Controls
  const [dobDate, setDobDate] = useState(
    authenticatedUser?.dateOfBirth
      ? new Date(authenticatedUser.dateOfBirth)
      : new Date(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isGenderFocused, setIsGenderFocused] = useState(false);

  // Modal Control States
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);
  const [verificationTarget, setVerificationTarget] = useState({
    type: "",
    value: "",
  });

  // Password Sub-States
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP Verification Sub-States & Timer Matrix Setup
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(0);

  const [avatarUri, setAvatarUri] = useState(
    authenticatedUser?.profile?.[0]?.url || null,
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Effect hook to process the ticking clock mechanism for the OTP screen
  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [countdown]);

  const formatDisplayDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDobDate(selectedDate);
    }
  };

  const isEmailValid = email.includes("@") && email.includes(".");

  // ==================== IMAGE PICKING & UPLOAD HANDLING ====================
  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "Workspace requires access to your system camera roll parameters to select an avatar.",
      );
      return;
    }

    // Updated layout utilizing the non-deprecated MediaType property configuration
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // Can also be explicit string value syntax or ImagePicker.MediaType.IMAGES depending on precise minor SDK target
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setAvatarUri(selectedAsset.uri);
      await uploadAvatarToServer(selectedAsset);
    }
  };

  const uploadAvatarToServer = async (asset) => {
    const extension = asset.uri.split(".").pop()?.toLowerCase();
    const mimeType =
      extension === "jpg" || extension === "jpeg"
        ? "image/jpeg"
        : extension === "png"
          ? "image/png"
          : extension === "webp"
            ? "image/webp"
            : "image/jpeg";

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(mimeType)) {
      Alert.alert(
        "Invalid File",
        "Please upload only JPEG, PNG or WebP images.",
      );
      return;
    }

    setIsUploadingImage(true);

    const formData = new FormData();
    formData.append("email", authenticatedUser.email);
    formData.append("salonId", String(authenticatedUser.salonId));

    formData.append("profile", {
      uri: Platform.OS === "ios" ? asset.uri.replace("file://", "") : asset.uri,
      name: asset.fileName || `profile.${extension || "jpg"}`,
      type: mimeType,
    });

    try {
      const { data } = await api.post(
        "/admin/uploadAdminProfilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (!data.success) {
        throw new Error(data.message);
      }

      Alert.alert("Success", data.message || "Profile uploaded successfully.");
    } catch (error) {
      Alert.alert(
        "Upload Failed",
        error.response?.data?.message || error.message,
      );
    } finally {
      setIsUploadingImage(false);
    }
  };
  // =========================================================================

  const triggerVerificationFlow = async (type, value, isVerified) => {
    if (isVerified) return;

    try {
      if (type === "Mobile Phone") {
        await api.post("/admin/sendVerificationCodeForAdminMobile", {
          email: authenticatedUser?.email,
        });
      } else if (type === "Email") {
        await api.post("/admin/sendVerificationCodeForAdminEmail", {
          email: authenticatedUser?.email,
        });
      }

      setOtpCode("");
      setOtpError("");
      setVerificationTarget({ type, value });
      setVerificationModalVisible(true);

      // Initialize the 30-second window lockout timer on modal entry
      setCountdown(30);
    } catch (error) {
      Alert.alert(
        "Verification Failed",
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong.",
      );
    }
  };

  const [handleVerifyLoader, setHandlerVerifyLoader] = useState(false);

  const handleVerifyOTP = async () => {
    setOtpError("");
    try {
      setHandlerVerifyLoader(true);
      if (verificationTarget.type === "Mobile Phone") {
        const { data } = await api.post("/admin/changeMobileVerifiedStatus", {
          email: authenticatedUser?.email,
          verificationCode: otpCode,
        });
        Alert.alert("Success", data.message);
      } else {
        const { data } = await api.post("/admin/changeEmailVerifiedStatus", {
          email: authenticatedUser?.email,
          verificationCode: otpCode,
        });
        Alert.alert("Success", data.message);
      }

      setVerificationModalVisible(false);
      setOtpCode("");
      await fetchLoggedInAdmin();
      if (timerRef.current) clearTimeout(timerRef.current);
      setCountdown(0);
    } catch (error) {
      setOtpError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong.",
      );
    } finally {
      setHandlerVerifyLoader(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return; // Prevent unnecessary dispatches during execution cooldown

    try {
      setOtpError("");
      if (verificationTarget.type === "Mobile Phone") {
        await api.post("/admin/sendVerificationCodeForAdminMobile", {
          email: authenticatedUser?.email,
        });
      } else {
        await api.post("/admin/sendVerificationCodeForAdminEmail", {
          email: authenticatedUser?.email,
        });
      }

      Alert.alert("Success", "A new verification code has been sent.");

      setCountdown(30);
    } catch (error) {
      setOtpError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to resend authorization token.",
      );
    }
  };

  const [savePasswordLoader, setSavePasswordLoader] = useState(false);

  const savePasswordHandler = async () => {
    let failed = false;
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      if (!oldPassword)
        setOldPasswordError("Please fill in all password fields.");
      if (!newPassword)
        setNewPasswordError("Please fill in all password fields.");
      if (!confirmPassword)
        setConfirmPasswordError("Please fill in all password fields.");
      failed = true;
    }

    if (oldPassword && oldPassword.length < 8) {
      setOldPasswordError(
        "Current password must be at least 8 characters long.",
      );
      failed = true;
    }

    if (newPassword && newPassword.length < 8) {
      setNewPasswordError("New password must be at least 8 characters long.");
      failed = true;
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError(
        "New password and confirm password do not match.",
      );
      failed = true;
    }

    if (failed) return;

    try {
      setSavePasswordLoader(true);
      const { data } = await api.post("/admin/updateAdminPassword", {
        email: authenticatedUser?.email,
        oldPassword,
        password: newPassword,
      });

      Alert.alert("Success", data?.message || "Password updated successfully.");

      setPasswordModalVisible(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setConfirmPasswordError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong.",
      );
    } finally {
      setSavePasswordLoader(false);
    }
  };

  const [updateProfileLoader, setUpdateProfileLoader] = useState(false);

  const saveProfileHandler = async () => {
    let failed = false;
    setNameError("");
    setEmailError("");
    setMobileError("");

    if (name.trim().length === 0) {
      setNameError("Full Name validation error.");
      failed = true;
    }

    if (name.length === 0 || name.length > 20) {
      setNameError("Full name must be between 1 to 20 characters");
      failed = true;
    }

    if (email.trim().length === 0 || !isEmailValid) {
      setEmailError("Email address validation error.");
      failed = true;
    }
    if (mobNumber.trim().length === 0 || !isMobileValid) {
      setMobileError("Mobile number validation error.");
      failed = true;
    }

    if (failed) return;

    const profileData = {
      name,
      email,
      mobileNumber: mobNumber,
      gender,
      dateOfBirth: dobDate.toISOString().split("T")[0] || "",
      countryCode: countryCode,
    };

    try {
      setUpdateProfileLoader(true);
      const response = await api.put(
        "/admin/updateAdminAcoountDetails",
        profileData,
      );

      await fetchLoggedInAdmin();

      Alert.alert(
        "Profile Updated",
        response?.data?.message ||
          "Workspace identity metrics successfully synchronized.",
      );
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to synchronize profile adjustments with the server.";
      setEmailError(errorMessage);
    } finally {
      setUpdateProfileLoader(false);
    }
  };

  // --- ADD THIS STATE & THESE HANDLERS ---
  const [connectStripeLoading, setConnectStripeLoading] = useState(false);

  const stripeConnectHandler = async () => {
    try {
      const onboardData = {
        email: authenticatedUser.email, // Using your RN variable name
        vendorAccountId: authenticatedUser.vendorAccountId,
      };
      setConnectStripeLoading(true);

      const { data } = await api.post(
        "/onboard-vendor-account",
        onboardData,
      );

      if (data?.response?.url) {
        await Linking.openURL(data.response.url);
      }
      setConnectStripeLoading(false);
    } catch (error) {
      setConnectStripeLoading(false);
      Alert.alert(
        "Stripe Connection Failed",
        error?.response?.data?.response || error.message,
      );
    }
  };

  const loginStripeHandler = async () => {
    try {
      const { data } = await api.post("/vendor-loginlink", {
        email: authenticatedUser.email,
      });

      if (data?.url) {
        await Linking.openURL(data.url);
      }
    } catch (error) {
      Alert.alert("Error", "Could not open Stripe dashboard.");
    }
  };

  // Completion Matrix calculations
  const totalFields = 5;
  let completedFieldsCount = 0;

  if (name.trim().length > 0) completedFieldsCount++;
  if (gender) completedFieldsCount++;
  if (password.trim().length > 0) completedFieldsCount++;

  if (
    email.trim().length > 0 &&
    isEmailValid &&
    authenticatedUser?.emailVerified
  )
    completedFieldsCount++;
  if (isMobileValid && authenticatedUser?.mobileVerified)
    completedFieldsCount++;

  const completionPercentage = Math.round(
    (completedFieldsCount / totalFields) * 100,
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
        title="Profile"
        subTitle="Manage your workspace identity"
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
          {/* 1. Hero Identity Block */}
          <View style={styles.heroSectionContainer}>
            <View style={styles.avatarWrapperContainer}>
              <View
                style={[
                  styles.avatarOuterRing,
                  { borderColor: darkTheme.colors.accent },
                ]}
              >
                <View style={styles.avatarInnerCircle}>
                  {avatarUri ? (
                    <Image
                      source={{ uri: avatarUri }}
                      style={styles.avatarImagePlacement}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons
                      name="person"
                      size={scale(32)}
                      color="rgba(255,255,255,0.6)"
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.cameraFloatingBadge,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
                activeOpacity={0.9}
                onPress={handleSelectImage}
                disabled={isUploadingImage}
              >
                <Feather name="camera" size={scale(11)} color="#000000" />
              </TouchableOpacity>
            </View>

            <Text
              style={[darkTheme.typography.cardTitle, styles.userNameHeading]}
            >
              {name}
            </Text>
            <Text style={styles.userRoleTagLabel}>
              {authenticatedUser?.role || "System Administrator"}
            </Text>

            <View style={styles.metricsRibbonTrack}>
              <View style={styles.metricStatBlock}>
                <Text style={styles.metricMainNumber}>
                  {authenticatedUser?.salonCount || 0}
                </Text>
                <Text style={styles.metricSubLabel}>Salons</Text>
              </View>
              <View style={styles.hairlineVerticalDivider} />
              <View style={styles.metricStatBlock}>
                <Text style={styles.metricMainNumber}>
                  {authenticatedUser?.barbersCount || 0}
                </Text>
                <Text style={styles.metricSubLabel}>Barbers</Text>
              </View>
              <View style={styles.hairlineVerticalDivider} />
              <View style={styles.metricStatBlock}>
                <Text style={styles.metricMainNumber}>
                  {authenticatedUser?.customersCount || 0}
                </Text>
                <Text style={styles.metricSubLabel}>Customers</Text>
              </View>
            </View>
          </View>

          {/* 2. Stripe Integration Tile */}
          {/* <TouchableOpacity
            style={[
              styles.premiumStripeActionTile,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
              },
            ]}
            activeOpacity={0.8}
          >
            <View style={styles.stripeLeftWrapper}>
              <View style={styles.stripeBrandIconBox}>
                <FontAwesome5
                  name="stripe-s"
                  size={scale(15)}
                  color="#635BFF"
                />
              </View>
              <View style={styles.stripeTextStack}>
                <Text style={styles.stripeTitleText}>
                  Stripe Merchant Integration
                </Text>
                <Text style={styles.stripeSubtitleText}>
                  Status:{" "}
                  {authenticatedUser?.vendorAccountDetails
                    ?.vendorCardPaymentStatus || "Inactive"}
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={scale(14)}
              color={darkTheme.colors.textMuted}
            />
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[
              styles.premiumStripeActionTile,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: darkTheme.colors.border,
              },
            ]}
            activeOpacity={0.8}
            // 1. Dynamic trigger based on the vendorTransferStatus status
            onPress={
              authenticatedUser?.vendorAccountDetails?.vendorTransferStatus ===
              "active"
                ? loginStripeHandler
                : connectStripeLoading
                  ? () => {}
                  : stripeConnectHandler
            }
          >
            <View style={styles.stripeLeftWrapper}>
              <View style={styles.stripeBrandIconBox}>
                <FontAwesome5
                  name="stripe-s"
                  size={scale(15)}
                  color="#635BFF"
                />
              </View>
              <View style={styles.stripeTextStack}>
                {/* 2. Dynamically updating label string just like web */}
                <Text style={styles.stripeTitleText}>
                  {authenticatedUser?.vendorAccountDetails
                    ?.vendorTransferStatus === "active"
                    ? "Login to Stripe Dashboard"
                    : connectStripeLoading
                      ? "Loading Setup URL..."
                      : "Connect Your Stripe Account"}
                </Text>
                <Text style={styles.stripeSubtitleText}>
                  Status:{" "}
                  {authenticatedUser?.vendorAccountDetails
                    ?.vendorCardPaymentStatus || "Inactive"}
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={scale(14)}
              color={darkTheme.colors.textMuted}
            />
          </TouchableOpacity>

          {/* Progress Section */}
          <View style={styles.progressTrackerHeaderSection}>
            <View style={styles.progressSplitTextRow}>
              <Text style={styles.progressLabelText}>PROFILE COMPLETION</Text>
              <Text
                style={[
                  styles.progressPercentText,
                  { color: darkTheme.colors.accent },
                ]}
              >
                {completionPercentage}%
              </Text>
            </View>
            <View style={styles.progressTrackBackgroundLine}>
              <View
                style={[
                  styles.progressActiveFillLine,
                  {
                    backgroundColor: darkTheme.colors.accent,
                    width: `${completionPercentage}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* 3. Dark Form Layout Block */}
          <View style={styles.formContainerVerticalDeck}>
            {/* Input Element: Full Name */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>FULL NAME</Text>
              <TextInput
                style={[
                  styles.luxuryTextInput,
                  {
                    borderColor: nameError ? "red" : darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                    backgroundColor: darkTheme.colors.card,
                  },
                ]}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) setNameError("");
                }}
                placeholder="Enter workspace name..."
                placeholderTextColor={darkTheme.colors.textMuted}
                selectionColor={darkTheme.colors.accent}
              />
              {nameError ? (
                <Text
                  style={{ color: "red", fontSize: scale(11), marginTop: 4 }}
                >
                  {nameError}
                </Text>
              ) : null}
            </View>

            {/* Input Element: Email Address */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>EMAIL ADDRESS</Text>
              <View style={styles.inputWithIconAnchorWrapper}>
                <TextInput
                  style={[
                    styles.luxuryTextInput,
                    {
                      borderColor: emailError ? "red" : darkTheme.colors.border,
                      color: darkTheme.colors.textMain,
                      backgroundColor: darkTheme.colors.card,
                      paddingRight: scale(45),
                    },
                  ]}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError("");
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  selectionColor={darkTheme.colors.accent}
                />
                <View style={styles.fieldStatusIconOverlayContainer}>
                  {authenticatedUser?.emailVerified ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={scale(16)}
                      color="#34C759"
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        triggerVerificationFlow(
                          "Email",
                          email,
                          authenticatedUser?.emailVerified,
                        )
                      }
                    >
                      <Ionicons
                        name="close-circle"
                        size={scale(16)}
                        color="#FF3B30"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {emailError ? (
                <Text
                  style={{ color: "red", fontSize: scale(11), marginTop: 4 }}
                >
                  {emailError}
                </Text>
              ) : null}
            </View>

            {/* Input Element: Security Password Interceptor */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                SECURITY PASSWORD
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setPasswordModalVisible(true)}
                style={[
                  styles.luxuryDropdownTriggerButton,
                  {
                    borderColor: darkTheme.colors.border,
                    backgroundColor: darkTheme.colors.card,
                  },
                ]}
              >
                <Text
                  style={{
                    color: darkTheme.colors.textMain,
                    fontSize: scale(13),
                  }}
                >
                  {password}
                </Text>
                <Ionicons
                  name="lock-closed-outline"
                  size={scale(13)}
                  color={darkTheme.colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            {/* Input Element: Mobile Number via PhoneInput */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>MOBILE NUMBER</Text>
              <View
                style={[
                  styles.inputWithIconAnchorWrapper,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderRadius: darkTheme.layout.borderRadiusMedium,
                    borderColor: mobileError ? "red" : "transparent",
                    borderWidth: mobileError ? 1 : 0,
                  },
                ]}
              >
                <PhoneInput
                  ref={phoneInputRef}
                  value={mobNumber}
                  onChangeText={(text) => {
                    setMobNumber(text);
                    if (mobileError) setMobileError("");
                    const valid =
                      phoneInputRef.current?.isValidNumber(text) ?? false;
                    setIsMobileValid(valid);
                  }}
                  onChangeCountry={(country) => {
                    setCountryCode(country?.callingCode[0]);
                  }}
                  withDarkTheme={true}
                  containerStyle={[
                    styles.phoneContainer,
                    {
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      borderRadius: darkTheme.layout.borderRadiusMedium,
                      height: darkTheme.layout.componentHeight,
                    },
                  ]}
                  textContainerStyle={{
                    backgroundColor: "transparent",
                    paddingVertical: 0,
                  }}
                  textInputStyle={[
                    darkTheme.typography.bodyMain,
                    { height: "100%", fontSize: scale(13) },
                  ]}
                  codeTextStyle={{
                    color: darkTheme.colors.textMain,
                    fontSize: scale(13),
                  }}
                  flagStyle={styles.phoneFlagAlignment}
                />

                <View style={styles.fieldStatusIconOverlayContainer}>
                  {authenticatedUser?.mobileVerified ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={scale(16)}
                      color="#34C759"
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        triggerVerificationFlow(
                          "Mobile Phone",
                          mobNumber,
                          authenticatedUser?.mobileVerified,
                        )
                      }
                    >
                      <Ionicons
                        name="close-circle"
                        size={scale(16)}
                        color="#FF3B30"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {mobileError ? (
                <Text
                  style={{ color: "red", fontSize: scale(11), marginTop: 4 }}
                >
                  {mobileError}
                </Text>
              ) : (
                <Text
                  style={{
                    color: isMobileValid ? "green" : "red",
                    fontSize: scale(11),
                    marginTop: 4,
                  }}
                >
                  {isMobileValid ? "Valid Number" : "Invalid Number"}
                </Text>
              )}
            </View>

            {/* Input Element: Gender */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                GENDER ASSIGNMENT
              </Text>
              <Dropdown
                style={[
                  styles.dropdownMainElementContainer,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: isGenderFocused
                      ? darkTheme.colors.accent
                      : darkTheme.colors.border,
                  },
                ]}
                placeholderStyle={[
                  styles.dropdownPlaceholderTextStyle,
                  { color: darkTheme.colors.textMuted },
                ]}
                selectedTextStyle={[
                  styles.dropdownSelectedTextStyle,
                  { color: darkTheme.colors.textMain },
                ]}
                containerStyle={[
                  styles.dropdownMenuInnerContainerBox,
                  {
                    backgroundColor: "#0A0A0C",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
                itemContainerStyle={styles.dropdownItemRowUnit}
                itemTextStyle={[
                  styles.dropdownItemRowText,
                  { color: darkTheme.colors.textMain },
                ]}
                activeColor="rgba(255, 149, 0, 0.08)"
                data={GENDER_OPTIONS}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder="Select assigned gender"
                value={gender}
                onFocus={() => setIsGenderFocused(true)}
                onBlur={() => setIsGenderFocused(false)}
                onChange={(item) => {
                  setGender(item.value);
                  setIsGenderFocused(false);
                }}
                renderRightIcon={() => (
                  <Ionicons
                    name="chevron-down"
                    size={scale(13)}
                    color={
                      isGenderFocused
                        ? darkTheme.colors.accent
                        : darkTheme.colors.textMuted
                    }
                  />
                )}
              />
            </View>

            {/* Input Element: Date of Birth Picker Overlay */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>DATE OF BIRTH</Text>
              <TouchableOpacity
                style={[
                  styles.luxuryDropdownTriggerButton,
                  {
                    borderColor: darkTheme.colors.border,
                    backgroundColor: darkTheme.colors.card,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => setShowDatePicker(true)}
              >
                <Text
                  style={{
                    color: darkTheme.colors.textMain,
                    fontSize: scale(13),
                  }}
                >
                  {formatDisplayDate(dobDate)}
                </Text>
                <Ionicons
                  name="calendar-outline"
                  size={scale(13)}
                  color={darkTheme.colors.textMuted}
                />
              </TouchableOpacity>

              <Modal
                transparent={true}
                visible={showDatePicker}
                animationType="fade"
                onRequestClose={() => setShowDatePicker(false)}
              >
                <TouchableWithoutFeedback
                  onPress={() => setShowDatePicker(false)}
                >
                  <View style={styles.modalOverlayScrim}>
                    <TouchableWithoutFeedback>
                      <View
                        style={[
                          styles.calendarModalContent,
                          { backgroundColor: darkTheme.colors.card },
                        ]}
                      >
                        <DateTimePicker
                          value={dobDate}
                          mode="date"
                          display={
                            Platform.OS === "ios" ? "spinner" : "default"
                          }
                          onChange={handleDateChange}
                          maximumDate={new Date()}
                          themeVariant="dark"
                        />
                        {Platform.OS === "ios" && (
                          <TouchableOpacity
                            style={[
                              styles.modalSubmitActionCTAButton,
                              { backgroundColor: darkTheme.colors.accent },
                            ]}
                            onPress={() => setShowDatePicker(false)}
                            activeOpacity={0.8}
                          >
                            <Text
                              style={{
                                color: "#000000",
                                fontWeight: "700",
                                fontSize: scale(13),
                              }}
                            >
                              Done
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
          </View>

          {/* Primary Save Changes Trigger */}
          <TouchableOpacity
            style={[
              styles.saveProfileChangesCTAButton,
              {
                backgroundColor: darkTheme.colors.accent,
                height: darkTheme.layout.buttonHeight || verticalScale(40),
              },
            ]}
            activeOpacity={0.8}
            onPress={saveProfileHandler}
            disabled={updateProfileLoader}
          >
            {updateProfileLoader ? (
              <ActivityIndicator color={"#000000"} />
            ) : (
              <Text
                style={[
                  darkTheme.typography.btnText,
                  { color: "#000000", fontWeight: "700" },
                ]}
              >
                Save Profile Changes
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ==================== SCREEN MODALS MODIFICATION SHEETS ==================== */}

      {/* A. System Password Update Sheet */}
      <Modal
        transparent={true}
        visible={passwordModalVisible}
        animationType="slide"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setPasswordModalVisible(false)}
        >
          <View style={styles.modalBottomOverlayScrim}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.bottomSheetPanelContentBox,
                  {
                    backgroundColor: "#0A0A0C",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <View style={styles.bottomSheetHeaderIndicatorNotch} />
                <Text
                  style={[
                    styles.modalLayoutHeadlineText,
                    { color: darkTheme.colors.textMain },
                  ]}
                >
                  Change your password
                </Text>

                <View style={styles.innerModalFormVerticalStackDeck}>
                  <View style={styles.inputLayoutContainerGroup}>
                    <Text style={styles.premiumFieldLabelMicro}>
                      CURRENT PASSWORD
                    </Text>
                    <View style={{ position: "relative" }}>
                      <TextInput
                        style={[
                          styles.luxuryTextInput,
                          {
                            borderColor: oldPasswordError
                              ? "red"
                              : darkTheme.colors.border,
                            color: darkTheme.colors.textMain,
                            backgroundColor: darkTheme.colors.card,
                          },
                        ]}
                        secureTextEntry={!showOldPassword}
                        value={oldPassword}
                        onChangeText={(text) => {
                          setOldPassword(text);
                          if (oldPasswordError) setOldPasswordError("");
                        }}
                        placeholder="Enter old password"
                        placeholderTextColor="rgba(255,255,255,0.2)"
                      />

                      <TouchableOpacity
                        onPress={() => setShowOldPassword(!showOldPassword)}
                        style={{
                          position: "absolute",
                          right: 15,
                          top: 0,
                          bottom: 0,
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons
                          name={
                            showOldPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={20}
                          color={darkTheme.colors.textMuted}
                        />
                      </TouchableOpacity>
                    </View>
                    {oldPasswordError ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: scale(11),
                          marginTop: 4,
                        }}
                      >
                        {oldPasswordError}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.inputLayoutContainerGroup}>
                    <Text style={styles.premiumFieldLabelMicro}>
                      NEW PASSWORD
                    </Text>
                    <View style={{ position: "relative" }}>
                      <TextInput
                        style={[
                          styles.luxuryTextInput,
                          {
                            borderColor: newPasswordError
                              ? "red"
                              : darkTheme.colors.border,
                            color: darkTheme.colors.textMain,
                            backgroundColor: darkTheme.colors.card,
                          },
                        ]}
                        secureTextEntry={!showNewPassword}
                        value={newPassword}
                        onChangeText={(text) => {
                          setNewPassword(text);
                          if (newPasswordError) setNewPasswordError("");
                        }}
                        placeholder="Enter new password"
                        placeholderTextColor="rgba(255,255,255,0.2)"
                      />
                      <TouchableOpacity
                        onPress={() => setShowNewPassword(!showNewPassword)}
                        style={{
                          position: "absolute",
                          right: 15,
                          top: 0,
                          bottom: 0,
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons
                          name={
                            showNewPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={20}
                          color={darkTheme.colors.textMuted}
                        />
                      </TouchableOpacity>
                    </View>
                    {newPasswordError ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: scale(11),
                          marginTop: 4,
                        }}
                      >
                        {newPasswordError}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.inputLayoutContainerGroup}>
                    <Text style={styles.premiumFieldLabelMicro}>
                      CONFIRM PASSWORD
                    </Text>
                    <View style={{ position: "relative" }}>
                      <TextInput
                        style={[
                          styles.luxuryTextInput,
                          {
                            borderColor: confirmPasswordError
                              ? "red"
                              : darkTheme.colors.border,
                            color: darkTheme.colors.textMain,
                            backgroundColor: darkTheme.colors.card,
                          },
                        ]}
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={(text) => {
                          setConfirmPassword(text);
                          if (confirmPasswordError) setConfirmPasswordError("");
                        }}
                        placeholder="Enter confirm password"
                        placeholderTextColor="rgba(255,255,255,0.2)"
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{
                          position: "absolute",
                          right: 15,
                          top: 0,
                          bottom: 0,
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons
                          name={
                            showConfirmPassword
                              ? "eye-off-outline"
                              : "eye-outline"
                          }
                          size={20}
                          color={darkTheme.colors.textMuted}
                        />
                      </TouchableOpacity>
                    </View>
                    {confirmPasswordError ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: scale(11),
                          marginTop: 4,
                        }}
                      >
                        {confirmPasswordError}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.modalSubmitActionCTAButton,
                    {
                      backgroundColor: darkTheme.colors.accent,
                      marginTop: verticalScale(20),
                    },
                  ]}
                  disabled={savePasswordLoader}
                  onPress={savePasswordHandler}
                >
                  {savePasswordLoader ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <Text
                      style={{
                        color: "#000000",
                        fontWeight: "700",
                        fontSize: scale(13),
                      }}
                    >
                      Update password
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* B. OTP Verification Sheet with Integrated Cooldown */}
      <Modal
        transparent={true}
        visible={verificationModalVisible}
        animationType="slide"
        onRequestClose={() => setVerificationModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setVerificationModalVisible(false)}
        >
          <View style={styles.modalBottomOverlayScrim}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.bottomSheetPanelContentBox,
                  {
                    backgroundColor: "#0A0A0C",
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <View style={styles.bottomSheetHeaderIndicatorNotch} />
                <Text
                  style={[
                    styles.modalLayoutHeadlineText,
                    { color: darkTheme.colors.textMain },
                  ]}
                >
                  Verify {verificationTarget.type}
                </Text>
                <Text style={styles.modalLayoutSubHeaderText}>
                  We have sent a code to your{" "}
                  {verificationTarget.value || "your credentials"}.
                </Text>

                <View style={styles.innerModalFormVerticalStackDeck}>
                  <View style={styles.inputLayoutContainerGroup}>
                    <Text style={styles.premiumFieldLabelMicro}>
                      ENTER 4-DIGIT OTP AUTH CODE
                    </Text>
                    <TextInput
                      style={[
                        styles.luxuryTextInput,
                        {
                          borderColor: otpError
                            ? "red"
                            : darkTheme.colors.accent,
                          color: darkTheme.colors.textMain,
                          backgroundColor: darkTheme.colors.card,
                          letterSpacing: scale(4),
                          textAlign: "center",
                          fontSize: scale(16),
                          fontWeight: "700",
                        },
                      ]}
                      keyboardType="number-pad"
                      maxLength={6}
                      value={otpCode}
                      onChangeText={(text) => {
                        setOtpCode(text);
                        if (otpError) setOtpError("");
                      }}
                      placeholder="0000"
                      placeholderTextColor="rgba(255,255,255,0.15)"
                    />
                    {otpError ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: scale(11),
                          marginTop: 4,
                          textAlign: "center",
                        }}
                      >
                        {otpError}
                      </Text>
                    ) : null}
                  </View>

                  {/* UI Dynamic Interaction Row: Cooldown visual integration */}
                  <View style={styles.otpActionUtilityControlContextRow}>
                    <Text
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        fontSize: scale(11),
                      }}
                    >
                      Didn't acquire the payload?
                    </Text>
                    <TouchableOpacity
                      onPress={handleResendOTP}
                      disabled={countdown > 0}
                      style={{ opacity: countdown > 0 ? 0.5 : 1 }}
                    >
                      <Text
                        style={{
                          color: darkTheme.colors.accent,
                          fontWeight: "700",
                          fontSize: scale(11),
                        }}
                      >
                        {countdown > 0
                          ? ` Resend in ${countdown}s`
                          : " Resend Token"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.modalSubmitActionCTAButton,
                    {
                      backgroundColor: darkTheme.colors.accent,
                      marginTop: verticalScale(20),
                    },
                  ]}
                  disabled={handleVerifyLoader}
                  onPress={handleVerifyOTP}
                >
                  {handleVerifyLoader ? (
                    <ActivityIndicator color={"#000"} />
                  ) : (
                    <Text
                      style={{
                        color: "#000000",
                        fontWeight: "700",
                        fontSize: scale(13),
                      }}
                    >
                      Verify
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: scale(18),
    paddingBottom: verticalScale(40),
    paddingTop: verticalScale(12),
  },
  heroSectionContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: verticalScale(18),
  },
  avatarWrapperContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: scale(84),
    height: scale(84),
  },
  avatarOuterRing: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.01)",
  },
  avatarInnerCircle: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    backgroundColor: "#161618",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImagePlacement: {
    width: "100%",
    height: "100%",
  },
  cameraFloatingBadge: {
    position: "absolute",
    bottom: scale(2),
    right: scale(2),
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  userNameHeading: {
    fontSize: scale(18),
    fontWeight: "700",
    marginTop: verticalScale(14),
    letterSpacing: -0.3,
  },
  userRoleTagLabel: {
    fontSize: scale(10),
    fontWeight: "700",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 1.2,
    marginTop: verticalScale(3),
  },
  metricsRibbonTrack: {
    flexDirection: "row",
    width: "100%",
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(4),
    justifyContent: "center",
    alignItems: "center",
  },
  metricStatBlock: {
    flex: 1,
    alignItems: "center",
  },
  metricMainNumber: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  metricSubLabel: {
    color: "rgba(255,255,255,0.35)",
    fontSize: scale(10),
    fontWeight: "600",
    marginTop: verticalScale(2),
  },
  hairlineVerticalDivider: {
    width: 1,
    height: verticalScale(16),
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  premiumStripeActionTile: {
    width: "100%",
    height: verticalScale(56),
    borderRadius: scale(10),
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(14),
    marginTop: verticalScale(6),
  },
  stripeLeftWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  stripeBrandIconBox: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(6),
    backgroundColor: "rgba(99, 91, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  stripeTextStack: {
    marginLeft: scale(12),
    flex: 1,
  },
  stripeTitleText: {
    color: "#FFFFFF",
    fontSize: scale(13),
    fontWeight: "600",
  },
  stripeSubtitleText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: scale(10),
    marginTop: verticalScale(2),
  },
  progressTrackerHeaderSection: {
    width: "100%",
    marginTop: verticalScale(24),
  },
  progressSplitTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  progressLabelText: {
    fontSize: scale(9),
    fontWeight: "800",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 0.8,
  },
  progressPercentText: {
    fontSize: scale(11),
    fontWeight: "800",
  },
  progressTrackBackgroundLine: {
    width: "100%",
    height: scale(2.5),
    backgroundColor: "#18181A",
    borderRadius: scale(1.5),
    marginTop: verticalScale(6),
    overflow: "hidden",
  },
  progressActiveFillLine: {
    height: "100%",
    borderRadius: scale(1.5),
  },
  formContainerVerticalDeck: {
    width: "100%",
    marginTop: verticalScale(16),
    gap: verticalScale(14),
  },
  inputLayoutContainerGroup: {
    width: "100%",
  },
  premiumFieldLabelMicro: {
    fontSize: scale(9),
    fontWeight: "800",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 1,
    marginBottom: verticalScale(6),
  },
  inputWithIconAnchorWrapper: {
    position: "relative",
    width: "100%",
  },
  fieldStatusIconOverlayContainer: {
    position: "absolute",
    right: scale(12),
    top: 0,
    height: scale(38),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  luxuryTextInput: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(8),
    borderWidth: 1,
    paddingHorizontal: scale(12),
    fontSize: scale(13),
    fontWeight: "400",
  },
  luxuryPhoneInputContainer: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(8),
    borderWidth: 1,
    paddingHorizontal: scale(12),
  },
  phoneFlagAlignment: {
    width: scale(24),
    height: scale(16),
  },
  luxuryDropdownTriggerButton: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(8),
    borderWidth: 1,
    paddingHorizontal: scale(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  saveProfileChangesCTAButton: {
    width: "100%",
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(28),
  },
  dropdownMainElementContainer: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(8),
    borderWidth: 1,
    paddingHorizontal: scale(12),
  },
  dropdownPlaceholderTextStyle: {
    fontSize: scale(13),
  },
  dropdownSelectedTextStyle: {
    fontSize: scale(13),
  },
  dropdownMenuInnerContainerBox: {
    borderRadius: scale(8),
    borderWidth: 1,
    marginTop: verticalScale(4),
    paddingVertical: verticalScale(4),
  },
  dropdownItemRowUnit: {
    paddingVertical: verticalScale(0),
    paddingHorizontal: scale(12),
  },
  dropdownItemRowText: {
    fontSize: scale(13),
  },
  modalOverlayScrim: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  calendarModalContent: {
    width: "100%",
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: scale(16),
    alignItems: "center",
    justifyContent: "center",
  },
  modalSubmitActionCTAButton: {
    width: "100%",
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
    height: scale(40),
  },
  modalBottomOverlayScrim: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  bottomSheetPanelContentBox: {
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(34),
  },
  bottomSheetHeaderIndicatorNotch: {
    width: scale(36),
    height: verticalScale(4),
    borderRadius: scale(2),
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "center",
    marginBottom: verticalScale(16),
  },
  modalLayoutHeadlineText: {
    fontSize: scale(16),
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  modalLayoutSubHeaderText: {
    fontSize: scale(11),
    color: "rgba(255,255,255,0.4)",
    marginTop: verticalScale(3),
    lineHeight: scale(15),
  },
  innerModalFormVerticalStackDeck: {
    marginTop: verticalScale(20),
    gap: verticalScale(14),
  },
  otpActionUtilityControlContextRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: verticalScale(2),
  },
});

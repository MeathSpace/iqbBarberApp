// import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useState } from "react";
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
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";

// import Header from "../../../../components/Header/Header"; // Adjust path dynamically
// import { darkTheme } from "../../../../constants/appTheme";

// const GENDER_OPTIONS = [
//   { label: "Male", value: "Male" },
//   { label: "Female", value: "Female" },
//   { label: "Other", value: "Other" },
// ];

// const EditProfileScreen = () => {
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
//     // Hide picker overlay window immediately on trigger dismissal
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

//             {/* Input Element: Functional Calendar Picker Field Node Anchor */}
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

//               {/* Renders Native Calendar Wheel Context Overlays */}
//               {showDatePicker && (
//                 <DateTimePicker
//                   value={dobDate}
//                   mode="date"
//                   display={Platform.OS === "ios" ? "spinner" : "default"}
//                   onChange={handleDateChange}
//                   maximumDate={new Date()}
//                   themeVariant="dark"
//                 />
//               )}
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
//               console.log("Profile parameters flushed to core database API")
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
// });

import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../components/Header/Header"; // Adjust path dynamically
import { darkTheme } from "../../../../constants/appTheme";

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const EditProfileScreen = () => {
  // Local state properties dictionary mapping input structures
  const [name, setName] = useState("Bikki u");
  const [email, setEmail] = useState("bikki@yopmail.com");
  const [password, setPassword] = useState("********");
  const [mobNumber, setMobNumber] = useState("+91 82402-05322");
  const [gender, setGender] = useState("Male");

  // Date of Birth functional handling state mechanics
  const [dobDate, setDobDate] = useState(new Date(2009, 11, 2));
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Focus tracking state context variables for dynamic border highlights
  const [isGenderFocused, setIsGenderFocused] = useState(false);

  // Auto-formats the selected platform timestamp into your visual format mask string
  const formatDisplayDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event, selectedDate) => {
    // Android automatically dismisses on single touch select events
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDobDate(selectedDate);
    }
  };

  // Real-time mobile number character length validation checker logic block
  const validateMobileNumber = (text) => {
    const rawNumbers = text.replace(/[^0-9]/g, "");
    return rawNumbers.length >= 10;
  };

  const isMobileValid = validateMobileNumber(mobNumber);

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
          {/* 1. Seamless Hero Identity Presentation Grid Block Layout */}
          <View style={styles.heroSectionContainer}>
            <View style={styles.avatarWrapperContainer}>
              <View
                style={[
                  styles.avatarOuterRing,
                  { borderColor: darkTheme.colors.accent },
                ]}
              >
                <View style={styles.avatarInnerCircle}>
                  <Ionicons
                    name="person"
                    size={scale(32)}
                    color="rgba(255,255,255,0.6)"
                  />
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.cameraFloatingBadge,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
                activeOpacity={0.9}
              >
                <Feather name="camera" size={scale(11)} color="#000000" />
              </TouchableOpacity>
            </View>

            <Text
              style={[darkTheme.typography.cardTitle, styles.userNameHeading]}
            >
              {name}
            </Text>
            <Text style={styles.userRoleTagLabel}>System Administrator</Text>

            {/* Premium Hairline Metrics Ribbon Section */}
            <View style={styles.metricsRibbonTrack}>
              <View style={styles.metricStatBlock}>
                <Text style={styles.metricMainNumber}>33</Text>
                <Text style={styles.metricSubLabel}>Salons</Text>
              </View>
              <View style={styles.hairlineVerticalDivider} />
              <View style={styles.metricStatBlock}>
                <Text style={styles.metricMainNumber}>79</Text>
                <Text style={styles.metricSubLabel}>Barbers</Text>
              </View>
              <View style={styles.hairlineVerticalDivider} />
              <View style={styles.metricStatBlock}>
                <Text style={styles.metricMainNumber}>74</Text>
                <Text style={styles.metricSubLabel}>Customers</Text>
              </View>
            </View>
          </View>

          {/* 2. Cohesive Stripe Payout Integration Tile */}
          <TouchableOpacity
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
                  Configure dynamic multi-user payout routing
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={scale(14)}
              color={darkTheme.colors.textMuted}
            />
          </TouchableOpacity>

          {/* Minimalist Profile Progress Indicator Layout Section */}
          <View style={styles.progressTrackerHeaderSection}>
            <View style={styles.progressSplitTextRow}>
              <Text style={styles.progressLabelText}>PROFILE COMPLETION</Text>
              <Text
                style={[
                  styles.progressPercentText,
                  { color: darkTheme.colors.accent },
                ]}
              >
                85%
              </Text>
            </View>
            <View style={styles.progressTrackBackgroundLine}>
              <View
                style={[
                  styles.progressActiveFillLine,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
              />
            </View>
          </View>

          {/* 3. True Solid-Black Luxury Form Enclosures Workspace List */}
          <View style={styles.formContainerVerticalDeck}>
            {/* Input Element: Full Name */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>FULL NAME</Text>
              <TextInput
                style={[
                  styles.luxuryTextInput,
                  {
                    borderColor: darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                    backgroundColor: darkTheme.colors.card,
                  },
                ]}
                value={name}
                onChangeText={setName}
                placeholder="Enter workspace name..."
                placeholderTextColor={darkTheme.colors.textMuted}
                selectionColor={darkTheme.colors.accent}
              />
            </View>

            {/* Input Element: Email Address (Verified Checkmark State) */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>EMAIL ADDRESS</Text>
              <View style={styles.inputWithIconAnchorWrapper}>
                <TextInput
                  style={[
                    styles.luxuryTextInput,
                    {
                      borderColor: darkTheme.colors.border,
                      color: darkTheme.colors.textMain,
                      backgroundColor: darkTheme.colors.card,
                      paddingRight: scale(40),
                    },
                  ]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  selectionColor={darkTheme.colors.accent}
                />
                <View style={styles.fieldRightStatusIconContainer}>
                  <Ionicons
                    name="checkmark-circle"
                    size={scale(15)}
                    color="#34C759"
                  />
                </View>
              </View>
            </View>

            {/* Input Element: Account Security Password */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>
                SECURITY PASSWORD
              </Text>
              <View style={styles.inputWithIconAnchorWrapper}>
                <TextInput
                  style={[
                    styles.luxuryTextInput,
                    {
                      borderColor: darkTheme.colors.border,
                      color: darkTheme.colors.textMain,
                      backgroundColor: darkTheme.colors.card,
                      paddingRight: scale(40),
                    },
                  ]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  selectionColor={darkTheme.colors.accent}
                />
                <TouchableOpacity style={styles.fieldRightStatusIconContainer}>
                  <Ionicons
                    name="eye-off-outline"
                    size={scale(14)}
                    color={darkTheme.colors.textMuted}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Input Element: Mobile Number (Dynamic State Toggle Badge Check) */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>MOBILE NUMBER</Text>
              <View style={styles.inputWithIconAnchorWrapper}>
                <TextInput
                  style={[
                    styles.luxuryTextInput,
                    {
                      borderColor: isMobileValid
                        ? darkTheme.colors.border
                        : "#FF3B30",
                      color: darkTheme.colors.textMain,
                      backgroundColor: darkTheme.colors.card,
                      paddingRight: scale(40),
                    },
                  ]}
                  value={mobNumber}
                  onChangeText={setMobNumber}
                  keyboardType="phone-pad"
                  placeholder="+1 (555) 000-0000"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  selectionColor={darkTheme.colors.accent}
                />
                <View style={styles.fieldRightStatusIconContainer}>
                  <Ionicons
                    name={isMobileValid ? "checkmark-circle" : "alert-circle"}
                    size={scale(15)}
                    color={isMobileValid ? "#34C759" : "#FF3B30"}
                  />
                </View>
              </View>
            </View>

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

            {/* Input Element: Date of Birth Component with Embedded Scrim Dismiss Hooks */}
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

              {/* Functional Dynamic Floating Platform Picker Overlay */}
              <Modal
                transparent={true}
                visible={showDatePicker}
                animationType="fade"
                onRequestClose={() => setShowDatePicker(false)}
              >
                <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
                  <View style={styles.modalOverlayScrim}>
                    <TouchableWithoutFeedback>
                      <View style={[styles.calendarModalContent, { backgroundColor: darkTheme.colors.card }]}>
                        
                        <DateTimePicker
                          value={dobDate}
                          mode="date"
                          display={Platform.OS === "ios" ? "spinner" : "default"}
                          onChange={handleDateChange}
                          maximumDate={new Date()}
                          themeVariant="dark" 
                        />

                        {Platform.OS === "ios" && (
                          <TouchableOpacity 
                            style={[styles.modalSubmitActionCTAButton, { backgroundColor: darkTheme.colors.accent }]}
                            onPress={() => setShowDatePicker(false)}
                            activeOpacity={0.8}
                          >
                            <Text style={{ color: "#000000", fontWeight: "700", fontSize: scale(13) }}>
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

          {/* Primary Profile Form Changes Action Submission Button */}
          <TouchableOpacity
            style={[
              styles.saveProfileChangesCTAButton,
              {
                backgroundColor: darkTheme.colors.accent,
                height: darkTheme.layout.buttonHeight || verticalScale(40),
              },
            ]}
            activeOpacity={0.8}
            onPress={() =>
              console.log("Profile parameters flushed to core database API")
            }
          >
            <Text
              style={[
                darkTheme.typography.btnText,
                { color: "#000000", fontWeight: "700" },
              ]}
            >
              Save Profile Changes
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    width: "85%",
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
  luxuryTextInput: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(8),
    borderWidth: 1,
    paddingHorizontal: scale(12),
    fontSize: scale(13),
    fontWeight: "400",
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
  fieldRightStatusIconContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    height: scale(38),
    width: scale(38),
    justifyContent: "center",
    alignItems: "center",
  },
  saveProfileChangesCTAButton: {
    width: "100%",
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(28),
  },

  // Library Element-Dropdown Target Specific Styling Anchors
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

  // Modal Scrim Design Variables
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
    marginTop: verticalScale(14),
  },
});

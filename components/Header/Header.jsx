// import { Feather, Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter, useSegments } from "expo-router";
// import { useRef, useState } from "react";
// import {
//   Animated,
//   Dimensions,
//   Modal,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import { scale, verticalScale } from "react-native-size-matters";

// import { darkTheme } from "../../constants/appTheme";

// const { width, height } = Dimensions.get("window");
// const DRAWER_WIDTH = width * 0.72;

// const MENU_ITEMS = [
//   {
//     key: "dashboard",
//     label: "Dashboard",
//     iconFamily: "Feather",
//     iconName: "grid",
//     route: "/(admintabs)/(home)",
//   },
//   {
//     key: "profile",
//     label: "Profile",
//     iconFamily: "Feather",
//     iconName: "user",
//     route: "/(admin)/(profile)",
//   },
//   {
//     key: "customer",
//     label: "Customers",
//     iconFamily: "Feather",
//     iconName: "users",
//     route: "/(admin)/(customer)",
//   },
//   {
//     key: "salon",
//     label: "Salons",
//     iconFamily: "Ionicons",
//     iconName: "storefront-outline",
//     isAccordion: true,
//     children: [
//       {
//         key: "salon-list",
//         label: "Salon List",
//         iconFamily: "Ionicons",
//         iconName: "list-outline",
//         route: "/(admin)/(salon)",
//       },
//       {
//         key: "create-salon",
//         label: "Create Salon",
//         iconFamily: "Ionicons",
//         iconName: "add-circle-outline",
//         route: "/(admin)/(salon)/createSalon",
//       },
//     ],
//   },
//   {
//     key: "barber",
//     label: "Barbers",
//     iconFamily: "Ionicons",
//     iconName: "cut-outline",
//     isAccordion: true,
//     children: [
//       {
//         key: "barber-list",
//         label: "Barber List",
//         iconFamily: "Ionicons",
//         iconName: "list-outline",
//         route: "/(admin)/(barber)",
//       },
//       {
//         key: "create-barber",
//         label: "Create Barber",
//         iconFamily: "Ionicons",
//         iconName: "person-add-outline",
//         route: "/(admin)/(barber)/(steps)",
//       },
//     ],
//   },
//   {
//     key: "reports",
//     label: "Analytics",
//     iconFamily: "Feather",
//     iconName: "bar-chart-2",
//     route: "/(admin)/(reports)",
//   },
//   {
//     key: "payments",
//     label: "Payments",
//     iconFamily: "Feather",
//     iconName: "credit-card",
//     isAccordion: true,
//     children: [
//       {
//         key: "payment-history",
//         label: "History",
//         iconFamily: "Feather",
//         iconName: "activity",
//         route: "/(admin)/(payments)/",
//       },
//       {
//         key: "payment-settings",
//         label: "Gateways",
//         iconFamily: "Feather",
//         iconName: "sliders",
//         route: "/(admin)/(payments)/paymentSettings",
//       },
//     ],
//   },

//   {
//     key: "queue",
//     label: "Live Queue",
//     iconFamily: "Ionicons",
//     iconName: "git-commit-outline",
//     isAccordion: true,
//     children: [
//       {
//         key: "queue-list",
//         label: "Active List",
//         iconFamily: "Ionicons",
//         iconName: "list-outline",
//         route: "/(admintabs)/(queue)",
//       },
//       {
//         key: "queue-history",
//         label: "History Log",
//         iconFamily: "Ionicons",
//         iconName: "time-outline",
//         route: "/(admintabs)/(queue)/queueHistory",
//       },
//     ],
//   },
//   {
//     key: "appointment",
//     label: "Appointments",
//     iconFamily: "Feather",
//     iconName: "calendar",
//     isAccordion: true,
//     children: [
//       {
//         key: "appointment-list",
//         label: "Schedules",
//         iconFamily: "Feather",
//         iconName: "clock",
//         route: "/(admintabs)/(appointment)",
//       },
//       {
//         key: "appointment-history",
//         label: "Historical Records",
//         iconFamily: "Feather",
//         iconName: "archive",
//         route: "/(admintabs)/(appointment)/appointmentHistory",
//       },
//     ],
//   },
//   {
//     key: "subscriptions",
//     label: "Premium Membership",
//     iconFamily: "Feather",
//     iconName: "award",
//     route: "/(admin)/(subscriptions)",
//   },
// ];

// const Header = ({ title, subTitle, showBack = false }) => {
//   const router = useRouter();
//   const segments = useSegments(); // Detects active route segments
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [expandedSections, setExpandedSections] = useState({});
//   const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

//   // Check if the current layout path includes your admin tabs directory
//   const isInTabsLayout = segments.includes("(admintabs)");

//   // Dynamically filter out dashboard if inside (admintabs)
//   const visibleMenuItems = MENU_ITEMS.filter((item) => {
//     if (item.key === "dashboard" && isInTabsLayout) {
//       return false;
//     }
//     return true;
//   });

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 220,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(slideAnim, {
//       toValue: DRAWER_WIDTH,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setMenuVisible(false);
//     });
//   };

//   const logoutPressed = async () => {
//     try {
//       await AsyncStorage.removeItem("adminEmail");
//       closeMenu();
//       router.replace("/(auth)/(adminauth)/signin");
//     } catch (error) {
//       console.error("Error during logout sequence:", error);
//     }
//   };

//   const handleNavigation = (route) => {
//     closeMenu();
//     router.push(route);
//   };

//   const toggleSection = (key) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const renderIcon = (family, name, size, color) => {
//     if (family === "Feather") {
//       return <Feather name={name} size={size} color={color} />;
//     }
//     return <Ionicons name={name} size={size} color={color} />;
//   };

//   return (
//     <View style={styles.headerRow}>
//       <View style={styles.headerRowContainer}>
//         {showBack && (
//           <TouchableOpacity
//             activeOpacity={0.7}
//             onPress={() => router.back()}
//             style={styles.backButtonTouch}
//           >
//             <Ionicons
//               name="arrow-back"
//               size={scale(20)}
//               color={darkTheme.colors.textMain}
//             />
//           </TouchableOpacity>
//         )}
//         <View>
//           <Text
//             style={[
//               darkTheme.typography.headerTitle,
//               styles.headerTitle,
//               { color: darkTheme.colors.textMain },
//             ]}
//           >
//             {title}
//           </Text>
//           <Text
//             style={[
//               darkTheme.typography.headerSubtitle,
//               styles.headerSubtitle,
//               { color: darkTheme.colors.textMuted },
//             ]}
//           >
//             {subTitle}
//           </Text>
//         </View>
//       </View>

//       <TouchableOpacity
//         activeOpacity={0.7}
//         onPress={openMenu}
//         style={[
//           styles.menuIconContainer,
//           {
//             backgroundColor: darkTheme.colors.card,
//             borderColor: darkTheme.colors.border,
//           },
//         ]}
//       >
//         <Ionicons
//           name="menu-outline"
//           size={scale(18)}
//           color={darkTheme.colors.textMain}
//         />
//       </TouchableOpacity>

//       <Modal
//         transparent={true}
//         visible={menuVisible}
//         onRequestClose={closeMenu}
//         animationType="none"
//       >
//         <View style={styles.fullscreenContainer}>
//           <TouchableWithoutFeedback onPress={closeMenu}>
//             <Animated.View
//               style={[
//                 styles.backdrop,
//                 {
//                   opacity: slideAnim.interpolate({
//                     inputRange: [0, DRAWER_WIDTH],
//                     outputRange: [1, 0],
//                   }),
//                 },
//               ]}
//             />
//           </TouchableWithoutFeedback>

//           <Animated.View
//             style={[
//               styles.drawerContainer,
//               {
//                 backgroundColor: "#0D0D0E",
//                 borderLeftColor: "rgba(255,255,255,0.04)",
//                 transform: [{ translateX: slideAnim }],
//               },
//             ]}
//           >
//             {/* Drawer Header Block */}
//             <View style={styles.drawerHeader}>
//               <View style={styles.drawerHeaderTitleBlock}>
//                 <View
//                   style={[
//                     styles.titleIconBox,
//                     { backgroundColor: "rgba(255, 149, 0, 0.1)" },
//                   ]}
//                 >
//                   <Feather
//                     name="grid"
//                     size={scale(13)}
//                     color={darkTheme.colors.accent}
//                   />
//                 </View>
//                 <Text
//                   style={[
//                     darkTheme.typography.cardTitle,
//                     styles.drawerHeaderTitle,
//                     { color: darkTheme.colors.textMain },
//                   ]}
//                 >
//                   Navigation
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.drawerCloseButtonCircle,
//                   {
//                     backgroundColor: "rgba(255,255,255,0.03)",
//                     borderColor: "rgba(255,255,255,0.05)",
//                   },
//                 ]}
//                 onPress={closeMenu}
//               >
//                 <Ionicons
//                   name="close"
//                   size={scale(15)}
//                   color={darkTheme.colors.textMain}
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Dynamic filtered Menu Items */}
//             <ScrollView
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={styles.menuItemsListScrollTrack}
//             >
//               {visibleMenuItems.map((item) => {
//                 const isExpanded = !!expandedSections[item.key];

//                 if (item.isAccordion) {
//                   return (
//                     <View
//                       key={item.key}
//                       style={styles.accordionContainerWrapper}
//                     >
//                       <TouchableOpacity
//                         style={[
//                           styles.menuRowItem,
//                           styles.accordionHeader,
//                           isExpanded && {
//                             backgroundColor: "rgba(255, 149, 0, 0.04)",
//                             borderColor: "rgba(255, 149, 0, 0.15)",
//                           },
//                         ]}
//                         activeOpacity={0.7}
//                         onPress={() => toggleSection(item.key)}
//                       >
//                         <View style={styles.accordionLeft}>
//                           <View
//                             style={[
//                               styles.iconBoxFrame,
//                               isExpanded && {
//                                 backgroundColor: "rgba(255, 149, 0, 0.1)",
//                               },
//                             ]}
//                           >
//                             {renderIcon(
//                               item.iconFamily,
//                               item.iconName,
//                               scale(13),
//                               isExpanded
//                                 ? darkTheme.colors.accent
//                                 : darkTheme.colors.textMuted,
//                             )}
//                           </View>
//                           <Text
//                             style={[
//                               darkTheme.typography.bodyMain,
//                               styles.menuItemText,
//                               {
//                                 color: isExpanded
//                                   ? darkTheme.colors.accent
//                                   : darkTheme.colors.textMain,
//                               },
//                             ]}
//                           >
//                             {item.label}
//                           </Text>
//                         </View>
//                         {isExpanded ? (
//                           <Ionicons
//                             name="chevron-down"
//                             size={scale(13)}
//                             color={darkTheme.colors.accent}
//                           />
//                         ) : (
//                           <Ionicons
//                             name="chevron-forward"
//                             size={scale(13)}
//                             color={darkTheme.colors.textMuted}
//                           />
//                         )}
//                       </TouchableOpacity>

//                       {isExpanded && item.children && (
//                         <View
//                           style={[
//                             styles.submenuContainer,
//                             { borderLeftColor: "rgba(255, 149, 0, 0.2)" },
//                           ]}
//                         >
//                           {item.children.map((subItem) => {
//                             return (
//                               <TouchableOpacity
//                                 key={subItem.key}
//                                 style={styles.submenuRowItem}
//                                 activeOpacity={0.7}
//                                 onPress={() => handleNavigation(subItem.route)}
//                               >
//                                 <View style={{ marginRight: scale(10) }}>
//                                   {renderIcon(
//                                     subItem.iconFamily,
//                                     subItem.iconName,
//                                     scale(12),
//                                     darkTheme.colors.textMuted,
//                                   )}
//                                 </View>
//                                 <Text
//                                   style={[
//                                     darkTheme.typography.bodyMain,
//                                     styles.submenuItemText,
//                                     { color: darkTheme.colors.textMuted },
//                                   ]}
//                                 >
//                                   {subItem.label}
//                                 </Text>
//                               </TouchableOpacity>
//                             );
//                           })}
//                         </View>
//                       )}
//                     </View>
//                   );
//                 }

//                 return (
//                   <TouchableOpacity
//                     key={item.key}
//                     style={styles.menuRowItem}
//                     activeOpacity={0.7}
//                     onPress={() => handleNavigation(item.route)}
//                   >
//                     <View style={styles.accordionLeft}>
//                       <View style={styles.iconBoxFrame}>
//                         {renderIcon(
//                           item.iconFamily,
//                           item.iconName,
//                           scale(13),
//                           darkTheme.colors.textMuted,
//                         )}
//                       </View>
//                       <Text
//                         style={[
//                           darkTheme.typography.bodyMain,
//                           styles.menuItemText,
//                           { color: darkTheme.colors.textMain },
//                         ]}
//                       >
//                         {item.label}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 );
//               })}
//             </ScrollView>

//             {/* Footer Section */}
//             <View
//               style={[
//                 styles.drawerFooter,
//                 { borderTopColor: "rgba(255,255,255,0.03)" },
//               ]}
//             >
//               <TouchableOpacity
//                 onPress={logoutPressed}
//                 style={[
//                   styles.logoutButtonTile,
//                   { backgroundColor: "rgba(255, 59, 48, 0.08)" },
//                 ]}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons
//                   name="log-out-outline"
//                   size={scale(14)}
//                   color="#FF3B30"
//                   style={{ marginRight: scale(8) }}
//                 />
//                 <Text style={styles.logoutButtonText}>Logout</Text>
//               </TouchableOpacity>

//               <Text
//                 style={[darkTheme.typography.bodyMuted, styles.versionText]}
//               >
//                 Admin System Platform • v1.0
//               </Text>
//             </View>
//           </Animated.View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default Header;

// const styles = StyleSheet.create({
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: scale(16),
//     marginTop: verticalScale(6),
//     marginBottom: verticalScale(14),
//   },
//   headerRowContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(10),
//   },
//   backButtonTouch: {
//     height: scale(32),
//     justifyContent: "center",
//   },
//   headerTitle: {
//     fontSize: scale(16),
//     fontWeight: "700",
//     letterSpacing: -0.3,
//   },
//   headerSubtitle: {
//     fontSize: scale(11),
//     marginTop: verticalScale(1),
//     opacity: 0.6,
//   },
//   menuIconContainer: {
//     width: scale(32),
//     height: scale(32),
//     borderRadius: scale(8),
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   fullscreenContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     width: width,
//     height: height,
//   },
//   backdrop: {
//     position: "absolute",
//     width: width,
//     height: height,
//     backgroundColor: "rgba(0, 0, 0, 0.75)",
//   },
//   drawerContainer: {
//     width: DRAWER_WIDTH,
//     height: "100%",
//     paddingTop: Platform.OS === "ios" ? verticalScale(54) : verticalScale(36),
//     borderLeftWidth: 1,
//   },
//   drawerHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: scale(20),
//     marginBottom: verticalScale(20),
//   },
//   drawerHeaderTitleBlock: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(8),
//   },
//   titleIconBox: {
//     width: scale(24),
//     height: scale(24),
//     borderRadius: scale(6),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   drawerHeaderTitle: {
//     fontSize: scale(14),
//     fontWeight: "700",
//     letterSpacing: -0.2,
//   },
//   drawerCloseButtonCircle: {
//     width: scale(28),
//     height: scale(28),
//     borderRadius: scale(14),
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   menuItemsListScrollTrack: {
//     paddingHorizontal: scale(12),
//     gap: verticalScale(4),
//     paddingBottom: verticalScale(24),
//   },
//   accordionContainerWrapper: {
//     width: "100%",
//   },
//   menuRowItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: scale(10),
//     height: verticalScale(42),
//     borderRadius: scale(8),
//     borderWidth: 1,
//     borderColor: "transparent",
//   },
//   accordionHeader: {
//     justifyContent: "space-between",
//   },
//   accordionLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   iconBoxFrame: {
//     width: scale(24),
//     height: scale(24),
//     borderRadius: scale(6),
//     backgroundColor: "rgba(255,255,255,0.03)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: scale(12),
//   },
//   menuItemText: {
//     fontSize: scale(13),
//     fontWeight: "600",
//     letterSpacing: -0.1,
//   },
//   submenuContainer: {
//     paddingLeft: scale(20),
//     marginTop: verticalScale(2),
//     marginBottom: verticalScale(4),
//     borderLeftWidth: 1.5,
//     marginLeft: scale(21),
//     gap: verticalScale(2),
//   },
//   submenuRowItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     height: verticalScale(36),
//   },
//   submenuItemText: {
//     fontSize: scale(12.5),
//     fontWeight: "500",
//     letterSpacing: -0.1,
//   },
//   drawerFooter: {
//     alignItems: "center",
//     width: "100%",
//     paddingHorizontal: scale(16),
//     paddingTop: verticalScale(16),
//     paddingBottom:
//       Platform.OS === "ios" ? verticalScale(30) : verticalScale(20),
//     borderTopWidth: 1,
//   },
//   logoutButtonTile: {
//     width: "100%",
//     height: scale(38),
//     borderRadius: scale(8),
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: verticalScale(14),
//   },
//   logoutButtonText: {
//     color: "#FF3B30",
//     fontSize: scale(12),
//     fontWeight: "700",
//   },
//   versionText: {
//     fontSize: scale(9),
//     fontWeight: "600",
//     textTransform: "uppercase",
//     letterSpacing: 0.8,
//     opacity: 0.3,
//   },
// });

import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { darkTheme } from "../../constants/appTheme";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.72;

// Mock list matching your platform salon catalog index profiles
const MOCK_SALONS = [
  { id: "s1", name: "Modern Unisex Salon" },
  { id: "s2", name: "Salon 2" },
  { id: "s3", name: "Salon 3" },
  { id: "s4", name: "salon 4" },
];

const MENU_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    iconFamily: "Feather",
    iconName: "grid",
    route: "/(admintabs)/(home)",
  },
  {
    key: "change-salon", // New tactical toggle option action hook trigger
    label: "Change Salon",
    iconFamily: "Ionicons",
    iconName: "swap-horizontal-outline",
    isActionTrigger: true,
  },
  {
    key: "profile",
    label: "Profile",
    iconFamily: "Feather",
    iconName: "user",
    route: "/(admin)/(profile)",
  },
  {
    key: "customer",
    label: "Customers",
    iconFamily: "Feather",
    iconName: "users",
    route: "/(admin)/(customer)",
  },
  {
    key: "salon",
    label: "Salons",
    iconFamily: "Ionicons",
    iconName: "storefront-outline",
    isAccordion: true,
    children: [
      {
        key: "salon-list",
        label: "Salon List",
        iconFamily: "Ionicons",
        iconName: "list-outline",
        route: "/(admin)/(salon)",
      },
      {
        key: "create-salon",
        label: "Create Salon",
        iconFamily: "Ionicons",
        iconName: "add-circle-outline",
        route: "/(admin)/(salon)/createSalon",
      },
    ],
  },
  {
    key: "barber",
    label: "Barbers",
    iconFamily: "Ionicons",
    iconName: "cut-outline",
    isAccordion: true,
    children: [
      {
        key: "barber-list",
        label: "Barber List",
        iconFamily: "Ionicons",
        iconName: "list-outline",
        route: "/(admin)/(barber)",
      },
      {
        key: "create-barber",
        label: "Create Barber",
        iconFamily: "Ionicons",
        iconName: "person-add-outline",
        route: "/(admin)/(barber)/(steps)",
      },
    ],
  },
  {
    key: "reports",
    label: "Analytics",
    iconFamily: "Feather",
    iconName: "bar-chart-2",
    route: "/(admin)/(reports)",
  },
  {
    key: "payments",
    label: "Payments",
    iconFamily: "Feather",
    iconName: "credit-card",
    isAccordion: true,
    children: [
      {
        key: "payment-history",
        label: "History",
        iconFamily: "Feather",
        iconName: "activity",
        route: "/(admin)/(payments)/",
      },
      {
        key: "payment-settings",
        label: "Gateways",
        iconFamily: "Feather",
        iconName: "sliders",
        route: "/(admin)/(payments)/paymentSettings",
      },
    ],
  },
  {
    key: "queue",
    label: "Live Queue",
    iconFamily: "Ionicons",
    iconName: "git-commit-outline",
    isAccordion: true,
    children: [
      {
        key: "queue-list",
        label: "Active List",
        iconFamily: "Ionicons",
        iconName: "list-outline",
        route: "/(admintabs)/(queue)",
      },
      {
        key: "queue-history",
        label: "History Log",
        iconFamily: "Ionicons",
        iconName: "time-outline",
        route: "/(admintabs)/(queue)/queueHistory",
      },
    ],
  },
  {
    key: "appointment",
    label: "Appointments",
    iconFamily: "Feather",
    iconName: "calendar",
    isAccordion: true,
    children: [
      {
        key: "appointment-list",
        label: "Schedules",
        iconFamily: "Feather",
        iconName: "clock",
        route: "/(admintabs)/(appointment)",
      },
      {
        key: "appointment-history",
        label: "Historical Records",
        iconFamily: "Feather",
        iconName: "archive",
        route: "/(admintabs)/(appointment)/appointmentHistory",
      },
    ],
  },
  {
    key: "subscriptions",
    label: "Premium Membership",
    iconFamily: "Feather",
    iconName: "award",
    route: "/(admin)/(subscriptions)",
  },
];

const Header = ({ title, subTitle, showBack = false }) => {
  const router = useRouter();
  const segments = useSegments();
  const [menuVisible, setMenuVisible] = useState(false);
  const [salonModalVisible, setSalonModalVisible] = useState(false);
  const [selectedSalonId, setSelectedSalonId] = useState("s1");
  const [expandedSections, setExpandedSections] = useState({});

  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const bottomSheetAnim = useRef(new Animated.Value(height)).current;

  const isInTabsLayout = segments.includes("(admintabs)");

  const visibleMenuItems = MENU_ITEMS.filter((item) => {
    if (item.key === "dashboard" && isInTabsLayout) {
      return false;
    }
    return true;
  });

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = (callback) => {
    Animated.timing(slideAnim, {
      toValue: DRAWER_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
      if (callback && typeof callback === "function") callback();
    });
  };

  const openSalonModal = () => {
    setSalonModalVisible(true);
    Animated.timing(bottomSheetAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeSalonModal = () => {
    Animated.timing(bottomSheetAnim, {
      toValue: height,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      setSalonModalVisible(false);
    });
  };

  const logoutPressed = async () => {
    try {
      await AsyncStorage.removeItem("adminEmail");
      closeMenu();
      router.replace("/(auth)/(adminauth)/signin");
    } catch (error) {
      console.error("Error during logout sequence:", error);
    }
  };

  const handleNavigation = (route) => {
    closeMenu();
    router.push(route);
  };

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderIcon = (family, name, size, color) => {
    if (family === "Feather") {
      return <Feather name={name} size={size} color={color} />;
    }
    return <Ionicons name={name} size={size} color={color} />;
  };

  return (
    <View style={styles.headerRow}>
      <View style={styles.headerRowContainer}>
        {showBack && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            style={styles.backButtonTouch}
          >
            <Ionicons
              name="arrow-back"
              size={scale(20)}
              color={darkTheme.colors.textMain}
            />
          </TouchableOpacity>
        )}
        <View>
          <Text
            style={[
              darkTheme.typography.headerTitle,
              styles.headerTitle,
              { color: darkTheme.colors.textMain },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              darkTheme.typography.headerSubtitle,
              styles.headerSubtitle,
              { color: darkTheme.colors.textMuted },
            ]}
          >
            {subTitle}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={openMenu}
        style={[
          styles.menuIconContainer,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: darkTheme.colors.border,
          },
        ]}
      >
        <Ionicons
          name="menu-outline"
          size={scale(18)}
          color={darkTheme.colors.textMain}
        />
      </TouchableOpacity>

      {/* Main Sidebar Navigation Menu Drawer Modal */}
      <Modal
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => closeMenu()}
        animationType="none"
      >
        <View style={styles.fullscreenContainer}>
          <TouchableWithoutFeedback onPress={() => closeMenu()}>
            <Animated.View
              style={[
                styles.backdrop,
                {
                  opacity: slideAnim.interpolate({
                    inputRange: [0, DRAWER_WIDTH],
                    outputRange: [1, 0],
                  }),
                },
              ]}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.drawerContainer,
              {
                backgroundColor: "#0D0D0E",
                borderLeftColor: "rgba(255,255,255,0.04)",
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <View style={styles.drawerHeader}>
              <View style={styles.drawerHeaderTitleBlock}>
                <View
                  style={[
                    styles.titleIconBox,
                    { backgroundColor: "rgba(255, 149, 0, 0.1)" },
                  ]}
                >
                  <Feather
                    name="grid"
                    size={scale(13)}
                    color={darkTheme.colors.accent}
                  />
                </View>
                <Text
                  style={[
                    darkTheme.typography.cardTitle,
                    styles.drawerHeaderTitle,
                    { color: darkTheme.colors.textMain },
                  ]}
                >
                  Navigation
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.drawerCloseButtonCircle,
                  {
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.05)",
                  },
                ]}
                onPress={() => closeMenu()}
              >
                <Ionicons
                  name="close"
                  size={scale(15)}
                  color={darkTheme.colors.textMain}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.menuItemsListScrollTrack}
            >
              {visibleMenuItems.map((item) => {
                const isExpanded = !!expandedSections[item.key];

                if (item.isActionTrigger) {
                  return (
                    <TouchableOpacity
                      key={item.key}
                      style={[
                        styles.menuRowItem,
                        {
                          backgroundColor: "rgba(255, 149, 0, 0.02)",
                          borderColor: "rgba(255, 149, 0, 0.06)",
                          borderWidth: 1,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => closeMenu(() => openSalonModal())}
                    >
                      <View style={styles.accordionLeft}>
                        <View
                          style={[
                            styles.iconBoxFrame,
                            { backgroundColor: "rgba(255, 149, 0, 0.08)" },
                          ]}
                        >
                          {renderIcon(
                            item.iconFamily,
                            item.iconName,
                            scale(13),
                            darkTheme.colors.accent,
                          )}
                        </View>
                        <Text
                          style={[
                            darkTheme.typography.bodyMain,
                            styles.menuItemText,
                            {
                              color: darkTheme.colors.accent,
                              fontWeight: "700",
                            },
                          ]}
                        >
                          {item.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }

                if (item.isAccordion) {
                  return (
                    <View
                      key={item.key}
                      style={styles.accordionContainerWrapper}
                    >
                      <TouchableOpacity
                        style={[
                          styles.menuRowItem,
                          styles.accordionHeader,
                          isExpanded && {
                            backgroundColor: "rgba(255, 149, 0, 0.04)",
                            borderColor: "rgba(255, 149, 0, 0.15)",
                          },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => toggleSection(item.key)}
                      >
                        <View style={styles.accordionLeft}>
                          <View
                            style={[
                              styles.iconBoxFrame,
                              isExpanded && {
                                backgroundColor: "rgba(255, 149, 0, 0.1)",
                              },
                            ]}
                          >
                            {renderIcon(
                              item.iconFamily,
                              item.iconName,
                              scale(13),
                              isExpanded
                                ? darkTheme.colors.accent
                                : darkTheme.colors.textMuted,
                            )}
                          </View>
                          <Text
                            style={[
                              darkTheme.typography.bodyMain,
                              styles.menuItemText,
                              {
                                color: isExpanded
                                  ? darkTheme.colors.accent
                                  : darkTheme.colors.textMain,
                              },
                            ]}
                          >
                            {item.label}
                          </Text>
                        </View>
                        {isExpanded ? (
                          <Ionicons
                            name="chevron-down"
                            size={scale(13)}
                            color={darkTheme.colors.accent}
                          />
                        ) : (
                          <Ionicons
                            name="chevron-forward"
                            size={scale(13)}
                            color={darkTheme.colors.textMuted}
                          />
                        )}
                      </TouchableOpacity>

                      {isExpanded && item.children && (
                        <View
                          style={[
                            styles.submenuContainer,
                            { borderLeftColor: "rgba(255, 149, 0, 0.2)" },
                          ]}
                        >
                          {item.children.map((subItem) => (
                            <TouchableOpacity
                              key={subItem.key}
                              style={styles.submenuRowItem}
                              activeOpacity={0.7}
                              onPress={() => handleNavigation(subItem.route)}
                            >
                              <View style={{ marginRight: scale(10) }}>
                                {renderIcon(
                                  subItem.iconFamily,
                                  subItem.iconName,
                                  scale(12),
                                  darkTheme.colors.textMuted,
                                )}
                              </View>
                              <Text
                                style={[
                                  darkTheme.typography.bodyMain,
                                  styles.submenuItemText,
                                  { color: darkTheme.colors.textMuted },
                                ]}
                              >
                                {subItem.label}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  );
                }

                return (
                  <TouchableOpacity
                    key={item.key}
                    style={styles.menuRowItem}
                    activeOpacity={0.7}
                    onPress={() => handleNavigation(item.route)}
                  >
                    <View style={styles.accordionLeft}>
                      <View style={styles.iconBoxFrame}>
                        {renderIcon(
                          item.iconFamily,
                          item.iconName,
                          scale(13),
                          darkTheme.colors.textMuted,
                        )}
                      </View>
                      <Text
                        style={[
                          darkTheme.typography.bodyMain,
                          styles.menuItemText,
                          { color: darkTheme.colors.textMain },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View
              style={[
                styles.drawerFooter,
                { borderTopColor: "rgba(255,255,255,0.03)" },
              ]}
            >
              <TouchableOpacity
                onPress={logoutPressed}
                style={[
                  styles.logoutButtonTile,
                  { backgroundColor: "rgba(255, 59, 48, 0.08)" },
                ]}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="log-out-outline"
                  size={scale(14)}
                  color="#FF3B30"
                  style={{ marginRight: scale(8) }}
                />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
              <Text
                style={[darkTheme.typography.bodyMuted, styles.versionText]}
              >
                Admin System Platform • v1.0
              </Text>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* FIXED: Premium Bottom-Sheet Modal for Dynamic Salon Profile Modifications */}
      <Modal
        transparent={true}
        visible={salonModalVisible}
        onRequestClose={closeSalonModal}
        animationType="none"
      >
        <View style={styles.bottomSheetOverlayContainer}>
          <TouchableWithoutFeedback onPress={closeSalonModal}>
            <View style={styles.bottomSheetBackdropShim} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.bottomSheetPanelDeck,
              {
                backgroundColor: darkTheme.colors.card,
                borderTopColor: darkTheme.colors.border,
                transform: [{ translateY: bottomSheetAnim }],
              },
            ]}
          >
            {/* Header control block inside sheet selection view */}
            <View style={styles.sheetHeaderGroupRow}>
              <Text
                style={[
                  darkTheme.typography.cardTitle,
                  styles.sheetHeadingTitleText,
                ]}
              >
                Choose Salon
              </Text>
              <TouchableOpacity
                style={styles.sheetHeaderCloseCrossContainer}
                activeOpacity={0.7}
                onPress={closeSalonModal}
              >
                <Ionicons name="close" size={scale(14)} color="#FF3B30" />
              </TouchableOpacity>
            </View>

            {/* Displaying selected current salon preview widget wrapper */}
            <View
              style={[
                styles.activeSalonIndicatorDisplayBox,
                {
                  backgroundColor: "#0C0C0E",
                  borderColor: "rgba(255,255,255,0.04)",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="storefront-outline"
                size={scale(14)}
                color={darkTheme.colors.accent}
                style={{ marginRight: scale(10) }}
              />
              <Text style={styles.activeSalonLabelText}>
                {MOCK_SALONS.find((s) => s.id === selectedSalonId)?.name ||
                  "Select Profile Workspace"}
              </Text>
            </View>

            {/* Iterated roster selection list parameters container track */}
            <View
              style={[
                styles.optionsScrollStackDeck,
                { backgroundColor: "rgba(0,0,0,0.18)" },
              ]}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                {MOCK_SALONS.map((salon) => {
                  const isCurrentSelection = selectedSalonId === salon.id;
                  return (
                    <TouchableOpacity
                      key={salon.id}
                      activeOpacity={0.8}
                      onPress={() => setSelectedSalonId(salon.id)}
                      style={[
                        styles.salonSelectionItemRowUnit,
                        isCurrentSelection && {
                          backgroundColor: "rgba(255, 149, 0, 0.04)",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.salonSelectionItemLabelText,
                          {
                            color: isCurrentSelection
                              ? darkTheme.colors.accent
                              : "rgba(255,255,255,0.5)",
                          },
                        ]}
                      >
                        {salon.name}
                      </Text>
                      {isCurrentSelection && (
                        <Ionicons
                          name="checkmark-circle"
                          size={scale(14)}
                          color={darkTheme.colors.accent}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Confirmation workflow submission click controller track */}
            {/* Confirmation workflow submission click controller track */}
            <TouchableOpacity
              style={[
                styles.sheetSubmitActionBtn,
                { backgroundColor: darkTheme.colors.accent },
              ]}
              activeOpacity={0.85}
              onPress={() => {
                console.log(
                  "Context profile altered successfully to target ID instance reference:",
                  selectedSalonId,
                );
                closeSalonModal();
              }}
            >
              <Text
                style={[styles.sheetSubmitActionBtnText, { color: "#000000" }]}
              >
                Apply
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    marginTop: verticalScale(6),
    marginBottom: verticalScale(14),
  },
  headerRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  backButtonTouch: {
    height: scale(32),
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: scale(16),
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: scale(11),
    marginTop: verticalScale(1),
    opacity: 0.6,
  },
  menuIconContainer: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(8),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: width,
    height: height,
  },
  backdrop: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  drawerContainer: {
    width: DRAWER_WIDTH,
    height: "100%",
    paddingTop: Platform.OS === "ios" ? verticalScale(54) : verticalScale(36),
    borderLeftWidth: 1,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  drawerHeaderTitleBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  titleIconBox: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(6),
    justifyContent: "center",
    alignItems: "center",
  },
  drawerHeaderTitle: {
    fontSize: scale(14),
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  drawerCloseButtonCircle: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemsListScrollTrack: {
    paddingHorizontal: scale(12),
    gap: verticalScale(4),
    paddingBottom: verticalScale(24),
  },
  accordionContainerWrapper: {
    width: "100%",
  },
  menuRowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(10),
    height: verticalScale(42),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: "transparent",
  },
  accordionHeader: {
    justifyContent: "space-between",
  },
  accordionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconBoxFrame: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(6),
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  menuItemText: {
    fontSize: scale(13),
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  submenuContainer: {
    paddingLeft: scale(20),
    marginTop: verticalScale(2),
    marginBottom: verticalScale(4),
    borderLeftWidth: 1.5,
    marginLeft: scale(21),
    gap: verticalScale(2),
  },
  submenuRowItem: {
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(36),
  },
  submenuItemText: {
    fontSize: scale(12.5),
    fontWeight: "500",
    letterSpacing: -0.1,
  },
  drawerFooter: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom:
      Platform.OS === "ios" ? verticalScale(30) : verticalScale(20),
    borderTopWidth: 1,
  },
  logoutButtonTile: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(14),
  },
  logoutButtonText: {
    color: "#FF3B30",
    fontSize: scale(12),
    fontWeight: "700",
  },
  versionText: {
    fontSize: scale(9),
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    opacity: 0.3,
  },

  // Premium Architectural Elements for Selection Sheets Layout Blocks
  bottomSheetOverlayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  bottomSheetBackdropShim: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  bottomSheetPanelDeck: {
    width: width,
    maxHeight: height * 0.75,
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    borderTopWidth: 1.5,
    padding: scale(18),
    paddingBottom:
      Platform.OS === "ios" ? verticalScale(34) : verticalScale(22),
  },
  sheetHeaderGroupRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: verticalScale(14),
  },
  sheetHeadingTitleText: {
    fontSize: scale(14.5),
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sheetHeaderCloseCrossContainer: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(4),
    backgroundColor: "rgba(255, 59, 48, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  activeSalonIndicatorDisplayBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: scale(38),
    borderRadius: scale(4),
    borderWidth: 1,
    paddingHorizontal: scale(12),
    marginBottom: verticalScale(12),
  },
  activeSalonLabelText: {
    color: "#FFFFFF",
    fontSize: scale(13),
    fontWeight: "600",
  },
  optionsScrollStackDeck: {
    width: "100%",
    maxHeight: verticalScale(160),
    borderRadius: scale(6),
    overflow: "hidden",
    marginBottom: verticalScale(18),
  },
  salonSelectionItemRowUnit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: verticalScale(40),
    paddingHorizontal: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.01)",
  },
  salonSelectionItemLabelText: {
    fontSize: scale(12.5),
    fontWeight: "500",
  },
  sheetSubmitActionBtn: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(4),
  },
  sheetSubmitActionBtnText: {
    fontSize: scale(12),
    fontWeight: "700",
  },
});

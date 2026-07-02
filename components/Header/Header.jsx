// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";
// import { useRef, useState } from "react";
// import {
//   Animated,
//   Dimensions,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import { scale, verticalScale } from "react-native-size-matters";

// import { darkTheme } from "../../constants/appTheme";
// import {
//   DownIcon, // Wallet icon substitute if needed, or choose standard
//   HistoryIcon,
//   LeftArrowIcon,
//   MenuIcon,
//   PaymentHistoryIcon,
//   PaymentIcon,
//   QueueIcon,
//   ReportIcon,
//   RightIcon,
//   ScissorIcon,
//   SettingsIcon,
// } from "../../constants/icons";

// const { width, height } = Dimensions.get("window");
// const DRAWER_WIDTH = width * 0.65;

// // Dynamic Menu Configuration mapping directly to your imported custom icon components
// const MENU_ITEMS = [
//   {
//     key: "profile",
//     label: "Profile",
//     IconComponent: ScissorIcon,
//     route: "/(admin)/(profile)",
//   },
//   {
//     key: "services",
//     label: "Services",
//     IconComponent: ScissorIcon,
//     route: "/(admin)/(admintabs)/(services)",
//   },
//   {
//     key: "customer",
//     label: "Customers",
//     IconComponent: ReportIcon,
//     route: "/(admin)/(customer)",
//   },
//   {
//     key: "reports",
//     label: "Reports",
//     IconComponent: ReportIcon,
//     route: "/(admin)/(reports)",
//   },
//   {
//     key: "payments",
//     label: "Payments",
//     IconComponent: PaymentIcon, // Swap with whatever your custom library maps to wallet
//     isAccordion: true,
//     children: [
//       {
//         key: "payment-history",
//         label: "Payment History",
//         IconComponent: PaymentHistoryIcon,
//         route: "/(admin)/(payments)/",
//       },
//       {
//         key: "payment-settings",
//         label: "Payment Settings",
//         IconComponent: SettingsIcon,
//         route: "/(admin)/(payments)/paymentSettings",
//       },
//     ],
//   },
//   {
//     key: "queue",
//     label: "Queue",
//     IconComponent: QueueIcon,
//     isAccordion: true,
//     children: [
//       {
//         key: "queue-list",
//         label: "Queue List",
//         IconComponent: QueueIcon,
//         route: "/(admin)/(queue)",
//       },
//       {
//         key: "queue-history",
//         label: "Queue History",
//         IconComponent: HistoryIcon,
//         route: "/(admin)/(queue)/queueHistory",
//       },
//     ],
//   },
//   {
//     key: "appointment",
//     label: "Appointment",
//     IconComponent: QueueIcon,
//     isAccordion: true,
//     children: [
//       {
//         key: "appointment-list",
//         label: "Appointment List",
//         IconComponent: QueueIcon,
//         route: "/(admin)/(appointment)",
//       },
//       {
//         key: "appointment-history",
//         label: "Appointment History",
//         IconComponent: HistoryIcon,
//         route: "/(admin)/(appointment)/appointmentHistory",
//       },
//     ],
//   },
//   {
//     key: "subscriptions",
//     label: "Subscriptions",
//     IconComponent: ReportIcon,
//     route: "/(admin)/(subscriptions)",
//   },
// ];

// const Header = ({ title, subTitle, showBack = false }) => {
//   const router = useRouter();
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [expandedSections, setExpandedSections] = useState({});
//   const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

//   const openMenu = () => {
//     setMenuVisible(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 250,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(slideAnim, {
//       toValue: DRAWER_WIDTH,
//       duration: 220,
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
//       console.error("Error during logout:", error);
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

//   return (
//     <View style={styles.headerRow}>
//       <View style={styles.headerRowContainer}>
//         {showBack && (
//           <TouchableOpacity
//             activeOpacity={0.7}
//             onPress={() => router.back()}
//             style={styles.backButtonTouch}
//           >
//             <LeftArrowIcon size={scale(22)} color={darkTheme.colors.textMain} />
//           </TouchableOpacity>
//         )}
//         <View>
//           <Text style={[darkTheme.typography.headerTitle, styles.headerTitle]}>
//             {title}
//           </Text>
//           <Text
//             style={[darkTheme.typography.headerSubtitle, styles.headerSubtitle]}
//           >
//             {subTitle}
//           </Text>
//         </View>
//       </View>

//       <TouchableOpacity activeOpacity={0.7} onPress={openMenu}>
//         <MenuIcon size={scale(24)} color={darkTheme.colors.textMain} />
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
//                 backgroundColor: darkTheme.colors.card,
//                 transform: [{ translateX: slideAnim }],
//               },
//             ]}
//           >
//             {/* Drawer Header Section */}
//             <View style={styles.drawerHeader}>
//               <Text
//                 style={[
//                   darkTheme.typography.cardTitle,
//                   styles.drawerHeaderTitle,
//                 ]}
//               >
//                 Menu
//               </Text>
//               <TouchableOpacity onPress={closeMenu}>
//                 <LeftArrowIcon
//                   size={scale(22)}
//                   color={darkTheme.colors.textMain}
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Dynamic Menu Links */}
//             <View style={styles.menuItemsList}>
//               {MENU_ITEMS.map((item) => {
//                 const isExpanded = !!expandedSections[item.key];
//                 const MainIcon = item.IconComponent;

//                 if (item.isAccordion) {
//                   return (
//                     <View key={item.key}>
//                       <TouchableOpacity
//                         style={[styles.menuRowItem, styles.accordionHeader]}
//                         activeOpacity={0.7}
//                         onPress={() => toggleSection(item.key)}
//                       >
//                         <View style={styles.accordionLeft}>
//                           <MainIcon
//                             size={scale(18)}
//                             color={darkTheme.colors.textMuted}
//                             style={styles.menuIcon}
//                           />
//                           <Text
//                             style={[
//                               darkTheme.typography.bodyMain,
//                               styles.menuItemText,
//                             ]}
//                           >
//                             {item.label}
//                           </Text>
//                         </View>
//                         {isExpanded ? (
//                           <DownIcon
//                             size={scale(16)}
//                             color={darkTheme.colors.textMuted}
//                           />
//                         ) : (
//                           <RightIcon
//                             size={scale(16)}
//                             color={darkTheme.colors.textMuted}
//                           />
//                         )}
//                       </TouchableOpacity>

//                       {isExpanded && item.children && (
//                         <View style={styles.submenuContainer}>
//                           {item.children.map((subItem) => {
//                             const SubIcon = subItem.IconComponent;
//                             return (
//                               <TouchableOpacity
//                                 key={subItem.key}
//                                 style={styles.submenuRowItem}
//                                 activeOpacity={0.7}
//                                 onPress={() => handleNavigation(subItem.route)}
//                               >
//                                 <SubIcon
//                                   size={scale(16)}
//                                   color={darkTheme.colors.textMuted}
//                                   style={styles.menuIcon}
//                                 />
//                                 <Text
//                                   style={[
//                                     darkTheme.typography.bodyMain,
//                                     styles.submenuItemText,
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
//                     <MainIcon
//                       size={scale(18)}
//                       color={darkTheme.colors.textMuted}
//                       style={styles.menuIcon}
//                     />
//                     <Text
//                       style={[
//                         darkTheme.typography.bodyMain,
//                         styles.menuItemText,
//                       ]}
//                     >
//                       {item.label}
//                     </Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>

//             {/* Footer Log Out Area */}
//             <View style={styles.drawerFooter}>
//               <TouchableOpacity
//                 onPress={logoutPressed}
//                 style={[
//                   styles.logoutButton,
//                   {
//                     borderColor: darkTheme.colors.accent,
//                     borderRadius: darkTheme.layout.borderRadiusMedium,
//                     height: darkTheme.layout.buttonHeight,
//                   },
//                 ]}
//                 activeOpacity={0.8}
//               >
//                 <Text
//                   style={[
//                     darkTheme.typography.btnText,
//                     { color: darkTheme.colors.accent },
//                   ]}
//                 >
//                   Logout
//                 </Text>
//               </TouchableOpacity>

//               <Text
//                 style={[darkTheme.typography.bodyMuted, styles.versionText]}
//               >
//                 Admin Panel v1.0
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
//     paddingHorizontal: darkTheme.layout.paddingHorizontal,
//     marginBottom: verticalScale(20),
//   },
//   headerRowContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(10),
//   },
//   backButtonTouch: {
//     height: scale(36),
//     justifyContent: "center",
//   },
//   headerTitle: {
//     letterSpacing: -0.5,
//   },
//   headerSubtitle: {
//     marginTop: verticalScale(1),
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
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//   },
//   drawerContainer: {
//     width: DRAWER_WIDTH,
//     height: "100%",
//     paddingTop: verticalScale(60),
//     paddingHorizontal: scale(24),
//     justifyContent: "space-between",
//     paddingBottom: verticalScale(40),
//   },
//   drawerHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: verticalScale(24),
//   },
//   drawerHeaderTitle: {
//     letterSpacing: -0.3,
//   },
//   menuItemsList: {
//     flex: 1,
//   },
//   menuRowItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: verticalScale(12),
//     marginBottom: verticalScale(2),
//   },
//   accordionHeader: {
//     justifyContent: "space-between",
//   },
//   accordionLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   submenuContainer: {
//     paddingLeft: scale(16),
//     marginTop: verticalScale(2),
//     marginBottom: verticalScale(8),
//   },
//   submenuRowItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: verticalScale(10),
//   },
//   menuIcon: {
//     marginRight: scale(12),
//     width: scale(20),
//   },
//   menuItemText: {
//     letterSpacing: -0.1,
//   },
//   submenuItemText: {
//     fontSize: scale(13),
//     letterSpacing: -0.1,
//   },
//   drawerFooter: {
//     alignItems: "center",
//     width: "100%",
//   },
//   logoutButton: {
//     borderWidth: 1,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: verticalScale(12),
//   },
//   versionText: {
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
// });

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { darkTheme } from "../../constants/appTheme";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.72;

// Mapped directly to premium vector assets with unique families to prevent repetition
const MENU_ITEMS = [
  {
    key: "profile",
    label: "Profile Workspace",
    iconFamily: "Feather",
    iconName: "user",
    route: "/(admin)/(profile)",
  },
  {
    key: "services",
    label: "Service Portfolio",
    iconFamily: "MaterialCommunityIcons",
    iconName: "content-cut",
    route: "/(admin)/(admintabs)/(services)",
  },
  {
    key: "customer",
    label: "Customer Database",
    iconFamily: "Ionicons",
    iconName: "people-outline",
    route: "/(admin)/(customer)",
  },
  {
    key: "reports",
    label: "Analytics & Reports",
    iconFamily: "Ionicons",
    iconName: "bar-chart-outline",
    route: "/(admin)/(reports)",
  },
  {
    key: "payments",
    label: "Payment Rails",
    iconFamily: "Feather",
    iconName: "credit-card",
    isAccordion: true,
    children: [
      {
        key: "payment-history",
        label: "Payment History",
        iconFamily: "MaterialCommunityIcons",
        iconName: "history",
        route: "/(admin)/(payments)/",
      },
      {
        key: "payment-settings",
        label: "Payout Gateways",
        iconFamily: "Feather",
        iconName: "settings",
        route: "/(admin)/(payments)/paymentSettings",
      },
    ],
  },
  {
    key: "queue",
    label: "Live Backlog Queue",
    iconFamily: "MaterialCommunityIcons",
    iconName: "human-queue",
    isAccordion: true,
    children: [
      {
        key: "queue-list",
        label: "Active Queue List",
        iconFamily: "Ionicons",
        iconName: "list-outline",
        route: "/(admin)/(queue)",
      },
      {
        key: "queue-history",
        label: "Queue History Log",
        iconFamily: "MaterialCommunityIcons",
        iconName: "clipboard-text-clock-outline",
        route: "/(admin)/(queue)/queueHistory",
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
        label: "Booked Schedules",
        iconFamily: "Ionicons",
        iconName: "calendar-outline",
        route: "/(admin)/(appointment)",
      },
      {
        key: "appointment-history",
        label: "Historical Records",
        iconFamily: "Ionicons",
        iconName: "time-outline",
        route: "/(admin)/(appointment)/appointmentHistory",
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
  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: DRAWER_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
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
    switch (family) {
      case "Feather":
        return <Feather name={name} size={size} color={color} />;
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons name={name} size={size} color={color} />;
      default:
        return <Ionicons name={name} size={size} color={color} />;
    }
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
            <Ionicons name="arrow-back" size={scale(20)} color={darkTheme.colors.textMain} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={[darkTheme.typography.headerTitle, styles.headerTitle, { color: darkTheme.colors.textMain }]}>
            {title}
          </Text>
          <Text style={[darkTheme.typography.headerSubtitle, styles.headerSubtitle, { color: darkTheme.colors.textMuted }]}>
            {subTitle}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={openMenu}
        style={[styles.menuIconContainer, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
      >
        <Ionicons name="menu-outline" size={scale(18)} color={darkTheme.colors.textMain} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={menuVisible}
        onRequestClose={closeMenu}
        animationType="none"
      >
        <View style={styles.fullscreenContainer}>
          <TouchableWithoutFeedback onPress={closeMenu}>
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
            {/* Drawer Header Block Section Layout */}
            <View style={styles.drawerHeader}>
              <View style={styles.drawerHeaderTitleBlock}>
                <View style={[styles.titleIconBox, { backgroundColor: "rgba(255, 149, 0, 0.1)" }]}>
                  <Feather name="grid" size={scale(13)} color={darkTheme.colors.accent} />
                </View>
                <Text style={[darkTheme.typography.cardTitle, styles.drawerHeaderTitle, { color: darkTheme.colors.textMain }]}>
                  App Navigation
                </Text>
              </View>
              <TouchableOpacity 
                style={[styles.drawerCloseButtonCircle, { backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }]} 
                onPress={closeMenu}
              >
                <Ionicons name="close" size={scale(15)} color={darkTheme.colors.textMain} />
              </TouchableOpacity>
            </View>

            {/* Premium Scrollable Menu Items Tracks Node */}
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              contentContainerStyle={styles.menuItemsListScrollTrack}
            >
              {MENU_ITEMS.map((item) => {
                const isExpanded = !!expandedSections[item.key];

                if (item.isAccordion) {
                  return (
                    <View key={item.key} style={styles.accordionContainerWrapper}>
                      <TouchableOpacity
                        style={[
                          styles.menuRowItem, 
                          styles.accordionHeader,
                          isExpanded && { backgroundColor: "rgba(255, 149, 0, 0.04)", borderColor: "rgba(255, 149, 0, 0.15)" }
                        ]}
                        activeOpacity={0.7}
                        onPress={() => toggleSection(item.key)}
                      >
                        <View style={styles.accordionLeft}>
                          <View style={[styles.iconBoxFrame, isExpanded && { backgroundColor: "rgba(255, 149, 0, 0.1)" }]}>
                            {renderIcon(item.iconFamily, item.iconName, scale(13), isExpanded ? darkTheme.colors.accent : darkTheme.colors.textMuted)}
                          </View>
                          <Text style={[darkTheme.typography.bodyMain, styles.menuItemText, { color: isExpanded ? darkTheme.colors.accent : darkTheme.colors.textMain }]}>
                            {item.label}
                          </Text>
                        </View>
                        {isExpanded ? (
                          <Ionicons name="chevron-down" size={scale(13)} color={darkTheme.colors.accent} />
                        ) : (
                          <Ionicons name="chevron-forward" size={scale(13)} color={darkTheme.colors.textMuted} />
                        )}
                      </TouchableOpacity>

                      {isExpanded && item.children && (
                        <View style={[styles.submenuContainer, { borderLeftColor: "rgba(255, 149, 0, 0.2)" }]}>
                          {item.children.map((subItem) => {
                            return (
                              <TouchableOpacity
                                key={subItem.key}
                                style={styles.submenuRowItem}
                                activeOpacity={0.7}
                                onPress={() => handleNavigation(subItem.route)}
                              >
                                <View style={{ marginRight: scale(10) }}>
                                  {renderIcon(subItem.iconFamily, subItem.iconName, scale(12), darkTheme.colors.textMuted)}
                                </View>
                                <Text style={[darkTheme.typography.bodyMain, styles.submenuItemText, { color: darkTheme.colors.textMuted }]}>
                                  {subItem.label}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
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
                        {renderIcon(item.iconFamily, item.iconName, scale(13), darkTheme.colors.textMuted)}
                      </View>
                      <Text style={[darkTheme.typography.bodyMain, styles.menuItemText, { color: darkTheme.colors.textMain }]}>
                        {item.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Footer Log Out Area Layout Section */}
            <View style={[styles.drawerFooter, { borderTopColor: "rgba(255,255,255,0.03)" }]}>
              <TouchableOpacity
                onPress={logoutPressed}
                style={[styles.logoutButtonTile, { backgroundColor: "rgba(255, 59, 48, 0.08)" }]}
                activeOpacity={0.8}
              >
                <Ionicons name="log-out-outline" size={scale(14)} color="#FF3B30" style={{ marginRight: scale(8) }} />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>

              <Text style={[darkTheme.typography.bodyMuted, styles.versionText]}>
                Admin System Platform • v1.0
              </Text>
            </View>
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
    paddingBottom: Platform.OS === "ios" ? verticalScale(30) : verticalScale(20),
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
});


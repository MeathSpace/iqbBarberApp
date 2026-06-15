// import React, { useState, useRef } from "react";
// import { Ionicons, Feather } from "@expo/vector-icons";
// import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated, TouchableWithoutFeedback, Modal } from "react-native";
// import { scale, verticalScale } from "react-native-size-matters";

// const { width, height } = Dimensions.get("window");
// const DRAWER_WIDTH = width * 0.65; // Side menu width (65% of screen width)

// const Header = () => {
//   const [menuVisible, setMenuVisible] = useState(false);
  
//   // Start off-screen to the right by the exact width of the drawer
//   const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

//   const DASHBOARD_COLORS = {
//     bg: "#0D0D0D",
//     drawerBg: "#1C1C1E", 
//     textMain: "#FFFFFF",
//     textMuted: "#8E8E93",
//     accent: "#FF9500",
//     border: "#262626",
//   };

//   const openMenu = () => {
//     setMenuVisible(true);
//     // Slide in to 0 (fully aligned with the right edge)
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 250,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeMenu = () => {
//     // Slide back out to the right
//     Animated.timing(slideAnim, {
//       toValue: DRAWER_WIDTH,
//       duration: 220,
//       useNativeDriver: true,
//     }).start(() => {
//       setMenuVisible(false); // Unmount modal only after slide completes
//     });
//   };

//   return (
//     <View style={styles.headerRow}>
//       <View>
//         <Text style={styles.headerTitle}>Dashboard</Text>
//         <Text style={styles.headerSubtitle}>Manage your barbershop</Text>
//       </View>
//       <TouchableOpacity activeOpacity={0.7} onPress={openMenu}>
//         <Ionicons
//           name="menu"
//           size={scale(24)}
//           color={DASHBOARD_COLORS.textMain}
//         />
//       </TouchableOpacity>

//       {/* Using a Modal container allows us to break out of layout paddings completely */}
//       <Modal
//         transparent={true}
//         visible={menuVisible}
//         onRequestClose={closeMenu}
//         animationType="none" // We handle the slide layout manually below
//       >
//         <View style={styles.fullscreenContainer}>
          
//           {/* Animated Dim Backdrop */}
//           <TouchableWithoutFeedback onPress={closeMenu}>
//             <Animated.View 
//               style={[
//                 styles.backdrop, 
//                 {
//                   opacity: slideAnim.interpolate({
//                     inputRange: [0, DRAWER_WIDTH],
//                     outputRange: [1, 0], // Fades dark overlay relative to menu sliding position
//                   })
//                 }
//               ]} 
//             />
//           </TouchableWithoutFeedback>

//           {/* Smooth Right-to-Left Sliding Drawer Panel */}
//           <Animated.View 
//             style={[
//               styles.drawerContainer, 
//               { 
//                 backgroundColor: DASHBOARD_COLORS.drawerBg,
//                 transform: [{ translateX: slideAnim }] 
//               }
//             ]}
//           >
//             {/* Drawer Header Section */}
//             <View style={styles.drawerHeader}>
//               <Text style={[styles.drawerHeaderTitle, { color: DASHBOARD_COLORS.textMain }]}>Menu</Text>
//               <TouchableOpacity onPress={closeMenu}>
//                 <Ionicons name="close" size={scale(22)} color={DASHBOARD_COLORS.textMain} />
//               </TouchableOpacity>
//             </View>

//             {/* Main Menu Links Navigation Items List */}
//             <View style={styles.menuItemsList}>
//               <TouchableOpacity style={styles.menuRowItem} activeOpacity={0.7}>
//                 <Feather name="scissors" size={scale(18)} color={DASHBOARD_COLORS.textMuted} style={styles.menuIcon} />
//                 <Text style={[styles.menuItemText, { color: DASHBOARD_COLORS.textMain }]}>Services</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.menuRowItem} activeOpacity={0.7}>
//                 <Ionicons name="bar-chart-outline" size={scale(18)} color={DASHBOARD_COLORS.textMuted} style={styles.menuIcon} />
//                 <Text style={[styles.menuItemText, { color: DASHBOARD_COLORS.textMain }]}>Reports</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.menuRowItem} activeOpacity={0.7}>
//                 <Ionicons name="settings-outline" size={scale(18)} color={DASHBOARD_COLORS.textMuted} style={styles.menuIcon} />
//                 <Text style={[styles.menuItemText, { color: DASHBOARD_COLORS.textMain }]}>Business Settings</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Footer Log Out Area */}
//             <View style={styles.drawerFooter}>
//               <TouchableOpacity 
//                 style={[styles.logoutButton, { borderColor: DASHBOARD_COLORS.accent }]} 
//                 activeOpacity={0.8}
//               >
//                 <Text style={[styles.logoutText, { color: DASHBOARD_COLORS.accent }]}>Logout</Text>
//               </TouchableOpacity>
              
//               <Text style={[styles.versionText, { color: DASHBOARD_COLORS.textMuted }]}>Admin Panel v1.0</Text>
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
//     marginBottom: verticalScale(20),
//   },
//   headerTitle: {
//     fontSize: scale(26),
//     fontWeight: "bold",
//     color: "#FFFFFF",
//   },
//   headerSubtitle: {
//     fontSize: scale(13),
//     color: "#8E8E93",
//     marginTop: verticalScale(2),
//   },
  
//   // Full Window Modal Overlay Structure
//   fullscreenContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "flex-end", // Aligns drawer to the right edge of screen
//     width: width,
//     height: height,
//   },
//   backdrop: {
//     position: "absolute",
//     width: width,
//     height: height,
//     backgroundColor: "rgba(0, 0, 0, 0.4)",
//   },
//   drawerContainer: {
//     width: DRAWER_WIDTH,
//     height: "100%",
//     paddingTop: verticalScale(60), // Fits perfectly below iPhone 17 Pro status bar
//     paddingHorizontal: scale(20),
//     justifyContent: "space-between", 
//     paddingBottom: verticalScale(40),
//     shadowColor: "#000",
//     shadowOffset: { width: -4, height: 0 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 16,
//   },
//   drawerHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: verticalScale(30),
//   },
//   drawerHeaderTitle: {
//     fontSize: scale(18),
//     fontWeight: "bold",
//   },
//   menuItemsList: {
//     flex: 1,
//   },
//   menuRowItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: verticalScale(14),
//     marginBottom: verticalScale(4),
//   },
//   menuIcon: {
//     marginRight: scale(14),
//     width: scale(22),
//   },
//   menuItemText: {
//     fontSize: scale(14),
//     fontWeight: "500",
//   },
//   drawerFooter: {
//     alignItems: "center",
//     width: "100%",
//   },
//   logoutButton: {
//     borderWidth: 1,
//     borderRadius: scale(6),
//     width: "100%",
//     paddingVertical: verticalScale(12),
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: verticalScale(16),
//   },
//   logoutText: {
//     fontSize: scale(14),
//     fontWeight: "bold",
//   },
//   versionText: {
//     fontSize: scale(10),
//   },
// });


import React, { useState, useRef } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated, TouchableWithoutFeedback, Modal, Platform } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.65; 

const Header = ({title, subTitle}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

  const DASHBOARD_COLORS = {
    bg: "#0D0D0D",
    drawerBg: "#121214", // Deeper, more premium charcoal black for the drawer
    textMain: "#FFFFFF",
    textMuted: "#A1A1AA", // Brighter, cleaner gray (zinc-400) for better premium legibility
    accent: "#FF9500",
    border: "#262626",
  };

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: DRAWER_WIDTH,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  return (
    <View style={styles.headerRow}>
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subTitle}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={openMenu}>
        <Ionicons
          name="menu"
          size={scale(24)}
          color={DASHBOARD_COLORS.textMain}
        />
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
                  })
                }
              ]} 
            />
          </TouchableWithoutFeedback>

          <Animated.View 
            style={[
              styles.drawerContainer, 
              { 
                backgroundColor: DASHBOARD_COLORS.drawerBg,
                transform: [{ translateX: slideAnim }] 
              }
            ]}
          >
            {/* Drawer Header Section */}
            <View style={styles.drawerHeader}>
              <Text style={[styles.drawerHeaderTitle, { color: DASHBOARD_COLORS.textMain }]}>Menu</Text>
              <TouchableOpacity onPress={closeMenu}>
                <Ionicons name="close" size={scale(22)} color={DASHBOARD_COLORS.textMain} />
              </TouchableOpacity>
            </View>

            {/* Main Menu Links */}
            <View style={styles.menuItemsList}>
              <TouchableOpacity style={styles.menuRowItem} activeOpacity={0.7}>
                <Feather name="scissors" size={scale(18)} color={DASHBOARD_COLORS.textMuted} style={styles.menuIcon} />
                <Text style={[styles.menuItemText, { color: DASHBOARD_COLORS.textMain }]}>Services</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuRowItem} activeOpacity={0.7}>
                <Ionicons name="bar-chart-outline" size={scale(18)} color={DASHBOARD_COLORS.textMuted} style={styles.menuIcon} />
                <Text style={[styles.menuItemText, { color: DASHBOARD_COLORS.textMain }]}>Reports</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuRowItem} activeOpacity={0.7}>
                <Ionicons name="settings-outline" size={scale(18)} color={DASHBOARD_COLORS.textMuted} style={styles.menuIcon} />
                <Text style={[styles.menuItemText, { color: DASHBOARD_COLORS.textMain }]}>Business Settings</Text>
              </TouchableOpacity>
            </View>

            {/* Footer Log Out Area */}
            <View style={styles.drawerFooter}>
              <TouchableOpacity 
                style={[styles.logoutButton, { borderColor: DASHBOARD_COLORS.accent }]} 
                activeOpacity={0.8}
              >
                <Text style={[styles.logoutText, { color: DASHBOARD_COLORS.accent }]}>Logout</Text>
              </TouchableOpacity>
              
              <Text style={[styles.versionText, { color: DASHBOARD_COLORS.textMuted }]}>Admin Panel v1.0</Text>
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
    marginBottom: verticalScale(20),
  },
  headerTitle: {
    fontSize: scale(24), // Tucked down slightly for premium balancing
    fontWeight: "700",   // True Bold
    color: "#FFFFFF",
    ...Platform.select({
      ios: { fontFamily: "System" },
      android: { fontFamily: "sans-serif-condensed" } // Clean Android premium geometric alternative
    }),
    letterSpacing: -0.5, // Tight letter spacing creates that luxury premium appearance
  },
  headerSubtitle: {
    fontSize: scale(13),
    color: "#A1A1AA",
    marginTop: verticalScale(1),
    fontWeight: "400",
    letterSpacing: -0.1,
  },
  
  // Full Window Modal Overlay Structure
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
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Deeper backdrop blend
  },
  drawerContainer: {
    width: DRAWER_WIDTH,
    height: "100%",
    paddingTop: verticalScale(60),
    paddingHorizontal: scale(24), // Added alignment padding for a cleaner line-up
    justifyContent: "space-between", 
    paddingBottom: verticalScale(40),
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(24),
  },
  drawerHeaderTitle: {
    fontSize: scale(18),
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  menuItemsList: {
    flex: 1,
  },
  menuRowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(2),
  },
  menuIcon: {
    marginRight: scale(12),
    width: scale(20),
  },
  menuItemText: {
    fontSize: scale(14),
    fontWeight: "500", // Medium weight font
    letterSpacing: -0.1,
  },
  drawerFooter: {
    alignItems: "center",
    width: "100%",
  },
  logoutButton: {
    borderWidth: 1,
    borderRadius: scale(8), // Premium smooth rounded corner ratio
    width: "100%",
    paddingVertical: verticalScale(12),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(12),
  },
  logoutText: {
    fontSize: scale(13),
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  versionText: {
    fontSize: scale(10),
    fontWeight: "400",
    textTransform: "uppercase", // Capitalized footer tags scream premium detailing
    letterSpacing: 0.5,         // Wide spacing for smaller tracking indicators
  },
});
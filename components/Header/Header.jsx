import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { darkTheme } from "../../constants/appTheme";
import { LeftArrowIcon } from "../../constants/icons";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.65;

const Header = ({ title, subTitle, showBack = false }) => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [paymentsExpanded, setPaymentsExpanded] = useState(false); // Track submenu state
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

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

  const logoutPressed = async () => {
    try {
      await AsyncStorage.removeItem("adminEmail");
      closeMenu();
      router.replace("/(auth)/(adminauth)/signin");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleNavigation = (route) => {
    closeMenu();
    router.push(route);
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
            <LeftArrowIcon size={scale(22)} color={darkTheme.colors.textMain} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={[darkTheme.typography.headerTitle, styles.headerTitle]}>
            {title}
          </Text>
          <Text
            style={[darkTheme.typography.headerSubtitle, styles.headerSubtitle]}
          >
            {subTitle}
          </Text>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={openMenu}>
        <Ionicons
          name="menu"
          size={scale(24)}
          color={darkTheme.colors.textMain}
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
                  }),
                },
              ]}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.drawerContainer,
              {
                backgroundColor: darkTheme.colors.card,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            {/* Drawer Header Section */}
            <View style={styles.drawerHeader}>
              <Text
                style={[
                  darkTheme.typography.cardTitle,
                  styles.drawerHeaderTitle,
                ]}
              >
                Menu
              </Text>
              <TouchableOpacity onPress={closeMenu}>
                <Ionicons
                  name="close"
                  size={scale(22)}
                  color={darkTheme.colors.textMain}
                />
              </TouchableOpacity>
            </View>

            {/* Main Menu Links */}
            <View style={styles.menuItemsList}>
              {/* Services Item */}
              <TouchableOpacity
                style={styles.menuRowItem}
                activeOpacity={0.7}
                onPress={() => handleNavigation("/(admin)/(admintabs)/(services)")}
              >
                <Feather name="scissors" size={scale(18)} color={darkTheme.colors.textMuted} style={styles.menuIcon} />
                <Text style={[darkTheme.typography.bodyMain, styles.menuItemText]}>Services</Text>
              </TouchableOpacity>

              {/* Reports Item */}
              <TouchableOpacity
                style={styles.menuRowItem}
                activeOpacity={0.7}
                onPress={() => handleNavigation("/(admin)/(admintabs)/(reports)")}
              >
                <Ionicons name="bar-chart-outline" size={scale(18)} color={darkTheme.colors.textMuted} style={styles.menuIcon} />
                <Text style={[darkTheme.typography.bodyMain, styles.menuItemText]}>Reports</Text>
              </TouchableOpacity>

     
              <TouchableOpacity
                style={[styles.menuRowItem, styles.accordionHeader]}
                activeOpacity={0.7}
                onPress={() => setPaymentsExpanded(!paymentsExpanded)}
              >
                <View style={styles.accordionLeft}>
                  <Ionicons name="wallet-outline" size={scale(18)} color={darkTheme.colors.textMuted} style={styles.menuIcon} />
                  <Text style={[darkTheme.typography.bodyMain, styles.menuItemText]}>Payments</Text>
                </View>
                <Ionicons 
                  name={paymentsExpanded ? "chevron-down" : "chevron-forward"} 
                  size={scale(16)} 
                  color={darkTheme.colors.textMuted} 
                />
              </TouchableOpacity>

              {paymentsExpanded && (
                <View style={styles.submenuContainer}>
                  <TouchableOpacity
                    style={styles.submenuRowItem}
                    activeOpacity={0.7}
                    onPress={() => handleNavigation("/(admin)/(payments)/")}
                  >
                    <Ionicons name="receipt-outline" size={scale(16)} color={darkTheme.colors.textMuted} style={styles.menuIcon} />
                    <Text style={[darkTheme.typography.bodyMain, styles.submenuItemText]}>Payment History</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.submenuRowItem}
                    activeOpacity={0.7}
                    onPress={() => handleNavigation("/(admin)/(payments)/paymentSettings")}
                  >
                    <Ionicons name="settings-outline" size={scale(16)} color={darkTheme.colors.textMuted} style={styles.menuIcon} />
                    <Text style={[darkTheme.typography.bodyMain, styles.submenuItemText]}>Payment Settings</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Footer Log Out Area */}
            <View style={styles.drawerFooter}>
              <TouchableOpacity
                onPress={logoutPressed}
                style={[
                  styles.logoutButton,
                  {
                    borderColor: darkTheme.colors.accent,
                    borderRadius: darkTheme.layout.borderRadiusMedium,
                    height: darkTheme.layout.buttonHeight,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    darkTheme.typography.btnText,
                    { color: darkTheme.colors.accent },
                  ]}
                >
                  Logout
                </Text>
              </TouchableOpacity>

              <Text style={[darkTheme.typography.bodyMuted, styles.versionText]}>
                Admin Panel v1.0
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
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    marginBottom: verticalScale(20),
  },
  headerRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  backButtonTouch: {
    height: scale(36),
    justifyContent: "center",
  },
  headerTitle: {
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    marginTop: verticalScale(1),
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  drawerContainer: {
    width: DRAWER_WIDTH,
    height: "100%",
    paddingTop: verticalScale(60),
    paddingHorizontal: scale(24),
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
  accordionHeader: {
    justifyContent: "space-between",
  },
  accordionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  submenuContainer: {
    paddingLeft: scale(16),
    marginTop: verticalScale(2),
    marginBottom: verticalScale(8),
  },
  submenuRowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(10),
  },
  menuIcon: {
    marginRight: scale(12),
    width: scale(20),
  },
  menuItemText: {
    letterSpacing: -0.1,
  },
  submenuItemText: {
    fontSize: scale(13),
    letterSpacing: -0.1,
  },
  drawerFooter: {
    alignItems: "center",
    width: "100%",
  },
  logoutButton: {
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(12),
  },
  versionText: {
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
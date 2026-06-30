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
import {
  DownIcon, // Wallet icon substitute if needed, or choose standard
  HistoryIcon,
  LeftArrowIcon,
  MenuIcon,
  PaymentHistoryIcon,
  PaymentIcon,
  QueueIcon,
  ReportIcon,
  RightIcon,
  ScissorIcon,
  SettingsIcon,
} from "../../constants/icons";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.65;

// Dynamic Menu Configuration mapping directly to your imported custom icon components
const MENU_ITEMS = [
  {
    key: "services",
    label: "Services",
    IconComponent: ScissorIcon,
    route: "/(admin)/(admintabs)/(services)",
  },
  {
    key: "reports",
    label: "Reports",
    IconComponent: ReportIcon,
    route: "/(admin)/(reports)",
  },
  {
    key: "payments",
    label: "Payments",
    IconComponent: PaymentIcon, // Swap with whatever your custom library maps to wallet
    isAccordion: true,
    children: [
      {
        key: "payment-history",
        label: "Payment History",
        IconComponent: PaymentHistoryIcon,
        route: "/(admin)/(payments)/",
      },
      {
        key: "payment-settings",
        label: "Payment Settings",
        IconComponent: SettingsIcon,
        route: "/(admin)/(payments)/paymentSettings",
      },
    ],
  },
  {
    key: "queue",
    label: "Queue",
    IconComponent: QueueIcon,
    isAccordion: true,
    children: [
      {
        key: "queue-list",
        label: "Queue List",
        IconComponent: QueueIcon,
        route: "/(admin)/(queue)",
      },
      {
        key: "queue-history",
        label: "Queue History",
        IconComponent: HistoryIcon,
        route: "/(admin)/(queue)/queueHistory",
      },
    ],
  },
  {
    key: "appointment",
    label: "Appointment",
    IconComponent: QueueIcon,
    isAccordion: true,
    children: [
      {
        key: "appointment-list",
        label: "Appointment List",
        IconComponent: QueueIcon,
        route: "/(admin)/(appointment)",
      },
      {
        key: "appointment-history",
        label: "Appointment History",
        IconComponent: HistoryIcon,
        route: "/(admin)/(appointment)/appointmentHistory",
      },
    ],
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    IconComponent: ReportIcon,
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

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
        <MenuIcon size={scale(24)} color={darkTheme.colors.textMain} />
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
                <LeftArrowIcon
                  size={scale(22)}
                  color={darkTheme.colors.textMain}
                />
              </TouchableOpacity>
            </View>

            {/* Dynamic Menu Links */}
            <View style={styles.menuItemsList}>
              {MENU_ITEMS.map((item) => {
                const isExpanded = !!expandedSections[item.key];
                const MainIcon = item.IconComponent;

                if (item.isAccordion) {
                  return (
                    <View key={item.key}>
                      <TouchableOpacity
                        style={[styles.menuRowItem, styles.accordionHeader]}
                        activeOpacity={0.7}
                        onPress={() => toggleSection(item.key)}
                      >
                        <View style={styles.accordionLeft}>
                          <MainIcon
                            size={scale(18)}
                            color={darkTheme.colors.textMuted}
                            style={styles.menuIcon}
                          />
                          <Text
                            style={[
                              darkTheme.typography.bodyMain,
                              styles.menuItemText,
                            ]}
                          >
                            {item.label}
                          </Text>
                        </View>
                        {isExpanded ? (
                          <DownIcon
                            size={scale(16)}
                            color={darkTheme.colors.textMuted}
                          />
                        ) : (
                          <RightIcon
                            size={scale(16)}
                            color={darkTheme.colors.textMuted}
                          />
                        )}
                      </TouchableOpacity>

                      {isExpanded && item.children && (
                        <View style={styles.submenuContainer}>
                          {item.children.map((subItem) => {
                            const SubIcon = subItem.IconComponent;
                            return (
                              <TouchableOpacity
                                key={subItem.key}
                                style={styles.submenuRowItem}
                                activeOpacity={0.7}
                                onPress={() => handleNavigation(subItem.route)}
                              >
                                <SubIcon
                                  size={scale(16)}
                                  color={darkTheme.colors.textMuted}
                                  style={styles.menuIcon}
                                />
                                <Text
                                  style={[
                                    darkTheme.typography.bodyMain,
                                    styles.submenuItemText,
                                  ]}
                                >
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
                    <MainIcon
                      size={scale(18)}
                      color={darkTheme.colors.textMuted}
                      style={styles.menuIcon}
                    />
                    <Text
                      style={[
                        darkTheme.typography.bodyMain,
                        styles.menuItemText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
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

              <Text
                style={[darkTheme.typography.bodyMuted, styles.versionText]}
              >
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

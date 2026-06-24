import { Feather, Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { LeftArrowIcon } from "../../constants/icons";
import { useRouter } from "expo-router";
import { darkTheme } from "../../constants/appTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.65;

const Header = ({ title, subTitle, showBack = false }) => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
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
  
  const logoutPressed = async() => {
    await AsyncStorage.getItem("adminEmail");
    router.replace("/(auth)/(adminauth)/signin")
  }

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
          <Text style={[styles.headerTitle, { color: darkTheme.colors.textMain }]}>{title}</Text>
          <Text style={[styles.headerSubtitle, { color: darkTheme.colors.textMuted }]}>{subTitle}</Text>
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
                  styles.drawerHeaderTitle,
                  { color: darkTheme.colors.textMain },
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
              <TouchableOpacity style={styles.menuRowItem} activeOpacity={0.7}>
                <Feather
                  name="scissors"
                  size={scale(18)}
                  color={darkTheme.colors.textMuted}
                  style={styles.menuIcon}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    { color: darkTheme.colors.textMain },
                  ]}
                >
                  Services
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuRowItem} activeOpacity={0.7}>
                <Ionicons
                  name="bar-chart-outline"
                  size={scale(18)}
                  color={darkTheme.colors.textMuted}
                  style={styles.menuIcon}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    { color: darkTheme.colors.textMain },
                  ]}
                >
                  Reports
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuRowItem} activeOpacity={0.7}>
                <Ionicons
                  name="settings-outline"
                  size={scale(18)}
                  color={darkTheme.colors.textMuted}
                  style={styles.menuIcon}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    { color: darkTheme.colors.textMain },
                  ]}
                >
                  Business Settings
                </Text>
              </TouchableOpacity>
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
                    styles.logoutText,
                    { color: darkTheme.colors.accent },
                  ]}
                >
                  Logout
                </Text>
              </TouchableOpacity>

              <Text
                style={[
                  styles.versionText,
                  { color: darkTheme.colors.textMuted },
                ]}
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
    paddingHorizontal: scale(16),
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
    fontSize: scale(20), 
    fontWeight: "700", 
    ...Platform.select({
      ios: { fontFamily: "System" },
      android: { fontFamily: "sans-serif-condensed" }, 
    }),
    letterSpacing: -0.5, 
  },
  headerSubtitle: {
    fontSize: scale(13),
    marginTop: verticalScale(1),
    fontWeight: "400",
    letterSpacing: -0.1,
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
    fontWeight: "500", 
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
  logoutText: {
    fontSize: scale(13),
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  versionText: {
    fontSize: scale(10),
    fontWeight: "400",
    textTransform: "uppercase", 
    letterSpacing: 0.5, 
  },
});
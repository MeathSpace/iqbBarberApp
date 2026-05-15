import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import i18n from "../app/src/localization/i18n";
import ThemeSafeAreaView from "../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../components/ThemeTextPrimary";
import ThemeTextSecondary from "../components/ThemeTextSecondary";
import appTheme from "../constants/appTheme";

const { width } = Dimensions.get("window");

const InitialScreen = () => {
  const colors = appTheme?.colors;

  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(false);
  const baseContent = i18n.t("index");

  useEffect(() => {
    const checkAuth = async () => {
      const savedAdminEmail = await AsyncStorage.getItem("adminEmail");
      const savedBarberEmail = await AsyncStorage.getItem("barberEmail");

      if (savedAdminEmail) {
        router.replace("/(admin)/(admintabs)/(home)");
      } else if (savedBarberEmail) {
        // router.replace("/(barber)/(barbertabs)/(home)");
      } else {
        setShowWelcome(true);
      }
    };
    checkAuth();
  }, []);

  if (!showWelcome) return null;

  return (
    <ThemeSafeAreaView style={styles.container}>
      {/* Upper Section: Branding */}
      <View style={styles.topSection}>
        <View style={[styles.imageWrapper, { borderColor: colors.borderColor.color1 }]}>
          <Image
            style={styles.image}
            source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
            contentFit="cover"
          />
        </View>

        <View style={styles.textContainer}>
          <ThemeTextPrimary style={styles.headline}>
            {baseContent.header}
          </ThemeTextPrimary>
          <ThemeTextSecondary style={styles.subHeadline}>
            {baseContent.subHeader}
          </ThemeTextSecondary>
        </View>
      </View>

      {/* Lower Section: Actions */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(adminauth)/signin")}
          style={styles.buttonContainer}
        >
          <LinearGradient
            colors={[
              colors.button.typeOne.linearOne,
              colors.button.typeOne.linearTwo,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primaryBtn}
          >
            <ThemeTextPrimary
              style={[styles.btnText, { color: colors.textColor.color4 }]}
            >
              {baseContent.admin}
            </ThemeTextPrimary>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(barberauth)/signin")}
          style={[styles.secondaryBtn, { borderColor: colors.borderColor.color1 }]}
        >
          <ThemeTextPrimary style={[styles.btnText, { color: colors.textColor.color3 }]}>
            {baseContent.barber}
          </ThemeTextPrimary>
        </TouchableOpacity>

        <ThemeTextSecondary style={styles.footerText}>
          Select your portal to continue
        </ThemeTextSecondary>
      </View>
    </ThemeSafeAreaView>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(24),
  },
  topSection: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: scale(110),
    height: scale(110),
    borderRadius: scale(55),
    borderWidth: 1,
    padding: scale(8),
    marginBottom: verticalScale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: scale(50),
  },
  textContainer: {
    alignItems: "center",
  },
  headline: {
    fontSize: scale(26),
    fontFamily: "AirbnbCereal_W_Bd",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subHeadline: {
    textAlign: "center",
    fontSize: scale(15),
    marginTop: verticalScale(10),
    lineHeight: scale(22),
    paddingHorizontal: scale(10),
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: verticalScale(40),
  },
  buttonContainer: {
    width: "100%",
    marginBottom: verticalScale(15),
  },
  primaryBtn: {
    paddingVertical: verticalScale(16),
    borderRadius: scale(14),
    alignItems: "center",
    elevation: 4, // Subtle Android shadow
    shadowColor: "#000", // Subtle iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  secondaryBtn: {
    paddingVertical: verticalScale(16),
    borderRadius: scale(14),
    alignItems: "center",
    borderWidth: 1.5,
    backgroundColor: "transparent",
  },
  btnText: {
    fontSize: scale(16),
    fontFamily: "AirbnbCereal_W_Bd",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  footerText: {
    textAlign: "center",
    fontSize: scale(12),
    marginTop: verticalScale(20),
    opacity: 0.6,
  },
});


import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import i18n from "../app/src/localization/i18n";
import { darkTheme } from "../constants/appTheme";

const { width } = Dimensions.get("window");

const InitialScreen = () => {
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
        router.replace("/(barber)/(barbertabs)/(home)");
      } else {
        setShowWelcome(true);
      }
    };
    checkAuth();
  }, []);

  if (!showWelcome) return null;

  return (
    <SafeAreaView 
      edges={["top", "bottom", "left", "right"]} 
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      {/* Upper Section: Branding */}
      <View style={styles.topSection}>
        <View style={[styles.imageWrapper, { borderColor: darkTheme.colors.border }]}>
          <Image
            style={styles.image}
            source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
            contentFit="cover"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={[darkTheme.typography.headerTitle, styles.headline]}>
            {baseContent.header} Dev
          </Text>
          <Text style={[darkTheme.typography.bodyMuted, styles.subHeadline]}>
            {baseContent.subHeader}
          </Text>
        </View>
      </View>

      {/* Lower Section: Actions */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(adminauth)/signin")}
          style={[styles.buttonContainer, { height: darkTheme.layout.buttonHeight }]}
        >
          <LinearGradient
            colors={["#FF9500", "#FF5E00"]} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.primaryBtn, { borderRadius: darkTheme.layout.borderRadiusLarge }]}
          >
            <Text style={[darkTheme.typography.btnText, styles.primaryBtnText]}>
              {baseContent.admin}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(barberauth)/signin")}
          style={[
            styles.secondaryBtn, 
            { 
              borderColor: darkTheme.colors.border, 
              borderRadius: darkTheme.layout.borderRadiusLarge,
              height: darkTheme.layout.buttonHeight 
            }
          ]}
        >
          <Text style={[darkTheme.typography.btnText, { color: darkTheme.colors.textMain }]}>
            {baseContent.barber}
          </Text>
        </TouchableOpacity>

        <Text style={[darkTheme.typography.bodyMuted, styles.footerText]}>
          Select your portal to continue
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
  },
  secondaryBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    backgroundColor: "transparent",
  },
  footerText: {
    textAlign: "center",
    fontSize: scale(12),
    marginTop: verticalScale(20),
  },
});
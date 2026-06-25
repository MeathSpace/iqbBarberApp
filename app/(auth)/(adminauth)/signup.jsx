import React, { useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";

import { EyeIcon, EyeOffIcon, LeftArrowIcon } from "../../../constants/icons";
import i18n from "../../src/localization/i18n";
import { darkTheme } from "../../../constants/appTheme";

const SignUp = () => {
  const baseContent = i18n.t("auth.adminauth.signup");
  const router = useRouter();

  const [email, setEmail] = useState("demo@email.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    router.push("/accountDetails");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: darkTheme.colors.background }]}>
        
        {/* Back navigation header anchor */}
        <View style={styles.backRow}>
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={[
              styles.homeIcon,
              {
                backgroundColor: darkTheme.colors.card,
                borderRadius: darkTheme.layout.borderRadiusMedium,
              },
            ]}
          >
            <LeftArrowIcon size={20} color={darkTheme.colors.textMain} />
          </TouchableOpacity>
          <Text style={[darkTheme.typography.bodyMuted]}>Back to home</Text>
        </View>

        <View style={styles.wrapper}>
          <View style={{ gap: verticalScale(10) }}>
            <Text style={[darkTheme.typography.headerTitle, styles.title]}>
              {baseContent.header}
            </Text>
            <Text style={[darkTheme.typography.headerSubtitle, styles.subtitle]}>
              {baseContent.subHeader}
            </Text>
          </View>

          {/* Email Input Group */}
          <View style={styles.inputGroup}>
            <Text style={[darkTheme.typography.inputLabel]}>
              {baseContent.emailInput.header}
            </Text>
            <TextInput
              placeholder={baseContent.emailInput.placeholder}
              value={email}
              onChangeText={setEmail}
              style={[
                styles.textInput,
                darkTheme.typography.bodyMain,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                  height: darkTheme.layout.componentHeight,
                },
              ]}
              placeholderTextColor={darkTheme.colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input Group */}
          <View style={styles.inputGroup}>
            <Text style={[darkTheme.typography.inputLabel]}>
              {baseContent.passwordInput.header}
            </Text>

            <View
              style={[
                styles.passwordContainer,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                  height: darkTheme.layout.componentHeight,
                },
              ]}
            >
              <TextInput
                placeholder={baseContent.passwordInput.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={[styles.passwordInput, darkTheme.typography.bodyMain]}
                placeholderTextColor={darkTheme.colors.textMuted}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIconWrapper}
              >
                {showPassword ? (
                  <EyeOffIcon size={20} color={darkTheme.colors.textMuted} />
                ) : (
                  <EyeIcon size={20} color={darkTheme.colors.textMuted} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Trigger Submit Button */}
          <TouchableOpacity onPress={handleSignUp} activeOpacity={0.8}>
            <LinearGradient
              colors={[
                darkTheme.colors.accent, 
                darkTheme.colors.accent
              ]}
              style={[
                styles.signInBtn,
                {
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                  height: darkTheme.layout.buttonHeight,
                },
              ]}
            >
              <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
                {baseContent.signUp}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Visual Break/Divider */}
          <View style={styles.divider}>
            <View style={[styles.line, { backgroundColor: darkTheme.colors.border }]} />
            <Text style={[darkTheme.typography.bodyMuted, styles.orText]}>
              {baseContent.or}
            </Text>
            <View style={[styles.line, { backgroundColor: darkTheme.colors.border }]} />
          </View>

          {/* Alternate Provider Signup */}
          <TouchableOpacity
            style={[
              styles.googleBtn,
              {
                backgroundColor: darkTheme.colors.card,
                borderRadius: darkTheme.layout.borderRadiusMedium,
                height: darkTheme.layout.buttonHeight,
                borderWidth: 1,
                borderColor: darkTheme.colors.border,
              },
            ]}
            activeOpacity={0.8}
          >
            <Text style={[darkTheme.typography.bodyMain, styles.googleText]}>
              Google Sign Up
            </Text>
          </TouchableOpacity>

          {/* Account Reversal Form Redirection Link */}
          <TouchableOpacity onPress={() => router.push("/signin")} activeOpacity={0.7}>
            <Text style={[darkTheme.typography.bodyMuted, styles.signupText]}>
              {baseContent.alreadyHaveAccount}
              <Text style={{ color: darkTheme.colors.accent, fontWeight: "600" }}>
                {" "}
                {baseContent.signIn}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "90%",
    gap: verticalScale(18),
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: scale(14),
    marginTop: verticalScale(8),
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    width: "100%",
    marginTop: verticalScale(8),
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: scale(14),
  },
  eyeIconWrapper: {
    paddingHorizontal: scale(14),
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(4),
  },
  signInBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: verticalScale(10),
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: scale(10),
  },
  googleBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  googleText: {
    textAlign: "center",
  },
  signupText: {
    textAlign: "center",
    marginTop: verticalScale(10),
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    position: "absolute",
    top: Platform.OS === "ios" ? verticalScale(50) : verticalScale(30),
    left: scale(15),
    zIndex: 10,
  },
  homeIcon: {
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
});
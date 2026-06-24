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
import { darkTheme } from "../../../constants/appTheme";

const ResetPassword = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    // handle validation + API
    router.push("/signin");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: darkTheme.colors.background }]}>
        
        {/* Back navigation header anchor */}
        <View style={styles.backRow}>
          <TouchableOpacity
            onPress={() => router.back()}
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
          <Text style={[darkTheme.typography.bodyMuted]}>Back</Text>
        </View>

        <View style={styles.wrapper}>
          {/* Header */}
          <View style={{ gap: verticalScale(10) }}>
            <Text style={[darkTheme.typography.headerTitle, styles.title]}>
              Reset Password Admin
            </Text> 
            <Text style={[darkTheme.typography.headerSubtitle, styles.subtitle]}>
              Enter your new password and confirm it below
            </Text>
          </View>

          {/* New Password */}
          <View style={styles.inputGroup}>
            <Text style={[darkTheme.typography.inputLabel]}>
              New Password
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
                placeholder="Enter new password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={[styles.passwordInput, darkTheme.typography.bodyMain]}
                placeholderTextColor={darkTheme.colors.textMuted}
                autoCapitalize="none"
                selectionColor={darkTheme.colors.accent}
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

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={[darkTheme.typography.inputLabel]}>
              Confirm Password
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
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={[styles.passwordInput, darkTheme.typography.bodyMain]}
                placeholderTextColor={darkTheme.colors.textMuted}
                autoCapitalize="none"
                selectionColor={darkTheme.colors.accent}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIconWrapper}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon size={20} color={darkTheme.colors.textMuted} />
                ) : (
                  <EyeIcon size={20} color={darkTheme.colors.textMuted} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Reset Button */}
          <TouchableOpacity onPress={handleResetPassword} activeOpacity={0.8}>
            <LinearGradient
              colors={[
                darkTheme.colors.accent,
                darkTheme.colors.accent
              ]}
              style={[
                styles.button,
                {
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                  height: darkTheme.layout.buttonHeight,
                },
              ]}
            >
              <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
                Reset Password
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "90%",
    gap: verticalScale(22),
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
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
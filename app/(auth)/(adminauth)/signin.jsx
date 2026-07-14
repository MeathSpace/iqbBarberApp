import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Toast } from "toastify-react-native";

import { darkTheme } from "../../../constants/appTheme";
import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  LeftArrowIcon,
} from "../../../constants/icons";
import api from "../../../utils/api";
import { isValidEmail } from "../../../utils/emailValidation";
import i18n from "../../src/localization/i18n";

const SignIn = () => {
  const baseContent = i18n.t("auth.adminauth.signin");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signinLoader, setSigninLoader] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetch_admin_remember_me_email = async () => {
      const admin_remember_me_email = await SecureStore.getItemAsync(
        "admin_remember_me_email",
      );

      if (admin_remember_me_email) {
        setEmail(admin_remember_me_email);
        setRememberMe(true);
      }
    };

    fetch_admin_remember_me_email();
  }, []);

  const handleSignIn = async () => {
    let hasError = false;

    if (!email) {
      setEmailError(baseContent.errorStatesAndApi.emailRequired);
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError(baseContent.errorStatesAndApi.InvalidEmailFormat);
      hasError = true;
    }

    if (!password) {
      setPasswordError(baseContent.errorStatesAndApi.passwordRequired);
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError(baseContent.errorStatesAndApi.passwordMostCharecters);
      hasError = true;
    }

    if (hasError) return;

    try {
      setSigninLoader(true);

      const payload = { email, password };

      const { data } = await api.post("/admin/login", payload);

      await SecureStore.setItemAsync("adminRefreshToken", data.accessToken);
      await SecureStore.setItemAsync("adminEmail", data?.foundAdmin?.email);

      if (rememberMe) {
        await SecureStore.setItemAsync("admin_remember_me_email", email);
      } else {
        await SecureStore.setItemAsync("admin_remember_me_email", "");
      }
      router.push("/(admin)/(admintabs)/(home)");
    } catch (error) {
      Toast.error(error?.response?.data?.message);
    } finally {
      setSigninLoader(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: darkTheme.colors.background },
        ]}
      >
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
            <Text
              style={[darkTheme.typography.headerSubtitle, styles.subtitle]}
            >
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
              onChangeText={(t) => {
                setEmail(t);
                setEmailError("");
              }}
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
            {emailError && (
              <Text
                style={[
                  darkTheme.typography.bodyMuted,
                  styles.error,
                  { color: darkTheme.status.error.text },
                ]}
              >
                {emailError}
              </Text>
            )}
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
                onChangeText={(t) => {
                  setPassword(t);
                  setPasswordError("");
                }}
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

            {passwordError && (
              <Text
                style={[
                  darkTheme.typography.bodyMuted,
                  styles.error,
                  { color: darkTheme.status.error.text },
                ]}
              >
                {passwordError}
              </Text>
            )}
          </View>

          {/* Options Line (Remember Me & Forgot Password) */}
          <View style={styles.rememberRow}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: scale(10),
              }}
            >
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={[
                  styles.checkbox,
                  {
                    borderColor: darkTheme.colors.border,
                    backgroundColor: darkTheme.colors.card,
                  },
                ]}
                activeOpacity={0.8}
              >
                {rememberMe && (
                  <CheckIcon size={14} color={darkTheme.colors.accent} />
                )}
              </TouchableOpacity>
              <Text style={[darkTheme.typography.bodyMain]}>
                {baseContent.rememberMe}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                router.push("/forgotPassword");
              }}
              activeOpacity={0.7}
            >
              <Text style={[darkTheme.typography.bodyMuted]}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Trigger Submit Button */}
          <TouchableOpacity onPress={handleSignIn} activeOpacity={0.8}>
            <LinearGradient
              colors={[darkTheme.colors.accent, darkTheme.colors.accent]}
              style={[
                styles.signInBtn,
                {
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                  height: darkTheme.layout.buttonHeight,
                },
              ]}
            >
              {signinLoader ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <Text
                  style={[darkTheme.typography.btnText, { color: "#000000" }]}
                >
                  {baseContent.signIn}
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Visual Break/Divider */}
          <View style={styles.divider}>
            <View
              style={[
                styles.line,
                { backgroundColor: darkTheme.colors.border },
              ]}
            />
            <Text style={[darkTheme.typography.bodyMuted, styles.orText]}>
              {baseContent.or}
            </Text>
            <View
              style={[
                styles.line,
                { backgroundColor: darkTheme.colors.border },
              ]}
            />
          </View>

          {/* Alternate Provider Login */}
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
              Google Sign In
            </Text>
          </TouchableOpacity>

          {/* Account Creation Redirect Link */}
          <TouchableOpacity
            onPress={() => router.push("/signup")}
            activeOpacity={0.7}
          >
            <Text style={[darkTheme.typography.bodyMuted, styles.signupText]}>
              {baseContent.dontHaveAccount}
              <Text
                style={{ color: darkTheme.colors.accent, fontWeight: "600" }}
              >
                {" "}
                {baseContent.signUp}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

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
  error: {
    marginTop: verticalScale(4),
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(4),
  },
  checkbox: {
    width: scale(22),
    height: scale(22),
    borderWidth: 1,
    borderRadius: scale(6),
    justifyContent: "center",
    alignItems: "center",
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

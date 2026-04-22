import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Toast } from "toastify-react-native";
import ThemeSafeAreaView from "../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../components/ThemeTextPrimary";
import ThemeTextSecondary from "../../../components/ThemeTextSecondary";
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
  const baseContent = i18n.t("auth.barberauth.signin");

  useEffect(() => {
    const fetch_barber_remember_me_email = async () => {
      const admin_remember_me_email = await AsyncStorage.getItem(
        "barber_remember_me_email",
      );

      if (admin_remember_me_email) {
        setEmail(admin_remember_me_email);
        setRememberMe(true);
      }
    };

    fetch_barber_remember_me_email();
  }, []);

  const router = useRouter();

  const [email, setEmail] = useState("john@yopmail.com");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const [signinLoader, setSigninLoader] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

      const payload = {
        email,
        password,
      };

      const { data } = await api.post("/web-app/barber/login", payload);
      await AsyncStorage.setItem("barberEmail", data?.foundUser?.email);
      await AsyncStorage.setItem(
        "barberSalonId",
        JSON.stringify(data?.foundUser?.salonId),
      );
      if (rememberMe) {
        await AsyncStorage.setItem("barber_remember_me_email", email);
      } else {
        await AsyncStorage.setItem("barber_remember_me_email", "");
      }
      router.push("/(barber)/(barbertabs)/(home)");
    } catch (error) {
      Toast.error(error?.response?.data?.message);
    } finally {
      setSigninLoader(false);
    }
  };

  const { colors } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemeSafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <View style={{ gap: verticalScale(10) }}>
            <ThemeTextPrimary style={styles.title}>
              {baseContent.header}
            </ThemeTextPrimary>
            <ThemeTextSecondary style={styles.subtitle}>
              {baseContent.subHeader}
            </ThemeTextSecondary>
          </View>

          <View style={styles.inputGroup}>
            <ThemeTextPrimary
              style={[
                styles.label,
                {
                  color: colors.textColor.color3,
                },
              ]}
            >
              {baseContent.emailInput.header}
            </ThemeTextPrimary>
            <TextInput
              placeholder={baseContent.emailInput.placeholder}
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                setEmailError("");
              }}
              style={[
                styles.input,
                {
                  borderColor: colors.borderColor.color1,
                  backgroundColor: colors.background.color3,
                },
              ]}
              placeholderTextColor={colors.textColor.color5}
            />
            {emailError && (
              <ThemeTextSecondary
                style={[
                  styles.error,
                  {
                    color: colors.textColor.color7,
                  },
                ]}
              >
                {emailError}
              </ThemeTextSecondary>
            )}
          </View>

          <View style={styles.inputGroup}>
            <ThemeTextPrimary
              style={[
                styles.label,
                {
                  color: colors.textColor.color3,
                },
              ]}
            >
              {baseContent.passwordInput.header}
            </ThemeTextPrimary>

            <View
              style={[
                styles.passwordContainer,
                {
                  borderColor: colors.borderColor.color1,
                  backgroundColor: colors.background.color3,
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
                style={styles.passwordInput}
                placeholderTextColor={colors.textColor.color5}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOffIcon size={20} color={colors.textColor.color6} />
                ) : (
                  <EyeIcon size={20} color={colors.textColor.color6} />
                )}
              </TouchableOpacity>
            </View>

            {passwordError && (
              <ThemeTextSecondary
                style={[
                  styles.error,
                  {
                    color: colors.textColor.color7,
                  },
                ]}
              >
                {passwordError}
              </ThemeTextSecondary>
            )}
          </View>

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
                    borderColor: colors.borderColor.color1,
                    backgroundColor: colors.background.color4,
                  },
                ]}
              >
                {rememberMe && <CheckIcon size={14} />}
              </TouchableOpacity>
              <ThemeTextSecondary
                style={[
                  styles.rememberText,
                  {
                    color: colors.textColor.color3,
                  },
                ]}
              >
                {baseContent.rememberMe}
              </ThemeTextSecondary>
            </View>
            <TouchableOpacity
              onPress={() => {
                router.push("/forgotPassword");
              }}
            >
              <ThemeTextSecondary>Forgot Password ?</ThemeTextSecondary>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSignIn}>
            <LinearGradient
              colors={[
                colors.button.typeOne.linearOne,
                colors.button.typeOne.linearTwo,
              ]}
              style={styles.signInBtn}
            >
              {signinLoader ? (
                <ActivityIndicator color={colors.textColor.color4} />
              ) : (
                <ThemeTextPrimary
                  style={[
                    styles.signInText,
                    {
                      color: colors.textColor.color4,
                    },
                  ]}
                >
                  {baseContent.signIn}
                </ThemeTextPrimary>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View
              style={[
                styles.line,
                {
                  backgroundColor: colors.background.color5,
                },
              ]}
            />
            <ThemeTextSecondary style={styles.orText}>
              {baseContent.or}
            </ThemeTextSecondary>
            <View
              style={[
                styles.line,
                {
                  backgroundColor: colors.background.color5,
                },
              ]}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.googleBtn,
              {
                backgroundColor: colors.background.color2,
              },
            ]}
          >
            <ThemeTextPrimary style={styles.googleText}>
              Google Sign In
            </ThemeTextPrimary>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/signup")}>
            <ThemeTextSecondary style={styles.signupText}>
              {baseContent.dontHaveAccount}
              <ThemeTextPrimary style={{ color: colors.textColor.color3 }}>
                {" "}
                {baseContent.signUp}
              </ThemeTextPrimary>
            </ThemeTextSecondary>
          </TouchableOpacity>
        </View>

        <View style={styles.backRow}>
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={[
              styles.homeIcon,
              {
                backgroundColor: colors.background.color2,
              },
            ]}
          >
            <LeftArrowIcon size={20} color={colors.textColor.color3} />
          </TouchableOpacity>
          <ThemeTextSecondary>Back to home</ThemeTextSecondary>
        </View>
      </ThemeSafeAreaView>
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
    fontSize: scale(20),
    lineHeight: verticalScale(28),
    fontFamily: "AirbnbCereal_W_Bd",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
  },

  inputGroup: {
    gap: verticalScale(8),
  },

  input: {
    borderWidth: 1,
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    fontSize: scale(14)
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: scale(10),
    paddingRight: scale(10),
  },

  passwordInput: {
    flex: 1,
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  checkbox: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(6),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  signInBtn: {
    paddingVertical: verticalScale(14),
    borderRadius: scale(12),
    alignItems: "center",
    marginTop: verticalScale(10),
  },

  signInText: {
    fontSize: scale(16),
    fontFamily: "AirbnbCereal_W_Bd",
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
    paddingVertical: verticalScale(14),
    borderRadius: scale(12),
  },

  googleText: {
    textAlign: "center",
    color: "#333",
  },

  signupText: {
    textAlign: "center",
    fontSize: scale(15),
    marginTop: verticalScale(10),
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    position: "absolute",
    top: verticalScale(45),
    left: scale(15),
  },

  homeIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
  },
});

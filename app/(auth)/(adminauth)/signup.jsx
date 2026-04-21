import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import ThemeSafeAreaView from "../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../components/ThemeTextPrimary";
import ThemeTextSecondary from "../../../components/ThemeTextSecondary";
import { EyeIcon, EyeOffIcon, LeftArrowIcon } from "../../../constants/icons";
import i18n from "../../src/localization/i18n";

const SignUp = () => {
  const baseContent = i18n.t("auth.adminauth.signup");

  const router = useRouter();

  const [email, setEmail] = useState("demo@email.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    router.push("/signupotp");
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
            <ThemeTextSecondary
              style={[styles.subtitle, { color: colors.textColor.color2 }]}
            >
              {baseContent.subHeader}
            </ThemeTextSecondary>
          </View>

          <View style={styles.inputGroup}>
            <ThemeTextPrimary
              style={[styles.label, { color: colors.textColor.color3 }]}
            >
              {baseContent.emailInput.header}
            </ThemeTextPrimary>
            <TextInput
              placeholder={baseContent.emailInput.placeholder}
              value={email}
              onChangeText={setEmail}
              style={[
                styles.input,
                {
                  borderColor: colors.borderColor.color1,
                  backgroundColor: colors.background.color3,
                  color: colors.textColor.color1,
                },
              ]}
              placeholderTextColor={colors.textColor.color5}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemeTextPrimary
              style={[styles.label, { color: colors.textColor.color3 }]}
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
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={[
                  styles.passwordInput,
                  { color: colors.textColor.color1 },
                ]}
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
          </View>

          <TouchableOpacity onPress={handleSignUp}>
            <LinearGradient
              colors={[
                colors.button.typeOne.linearOne,
                colors.button.typeOne.linearTwo,
              ]}
              style={styles.signInBtn}
            >
              <ThemeTextPrimary
                style={[styles.signInText, { color: colors.textColor.color4 }]}
              >
                {baseContent.signUp}
              </ThemeTextPrimary>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View
              style={[
                styles.line,
                { backgroundColor: colors.background.color5 },
              ]}
            />
            <ThemeTextSecondary style={styles.orText}>
              {baseContent.or}
            </ThemeTextSecondary>
            <View
              style={[
                styles.line,
                { backgroundColor: colors.background.color5 },
              ]}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.googleBtn,
              { backgroundColor: colors.background.color2 },
            ]}
          >
            <ThemeTextPrimary style={styles.googleText}>
              Google Sign Up
            </ThemeTextPrimary>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/signin")}>
            <ThemeTextSecondary style={styles.signupText}>
              {baseContent.alreadyHaveAccount}
              <ThemeTextPrimary style={{ color: colors.textColor.color3 }}>
                {" "}
                {baseContent.signIn}
              </ThemeTextPrimary>
            </ThemeTextSecondary>
          </TouchableOpacity>
        </View>

        <View style={styles.backRow}>
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={[
              styles.homeIcon,
              { backgroundColor: colors.background.color2 },
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

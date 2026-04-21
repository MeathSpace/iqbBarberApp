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

const ResetPassword = () => {
  const router = useRouter();
  const { colors } = useTheme();

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
      <ThemeSafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          {/* Header */}
          <View style={{ gap: verticalScale(10) }}>
            <ThemeTextPrimary style={styles.title}>
              Reset Password Admin
            </ThemeTextPrimary> 
            <ThemeTextSecondary
              style={[styles.subtitle, { color: colors.textColor.color2 }]}
            >
              Enter your new password and confirm it below
            </ThemeTextSecondary>
          </View>

          {/* New Password */}
          <View style={styles.inputGroup}>
            <ThemeTextPrimary
              style={[styles.label, { color: colors.textColor.color3 }]}
            >
              New Password
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
                placeholder="Enter new password"
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

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <ThemeTextPrimary
              style={[styles.label, { color: colors.textColor.color3 }]}
            >
              Confirm Password
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
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={[
                  styles.passwordInput,
                  { color: colors.textColor.color1 },
                ]}
                placeholderTextColor={colors.textColor.color5}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon size={20} color={colors.textColor.color6} />
                ) : (
                  <EyeIcon size={20} color={colors.textColor.color6} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Reset Button */}
          <TouchableOpacity onPress={handleResetPassword}>
            <LinearGradient
              colors={[
                colors.button.typeOne.linearOne,
                colors.button.typeOne.linearTwo,
              ]}
              style={styles.button}
            >
              <ThemeTextPrimary
                style={[styles.buttonText, { color: colors.textColor.color4 }]}
              >
                Reset Password
              </ThemeTextPrimary>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Back */}
        <View style={styles.backRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[
              styles.homeIcon,
              { backgroundColor: colors.background.color2 },
            ]}
          >
            <LeftArrowIcon size={20} color={colors.textColor.color3} />
          </TouchableOpacity>
          <ThemeTextSecondary>Back</ThemeTextSecondary>
        </View>
      </ThemeSafeAreaView>
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
    fontSize: scale(22),
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

  label: {},

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
    fontFamily: "AirbnbCereal_W_Md",
  },

  button: {
    paddingVertical: verticalScale(14),
    borderRadius: scale(12),
    alignItems: "center",
    marginTop: verticalScale(10),
  },

  buttonText: {
    fontSize: scale(16),
    fontFamily: "AirbnbCereal_W_Bd",
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

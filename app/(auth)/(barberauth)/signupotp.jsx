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
import { LeftArrowIcon } from "../../../constants/icons";
import i18n from "../../src/localization/i18n";

const SignupOtp = () => {
  const baseContent = i18n.t("auth.barberauth.signupotp");
  const [otp, setOtp] = useState("");

  const router = useRouter();
  const { colors } = useTheme();

  const handleSignOtp = () => {
    router.push("/accountDetails");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemeSafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          {/* Header */}
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

          {/* OTP Input */}
          <View style={styles.inputGroup}>
            <ThemeTextPrimary
              style={[styles.label, { color: colors.textColor.color3 }]}
            >
              {baseContent.verificationInput.header}
            </ThemeTextPrimary>

            <TextInput
              placeholder={baseContent.verificationInput.placeholder}
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
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

          {/* Verify Button */}
          <TouchableOpacity onPress={handleSignOtp}>
            <LinearGradient
              colors={[
                colors.button.typeOne.linearOne,
                colors.button.typeOne.linearTwo,
              ]}
              style={styles.verifyBtn}
            >
              <ThemeTextPrimary
                style={[styles.verifyText, { color: colors.textColor.color4 }]}
              >
                {baseContent.verify}
              </ThemeTextPrimary>
            </LinearGradient>
          </TouchableOpacity>

          {/* Resend */}
          <TouchableOpacity>
            <ThemeTextSecondary style={styles.resendText}>
              {baseContent.didntReceive || "Didn't receive the code?"}
              <ThemeTextPrimary style={{ color: colors.textColor.color3 }}>
                {" "}
                {baseContent.resend || "Resend"}
              </ThemeTextPrimary>
            </ThemeTextSecondary>
          </TouchableOpacity>
        </View>

        {/* Back */}
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

export default SignupOtp;

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

  input: {
    borderWidth: 1,
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    fontFamily: "AirbnbCereal_W_Md",
    fontSize: scale(14)
  },

  verifyBtn: {
    paddingVertical: verticalScale(14),
    borderRadius: scale(12),
    alignItems: "center",
    marginTop: verticalScale(10),
  },

  verifyText: {
    fontSize: scale(16),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  resendText: {
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

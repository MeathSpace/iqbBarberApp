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

import { LeftArrowIcon } from "../../../constants/icons";
import i18n from "../../src/localization/i18n";
import { darkTheme } from "../../../constants/appTheme";

const SignupOtp = () => {
  const baseContent = i18n.t("auth.barberauth.signupotp");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleSignOtp = () => {
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
          {/* Header */}
          <View style={{ gap: verticalScale(10) }}>
            <Text style={[darkTheme.typography.headerTitle, styles.title]}>
              {baseContent.header}
            </Text>
            <Text style={[darkTheme.typography.headerSubtitle, styles.subtitle]}>
              {baseContent.subHeader}
            </Text>
          </View>

          {/* OTP Input */}
          <View style={styles.inputGroup}>
            <Text style={[darkTheme.typography.inputLabel]}>
              {baseContent.verificationInput.header}
            </Text>

            <TextInput
              placeholder={baseContent.verificationInput.placeholder}
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
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
              selectionColor={darkTheme.colors.accent}
            />
          </View>

          {/* Verify Button */}
          <TouchableOpacity onPress={handleSignOtp} activeOpacity={0.8}>
            <LinearGradient
              colors={[
                darkTheme.colors.accent,
                darkTheme.colors.accent
              ]}
              style={[
                styles.verifyBtn,
                {
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                  height: darkTheme.layout.buttonHeight,
                },
              ]}
            >
              <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
                {baseContent.verify}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Resend */}
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={[darkTheme.typography.bodyMuted, styles.resendText]}>
              {baseContent.didntReceive || "Didn't receive the code?"}
              <Text style={{ color: darkTheme.colors.accent, fontWeight: "600" }}>
                {" "}
                {baseContent.resend || "Resend"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  verifyBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  resendText: {
    textAlign: "center",
    marginTop: verticalScale(10),
    fontSize: scale(13),
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
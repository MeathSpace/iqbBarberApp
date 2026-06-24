// import { useTheme } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import {
//   Keyboard,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import { scale, verticalScale } from "react-native-size-matters";
// import ThemeSafeAreaView from "../../../components/ThemeSafeAreaView";
// import ThemeTextPrimary from "../../../components/ThemeTextPrimary";
// import ThemeTextSecondary from "../../../components/ThemeTextSecondary";
// import { EyeIcon, EyeOffIcon, LeftArrowIcon } from "../../../constants/icons";
// import i18n from "../../src/localization/i18n";
// import appTheme from "../../../constants/appTheme"

// const SignUp = () => {
//   const baseContent = i18n.t("auth.adminauth.signup");

//   const router = useRouter();

//   const [email, setEmail] = useState("demo@email.com");
//   const [password, setPassword] = useState("123456");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSignUp = () => {
//     console.log("Email:", email);
//     console.log("Password:", password);
//     // router.push("/signupotp");
//     router.push("/accountDetails")
//   };

//   const colors = appTheme?.colors;

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <ThemeSafeAreaView style={styles.container}>
//         <View style={styles.wrapper}>

//           <View style={{ gap: verticalScale(10) }}>
//             <ThemeTextPrimary style={styles.title}>
//               {baseContent.header}
//             </ThemeTextPrimary>
//             <ThemeTextSecondary
//               style={[styles.subtitle, { color: colors.textColor.color2 }]}
//             >
//               {baseContent.subHeader}
//             </ThemeTextSecondary>
//           </View>

//           <View style={styles.inputGroup}>
//             <ThemeTextPrimary
//               style={[styles.label, { color: colors.textColor.color3 }]}
//             >
//               {baseContent.emailInput.header}
//             </ThemeTextPrimary>
//             <TextInput
//               placeholder={baseContent.emailInput.placeholder}
//               value={email}
//               onChangeText={setEmail}
//               style={[
//                 styles.input,
//                 {
//                   borderColor: colors.borderColor.color1,
//                   backgroundColor: colors.background.color3,
//                   color: colors.textColor.color1,
//                 },
//               ]}
//               placeholderTextColor={colors.textColor.color5}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <ThemeTextPrimary
//               style={[styles.label, { color: colors.textColor.color3 }]}
//             >
//               {baseContent.passwordInput.header}
//             </ThemeTextPrimary>

//             <View
//               style={[
//                 styles.passwordContainer,
//                 {
//                   borderColor: colors.borderColor.color1,
//                   backgroundColor: colors.background.color3,
//                 },
//               ]}
//             >
//               <TextInput
//                 placeholder={baseContent.passwordInput.placeholder}
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//                 style={[
//                   styles.passwordInput,
//                   { color: colors.textColor.color1 },
//                 ]}
//                 placeholderTextColor={colors.textColor.color5}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 {showPassword ? (
//                   <EyeOffIcon size={20} color={colors.textColor.color6} />
//                 ) : (
//                   <EyeIcon size={20} color={colors.textColor.color6} />
//                 )}
//               </TouchableOpacity>
//             </View>
//           </View>

//           <TouchableOpacity onPress={handleSignUp}>
//             <LinearGradient
//               colors={[
//                 colors.button.typeOne.linearOne,
//                 colors.button.typeOne.linearTwo,
//               ]}
//               style={styles.signInBtn}
//             >
//               <ThemeTextPrimary
//                 style={[styles.signInText, { color: colors.textColor.color4 }]}
//               >
//                 {baseContent.signUp}
//               </ThemeTextPrimary>
//             </LinearGradient>
//           </TouchableOpacity>

//           <View style={styles.divider}>
//             <View
//               style={[
//                 styles.line,
//                 { backgroundColor: colors.background.color5 },
//               ]}
//             />
//             <ThemeTextSecondary style={styles.orText}>
//               {baseContent.or}
//             </ThemeTextSecondary>
//             <View
//               style={[
//                 styles.line,
//                 { backgroundColor: colors.background.color5 },
//               ]}
//             />
//           </View>

//           <TouchableOpacity
//             style={[
//               styles.googleBtn,
//               { backgroundColor: colors.background.color2 },
//             ]}
//           >
//             <ThemeTextPrimary style={styles.googleText}>
//               Google Sign Up
//             </ThemeTextPrimary>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => router.push("/signin")}>
//             <ThemeTextSecondary style={styles.signupText}>
//               {baseContent.alreadyHaveAccount}
//               <ThemeTextPrimary style={{ color: colors.textColor.color3 }}>
//                 {" "}
//                 {baseContent.signIn}
//               </ThemeTextPrimary>
//             </ThemeTextSecondary>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.backRow}>
//           <TouchableOpacity
//             onPress={() => router.push("/")}
//             style={[
//               styles.homeIcon,
//               { backgroundColor: colors.background.color2 },
//             ]}
//           >
//             <LeftArrowIcon size={20} color={colors.textColor.color3} />
//           </TouchableOpacity>
//           <ThemeTextSecondary>Back to home</ThemeTextSecondary>
//         </View>
//       </ThemeSafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   wrapper: {
//     width: "90%",
//     gap: verticalScale(18),
//   },

//   title: {
//     fontSize: scale(20),
//     lineHeight: verticalScale(28),
//     fontFamily: "AirbnbCereal_W_Bd",
//     textAlign: "center",
//   },

//   subtitle: {
//     textAlign: "center",
//   },

//   inputGroup: {
//     gap: verticalScale(8),
//   },

//   input: {
//     borderWidth: 1,
//     borderRadius: scale(10),
//     paddingVertical: verticalScale(14),
//     paddingHorizontal: scale(14),
//     fontSize: scale(14)
//   },

//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderRadius: scale(10),
//     paddingRight: scale(10),
//   },

//   passwordInput: {
//     flex: 1,
//     paddingVertical: verticalScale(14),
//     paddingHorizontal: scale(14),
//   },

//   signInBtn: {
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(12),
//     alignItems: "center",
//     marginTop: verticalScale(10),
//   },

//   signInText: {
//     fontSize: scale(16),
//     fontFamily: "AirbnbCereal_W_Bd",
//   },

//   divider: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: verticalScale(10),
//   },

//   line: {
//     flex: 1,
//     height: 1,
//   },

//   orText: {
//     marginHorizontal: scale(10),
//   },

//   googleBtn: {
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(12),
//   },

//   googleText: {
//     textAlign: "center",
//   },

//   signupText: {
//     textAlign: "center",
//     fontSize: scale(15),
//     marginTop: verticalScale(10),
//   },

//   backRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(10),
//     position: "absolute",
//     top: verticalScale(45),
//     left: scale(15),
//   },

//   homeIcon: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: scale(10),
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });


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
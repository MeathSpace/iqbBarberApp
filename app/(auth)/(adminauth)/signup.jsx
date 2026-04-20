// import { useTheme } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import {
//   Keyboard,
//   Pressable,
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
// import { EyeIcon, EyeOffIcon, HomeIcon } from "../../../constants/icons";
// import i18n from "../../src/localization/i18n"

// const SignUp = () => {
//   const baseContent = i18n.t("auth.adminauth.signup")

//   const router = useRouter();

//   const [email, setEmail] = useState("demo@email.com");
//   const [password, setPassword] = useState("123456");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSignUp = () => {
//     console.log("Email:", email);
//     console.log("Password:", password);
//     router.push("/signupotp");
//   };

//   const { colors } = useTheme();

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <ThemeSafeAreaView
//         style={{
//           justifyContent: "center",
//           alignItems: "center",
//           position: "relative",
//         }}
//       >
//         <View
//           style={{
//             width: "90%",
//             flexDirection: "column",
//             gap: verticalScale(20),
//           }}
//         >
//           {/* Header Text */}
//           <View>
//             <ThemeTextPrimary
//               style={{
//                 fontSize: scale(28),
//                 fontFamily: "AirbnbCereal_W_Bd",
//               }}
//             >
//               {baseContent.header}
//             </ThemeTextPrimary>
//             <ThemeTextSecondary
//               style={{
//                 marginTop: verticalScale(5),
//               }}
//             >
//               {baseContent.subHeader}
//             </ThemeTextSecondary>
//           </View>

//           {/* Email Input */}
//           <View style={{ gap: verticalScale(10) }}>
//             <ThemeTextPrimary>{baseContent.emailInput.header}</ThemeTextPrimary>
//             <TextInput
//               editable
//               placeholder={baseContent.emailInput.placeholder}
//               value={email}
//               onChangeText={setEmail}
//               placeholderTextColor={colors.textColor2}
//               style={[
//                 styles.inputField,
//                 {
//                   backgroundColor: colors.inputColor,
//                   borderColor: colors.borderColor1,
//                   color: colors.textColor1,
//                 },
//               ]}
//             />
//           </View>

//           {/* Password Input */}
//           <View style={{ gap: verticalScale(10) }}>
//             <ThemeTextPrimary>{baseContent.passwordInput.header}</ThemeTextPrimary>
//             <View
//               style={[
//                 styles.passwordInputContainer,
//                 {
//                   backgroundColor: colors.inputColor,
//                   borderColor: colors.borderColor1,
//                 },
//               ]}
//             >
//               <TextInput
//                 editable
//                 placeholder={baseContent.passwordInput.placeholder}
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholderTextColor={colors.textColor2}
//                 secureTextEntry={!showPassword}
//                 style={[
//                   styles.inputField,
//                   {
//                     flex: 1,
//                     borderWidth: scale(0),
//                     color: colors.textColor1,
//                   },
//                 ]}
//               />
//               <Pressable
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeIcon}
//               >
//                 {showPassword ? (
//                   <EyeOffIcon size={20} color="#777" />
//                 ) : (
//                   <EyeIcon size={20} color="#777" />
//                 )}
//               </Pressable>
//             </View>
//           </View>

//           {/* Dummy Sign In Button */}
//           <TouchableOpacity onPress={handleSignUp} style={styles.signInButton}>
//             <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
//               {baseContent.signUp}
//             </ThemeTextPrimary>
//           </TouchableOpacity>

//           <View style={styles.divider}>
//             <View
//               style={{
//                 flex: 1,
//                 height: verticalScale(0.5),
//                 backgroundColor: colors.textColor2,
//               }}
//             />

//             <View style={{ paddingHorizontal: scale(10) }}>
//               <ThemeTextPrimary style={{ color: colors.text }}>
//                 {baseContent.or}
//               </ThemeTextPrimary>
//             </View>

//             <View
//               style={{
//                 flex: 1,
//                 height: verticalScale(0.5),
//                 backgroundColor: colors.textColor2,
//               }}
//             />
//           </View>

//           <TouchableOpacity
//             onPress={handleSignUp}
//             style={[
//               styles.googleSignInButton,
//               {
//                 backgroundColor: colors.inputColor,
//                 borderColor: colors.borderColor1,
//               },
//             ]}
//           >
//             <ThemeTextPrimary style={{ textAlign: "center" }}>
//               Google Sign Up
//             </ThemeTextPrimary>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => router.push("/signin")}>
//             <ThemeTextSecondary
//               style={{ textAlign: "center", fontSize: scale(16) }}
//             >
//               {baseContent.alreadyHaveAccount}
//               <ThemeTextPrimary style={{ color: "#14b8a6" }}>
//                 {" "}
//                 {baseContent.signIn}
//               </ThemeTextPrimary>
//             </ThemeTextSecondary>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           onPress={() => {
//             router.push("/");
//           }}
//           style={[
//             styles.homeIcon,
//             {
//               backgroundColor: colors.background2,
//               borderColor: colors.borderColor1,
//             },
//           ]}
//         >
//           <HomeIcon color={colors.textColor1} size={scale(20)} />
//         </TouchableOpacity>
//       </ThemeSafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   homeIcon: {
//     position: "absolute",
//     top: verticalScale(50),
//     left: scale(15),
//     width: scale(35),
//     height: scale(35),
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: scale(6),
//     borderWidth: scale(1),
//   },

//   inputField: {
//     borderWidth: scale(1),
//     borderRadius: scale(8),
//     paddingVertical: verticalScale(10),
//     paddingHorizontal: scale(12),
//     fontSize: scale(14),
//     fontFamily: "AirbnbCereal_W_Md",
//   },
//   passwordInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: scale(1),
//     borderRadius: scale(8),
//   },
//   eyeIcon: {
//     padding: scale(8),
//   },
//   signInButton: {
//     backgroundColor: "#14b8a6",
//     paddingVertical: verticalScale(12),
//     borderRadius: scale(8),
//     marginTop: verticalScale(20),
//   },

//   googleSignInButton: {
//     backgroundColor: "#ffffff",
//     paddingVertical: verticalScale(12),
//     borderRadius: scale(8),
//     borderWidth: scale(1),
//   },

//   divider: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
// });

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

          {/* Email */}
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

          {/* Password */}
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

          {/* Sign Up Button */}
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

          {/* Divider */}
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

          {/* Google Sign Up */}
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

          {/* Switch to Sign In */}
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

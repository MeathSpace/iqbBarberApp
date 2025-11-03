import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
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
import { EyeIcon, EyeOffIcon, HomeIcon } from "../../../constants/icons";

const SignUp = () => {
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
      <ThemeSafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "column",
            gap: verticalScale(20),
          }}
        >
          {/* Header Text */}
          <View>
            <ThemeTextPrimary
              style={{
                fontSize: scale(28),
                fontFamily: "AirbnbCereal_W_Bd",
              }}
            >
              Create an Account
            </ThemeTextPrimary>
            <ThemeTextSecondary
              style={{
                marginTop: verticalScale(5),
              }}
            >
              Let's get you started with iQBook.
            </ThemeTextSecondary>
          </View>

          {/* Email Input */}
          <View style={{ gap: verticalScale(10) }}>
            <ThemeTextPrimary>Email</ThemeTextPrimary>
            <TextInput
              editable
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={colors.textColor2}
              style={[
                styles.inputField,
                {
                  backgroundColor: colors.inputColor,
                  borderColor: colors.borderColor1,
                  color: colors.textColor1,
                },
              ]}
            />
          </View>

          {/* Password Input */}
          <View style={{ gap: verticalScale(10) }}>
            <ThemeTextPrimary>Password</ThemeTextPrimary>
            <View
              style={[
                styles.passwordInputContainer,
                {
                  backgroundColor: colors.inputColor,
                  borderColor: colors.borderColor1,
                },
              ]}
            >
              <TextInput
                editable
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={colors.textColor2}
                secureTextEntry={!showPassword}
                style={[
                  styles.inputField,
                  {
                    flex: 1,
                    borderWidth: scale(0),
                    color: colors.textColor1,
                  },
                ]}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOffIcon size={20} color="#777" />
                ) : (
                  <EyeIcon size={20} color="#777" />
                )}
              </Pressable>
            </View>
          </View>

          {/* Dummy Sign In Button */}
          <TouchableOpacity onPress={handleSignUp} style={styles.signInButton}>
            <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
              Sign Up
            </ThemeTextPrimary>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View
              style={{
                flex: 1,
                height: verticalScale(0.5),
                backgroundColor: colors.textColor2,
              }}
            />

            <View style={{ paddingHorizontal: scale(10) }}>
              <ThemeTextPrimary style={{ color: colors.text }}>
                or
              </ThemeTextPrimary>
            </View>

            <View
              style={{
                flex: 1,
                height: verticalScale(0.5),
                backgroundColor: colors.textColor2,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={handleSignUp}
            style={[
              styles.googleSignInButton,
              {
                backgroundColor: colors.inputColor,
                borderColor: colors.borderColor1,
              },
            ]}
          >
            <ThemeTextPrimary style={{ textAlign: "center" }}>
              Google Sign Up
            </ThemeTextPrimary>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/signin")}>
            <ThemeTextSecondary
              style={{ textAlign: "center", fontSize: scale(16) }}
            >
              Don't have an account ?
              <ThemeTextPrimary style={{ color: "#14b8a6" }}>
                {" "}
                Sign in
              </ThemeTextPrimary>
            </ThemeTextSecondary>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.push("/");
          }}
          style={[
            styles.homeIcon,
            {
              backgroundColor: colors.background2,
              borderColor: colors.borderColor1,
            },
          ]}
        >
          <HomeIcon color={colors.textColor1} size={scale(20)} />
        </TouchableOpacity>
      </ThemeSafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  homeIcon: {
    position: "absolute",
    top: verticalScale(50),
    left: scale(15),
    width: scale(35),
    height: scale(35),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(6),
    borderWidth: scale(1),
  },

  inputField: {
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    fontSize: scale(14),
    fontFamily: "AirbnbCereal_W_Md",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: scale(1),
    borderRadius: scale(8),
  },
  eyeIcon: {
    padding: scale(8),
  },
  signInButton: {
    backgroundColor: "#14b8a6",
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
    marginTop: verticalScale(20),
  },

  googleSignInButton: {
    backgroundColor: "#ffffff",
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
    borderWidth: scale(1),
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

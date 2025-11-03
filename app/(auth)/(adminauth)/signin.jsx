import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
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
import { EyeIcon, EyeOffIcon } from "../../../constants/icons";
import { errorColor } from "../../../constants/theme";
import api from "../../../utils/api";
import { isValidEmail } from "../../../utils/emailValidation";

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signinLoader, setSigninLoader] = useState(false);

  // Error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignIn = async () => {
    let hasError = false;

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Password must be 8 charecters");
      hasError = true;
    }

    if (hasError) return;

    try {
      setSigninLoader(true);

      const payload = {
        email,
        password,
      };

      const { data } = await api.post("/web-app/admin/login", payload);
      AsyncStorage.setItem("adminEmail", data?.foundUser?.email);
      AsyncStorage.setItem(
        "adminSalonId",
        JSON.stringify(data?.foundUser?.salonId)
      );
      router.push("/(admin)/(admintabs)/(home)");
    } catch (error) {
      Toast.error(error?.response?.data?.message);
    } finally {
      setSigninLoader(false);
    }
  };

  const { colors } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemeSafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
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
              Admin Login
            </ThemeTextPrimary>
            <ThemeTextSecondary
              style={{
                marginTop: verticalScale(5),
              }}
            >
              Welcome back! Please enter your details.
            </ThemeTextSecondary>
          </View>

          {/* Email Input */}
          <View style={{ gap: verticalScale(10) }}>
            <ThemeTextPrimary>Email</ThemeTextPrimary>
            <TextInput
              editable
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError("");
              }}
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
            {emailError && (
              <ThemeTextSecondary
                style={{
                  color: errorColor,
                }}
              >
                {emailError}
              </ThemeTextSecondary>
            )}
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
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError("");
                }}
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
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOffIcon size={20} color="#777" />
                ) : (
                  <EyeIcon size={20} color="#777" />
                )}
              </TouchableOpacity>
            </View>
            {passwordError && (
              <ThemeTextSecondary
                style={{
                  color: errorColor,
                }}
              >
                {passwordError}
              </ThemeTextSecondary>
            )}
          </View>

          {/* Dummy Sign In Button */}
          <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
            {signinLoader ? (
              <ActivityIndicator color="white" />
            ) : (
              <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
                Sign In
              </ThemeTextPrimary>
            )}
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
            onPress={handleSignIn}
            style={[
              styles.googleSignInButton,
              {
                backgroundColor: colors.inputColor,
                borderColor: colors.borderColor1,
              },
            ]}
          >
            <ThemeTextPrimary style={{ textAlign: "center" }}>
              Google Sign In
            </ThemeTextPrimary>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/signup")}>
            <ThemeTextSecondary
              style={{ textAlign: "center", fontSize: scale(16) }}
            >
              Don't have an account ?
              <ThemeTextPrimary style={{ color: "#14b8a6" }}>
                {" "}
                Sign up
              </ThemeTextPrimary>
            </ThemeTextSecondary>
          </TouchableOpacity>
        </View>
      </ThemeSafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

const styles = StyleSheet.create({
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

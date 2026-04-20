import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { scale, verticalScale } from "react-native-size-matters";
import i18n from "../app/src/localization/i18n";
import ThemeSafeAreaView from "../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../components/ThemeTextPrimary";
import ThemeTextSecondary from "../components/ThemeTextSecondary";

const initialScreen = () => {
  const { colors } = useTheme();

  const baseContent = i18n.t("index");

  const [showWelcome, setShowWelcome] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const is_user_authenticated = async () => {
      const savedAdminEmail = (await AsyncStorage.getItem("adminEmail")) || "";
      const savedBarberEmail =
        (await AsyncStorage.getItem("barberEmail")) || "";

      if (savedAdminEmail) {
        router.replace("/(admin)/(admintabs)/(home)");
      } else if (savedBarberEmail) {
        router.push("/(barber)/(barbertabs)/(home)");
      } else {
        setShowWelcome(true);
      }
    };

    is_user_authenticated();
  }, []);

  if (!showWelcome) {
    return null;
  }

  return (
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
          gap: verticalScale(10),
        }}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.image}
            source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
            contentFit="cover"
          />
        </View>

        <ThemeTextPrimary
          style={{
            fontSize: scale(20),
            fontFamily: "AirbnbCereal_W_Bd",
            textAlign: "center",
          }}
        >
          {baseContent.header}
        </ThemeTextPrimary>

        <ThemeTextSecondary
          style={{
            textAlign: "center",
            fontSize: scale(16),
          }}
        >
          {baseContent.subHeader}
        </ThemeTextSecondary>

        <View
          style={{
            flexDirection: "column",
            gap: verticalScale(20),
            marginTop: verticalScale(10),
          }}
        >
          <Shadow
            distance={12}
            startColor="rgba(0,0,0,0.12)"
            offset={[0, 4]}
            style={{ width: "100%" }}
          >
            <TouchableOpacity
              onPress={() => router.push("/(adminauth)/signin")}
            >
              <LinearGradient
                colors={[
                  colors.button.typeOne.linearOne,
                  colors.button.typeOne.linearTwo,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btn}
              >
                <ThemeTextPrimary
                  style={[
                    styles.btnText,
                    {
                      color: colors.textColor.color4,
                    },
                  ]}
                >
                  {baseContent.admin}
                </ThemeTextPrimary>
              </LinearGradient>
            </TouchableOpacity>
          </Shadow>

          <Shadow
            distance={12}
            startColor="rgba(0,0,0,0.08)"
            offset={[0, 4]}
            style={{ width: "100%" }}
          >
            <TouchableOpacity
              onPress={() => router.push("/(barberauth)/signin")}
            >
              <LinearGradient
                colors={[
                  colors.button.typeTwo.linearOne,
                  colors.button.typeTwo.linearTwo,
                  colors.button.typeTwo.linearThree,
                ]}
                style={styles.btn}
              >
                <ThemeTextPrimary
                  style={[styles.btnText, { color: colors.textColor.color3 }]}
                >
                  {baseContent.barber}
                </ThemeTextPrimary>
              </LinearGradient>
            </TouchableOpacity>
          </Shadow>
        </View>
      </View>
    </ThemeSafeAreaView>
  );
};

export default initialScreen;

const styles = StyleSheet.create({
  logoContainer: {
    padding: scale(12),
    borderRadius: scale(16),
    alignSelf: "center",
  },

  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(8),
  },

  btn: {
    paddingVertical: verticalScale(14),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    fontSize: scale(18),
    fontFamily: "AirbnbCereal_W_Bd",
  },
});

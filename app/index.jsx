import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import ThemeSafeAreaView from "../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../components/ThemeTextPrimary";
import ThemeTextSecondary from "../components/ThemeTextSecondary";

const initialScreen = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const is_user_authenticated = async () => {
      const savedAdminEmail = (await AsyncStorage.getItem("adminEmail")) || "";
      const savedBarberEmail =
        (await AsyncStorage.getItem("barberEmail")) || "";

      if (savedAdminEmail) {
        router.replace("/(admin)/(admintabs)/(home)")
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
        <Image
          style={styles.image}
          source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
          contentFit="cover"
          transition={1000}
        />

        <ThemeTextPrimary
          style={{
            fontSize: scale(28),
            fontFamily: "AirbnbCereal_W_Bd",
            textAlign: "center",
          }}
        >
          Welcome to iQBook
        </ThemeTextPrimary>

        <ThemeTextSecondary
          style={{
            textAlign: "center",
            fontSize: scale(16),
          }}
        >
          Made for Admins and Barbers — manage your queues and appointments
          smoothly, all in one place!
        </ThemeTextSecondary>

        <View
          style={{
            flexDirection: "column",
            gap: verticalScale(15),
            marginTop: verticalScale(10),
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("/(adminauth)/signin")}
            style={[styles.btn, { backgroundColor: "#14B8A6" }]}
          >
            <ThemeTextPrimary
              style={{
                fontSize: scale(18),
                color: "#fff",
                fontFamily: "AirbnbCereal_W_Bd",
              }}
            >
              Admin
            </ThemeTextPrimary>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(barberauth)/signin")}
            style={[styles.btn, { backgroundColor: "#14B8A6" }]}
          >
            <ThemeTextPrimary
              style={{
                fontSize: scale(18),
                color: "#fff",
                fontFamily: "AirbnbCereal_W_Bd",
              }}
            >
              Barber
            </ThemeTextPrimary>
          </TouchableOpacity>
        </View>
      </View>
    </ThemeSafeAreaView>
  );
};

export default initialScreen;

const styles = StyleSheet.create({
  image: {
    width: scale(120),
    height: scale(120),
    backgroundColor: "#0553",
    borderRadius: scale(4),
    marginBottom: scale(20),
    marginInline: "auto",
  },

  btn: {
    // height: verticalScale(60),
    paddingVertical: verticalScale(12),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(8),
  },
});

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useTheme } from "@react-navigation/native";
// import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import { StyleSheet, TouchableOpacity, View } from "react-native";
// import { Shadow } from "react-native-shadow-2";
// import { scale, verticalScale } from "react-native-size-matters";
// import i18n from "../app/src/localization/i18n";
// import ThemeSafeAreaView from "../components/ThemeSafeAreaView";
// import ThemeTextPrimary from "../components/ThemeTextPrimary";
// import ThemeTextSecondary from "../components/ThemeTextSecondary";

// const initialScreen = () => {
//   const { colors } = useTheme();

//   const baseContent = i18n.t("index");

//   const [showWelcome, setShowWelcome] = useState(false);

//   const router = useRouter();

//   useEffect(() => {
//     const is_user_authenticated = async () => {
//       const savedAdminEmail = (await AsyncStorage.getItem("adminEmail")) || "";
//       const savedBarberEmail =
//         (await AsyncStorage.getItem("barberEmail")) || "";

//       if (savedAdminEmail) {
//         router.replace("/(admin)/(admintabs)/(home)");
//       } else if (savedBarberEmail) {
//         router.push("/(barber)/(barbertabs)/(home)");
//       } else {
//         setShowWelcome(true);
//       }
//     };

//     is_user_authenticated();
//   }, []);

//   if (!showWelcome) {
//     return null;
//   }

//   return (
//     <ThemeSafeAreaView
//       style={{
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <View
//         style={{
//           width: "90%",
//           flexDirection: "column",
//           gap: verticalScale(10),
//         }}
//       >
//         <View style={styles.logoContainer}>
//           <Image
//             style={styles.image}
//             source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
//             contentFit="cover"
//           />
//         </View>

//         <ThemeTextPrimary
//           style={{
//             fontSize: scale(20),
//             fontFamily: "AirbnbCereal_W_Bd",
//             textAlign: "center",
//           }}
//         >
//           {baseContent.header}
//         </ThemeTextPrimary>

//         <ThemeTextSecondary
//           style={{
//             textAlign: "center",
//             fontSize: scale(16),
//           }}
//         >
//           {baseContent.subHeader}
//         </ThemeTextSecondary>

//         <View
//           style={{
//             flexDirection: "column",
//             gap: verticalScale(20),
//             marginTop: verticalScale(10),
//           }}
//         >
//           <Shadow
//             distance={12}
//             startColor="rgba(0,0,0,0.12)"
//             offset={[0, 4]}
//             style={{ width: "100%" }}
//           >
//             <TouchableOpacity
//               onPress={() => router.push("/(adminauth)/signin")}
//             >
//               <LinearGradient
//                 colors={[
//                   colors.button.typeOne.linearOne,
//                   colors.button.typeOne.linearTwo,
//                 ]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.btn}
//               >
//                 <ThemeTextPrimary
//                   style={[
//                     styles.btnText,
//                     {
//                       color: colors.textColor.color4,
//                     },
//                   ]}
//                 >
//                   {baseContent.admin}
//                 </ThemeTextPrimary>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Shadow>

//           <Shadow
//             distance={12}
//             startColor="rgba(0,0,0,0.08)"
//             offset={[0, 4]}
//             style={{ width: "100%" }}
//           >
//             <TouchableOpacity
//               onPress={() => router.push("/(barberauth)/signin")}
//             >
//               <LinearGradient
//                 colors={[
//                   colors.button.typeTwo.linearOne,
//                   colors.button.typeTwo.linearTwo,
//                   colors.button.typeTwo.linearThree,
//                 ]}
//                 style={styles.btn}
//               >
//                 <ThemeTextPrimary
//                   style={[styles.btnText, { color: colors.textColor.color3 }]}
//                 >
//                   {baseContent.barber}
//                 </ThemeTextPrimary>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Shadow>
//         </View>
//       </View>
//     </ThemeSafeAreaView>
//   );
// };

// export default initialScreen;

// const styles = StyleSheet.create({
//   logoContainer: {
//     padding: scale(12),
//     borderRadius: scale(16),
//     alignSelf: "center",
//   },

//   image: {
//     width: scale(80),
//     height: scale(80),
//     borderRadius: scale(8),
//   },

//   btn: {
//     paddingVertical: verticalScale(14),
//     borderRadius: scale(10),
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   btnText: {
//     fontSize: scale(18),
//     fontFamily: "AirbnbCereal_W_Bd",
//   },
// });

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import i18n from "../app/src/localization/i18n";
import ThemeSafeAreaView from "../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../components/ThemeTextPrimary";
import ThemeTextSecondary from "../components/ThemeTextSecondary";

const { width } = Dimensions.get("window");

const InitialScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(false);
  const baseContent = i18n.t("index");

  useEffect(() => {
    const checkAuth = async () => {
      const savedAdminEmail = await AsyncStorage.getItem("adminEmail");
      const savedBarberEmail = await AsyncStorage.getItem("barberEmail");

      if (savedAdminEmail) {
        router.replace("/(admin)/(admintabs)/(home)");
      } else if (savedBarberEmail) {
        router.replace("/(barber)/(barbertabs)/(home)");
      } else {
        setShowWelcome(true);
      }
    };
    checkAuth();
  }, []);

  if (!showWelcome) return null;

  return (
    <ThemeSafeAreaView style={styles.container}>
      {/* Upper Section: Branding */}
      <View style={styles.topSection}>
        <View style={[styles.imageWrapper, { borderColor: colors.border }]}>
          <Image
            style={styles.image}
            source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
            contentFit="cover"
          />
        </View>

        <View style={styles.textContainer}>
          <ThemeTextPrimary style={styles.headline}>
            {baseContent.header}
          </ThemeTextPrimary>
          <ThemeTextSecondary style={styles.subHeadline}>
            {baseContent.subHeader}
          </ThemeTextSecondary>
        </View>
      </View>

      {/* Lower Section: Actions */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(adminauth)/signin")}
          style={styles.buttonContainer}
        >
          <LinearGradient
            colors={[
              colors.button.typeOne.linearOne,
              colors.button.typeOne.linearTwo,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primaryBtn}
          >
            <ThemeTextPrimary
              style={[styles.btnText, { color: colors.textColor.color4 }]}
            >
              {baseContent.admin}
            </ThemeTextPrimary>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(barberauth)/signin")}
          style={[styles.secondaryBtn, { borderColor: colors.border }]}
        >
          <ThemeTextPrimary style={[styles.btnText, { color: colors.text }]}>
            {baseContent.barber}
          </ThemeTextPrimary>
        </TouchableOpacity>

        <ThemeTextSecondary style={styles.footerText}>
          Select your portal to continue
        </ThemeTextSecondary>
      </View>
    </ThemeSafeAreaView>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(24),
  },
  topSection: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: scale(110),
    height: scale(110),
    borderRadius: scale(55),
    borderWidth: 1,
    padding: scale(8),
    marginBottom: verticalScale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: scale(50),
  },
  textContainer: {
    alignItems: "center",
  },
  headline: {
    fontSize: scale(26),
    fontFamily: "AirbnbCereal_W_Bd",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subHeadline: {
    textAlign: "center",
    fontSize: scale(15),
    marginTop: verticalScale(10),
    lineHeight: scale(22),
    paddingHorizontal: scale(10),
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: verticalScale(40),
  },
  buttonContainer: {
    width: "100%",
    marginBottom: verticalScale(15),
  },
  primaryBtn: {
    paddingVertical: verticalScale(16),
    borderRadius: scale(14),
    alignItems: "center",
    elevation: 4, // Subtle Android shadow
    shadowColor: "#000", // Subtle iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  secondaryBtn: {
    paddingVertical: verticalScale(16),
    borderRadius: scale(14),
    alignItems: "center",
    borderWidth: 1.5,
    backgroundColor: "transparent",
  },
  btnText: {
    fontSize: scale(16),
    fontFamily: "AirbnbCereal_W_Bd",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  footerText: {
    textAlign: "center",
    fontSize: scale(12),
    marginTop: verticalScale(20),
    opacity: 0.6,
  },
});

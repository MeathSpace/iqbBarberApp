// import React, { useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";
// import { useRouter } from "expo-router";
// import { darkTheme } from "../../../../../constants/appTheme";
// import Header from "../../../../../components/Header/Header"; // Linked your architectural header

// const index = () => {
//   const router = useRouter();
//   const [currentStep, setCurrentStep] = useState(1);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     nickname: "",
//     email: "",
//     mobileNumber: "",
//     dobDay: "",
//     dobMonth: "",
//     dobYear: "",
//   });

//   const [selectedServices, setSelectedServices] = useState([]);

//   const updateFields = (fields) => {
//     setFormData((prev) => ({ ...prev, ...fields }));
//   };

//   const handleToggleService = (id) => {
//     setSelectedServices((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handlePrimaryActionPress = () => {
//     if (currentStep === 1) {
//       setCurrentStep(2);
//     } else {
//       router.back();
//     }
//   };

//   const headerTitle = currentStep === 1 ? "Basic Information" : "Select Services";
//   const headerSubtitle = currentStep === 1
//     ? "Step 1 of 2"
//     : `Step 2 of 2 • ${selectedServices.length} selected`;

//   return (
//     <SafeAreaView
//       edges={["top", "right", "left"]}
//       style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
//     >
//       <Header title={headerTitle} subTitle={headerSubtitle} showBack={true}/>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.keyboardContainer}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContainer}
//         >
          // <View style={styles.progressTrack}>
          //   <View style={[styles.progressFill, { backgroundColor: darkTheme.colors.accent }]} />
          //   <View
          //     style={[
          //       styles.progressEmpty,
          //       currentStep === 2 && { backgroundColor: darkTheme.colors.accent, borderTopRightRadius: scale(2), borderBottomRightRadius: scale(2) }
          //     ]}
          //   />
          // </View>

//           {currentStep === 1 ? (
//             <StepBasicInfo formData={formData} updateFields={updateFields} />
//           ) : (
//             <StepSelectServices selectedIds={selectedServices} onToggleService={handleToggleService} />
//           )}

//           <TouchableOpacity
//             style={[styles.continueButton, { backgroundColor: darkTheme.colors.accent, height: darkTheme.layout.buttonHeight }]}
//             activeOpacity={0.8}
//             onPress={handlePrimaryActionPress}
//           >
//             <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
//               {currentStep === 1 ? "Continue" : "Finish"}
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default index;

// const styles = StyleSheet.create({
//   /* ==========================================================================
//      MAIN SCREEN
//      ========================================================================== */
//   container: {
//     flex: 1,
//   },

//   keyboardContainer: {
//     flex: 1,
//   },

//   scrollContainer: {
//     paddingHorizontal: darkTheme.layout.paddingHorizontal,
//     paddingBottom: verticalScale(32),
//   },

//   /* ==========================================================================
//      PROGRESS BAR
//      ========================================================================== */
//   progressTrack: {
//     flexDirection: "row",
//     width: "100%",
//     height: verticalScale(4),
//     backgroundColor: "#1C1C1E",
//     borderRadius: darkTheme.layout.borderRadiusSmall,
//     marginBottom: verticalScale(24),
//   },

//   progressFill: {
//     flex: 1,
//     height: "100%",
//     borderTopLeftRadius: scale(2),
//     borderBottomLeftRadius: scale(2),
//   },

//   progressEmpty: {
//     flex: 1,
//     height: "100%",
//   },

//   /* ==========================================================================
//      SHARED STEP STYLES
//      ========================================================================== */
//   stepContainer: {
//     width: "100%",
//   },

//   continueButton: {
//     width: "100%",
//     borderRadius: darkTheme.layout.borderRadiusMedium,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: verticalScale(4),
//   }
// });

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";

const index = () => {
  const router = useRouter();

  // Dynamic Array Configuration mimicking Screenshot 2026-07-05 at 5.25.48 PM_2.jpg
  const stepsConfig = [
    {
      id: 1,
      title: "Barber Info",
      renderIcon: (color) => <Ionicons name="information-circle" size={scale(18)} color={color} />,
    },
    {
      id: 2,
      title: "Services",
      renderIcon: (color) => <MaterialIcons name="content-cut" size={scale(18)} color={color} />,
    },
  ];

  const handleStartFlow = () => {
    // Push directly to your first actual separate step page
    router.push("/(steps)/basicInfo");
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header
        title="Add New Barber"
        subTitle="Follow the steps to add a barber"
        showBack={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* ==========================================================================
           DYNAMIC STEPS SUMMARY LIST
           ========================================================================== */}
        <View style={styles.menuContainer}>
          {stepsConfig.map((step) => (
            <View key={step.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.iconWrapper,
                    { backgroundColor: "rgba(255, 152, 0, 0.1)" },
                  ]}
                >
                  {step.renderIcon(darkTheme.colors.accent)}
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.stepLabel}>Step {step.id}</Text>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                </View>
              </View>
              
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{step.id}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor: darkTheme.colors.accent,
              height: darkTheme.layout.buttonHeight,
            },
          ]}
          activeOpacity={0.8}
          onPress={handleStartFlow}
        >
          <Text
            style={[
              darkTheme.typography.btnText,
              { color: "#000000", fontWeight: "700" },
            ]}
          >
            Next: Barber information
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
  },

  /* ==========================================================================
     SUMMARY STEPS STYLES
     ========================================================================== */
  menuContainer: {
    width: "100%",
    marginBottom: verticalScale(24),
    gap: verticalScale(12),
    marginTop: verticalScale(16),
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#1C1C1E",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(18),
    borderRadius: scale(12),
  },

  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconWrapper: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(14),
  },

  textWrapper: {
    justifyContent: "center",
  },

  stepLabel: {
    fontSize: scale(11),
    color: "#8E8E93",
    marginBottom: verticalScale(2),
  },

  stepTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#FFFFFF",
  },

  badge: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: "#2C2C2E",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    fontSize: scale(10),
    fontWeight: "600",
    color: "#8E8E93",
  },

  continueButton: {
    width: "100%",
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(12),
  },
});
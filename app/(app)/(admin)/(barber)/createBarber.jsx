import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { useRouter } from "expo-router";
import { darkTheme } from "../../../../constants/appTheme";
import Header from "../../../../components/Header/Header"; // Linked your architectural header


const CreateBarber = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    fullName: "",
    nickname: "",
    email: "",
    mobileNumber: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
  });

  const [selectedServices, setSelectedServices] = useState([]);

  const updateFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleToggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePrimaryActionPress = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      router.back();
    }
  };

  const headerTitle = currentStep === 1 ? "Basic Information" : "Select Services";
  const headerSubtitle = currentStep === 1 
    ? "Step 1 of 2" 
    : `Step 2 of 2 • ${selectedServices.length} selected`;

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header title={headerTitle} subTitle={headerSubtitle} showBack={true}/>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { backgroundColor: darkTheme.colors.accent }]} />
            <View 
              style={[
                styles.progressEmpty, 
                currentStep === 2 && { backgroundColor: darkTheme.colors.accent, borderTopRightRadius: scale(2), borderBottomRightRadius: scale(2) }
              ]} 
            />
          </View>

          {currentStep === 1 ? (
            <StepBasicInfo formData={formData} updateFields={updateFields} />
          ) : (
            <StepSelectServices selectedIds={selectedServices} onToggleService={handleToggleService} />
          )}

          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: darkTheme.colors.accent, height: darkTheme.layout.buttonHeight }]}
            activeOpacity={0.8}
            onPress={handlePrimaryActionPress}
          >
            <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
              {currentStep === 1 ? "Continue" : "Finish"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateBarber;

const styles = StyleSheet.create({
  /* ==========================================================================
     MAIN SCREEN
     ========================================================================== */
  container: {
    flex: 1,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
  },

  /* ==========================================================================
     PROGRESS BAR
     ========================================================================== */
  progressTrack: {
    flexDirection: "row",
    width: "100%",
    height: verticalScale(4),
    backgroundColor: "#1C1C1E",
    borderRadius: darkTheme.layout.borderRadiusSmall,
    marginBottom: verticalScale(24),
  },

  progressFill: {
    flex: 1,
    height: "100%",
    borderTopLeftRadius: scale(2),
    borderBottomLeftRadius: scale(2),
  },

  progressEmpty: {
    flex: 1,
    height: "100%",
  },

  /* ==========================================================================
     SHARED STEP STYLES
     ========================================================================== */
  stepContainer: {
    width: "100%",
  },

  continueButton: {
    width: "100%",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(4),
  }
});
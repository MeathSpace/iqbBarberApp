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
import { darkTheme } from "../../../../../constants/appTheme";
import Header from "../../../../../components/Header/Header"; // Linked your architectural header
import {
  CameraIcon,
  CheckIcon,
  StarIcon,
} from "../../../../../constants/icons";

const AVAILABLE_SERVICES = [
  { id: "1", title: "Classic Haircut", desc: "Traditional scissor cut", price: "£35", duration: "30 min", featured: false },
  { id: "2", title: "Fade Haircut", desc: "Modern fade styling", price: "£40", duration: "45 min", featured: false },
  { id: "3", title: "Hot Towel Shave", desc: "Luxury straight razor shave", price: "£45", duration: "30 min", featured: true },
  { id: "4", title: "Beard Trim & Shape", desc: "Professional beard grooming", price: "£25", duration: "20 min", featured: false },
  { id: "5", title: "Hair Coloring", desc: "Full color change or highlights", price: "£60", duration: "60 min", featured: false },
];

/* ==========================================================================
   SUB-COMPONENT: STEP 1 - BASIC INFORMATION FORM
   ========================================================================== */
const StepBasicInfo = ({ formData, updateFields }) => {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.photoUploadContainer}>
        <TouchableOpacity
          style={[styles.photoCircle, { backgroundColor: darkTheme.colors.card }]}
          activeOpacity={0.8}
        >
          <CameraIcon size={scale(18)} color={darkTheme.colors.textMain} />
          <Text style={styles.photoText}>Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={darkTheme.typography.inputLabel}>Full Name *</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, color: darkTheme.colors.textMain }]}
            placeholder="Enter full name"
            placeholderTextColor={darkTheme.colors.textMuted}
            value={formData.fullName}
            onChangeText={(val) => updateFields({ fullName: val })}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={darkTheme.typography.inputLabel}>Nickname *</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, color: darkTheme.colors.textMain }]}
            placeholder="Enter nickname"
            placeholderTextColor={darkTheme.colors.textMuted}
            value={formData.nickname}
            onChangeText={(val) => updateFields({ nickname: val })}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={darkTheme.typography.inputLabel}>Email *</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, color: darkTheme.colors.textMain }]}
            placeholder="barber@example.com"
            placeholderTextColor={darkTheme.colors.textMuted}
            value={formData.email}
            onChangeText={(val) => updateFields({ email: val })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={darkTheme.typography.inputLabel}>Mobile Number *</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, color: darkTheme.colors.textMain }]}
            placeholder="+1 (555) 000-0000"
            placeholderTextColor={darkTheme.colors.textMuted}
            value={formData.mobileNumber}
            onChangeText={(val) => updateFields({ mobileNumber: val })}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={darkTheme.typography.inputLabel}>Date of Birth</Text>
          <View style={styles.dobRow}>
            <TextInput
              style={[styles.dobInput, styles.dobDayInput, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, color: darkTheme.colors.textMain }]}
              placeholder="DD"
              placeholderTextColor={darkTheme.colors.textMuted}
              value={formData.dobDay}
              onChangeText={(val) => updateFields({ dobDay: val })}
              keyboardType="number-pad"
              maxLength={2}
            />
            <TextInput
              style={[styles.dobInput, styles.dobMonthInput, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, color: darkTheme.colors.textMain }]}
              placeholder="MM"
              placeholderTextColor={darkTheme.colors.textMuted}
              value={formData.dobMonth}
              onChangeText={(val) => updateFields({ dobMonth: val })}
              keyboardType="number-pad"
              maxLength={2}
            />
            <TextInput
              style={[styles.dobInput, styles.dobYearInput, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border, color: darkTheme.colors.textMain }]}
              placeholder="YYYY"
              placeholderTextColor={darkTheme.colors.textMuted}
              value={formData.dobYear}
              onChangeText={(val) => updateFields({ dobYear: val })}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

/* ==========================================================================
   SUB-COMPONENT: STEP 2 - INTERACTIVE SERVICES LIST SELECTION
   ========================================================================== */
const StepSelectServices = ({ selectedIds, onToggleService }) => {
  return (
    <View style={[styles.stepContainer, styles.servicesStepGap]}>
      {AVAILABLE_SERVICES.map((item) => {
        const isSelected = selectedIds.includes(item.id);
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            onPress={() => onToggleService(item.id)}
            style={[
              styles.serviceCard,
              {
                backgroundColor: darkTheme.colors.card,
                borderColor: isSelected ? darkTheme.colors.accent : darkTheme.colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.checkboxShell,
                {
                  borderColor: isSelected ? darkTheme.colors.accent : darkTheme.colors.textMuted,
                  backgroundColor: isSelected ? darkTheme.colors.accent : "transparent",
                },
              ]}
            >
              {isSelected && <CheckIcon size={scale(11)} color="#000000" />}
            </View>

            <View style={styles.serviceMainDetails}>
              <View style={styles.titleRow}>
                <Text style={darkTheme.typography.cardTitle}>{item.title}</Text>
                {item.featured && (
                  <StarIcon size={scale(12)} color={darkTheme.colors.accent} style={styles.featuredStar} />
                )}
              </View>
              <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted, marginTop: verticalScale(2) }]}>
                {item.desc}
              </Text>

              <View style={styles.badgeMetricsRow}>
                <View style={[styles.priceBadge, { backgroundColor: "rgba(255, 149, 0, 0.1)" }]}>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>
                <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>
                  {item.duration}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

/* ==========================================================================
   MAIN PARENT ROUTE HANDLER WRAPPER
   ========================================================================== */
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

  // Compute standard dynamic structural header properties labels on demand
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
  stepContainer: {
    width: "100%",
  },
  servicesStepGap: {
    gap: verticalScale(12),
    marginBottom: verticalScale(24),
  },
  photoUploadContainer: {
    alignItems: "center",
    marginBottom: verticalScale(24),
  },
  photoCircle: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: {
    color: "#FFFFFF",
    fontSize: scale(10),
    fontWeight: "500",
    marginTop: verticalScale(4),
  },
  formContainer: {
    gap: verticalScale(16),
    marginBottom: verticalScale(28),
  },
  inputGroup: {
    width: "100%",
  },
  textInput: {
    width: "100%",
    height: darkTheme.layout.componentHeight,
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    paddingHorizontal: scale(14),
    fontSize: scale(14),
    fontWeight: "400",
    marginTop: verticalScale(6),
  },
  dobRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: verticalScale(6),
  },
  dobInput: {
    height: darkTheme.layout.componentHeight,
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    textAlign: "center",
    fontSize: scale(14),
    fontWeight: "400",
  },
  dobDayInput: {
    width: "22%",
  },
  dobMonthInput: {
    width: "22%",
  },
  dobYearInput: {
    width: "50%",
  },
  continueButton: {
    width: "100%",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(4),
  },
  serviceCard: {
    width: "100%",
    borderWidth: 1,
    borderRadius: darkTheme.layout.borderRadiusLarge,
    padding: scale(14),
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkboxShell: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(4),
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(14),
    marginTop: verticalScale(2),
  },
  serviceMainDetails: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  featuredStar: {
    marginLeft: scale(6),
  },
  badgeMetricsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(12),
    gap: scale(10),
  },
  priceBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(3),
    borderRadius: scale(4),
  },
  priceText: {
    color: "#FF9500",
    fontSize: scale(11),
    fontWeight: "700",
  },
});
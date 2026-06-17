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
import { useRouter } from "expo-router";

// Core Architecture & Design Pattern Imports
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import {
  AboutIcon,        // Step 1: Info Icon
  WebIcon,          // Step 2: Business Info
  SalonIcon,        // Step 3: Services
  CameraIcon,       // Step 4: Gallery
} from "../../../../../constants/icons";

const CreateSalonScreen = () => {
  const router = useRouter();

  const stepsData = [
    {
      id: "1",
      stepLabel: "Step 1",
      title: "Salon Info",
      IconComponent: AboutIcon,
    },
    {
      id: "2",
      stepLabel: "Step 2",
      title: "Business Info",
      IconComponent: WebIcon,
    },
    {
      id: "3",
      stepLabel: "Step 3",
      title: "Services",
      IconComponent: SalonIcon,
    },
    {
      id: "4",
      stepLabel: "Step 4",
      title: "Gallery",
      IconComponent: CameraIcon,
    },
  ];

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header 
        title={"Add New Salon"} 
        subTitle={"Follow the steps to create a salon"} 
        showBack={true} 
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.listContainer}>
          {stepsData.map((step) => {
            const CustomIcon = step.IconComponent;
            return (
              <View
                key={step.id}
                style={[
                  styles.stepCard,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                  },
                ]}
              >
                <View style={styles.leftContent}>
                  {/* Tinted background canvas box for the vector elements */}
                  <View style={styles.iconWrapper}>
                    <CustomIcon 
                      size={scale(16)} 
                      color={darkTheme.colors.accent} 
                    />
                  </View>

                  <View>
                    <Text style={darkTheme.typography.bodyMuted}>{step.stepLabel}</Text>
                    <Text style={[darkTheme.typography.cardTitle, { marginTop: verticalScale(2) }]}>
                      {step.title}
                    </Text>
                  </View>
                </View>

                <View 
                  style={[
                    styles.numberBadge, 
                    { 
                      backgroundColor: "#1C1C1E", 
                      borderColor: darkTheme.colors.border 
                    }
                  ]}
                >
                  <Text style={[darkTheme.typography.bodyMuted, styles.badgeNumberText]}>
                    {step.id}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor: darkTheme.colors.accent,
              height: darkTheme.layout.buttonHeight,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => {
            router.push("/(steps)")
          }}
        >
          <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
            Next: Salon information
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateSalonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(32),
  },
  listContainer: {
    gap: verticalScale(12),
    marginBottom: verticalScale(24),
  },
  stepCard: {
    borderWidth: 1,
    borderRadius: darkTheme.layout.borderRadiusLarge,
    padding: scale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: scale(40),
    height: scale(40),
    borderRadius: darkTheme.layout.borderRadiusMedium,
    backgroundColor: "#151311", // Dark tinted box underlay matching your premium banner accenting
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
    borderWidth: 1,
    borderColor: "rgba(255, 149, 0, 0.1)", // Light glow tracking around the icon container bounding box
  },
  numberBadge: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeNumberText: {
    fontSize: scale(11),
    fontWeight: "600",
  },
  nextButton: {
    width: "100%",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    alignItems: "center",
    justifyContent: "center",
  },
});
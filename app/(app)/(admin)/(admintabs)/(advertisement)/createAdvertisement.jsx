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

import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { CameraIcon, NotificationIcon } from "../../../../../constants/icons";

const CreateAdvertisement = () => {
  const [adName, setAdName] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header 
        title={"Add Advertisement"} 
        subTitle={"Upload promotional content"} 
        showBack={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.formContainer}>
            
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Advertisement Name *
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                    color: darkTheme.colors.textMain,
                    borderRadius: darkTheme.layout.borderRadiusMedium,
                    height: darkTheme.layout.componentHeight,
                  },
                ]}
                placeholder="e.g., Summer Sale, New Services"
                placeholderTextColor={darkTheme.colors.textMuted}
                value={adName}
                onChangeText={setAdName}
              />
            </View>

            {/* Upload Area 16:9 box */}
            <View style={styles.inputGroup}>
              <Text style={darkTheme.typography.inputLabel}>
                Image (16:9 ratio) *
              </Text>
              <TouchableOpacity
                style={[
                  styles.uploadDropzone,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: darkTheme.colors.border,
                    borderRadius: darkTheme.layout.borderRadiusLarge,
                  },
                ]}
                activeOpacity={0.8}
              >
                <View style={[styles.uploadIconWrapper, { backgroundColor: "rgba(255, 149, 0, 0.1)" }]}>
                  <CameraIcon size={scale(20)} color={darkTheme.colors.accent} />
                </View>
                <Text style={[darkTheme.typography.bodyMain, styles.uploadText]}>
                  Upload Image
                </Text>
                <Text style={[darkTheme.typography.bodyMuted, styles.uploadSpecs]}>
                  Recommended: 1920×1080 or 1280×720{"\n"}16:9 aspect ratio required
                </Text>
              </TouchableOpacity>
            </View>

            <View 
              style={[
                styles.infoBanner, 
                { 
                  backgroundColor: "#151311", 
                  borderColor: "rgba(255, 149, 0, 0.15)",
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                }
              ]}
            >
              <NotificationIcon size={scale(16)} color={darkTheme.colors.accent} style={styles.infoIcon} />
              <View style={styles.infoTextContainer}>
                <Text style={[darkTheme.typography.bodyMuted, { color: "#E5E5EA", fontWeight: "700" }]}>
                  Image will be displayed on:
                </Text>
                <Text style={[darkTheme.typography.bodyMuted, styles.infoListText]}>
                  • Customer mobile apps{"\n"}• In-salon TV displays{"\n"}• Queue management screens
                </Text>
              </View>
            </View>

          </View>

          <TouchableOpacity
            style={[
              styles.finishButton, 
              { 
                backgroundColor: darkTheme.colors.accent, 
                height: darkTheme.layout.buttonHeight,
                borderRadius: darkTheme.layout.borderRadiusMedium,
              }
            ]}
            activeOpacity={0.8}
            onPress={() => {
              router.back();
            }}
          >
            <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
              Finish
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAdvertisement;

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
  formContainer: {
    gap: verticalScale(20),
    marginBottom: verticalScale(32),
  },
  inputGroup: {
    width: "100%",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: scale(14),
    fontSize: scale(14),
    fontWeight: "400",
    marginTop: verticalScale(8),
  },
  uploadDropzone: {
    width: "100%",
    height: verticalScale(150),
    borderWidth: 1,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(8),
    padding: scale(16),
  },
  uploadIconWrapper: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  uploadText: {
    fontWeight: "600",
    fontSize: scale(13),
  },
  uploadSpecs: {
    textAlign: "center",
    fontSize: scale(11),
    lineHeight: scale(15),
    marginTop: verticalScale(4),
  },
  infoBanner: {
    flexDirection: "row",
    padding: scale(14),
    borderWidth: 1,
    alignItems: "flex-start",
  },
  infoIcon: {
    marginTop: verticalScale(1),
    marginRight: scale(10),
  },
  infoTextContainer: {
    flex: 1,
  },
  infoListText: {
    marginTop: verticalScale(4),
    lineHeight: scale(16),
    color: "#E5E5EA",
  },
  finishButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
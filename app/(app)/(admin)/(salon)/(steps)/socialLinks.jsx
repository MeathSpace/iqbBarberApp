import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { FontAwesome, FontAwesome6, AntDesign, Feather } from "@expo/vector-icons";

import Header from "../../../../../components/Header/Header"; // Adjust path dynamically
import { darkTheme } from "../../../../../constants/appTheme";

const SocialLinks = () => {
  // Balanced local string variable state tracks for every link field input
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [tiktok, setTiktok] = useState("");

  const handleFinishConfiguration = () => {
    const socialPayload = {
      website: website.trim(),
      facebook: facebook.trim(),
      instagram: instagram.trim(),
      twitter: twitter.trim(),
      tiktok: tiktok.trim(),
    };
    console.log("Submit captured social profile URLs matrix payload:", socialPayload);
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header title="Social Links" subTitle="Configure customer facing platform hooks" showBack={false} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.scrollContentTrack}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.internalFormFieldsEnclosure}>

            {/* Field Block Module: Website */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>WEBSITE URL</Text>
              <View style={[styles.inlineInputWithIconWrapper, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
                <View style={styles.leftIconPrefixFrame}>
                  <Feather name="globe" size={scale(14)} color="rgba(255,255,255,0.4)" />
                </View>
                <TextInput
                  style={[styles.luxuryTextInputInstance, { color: darkTheme.colors.textMain }]}
                  value={website}
                  onChangeText={setWebsite}
                  placeholder="https://www.salon.com/"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="url"
                  selectionColor={darkTheme.colors.accent}
                />
              </View>
            </View>

            {/* Field Block Module: Facebook */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>FACEBOOK PROFILE</Text>
              <View style={[styles.inlineInputWithIconWrapper, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
                <View style={styles.leftIconPrefixFrame}>
                  <FontAwesome name="facebook" size={scale(15)} color="rgba(255,255,255,0.4)" />
                </View>
                <TextInput
                  style={[styles.luxuryTextInputInstance, { color: darkTheme.colors.textMain }]}
                  value={facebook}
                  onChangeText={setFacebook}
                  placeholder="https://www.facebook.com/salon/"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="url"
                  selectionColor={darkTheme.colors.accent}
                />
              </View>
            </View>

            {/* Field Block Module: Instagram */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>INSTAGRAM HANDLE</Text>
              <View style={[styles.inlineInputWithIconWrapper, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
                <View style={styles.leftIconPrefixFrame}>
                  <AntDesign name="instagram" size={scale(15)} color="rgba(255,255,255,0.4)" />
                </View>
                <TextInput
                  style={[styles.luxuryTextInputInstance, { color: darkTheme.colors.textMain }]}
                  value={instagram}
                  onChangeText={setInstagram}
                  placeholder="https://www.instagram.com/salon/"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="url"
                  selectionColor={darkTheme.colors.accent}
                />
              </View>
            </View>

            {/* Field Block Module: X / Twitter */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>X (FORMERLY TWITTER)</Text>
              <View style={[styles.inlineInputWithIconWrapper, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
                <View style={styles.leftIconPrefixFrame}>
                  <FontAwesome6 name="x-twitter" size={scale(13)} color="rgba(255,255,255,0.4)" />
                </View>
                <TextInput
                  style={[styles.luxuryTextInputInstance, { color: darkTheme.colors.textMain }]}
                  value={twitter}
                  onChangeText={setTwitter}
                  placeholder="https://x.com/Salon"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="url"
                  selectionColor={darkTheme.colors.accent}
                />
              </View>
            </View>

            {/* Field Block Module: TikTok */}
            <View style={styles.inputLayoutContainerGroup}>
              <Text style={styles.premiumFieldLabelMicro}>TIKTOK CHANNEL</Text>
              <View style={[styles.inlineInputWithIconWrapper, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}>
                <View style={styles.leftIconPrefixFrame}>
                  <FontAwesome6 name="tiktok" size={scale(13)} color="rgba(255,255,255,0.4)" />
                </View>
                <TextInput
                  style={[styles.luxuryTextInputInstance, { color: darkTheme.colors.textMain }]}
                  value={tiktok}
                  onChangeText={setTiktok}
                  placeholder="https://www.tiktok.com/salon/"
                  placeholderTextColor={darkTheme.colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="url"
                  selectionColor={darkTheme.colors.accent}
                />
              </View>
            </View>

            {/* Master Submission Workflow Operational Trigger Button */}
            <TouchableOpacity 
              style={[styles.masterFinishActionBtnNode, { backgroundColor: darkTheme.colors.accent }]}
              activeOpacity={0.85}
              onPress={handleFinishConfiguration}
            >
              <Text style={styles.masterFinishActionBtnText}>Finish</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentTrack: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
    paddingTop: verticalScale(12),
  },
  internalFormFieldsEnclosure: {
    width: "100%",
  },
  premiumFieldLabelMicro: {
    fontSize: scale(9.5),
    fontWeight: "800",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 0.5,
    marginBottom: verticalScale(6),
    textTransform: "uppercase",
  },
  inputLayoutContainerGroup: {
    width: "100%",
    marginBottom: verticalScale(14),
  },
  inlineInputWithIconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: scale(38),
    borderRadius: scale(4),
    borderWidth: 1,
    overflow: "hidden",
  },
  leftIconPrefixFrame: {
    width: scale(36),
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.03)",
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  luxuryTextInputInstance: {
    flex: 1,
    height: "100%",
    paddingHorizontal: scale(12),
    fontSize: scale(13),
    fontWeight: "400",
  },
  masterFinishActionBtnNode: {
    width: "100%",
    height: scale(38),
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  masterFinishActionBtnText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: scale(12),
  },
});

export default SocialLinks;
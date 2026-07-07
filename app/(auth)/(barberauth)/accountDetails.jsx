import React, { useState } from "react";
import {
  Keyboard,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import PhoneInput from "@linhnguyen96114/react-native-phone-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";

import { CalendarIcon, LeftArrowIcon } from "../../../constants/icons";
import i18n from "../../src/localization/i18n";
import { darkTheme } from "../../../constants/appTheme";

const AccountDetails = () => {
  const baseContent = i18n.t("auth.barberauth.accountDetails");
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [calenderModal, setCalenderModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState("");

  const handleAccountDetail = () => {
    router.push("/signupotp");
  };

  const formatDate = (d) => {
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1,
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  const onChange = (event, selected) => {
    if (Platform.OS === "android") {
      setCalenderModal(false);
      if (selected) {
        setDate(selected);
        setSelectedDate(formatDate(selected));
      }
    } else {
      if (selected) setDate(selected);
    }
  };

  const onDoneIOS = () => {
    setSelectedDate(formatDate(date));
    setCalenderModal(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: darkTheme.colors.background }]}>
        
        {/* Back navigation header layout anchor */}
        <View style={styles.backRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: scale(10) }}>
            <TouchableOpacity
              onPress={() => router.push("/")}
              style={[
                styles.homeIcon,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                },
              ]}
            >
              <LeftArrowIcon size={20} color={darkTheme.colors.textMain} />
            </TouchableOpacity>
            <Text style={[darkTheme.typography.bodyMuted]}>Back to home</Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.skipBtn,
              { 
                backgroundColor: darkTheme.colors.card,
                borderRadius: darkTheme.layout.borderRadiusSmall,
              },
            ]}
            activeOpacity={0.8}
          >
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.accent }]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wrapper}>
          <View style={{ gap: verticalScale(6) }}>
            <Text style={[darkTheme.typography.headerTitle, styles.title]}>
              {baseContent.header}
            </Text>
            <Text style={[darkTheme.typography.headerSubtitle, styles.subtitle]}>
              {baseContent.subHeader}
            </Text>
          </View>

          {/* Name Input Group */}
          <View style={styles.inputGroup}>
            <Text style={[darkTheme.typography.inputLabel]}>
              {baseContent.nameInput.header}
            </Text>
            <TextInput
              placeholder={baseContent.nameInput.placeholder}
              value={name}
              onChangeText={setName}
              placeholderTextColor={darkTheme.colors.textMuted}
              selectionColor={darkTheme.colors.accent}
              style={[
                styles.textInput,
                darkTheme.typography.bodyMain,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                  height: darkTheme.layout.componentHeight,
                },
              ]}
            />
          </View>

          {/* Phone Input Group */}
          <View style={styles.inputGroup}>
            <Text style={[darkTheme.typography.inputLabel]}>
              {baseContent.mobileNumber.header}
            </Text>
            <PhoneInput
              defaultValue={value}
              defaultCode="GB"
              onChangeText={setValue}
              disableArrowIcon
              withDarkTheme={true}
              containerStyle={[
                styles.phoneContainer,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                  height: darkTheme.layout.componentHeight,
                },
              ]}
              textContainerStyle={{
                backgroundColor: "transparent",
                paddingVertical: 0,
              }}
              textInputStyle={[
                darkTheme.typography.bodyMain,
                { height: "100%" }
              ]}
              codeTextStyle={{
                color: darkTheme.colors.textMain,
              }}
            />
          </View>

          {/* Gender Selector Group */}
          <View style={styles.inputGroup}>
            <Text style={[darkTheme.typography.inputLabel]}>
              {baseContent.genderDropdown.header}
            </Text>

            <View style={styles.genderRow}>
              {["Male", "Female", "Other"].map((item) => {
                const isSelected = gender === item;
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setGender(item)}
                    activeOpacity={0.8}
                    style={[
                      styles.genderBox,
                      {
                        borderColor: isSelected ? darkTheme.colors.accent : darkTheme.colors.border,
                        backgroundColor: darkTheme.colors.card,
                        borderRadius: darkTheme.layout.borderRadiusMedium,
                      },
                    ]}
                  >
                    <Text style={{ fontSize: scale(16) }}>
                      {item === "Male" ? "👨" : item === "Female" ? "👩" : "⚧"}
                    </Text>
                    <Text style={isSelected ? [darkTheme.typography.bodyMain, { color: darkTheme.colors.accent, fontWeight: "600" }] : [darkTheme.typography.bodyMuted]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Date Of Birth Picker Group */}
          <View style={styles.inputGroup}>
            <Text style={[darkTheme.typography.inputLabel]}>
              {baseContent.dateOfBirth.header}
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.textInput,
                {
                  justifyContent: "center",
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                  height: darkTheme.layout.componentHeight,
                },
              ]}
              onPress={() => setCalenderModal(true)}
            >
              <Text
                style={[
                  darkTheme.typography.bodyMain,
                  { color: selectedDate ? darkTheme.colors.textMain : darkTheme.colors.textMuted },
                ]}
              >
                {selectedDate || baseContent.dateOfBirth.placeholder}
              </Text>

              <CalendarIcon
                size={18}
                color={darkTheme.colors.textMuted}
                style={{ position: "absolute", right: scale(14) }}
              />
            </TouchableOpacity>
          </View>

          {/* Form Action Submit Button */}
          <TouchableOpacity onPress={handleAccountDetail} activeOpacity={0.8}>
            <LinearGradient
              colors={[darkTheme.colors.accent, darkTheme.colors.accent]}
              style={[
                styles.button,
                {
                  borderRadius: darkTheme.layout.borderRadiusMedium,
                  height: darkTheme.layout.buttonHeight,
                },
              ]}
            >
              <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
                {baseContent.mobileNumber.update}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Calendar Picker Framework Overlay (iOS) */}
        {Platform.OS === "ios" && (
          <Modal transparent visible={calenderModal} animationType="fade">
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setCalenderModal(false)}
            >
              <View style={[styles.modalBox, { backgroundColor: darkTheme.colors.card }]}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="inline"
                  onChange={onChange}
                  themeVariant="dark"
                  accentColor={darkTheme.colors.accent}
                />

                <TouchableOpacity onPress={onDoneIOS} activeOpacity={0.8}>
                  <LinearGradient
                    colors={[darkTheme.colors.accent, darkTheme.colors.accent]}
                    style={[
                      styles.button,
                      {
                        borderRadius: darkTheme.layout.borderRadiusMedium,
                        height: darkTheme.layout.buttonHeight,
                      },
                    ]}
                  >
                    <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
                      Done
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        )}

        {/* Android DatePicker Instance trigger */}
        {Platform.OS === "android" && calenderModal && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={onChange}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    gap: verticalScale(18),
    marginTop: verticalScale(40),
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: scale(14),
    marginTop: verticalScale(8),
  },
  phoneContainer: {
    width: "100%",
    borderWidth: 1,
    marginTop: verticalScale(8),
    paddingLeft: scale(6),
  },
  genderRow: {
    flexDirection: "row",
    gap: scale(10),
    marginTop: verticalScale(8),
  },
  genderBox: {
    flex: 1,
    paddingVertical: verticalScale(10),
    borderWidth: 1,
    alignItems: "center",
    gap: verticalScale(4),
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    padding: scale(16),
    width: "90%",
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: Platform.OS === "ios" ? verticalScale(50) : verticalScale(30),
    left: scale(16),
    right: scale(16),
    zIndex: 10,
  },
  homeIcon: {
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  skipBtn: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
    alignItems: "center",
    justifyContent: "center",
  },
});
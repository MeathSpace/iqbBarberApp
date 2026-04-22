import PhoneInput from "@linhnguyen96114/react-native-phone-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import ThemeSafeAreaView from "../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../components/ThemeTextPrimary";
import ThemeTextSecondary from "../../../components/ThemeTextSecondary";
import { CalendarIcon, LeftArrowIcon } from "../../../constants/icons";
import i18n from "../../src/localization/i18n";

const AccountDetails = () => {
  const baseContent = i18n.t("auth.adminauth.accountDetails");

  const router = useRouter();
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [calenderModal, setCalenderModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState("");

  const handleAccountDetail = () => {
    // router.push("/(admin)/createSalon");
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
      <ThemeSafeAreaView style={styles.container}>
        <View style={styles.backRow}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: scale(10),
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/")}
              style={[
                styles.homeIcon,
                { backgroundColor: colors.background.color2 },
              ]}
            >
              <LeftArrowIcon size={20} color={colors.textColor.color3} />
            </TouchableOpacity>
            <ThemeTextSecondary>Back to home</ThemeTextSecondary>
          </View>
          <TouchableOpacity
            style={[
              styles.skipBtn,
              { backgroundColor: colors.background.color4 },
            ]}
          >
            <ThemeTextSecondary style={{ color: colors.textColor.color3 }}>
              Skip
            </ThemeTextSecondary>
          </TouchableOpacity>
        </View>

        <View style={styles.wrapper}>
          <View style={{ gap: verticalScale(6) }}>
            <ThemeTextPrimary style={styles.title}>
              {baseContent.header}
            </ThemeTextPrimary>
            <ThemeTextSecondary style={styles.subtitle}>
              {baseContent.subHeader}
            </ThemeTextSecondary>
          </View>

          <View style={styles.inputGroup}>
            <ThemeTextPrimary style={styles.label}>
              {baseContent.nameInput.header}
            </ThemeTextPrimary>
            <TextInput
              placeholder={baseContent.nameInput.placeholder}
              value={name}
              onChangeText={setName}
              placeholderTextColor={colors.textColor.color5}
              style={[
                styles.input,
                {
                  borderColor: colors.borderColor.color1,
                  backgroundColor: colors.background.color3,
                  color: colors.textColor.color1,
                },
              ]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemeTextPrimary style={styles.label}>
              {baseContent.mobileNumber.header}
            </ThemeTextPrimary>

            <PhoneInput
              defaultValue={value}
              defaultCode="GB"
              onChangeText={setValue}
              disableArrowIcon
              withDarkTheme={colorScheme === "dark"}
              containerStyle={[
                styles.phoneContainer,
                {
                  backgroundColor: colors.background.color3,
                  borderColor: colors.borderColor.color1,
                },
              ]}
              textContainerStyle={{
                backgroundColor: "transparent",
                paddingVertical: 0,
              }}
              textInputStyle={{
                color: colors.textColor.color1,
                fontFamily: "AirbnbCereal_W_Md",
                height: verticalScale(40),
              }}
              codeTextStyle={{
                color: colors.textColor.color1,
              }}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemeTextPrimary style={styles.label}>
              {baseContent.genderDropdown.header}
            </ThemeTextPrimary>

            <View style={styles.genderRow}>
              {["Male", "Female", "Other"].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setGender(item)}
                  style={[
                    styles.genderBox,
                    {
                      borderColor:
                        gender === item ? colors.borderColor.color1 : "#ddd",
                      backgroundColor:
                        gender === item ? colors.background.color4 : "#fff",
                    },
                  ]}
                >
                  {/* ICON (using placeholder emoji, replace with your icons) */}
                  <ThemeTextPrimary style={{ fontSize: scale(16) }}>
                    {item === "Male" ? "👨" : item === "Female" ? "👩" : "⚧"}
                  </ThemeTextPrimary>

                  <ThemeTextSecondary>{item}</ThemeTextSecondary>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemeTextPrimary style={styles.label}>
              {baseContent.dateOfBirth.header}
            </ThemeTextPrimary>

            <TouchableOpacity
              style={[
                styles.input,
                {
                  justifyContent: "center",
                  borderColor: colors.borderColor.color1,
                  backgroundColor: colors.background.color3,
                },
              ]}
              onPress={() => setCalenderModal(true)}
            >
              <ThemeTextPrimary
                style={{
                  color: selectedDate
                    ? colors.textColor.color1
                    : colors.textColor.color5,
                }}
              >
                {selectedDate || baseContent.dateOfBirth.placeholder}
              </ThemeTextPrimary>

              <CalendarIcon
                size={20}
                style={{ position: "absolute", right: 12 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleAccountDetail}>
            <LinearGradient
              colors={[
                colors.button.typeOne.linearOne,
                colors.button.typeOne.linearTwo,
              ]}
              style={styles.button}
            >
              <ThemeTextPrimary style={styles.buttonText}>
                {baseContent.mobileNumber.update}
              </ThemeTextPrimary>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {Platform.OS === "ios" && (
          <Modal transparent visible={calenderModal}>
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setCalenderModal(false)}
            >
              <View
                style={[
                  styles.modalBox,
                  {
                    backgroundColor: colors.background.color3,
                  },
                ]}
              >
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="inline"
                  onChange={onChange}
                  accentColor={colors.textColor.color3}
                />

                <TouchableOpacity onPress={onDoneIOS}>
                  <LinearGradient
                    colors={[
                      colors.button.typeOne.linearOne,
                      colors.button.typeOne.linearTwo,
                    ]}
                    style={styles.button}
                  >
                    <ThemeTextPrimary style={styles.buttonText}>
                      Done
                    </ThemeTextPrimary>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        )}

        {Platform.OS === "android" && calenderModal && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={onChange}
            accentColor={colors.textColor.color3}
          />
        )}
      </ThemeSafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(10),
  },

  wrapper: {
    flex: 1,
    justifyContent: "center",
    gap: verticalScale(18),
  },

  title: {
    fontSize: scale(20),
    lineHeight: verticalScale(28),
    fontFamily: "AirbnbCereal_W_Bd",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
  },

  inputGroup: {
    gap: verticalScale(8),
  },

  label: {},

  input: {
    borderWidth: 1,
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    fontFamily: "AirbnbCereal_W_Md",
    fontSize: scale(14),
  },

  phoneContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: scale(10),
    height: verticalScale(48),
    justifyContent: "center",
  },

  genderRow: {
    flexDirection: "row",
    gap: scale(10),
  },

  genderBox: {
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: scale(10),
    borderWidth: 1,
    alignItems: "center",
    gap: verticalScale(4),
  },

  button: {
    paddingVertical: verticalScale(14),
    borderRadius: scale(12),
    alignItems: "center",
    marginTop: verticalScale(10),
  },

  buttonText: {
    color: "#fff",
    fontFamily: "AirbnbCereal_W_Bd",
    fontSize: scale(16),
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    borderRadius: scale(12),
    padding: scale(12),
    width: "90%",
  },

  doneBtn: {
    marginTop: verticalScale(10),
    padding: verticalScale(10),
    borderRadius: scale(8),
    alignItems: "center",
  },

  backRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: scale(10),
    position: "absolute",
    top: verticalScale(45),
    left: scale(15),
  },

  homeIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
  },

  skipBtn: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
  },
});

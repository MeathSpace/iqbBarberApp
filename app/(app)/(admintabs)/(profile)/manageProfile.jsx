import PhoneInput from '@linhnguyen96114/react-native-phone-input';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Modal, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ThemeSafeAreaView from '../../../../components/ThemeSafeAreaView';
import ThemeTextPrimary from '../../../../components/ThemeTextPrimary';
import ThemeTextSecondary from '../../../../components/ThemeTextSecondary';
import { CalendarIcon, CameraIcon, CheckIcon, DownIcon, LeftIcon } from '../../../../constants/icons';

const manageProfile = () => {

    const router = useRouter()
    const { colors } = useTheme()
    const colorScheme = useColorScheme();

    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [dob, setDob] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")

    const [genderDropdown, setGenderDropdown] = useState(false)

    const [date, setDate] = useState(new Date());
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const [calenderModal, setCalenderModal] = useState(false);

    const [tempDate, setTempDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        // setCalenderModal(false);
        if (Platform.OS === "android") {
            if (event.type === "set" && selectedDate) {
                setDate(new Date(selectedDate));
                setDateOfBirthError("");

                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
                const day = String(selectedDate.getDate()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day}`;

                setSelectedDate(formattedDate);
            }

            setCalenderModal(false);
        } else {
            // IOS CODE AND SAVE IN TEMO DATE
            if (selectedDate) {
                setTempDate(selectedDate);
            }

        }

    };

    const onDoneIOS = () => {
        setDate(tempDate);
        setSelectedDate(formatDate(tempDate));
        setDateOfBirthError("");
        setCalenderModal(false);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const ddmmformatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const [value, setValue] = useState('');

    const handleAccountDetail = () => {
        router.push("/(barbertabs)/(home)")
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
                setGenderDropdown(false)
            }}>
            <ThemeSafeAreaView
                style={{
                    paddingHorizontal: scale(15),
                    paddingTop: scale(15)
                }}
                edges={['top', 'left', 'right']}
            >
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: scale(10)
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            router.back()
                        }}>
                        <LeftIcon color={colors.textColor1} size={scale(18)}/>
                    </TouchableOpacity>
                    <ThemeTextPrimary style={{
                        flex: 1,
                        fontSize: scale(18),
                        fontFamily: "AirbnbCereal_W_XBd",
                    }}>Manage Account</ThemeTextPrimary>
                </View>

                <ScrollView
                    contentContainerStyle={{ paddingBottom: verticalScale(30), marginTop: verticalScale(10) }}
                    showsVerticalScrollIndicator={false}
                >

                    <View
                        style={{
                            marginHorizontal: "auto"
                        }}
                    >
                        <View
                            style={{
                                position: "relative",
                                // iOS shadow
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 6.84,

                                // Android shadow
                                elevation: 8,
                            }}
                        >
                            <Image
                                style={{
                                    height: scale(90),
                                    width: scale(90),
                                    borderRadius: scale(90),
                                    borderWidth: scale(3),
                                    borderColor: colors.borderColor1,


                                }}
                                source={{ uri: "https://img.freepik.com/premium-vector/hand-drawn-profile-icon-avatar-character_884500-33561.jpg" }}
                                // placeholder={{ blurhash }}
                                contentFit="cover"
                                transition={300}
                            />


                            <TouchableOpacity
                                // disabled={uploadImageLoader}
                                style={{
                                    position: "absolute",
                                    bottom: moderateScale(0),
                                    right: moderateScale(-6),
                                    backgroundColor: "#14b8a6",
                                    padding: scale(6),
                                    borderRadius: moderateScale(20),
                                    borderWidth: scale(3),
                                    borderColor: colors.borderColor1
                                }}
                            // onPress={pickImage}
                            >
                                <CameraIcon color={"#fff"} size={moderateScale(16)} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        gap: verticalScale(5),
                        marginVertical: verticalScale(10),
                        marginHorizontal: "auto"
                    }}>
                        <ThemeTextPrimary style={{
                            textAlign: "center",
                            fontSize: scale(18),
                            fontFamily: "AirbnbCereal_W_XBd",
                        }}>Sagnik Nandy</ThemeTextPrimary>
                        <ThemeTextSecondary style={{
                            textAlign: "center",
                        }}>sagniknandy@example.com</ThemeTextSecondary>
                    </View>


                    <View style={{
                        flex: 1,
                        gap: verticalScale(20)
                    }}>
                        <View style={{ gap: verticalScale(10) }}>
                            <ThemeTextPrimary>Name</ThemeTextPrimary>
                            <TextInput
                                editable
                                placeholder="Enter your name"
                                value={name}
                                onChangeText={setName}
                                placeholderTextColor={colors.textColor2}
                                style={[styles.inputField, {
                                    backgroundColor: colors.inputColor,
                                    borderColor: colors.borderColor1,
                                    color: colors.textColor1
                                }]}
                            />
                        </View>

                        <View style={{ gap: verticalScale(10), position: "relative" }}>
                            <ThemeTextPrimary>Gender</ThemeTextPrimary>

                            <TouchableOpacity
                                onPress={() => setGenderDropdown((prev) => !prev)}
                                style={[styles.passwordInputContainer, {
                                    backgroundColor: colors.inputColor,
                                    borderColor: colors.borderColor1
                                }]}>
                                <TextInput
                                    editable
                                    placeholder="Select your gender"
                                    value={gender}
                                    placeholderTextColor={colors.textColor2}
                                    style={[styles.inputField, {
                                        flex: 1,
                                        borderWidth: scale(0),
                                        color: colors.textColor1
                                    }]}
                                    readOnly
                                    pointerEvents="none"
                                />
                                <View style={styles.dropdownIcon}>
                                    <DownIcon size={scale(20)} color="#777" />
                                </View>
                            </TouchableOpacity>

                            {
                                genderDropdown && (
                                    <View style={[styles.dropdownContainer, {
                                        backgroundColor: colors.inputColor,
                                        borderColor: colors.borderColor1,
                                        color: colors.textColor1
                                    }]}>
                                        <TouchableOpacity onPress={() => {
                                            setGender("Male")
                                            setGenderDropdown(false)
                                        }}><View style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                                <ThemeTextPrimary>Male</ThemeTextPrimary>
                                                {
                                                    gender === "Male" && <CheckIcon color="#14b8a6" />
                                                }
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {
                                            setGender("Female")
                                            setGenderDropdown(false)
                                        }}><View style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                                <ThemeTextPrimary>Female</ThemeTextPrimary>
                                                {
                                                    gender === "Female" && <CheckIcon color="#14b8a6" />
                                                }
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {
                                            setGender("Other")
                                            setGenderDropdown(false)
                                        }}><View style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                                <ThemeTextPrimary>Other</ThemeTextPrimary>
                                                {
                                                    gender === "Other" && <CheckIcon color="#14b8a6" />
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </View>

                        <View style={{ gap: verticalScale(10), position: "relative" }}>
                            <ThemeTextPrimary>Date of Birth (Optional)</ThemeTextPrimary>

                            <TouchableOpacity
                                style={[
                                    false ? styles.inputFielderror : styles.inputDateField,
                                    {
                                        fontFamily: "AirbnbCereal_W_Md",
                                        borderWidth: scale(1),
                                        backgroundColor: colors.inputColor,
                                        borderColor: colors.borderColor1,
                                        color: colors.text,
                                        justifyContent: "center", // Ensures CalendarIcon stays aligned
                                    }
                                ]}
                                onPress={() => {
                                    setSelectedDate("")
                                    setDateOfBirthError("")
                                    setCalenderModal(true)
                                }}
                            >
                                {!calenderModal && !selectedDate && <ThemeTextPrimary style={{ fontSize: scale(14), color: colors.textColor2 }}>DD/MM/YYYY</ThemeTextPrimary>}
                                {!calenderModal && selectedDate && <ThemeTextPrimary>{ddmmformatDate(selectedDate)}</ThemeTextPrimary>}
                                <CalendarIcon style={[styles.dateIcon, { color: colors.text }]} size={scale(22)} />
                            </TouchableOpacity>


                            {
                                Platform.OS === "android" ? (
                                    calenderModal && (
                                        <View style={{ position: "absolute", top: verticalScale(34), left: 0, zIndex: 100 }}>
                                            <DateTimePicker
                                                mode="date"
                                                maximumDate={new Date()}
                                                value={date}
                                                display="default"
                                                accentColor={"#14b8a6"}
                                                onChange={onChange}
                                            />
                                        </View>
                                    )
                                ) : (
                                    <Modal
                                        transparent={true}
                                        visible={calenderModal}
                                    >
                                        <TouchableOpacity
                                            onPress={() => setCalenderModal(false)}
                                            style={{
                                                flex: 1,
                                                backgroundColor: "rgba(0,0,0, 0.8)",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                position: "relative",
                                                padding: scale(20)
                                            }}
                                        >
                                            <View
                                                style={{
                                                    backgroundColor: colors.background,
                                                    borderColor: colors.border,
                                                    borderWidth: scale(1),
                                                    padding: scale(10),
                                                    borderRadius: scale(10),
                                                    // iOS shadow
                                                    shadowColor: "#000",
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2,
                                                    },
                                                    shadowOpacity: 0.1,
                                                    shadowRadius: 4,
                                                }}
                                            >
                                                <DateTimePicker
                                                    mode="date"
                                                    maximumDate={new Date()}
                                                    value={date}
                                                    display="inline"
                                                    accentColor={'#14b8a6'}
                                                    onChange={onChange}
                                                />
                                                <View
                                                    style={{

                                                        gap: scale(10),
                                                        marginTop: verticalScale(16),
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        justifyContent: "space-between"
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setCalenderModal(false)
                                                        }}
                                                        style={{
                                                            height: verticalScale(40),
                                                            borderRadius: scale(4),
                                                            flex: 1,
                                                            marginHorizontal: "auto",
                                                            backgroundColor: "#ef4444",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <ThemeTextPrimary style={{ color: "#fff" }}>Close</ThemeTextPrimary>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={onDoneIOS}
                                                        style={{
                                                            height: verticalScale(40),
                                                            borderRadius: scale(4),
                                                            flex: 1,
                                                            marginHorizontal: "auto",
                                                            backgroundColor: '#14b8a6',
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                    ><ThemeTextPrimary style={{ color: "#fff" }}>Done</ThemeTextPrimary>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>


                                        </TouchableOpacity>
                                    </Modal>
                                )
                            }

                        </View>

                        <View style={{ gap: verticalScale(10) }}>
                            <ThemeTextPrimary>Mobile Number</ThemeTextPrimary>
                            <PhoneInput
                                defaultValue={value}
                                defaultCode="GB"
                                onChangeText={setValue}
                                disableArrowIcon
                                withDarkTheme={colorScheme === 'dark' ? true : false}
                                containerStyle={{
                                    width: '100%',
                                    borderRadius: scale(8),
                                    backgroundColor: colors.inputColor,
                                    borderColor: colors.borderColor1,
                                    borderWidth: scale(1),
                                    height: verticalScale(40),
                                    color: colors.textColor1,
                                }}
                                textContainerStyle={{
                                    borderRadius: scale(8),
                                    backgroundColor: colors.inputColor,
                                    color: colors.textColor1,

                                }}
                                flagButtonStyle={{
                                    width: scale(50),
                                    height: verticalScale(38),
                                }}
                                textInputStyle={{
                                    fontFamily: 'AirbnbCereal_W_Md',
                                    color: colors.textColor1,
                                }}
                                // Add this prop to style the dial code (+44)
                                codeTextStyle={{
                                    fontFamily: 'AirbnbCereal_W_Md',
                                    color: colors.textColor1,

                                }}
                            />

                        </View>

                        <TouchableOpacity
                            onPress={handleAccountDetail}
                            style={styles.accountButton}
                        >
                            <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
                                Edit & Save
                            </ThemeTextPrimary>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </ThemeSafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default manageProfile

const styles = StyleSheet.create({
    inputField: {
        borderWidth: scale(1),
        borderRadius: scale(8),
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(12),
        fontSize: scale(14),
        fontFamily: 'AirbnbCereal_W_Md',
    },
    passwordInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: scale(1),
        borderRadius: scale(8),
    },
    dropdownIcon: {
        padding: scale(8),
    },

    dropdownContainer: {
        position: "absolute",
        top: verticalScale(80),
        left: scale(0),
        right: scale(0),
        borderWidth: scale(1),
        borderRadius: scale(8),
        padding: scale(12),
        flexDirection: "column",
        gap: verticalScale(12),
        zIndex: 100
    },
    inputDateField: {
        height: verticalScale(40),
        borderRadius: scale(8),
        // borderWidth: moderateScale(1.5),
        paddingHorizontal: scale(10),
        fontSize: moderateScale(14),
        position: "relative"
    },
    dateIcon: {
        position: "absolute",
        right: scale(5),
    },
    accountButton: {
        backgroundColor: "#14b8a6",
        paddingVertical: verticalScale(12),
        borderRadius: scale(8),
        marginTop: verticalScale(20),
    },
    accountButton: {
        backgroundColor: "#14b8a6",
        paddingVertical: verticalScale(12),
        borderRadius: scale(8),
    },
})
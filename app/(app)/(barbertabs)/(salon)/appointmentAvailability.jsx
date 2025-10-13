import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import ThemeSafeAreaView from '../../../../components/ThemeSafeAreaView';
import ThemeTextPrimary from '../../../../components/ThemeTextPrimary';
import ThemeTextSecondary from '../../../../components/ThemeTextSecondary';
import { LeftIcon } from '../../../../constants/icons';

const appointmentAvailability = () => {

    const { colors } = useTheme();
    const router = useRouter()

    const [appointmentDays, setAppointmentDays] = useState([
        {
            day: "Monday",
            select: false
        },
        {
            day: "Tuesday",
            select: false
        },
        {
            day: "Wednesday",
            select: false
        },
        {
            day: "Thursday",
            select: false
        },
        {
            day: "Friday",
            select: false
        },
        {
            day: "Saturday",
            select: false
        },
        {
            day: "Sunday",
            select: false
        },
    ])

    const [isOnline, setIsOnline] = useState(true);

    return (
        <ThemeSafeAreaView
            style={{
                paddingHorizontal: scale(10),
                backgroundColor: colors.background2
            }}
            edges={['top', 'left', 'right']}
        >
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: scale(5)
            }}>
                <TouchableOpacity
                    onPress={() => {
                        router.back()
                    }}>
                    <LeftIcon color={colors.textColor1} size={scale(16)} />
                </TouchableOpacity>
                <ThemeTextPrimary style={{ fontSize: scale(18), fontFamily: "AirbnbCereal_W_XBd" }}>Appointment Availability</ThemeTextPrimary>
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: verticalScale(30), marginTop: verticalScale(10) }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    gap: verticalScale(5)
                }}>
                    <ThemeTextPrimary style={{ fontFamily: "AirbnbCereal_W_Bd" }}>Set Your Days</ThemeTextPrimary>
                    <ThemeTextSecondary>Choose which days you are available for appointments.</ThemeTextSecondary>
                </View>

                <View style={{
                    backgroundColor: colors.background,
                    borderWidth: scale(1),
                    borderColor: colors.borderColor1,
                    borderRadius: scale(10),
                    marginTop: verticalScale(10)
                }}>
                    {
                        appointmentDays.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        height: verticalScale(50),
                                        paddingHorizontal: scale(12),
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderBottomWidth: index === appointmentDays.length - 1 ? 0 : scale(1),
                                        borderBottomColor: index === appointmentDays.length - 1 ? "transparent" : colors.borderColor1,
                                    }}
                                >
                                    <ThemeTextPrimary>{item.day}</ThemeTextPrimary>

                                    {/* Center Switch manually */}
                                    <View style={{ justifyContent: "center" }}>
                                        <Switch
                                            value={item.select}
                                            onValueChange={() => {
                                                setAppointmentDays((prev) =>
                                                    prev.map((date) =>
                                                        date.day === item.day ? { ...date, select: !item.select } : date
                                                    )
                                                );
                                            }}
                                            thumbColor={item.select ? "#fff" : "#cbd5e1"}
                                            trackColor={{ false: "#e2e8f0", true: "#14b8a6" }}
                                            style={{ transform: [{ scale: 0.9 }] }} // optional: make it slightly smaller
                                        />
                                    </View>
                                </View>

                            )
                        })
                    }

                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#14b8a6",
                        paddingVertical: verticalScale(12),
                        borderRadius: scale(8),
                        marginTop: verticalScale(20),
                    }}
                >
                    <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
                        Save Changes
                    </ThemeTextPrimary>
                </TouchableOpacity>
            </ScrollView>
        </ThemeSafeAreaView>
    )
}

export default appointmentAvailability

const styles = StyleSheet.create({})
import { useTheme } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import ThemeSafeAreaView from '../../../components/ThemeSafeAreaView'
import ThemeTextPrimary from '../../../components/ThemeTextPrimary'
import ThemeTextSecondary from '../../../components/ThemeTextSecondary'

const signupotp = () => {

    const [otp, setOtp] = useState("")

    const router = useRouter()
    const { colors } = useTheme()

    const handleSignOtp = () => {
        router.push("/accountDetails")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemeSafeAreaView
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View style={{
                    width: "90%",
                    flexDirection: "column",
                    gap: verticalScale(20)
                }}>
                    {/* Header Text */}
                    <View>
                        <ThemeTextPrimary style={{
                            fontSize: scale(28),
                            fontFamily: 'AirbnbCereal_W_Bd',
                        }}>Enter OTP</ThemeTextPrimary>
                        <ThemeTextSecondary style={{
                            marginTop: verticalScale(5),
                        }}>We've sent a 4-digit code to your email to verify your account.</ThemeTextSecondary>
                    </View>

                    {/* Email Input */}
                    <View style={{ gap: verticalScale(10) }}>
                        <ThemeTextPrimary>Verification Code</ThemeTextPrimary>
                        <TextInput
                            editable
                            placeholder="Enter your otp"
                            value={otp}
                            onChangeText={setOtp}
                            placeholderTextColor={colors.textColor2}
                            style={[styles.inputField, {
                                backgroundColor: colors.inputColor,
                                borderColor: colors.borderColor1,
                                color: colors.textColor1
                            }]}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSignOtp}
                        style={styles.signUpOtpButton}
                    >
                        <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
                            Verify
                        </ThemeTextPrimary>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <ThemeTextSecondary style={{ textAlign: "center", fontSize: scale(16) }}>Didn't receive the code? <ThemeTextPrimary style={{ color: '#14b8a6' }}>Resend</ThemeTextPrimary></ThemeTextSecondary>
                    </TouchableOpacity>

                </View>
            </ThemeSafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default signupotp

const styles = StyleSheet.create({
    inputField: {
        borderWidth: scale(1),
        borderRadius: scale(8),
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(12),
        fontSize: scale(14),
        fontFamily: 'AirbnbCereal_W_Md',
    },

    signUpOtpButton: {
        backgroundColor: "#14b8a6",
        paddingVertical: verticalScale(12),
        borderRadius: scale(8),
    },
})
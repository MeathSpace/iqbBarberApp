import { useTheme } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Keyboard, Pressable, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import ThemeSafeAreaView from '../../../components/ThemeSafeAreaView'
import ThemeTextPrimary from '../../../components/ThemeTextPrimary'
import ThemeTextSecondary from '../../../components/ThemeTextSecondary'
import { EyeIcon, EyeOffIcon } from '../../../constants/icons'

const SignIn = () => {

    const router = useRouter()

    const [email, setEmail] = useState('demo@email.com')
    const [password, setPassword] = useState('123456')
    const [showPassword, setShowPassword] = useState(false)

    const handleSignIn = () => {
        console.log("Email:", email)
        console.log("Password:", password)
    }

    const { colors } = useTheme()

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
                        }}>Admin Login</ThemeTextPrimary>
                        <ThemeTextSecondary style={{
                            marginTop: verticalScale(5),
                        }}>Welcome back! Please enter your details.</ThemeTextSecondary>
                    </View>

                    {/* Email Input */}
                    <View style={{ gap: verticalScale(10) }}>
                        <ThemeTextPrimary>Email</ThemeTextPrimary>
                        <TextInput
                            editable
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            style={[styles.inputField, {
                                backgroundColor: colors.inputColor,
                                borderColor: colors.borderColor1,
                                color: colors.textColor1
                            }]}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={{ gap: verticalScale(10) }}>
                        <ThemeTextPrimary>Password</ThemeTextPrimary>
                        <View style={[styles.passwordInputContainer, {
                            backgroundColor: colors.inputColor,
                            borderColor: colors.borderColor1
                        }]}>
                            <TextInput
                                editable
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                style={[styles.inputField, {
                                    flex: 1,
                                    borderWidth: scale(0),
                                    color: colors.textColor1
                                }]}
                            />
                            <Pressable
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                {showPassword ? (
                                    <EyeOffIcon size={20} color="#777" />
                                ) : (
                                    <EyeIcon size={20} color="#777" />
                                )}
                            </Pressable>
                        </View>
                    </View>

                    {/* Dummy Sign In Button */}
                    <TouchableOpacity
                        onPress={handleSignIn}
                        style={styles.signInButton}
                    >
                        <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
                            Sign In
                        </ThemeTextPrimary>
                    </TouchableOpacity>

                    <View style={styles.divider}>
                        <View style={{ flex: 1, height: verticalScale(0.5), backgroundColor: colors.textColor2 }} />

                        <View style={{ paddingHorizontal: scale(10) }}>
                            <ThemeTextPrimary style={{ color: colors.text }}>or</ThemeTextPrimary>
                        </View>

                        <View style={{ flex: 1, height: verticalScale(0.5), backgroundColor: colors.textColor2 }} />
                    </View>

                    <TouchableOpacity
                        onPress={handleSignIn}
                        style={[styles.googleSignInButton, {
                            borderColor: colors.borderColor1
                        }]}
                    >
                        <ThemeTextPrimary style={{ textAlign: "center" }}>
                            Google Sign In
                        </ThemeTextPrimary>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/signup")}>
                        <ThemeTextSecondary style={{ textAlign: "center", fontSize: scale(16) }}>Don't have an account ?<ThemeTextPrimary style={{ color: '#14b8a6' }}> Sign up</ThemeTextPrimary></ThemeTextSecondary>
                    </TouchableOpacity>
                </View>
            </ThemeSafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SignIn

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
    eyeIcon: {
        padding: scale(8),
    },
    signInButton: {
        backgroundColor: "#14b8a6",
        paddingVertical: verticalScale(12),
        borderRadius: scale(8),
        marginTop: verticalScale(20),
    },

    googleSignInButton: {
        backgroundColor: "#ffffff",
        paddingVertical: verticalScale(12),
        borderRadius: scale(8),
        borderWidth: scale(1)
    },

    divider: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
})

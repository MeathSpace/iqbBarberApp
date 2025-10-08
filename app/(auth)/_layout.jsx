import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const AuthLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(adminauth)" />
            <Stack.Screen name="(barberauth)" />
        </Stack>
    )
}

export default AuthLayout

const styles = StyleSheet.create({})
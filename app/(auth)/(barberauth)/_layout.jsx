import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const BarberAuthLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signin" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="signupotp" />
            <Stack.Screen name="accountDetails" />
        </Stack>
    )
}

export default BarberAuthLayout

const styles = StyleSheet.create({})
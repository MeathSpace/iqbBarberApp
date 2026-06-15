import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const BarberLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="createBarber" />
        </Stack>
    )
}

export default BarberLayout

const styles = StyleSheet.create({})
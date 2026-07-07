import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const AppointmentLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}

export default AppointmentLayout

const styles = StyleSheet.create({})
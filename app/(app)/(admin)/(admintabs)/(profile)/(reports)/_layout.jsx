import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const ReportLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="appointmentReport" />
            <Stack.Screen name="queueReport" />
        </Stack>
    )
}

export default ReportLayout

const styles = StyleSheet.create({})
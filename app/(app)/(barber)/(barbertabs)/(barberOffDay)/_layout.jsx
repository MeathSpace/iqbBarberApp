import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const BarberOffDayLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}

export default BarberOffDayLayout

const styles = StyleSheet.create({})
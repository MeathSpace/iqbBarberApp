import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const BarberAuthLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signin" />
        </Stack>
    )
}

export default BarberAuthLayout

const styles = StyleSheet.create({})
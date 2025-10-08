import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const SalonLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}

export default SalonLayout

const styles = StyleSheet.create({})
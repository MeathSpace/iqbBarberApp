import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const SalonLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="createSalon" />
            <Stack.Screen name="editSalon" />
            <Stack.Screen name="(createSteps)" />
            <Stack.Screen name="(editSteps)" />
        </Stack>
    )
}

export default SalonLayout

const styles = StyleSheet.create({})
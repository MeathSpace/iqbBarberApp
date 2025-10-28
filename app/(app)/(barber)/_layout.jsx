import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

// **THIS IS WHERE YOU ADD THE AUTH CHECK**

const BarberLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(barbertabs)" />
        </Stack>
    )
}

export default BarberLayout

const styles = StyleSheet.create({})
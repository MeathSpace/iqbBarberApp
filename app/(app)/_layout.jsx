import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

// **THIS IS WHERE YOU ADD THE AUTH CHECK**

const AppLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
        </Stack>
    )
}

export default AppLayout

const styles = StyleSheet.create({})
import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const ProfileLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="manageProfile" />
        </Stack>
    )
}

export default ProfileLayout

const styles = StyleSheet.create({})
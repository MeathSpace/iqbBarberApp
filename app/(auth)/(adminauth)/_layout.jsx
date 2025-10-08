import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const AdminAuthLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signin" />
        </Stack>
    )
}

export default AdminAuthLayout

const styles = StyleSheet.create({})
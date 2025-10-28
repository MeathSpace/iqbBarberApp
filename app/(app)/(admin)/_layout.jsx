import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

// **THIS IS WHERE YOU ADD THE AUTH CHECK**

const AdminLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(admintabs)" />
            <Stack.Screen name="createSalon" />
            <Stack.Screen name="createSalonForm" />
        </Stack>
    )
}

export default AdminLayout

const styles = StyleSheet.create({})
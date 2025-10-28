import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const HomeLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}

export default HomeLayout

const styles = StyleSheet.create({})
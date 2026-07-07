import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const QueueLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}

export default QueueLayout

const styles = StyleSheet.create({})
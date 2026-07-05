import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const CreateSalonSteps = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="businessInformation" />
            <Stack.Screen name="gallery" />
        </Stack>
    )
}

export default CreateSalonSteps

const styles = StyleSheet.create({})
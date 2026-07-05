import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const CreateBarberSteps = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="basicInfo" />
            <Stack.Screen name="selectServices" />
        </Stack>
    )
}

export default CreateBarberSteps

const styles = StyleSheet.create({})
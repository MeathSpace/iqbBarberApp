import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const signin = () => {

    const router = useRouter()

    return (
        <SafeAreaView>
            <Text>User Signin</Text>
            <TouchableOpacity onPress={() => router.push("/home")}>
                <Text>Sign in</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default signin

const styles = StyleSheet.create({})
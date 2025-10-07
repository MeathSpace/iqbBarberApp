import { Tabs } from 'expo-router'
import { StyleSheet, Text } from 'react-native'

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    // Set as the initial tab if no other is specified
                    tabBarIcon: () => <Text>🏠</Text>
                }}
            />
        </Tabs>
    )
}

export default TabLayout

const styles = StyleSheet.create({})
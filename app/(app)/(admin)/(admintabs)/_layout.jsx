import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale, verticalScale } from 'react-native-size-matters'
import { HomeIcon, ProfileIcon, QueueIcon } from '../../../../constants/icons'

const AdminTabLayout = () => {
    const insets = useSafeAreaInsets()

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    paddingBottom: insets.bottom + verticalScale(8), // dynamically adjust for system nav
                    paddingTop: verticalScale(8),
                    height: verticalScale(65) + insets.bottom,
                },
                tabBarLabelStyle: {
                    fontSize: scale(9),
                    fontFamily: 'AirbnbCereal_W_Md',
                    marginBottom: verticalScale(5),
                },
                tabBarActiveTintColor: '#14b8a6',
            }}
        >
            <Tabs.Screen
                name="(home)"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                }}
            />

            <Tabs.Screen
                name="(queue)"
                options={{
                    title: 'Queue',
                    tabBarIcon: ({ color }) => <QueueIcon color={color} />,
                }}
            />

            <Tabs.Screen
                name="(profile)"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
                }}
            />

        </Tabs>
    )
}

export default AdminTabLayout


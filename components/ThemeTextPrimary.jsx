import { useTheme } from '@react-navigation/native'
import { StyleSheet, Text } from 'react-native'
import { scale } from 'react-native-size-matters'

const ThemeTextPrimary = ({ style, children, ...props }) => {

    const { colors } = useTheme()

    return (
        <Text style={[styles.defaultText, { color: colors.textColor1 }, style]} {...props}>
            {children}
        </Text>
    )
}

export default ThemeTextPrimary

const styles = StyleSheet.create({
    defaultText: {
        fontSize: scale(16),
        fontFamily: 'AirbnbCereal_W_Md',
        textDecorationLine: 'none',
    },
})
import { useTheme } from '@react-navigation/native'
import { StyleSheet, Text } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'

const ThemeTextSecondary = ({ style, children, ...props }) => {

    const { colors } = useTheme()

    return (
        <Text style={[styles.defaultText, { color: colors.textColor2 }, style]} {...props}>
            {children}
        </Text>
    )
}

export default ThemeTextSecondary

const styles = StyleSheet.create({
    defaultText: {
        fontSize: scale(14),
        fontFamily: 'AirbnbCereal_W_Md',
        textDecorationLine: 'none',
    },
})
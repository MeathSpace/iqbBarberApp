import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ThemeSafeAreaView = ({ children, style, ...props }) => {

    const { colors } = useTheme()

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }, style]} {...props}>
            {children}
        </SafeAreaView>
    );
};

export default ThemeSafeAreaView;

const styles = StyleSheet.create({
    // Add a base style to make sure the SafeAreaView covers the whole screen
    container: {
        flex: 1,
    },
});
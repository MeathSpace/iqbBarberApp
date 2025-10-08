import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ThemeSafeAreaView = ({ children, style, edges, ...props }) => {

    const { colors } = useTheme()

    return (
        <SafeAreaView
            edges={edges || ['top', 'bottom', 'left', 'right']}
            style={[styles.container, { backgroundColor: colors.background }, style]} {...props}>
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
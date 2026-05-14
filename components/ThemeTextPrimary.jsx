import { StyleSheet, Text } from "react-native";
import { scale } from "react-native-size-matters";
import appTheme from "../constants/appTheme";

const ThemeTextPrimary = ({ style, children, ...props }) => {
  const colors = appTheme?.colors;

  return (
    <Text
      style={[styles.defaultText, { color: colors.textColor.color1 }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ThemeTextPrimary;

const styles = StyleSheet.create({
  defaultText: {
    fontSize: scale(16),
    fontFamily: "AirbnbCereal_W_Md",
    textDecorationLine: "none",
  },
});

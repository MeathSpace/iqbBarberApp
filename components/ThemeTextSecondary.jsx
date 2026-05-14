import { StyleSheet, Text } from "react-native";
import { scale } from "react-native-size-matters";
import appTheme from "../constants/appTheme";

const ThemeTextSecondary = ({ style, children, ...props }) => {
  const colors = appTheme?.colors;

  return (
    <Text
      style={[styles.defaultText, { color: colors.textColor.color2 }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ThemeTextSecondary;

const styles = StyleSheet.create({
  defaultText: {
    fontSize: scale(14),
    fontFamily: "AirbnbCereal_W_Md",
    textDecorationLine: "none",
  },
});

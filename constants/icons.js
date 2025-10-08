import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";

export const EyeIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <Ionicons name="eye" size={size} color={color} style={style} />
);

export const EyeOffIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <Ionicons name="eye-off" size={size} color={color} style={style} />
);
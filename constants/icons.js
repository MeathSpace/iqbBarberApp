import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";

export const EyeIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <Ionicons name="eye" size={size} color={color} style={style} />
);

export const EyeOffIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <Ionicons name="eye-off" size={size} color={color} style={style} />
);

export const DownIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <Entypo name="chevron-down" size={size} color={color} style={style} />
);

export const CheckIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <Feather name="check" size={size} color={color} style={style} />
);

export const CalendarIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <Feather name="calendar" size={size} color={color} style={style} />
);


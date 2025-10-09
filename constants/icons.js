import { AntDesign, Entypo, Feather, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
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
    <Ionicons name="calendar-outline" size={size} color={color} style={style} />
);


export const HomeIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <Ionicons name="home-outline" size={size} color={color} style={style} />
);

export const QueueIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <Ionicons name="grid-outline" size={size} color={color} style={style} />
);

export const SalonIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <Ionicons name="storefront-outline" size={size} color={color} style={style} />
);

export const ProfileIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <Feather name="user" size={size} color={color} style={style} />
);

export const NotificationIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <MaterialIcons name="notifications-none" size={size} color={color} style={style} />
);

export const WifiIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <AntDesign name="wifi" size={size} color={color} style={style} />
);

export const LocationIcon = ({ size = moderateScale(24), color = 'black', style }) => (
    <FontAwesome5 name="map-marker-alt" size={size} color={color} style={style} />
);
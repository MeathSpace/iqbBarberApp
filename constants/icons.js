import React from "react";
import {
  AntDesign,
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";

// Premium thin stroke thickness preset for Feather icons
const STROKE = 1.5; 

export const EyeIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="eye-outline" size={size} color={color} style={style} />;

export const EyeOffIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="eye-off-outline" size={size} color={color} style={style} />;

export const DragIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <MaterialCommunityIcons name="drag-vertical" size={size} color={color} style={style} />;

export const StarIcon = ({
  size = moderateScale(18),
  color = "#FF9500",
  style,
}) => <Ionicons name="star" size={size} color={color} style={style} />;

export const DownIcon = ({
  size = moderateScale(18),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="chevron-down-outline" size={size} color={color} style={style} />;

export const BarberIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="people-outline" size={size} color={color} style={style} />;

export const CheckIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Feather name="check" size={size} color={color} strokeWidth={STROKE} style={style} />;

export const CheckCircleIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="checkmark-circle-outline" size={size} color={color} style={style} />;

export const CalendarIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="calendar-outline" size={size} color={color} style={style} />;

export const HomeIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="home-outline" size={size} color={color} style={style} />;

export const QueueIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="copy-outline" size={size} color={color} style={style} />;

export const SalonIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="business-outline" size={size} color={color} style={style} />;

export const ProfileIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="person-outline" size={size} color={color} style={style} />;

export const NotificationIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="notifications-outline" size={size} color={color} style={style} />;

export const WifiIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Feather name="wifi" size={size} color={color} strokeWidth={STROKE} style={style} />;

export const LocationIcon = ({
  size = moderateScale(20),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="location-outline" size={size} color={color} style={style} />;

export const RightIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="chevron-forward-outline" size={size} color={color} style={style} />;

export const LeftIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="chevron-back-outline" size={size} color={color} style={style} />;

export const LeftArrowIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="arrow-back-outline" size={size} color={color} style={style} />;

export const CameraIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="camera-outline" size={size} color={color} style={style} />;

export const ReportIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="bar-chart-outline" size={size} color={color} style={style} />;

export const HelpSupportIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="help-circle-outline" size={size} color={color} style={style} />;

export const AboutIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="information-circle-outline" size={size} color={color} style={style} />;

export const ContactIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="call-outline" size={size} color={color} style={style} />;

export const MapIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="map-outline" size={size} color={color} style={style} />;

export const FacebookIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Feather name="facebook" size={size} color={color} strokeWidth={STROKE} style={style} />;

export const InstagramIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Feather name="instagram" size={size} color={color} strokeWidth={STROKE} style={style} />;

export const TiktokIcon = ({
  size = moderateScale(20),
  color = "#FFFFFF",
  style,
}) => <AntDesign name="tiktok" size={size} color={color} style={style} />;

export const WebIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="globe-outline" size={size} color={color} style={style} />;

export const XIcon = ({ 
  size = moderateScale(20), 
  color = "#FFFFFF", 
  style 
}) => <FontAwesome6 name="x-twitter" size={size} color={color} style={style} />;

export const WhatsappIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <FontAwesome6 name="whatsapp" size={size} color={color} style={style} />;

export const EmailIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="mail-outline" size={size} color={color} style={style} />;

export const ScissorIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Feather name="scissors" size={size} color={color} strokeWidth={STROKE} style={style} />;

export const CrownIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="trophy-outline" size={size} color={color} style={style} />;

export const CrossCircleIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="close-circle-outline" size={size} color={color} style={style} />;

export const DeleteIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="trash-outline" size={size} color={color} style={style} />;

export const HistoryIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="time-outline" size={size} color={color} style={style} />;

export const PaymentIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="wallet-outline" size={size} color={color} style={style} />;

export const PaymentHistoryIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="receipt-outline" size={size} color={color} style={style} />;

export const SettingsIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <Ionicons name="settings-outline" size={size} color={color} style={style} />;

export const MenuIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <MaterialIcons name="menu-open" size={size} color={color} style={style} />;

export const AdvertisementIcon = ({
  size = moderateScale(22),
  color = "#FFFFFF",
  style,
}) => <MaterialCommunityIcons name="advertisements" size={size} color={color} style={style} />;
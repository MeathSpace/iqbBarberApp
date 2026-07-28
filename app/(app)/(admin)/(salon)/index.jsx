// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import Shimmer from "react-native-modern-shimmer";

// import Header from "../../../../components/Header/Header";
// import { darkTheme } from "../../../../constants/appTheme";
// import { LocationIcon } from "../../../../constants/icons";
// import { useAdminAuth } from "../../../../context/admin/AuthContext";
// import api from "../../../../utils/api";

// // Palette theme tokens for modern shimmer skeleton
// const SKELETON_PALETTE = {
//   banner: { baseColor: "#221f1c", highlightColor: "#332e2a" },
//   button: { baseColor: "#2a2a2a", highlightColor: "#333333" },
//   card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
//   text: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
// };

// // --- Full Screen Skeleton View Component ---
// const ScreenSkeletonView = () => {
//   return (
//     <SafeAreaView
//       edges={["top", "right", "left"]}
//       style={[
//         styles.container,
//         { backgroundColor: darkTheme.colors.background },
//       ]}
//     >
//       <Header
//         title={"Salon"}
//         subTitle={"Manage your barbershop locations"}
//       />

//       <View style={styles.scrollContainer}>
//         {/* Create Button Skeleton */}
//         <Shimmer
//           style={styles.addButtonSkeleton}
//           baseColor={SKELETON_PALETTE.button.baseColor}
//           highlightColor={SKELETON_PALETTE.button.highlightColor}
//         />

//         {/* List of Skeleton Cards */}
//         {[1, 2, 3].map((key) => (
//           <View key={key} style={styles.skeletonCard}>
//             {/* Header Row Mirror */}
//             <View style={styles.cardHeaderRow}>
//               <Shimmer
//                 style={styles.logoSkeleton}
//                 baseColor={SKELETON_PALETTE.card.baseColor}
//                 highlightColor={SKELETON_PALETTE.card.highlightColor}
//               />
//               <View style={styles.headerTitleGroup}>
//                 <Shimmer
//                   style={styles.titleLineSkeleton}
//                   baseColor={SKELETON_PALETTE.text.baseColor}
//                   highlightColor={SKELETON_PALETTE.text.highlightColor}
//                 />
//                 <Shimmer
//                   style={styles.emailLineSkeleton}
//                   baseColor={SKELETON_PALETTE.text.baseColor}
//                   highlightColor={SKELETON_PALETTE.text.highlightColor}
//                 />
//               </View>
//               <Shimmer
//                 style={styles.gearSkeleton}
//                 baseColor={SKELETON_PALETTE.card.baseColor}
//                 highlightColor={SKELETON_PALETTE.card.highlightColor}
//               />
//             </View>

//             {/* Address Row Mirror */}
//             <Shimmer
//               style={styles.addressLineSkeleton}
//               baseColor={SKELETON_PALETTE.text.baseColor}
//               highlightColor={SKELETON_PALETTE.text.highlightColor}
//             />

//             {/* Footer Row Mirror */}
//             <Shimmer
//               style={styles.footerLineSkeleton}
//               baseColor={SKELETON_PALETTE.text.baseColor}
//               highlightColor={SKELETON_PALETTE.text.highlightColor}
//             />

//             {/* Bottom Status Indicators Mirror */}
//             <View style={styles.statusContainer}>
//               {[1, 2, 3].map((index) => (
//                 <View key={index} style={styles.statusItem}>
//                   <Shimmer
//                     style={styles.circleStatusSkeleton}
//                     baseColor={SKELETON_PALETTE.card.baseColor}
//                     highlightColor={SKELETON_PALETTE.card.highlightColor}
//                   />
//                   <Shimmer
//                     style={styles.labelStatusSkeleton}
//                     baseColor={SKELETON_PALETTE.text.baseColor}
//                     highlightColor={SKELETON_PALETTE.text.highlightColor}
//                   />
//                 </View>
//               ))}
//             </View>
//           </View>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// };

// // --- Main Salons Screen Component ---
// const SalonsScreen = () => {
//   const router = useRouter();
//   const { authenticatedUser } = useAdminAuth();

//   // API State structure
//   const [salonsState, setSalonsState] = useState({
//     loading: true,
//     data: [],
//   });

//   useEffect(() => {
//     fetchSalons();
//   }, []);

//   const fetchSalons = async () => {
//     setSalonsState({ loading: true, data: [] });
//     try {
//       const { data } = await api.post("/admin/getAllSalonsByAdmin", {
//         adminEmail: authenticatedUser?.email,
//       });

//       setSalonsState({
//         loading: false,
//         data: data?.salons || [],
//       });
//     } catch (error) {
//       console.error("Error fetching salons:", error);
//       setSalonsState({ loading: false, data: [] });
//     }
//   };

//   // Component-Level State Gate
//   if (salonsState.loading) {
//     return <ScreenSkeletonView />;
//   }

//   const renderSalonCard = ({ item: salon }) => {
//     const logoUrl =
//       salon.salonLogo?.[0]?.url ||
//       "https://res.cloudinary.com/dpynxkjfq/image/upload/v1720532593/depositphotos_247872612-stock-illustration-no-image-available-icon-vector_fhytrg.jpg";

//     const formattedAddress = [salon.address, salon.city, salon.country]
//       .filter(Boolean)
//       .join(", ");

//     const phoneText = salon.contactTel
//       ? `+${salon.mobileCountryCode || "91"} ${salon.contactTel}`
//       : null;

//     const isOnline = Boolean(salon.isOnline);
//     const isAppointments = Boolean(salon.isAppointments);
//     const isQueuing = Boolean(salon.isQueuing);

//     return (
//       <View
//         style={[
//           styles.salonCard,
//           {
//             backgroundColor: darkTheme.colors.card,
//             borderColor: darkTheme.colors.border,
//           },
//         ]}
//       >
//         {/* Header Row: Logo, Name & Email, Settings Gear */}
//         <View style={styles.cardHeaderRow}>
//           <Image source={{ uri: logoUrl }} style={styles.salonLogo} />

//           <View style={styles.headerTitleGroup}>
//             <Text style={darkTheme.typography.cardTitle}>
//               {salon.salonName}
//             </Text>
//             {salon.salonEmail ? (
//               <Text style={darkTheme.typography.bodyMuted} numberOfLines={1}>
//                 {salon.salonEmail}
//               </Text>
//             ) : null}
//           </View>

//           <TouchableOpacity style={styles.gearButton} activeOpacity={0.7}>
//             <Ionicons
//               name="settings-outline"
//               size={scale(18)}
//               color={darkTheme.colors.textMuted || "#A1A1AA"}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Info Row: Location Icon & Address */}
//         <View style={styles.infoRow}>
//           <LocationIcon
//             size={scale(13)}
//             color={darkTheme.colors.textMuted}
//             style={styles.infoIcon}
//           />
//           <Text style={darkTheme.typography.bodyMuted} numberOfLines={1}>
//             {formattedAddress || "No address provided"}
//           </Text>
//         </View>

//         {/* Footer Row: Phone Number & Services Count */}
//         <View style={styles.cardFooterRow}>
//           {phoneText ? (
//             <Text style={darkTheme.typography.bodyMuted}>{phoneText}</Text>
//           ) : null}
//           {phoneText ? <Text style={styles.metaSeparator}>•</Text> : null}
//           <Text style={darkTheme.typography.bodyMuted}>
//             {salon.services?.filter((s) => !s.isDeleted).length || 0} Services
//           </Text>
//         </View>

//         {/* Status Indicators: Online, Appointment, Queue */}
//         <View style={styles.statusContainer}>
//           {/* Online/Offline Status */}
//           <View style={styles.statusItem}>
//             <View
//               style={[
//                 styles.iconCircle,
//                 {
//                   backgroundColor: isOnline
//                     ? "rgba(16, 185, 129, 0.15)"
//                     : "rgba(244, 63, 94, 0.12)",
//                   borderColor: isOnline ? "#10B981" : "#F43F5E",
//                 },
//               ]}
//             >
//               <Feather
//                 name={isOnline ? "wifi" : "wifi-off"}
//                 size={scale(15)}
//                 color={isOnline ? "#10B981" : "#F43F5E"}
//               />
//             </View>
//             <Text
//               style={[
//                 styles.statusLabel,
//                 { color: isOnline ? "#10B981" : "#F43F5E" },
//               ]}
//             >
//               {isOnline ? "Online" : "Offline"}
//             </Text>
//           </View>

//           {/* Appointment Status */}
//           <View style={styles.statusItem}>
//             <View
//               style={[
//                 styles.iconCircle,
//                 {
//                   backgroundColor: isAppointments
//                     ? "rgba(16, 185, 129, 0.15)"
//                     : "rgba(39, 39, 42, 0.6)",
//                   borderColor: isAppointments ? "#10B981" : "#3F3F46",
//                 },
//               ]}
//             >
//               <Ionicons
//                 name="calendar-outline"
//                 size={scale(15)}
//                 color={isAppointments ? "#10B981" : "#71717A"}
//               />
//             </View>
//             <Text
//               style={[
//                 styles.statusLabel,
//                 { color: isAppointments ? "#10B981" : "#A1A1AA" },
//               ]}
//             >
//               Appointment
//             </Text>
//           </View>

//           {/* Queue Status */}
//           <View style={styles.statusItem}>
//             <View
//               style={[
//                 styles.iconCircle,
//                 {
//                   backgroundColor: isQueuing
//                     ? "rgba(16, 185, 129, 0.15)"
//                     : "rgba(244, 63, 94, 0.12)",
//                   borderColor: isQueuing ? "#10B981" : "#F43F5E",
//                 },
//               ]}
//             >
//               <Ionicons
//                 name={isQueuing ? "people" : "people-outline"}
//                 size={scale(15)}
//                 color={isQueuing ? "#10B981" : "#F43F5E"}
//               />
//             </View>
//             <Text
//               style={[
//                 styles.statusLabel,
//                 { color: isQueuing ? "#10B981" : "#F43F5E" },
//               ]}
//             >
//               Queue
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView
//       edges={["top", "right", "left"]}
//       style={[
//         styles.container,
//         { backgroundColor: darkTheme.colors.background },
//       ]}
//     >
//       <Header
//         title={"Salon"}
//         subTitle={"Manage your barbershop locations"}
//       />

//       <FlatList
//         data={salonsState.data}
//         renderItem={renderSalonCard}
//         keyExtractor={(item) => item._id || String(item.salonId)}
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={
//           <TouchableOpacity
//             style={[
//               styles.addButton,
//               {
//                 backgroundColor: darkTheme.colors.accent,
//                 height: darkTheme.layout.buttonHeight,
//               },
//             ]}
//             activeOpacity={0.8}
//             onPress={() => {
//               router.push("/createSalon");
//             }}
//           >
//             <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
//               Add new Salon
//             </Text>
//           </TouchableOpacity>
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={darkTheme.typography.bodyMuted}>
//               No salons found.
//             </Text>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// export default SalonsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     paddingHorizontal: darkTheme.layout.paddingHorizontal,
//     paddingBottom: verticalScale(24),
//   },
//   addButton: {
//     width: "100%",
//     borderRadius: darkTheme.layout.borderRadiusMedium,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: verticalScale(20),
//   },
//   emptyContainer: {
//     alignItems: "center",
//     marginTop: verticalScale(40),
//   },
//   salonCard: {
//     borderWidth: 1,
//     borderRadius: darkTheme.layout.borderRadiusLarge,
//     padding: scale(16),
//     marginBottom: verticalScale(14),
//   },
//   cardHeaderRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: verticalScale(8),
//   },
//   salonLogo: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: scale(20),
//     backgroundColor: "#262626",
//     marginRight: scale(10),
//   },
//   headerTitleGroup: {
//     flex: 1,
//   },
//   gearButton: {
//     padding: scale(4),
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: verticalScale(2),
//     marginBottom: verticalScale(6),
//   },
//   infoIcon: {
//     marginRight: scale(4),
//   },
//   cardFooterRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: verticalScale(12),
//   },
//   metaSeparator: {
//     color: "#48484A",
//     marginHorizontal: scale(8),
//     fontSize: scale(12),
//   },
//   statusContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingTop: verticalScale(12),
//     borderTopWidth: 1,
//     borderTopColor: "rgba(255, 255, 255, 0.08)",
//   },
//   statusItem: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   iconCircle: {
//     width: scale(38),
//     height: scale(38),
//     borderRadius: scale(19),
//     borderWidth: 1.5,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: verticalScale(4),
//   },
//   statusLabel: {
//     fontSize: scale(10),
//     fontWeight: "600",
//   },

//   // --- Skeleton Specific Mirror Styles ---
//   addButtonSkeleton: {
//     width: "100%",
//     height: darkTheme.layout.buttonHeight || verticalScale(44),
//     borderRadius: darkTheme.layout.borderRadiusMedium || scale(8),
//     marginBottom: verticalScale(20),
//   },
//   skeletonCard: {
//     backgroundColor: darkTheme.colors.card || "#1C1C1E",
//     borderColor: darkTheme.colors.border || "#2C2C2E",
//     borderWidth: 1,
//     borderRadius: darkTheme.layout.borderRadiusLarge || scale(12),
//     padding: scale(16),
//     marginBottom: verticalScale(14),
//   },
//   logoSkeleton: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: scale(20),
//     marginRight: scale(10),
//   },
//   titleLineSkeleton: {
//     width: "60%",
//     height: verticalScale(14),
//     borderRadius: scale(4),
//     marginBottom: verticalScale(6),
//   },
//   emailLineSkeleton: {
//     width: "40%",
//     height: verticalScale(10),
//     borderRadius: scale(4),
//   },
//   gearSkeleton: {
//     width: scale(18),
//     height: scale(18),
//     borderRadius: scale(9),
//   },
//   addressLineSkeleton: {
//     width: "80%",
//     height: verticalScale(11),
//     borderRadius: scale(4),
//     marginVertical: verticalScale(8),
//   },
//   footerLineSkeleton: {
//     width: "50%",
//     height: verticalScale(10),
//     borderRadius: scale(4),
//     marginBottom: verticalScale(12),
//   },
//   circleStatusSkeleton: {
//     width: scale(38),
//     height: scale(38),
//     borderRadius: scale(19),
//     marginBottom: verticalScale(4),
//   },
//   labelStatusSkeleton: {
//     width: scale(48),
//     height: verticalScale(9),
//     borderRadius: scale(3),
//   },
// });

import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Shimmer from "react-native-modern-shimmer";

import Header from "../../../../components/Header/Header";
import { darkTheme } from "../../../../constants/appTheme";
import { LocationIcon } from "../../../../constants/icons";
import { useAdminAuth } from "../../../../context/admin/AuthContext";
import api from "../../../../utils/api";

const SKELETON_PALETTE = {
  banner: { baseColor: "#221f1c", highlightColor: "#332e2a" },
  button: { baseColor: "#2a2a2a", highlightColor: "#333333" },
  card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
  text: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
};

// --- Full Screen Skeleton Loader ---
const ScreenSkeletonView = () => {
  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header title={"Salon"} subTitle={"Manage your barbershop locations"} />

      <View style={styles.scrollContainer}>
        <Shimmer
          style={styles.addButtonSkeleton}
          baseColor={SKELETON_PALETTE.button.baseColor}
          highlightColor={SKELETON_PALETTE.button.highlightColor}
        />

        {[1, 2, 3].map((key) => (
          <View key={key} style={styles.skeletonCard}>
            <View style={styles.cardHeaderRow}>
              <Shimmer
                style={styles.logoSkeleton}
                baseColor={SKELETON_PALETTE.card.baseColor}
                highlightColor={SKELETON_PALETTE.card.highlightColor}
              />
              <View style={styles.headerTitleGroup}>
                <Shimmer
                  style={styles.titleLineSkeleton}
                  baseColor={SKELETON_PALETTE.text.baseColor}
                  highlightColor={SKELETON_PALETTE.text.highlightColor}
                />
                <Shimmer
                  style={styles.emailLineSkeleton}
                  baseColor={SKELETON_PALETTE.text.baseColor}
                  highlightColor={SKELETON_PALETTE.text.highlightColor}
                />
              </View>
              <Shimmer
                style={styles.gearSkeleton}
                baseColor={SKELETON_PALETTE.card.baseColor}
                highlightColor={SKELETON_PALETTE.card.highlightColor}
              />
            </View>

            <Shimmer
              style={styles.addressLineSkeleton}
              baseColor={SKELETON_PALETTE.text.baseColor}
              highlightColor={SKELETON_PALETTE.text.highlightColor}
            />

            <Shimmer
              style={styles.footerLineSkeleton}
              baseColor={SKELETON_PALETTE.text.baseColor}
              highlightColor={SKELETON_PALETTE.text.highlightColor}
            />

            <View style={styles.statusContainer}>
              {[1, 2, 3].map((index) => (
                <View key={index} style={styles.statusItem}>
                  <Shimmer
                    style={styles.circleStatusSkeleton}
                    baseColor={SKELETON_PALETTE.card.baseColor}
                    highlightColor={SKELETON_PALETTE.card.highlightColor}
                  />
                  <Shimmer
                    style={styles.labelStatusSkeleton}
                    baseColor={SKELETON_PALETTE.text.baseColor}
                    highlightColor={SKELETON_PALETTE.text.highlightColor}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

// --- Main Component ---
const SalonsScreen = () => {
  const router = useRouter();
  const { authenticatedUser } = useAdminAuth();

  const [salonsState, setSalonsState] = useState({
    loading: true,
    data: [],
  });

  const [expandedSalonId, setExpandedSalonId] = useState(null);

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    setSalonsState({ loading: true, data: [] });
    try {
      const { data } = await api.post("/admin/getAllSalonsByAdmin", {
        adminEmail: authenticatedUser?.email,
      });

      setSalonsState({
        loading: false,
        data: data?.salons || [],
      });
    } catch (error) {
      console.error("Error fetching salons:", error);
      setSalonsState({ loading: false, data: [] });
    }
  };

  const toggleSettings = (salonId) => {
    setExpandedSalonId((prev) => (prev === salonId ? null : salonId));
  };

  if (salonsState.loading) {
    return <ScreenSkeletonView />;
  }

  const renderSalonCard = ({ item: salon }) => {
    const salonId = salon._id || String(salon.salonId);
    const isExpanded = expandedSalonId === salonId;

    const logoUrl =
      salon.salonLogo?.[0]?.url ||
      "https://res.cloudinary.com/dpynxkjfq/image/upload/v1720532593/depositphotos_247872612-stock-illustration-no-image-available-icon-vector_fhytrg.jpg";

    const formattedAddress = [salon.address, salon.city, salon.country]
      .filter(Boolean)
      .join(", ");

    const phoneText = salon.contactTel
      ? `+${salon.mobileCountryCode || "91"} ${salon.contactTel}`
      : null;

    const isOnline = Boolean(salon.isOnline);
    const isAppointments = Boolean(salon.isAppointments);
    const isQueuing = Boolean(salon.isQueuing);

    return (
      <View
        style={[
          styles.salonCard,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: isExpanded
              ? darkTheme.colors.accent || "#FFFFFF"
              : darkTheme.colors.border,
          },
        ]}
      >
        {/* Header Row */}
        <View style={styles.cardHeaderRow}>
          <Image source={{ uri: logoUrl }} style={styles.salonLogo} />

          <View style={styles.headerTitleGroup}>
            <Text style={darkTheme.typography.cardTitle}>
              {salon.salonName}
            </Text>
            {salon.salonEmail ? (
              <Text style={darkTheme.typography.bodyMuted} numberOfLines={1}>
                {salon.salonEmail}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.gearButton}
            activeOpacity={0.7}
            onPress={() => toggleSettings(salonId)}
          >
            <Ionicons
              name={isExpanded ? "settings" : "settings-outline"}
              size={scale(18)}
              color={
                isExpanded
                  ? darkTheme.colors.accent || "#FFFFFF"
                  : darkTheme.colors.textMuted || "#A1A1AA"
              }
            />
          </TouchableOpacity>
        </View>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <LocationIcon
            size={scale(13)}
            color={darkTheme.colors.textMuted}
            style={styles.infoIcon}
          />
          <Text style={darkTheme.typography.bodyMuted} numberOfLines={1}>
            {formattedAddress || "No address provided"}
          </Text>
        </View>

        {/* Footer Row */}
        <View style={styles.cardFooterRow}>
          {phoneText ? (
            <Text style={darkTheme.typography.bodyMuted}>{phoneText}</Text>
          ) : null}
          {phoneText ? <Text style={styles.metaSeparator}>•</Text> : null}
          <Text style={darkTheme.typography.bodyMuted}>
            {salon.services?.filter((s) => !s.isDeleted).length || 0} Services
          </Text>
        </View>

        {/* Distinct Status Indicators */}
        <View style={styles.statusContainer}>
          {/* 1. Online/Offline (Green / Red) */}
          <View style={styles.statusItem}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: isOnline
                    ? "rgba(16, 185, 129, 0.15)"
                    : "rgba(244, 63, 94, 0.12)",
                  borderColor: isOnline ? "#10B981" : "#F43F5E",
                },
              ]}
            >
              <Feather
                name={isOnline ? "wifi" : "wifi-off"}
                size={scale(15)}
                color={isOnline ? "#10B981" : "#F43F5E"}
              />
            </View>
            <Text
              style={[
                styles.statusLabel,
                { color: isOnline ? "#10B981" : "#F43F5E" },
              ]}
            >
              {isOnline ? "Online" : "Offline"}
            </Text>
          </View>

          {/* 2. Appointment Status (Teal / Neutral Muted) */}
          <View style={styles.statusItem}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: isAppointments
                    ? "rgba(6, 182, 212, 0.15)"
                    : "rgba(39, 39, 42, 0.6)",
                  borderColor: isAppointments ? "#06B6D4" : "#3F3F46",
                },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={scale(15)}
                color={isAppointments ? "#06B6D4" : "#71717A"}
              />
            </View>
            <Text
              style={[
                styles.statusLabel,
                { color: isAppointments ? "#06B6D4" : "#A1A1AA" },
              ]}
            >
              Appointment
            </Text>
          </View>

          {/* 3. Queue Status (Indigo / Dark Muted) */}
          <View style={styles.statusItem}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: isQueuing
                    ? "rgba(99, 102, 241, 0.15)"
                    : "rgba(39, 39, 42, 0.6)",
                  borderColor: isQueuing ? "#6366F1" : "#3F3F46",
                },
              ]}
            >
              <Ionicons
                name={isQueuing ? "people" : "people-outline"}
                size={scale(15)}
                color={isQueuing ? "#6366F1" : "#71717A"}
              />
            </View>
            <Text
              style={[
                styles.statusLabel,
                { color: isQueuing ? "#6366F1" : "#A1A1AA" },
              ]}
            >
              Queue
            </Text>
          </View>
        </View>

        {/* Side-by-Side Action Buttons with Fixed Text Overflow */}
        {isExpanded && (
          <View style={styles.settingsActionRow}>
            <TouchableOpacity
              style={styles.actionButtonSecondary}
              activeOpacity={0.8}
              onPress={() => {
                router.push({
                  pathname: "/editSalon",
                  params: { salonId },
                });
              }}
            >
              <Ionicons
                name="create-outline"
                size={scale(13)}
                color="#FFFFFF"
                style={styles.actionBtnIcon}
              />
              <Text style={styles.actionBtnText}>Edit Salon</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButtonPrimary}
              activeOpacity={0.8}
              onPress={() => {
                router.push({
                  pathname: "/appointmentSettings",
                  params: { salonId },
                });
              }}
            >
              <Ionicons
                name="options-outline"
                size={scale(13)}
                color="#000000"
                style={styles.actionBtnIcon}
              />
              <Text
                style={[styles.actionBtnText, { color: "#000000" }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
              >
                Appointments
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[
        styles.container,
        { backgroundColor: darkTheme.colors.background },
      ]}
    >
      <Header title={"Salon"} subTitle={"Manage your barbershop locations"} />

      <FlatList
        data={salonsState.data}
        renderItem={renderSalonCard}
        keyExtractor={(item) => item._id || String(item.salonId)}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <TouchableOpacity
            style={[
              styles.addButton,
              {
                backgroundColor: darkTheme.colors.accent,
                height: darkTheme.layout.buttonHeight,
              },
            ]}
            activeOpacity={0.8}
            onPress={() => {
              router.push("/createSalon");
            }}
          >
            <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>
              Add new Salon
            </Text>
          </TouchableOpacity>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={darkTheme.typography.bodyMuted}>No salons found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default SalonsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(24),
  },
  addButton: {
    width: "100%",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(20),
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: verticalScale(40),
  },
  salonCard: {
    borderWidth: 1,
    borderRadius: darkTheme.layout.borderRadiusLarge,
    padding: scale(14),
    marginBottom: verticalScale(14),
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  salonLogo: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#262626",
    marginRight: scale(10),
  },
  headerTitleGroup: {
    flex: 1,
  },
  gearButton: {
    padding: scale(6),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(2),
    marginBottom: verticalScale(6),
  },
  infoIcon: {
    marginRight: scale(4),
  },
  cardFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  metaSeparator: {
    color: "#48484A",
    marginHorizontal: scale(8),
    fontSize: scale(12),
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: verticalScale(12),
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
  },
  statusItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(4),
  },
  statusLabel: {
    fontSize: scale(10),
    fontWeight: "600",
  },

  // --- Settings Action Buttons Styles ---
  settingsActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    marginTop: verticalScale(12),
    paddingTop: verticalScale(12),
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
  },
  actionButtonSecondary: {
    flex: 1,
    height: verticalScale(36),
    borderRadius: darkTheme.layout.borderRadiusMedium || scale(8),
    backgroundColor: "#27272A",
    borderWidth: 1,
    borderColor: "#3F3F46",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(4),
  },
  actionButtonPrimary: {
    flex: 1,
    height: verticalScale(36),
    borderRadius: darkTheme.layout.borderRadiusMedium || scale(8),
    backgroundColor: darkTheme.colors.accent || "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(4),
  },
  actionBtnIcon: {
    marginRight: scale(3),
  },
  actionBtnText: {
    fontSize: scale(10.5),
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // --- Skeleton Styles ---
  addButtonSkeleton: {
    width: "100%",
    height: darkTheme.layout.buttonHeight || verticalScale(44),
    borderRadius: darkTheme.layout.borderRadiusMedium || scale(8),
    marginBottom: verticalScale(20),
  },
  skeletonCard: {
    backgroundColor: darkTheme.colors.card || "#1C1C1E",
    borderColor: darkTheme.colors.border || "#2C2C2E",
    borderWidth: 1,
    borderRadius: darkTheme.layout.borderRadiusLarge || scale(12),
    padding: scale(16),
    marginBottom: verticalScale(14),
  },
  logoSkeleton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    marginRight: scale(10),
  },
  titleLineSkeleton: {
    width: "60%",
    height: verticalScale(14),
    borderRadius: scale(4),
    marginBottom: verticalScale(6),
  },
  emailLineSkeleton: {
    width: "40%",
    height: verticalScale(10),
    borderRadius: scale(4),
  },
  gearSkeleton: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
  },
  addressLineSkeleton: {
    width: "80%",
    height: verticalScale(11),
    borderRadius: scale(4),
    marginVertical: verticalScale(8),
  },
  footerLineSkeleton: {
    width: "50%",
    height: verticalScale(10),
    borderRadius: scale(4),
    marginBottom: verticalScale(12),
  },
  circleStatusSkeleton: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    marginBottom: verticalScale(4),
  },
  labelStatusSkeleton: {
    width: scale(48),
    height: verticalScale(9),
    borderRadius: scale(3),
  },
});
// import React, { useState } from "react";
// import { FlatList, Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";
// import { Ionicons, Feather } from "@expo/vector-icons";

// import Header from "../../../../components/Header/Header"; // Adjust path as needed
// import { darkTheme } from "../../../../constants/appTheme";

// const SUBSCRIPTION_DATA = [
//   {
//     id: "1",
//     salonName: "Modern Unisex Salon",
//     items: [
//       { id: "s1_1", type: "Queue", status: "Paid", date: "14 Aug, 2027", duration: "519days", action: "Renew" },
//       { id: "s1_2", type: "Appointment", status: "Paid", date: "16 May, 2027", duration: "429days", action: "Renew" }
//     ]
//   },
//   {
//     id: "2",
//     salonName: "Salon 2",
//     items: [
//       { id: "s2_1", type: "Queue", status: "Paid", date: "27 Mar, 2025", duration: "120days", action: "Renew" },
//       { id: "s2_2", type: "Appointment", status: "Select plan", date: "No plan active", duration: "--", action: "Buy" }
//     ]
//   },
//   {
//     id: "3",
//     salonName: "Salon 3",
//     items: [
//       { id: "s3_1", type: "Queue", status: "Free Tier", date: "15 Mar, 2025", duration: "30days", action: "Buy" },
//       { id: "s3_2", type: "Appointment", status: "Paid", date: "30 May, 2025", duration: "489days", action: "Renew" }
//     ]
//   }
// ];

// const SubscriptionsList = () => {
//   const [subscriptions] = useState(SUBSCRIPTION_DATA);

//   const renderSubscriptionCard = ({ item }) => (
//     <View
//       style={[
//         styles.eliteCard,
//         {
//           backgroundColor: darkTheme.colors.card,
//           borderColor: "rgba(255, 255, 255, 0.06)",
//           borderRadius: scale(14),
//         },
//       ]}
//     >
//       {/* Structural Card Top Bar (Salon Identity Group) */}
//       <View style={styles.cardHeader}>
//         <View style={styles.headerLeft}>
//           <View style={[styles.brandCircle, { backgroundColor: "rgba(255, 255, 255, 0.02)", borderColor: darkTheme.colors.border }]}>
//             <Ionicons name="storefront-sharp" size={scale(13)} color={darkTheme.colors.accent} />
//           </View>
//           <View>
//             <Text style={[darkTheme.typography.cardTitle, styles.salonTitle]}>
//               {item.salonName}
//             </Text>
//             <Text style={styles.branchCountText}>
//               Active Management Profile
//             </Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.moreButtonActive}>
//           <Feather name="arrow-up-right" size={scale(14)} color={darkTheme.colors.textMuted} />
//         </TouchableOpacity>
//       </View>

//       {/* Sub-Items Rebuilt into a 10/10 Segmented Sub-Card Grid Matrix */}
//       <View style={styles.subServicesContainer}>
//         {item.items.map((subItem) => {
//           const isPaid = subItem.status === "Paid";
//           const isFree = subItem.status === "Free Tier";
//           const isRenew = subItem.action === "Renew";

//           return (
//             <View
//               key={subItem.id}
//               style={[
//                 styles.luxuryServiceInnerBlock,
//                 { 
//                   backgroundColor: "rgba(0, 0, 0, 0.2)",
//                   borderColor: "rgba(255, 255, 255, 0.04)" 
//                 },
//               ]}
//             >
//               {/* Header inside row: Dynamic Label ID & Action Control */}
//               <View style={styles.innerBlockTopRow}>
//                 <View>
//                   <Text style={styles.innerBlockIdText}>
//                     IQB-{subItem.type.toUpperCase()}-00101
//                   </Text>
//                   <Text style={styles.innerBlockSubLabel}>{subItem.type} Architecture</Text>
//                 </View>

//                 <TouchableOpacity
//                   activeOpacity={0.85}
//                   style={[
//                     styles.gridActionButton,
//                     {
//                       backgroundColor: isRenew ? "rgba(255, 149, 0, 0.08)" : darkTheme.colors.accent,
//                       borderColor: isRenew ? "rgba(255, 149, 0, 0.2)" : "transparent",
//                       borderWidth: isRenew ? 1 : 0,
//                     },
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.gridActionText,
//                       { color: isRenew ? darkTheme.colors.accent : "#000000" },
//                     ]}
//                   >
//                     {subItem.action}
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               {/* 3-Column Metrics Data Grid inspired by Screenshot 2026-07-03 at 2.09.28 PM.jpg */}
//               <View style={styles.innerBlockMetricsGrid}>
//                 <View style={styles.metricColumn}>
//                   <Text style={styles.metricLabelText}>PURCHASED</Text>
//                   <Text style={styles.metricValueText}>13 Mar 2026</Text>
//                 </View>
                
//                 <View style={styles.verticalGridHairline} />

//                 <View style={styles.metricColumn}>
//                   <Text style={styles.metricLabelText}>EXPIRES</Text>
//                   <Text style={styles.metricValueText}>{subItem.date}</Text>
//                 </View>

//                 <View style={styles.verticalGridHairline} />

//                 <View style={styles.metricColumn}>
//                   <Text style={styles.metricLabelText}>DURATION</Text>
//                   <Text style={styles.metricValueText}>{subItem.duration}</Text>
//                 </View>
//               </View>

//               {/* Bottom Metadata & Status Layout Footer */}
//               <View style={styles.innerBlockBottomRow}>
//                 <View style={styles.metaLeftGroup}>
//                   <Text style={styles.metaLabelMicro}>TRANSACTION ID</Text>
//                   <Text style={styles.metaValueMicro} numberOfLines={1}>
//                     pi_3TAuBt6v7Mtr8QXs1P{subItem.id}
//                   </Text>
//                 </View>

//                 <View style={[styles.statusMicroBadge, { backgroundColor: isPaid || isFree ? "rgba(52, 199, 89, 0.08)" : "rgba(255, 59, 48, 0.08)" }]}>
//                   <Text style={[styles.statusBadgeText, { color: isPaid || isFree ? "#34C759" : "#FF3B30" }]}>
//                     {isPaid ? "Paid" : isFree ? "Free" : "Hold"}
//                   </Text>
//                 </View>
//               </View>

//             </View>
//           );
//         })}
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView
//       edges={["top", "right", "left"]}
//       style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
//     >
//       <Header
//         title="Subscriptions"
//         subTitle="Manage active salon plans"
//         showBack={false}
//       />

//       <FlatList
//         data={subscriptions}
//         keyExtractor={(item) => item.id}
//         renderItem={renderSubscriptionCard}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         maxToRenderPerBatch={10}
//         windowSize={5}
//         initialNumToRender={10}
//         removeClippedSubviews={Platform.OS === "android"}
//       />
//     </SafeAreaView>
//   );
// };

// export default SubscriptionsList;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   listContent: {
//     paddingHorizontal: darkTheme.layout.paddingHorizontal,
//     paddingBottom: verticalScale(32),
//     gap: verticalScale(16),
//   },
//   eliteCard: {
//     borderWidth: 1,
//     padding: scale(14),
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.15,
//         shadowRadius: 12,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
//   cardHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: verticalScale(14),
//   },
//   headerLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(10),
//   },
//   brandCircle: {
//     width: scale(32),
//     height: scale(32),
//     borderRadius: scale(8),
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   salonTitle: {
//     fontSize: scale(13.5),
//     fontWeight: "700",
//     letterSpacing: -0.1,
//   },
//   branchCountText: {
//     fontSize: scale(10.5),
//     color: "rgba(255, 255, 255, 0.35)",
//     marginTop: verticalScale(1),
//   },
//   moreButtonActive: {
//     width: scale(26),
//     height: scale(26),
//     borderRadius: scale(6),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   subServicesContainer: {
//     width: "100%",
//     gap: verticalScale(12),
//   },
//   luxuryServiceInnerBlock: {
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: scale(8),
//     padding: scale(12),
//   },
//   innerBlockTopRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     width: "100%",
//   },
//   innerBlockIdText: {
//     color: "#FFFFFF",
//     fontSize: scale(12.5),
//     fontWeight: "700",
//     letterSpacing: 0.1,
//   },
//   innerBlockSubLabel: {
//     color: "rgba(255, 255, 255, 0.35)",
//     fontSize: scale(10.5),
//     marginTop: verticalScale(1),
//   },
//   gridActionButton: {
//     paddingHorizontal: scale(14),
//     height: verticalScale(24),
//     borderRadius: scale(4),
//     justifyContent: "center",
//     alignItems: "center",
//     minWidth: scale(64),
//   },
//   gridActionText: {
//     fontSize: scale(11),
//     fontWeight: "700",
//   },
//   innerBlockMetricsGrid: {
//     flexDirection: "row",
//     width: "100%",
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     marginVertical: verticalScale(10),
//     paddingVertical: verticalScale(8),
//     alignItems: "center",
//   },
//   metricColumn: {
//     flex: 1,
//   },
//   metricLabelText: {
//     color: "rgba(255, 255, 255, 0.3)",
//     fontSize: scale(8.5),
//     fontWeight: "700",
//     letterSpacing: 0.2,
//   },
//   metricValueText: {
//     color: "#FFFFFF",
//     fontSize: scale(11),
//     fontWeight: "600",
//     marginTop: verticalScale(3),
//   },
//   verticalGridHairline: {
//     width: 1,
//     height: verticalScale(16),
//     backgroundColor: "rgba(255, 255, 255, 0.05)",
//     marginHorizontal: scale(6),
//   },
//   innerBlockBottomRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//   },
//   metaLeftGroup: {
//     flex: 1,
//     paddingRight: scale(12),
//   },
//   metaLabelMicro: {
//     color: "rgba(255, 255, 255, 0.3)",
//     fontSize: scale(8),
//     fontWeight: "700",
//     letterSpacing: 0.2,
//   },
//   metaValueMicro: {
//     color: "rgba(255, 255, 255, 0.45)",
//     fontSize: scale(10),
//     fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
//     marginTop: verticalScale(1),
//   },
//   statusMicroBadge: {
//     paddingHorizontal: scale(8),
//     paddingVertical: verticalScale(2),
//     borderRadius: scale(4),
//   },
//   statusBadgeText: {
//     fontSize: scale(9.5),
//     fontWeight: "700",
//   },
// });

import React, { useState, useEffect } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Linking,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import Shimmer from "react-native-modern-shimmer";

import Header from "../../../../components/Header/Header";
import { darkTheme } from "../../../../constants/appTheme";
import api from "../../../../utils/api";
import { useAdminAuth } from "../../../../context/admin/AuthContext";

// Stealth Dark Skeleton Theme Config
const SKELETON_THEME = {
  card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
  header: { baseColor: "#221f1c", highlightColor: "#332e2a" },
  content: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
  button: { baseColor: "#2a2a2a", highlightColor: "#333333" },
};

// Full-Screen Layout Mirroring Skeleton Component
const ScreenSkeletonView = () => {
  return (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((key) => (
        <View key={key} style={styles.skeletonCard}>
          {/* Header Row Mirror */}
          <View style={styles.skeletonHeaderRow}>
            <Shimmer
              width={scale(36)}
              height={scale(36)}
              borderRadius={scale(8)}
              baseColor={SKELETON_THEME.header.baseColor}
              highlightColor={SKELETON_THEME.header.highlightColor}
            />
            <View style={styles.skeletonHeaderTextGroup}>
              <Shimmer
                width={scale(140)}
                height={verticalScale(14)}
                borderRadius={scale(4)}
                baseColor={SKELETON_THEME.content.baseColor}
                highlightColor={SKELETON_THEME.content.highlightColor}
              />
              <Shimmer
                width={scale(100)}
                height={verticalScale(10)}
                borderRadius={scale(4)}
                style={{ marginTop: verticalScale(6) }}
                baseColor={SKELETON_THEME.content.baseColor}
                highlightColor={SKELETON_THEME.content.highlightColor}
              />
            </View>
          </View>

          {/* Sub-Services Block Mirrors */}
          <View style={styles.skeletonSubContainer}>
            {[1, 2].map((subKey) => (
              <View key={subKey} style={styles.skeletonSubBlock}>
                {/* Top Row */}
                <View style={styles.skeletonSubTopRow}>
                  <View>
                    <Shimmer
                      width={scale(110)}
                      height={verticalScale(12)}
                      borderRadius={scale(4)}
                      baseColor={SKELETON_THEME.content.baseColor}
                      highlightColor={SKELETON_THEME.content.highlightColor}
                    />
                    <Shimmer
                      width={scale(80)}
                      height={verticalScale(10)}
                      borderRadius={scale(4)}
                      style={{ marginTop: verticalScale(4) }}
                      baseColor={SKELETON_THEME.content.baseColor}
                      highlightColor={SKELETON_THEME.content.highlightColor}
                    />
                  </View>
                  <Shimmer
                    width={scale(64)}
                    height={verticalScale(24)}
                    borderRadius={scale(4)}
                    baseColor={SKELETON_THEME.button.baseColor}
                    highlightColor={SKELETON_THEME.button.highlightColor}
                  />
                </View>

                {/* Grid Divider */}
                <View style={styles.skeletonGridRow}>
                  <View style={{ flex: 1 }}>
                    <Shimmer
                      width={scale(50)}
                      height={verticalScale(8)}
                      borderRadius={scale(2)}
                      baseColor={SKELETON_THEME.content.baseColor}
                      highlightColor={SKELETON_THEME.content.highlightColor}
                    />
                    <Shimmer
                      width={scale(60)}
                      height={verticalScale(12)}
                      borderRadius={scale(4)}
                      style={{ marginTop: verticalScale(4) }}
                      baseColor={SKELETON_THEME.content.baseColor}
                      highlightColor={SKELETON_THEME.content.highlightColor}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Shimmer
                      width={scale(50)}
                      height={verticalScale(8)}
                      borderRadius={scale(2)}
                      baseColor={SKELETON_THEME.content.baseColor}
                      highlightColor={SKELETON_THEME.content.highlightColor}
                    />
                    <Shimmer
                      width={scale(70)}
                      height={verticalScale(12)}
                      borderRadius={scale(4)}
                      style={{ marginTop: verticalScale(4) }}
                      baseColor={SKELETON_THEME.content.baseColor}
                      highlightColor={SKELETON_THEME.content.highlightColor}
                    />
                  </View>
                </View>

                {/* Footer Row */}
                <View style={styles.skeletonSubBottomRow}>
                  <Shimmer
                    width={scale(70)}
                    height={verticalScale(10)}
                    borderRadius={scale(2)}
                    baseColor={SKELETON_THEME.content.baseColor}
                    highlightColor={SKELETON_THEME.content.highlightColor}
                  />
                  <Shimmer
                    width={scale(40)}
                    height={verticalScale(16)}
                    borderRadius={scale(4)}
                    baseColor={SKELETON_THEME.button.baseColor}
                    highlightColor={SKELETON_THEME.button.highlightColor}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const SubscriptionsList = () => {
  const { authenticatedUser } = useAdminAuth();
  const adminEmail = authenticatedUser?.email;

  // Subscription state
  const [getSubscriptiondata, setGetSubscriptiondata] = useState([]);
  const [getSubscriptionLoading, setGetSubscriptionLoading] = useState(false);

  // Selection states
  const [currentSalonCurrency, setCurrentSalonCurrency] = useState("");
  const [currentSalonisoCurrency, setCurrentSalonisoCurrency] = useState("");
  const [selectedSalonId, setSelectedSalonId] = useState(null);

  const [isQueueClicked, setIsQueueClicked] = useState(false);
  const [isAppointClicked, setIsAppointClicked] = useState(false);

  const [planValidityDate, setPlanValidityDate] = useState(30);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState("Paid");

  const [modalValue, setModalValue] = useState({
    queue: false,
    appointment: false,
  });

  // Track image load errors by salonId
  const [imageErrorMap, setImageErrorMap] = useState({});

  // Fetch subscription data
  useEffect(() => {
    const getSubscriptiondata = async () => {
      try {
        setGetSubscriptionLoading(true);
        const { data } = await api.post("/admin/getAllAdminSalonsSubcriptions", {
          adminEmail,
        });

        setGetSubscriptiondata(data.response || []);
        setGetSubscriptionLoading(false);
      } catch (error) {
        setGetSubscriptionLoading(false);
      }
    };

    if (adminEmail) {
      getSubscriptiondata();
    }
  }, [adminEmail]);

  // Keep validity days synced with paymentType
  useEffect(() => {
    if (paymentType === "Free") {
      setPlanValidityDate(14);
    } else {
      setPlanValidityDate(30);
    }
  }, [paymentType]);

  // Free Payment Handler
  const freePaymentHandler = async () => {
    const productInfo = {
      salonId: selectedSalonId,
      isTrailEnabled: true,
      trailStartDate: new Date(),
      adminEmail: adminEmail,
      paymentType: "Free",
      planValidityDate: planValidityDate,
      products: [
        {
          productName: isQueueClicked ? "Queue" : isAppointClicked ? "Appointment" : "",
          productPrice: isQueueClicked ? 300 : isAppointClicked ? 400 : 0,
          currency: currentSalonCurrency,
          isoCurrencyCode: currentSalonisoCurrency,
        },
      ],
    };

    Alert.alert("Confirmation", "Do you want to start free trial?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await api.post("/salon/salonTrailPeriod", productInfo);
            setPaymentModalOpen(false);
            const { data } = await api.post("/admin/getAllAdminSalonsSubcriptions", {
              adminEmail,
            });
            setGetSubscriptiondata(data.response || []);
          } catch (error) {
            Alert.alert("Error", error?.response?.data?.message || "Something went wrong");
          }
        },
      },
    ]);
  };

  // Paid Stripe Payment Handler
  const paidPaymentHandler = async () => {
    const productInfo = {
      salonId: selectedSalonId,
      isTrailEnabled: false,
      trailStartDate: new Date(),
      adminEmail: adminEmail,
      paymentType: "Paid",
      planValidityDate: planValidityDate,
      products: [
        {
          productName: isQueueClicked ? "Queue" : isAppointClicked ? "Appointment" : "",
          productPrice: isQueueClicked ? 300 : isAppointClicked ? 400 : 0,
          currency: currentSalonCurrency,
          isoCurrencyCode: currentSalonisoCurrency,
        },
      ],
    };

    Alert.alert("Confirmation", "Would you prefer to purchase now?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const response = await api.post("/create-checkout-session", productInfo);

            if (response.data?.session?.url) {
              setPaymentModalOpen(false);
              await Linking.openURL(response.data.session.url);
            } else if (response.data?.session?.id) {
              setPaymentModalOpen(false);
              await Linking.openURL(`https://checkout.stripe.com/pay/${response.data.session.id}`);
            } else {
              Alert.alert("Error", "Invalid checkout session data received");
            }
          } catch (error) {
            Alert.alert("Error", error?.response?.data?.message || "Failed to create checkout session");
          }
        },
      },
    ]);
  };

  const renderSubscriptionCard = ({ item }) => {
    const logoUrl = item?.salonLogo?.[0]?.url;
    const hasImageError = imageErrorMap[item?.salonId];

    return (
      <View
        style={[
          styles.eliteCard,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: "rgba(255, 255, 255, 0.06)",
            borderRadius: scale(14),
          },
        ]}
      >
        {/* Salon Identity Group with Logo */}
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.brandCircle,
                {
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  borderColor: darkTheme.colors.border,
                },
              ]}
            >
              {logoUrl && !hasImageError ? (
                <Image
                  source={{ uri: logoUrl }}
                  style={styles.salonLogoImage}
                  resizeMode="cover"
                  onError={() =>
                    setImageErrorMap((prev) => ({ ...prev, [item?.salonId]: true }))
                  }
                />
              ) : (
                <Ionicons
                  name="storefront-sharp"
                  size={scale(13)}
                  color={darkTheme.colors.accent}
                />
              )}
            </View>
            <View>
              <Text style={[darkTheme.typography.cardTitle, styles.salonTitle]}>
                {item?.salonName}
              </Text>
              <Text style={styles.branchCountText}>Active Management Profile</Text>
            </View>
          </View>
        </View>

        {/* Sub-Items Matrix */}
        <View style={styles.subServicesContainer}>
          {item?.subscriptions?.map((sub, index) => {
            const isPaid = sub?.trial === "Paid";
            const actionText = sub?.bought === "" ? "Buy" : "Renew";

            return (
              <View
                key={index}
                style={[
                  styles.luxuryServiceInnerBlock,
                  {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderColor: "rgba(255, 255, 255, 0.04)",
                  },
                ]}
              >
                <View style={styles.innerBlockTopRow}>
                  <View>
                    <Text style={styles.innerBlockIdText}>
                      IQB-{(sub?.name || "SERVICE").toUpperCase()}-00101
                    </Text>
                    <Text style={styles.innerBlockSubLabel}>{sub?.name} Architecture</Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      setPaymentModalOpen(true);
                      setModalValue({
                        queue: sub?.name === "Queue",
                        appointment: sub?.name === "Appointment",
                      });
                      setCurrentSalonCurrency(item?.currency);
                      setCurrentSalonisoCurrency(item?.isoCurrencyCode);
                      setSelectedSalonId(item?.salonId);
                      setIsQueueClicked(sub?.name === "Queue");
                      setIsAppointClicked(sub?.name === "Appointment");
                    }}
                    style={[
                      styles.gridActionButton,
                      {
                        backgroundColor:
                          actionText === "Renew"
                            ? "rgba(255, 149, 0, 0.08)"
                            : darkTheme.colors.accent,
                        borderColor:
                          actionText === "Renew" ? "rgba(255, 149, 0, 0.2)" : "transparent",
                        borderWidth: actionText === "Renew" ? 1 : 0,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.gridActionText,
                        { color: actionText === "Renew" ? darkTheme.colors.accent : "#000000" },
                      ]}
                    >
                      {actionText}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Data Metrics Grid */}
                <View style={styles.innerBlockMetricsGrid}>
                  <View style={styles.metricColumn}>
                    <Text style={styles.metricLabelText}>STATUS</Text>
                    <Text style={styles.metricValueText}>{sub?.trial || "None"}</Text>
                  </View>

                  <View style={styles.verticalGridHairline} />

                  <View style={styles.metricColumn}>
                    <Text style={styles.metricLabelText}>EXPIRES</Text>
                    <Text style={styles.metricValueText}>
                      {sub?.expirydate === "" ? "select a plan" : sub?.expirydate}
                    </Text>
                  </View>
                </View>

                {/* Status Badge Footer */}
                <View style={styles.innerBlockBottomRow}>
                  <View style={styles.metaLeftGroup}>
                    <Text style={styles.metaLabelMicro}>CURRENCY</Text>
                    <Text style={styles.metaValueMicro}>
                      {item?.currency ? `${item.currency} (${item.isoCurrencyCode})` : "--"}
                    </Text>
                  </View>

                  {sub?.trial && (
                    <View
                      style={[
                        styles.statusMicroBadge,
                        {
                          backgroundColor: isPaid
                            ? "rgba(0, 163, 108, 0.15)"
                            : "rgba(2, 133, 199, 0.15)",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusBadgeText,
                          { color: isPaid ? "#00A36C" : "#0285c7" },
                        ]}
                      >
                        {sub?.trial}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header title="Subscriptions" subTitle="Manage active salon plans" showBack={false} />

      {getSubscriptionLoading ? (
        <ScreenSkeletonView />
      ) : getSubscriptiondata.length > 0 ? (
        <FlatList
          data={getSubscriptiondata}
          keyExtractor={(item) => item.salonId}
          renderItem={renderSubscriptionCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          windowSize={5}
          initialNumToRender={10}
          removeClippedSubviews={Platform.OS === "android"}
        />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No subscription available</Text>
        </View>
      )}

      {/* Payment Modal */}
      <Modal
        visible={paymentModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setModalValue({ queue: false, appointment: false });
          setPaymentModalOpen(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Buy Services</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalValue({ queue: false, appointment: false });
                  setPaymentModalOpen(false);
                  setPaymentType("Paid");
                }}
              >
                <Ionicons name="close" size={scale(20)} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Service:</Text>
                <Text style={styles.modalValue}>
                  {modalValue.queue ? "Queue" : "Appointment"}
                </Text>
              </View>

              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Price:</Text>
                <Text style={styles.modalValue}>
                  {paymentType === "Free"
                    ? `${currentSalonCurrency}0`
                    : `${currentSalonCurrency}${modalValue.queue ? 300 : 400}`}
                </Text>
              </View>

              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Plan Validity:</Text>
                <Text style={styles.modalValue}>
                  {paymentType === "Free" ? 14 : planValidityDate} days
                </Text>
              </View>

              {paymentType === "Free" ? (
                <TouchableOpacity style={styles.actionBtn} onPress={freePaymentHandler}>
                  <Text style={styles.actionBtnText}>Free</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.actionBtn} onPress={paidPaymentHandler}>
                  <Text style={styles.actionBtnText}>Pay</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SubscriptionsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: scale(14),
  },
  listContent: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
    gap: verticalScale(16),
  },
  eliteCard: {
    borderWidth: 1,
    padding: scale(14),
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(14),
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  brandCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(8),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  salonLogoImage: {
    width: "100%",
    height: "100%",
    borderRadius: scale(8),
  },
  salonTitle: {
    fontSize: scale(13.5),
    fontWeight: "700",
    letterSpacing: -0.1,
  },
  branchCountText: {
    fontSize: scale(10.5),
    color: "rgba(255, 255, 255, 0.35)",
    marginTop: verticalScale(1),
  },
  subServicesContainer: {
    width: "100%",
    gap: verticalScale(12),
  },
  luxuryServiceInnerBlock: {
    width: "100%",
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(12),
  },
  innerBlockTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  innerBlockIdText: {
    color: "#FFFFFF",
    fontSize: scale(12.5),
    fontWeight: "700",
    letterSpacing: 0.1,
  },
  innerBlockSubLabel: {
    color: "rgba(255, 255, 255, 0.35)",
    fontSize: scale(10.5),
    marginTop: verticalScale(1),
  },
  gridActionButton: {
    paddingHorizontal: scale(14),
    height: verticalScale(24),
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
    minWidth: scale(64),
  },
  gridActionText: {
    fontSize: scale(11),
    fontWeight: "700",
  },
  innerBlockMetricsGrid: {
    flexDirection: "row",
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(8),
    alignItems: "center",
  },
  metricColumn: {
    flex: 1,
  },
  metricLabelText: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: scale(8.5),
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  metricValueText: {
    color: "#FFFFFF",
    fontSize: scale(11),
    fontWeight: "600",
    marginTop: verticalScale(3),
  },
  verticalGridHairline: {
    width: 1,
    height: verticalScale(16),
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginHorizontal: scale(6),
  },
  innerBlockBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  metaLeftGroup: {
    flex: 1,
    paddingRight: scale(12),
  },
  metaLabelMicro: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: scale(8),
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  metaValueMicro: {
    color: "rgba(255, 255, 255, 0.45)",
    fontSize: scale(10),
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginTop: verticalScale(1),
  },
  statusMicroBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: scale(4),
  },
  statusBadgeText: {
    fontSize: scale(9.5),
    fontWeight: "700",
  },

  /* Skeleton Styles */
  skeletonContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    gap: verticalScale(16),
  },
  skeletonCard: {
    backgroundColor: SKELETON_THEME.card.baseColor,
    borderRadius: scale(14),
    padding: scale(14),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  skeletonHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(14),
  },
  skeletonHeaderTextGroup: {
    marginLeft: scale(10),
  },
  skeletonSubContainer: {
    gap: verticalScale(12),
  },
  skeletonSubBlock: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: scale(8),
    padding: scale(12),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.02)",
  },
  skeletonSubTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  skeletonGridRow: {
    flexDirection: "row",
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(8),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  skeletonSubBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  modalContent: {
    width: "100%",
    backgroundColor: darkTheme.colors.card,
    borderRadius: scale(12),
    padding: scale(16),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
    paddingBottom: verticalScale(10),
    marginBottom: verticalScale(14),
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "700",
  },
  modalBody: {
    gap: verticalScale(12),
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: scale(13),
  },
  modalValue: {
    color: "#FFFFFF",
    fontSize: scale(14),
    fontWeight: "600",
  },
  actionBtn: {
    backgroundColor: darkTheme.colors.accent,
    borderRadius: scale(8),
    paddingVertical: verticalScale(12),
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  actionBtnText: {
    color: "#000000",
    fontSize: scale(13.5),
    fontWeight: "700",
  },
});
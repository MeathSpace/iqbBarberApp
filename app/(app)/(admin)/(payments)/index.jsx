// import { useEffect, useState } from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale, verticalScale } from "react-native-size-matters";

// import Header from "../../../../components/Header/Header"; // Adjust relative path as needed
// import { darkTheme } from "../../../../constants/appTheme";
// import { useAdminAuth } from "../../../../context/admin/AuthContext";
// import api from "../../../../utils/api";

// // Mock Data structure matched directly from your web dashboard screenshot
// const MOCK_PAYMENTS = [
//   {
//     id: "1",
//     invoice: "IQB-MAR-00101",
//     product: "Queue",
//     purchased: "13 Mar 2026",
//     expired: "14 Aug 2027",
//     price: "₹ 300",
//     txId: "pi_3TAUIL6v7MtR8QXs183MKiyT",
//     days: "519days",
//     status: "Paid",
//   },
//   {
//     id: "2",
//     invoice: "IQB-MAR-00100",
//     product: "Appointment",
//     purchased: "13 Mar 2026",
//     expired: "16 May 2027",
//     price: "₹ 400",
//     txId: "pi_3TAUkE6v7MtR8QXs1kbBnXNQ",
//     days: "429days",
//     status: "Paid",
//   },
// ];

// const PaymentHistory = () => {
//   const { authenticatedUser } = useAdminAuth();

//   const [paymentsData, setPaymentsData] = useState({
//     loading: false,
//     data: [],
//   });

//   const fetchPaymentHistoryData = async () => {
//     try {
//       const { data } = await api.post(
//         "/salonPayments/getSalonPaymentHistoryBySalonId",
//         {
//           limit: 10,
//           page: 1,
//           salonId: authenticatedUser?.salonId,
//         },
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (authenticatedUser?.salonId) {
//       fetchPaymentHistoryData();
//     }
//   }, [authenticatedUser?.salonId]);

//   // Render Item Template for individual transactions
//   const renderPaymentCard = ({ item }) => (
//     <View
//       style={[
//         styles.cardContainer,
//         {
//           backgroundColor: darkTheme.colors.card,
//           borderColor: darkTheme.colors.border,
//           borderRadius: darkTheme.layout.borderRadiusMedium,
//         },
//       ]}
//     >
//       {/* Top Card Row: Invoice ID & Amount */}
//       <View style={styles.cardHeaderRow}>
//         <View>
//           <Text style={[darkTheme.typography.cardTitle, styles.invoiceText]}>
//             {item.invoice}
//           </Text>
//           <Text style={[darkTheme.typography.bodyMuted, styles.productBadge]}>
//             {item.product}
//           </Text>
//         </View>
//         <Text
//           style={[
//             darkTheme.typography.cardValue,
//             { color: darkTheme.colors.accent },
//           ]}
//         >
//           {item.price}
//         </Text>
//       </View>

//       <View
//         style={[styles.divider, { backgroundColor: darkTheme.colors.border }]}
//       />

//       {/* Mid Card Row: Core Transaction Info Metadata */}
//       <View style={styles.metadataGrid}>
//         <View style={styles.metadataColumn}>
//           <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>
//             Purchased
//           </Text>
//           <Text style={[darkTheme.typography.bodyMain, styles.metaValue]}>
//             {item.purchased}
//           </Text>
//         </View>
//         <View style={styles.metadataColumn}>
//           <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>
//             Expires
//           </Text>
//           <Text style={[darkTheme.typography.bodyMain, styles.metaValue]}>
//             {item.expired}
//           </Text>
//         </View>
//         <View style={styles.metadataColumnRight}>
//           <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>
//             Duration
//           </Text>
//           <Text style={[darkTheme.typography.bodyMain, styles.metaValue]}>
//             {item.days}
//           </Text>
//         </View>
//       </View>

//       {/* Bottom Card Row: Transaction Reference ID string & Status */}
//       <View style={styles.cardFooterRow}>
//         <View style={styles.txContainer}>
//           <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>
//             Transaction ID
//           </Text>
//           <Text
//             style={[
//               darkTheme.typography.bodyMuted,
//               styles.txIdText,
//               { color: darkTheme.colors.textMain },
//             ]}
//             numberOfLines={1}
//             ellipsizeMode="middle"
//           >
//             {item.txId}
//           </Text>
//         </View>

//         <View
//           style={[
//             styles.statusBadge,
//             {
//               backgroundColor: darkTheme.status.success.bg,
//               borderRadius: darkTheme.layout.borderRadiusSmall,
//             },
//           ]}
//         >
//           <Text
//             style={[
//               darkTheme.typography.bodyMuted,
//               { color: darkTheme.status.success.text, fontWeight: "600" },
//             ]}
//           >
//             {item.status}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView
//       edges={["top", "right", "left"]}
//       style={[
//         styles.container,
//         { backgroundColor: darkTheme.colors.background },
//       ]}
//     >
//       {/* Structural Header Component */}
//       <Header
//         title="Payment History"
//         subTitle="View your recent transactions"
//         showBack={true}
//       />

//       {/* Main FlatList Component built for high performance data processing */}
//       <FlatList
//         data={paymentsData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderPaymentCard}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//         // Mobile batch optimization limits to prevent layout calculation lag
//         maxToRenderPerBatch={10}
//         windowSize={5}
//         initialNumToRender={8}
//         removeClippedSubviews={true}
//       />
//     </SafeAreaView>
//   );
// };

// export default PaymentHistory;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   listContainer: {
//     paddingHorizontal: darkTheme.layout.paddingHorizontal,
//     paddingBottom: verticalScale(32),
//     gap: verticalScale(14),
//   },
//   cardContainer: {
//     width: "100%",
//     borderWidth: 1,
//     padding: scale(14),
//   },
//   cardHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   invoiceText: {
//     fontSize: scale(14),
//   },
//   productBadge: {
//     marginTop: verticalScale(2),
//     fontSize: scale(12),
//   },
//   divider: {
//     height: 1,
//     width: "100%",
//     marginVertical: verticalScale(10),
//   },
//   metadataGrid: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   metadataColumn: {
//     flex: 1,
//   },
//   metadataColumnRight: {
//     alignItems: "flex-end",
//   },
//   metaLabel: {
//     fontSize: scale(10),
//     textTransform: "uppercase",
//     letterSpacing: 0.3,
//     marginBottom: verticalScale(2),
//   },
//   metaValue: {
//     fontSize: scale(12),
//   },
//   cardFooterRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     marginTop: verticalScale(12),
//     gap: scale(16),
//   },
//   txContainer: {
//     flex: 1,
//   },
//   txIdText: {
//     fontSize: scale(11),
//     marginTop: verticalScale(1),
//   },
//   statusBadge: {
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(4),
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import Shimmer from "react-native-modern-shimmer";

import Header from "../../../../components/Header/Header"; 
import { darkTheme } from "../../../../constants/appTheme";
import { useAdminAuth } from "../../../../context/admin/AuthContext";
import api from "../../../../utils/api";

const THEME_PALETTE = {
  header: { baseColor: "#221f1c", highlightColor: "#332e2a" },
  card: { baseColor: "#1c1c1e", highlightColor: "#2c2c2e" },
  content: { baseColor: "#2c2c2e", highlightColor: "#3a3a3c" },
  interactive: { baseColor: "#2a2a2a", highlightColor: "#333333" },
};

const PaymentHistory = () => {
  const { authenticatedUser } = useAdminAuth();

  // Manage independent structural state for pagination mechanics
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const fetchPaymentHistoryData = async (pageToFetch, shouldRefresh = false) => {
    if (!authenticatedUser?.salonId) return;

    try {
      const { data } = await api.post(
        "/salonPayments/getSalonPaymentHistoryBySalonId",
        {
          limit: 10,
          page: pageToFetch, // Now dynamically driven by function args
          salonId: authenticatedUser?.salonId,
        },
      );
      
      if (data && data.success) {
        const newRecords = data.response || [];
        const paginationInfo = data.pagination;

        // Append or replace records based on interaction context
        setPayments((prev) => (shouldRefresh ? newRecords : [...prev, ...newRecords]));
        
        // Use backend pagination status to control data gates
        if (paginationInfo) {
          setHasMoreData(pageToFetch < paginationInfo.totalPages);
        } else {
          setHasMoreData(newRecords.length === 10);
        }
      }
    } catch (error) {
      console.log("Error fetching payment history:", error);
    } finally {
      setIsScreenLoading(false);
      setIsMoreLoading(false);
    }
  };

  // Initial Paint lifecycle trigger
  useEffect(() => {
    if (authenticatedUser?.salonId) {
      setIsScreenLoading(true);
      setPage(1);
      fetchPaymentHistoryData(1, true);
    }
  }, [authenticatedUser?.salonId]);

  // Trigger calculation for continuous pagination scrolling
  const handleLoadMore = () => {
    if (!isMoreLoading && hasMoreData) {
      setIsMoreLoading(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPaymentHistoryData(nextPage, false);
    }
  };

  const renderPaymentCard = ({ item }) => {
    const primaryProduct = item.products?.[0]?.productName || "Product";
    const formattedPrice = item.currency === "inr" 
      ? `₹ ${item.amount}` 
      : `${item.currency?.toUpperCase()} ${item.amount}`;

    return (
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: darkTheme.colors.border,
            borderRadius: darkTheme.layout.borderRadiusMedium,
          },
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <View>
            <Text style={[darkTheme.typography.cardTitle, styles.invoiceText]}>
              {item.invoiceNumber}
            </Text>
            <Text style={[darkTheme.typography.bodyMuted, styles.productBadge]}>
              {primaryProduct}
            </Text>
          </View>
          <Text style={[darkTheme.typography.cardValue, { color: darkTheme.colors.accent }]}>
            {formattedPrice}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: darkTheme.colors.border }]} />

        <View style={styles.metadataGrid}>
          <View style={styles.metadataColumn}>
            <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>Purchased</Text>
            <Text style={[darkTheme.typography.bodyMain, styles.metaValue]}>{item.purchaseDate}</Text>
          </View>
          <View style={styles.metadataColumn}>
            <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>Expires</Text>
            <Text style={[darkTheme.typography.bodyMain, styles.metaValue]}>{item.paymentExpiryDate}</Text>
          </View>
          <View style={styles.metadataColumnRight}>
            <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>Duration</Text>
            <Text style={[darkTheme.typography.bodyMain, styles.metaValue]}>
              {item.timePeriod ? `${item.timePeriod}days` : "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooterRow}>
          <View style={styles.txContainer}>
            <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>Transaction ID</Text>
            <Text
              style={[darkTheme.typography.bodyMuted, styles.txIdText, { color: darkTheme.colors.textMain }]}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {item.paymentIntentId}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: darkTheme.status.success.bg, borderRadius: darkTheme.layout.borderRadiusSmall }]}>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.status.success.text, fontWeight: "600" }]}>
              {item.paymentType || "Paid"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Bottom Loader indicator for ongoing data fetches
  const renderFooter = () => {
    if (!isMoreLoading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={darkTheme.colors.accent} />
      </View>
    );
  };

  const ScreenSkeletonView = () => (
    <View style={styles.skeletonContainer}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <View key={idx} style={[styles.cardContainer, { backgroundColor: THEME_PALETTE.card.baseColor, borderColor: THEME_PALETTE.card.highlightColor, borderRadius: darkTheme.layout.borderRadiusMedium }]}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Shimmer width={scale(110)} height={verticalScale(14)} baseColor={THEME_PALETTE.content.baseColor} highlightColor={THEME_PALETTE.content.highlightColor} style={styles.skeletonElement} />
              <Shimmer width={scale(70)} height={verticalScale(11)} baseColor={THEME_PALETTE.content.baseColor} highlightColor={THEME_PALETTE.content.highlightColor} style={[styles.skeletonElement, { marginTop: verticalScale(6) }]} />
            </View>
            <Shimmer width={scale(50)} height={verticalScale(16)} baseColor={THEME_PALETTE.content.baseColor} highlightColor={THEME_PALETTE.content.highlightColor} style={styles.skeletonElement} />
          </View>
          <View style={[styles.divider, { backgroundColor: THEME_PALETTE.card.highlightColor }]} />
          <View style={styles.metadataGrid}>
            <View style={styles.metadataColumn}>
              <Shimmer width={scale(45)} height={verticalScale(9)} baseColor={THEME_PALETTE.content.baseColor} highlightColor={THEME_PALETTE.content.highlightColor} style={styles.skeletonElement} />
              <Shimmer width={scale(65)} height={verticalScale(12)} baseColor={THEME_PALETTE.content.baseColor} highlightColor={THEME_PALETTE.content.highlightColor} style={[styles.skeletonElement, { marginTop: verticalScale(4) }]} />
            </View>
            <View style={styles.metadataColumn}>
              <Shimmer width={scale(45)} height={verticalScale(9)} baseColor={THEME_PALETTE.content.baseColor} highlightColor={THEME_PALETTE.content.highlightColor} style={styles.skeletonElement} />
              <Shimmer width={scale(65)} height={verticalScale(12)} baseColor={THEME_PALETTE.content.baseColor} highlightColor={THEME_PALETTE.content.highlightColor} style={[styles.skeletonElement, { marginTop: verticalScale(4) }]} />
            </View>
            <View style={styles.metadataColumnRight}>
              <Shimmer width={scale(45)} height={verticalScale(9)} baseColor={THEME_PALETTE.content.baseColor} highlightColor={THEME_PALETTE.content.highlightColor} style={styles.skeletonElement} />
              <Shimmer width={scale(50)} height={verticalScale(12)} baseColor={THEME_PALETTE.content.baseColor} highlightColor={THEME_PALETTE.content.highlightColor} style={[styles.skeletonElement, { marginTop: verticalScale(4) }]} />
            </View>
          </View>
          <View style={styles.cardFooterRow}>
            <View style={styles.txContainer}>
              <Shimmer width={scale(70)} height={verticalScale(9)} baseColor={THEME_PALETTE.content.baseColor} highlightColor={THEME_PALETTE.content.highlightColor} style={styles.skeletonElement} />
              <Shimmer width={scale(140)} height={verticalScale(11)} baseColor={THEME_PALETTE.content.baseColor} highlightColor={THEME_PALETTE.content.highlightColor} style={[styles.skeletonElement, { marginTop: verticalScale(5) }]} />
            </View>
            <Shimmer width={scale(55)} height={verticalScale(20)} baseColor={THEME_PALETTE.interactive.baseColor} highlightColor={THEME_PALETTE.interactive.highlightColor} style={{ borderRadius: darkTheme.layout.borderRadiusSmall }} />
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView edges={["top", "right", "left"]} style={[styles.container, { backgroundColor: darkTheme.colors.background }]}>
      <Header title="Payment History" subTitle="View your recent transactions" showBack={true} />

      {isScreenLoading ? (
        <ScreenSkeletonView />
      ) : (
        <FlatList
          data={payments}
          keyExtractor={(item) => item._id}
          renderItem={renderPaymentCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          
          maxToRenderPerBatch={10}
          windowSize={5}
          initialNumToRender={8}
          removeClippedSubviews={true}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={{ color: darkTheme.colors.textMain }}>No payment history found.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", paddingTop: verticalScale(40) },
  listContainer: { paddingHorizontal: darkTheme.layout.paddingHorizontal, paddingBottom: verticalScale(32), gap: verticalScale(14) },
  skeletonContainer: { paddingHorizontal: darkTheme.layout.paddingHorizontal, gap: verticalScale(14) },
  skeletonElement: { borderRadius: 4 },
  cardContainer: { width: "100%", borderWidth: 1, padding: scale(14) },
  cardHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  invoiceText: { fontSize: scale(14) },
  productBadge: { marginTop: verticalScale(2), fontSize: scale(12) },
  divider: { height: 1, width: "100%", marginVertical: verticalScale(10) },
  metadataGrid: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  metadataColumn: { flex: 1 },
  metadataColumnRight: { alignItems: "flex-end" },
  metaLabel: { fontSize: scale(10), textTransform: "uppercase", letterSpacing: 0.3, marginBottom: verticalScale(2) },
  metaValue: { fontSize: scale(12) },
  cardFooterRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: verticalScale(12), gap: scale(16) },
  txContainer: { flex: 1 },
  txIdText: { fontSize: scale(11), marginTop: verticalScale(1) },
  statusBadge: { paddingHorizontal: scale(10), paddingVertical: verticalScale(4), justifyContent: "center", alignItems: "center" },
  footerLoader: { paddingVertical: verticalScale(16), alignItems: "center", justifyContent: "center" },
});
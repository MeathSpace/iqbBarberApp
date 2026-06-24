import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../components/Header/Header"; // Adjust relative path as needed
import { darkTheme } from "../../../../constants/appTheme";

// Mock Data structure matched directly from your web dashboard screenshot
const MOCK_PAYMENTS = [
  { id: "1", invoice: "IQB-MAR-00101", product: "Queue", purchased: "13 Mar 2026", expired: "14 Aug 2027", price: "₹ 300", txId: "pi_3TAUIL6v7MtR8QXs183MKiyT", days: "519days", status: "Paid" },
  { id: "2", invoice: "IQB-MAR-00100", product: "Appointment", purchased: "13 Mar 2026", expired: "16 May 2027", price: "₹ 400", txId: "pi_3TAUkE6v7MtR8QXs1kbBnXNQ", days: "429days", status: "Paid" },
  { id: "3", invoice: "IQB-MAR-00099", product: "Queue", purchased: "13 Mar 2026", expired: "15 Jul 2027", price: "₹ 300", txId: "pi_3TAUbT6v7MtR8QXs1P0Ab2Lq", days: "489days", status: "Paid" },
  { id: "4", invoice: "IQB-MAR-00098", product: "Queue", purchased: "13 Mar 2026", expired: "15 Jun 2027", price: "₹ 300", txId: "pi_3TAUcT6v7MtR8QXs1dyY4sAm", days: "459days", status: "Paid" },
  { id: "5", invoice: "IQB-MAR-00097", product: "Queue", purchased: "13 Mar 2026", expired: "16 May 2027", price: "₹ 300", txId: "pi_3TAUWO6v7MtR8QXs0XytCoLJ", days: "429days", status: "Paid" },
  { id: "6", invoice: "IQB-MAR-00096", product: "Appointment", purchased: "13 Mar 2026", expired: "16 Apr 2027", price: "₹ 400", txId: "pi_3TAUkW6v7MtR8QXs1Ix88i4n", days: "399days", status: "Paid" },
  { id: "7", invoice: "IQB-MAR-00095", product: "Appointment", purchased: "13 Mar 2026", expired: "17 Mar 2027", price: "₹ 400", txId: "pi_3TAUCW6v7MtR8QXs1BGYrRVS", days: "369days", status: "Paid" },

  { id: "8", invoice: "IQB-MAR-00094", product: "Queue", purchased: "14 Mar 2026", expired: "14 Mar 2027", price: "₹ 300", txId: "pi_3TB0016v7MtR8QXs1a1", days: "365days", status: "Paid" },
  { id: "9", invoice: "IQB-MAR-00093", product: "Appointment", purchased: "14 Mar 2026", expired: "14 Jun 2027", price: "₹ 400", txId: "pi_3TB0026v7MtR8QXs1a2", days: "457days", status: "Paid" },
  { id: "10", invoice: "IQB-MAR-00092", product: "Queue", purchased: "15 Mar 2026", expired: "15 Sep 2027", price: "₹ 300", txId: "pi_3TB0036v7MtR8QXs1a3", days: "549days", status: "Paid" },
  { id: "11", invoice: "IQB-MAR-00091", product: "Appointment", purchased: "15 Mar 2026", expired: "15 Aug 2027", price: "₹ 400", txId: "pi_3TB0046v7MtR8QXs1a4", days: "519days", status: "Paid" },
  { id: "12", invoice: "IQB-MAR-00090", product: "Queue", purchased: "16 Mar 2026", expired: "16 Jul 2027", price: "₹ 300", txId: "pi_3TB0056v7MtR8QXs1a5", days: "487days", status: "Paid" },
  { id: "13", invoice: "IQB-MAR-00089", product: "Appointment", purchased: "16 Mar 2026", expired: "16 May 2027", price: "₹ 400", txId: "pi_3TB0066v7MtR8QXs1a6", days: "426days", status: "Paid" },
  { id: "14", invoice: "IQB-MAR-00088", product: "Queue", purchased: "17 Mar 2026", expired: "17 Jun 2027", price: "₹ 300", txId: "pi_3TB0076v7MtR8QXs1a7", days: "457days", status: "Paid" },
  { id: "15", invoice: "IQB-MAR-00087", product: "Appointment", purchased: "17 Mar 2026", expired: "17 Apr 2027", price: "₹ 400", txId: "pi_3TB0086v7MtR8QXs1a8", days: "396days", status: "Paid" },
  { id: "16", invoice: "IQB-MAR-00086", product: "Queue", purchased: "18 Mar 2026", expired: "18 Mar 2027", price: "₹ 300", txId: "pi_3TB0096v7MtR8QXs1a9", days: "365days", status: "Paid" },
  { id: "17", invoice: "IQB-MAR-00085", product: "Appointment", purchased: "18 Mar 2026", expired: "18 Jul 2027", price: "₹ 400", txId: "pi_3TB0106v7MtR8QXs1b0", days: "487days", status: "Paid" },
  { id: "18", invoice: "IQB-MAR-00084", product: "Queue", purchased: "19 Mar 2026", expired: "19 Aug 2027", price: "₹ 300", txId: "pi_3TB0116v7MtR8QXs1b1", days: "519days", status: "Paid" },
  { id: "19", invoice: "IQB-MAR-00083", product: "Appointment", purchased: "19 Mar 2026", expired: "19 Jun 2027", price: "₹ 400", txId: "pi_3TB0126v7MtR8QXs1b2", days: "457days", status: "Paid" },
  { id: "20", invoice: "IQB-MAR-00082", product: "Queue", purchased: "20 Mar 2026", expired: "20 Sep 2027", price: "₹ 300", txId: "pi_3TB0136v7MtR8QXs1b3", days: "549days", status: "Paid" },
  { id: "21", invoice: "IQB-MAR-00081", product: "Appointment", purchased: "20 Mar 2026", expired: "20 Aug 2027", price: "₹ 400", txId: "pi_3TB0146v7MtR8QXs1b4", days: "519days", status: "Paid" },
  { id: "22", invoice: "IQB-MAR-00080", product: "Queue", purchased: "21 Mar 2026", expired: "21 Jul 2027", price: "₹ 300", txId: "pi_3TB0156v7MtR8QXs1b5", days: "487days", status: "Paid" },
  { id: "23", invoice: "IQB-MAR-00079", product: "Appointment", purchased: "21 Mar 2026", expired: "21 May 2027", price: "₹ 400", txId: "pi_3TB0166v7MtR8QXs1b6", days: "426days", status: "Paid" },
  { id: "24", invoice: "IQB-MAR-00078", product: "Queue", purchased: "22 Mar 2026", expired: "22 Jun 2027", price: "₹ 300", txId: "pi_3TB0176v7MtR8QXs1b7", days: "457days", status: "Paid" },
  { id: "25", invoice: "IQB-MAR-00077", product: "Appointment", purchased: "22 Mar 2026", expired: "22 Apr 2027", price: "₹ 400", txId: "pi_3TB0186v7MtR8QXs1b8", days: "396days", status: "Paid" },
  { id: "26", invoice: "IQB-MAR-00076", product: "Queue", purchased: "23 Mar 2026", expired: "23 Mar 2027", price: "₹ 300", txId: "pi_3TB0196v7MtR8QXs1b9", days: "365days", status: "Paid" },
  { id: "27", invoice: "IQB-MAR-00075", product: "Appointment", purchased: "23 Mar 2026", expired: "23 Jul 2027", price: "₹ 400", txId: "pi_3TB0206v7MtR8QXs1c0", days: "487days", status: "Paid" }
];

const PaymentHistory = () => {
  const [paymentsData] = useState(MOCK_PAYMENTS);

  // Render Item Template for individual transactions
  const renderPaymentCard = ({ item }) => (
    <View 
      style={[
        styles.cardContainer, 
        { 
          backgroundColor: darkTheme.colors.card, 
          borderColor: darkTheme.colors.border,
          borderRadius: darkTheme.layout.borderRadiusMedium,
        }
      ]}
    >
      {/* Top Card Row: Invoice ID & Amount */}
      <View style={styles.cardHeaderRow}>
        <View>
          <Text style={[darkTheme.typography.cardTitle, styles.invoiceText]}>
            {item.invoice}
          </Text>
          <Text style={[darkTheme.typography.bodyMuted, styles.productBadge]}>
            {item.product}
          </Text>
        </View>
        <Text style={[darkTheme.typography.cardValue, { color: darkTheme.colors.accent }]}>
          {item.price}
        </Text>
      </View>

      <View style={[styles.divider, { backgroundColor: darkTheme.colors.border }]} />

      {/* Mid Card Row: Core Transaction Info Metadata */}
      <View style={styles.metadataGrid}>
        <View style={styles.metadataColumn}>
          <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>Purchased</Text>
          <Text style={[darkTheme.typography.bodyMain, styles.metaValue]}>{item.purchased}</Text>
        </View>
        <View style={styles.metadataColumn}>
          <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>Expires</Text>
          <Text style={[darkTheme.typography.bodyMain, styles.metaValue]}>{item.expired}</Text>
        </View>
        <View style={styles.metadataColumnRight}>
          <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>Duration</Text>
          <Text style={[darkTheme.typography.bodyMain, styles.metaValue]}>{item.days}</Text>
        </View>
      </View>

      {/* Bottom Card Row: Transaction Reference ID string & Status */}
      <View style={styles.cardFooterRow}>
        <View style={styles.txContainer}>
          <Text style={[darkTheme.typography.bodyMuted, styles.metaLabel]}>Transaction ID</Text>
          <Text 
            style={[darkTheme.typography.bodyMuted, styles.txIdText, { color: darkTheme.colors.textMain }]}
            numberOfLines={1} 
            ellipsizeMode="middle"
          >
            {item.txId}
          </Text>
        </View>
        
        <View 
          style={[
            styles.statusBadge, 
            { backgroundColor: darkTheme.status.success.bg, borderRadius: darkTheme.layout.borderRadiusSmall }
          ]}
        >
          <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.status.success.text, fontWeight: "600" }]}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      {/* Structural Header Component */}
      <Header 
        title="Payment History" 
        subTitle="View your recent transactions" 
        showBack={true} 
      />

      {/* Main FlatList Component built for high performance data processing */}
      <FlatList
        data={paymentsData}
        keyExtractor={(item) => item.id}
        renderItem={renderPaymentCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        
        // Mobile batch optimization limits to prevent layout calculation lag
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={8}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
    gap: verticalScale(14),
  },
  cardContainer: {
    width: "100%",
    borderWidth: 1,
    padding: scale(14),
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invoiceText: {
    fontSize: scale(14),
  },
  productBadge: {
    marginTop: verticalScale(2),
    fontSize: scale(12),
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: verticalScale(10),
  },
  metadataGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  metadataColumn: {
    flex: 1,
  },
  metadataColumnRight: {
    alignItems: "flex-end",
  },
  metaLabel: {
    fontSize: scale(10),
    textTransform: "uppercase",
    letterSpacing: 0.3,
    marginBottom: verticalScale(2),
  },
  metaValue: {
    fontSize: scale(12),
  },
  cardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: verticalScale(12),
    gap: scale(16),
  },
  txContainer: {
    flex: 1,
  },
  txIdText: {
    fontSize: scale(11),
    marginTop: verticalScale(1),
  },
  statusBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    justifyContent: "center",
    alignItems: "center",
  },
});
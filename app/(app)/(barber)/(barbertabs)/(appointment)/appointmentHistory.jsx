import { Feather, Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import moment from "moment";
import BarberHeader from "../../../../../components/Header/BarberHeader";
import { darkTheme } from "../../../../../constants/appTheme";
import { useBarberAuth } from "../../../../../context/barber/AuthContext";
import api from "../../../../../utils/api";

const AppointmentHistory = () => {
  const { authenticatedUser } = useBarberAuth();
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const salonId = authenticatedUser?.salonId;
      const barberId = authenticatedUser?.barberId;
      if (!salonId || !barberId) {
        setHistory([]);
        return;
      }

      let isCurrent = true;
      const fetchHistory = async () => {
        setHistoryLoading(true);
        try {
          const { data } = await api.post(
            "/appointmentHistory/getAppointmentHistoryByBarberIdSalonId",
            { salonId, barberId, page: 1, limit: 10 },
          );
          const items = Array.isArray(data?.response) ? data.response : [];
          if (isCurrent) {
            setHistory(items.map((item) => {
              const services = item.services || [];
              const price = services.reduce((total, service) => total + Number(service.servicePrice || 0), 0);
              return {
                ...item,
                id: item._id,
                clientName: item.customerName || "Customer",
                barberName: item.barberName || authenticatedUser.name || "Barber",
                service: services.map((service) => service.serviceName).filter(Boolean).join(", ") || "Service",
                price: `₹ ${price}`,
                date: item.appointmentDate ? moment(item.appointmentDate).format("DD/MM/YYYY") : "",
                status: item.status || "Pending",
              };
            }));
          }
        } catch (error) {
          if (isCurrent) {
            console.error("Failed to fetch barber appointment history:", error?.response?.data || error.message);
            setHistory([]);
          }
        } finally {
          if (isCurrent) setHistoryLoading(false);
        }
      };

      fetchHistory();
      return () => {
        isCurrent = false;
      };
    }, [authenticatedUser]),
  );

  const renderHistoryItem = ({ item }) => {
    const isServed = item.status === "Served";

    return (
      <View
        style={[
          styles.historyCard,
          {
            backgroundColor: darkTheme.colors.card,
            borderColor: darkTheme.colors.border,
            borderRadius: darkTheme.layout.borderRadiusLarge,
          },
        ]}
      >

        <View style={styles.cardHeader}>
          <View style={styles.profileRow}>
            <View style={[styles.avatarFrame, { backgroundColor: "#2C2C2E" }]}>
              <Ionicons name="person" size={scale(16)} color={darkTheme.colors.textMuted} />
            </View>
            <View style={styles.metaData}>
              <Text style={[darkTheme.typography.cardTitle, styles.clientName]}>
                {item.clientName}
              </Text>
              <Text style={[darkTheme.typography.bodyMuted, styles.barberText]}>
                Stylist: {item.barberName}
              </Text>
              <Text style={[darkTheme.typography.bodyMuted, styles.serviceText]}>
                {item.service}
              </Text>
            </View>
          </View>

          <View style={styles.priceDateBlock}>
            <Text style={[darkTheme.typography.bodyMain, styles.priceText, { color: darkTheme.colors.accent }]}>
              {item.price}
            </Text>
            <Text style={[darkTheme.typography.bodyMuted, styles.dateText]}>
              {item.date}
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: darkTheme.colors.border }]} />

        <View style={styles.cardFooterRow}>
          <Text style={[darkTheme.typography.bodyMuted, { fontSize: scale(11) }]}>
            Status Profile
          </Text>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isServed ? "rgba(52, 199, 89, 0.1)" : "rgba(255, 59, 48, 0.1)",
                borderRadius: darkTheme.layout.borderRadiusSmall
              }
            ]}
          >
            <Ionicons
              name={isServed ? "checkmark-circle" : "close-circle"}
              size={scale(13)}
              color={isServed ? darkTheme.status.success.text : darkTheme.status.error.text}
              style={{ marginRight: scale(4) }}
            />
            <Text
              style={[
                darkTheme.typography.bodyMuted,
                { color: isServed ? darkTheme.status.success.text : darkTheme.status.error.text, fontWeight: "600", fontSize: scale(11) }
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >

      <BarberHeader title="Appoinment History" subTitle="Log of past walk-in customers and arrivals" showBack={false} />

      <View style={styles.topContainer}>
        <View style={styles.filterActionRow}>

          <View style={styles.toolsLeftGroup}>
            {/* <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.toolButton, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
            >
              <Ionicons name="refresh" size={scale(15)} color={darkTheme.colors.textMain} />
            </TouchableOpacity> */}

            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.toolButton, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
            >
              <Feather name="calendar" size={scale(14)} color={darkTheme.colors.textMain} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.toolButton, { backgroundColor: darkTheme.colors.card, borderColor: darkTheme.colors.border }]}
            >
              <Ionicons name="search" size={scale(14)} color={darkTheme.colors.textMain} />
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity 
            activeOpacity={0.8}
            style={[styles.filterLabelButton, { backgroundColor: "rgba(255, 149, 0, 0.1)", borderColor: darkTheme.colors.accent }]}
          >
            <MaterialIcons name="filter-list" size={scale(15)} color={darkTheme.colors.accent} style={styles.filterIcon} />
            <Text style={[darkTheme.typography.bodyMain, styles.filterButtonText, { color: darkTheme.colors.accent }]}>
              Filter
            </Text>
          </TouchableOpacity> */}

        </View>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={10}
        removeClippedSubviews={Platform.OS === "android"}
        ListEmptyComponent={
          historyLoading ? (
            <ActivityIndicator color={darkTheme.colors.accent} style={{ marginTop: verticalScale(40) }} />
          ) : (
            <Text style={[darkTheme.typography.bodyMuted, { textAlign: "center", marginTop: verticalScale(40) }]}>
              No appointment history found
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default AppointmentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    marginBottom: verticalScale(16),
  },
  filterActionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  toolsLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  toolButton: {
    width: scale(36),
    height: scale(36),
    borderWidth: 1,
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
  },
  filterLabelButton: {
    flexDirection: "row",
    alignItems: "center",
    height: scale(36),
    borderWidth: 1,
    borderRadius: scale(18),
    paddingHorizontal: scale(14),
  },
  filterIcon: {
    marginRight: scale(6),
  },
  filterButtonText: {
    fontSize: scale(12),
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  listContent: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
    gap: verticalScale(14),
  },
  historyCard: {
    borderWidth: 1,
    padding: scale(14),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  profileRow: {
    flexDirection: "row",
    gap: scale(12),
    flex: 1,
  },
  avatarFrame: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
  },
  metaData: {
    flex: 1,
  },
  clientName: {
    fontSize: scale(14),
    fontWeight: "600",
  },
  barberText: {
    fontSize: scale(12),
    marginTop: verticalScale(2),
  },
  serviceText: {
    fontSize: scale(12),
    marginTop: verticalScale(1),
  },
  priceDateBlock: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: scale(14),
    fontWeight: "700",
  },
  dateText: {
    fontSize: scale(11),
    marginTop: verticalScale(4),
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: verticalScale(12),
  },
  cardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  statusBadge: {
    flexDirection: "row",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    alignItems: "center",
    justifyContent: "center",
  },
});
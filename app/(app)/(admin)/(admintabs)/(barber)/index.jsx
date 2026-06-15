import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../../../../components/Header/Header";
import { darkTheme } from "../../../../../constants/appTheme";
import { useRouter } from "expo-router";
import { DownIcon, HomeIcon } from "../../../../../constants/icons";

const index = () => {
  const barbersData = [
    {
      id: "1",
      name: "Zee",
      initials: "Z",
      role: "Owner",
      rating: "4.9",
      services: "8 Services",
      salon: "Baba-Z",
      status: "Active",
    },
    {
      id: "2",
      name: "James Williams",
      initials: "JW",
      role: "Permanent Barber",
      rating: "4.7",
      services: "6 Services",
      salon: "Baba-Z",
      status: "Active",
    },
    {
      id: "3",
      name: "David Brown",
      initials: "DB",
      role: "Permanent Barber",
      rating: "4.8",
      services: "7 Services",
      salon: "Uptown Cuts & Shaves",
      status: "Active",
    },
    {
      id: "4",
      name: "Michael Davis",
      initials: "MD",
      role: "Apprentice",
      rating: "—",
      services: "— Services",
      salon: "Baba-Z",
      status: "Off Duty",
    },
  ];

  const router = useRouter();

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header title={"Barbers"} subTitle={"Manage your barber team"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableOpacity
          style={[styles.dropdown, { borderColor: darkTheme.colors.border }]}
          activeOpacity={0.8}
        >
          <Text style={darkTheme.typography.dropdownText}>All Salons</Text>
          <DownIcon
            size={scale(20)}
            color={darkTheme.colors.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.addButton, { borderColor: darkTheme.colors.accent, height: darkTheme.layout.buttonHeight }]}
          activeOpacity={0.8}
          onPress={() => {
            router.push("createBarber");
          }}
        >
          <HomeIcon
            size={scale(16)}
            color={darkTheme.colors.accent}
            style={styles.addIcon}
          />
          <Text style={[darkTheme.typography.btnText, { color: darkTheme.colors.accent }]}>
            Add barber
          </Text>
        </TouchableOpacity>

        <View style={styles.listContainer}>
          {barbersData.map((barber) => (
            <View
              key={barber.id}
              style={[
                styles.barberCard,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.avatarCircle,
                  { backgroundColor: darkTheme.colors.accent },
                ]}
              >
                <Text style={styles.avatarText}>{barber.initials}</Text>
              </View>

              <View style={styles.cardMainContent}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.nameRoleContainer}>
                    <Text style={darkTheme.typography.cardTitle}>{barber.name}</Text>
                    <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted, marginTop: verticalScale(1) }]}>
                      {barber.role}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          barber.status === "Active"
                            ? darkTheme.status.success.bg
                            : darkTheme.status.neutral.bg,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            barber.status === "Active"
                              ? darkTheme.status.success.text
                              : darkTheme.status.neutral.text,
                        },
                      ]}
                    >
                      {barber.status}
                    </Text>
                  </View>
                </View>

                {barber.status === "Active" && (
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <HomeIcon
                        size={scale(11)}
                        color={darkTheme.colors.accent}
                        style={styles.metaIcon}
                      />
                      <Text style={styles.metaTextHighlight}>
                        {barber.rating}
                      </Text>
                    </View>
                    <Text style={styles.metaSeparator}>•</Text>
                    <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>
                      {barber.services}
                    </Text>
                  </View>
                )}

                <Text style={styles.salonText}>{barber.salon}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(24),
  },
  dropdown: {
    backgroundColor: "#1A1A1A",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(14),
    height: darkTheme.layout.componentHeight,
    marginBottom: verticalScale(12),
    borderWidth: 1,
  },
  addButton: {
    width: "100%",
    borderRadius: darkTheme.layout.borderRadiusMedium,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(20),
    borderStyle: "solid",
  },
  addIcon: {
    marginRight: scale(6),
  },
  listContainer: {
    gap: verticalScale(12),
  },
  barberCard: {
    borderWidth: 1,
    borderRadius: darkTheme.layout.borderRadiusLarge,
    padding: scale(14),
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarCircle: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
    marginTop: verticalScale(2),
  },
  avatarText: {
    color: "#000000",
    fontSize: scale(14),
    fontWeight: "700",
  },
  cardMainContent: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: verticalScale(6),
  },
  nameRoleContainer: {
    flex: 1,
    paddingRight: scale(6),
  },
  statusBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    borderRadius: darkTheme.layout.borderRadiusSmall,
  },
  statusText: {
    fontSize: scale(9),
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(4),
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIcon: {
    marginRight: scale(4),
  },
  metaTextHighlight: {
    color: "#FF9500",
    fontSize: scale(12),
    fontWeight: "600",
  },
  metaSeparator: {
    color: "#3A3A3C",
    marginHorizontal: scale(6),
    fontSize: scale(12),
  },
  salonText: {
    color: "#48484A",
    fontSize: scale(11),
    fontWeight: "500",
    marginTop: verticalScale(2),
  },
});
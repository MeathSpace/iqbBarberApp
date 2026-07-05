import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import Header from "../../../../components/Header/Header";
import { darkTheme } from "../../../../constants/appTheme";
import { LocationIcon, HomeIcon, StarIcon } from "../../../../constants/icons";
import { useRouter } from "expo-router";

const SalonsScreen = () => {
  const salonsData = [
    {
      id: "1",
      name: "Downtown Barber Co.",
      address: "123 Main St, Downtown",
      rating: "4.8",
      barbers: "5 Barbers",
      isOpen: true,
    },
    {
      id: "2",
      name: "Uptown Cuts & Shaves",
      address: "456 Oak Ave, Uptown",
      rating: "4.6",
      barbers: "3 Barbers",
      isOpen: true,
    },
    {
      id: "3",
      name: "Westside Grooming",
      address: "789 Pine Rd, Westside",
      rating: "4.9",
      barbers: "4 Barbers",
      isOpen: false,
    },
  ];

  const router = useRouter()

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header title={"Salon"} subTitle={"Manage your barbershop locations"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: darkTheme.colors.accent, height: darkTheme.layout.buttonHeight }]}
          activeOpacity={0.8}
          onPress={() => {
            router.push("/createSalon")
          }}
        >
          <Text style={[darkTheme.typography.btnText, { color: "#000000" }]}>Add new Salon</Text>
        </TouchableOpacity>

        <View style={styles.listContainer}>
          {salonsData.map((salon) => (
            <View
              key={salon.id}
              style={[
                styles.salonCard,
                {
                  backgroundColor: darkTheme.colors.card,
                  borderColor: darkTheme.colors.border,
                },
              ]}
            >
              <View style={styles.cardHeaderRow}>
                <Text style={darkTheme.typography.cardTitle}>{salon.name}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: salon.isOpen
                        ? darkTheme.status.success.bg
                        : darkTheme.status.neutral.bg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: salon.isOpen
                          ? darkTheme.status.success.text
                          : darkTheme.status.neutral.text,
                      },
                    ]}
                  >
                    {salon.isOpen ? "Open" : "Closed"}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <LocationIcon
                  size={scale(13)}
                  color={darkTheme.colors.textMuted}
                  style={styles.infoIcon}
                />
                <Text style={darkTheme.typography.bodyMuted}>{salon.address}</Text>
              </View>

              <View style={styles.cardFooterRow}>
                <View style={styles.metaItem}>
                  <StarIcon
                    size={scale(12)}
                    color={darkTheme.colors.accent}
                    style={styles.metaIcon}
                  />
                  <Text style={styles.metaTextHighlight}>{salon.rating}</Text>
                </View>
                <Text style={styles.metaSeparator}>•</Text>
                <Text style={darkTheme.typography.bodyMuted}>{salon.barbers}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
  listContainer: {
    gap: verticalScale(12),
  },
  salonCard: {
    borderWidth: 1,
    borderRadius: darkTheme.layout.borderRadiusLarge,
    padding: scale(16),
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: verticalScale(6),
  },
  statusBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    borderRadius: darkTheme.layout.borderRadiusSmall,
  },
  statusText: {
    fontSize: scale(10),
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(2),
    marginBottom: verticalScale(12),
  },
  infoIcon: {
    marginRight: scale(4),
  },
  cardFooterRow: {
    flexDirection: "row",
    alignItems: "center",
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
    color: "#48484A",
    marginHorizontal: scale(8),
    fontSize: scale(12),
  },
});
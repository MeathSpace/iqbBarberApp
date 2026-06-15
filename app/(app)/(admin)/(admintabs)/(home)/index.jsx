import {
  Dimensions,
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
import {
  BarberIcon,
  CalendarIcon,
  CrossCircleIcon,
  DownIcon,
  HistoryIcon,
  HomeIcon,
  ScissorIcon,
} from "../../../../../constants/icons";

const index = () => {
  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { 
        backgroundColor: darkTheme.colors.background 
      }]}
    >
      <Header title={"Dashboard"} subTitle={"Manage your barbershop"} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[darkTheme.typography.inputLabel, { color: darkTheme.colors.textMuted }]}>Salon</Text>
        <TouchableOpacity
          style={[styles.dropdown, { borderColor: darkTheme.colors.border }]}
          activeOpacity={0.8}
        >
          <Text style={darkTheme.typography.dropdownText}>Baba-Z</Text>
          <DownIcon
            size={scale(20)}
            color={darkTheme.colors.textMuted}
          />
        </TouchableOpacity>

        <Text style={[darkTheme.typography.inputLabel, { color: darkTheme.colors.textMuted }]}>Date Range</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateSelectorContainer}
        >
          <TouchableOpacity
            style={[
              styles.dateTab,
              { backgroundColor: darkTheme.colors.accent },
            ]}
            activeOpacity={0.8}
          >
            <Text style={[darkTheme.typography.tabText, styles.dateTabTextActive]}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateTab} activeOpacity={0.8}>
            <Text style={darkTheme.typography.tabText}>This Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateTab} activeOpacity={0.8}>
            <Text style={darkTheme.typography.tabText}>This Month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateTab} activeOpacity={0.8}>
            <Text style={darkTheme.typography.tabText}>This Year</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.gridContainer}>
          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(255, 149, 0, 0.1)" },
              ]}
            >
              <HomeIcon
                size={scale(18)}
                color={darkTheme.icons.queue}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Virtual Queue</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>8</Text>
          </View>

          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(52, 199, 89, 0.1)" },
              ]}
            >
              <CalendarIcon
                size={scale(18)}
                color={darkTheme.icons.appointments}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Appointments</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>24</Text>
          </View>

          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(255, 59, 48, 0.1)" },
              ]}
            >
              <CrossCircleIcon
                size={scale(18)}
                color={darkTheme.icons.cancellations}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Cancellations</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>2</Text>
          </View>

          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(175, 82, 222, 0.1)" },
              ]}
            >
              <ScissorIcon
                size={scale(18)}
                color={darkTheme.icons.barbers}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Barbers on Duty</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>4</Text>
          </View>

          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(88, 86, 214, 0.1)" },
              ]}
            >
              <HistoryIcon
                size={scale(18)}
                color={darkTheme.icons.wait}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Avg Wait Time</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>15 min</Text>
          </View>

          <View style={[styles.card, { borderColor: darkTheme.colors.border }]}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: "rgba(52, 199, 89, 0.1)" },
              ]}
            >
              <BarberIcon
                size={scale(18)}
                color={darkTheme.icons.revenue}
              />
            </View>
            <Text style={[darkTheme.typography.bodyMuted, { color: darkTheme.colors.textMuted }]}>Revenue</Text>
            <Text style={[darkTheme.typography.cardTitle, { color: darkTheme.colors.textMain }]}>£850.00</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - scale(44)) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(24),
  },
  dropdown: {
    backgroundColor: "#1A1A1A",
    borderRadius: scale(8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(14),
    height: darkTheme.layout.componentHeight,
    marginTop: verticalScale(6),
    marginBottom: verticalScale(16),
    borderWidth: 1,
  },
  dateSelectorContainer: {
    flexDirection: "row",
    marginTop: verticalScale(6),
    marginBottom: verticalScale(20),
  },
  dateTab: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
    marginRight: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  dateTabTextActive: {
    color: "#000000",
    fontWeight: "700",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1A1A1A",
    width: CARD_WIDTH,
    borderRadius: scale(12),
    padding: scale(14),
    marginBottom: verticalScale(12),
    borderWidth: 1,
  },
  iconWrapper: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
});
import { useTheme } from '@react-navigation/native'
import { Image } from 'expo-image'
import { useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import ThemeSafeAreaView from '../../../../components/ThemeSafeAreaView'
import ThemeTextPrimary from '../../../../components/ThemeTextPrimary'

const index = () => {

  const { colors } = useTheme();

  const [tabs, setTabs] = useState([
    {
      id: 1,
      name: "Live Queue"
    },
    {
      id: 2,
      name: "History"
    },
  ])
  const [selectedTab, setSelectedTab] = useState("Live Queue")

  const data = [
    { id: "1", barber: "John Doe", customer: "Michael", posWait: "5 / 10" },
    { id: "2", barber: "Jane Smith", customer: "Sarah", posWait: "2 / 5" },
    { id: "3", barber: "Alex Ray", customer: "David", posWait: "3 / 8" },
    { id: "4", barber: "Emily Clark", customer: "Olivia", posWait: "4 / 7" },
    { id: "5", barber: "David Lee", customer: "Ethan", posWait: "1 / 3" },
    { id: "6", barber: "Sophia Brown", customer: "Liam", posWait: "6 / 12" },
    { id: "7", barber: "Michael Scott", customer: "Pam", posWait: "3 / 6" },
    { id: "8", barber: "Rachel Green", customer: "Monica", posWait: "2 / 4" },
    { id: "9", barber: "Chandler Bing", customer: "Ross", posWait: "5 / 9" },
    { id: "10", barber: "Monica Geller", customer: "Joey", posWait: "3 / 7" },
    { id: "11", barber: "Liam Johnson", customer: "Noah", posWait: "4 / 8" },
    { id: "12", barber: "Olivia Martin", customer: "Emma", posWait: "2 / 5" },
    { id: "13", barber: "Ethan Wilson", customer: "Ava", posWait: "1 / 3" },
    { id: "14", barber: "Ava Davis", customer: "Mia", posWait: "3 / 6" },
    { id: "15", barber: "Noah Miller", customer: "Lucas", posWait: "4 / 9" },
    { id: "16", barber: "Mia Taylor", customer: "Ella", posWait: "2 / 4" },
    { id: "17", barber: "Lucas Anderson", customer: "Lily", posWait: "5 / 10" },
    { id: "18", barber: "Ella Thomas", customer: "Grace", posWait: "3 / 7" },
    { id: "19", barber: "Grace Jackson", customer: "Chloe", posWait: "4 / 8" },
    { id: "20", barber: "Chloe White", customer: "Zoe", posWait: "2 / 5" },
    { id: "21", barber: "Zoe Harris", customer: "Luna", posWait: "1 / 3" },
    { id: "22", barber: "Luna Martin", customer: "Ruby", posWait: "3 / 6" },
    { id: "23", barber: "Ruby Lewis", customer: "Ella", posWait: "4 / 9" },
    { id: "24", barber: "Ella Walker", customer: "Avery", posWait: "2 / 4" },
    { id: "25", barber: "Avery Hall", customer: "Sofia", posWait: "5 / 10" },
    { id: "26", barber: "Sofia Allen", customer: "Isla", posWait: "3 / 7" },
    { id: "27", barber: "Isla Young", customer: "Mila", posWait: "4 / 8" },
    { id: "28", barber: "Mila King", customer: "Hazel", posWait: "2 / 5" },
    { id: "29", barber: "Hazel Wright", customer: "Lydia", posWait: "1 / 3" },
    { id: "30", barber: "Lydia Scott", customer: "Stella", posWait: "3 / 6" },
  ];


  const dataHistory = [
    { id: "1", barber: "John Doe", customer: "Michael", wait: "#1 / ~25m", status: "served" },
    { id: "2", barber: "Emma Smith", customer: "Sarah", wait: "#2 / ~15m", status: "waiting" },
    { id: "3", barber: "Liam Brown", customer: "David", wait: "#3 / ~20m", status: "served" },
    { id: "4", barber: "Olivia Johnson", customer: "Emily", wait: "#4 / ~18m", status: "cancelled" },
    { id: "5", barber: "Noah Davis", customer: "Chloe", wait: "#5 / ~22m", status: "served" },
    { id: "6", barber: "Sophia Miller", customer: "Matthew", wait: "#6 / ~30m", status: "waiting" },
    { id: "7", barber: "James Wilson", customer: "Grace", wait: "#7 / ~12m", status: "served" },
    { id: "8", barber: "Ava Martinez", customer: "Jacob", wait: "#8 / ~28m", status: "no-show" },
    { id: "9", barber: "Ethan Anderson", customer: "Lily", wait: "#9 / ~10m", status: "waiting" },
    { id: "10", barber: "Mia Taylor", customer: "Ryan", wait: "#10 / ~27m", status: "served" },
    { id: "11", barber: "Emma Smith", customer: "Ella", wait: "#1 / ~14m", status: "waiting" },
    { id: "12", barber: "Liam Brown", customer: "Nathan", wait: "#2 / ~26m", status: "served" },
    { id: "13", barber: "Olivia Johnson", customer: "Zoe", wait: "#3 / ~23m", status: "cancelled" },
    { id: "14", barber: "Noah Davis", customer: "Lucas", wait: "#4 / ~19m", status: "served" },
    { id: "15", barber: "Sophia Miller", customer: "Hannah", wait: "#5 / ~21m", status: "no-show" },
    { id: "16", barber: "James Wilson", customer: "Sofia", wait: "#6 / ~16m", status: "waiting" },
    { id: "17", barber: "Ava Martinez", customer: "Aiden", wait: "#7 / ~24m", status: "served" },
    { id: "18", barber: "Ethan Anderson", customer: "Aria", wait: "#8 / ~29m", status: "waiting" },
    { id: "19", barber: "Mia Taylor", customer: "Ethan", wait: "#9 / ~17m", status: "cancelled" },
    { id: "20", barber: "John Doe", customer: "Olivia", wait: "#10 / ~20m", status: "served" },
    { id: "21", barber: "Emma Smith", customer: "Jack", wait: "#1 / ~13m", status: "waiting" },
    { id: "22", barber: "Liam Brown", customer: "Sophie", wait: "#2 / ~15m", status: "served" },
    { id: "23", barber: "Olivia Johnson", customer: "Logan", wait: "#3 / ~18m", status: "waiting" },
    { id: "24", barber: "Noah Davis", customer: "Isabella", wait: "#4 / ~22m", status: "served" },
    { id: "25", barber: "Sophia Miller", customer: "Daniel", wait: "#5 / ~19m", status: "no-show" },
    { id: "26", barber: "James Wilson", customer: "Ella", wait: "#6 / ~27m", status: "served" },
    { id: "27", barber: "Ava Martinez", customer: "Nathan", wait: "#7 / ~11m", status: "waiting" },
    { id: "28", barber: "Ethan Anderson", customer: "Grace", wait: "#8 / ~26m", status: "served" },
    { id: "29", barber: "Mia Taylor", customer: "Chloe", wait: "#9 / ~30m", status: "cancelled" },
    { id: "30", barber: "John Doe", customer: "Liam", wait: "#10 / ~25m", status: "served" },
  ];


  return (
    <ThemeSafeAreaView
      edges={['top', 'left', 'right']}
      style={{
        padding: scale(15),
      }}
    >
      <View style={[styles.queueHeader, {
        backgroundColor: colors.progressBgColor
      }]}>
        {
          tabs.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab(item.name)
                }}
                key={item.id}
                style={[styles.tabButton, {
                  backgroundColor:
                    selectedTab === item.name
                      ? colors.background2
                      : 'transparent'
                }]}><ThemeTextPrimary
                  style={{
                    color: selectedTab === item.name ? "#14b8a6" : colors.textColor1,
                    fontFamily: "AirbnbCereal_W_Bd"
                  }}
                >{item.name}</ThemeTextPrimary></TouchableOpacity>
            )
          })
        }
      </View>

      {
        selectedTab === "Live Queue" && (
          <View style={{
            backgroundColor: colors.background2,
            borderWidth: scale(0.5),
            borderColor: colors.borderColor1,
            borderRadius: scale(8),
            marginTop: verticalScale(10),
            flex: 1
          }}>
            {/* Header */}
            <View style={[styles.liveQueueHeader, {
              borderColor: colors.borderColor1
            }]}>
              <ThemeTextPrimary style={[styles.liveQueueHeaderCell, styles.barberCol, { color: colors.textColor2 }]}>Barber</ThemeTextPrimary>
              <ThemeTextPrimary style={[styles.liveQueueHeaderCell, styles.customerCol, { color: colors.textColor2 }]}>Customer</ThemeTextPrimary>
              <ThemeTextPrimary style={[styles.liveQueueHeaderCell, styles.posCol, styles.right, { color: colors.textColor2 }]}>Pos / Wait</ThemeTextPrimary>
            </View>

            {/* FlatList */}
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              style={{ flex: 1 }}
              renderItem={({ item }) => (
                <View style={[styles.liveQueueRow, {
                  borderBottomColor: colors.borderColor1
                }]}>
                  {/* Barber column with image + name */}
                  <View style={[styles.barberCol, styles.barberCell]}>
                    <Image
                      style={styles.image}
                      source={{ uri: "https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg" }}
                      contentFit="cover"
                      transition={1000}
                    />
                    <ThemeTextPrimary
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        styles.liveQueueCell,
                        styles.left,
                        { flexShrink: 1, minWidth: 0, color: colors.textColor1 } // 👈 This line fixes it
                      ]}
                    >
                      {item.barber}
                    </ThemeTextPrimary>
                  </View>

                  {/* Customer */}
                  <ThemeTextPrimary
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[styles.liveQueueCell, styles.customerCol, styles.left]}
                  >
                    {item.customer}
                  </ThemeTextPrimary>

                  {/* Pos / Wait */}
                  <ThemeTextPrimary
                    style={[styles.liveQueueCell, styles.posCol, styles.right]}
                  >
                    {item.posWait}
                  </ThemeTextPrimary>
                </View>
              )}
              contentContainerStyle={{}}
            />
          </View>
        )
      }

      {
        selectedTab === "History" && (
          <View style={{
            backgroundColor: colors.background2,
            borderWidth: scale(0.5),
            borderColor: colors.borderColor1,
            borderRadius: scale(8),
            marginTop: verticalScale(10),
            flex: 1
          }}>
            {/* Header */}
            <View style={[styles.liveQueueHeader, {
              borderColor: colors.borderColor1
            }]}>
              <ThemeTextPrimary style={[styles.liveQueueHeaderCell, styles.historyBarberCol, { color: colors.textColor2 }]}>Barber</ThemeTextPrimary>
              <ThemeTextPrimary style={[styles.liveQueueHeaderCell, styles.historyCustomerCol, { color: colors.textColor2 }]}>Customer</ThemeTextPrimary>
              <ThemeTextPrimary style={[styles.liveQueueHeaderCell, styles.historyWaitCol, styles.right, { color: colors.textColor2 }]}>Wait</ThemeTextPrimary>
              <ThemeTextPrimary style={[styles.liveQueueHeaderCell, styles.historyStatusCol, styles.right, { color: colors.textColor2 }]}>Status</ThemeTextPrimary>
            </View>

            {/* FlatList */}
            <FlatList
              data={dataHistory}
              keyExtractor={(item) => item.id}
              style={{ flex: 1 }}
              renderItem={({ item }) => (
                <View style={[styles.liveQueueRow, {
                  borderBottomColor: colors.borderColor1
                }]}>
                  {/* Barber column with image + name */}
                  <View style={[styles.historyBarberCol, styles.barberCell]}>
                    <Image
                      style={styles.image}
                      source={{ uri: "https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg" }}
                      contentFit="cover"
                      transition={1000}
                    />
                    <ThemeTextPrimary
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        styles.liveQueueCell,
                        styles.left,
                        { flexShrink: 1, minWidth: 0, color: colors.textColor1 } // 👈 This line fixes it
                      ]}
                    >
                      {item.barber}
                    </ThemeTextPrimary>
                  </View>

                  {/* Customer */}
                  <ThemeTextPrimary
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[styles.liveQueueCell, styles.historyCustomerCol, styles.left]}
                  >
                    {item.customer}
                  </ThemeTextPrimary>

                  {/* Wait */}
                  <ThemeTextPrimary
                    style={[styles.liveQueueCell, styles.historyWaitCol, styles.right]}
                  >
                    {item.wait}
                  </ThemeTextPrimary>

                  {/* Status */}
                  <ThemeTextPrimary
                    style={[styles.liveQueueCell, styles.historyStatusCol, styles.right, { color: "green" }]}
                  >
                    {item.status}
                  </ThemeTextPrimary>
                </View>
              )}
              contentContainerStyle={{}}
            />
          </View>
        )
      }




    </ThemeSafeAreaView >
  )
}

export default index

const styles = StyleSheet.create({
  queueHeader: {
    height: verticalScale(38),
    width: "100%",
    padding: scale(5),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    borderRadius: scale(8)
  },
  tabButton: {
    height: verticalScale(28),
    flex: 1,
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center"
  },

  liveQueueHeader: {
    flexDirection: "row",
    borderBottomWidth: scale(1),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
  },
  liveQueueHeaderCell: {
    fontSize: scale(11),
    fontFamily: "AirbnbCereal_W_Bd",
    textTransform: "uppercase",
  },
  liveQueueRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
  },
  liveQueueCell: {
    fontSize: scale(12),
  },
  left: { textAlign: "left" },
  right: { textAlign: "right" },

  // --- Column width control ---
  barberCol: { flex: 0.45, minWidth: 120 },
  customerCol: { flex: 0.35, minWidth: 90 },
  posCol: { flex: 0.2, minWidth: 70 },

  historyBarberCol: { flex: 0.4, minWidth: 10 },   // Barber names are usually longer
  historyCustomerCol: { flex: 0.25, minWidth: 10 }, // Customer names moderately long
  historyWaitCol: { flex: 0.2, minWidth: 10 },      // Short numeric value
  historyStatusCol: { flex: 0.2, minWidth: 10 },     // Small text like “Done” or “Waiting”


  // --- Barber cell with image ---
  barberCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },

  // --- Profile image ---
  image: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: "#E2E8F0",
  },
})
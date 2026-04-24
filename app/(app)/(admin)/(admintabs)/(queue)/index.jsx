// import { useTheme } from "@react-navigation/native";
// import { Image } from "expo-image";
// import { useState } from "react";
// import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
// import { scale, verticalScale } from "react-native-size-matters";
// import ThemeSafeAreaView from "../../../../../components/ThemeSafeAreaView";
// import ThemeTextPrimary from "../../../../../components/ThemeTextPrimary";
// import i18n from "../../../../src/localization/i18n";

// const index = () => {
//   const baseContent = i18n.t("app.admin.admintabs.queue");
//   const { colors } = useTheme();

//   const [tabs, setTabs] = useState([
//     { id: 1, name: baseContent.tabs.liveQueue },
//     { id: 2, name: baseContent.tabs.history },
//   ]);

//   const [selectedTab, setSelectedTab] = useState(baseContent.tabs.liveQueue);

//   const data = [
//     { id: "1", barber: "John Doe", customer: "Michael", posWait: "5 / 10" },
//     { id: "2", barber: "Jane Smith", customer: "Sarah", posWait: "2 / 5" },
//     { id: "3", barber: "Alex Ray", customer: "David", posWait: "3 / 8" },
//     { id: "4", barber: "Emily Clark", customer: "Olivia", posWait: "4 / 7" },
//     { id: "5", barber: "David Lee", customer: "Ethan", posWait: "1 / 3" },
//   ];

//   const dataHistory = [
//     {
//       id: "1",
//       barber: "John Doe",
//       customer: "Michael",
//       wait: "#1 / ~25m",
//       status: "served",
//     },
//     {
//       id: "2",
//       barber: "Emma Smith",
//       customer: "Sarah",
//       wait: "#2 / ~15m",
//       status: "waiting",
//     },
//     {
//       id: "3",
//       barber: "Liam Brown",
//       customer: "David",
//       wait: "#3 / ~20m",
//       status: "served",
//     },
//     {
//       id: "4",
//       barber: "Olivia Johnson",
//       customer: "Emily",
//       wait: "#4 / ~18m",
//       status: "cancelled",
//     },
//     {
//       id: "5",
//       barber: "Noah Davis",
//       customer: "Chloe",
//       wait: "#5 / ~22m",
//       status: "served",
//     },
//   ];

//   return (
//     <ThemeSafeAreaView
//       edges={["top", "left", "right"]}
//       style={{
//         padding: scale(15),
//       }}
//     >
//       <View
//         style={[
//           styles.queueHeader,
//           {
//             backgroundColor: colors.progressBgColor,
//           },
//         ]}
//       >
//         {tabs.map((item) => {
//           return (
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedTab(item.name);
//               }}
//               key={item.id}
//               style={[
//                 styles.tabButton,
//                 {
//                   backgroundColor:
//                     selectedTab === item.name
//                       ? colors.background2
//                       : "transparent",
//                 },
//               ]}
//             >
//               <ThemeTextPrimary
//                 style={{
//                   color:
//                     selectedTab === item.name ? "#14b8a6" : colors.textColor1,
//                   fontFamily: "AirbnbCereal_W_Bd",
//                 }}
//               >
//                 {item.name}
//               </ThemeTextPrimary>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {selectedTab === baseContent.tabs.liveQueue && (
//         <View
//           style={{
//             backgroundColor: colors.background2,
//             borderWidth: scale(0.5),
//             borderColor: colors.borderColor1,
//             borderRadius: scale(8),
//             marginTop: verticalScale(10),
//             flex: 1,
//           }}
//         >
//           {/* Header */}
//           <View
//             style={[
//               styles.liveQueueHeader,
//               {
//                 borderColor: colors.borderColor1,
//               },
//             ]}
//           >
//             <ThemeTextPrimary
//               style={[
//                 styles.liveQueueHeaderCell,
//                 styles.barberCol,
//                 { color: colors.textColor2 },
//               ]}
//             >
//               {baseContent.liveQueue.header.barber}
//             </ThemeTextPrimary>
//             <ThemeTextPrimary
//               style={[
//                 styles.liveQueueHeaderCell,
//                 styles.customerCol,
//                 { color: colors.textColor2 },
//               ]}
//             >
//               {baseContent.liveQueue.header.customer}
//             </ThemeTextPrimary>
//             <ThemeTextPrimary
//               style={[
//                 styles.liveQueueHeaderCell,
//                 styles.posCol,
//                 styles.right,
//                 { color: colors.textColor2 },
//               ]}
//             >
//               {baseContent.liveQueue.header.posWait}
//             </ThemeTextPrimary>
//           </View>

//           {/* FlatList */}
//           <FlatList
//             data={data}
//             keyExtractor={(item) => item.id}
//             style={{ flex: 1 }}
//             renderItem={({ item }) => (
//               <View
//                 style={[
//                   styles.liveQueueRow,
//                   {
//                     borderBottomColor: colors.borderColor1,
//                   },
//                 ]}
//               >
//                 {/* Barber column with image + name */}
//                 <View style={[styles.barberCol, styles.barberCell]}>
//                   <Image
//                     style={styles.image}
//                     source={{
//                       uri: "https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg",
//                     }}
//                     contentFit="cover"
//                     transition={1000}
//                   />
//                   <ThemeTextPrimary
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     style={[
//                       styles.liveQueueCell,
//                       styles.left,
//                       { flexShrink: 1, minWidth: 0, color: colors.textColor1 }, // 👈 This line fixes it
//                     ]}
//                   >
//                     {item.barber}
//                   </ThemeTextPrimary>
//                 </View>

//                 {/* Customer */}
//                 <ThemeTextPrimary
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                   style={[
//                     styles.liveQueueCell,
//                     styles.customerCol,
//                     styles.left,
//                   ]}
//                 >
//                   {item.customer}
//                 </ThemeTextPrimary>

//                 {/* Pos / Wait */}
//                 <ThemeTextPrimary
//                   style={[styles.liveQueueCell, styles.posCol, styles.right]}
//                 >
//                   {item.posWait}
//                 </ThemeTextPrimary>
//               </View>
//             )}
//             contentContainerStyle={{}}
//           />
//         </View>
//       )}

//       {selectedTab === baseContent.tabs.history && (
//         <View
//           style={{
//             backgroundColor: colors.background2,
//             borderWidth: scale(0.5),
//             borderColor: colors.borderColor1,
//             borderRadius: scale(8),
//             marginTop: verticalScale(10),
//             flex: 1,
//           }}
//         >
//           {/* Header */}
//           <View
//             style={[
//               styles.liveQueueHeader,
//               {
//                 borderColor: colors.borderColor1,
//               },
//             ]}
//           >
//             <ThemeTextPrimary
//               style={[
//                 styles.liveQueueHeaderCell,
//                 styles.historyBarberCol,
//                 { color: colors.textColor2 },
//               ]}
//             >
//               {baseContent.history.header.barber}
//             </ThemeTextPrimary>
//             <ThemeTextPrimary
//               style={[
//                 styles.liveQueueHeaderCell,
//                 styles.historyCustomerCol,
//                 { color: colors.textColor2 },
//               ]}
//             >
//               {baseContent.history.header.customer}
//             </ThemeTextPrimary>
//             <ThemeTextPrimary
//               style={[
//                 styles.liveQueueHeaderCell,
//                 styles.historyWaitCol,
//                 styles.right,
//                 { color: colors.textColor2 },
//               ]}
//             >
//               {baseContent.history.header.wait}
//             </ThemeTextPrimary>
//             <ThemeTextPrimary
//               style={[
//                 styles.liveQueueHeaderCell,
//                 styles.historyStatusCol,
//                 styles.right,
//                 { color: colors.textColor2 },
//               ]}
//             >
//               {baseContent.history.header.status}
//             </ThemeTextPrimary>
//           </View>

//           {/* FlatList */}
//           <FlatList
//             data={dataHistory}
//             keyExtractor={(item) => item.id}
//             style={{ flex: 1 }}
//             renderItem={({ item }) => (
//               <View
//                 style={[
//                   styles.liveQueueRow,
//                   {
//                     borderBottomColor: colors.borderColor1,
//                   },
//                 ]}
//               >
//                 {/* Barber column with image + name */}
//                 <View style={[styles.historyBarberCol, styles.barberCell]}>
//                   <Image
//                     style={styles.image}
//                     source={{
//                       uri: "https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg",
//                     }}
//                     contentFit="cover"
//                     transition={1000}
//                   />
//                   <ThemeTextPrimary
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     style={[
//                       styles.liveQueueCell,
//                       styles.left,
//                       { flexShrink: 1, minWidth: 0, color: colors.textColor1 }, // 👈 This line fixes it
//                     ]}
//                   >
//                     {item.barber}
//                   </ThemeTextPrimary>
//                 </View>

//                 {/* Customer */}
//                 <ThemeTextPrimary
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                   style={[
//                     styles.liveQueueCell,
//                     styles.historyCustomerCol,
//                     styles.left,
//                   ]}
//                 >
//                   {item.customer}
//                 </ThemeTextPrimary>

//                 {/* Wait */}
//                 <ThemeTextPrimary
//                   style={[
//                     styles.liveQueueCell,
//                     styles.historyWaitCol,
//                     styles.right,
//                   ]}
//                 >
//                   {item.wait}
//                 </ThemeTextPrimary>

//                 {/* Status */}
//                 <ThemeTextPrimary
//                   style={[
//                     styles.liveQueueCell,
//                     styles.historyStatusCol,
//                     styles.right,
//                     { color: "green" },
//                   ]}
//                 >
//                   {item.status}
//                 </ThemeTextPrimary>
//               </View>
//             )}
//             contentContainerStyle={{}}
//           />
//         </View>
//       )}
//     </ThemeSafeAreaView>
//   );
// };

// export default index;

// const styles = StyleSheet.create({
//   queueHeader: {
//     height: verticalScale(38),
//     width: "100%",
//     padding: scale(5),
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(10),
//     borderRadius: scale(8),
//   },
//   tabButton: {
//     height: verticalScale(28),
//     flex: 1,
//     borderRadius: scale(8),
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   liveQueueHeader: {
//     flexDirection: "row",
//     borderBottomWidth: scale(1),
//     paddingHorizontal: scale(15),
//     paddingVertical: verticalScale(15),
//   },
//   liveQueueHeaderCell: {
//     fontSize: scale(11),
//     fontFamily: "AirbnbCereal_W_Bd",
//     textTransform: "uppercase",
//   },
//   liveQueueRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: scale(15),
//     paddingVertical: verticalScale(15),
//     borderBottomWidth: 1,
//   },
//   liveQueueCell: {
//     fontSize: scale(12),
//   },
//   left: { textAlign: "left" },
//   right: { textAlign: "right" },

//   // --- Column width control ---
//   barberCol: { flex: 0.45, minWidth: 120 },
//   customerCol: { flex: 0.35, minWidth: 90 },
//   posCol: { flex: 0.2, minWidth: 70 },

//   historyBarberCol: { flex: 0.4, minWidth: 10 }, // Barber names are usually longer
//   historyCustomerCol: { flex: 0.25, minWidth: 10 }, // Customer names moderately long
//   historyWaitCol: { flex: 0.2, minWidth: 10 }, // Short numeric value
//   historyStatusCol: { flex: 0.2, minWidth: 10 }, // Small text like “Done” or “Waiting”

//   // --- Barber cell with image ---
//   barberCell: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(10),
//   },

//   // --- Profile image ---
//   image: {
//     width: scale(30),
//     height: scale(30),
//     borderRadius: scale(15),
//     backgroundColor: "#E2E8F0",
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import ThemeSafeAreaView from "../../../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../../../components/ThemeTextPrimary";
import ThemeTextSecondary from "../../../../../components/ThemeTextSecondary";

const QueueList = () => {
  const { colors } = useTheme();

  const TabPill = ({ label, isActive }) => (
    <TouchableOpacity
      style={[
        styles.tabPill,
        {
          backgroundColor: isActive ? colors.background.color3 : "transparent",
          borderWidth: isActive ? 1 : 0,
          borderColor: isActive ? colors.borderColor.color1 : "transparent",
        },
      ]}
    >
      <ThemeTextPrimary
        style={{
          color: isActive ? colors.textColor.color3 : colors.textColor.color2,
          fontFamily: isActive ? "AirbnbCereal_W_Bd" : "AirbnbCereal_W_Md",
        }}
      >
        {label}
      </ThemeTextPrimary>
    </TouchableOpacity>
  );

  const FilterButton = ({ label }) => (
    <TouchableOpacity
      style={[styles.filterBtn, { backgroundColor: colors.background.color4 }]}
    >
      <ThemeTextSecondary
        style={{
          color: colors.textColor.color3,
          fontFamily: "AirbnbCereal_W_Bd",
          fontSize: scale(12),
        }}
      >
        {label}
      </ThemeTextSecondary>
      <Ionicons name="chevron-down" size={12} color={colors.textColor.color3} />
    </TouchableOpacity>
  );

  const WaitCard = ({ label, boldValue, unitValue }) => (
    <View
      style={[styles.waitCard, { backgroundColor: colors.background.color3 }]}
    >
      <ThemeTextSecondary
        style={{
          fontSize: scale(11),
          color: colors.textColor.color2,
          marginBottom: verticalScale(10),
        }}
      >
        {label}
      </ThemeTextSecondary>
      <View style={styles.waitRow}>
        <ThemeTextPrimary
          style={{
            fontSize: scale(28),
            fontFamily: "AirbnbCereal_W_Bd",
            color:
              unitValue === "mins"
                ? colors.textColor.color3
                : colors.textColor.color1,
          }}
        >
          {unitValue === "mins" ? "~" : ""}
          {boldValue}
        </ThemeTextPrimary>
        <ThemeTextSecondary
          style={{
            fontSize: scale(14),
            color:
              unitValue === "people"
                ? colors.textColor.color2
                : colors.textColor.color3,
          }}
        >
          {unitValue}
        </ThemeTextSecondary>
      </View>
    </View>
  );

  const QueueListItem = ({ position, name, customer, wait, isInChair }) => (
    <View
      style={[styles.queueItem, { backgroundColor: colors.background.color3 }]}
    >
      <View style={styles.queueLeft}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100?u=marcus" }}
          style={styles.stylistAvatar}
        />
        <View
          style={[
            styles.avatarPosition,
            {
              backgroundColor: isInChair
                ? colors.textColor.color3
                : colors.textColor.color2,
            },
          ]}
        >
          <ThemeTextPrimary style={styles.positionText}>
            #{position}
          </ThemeTextPrimary>
        </View>
      </View>

      <View style={styles.queueCenter}>
        {isInChair && (
          <ThemeTextSecondary
            style={{
              color: colors.textColor.color3,
              fontSize: scale(10),
              fontFamily: "AirbnbCereal_W_Bd",
            }}
          >
            NOW SERVING
          </ThemeTextSecondary>
        )}
        <ThemeTextPrimary style={{ fontSize: scale(16) }}>
          {name}
        </ThemeTextPrimary>
        <ThemeTextSecondary
          style={{ fontSize: scale(11), color: colors.textColor.color2 }}
        >
          Customer: {customer}
        </ThemeTextSecondary>
      </View>

      <View style={styles.queueRight}>
        {isInChair ? (
          <>
            <View
              style={[
                styles.chairTag,
                { backgroundColor: colors.background.color4 },
              ]}
            >
              <ThemeTextSecondary
                style={{
                  fontSize: scale(10),
                  color: colors.textColor.color3,
                  fontFamily: "AirbnbCereal_W_Bd",
                }}
              >
                In Chair
              </ThemeTextSecondary>
            </View>
            <ThemeTextSecondary
              style={{ fontSize: scale(11), color: colors.textColor.color2 }}
            >
              {wait}
            </ThemeTextSecondary>
          </>
        ) : (
          <>
            <ThemeTextPrimary style={{ fontSize: scale(16) }}>
              {wait}
            </ThemeTextPrimary>
            <ThemeTextSecondary
              style={{ fontSize: scale(10), color: colors.textColor.color2 }}
            >
              WAIT TIME
            </ThemeTextSecondary>
          </>
        )}
      </View>
    </View>
  );

  return (
    <ThemeSafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: colors.background.color1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header]}>
          <View style={styles.headerTop}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100?u=jessica" }}
              style={styles.profileAvatar}
            />
            <ThemeTextPrimary
              style={{ fontSize: scale(16), color: colors.textColor.color8 }}
            >
              Jessica
            </ThemeTextPrimary>
          </View>
          <TouchableOpacity
            style={[
              styles.notifBtn,
              { backgroundColor: colors.background.color2 },
            ]}
          >
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.textColor.color8}
            />
          </TouchableOpacity>
        </View>

        <ThemeTextPrimary style={styles.pageTitle}>Queue List</ThemeTextPrimary>
        <ThemeTextSecondary
          style={{
            paddingHorizontal: scale(20),
            color: colors.textColor.color2,
            marginBottom: verticalScale(20),
          }}
        >
          Real-time salon wait times and history.
        </ThemeTextSecondary>

        <View
          style={[styles.tabBar, { backgroundColor: colors.background.color2 }]}
        >
          <TabPill label="Live Queue" isActive={true} />
          <TabPill label="History" isActive={false} />
        </View>

        <ThemeTextPrimary
          style={{
            paddingHorizontal: scale(20),
            color: colors.textColor.color3,
            fontFamily: "AirbnbCereal_W_Bd",
            marginBottom: verticalScale(8),
          }}
        >
          Search Customer
        </ThemeTextPrimary>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Marcus"
            placeholderTextColor={colors.textColor.color5}
            style={[
              styles.searchInput,
              {
                borderColor: colors.textColor.color3,
                backgroundColor: colors.background.color3,
                color: colors.textColor.color1,
              },
            ]}
          />
          <Ionicons
            name="search"
            size={22}
            color={colors.textColor.color3}
            style={styles.searchIcon}
          />
        </View>

        <View style={styles.filterRow}>
          <FilterButton label="Sort" />
          <FilterButton label="Stylist" />
        </View>

        <View style={styles.waitSummaryRow}>
          <WaitCard label="ESTIMATED WAIT" boldValue="45" unitValue="mins" />
          <WaitCard label="IN QUEUE" boldValue="08" unitValue="people" />
        </View>
        
        <View style={styles.queueListContainer}>
          <QueueListItem
            position="1"
            name="Marcus V."
            customer="Julian S."
            wait="05m left"
            isInChair={true}
          />
          <QueueListItem
            position="2"
            name="Marcus V."
            customer="Julian S."
            wait="~15m"
            isInChair={false}
          />
          <QueueListItem
            position="3"
            name="Marcus V."
            customer="Julian S."
            wait="~25m"
            isInChair={false}
          />
          <QueueListItem
            position="4"
            name="Marcus V."
            customer="Julian S."
            wait="~35m"
            isInChair={false}
          />
          <QueueListItem
            position="5"
            name="Marcus V."
            customer="Julian S."
            wait="~45m"
            isInChair={false}
          />
        </View>

        <View style={{ height: verticalScale(30) }} />
      </ScrollView>
    </ThemeSafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(15),
  },
  headerTop: { flexDirection: "row", alignItems: "center", gap: scale(10) },
  profileAvatar: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
  },
  notifBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: scale(28),
    fontFamily: "AirbnbCereal_W_Bd",
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(5),
  },
  tabBar: {
    flexDirection: "row",
    marginHorizontal: scale(20),
    padding: scale(3),
    borderRadius: scale(25),
    marginBottom: verticalScale(20),
  },
  tabPill: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: "center",
    borderRadius: scale(25),
  },
  searchContainer: {
    marginHorizontal: scale(20),
    marginBottom: verticalScale(15),
    justifyContent: "center",
  },
  searchInput: {
    borderWidth: 1.5,
    borderRadius: scale(10),
    paddingVertical: verticalScale(12),
    paddingLeft: scale(15),
    paddingRight: scale(45),
    fontFamily: "AirbnbCereal_W_Md",
  },
  searchIcon: { position: "absolute", right: scale(15) },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: scale(20),
    gap: scale(10),
    marginBottom: verticalScale(25),
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(10),
  },
  waitSummaryRow: {
    flexDirection: "row",
    paddingHorizontal: scale(20),
    gap: scale(15),
    marginBottom: verticalScale(25),
  },
  waitCard: {
    flex: 1,
    padding: scale(15),
    borderRadius: scale(15),
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
  },
  waitRow: { flexDirection: "row", alignItems: "baseline", gap: scale(4) },
  queueListContainer: { paddingHorizontal: scale(20), gap: scale(10) },
  queueItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: scale(12),
    borderRadius: scale(15),
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
  },
  queueLeft: { position: "relative", marginRight: scale(15) },
  stylistAvatar: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
  },
  avatarPosition: {
    position: "absolute",
    bottom: -scale(4),
    right: -scale(4),
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    justifyContent: "center",
    alignItems: "center",
  },
  positionText: {
    color: "white",
    fontSize: scale(10),
    fontFamily: "AirbnbCereal_W_Bd",
  },
  queueCenter: { flex: 1 },
  queueRight: { alignItems: "flex-end" },
  chairTag: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(10),
    marginBottom: verticalScale(2),
  },
});

export default QueueList;

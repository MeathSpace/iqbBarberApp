// import { useTheme } from "@react-navigation/native";
// import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";
// import { useState } from "react";
// import { ScrollView, StyleSheet, Switch, View } from "react-native";
// import { moderateScale, scale, verticalScale } from "react-native-size-matters";
// import ThemeSafeAreaView from "../../../../../components/ThemeSafeAreaView";
// import ThemeTextPrimary from "../../../../../components/ThemeTextPrimary";
// import ThemeTextSecondary from "../../../../../components/ThemeTextSecondary";
// import {
//   CalendarIcon,
//   NotificationIcon,
//   ProfileIcon,
//   QueueIcon,
//   ScissorIcon,
// } from "../../../../../constants/icons";
// import i18n from "../../../../src/localization/i18n";

// const index = () => {
//   const baseContent = i18n.t("app.admin.admintabs.home");

//   const { colors } = useTheme();
//   const [isOnline, setIsOnline] = useState(true);

//   const statusData = [
//     {
//       id: 1,
//       label: baseContent.status.inQueue,
//       value: 53,
//       iconBg: "#f3e8ff",
//       icon: <QueueIcon size={scale(20)} color="#9333ea" />,
//     },
//     {
//       id: 2,
//       label: baseContent.status.appointment,
//       value: 1,
//       iconBg: "#dbeafe",
//       icon: <CalendarIcon size={scale(20)} color="#2563eb" />,
//     },
//     {
//       id: 3,
//       label: baseContent.status.onDuty,
//       value: 5,
//       iconBg: "#ffedd5",
//       icon: <ProfileIcon size={scale(20)} color="#ea580c" />,
//     },
//     {
//       id: 4,
//       label: baseContent.status.customer,
//       value: 12,
//       iconBg: "#dcfce7",
//       icon: <ProfileIcon size={scale(20)} color="#16a34a" />,
//     },
//   ];

//   const reports = [
//     {
//       icon: <CalendarIcon color="#9333ea" size={scale(16)} />,
//       iconBg: "#f3e8ff",
//       iconColor: "#9333ea",
//       title: baseContent.reports.appointments.title,
//       total: baseContent.reports.appointments.total.replace("{{count}}", 32),
//       data: [
//         {
//           label: baseContent.reports.appointments.completed,
//           color: "#22c55e",
//           value: 87.5,
//           count: "28 / 32",
//         },
//         {
//           label: baseContent.reports.appointments.noShows,
//           color: "#ef4444",
//           value: 12.5,
//           count: "4 / 32",
//         },
//       ],
//     },
//     {
//       icon: <QueueIcon color="#2563eb" size={scale(16)} />,
//       iconBg: "#dbeafe",
//       iconColor: "#2563eb",
//       title: baseContent.reports.queueBookings.title,
//       total: baseContent.reports.queueBookings.total.replace("{{count}}", 48),
//       data: [
//         {
//           label: baseContent.reports.queueBookings.served,
//           color: "#22c55e",
//           value: 87.5,
//           count: "42 / 48",
//         },
//         {
//           label: baseContent.reports.queueBookings.cancelled,
//           color: "#ef4444",
//           value: 12.5,
//           count: "6 / 48",
//         },
//       ],
//     },
//   ];

//   return (
//     <ThemeSafeAreaView
//       style={{
//         backgroundColor: colors.background2,
//       }}
//       edges={["top", "left", "right"]}
//     >
//       {/* Header */}
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           height: verticalScale(60),
//           backgroundColor: colors.background2,
//           borderBottomColor: colors.borderColor1,
//           borderBottomWidth: scale(1),
//           paddingHorizontal: scale(12),
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             gap: scale(10),
//           }}
//         >
//           <Image
//             style={styles.image}
//             source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
//             contentFit="cover"
//             transition={1000}
//           />
//           <View>
//             <ThemeTextPrimary>Jessica</ThemeTextPrimary>
//             <ThemeTextSecondary>
//               {baseContent.header.salonName}
//             </ThemeTextSecondary>
//           </View>
//         </View>

//         <View>
//           <NotificationIcon color={colors.textColor1} />
//         </View>
//       </View>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={{
//           flex: 1,
//         }}
//         contentContainerStyle={styles.scrollContainer}
//       >
//         {/* Section 1 */}
//         <View style={styles.upcommingAppointmentSection}>
//           <LinearGradient
//             colors={["#14b8a6", "#0d9488"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.card}
//           >
//             <View
//               style={[
//                 styles.topRow,
//                 {
//                   borderBottomColor: "#efefef",
//                 },
//               ]}
//             >
//               {/* ICON BOX */}
//               <View style={styles.iconBox}>
//                 <ScissorIcon size={moderateScale(26)} color="#fff" />
//               </View>

//               {/* SALON INFO */}
//               <View style={{ flex: 1 }}>
//                 <ThemeTextPrimary style={styles.clientName}>
//                   {baseContent.salonCard.title}
//                 </ThemeTextPrimary>

//                 <ThemeTextSecondary style={styles.clientDetails}>
//                   {baseContent.salonCard.subtitle}
//                 </ThemeTextSecondary>
//               </View>
//             </View>

//             {/* ACTION BUTTONS */}
//             <View style={styles.buttonRow}>
//               <View>
//                 <ThemeTextSecondary style={{ color: "#efefef" }}>
//                   {baseContent.salonCard.statusLabel}
//                 </ThemeTextSecondary>

//                 <ThemeTextPrimary
//                   style={{ color: "#fff", fontFamily: "AirbnbCereal_W_Bd" }}
//                 >
//                   {baseContent.salonCard.open}
//                 </ThemeTextPrimary>
//               </View>

//               <Switch
//                 value={isOnline}
//                 onValueChange={setIsOnline}
//                 thumbColor={isOnline ? "#fff" : "#fff"}
//                 trackColor={{
//                   false: "#ef4444", // Tailwind red-500
//                   true: "#14b8a6", // Tailwind teal-500
//                 }}
//               />
//             </View>
//           </LinearGradient>
//         </View>

//         {/* Section 2 */}
//         <View style={styles.liveStatusSection}>
//           <ThemeTextPrimary
//             style={[
//               styles.sectionTitle,
//               {
//                 fontSize: scale(18),
//                 fontFamily: "AirbnbCereal_W_Bd",
//               },
//             ]}
//           >
//             {baseContent.sections.liveStatus}
//           </ThemeTextPrimary>

//           <View style={styles.statusGrid}>
//             {statusData.map((item) => (
//               <View
//                 key={item.id}
//                 style={[
//                   styles.statusCard,
//                   {
//                     backgroundColor: colors.background,
//                     borderColor: colors.borderColor1,
//                   },
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.statusIconContainer,
//                     { backgroundColor: item.iconBg },
//                   ]}
//                 >
//                   {item.icon}
//                 </View>

//                 <View>
//                   <ThemeTextSecondary>{item.label}</ThemeTextSecondary>
//                   <ThemeTextPrimary>{item.value}</ThemeTextPrimary>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Section 3 */}
//         <View style={styles.weeklyReportsSection}>
//           <ThemeTextPrimary
//             style={[
//               styles.sectionTitle,
//               {
//                 fontSize: scale(18),
//                 fontFamily: "AirbnbCereal_W_Bd",
//               },
//             ]}
//           >
//             {baseContent.sections.weeklyReports}
//           </ThemeTextPrimary>

//           <View style={{ gap: verticalScale(12) }}>
//             {reports.map((item, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.weeklyReportCard,
//                   {
//                     backgroundColor: colors.background,
//                     borderColor: colors.borderColor1,
//                   },
//                 ]}
//               >
//                 {/* Header Row */}
//                 <View style={styles.weeklyReportHeader}>
//                   <View
//                     style={[
//                       styles.weeklyReportIconContainer,
//                       { backgroundColor: item.iconBg },
//                     ]}
//                   >
//                     {item.icon}
//                   </View>

//                   <ThemeTextPrimary
//                     style={[
//                       styles.weeklyReportHeaderTitle,
//                       {
//                         // color: colors.textColor3
//                       },
//                     ]}
//                   >
//                     {item.title}
//                   </ThemeTextPrimary>

//                   <ThemeTextPrimary style={styles.weeklyReportTotal}>
//                     {item.total}
//                   </ThemeTextPrimary>
//                 </View>

//                 {/* Progress Rows */}
//                 <View style={{ gap: verticalScale(10) }}>
//                   {item.data.map((progress, i) => (
//                     <View key={i}>
//                       <View style={styles.weeklyReportProgressTop}>
//                         <ThemeTextPrimary
//                           style={[
//                             styles.weeklyReportProgressLabel,
//                             { color: progress.color },
//                           ]}
//                         >
//                           {progress.label}
//                         </ThemeTextPrimary>
//                         <ThemeTextSecondary
//                           style={[
//                             styles.weeklyReportProgressCount,
//                             {
//                               color: colors.textColor2,
//                             },
//                           ]}
//                         >
//                           {progress.count}
//                         </ThemeTextSecondary>
//                       </View>

//                       <View
//                         style={[
//                           styles.weeklyReportProgressBarBackground,
//                           {
//                             backgroundColor: colors.progressBgColor,
//                           },
//                         ]}
//                       >
//                         <View
//                           style={[
//                             styles.weeklyReportProgressBarFill,
//                             {
//                               width: `${progress.value}%`,
//                               backgroundColor: progress.color,
//                             },
//                           ]}
//                         />
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </ThemeSafeAreaView>
//   );
// };

// export default index;

// const styles = StyleSheet.create({
//   image: {
//     width: scale(40),
//     height: scale(40),
//     backgroundColor: "#0553",
//     borderRadius: scale(20),
//   },

//   scrollContainer: {
//     paddingHorizontal: scale(15),
//     paddingVertical: verticalScale(15),
//     gap: verticalScale(15),
//   },

//   card: {
//     width: "100%",
//     borderRadius: scale(20),
//     padding: scale(14),
//     marginRight: scale(12),
//   },
//   topRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(12),
//     paddingBottom: verticalScale(10),
//     borderBottomWidth: 1,
//   },
//   iconBox: {
//     width: scale(50),
//     height: scale(50),
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(255,255,255,0.25)",
//     borderRadius: scale(10),
//   },

//   clientName: {
//     color: "#fff",
//     fontSize: scale(18),
//     fontFamily: "AirbnbCereal_W_Bd",
//   },
//   clientDetails: {
//     color: "#fff",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: verticalScale(15),
//     gap: scale(12),
//   },
//   cancelBtn: {
//     flex: 1,
//     borderRadius: scale(10),
//     paddingVertical: scale(10),
//     backgroundColor: "rgba(255,255,255,0.2)",
//     alignItems: "center",
//   },
//   serveBtn: {
//     flex: 1,
//     borderRadius: scale(10),
//     paddingVertical: scale(10),
//     backgroundColor: "#fff",
//     alignItems: "center",
//   },
//   cancelText: {
//     color: "#fff",
//   },

//   liveStatusSection: {
//     flexDirection: "column",
//     gap: verticalScale(10),
//   },

//   statusGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     gap: verticalScale(16),
//   },
//   statusCard: {
//     borderWidth: scale(1),
//     borderRadius: scale(16),
//     height: verticalScale(60),
//     paddingHorizontal: scale(8),
//     width: "47%",
//     flexDirection: "row",
//     alignItems: "center",
//     // marginBottom: verticalScale(16),
//     gap: scale(12),
//   },

//   statusIconContainer: {
//     padding: scale(7),
//     borderRadius: scale(12),
//   },

//   weeklyReportsSection: {
//     flexDirection: "column",
//     gap: verticalScale(10),
//   },

//   weeklyReportCard: {
//     borderWidth: 1,
//     borderRadius: moderateScale(16),
//     padding: moderateScale(12),
//   },
//   weeklyReportHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: verticalScale(8),
//   },
//   weeklyReportIconContainer: {
//     padding: moderateScale(6),
//     borderRadius: 999,
//     marginRight: scale(8),
//   },
//   weeklyReportHeaderTitle: {
//     fontSize: scale(14),
//     flex: 1,
//   },
//   weeklyReportTotal: {
//     fontWeight: "700",
//     fontSize: moderateScale(12),
//     // color: "#1e293b", // slate-800
//   },
//   weeklyReportProgressTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: verticalScale(4),
//   },
//   weeklyReportProgressLabel: {
//     fontSize: moderateScale(12),
//   },
//   weeklyReportProgressCount: {
//     fontSize: moderateScale(12),
//   },
//   weeklyReportProgressBarBackground: {
//     width: "100%",
//     height: verticalScale(8),
//     borderRadius: moderateScale(8),
//     overflow: "hidden",
//   },
//   weeklyReportProgressBarFill: {
//     height: "100%",
//     borderRadius: moderateScale(8),
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import ThemeSafeAreaView from "../../../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../../../components/ThemeTextPrimary";
import ThemeTextSecondary from "../../../../../components/ThemeTextSecondary";

const SalonDashboard = () => {
  const { colors } = useTheme();

  const StatusCard = ({ label, value }) => (
    <View
      style={[
        styles.statusCard,
        {
          borderColor: colors.borderColor.color1,
          backgroundColor: colors.background.color3,
        },
      ]}
    >
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: colors.textColor.color3 },
        ]}
      >
        <ThemeTextPrimary style={styles.statusValue}>{value}</ThemeTextPrimary>
      </View>

      <ThemeTextSecondary
        style={[styles.statusLabel, { color: colors.textColor.color2 }]}
      >
        {label}
      </ThemeTextSecondary>
    </View>
  );

  const ReportSection = ({ title, data }) => (
    <View
      style={[
        styles.reportContainer,
        { backgroundColor: colors.background.color3 },
      ]}
    >
      <View style={styles.reportHeader}>
        <ThemeTextPrimary style={styles.reportTitle}>{title}</ThemeTextPrimary>

        <View
          style={[styles.tag, { backgroundColor: colors.background.color4 }]}
        >
          <ThemeTextSecondary
            style={[styles.tagText, { color: colors.textColor.color3 }]}
          >
            THIS WEEK
          </ThemeTextSecondary>
        </View>
      </View>

      {data.map((item, index) => (
        <View key={index} style={styles.metricRow}>
          <View style={styles.metricTextRow}>
            <View>
              <ThemeTextPrimary style={styles.metricName}>
                {item.label}
              </ThemeTextPrimary>

              <ThemeTextSecondary
                style={[styles.metricSub, { color: colors.textColor.color2 }]}
              >
                {item.sub}
              </ThemeTextSecondary>
            </View>

            <ThemeTextPrimary
              style={[styles.metricPercent, { color: item.color }]}
            >
              {item.percentage}%
            </ThemeTextPrimary>
          </View>

          <View
            style={[
              styles.progressBarBg,
              { backgroundColor: colors.background.color4 },
            ]}
          >
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ThemeSafeAreaView
      edges={["left", "right"]}
      style={{ flex: 1, backgroundColor: colors.background.color1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[
            colors.button.typeOne.linearOne,
            colors.button.typeOne.linearTwo,
          ]}
          locations={[0, 0.9]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerContainer}
        >
          <View style={styles.topRow}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: "https://i.pravatar.cc/100?u=jessica" }}
                style={styles.avatar}
              />
              <ThemeTextPrimary
                style={[styles.userName, { color: colors.textColor.color8 }]}
              >
                Jessica
              </ThemeTextPrimary>
            </View>

            <Ionicons
              name="notifications-outline"
              size={26}
              color={colors.textColor.color8}
            />
          </View>

          <View
            style={[
              styles.mainCard,
              { backgroundColor: colors.background.color3 },
            ]}
          >
            <View style={styles.cardCircle} />

            <View style={styles.activeRow}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: colors.textColor.color8 },
                ]}
              />
              <ThemeTextSecondary
                style={[styles.activeText, { color: colors.textColor.color8 }]}
              >
                ACTIVE NOW
              </ThemeTextSecondary>
            </View>

            <ThemeTextPrimary style={styles.salonName}>
              Modern Stylist{"\n"}Salon
            </ThemeTextPrimary>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.editBtnWrapper}>
                <LinearGradient
                  colors={[
                    colors.button.typeThree.linearOne,
                    colors.button.typeThree.linearTwo,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.editBtnGradient}
                >
                  <ThemeTextPrimary style={styles.editBtnText}>
                    Edit Salon
                  </ThemeTextPrimary>
                </LinearGradient>
              </TouchableOpacity>

              <View
                style={[
                  styles.statusToggleContainer,
                  { backgroundColor: colors.background.color4 },
                ]}
              >
                <ThemeTextSecondary
                  style={[
                    styles.statusToggleText,
                    { color: colors.textColor.color2 },
                  ]}
                >
                  STORE STATUS
                </ThemeTextSecondary>

                <View
                  style={[
                    styles.toggleTrack,
                    { backgroundColor: colors.borderColor.color1 },
                  ]}
                >
                  <View
                    style={[
                      styles.toggleThumb,
                      { backgroundColor: colors.textColor.color3 },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <View
            style={[
              styles.sectionDot,
              { backgroundColor: colors.textColor.color8 },
            ]}
          />
          <ThemeTextSecondary
            style={[styles.sectionTitle, { color: colors.textColor.color8 }]}
          >
            LIVE STATUS
          </ThemeTextSecondary>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusList}
        >
          <StatusCard label="Queue" value="53" />
          <StatusCard label="Appointment" value="14" />
          <StatusCard label="On Duty" value="8" />
          <StatusCard label="Customer" value="16.4k" />
        </ScrollView>

        <View style={styles.sectionHeader}>
          <View
            style={[
              styles.sectionDot,
              { backgroundColor: colors.textColor.color8 },
            ]}
          />
          <ThemeTextSecondary
            style={[styles.sectionTitle, { color: colors.textColor.color8 }]}
          >
            QUEUE
          </ThemeTextSecondary>
        </View>

        <ReportSection
          title="Weekly Reports"
          data={[
            {
              label: "Queue Served",
              sub: "Total Served - 28",
              percentage: 87.5,
              color: "#006D5B",
            },
            {
              label: "Queue Cancelled",
              sub: "Total Cancelled - 4",
              percentage: 12.5,
              color: colors.textColor.color3,
            },
          ]}
        />

        <View style={styles.sectionHeader}>
          <View
            style={[
              styles.sectionDot,
              { backgroundColor: colors.textColor.color8 },
            ]}
          />
          <ThemeTextSecondary
            style={[styles.sectionTitle, { color: colors.textColor.color8 }]}
          >
            APPOINTMENT
          </ThemeTextSecondary>
        </View>

        <ReportSection
          title="Weekly Reports"
          data={[
            {
              label: "Appt. Completed",
              sub: "Total Completed - 36",
              percentage: 75,
              color: "#006D5B",
            },
            {
              label: "Appt. Cancelled",
              sub: "Total Cancelled - 12",
              percentage: 25,
              color: colors.textColor.color3,
            },
          ]}
        />

        <View style={{ height: verticalScale(30) }} />
      </ScrollView>
    </ThemeSafeAreaView>
  );
};

export default SalonDashboard;

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: verticalScale(20),
    paddingHorizontal: scale(15),
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(40),
    marginBottom: verticalScale(15),
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },

  avatar: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
  },

  userName: {
    fontSize: scale(16),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  mainCard: {
    borderRadius: scale(20),
    padding: scale(20),
    overflow: "hidden",
    elevation: 6,
  },

  cardCircle: {
    position: "absolute",
    right: scale(-40),
    top: verticalScale(-30),
    width: scale(180),
    height: scale(180),
    borderRadius: scale(100),
    backgroundColor: "rgba(171, 45, 0, 0.1)",
  },

  activeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
    marginBottom: verticalScale(5),
  },

  dot: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(3.5),
  },

  activeText: {
    fontSize: scale(11),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  salonName: {
    fontSize: scale(26),
    fontFamily: "AirbnbCereal_W_Bd",
    lineHeight: verticalScale(30),
    marginBottom: verticalScale(20),
  },

  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },

  editBtnWrapper: {
    flex: 1,
    borderRadius: scale(20),
    overflow: "hidden",
  },

  editBtnGradient: {
    paddingVertical: verticalScale(10),
    alignItems: "center",
  },

  editBtnText: {
    color: "#fff",
    fontSize: scale(14),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  statusToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    borderRadius: scale(20),
    gap: scale(8),
  },

  statusToggleText: {
    fontSize: scale(9),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  toggleTrack: {
    width: scale(34),
    height: verticalScale(16),
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 2,
  },

  toggleThumb: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    paddingHorizontal: scale(15),
    marginTop: verticalScale(25),
    marginBottom: verticalScale(12),
  },

  sectionDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: 3,
  },

  sectionTitle: {
    fontSize: scale(13),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  statusList: {
    paddingHorizontal: scale(15),
    gap: scale(12),
  },

  statusCard: {
    width: scale(70),
    borderRadius: scale(18),
    padding: scale(10),
    gap: scale(6),
    borderWidth: 1,
  },

  statusBadge: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(23),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  statusValue: {
    color: "#fff",
    fontSize: scale(14),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  statusLabel: {
    fontSize: scale(10),
    fontFamily: "AirbnbCereal_W_Md",
    textAlign: "center",
  },

  reportContainer: {
    marginHorizontal: scale(20),
    borderRadius: scale(20),
    padding: scale(15),
    elevation: 2,
  },

  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(18),
  },

  reportTitle: {
    fontSize: scale(18),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  tag: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(10),
  },

  tagText: {
    fontSize: scale(10),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  metricRow: {
    marginBottom: verticalScale(18),
  },

  metricTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: verticalScale(8),
  },

  metricName: {
    fontSize: scale(14),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  metricSub: {
    fontSize: scale(11),
  },

  metricPercent: {
    fontSize: scale(17),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  progressBarBg: {
    height: verticalScale(8),
    borderRadius: 4,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
});

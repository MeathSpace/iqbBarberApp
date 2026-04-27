// import { Feather } from "@expo/vector-icons";
// import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// import { useTheme } from "@react-navigation/native";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React, { useRef, useState } from "react";
// import {
//   FlatList,
//   Platform,
//   StyleSheet,
//   TouchableOpacity,
//   useColorScheme,
//   View,
// } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import Animated, {
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated";
// import { moderateScale, scale, verticalScale } from "react-native-size-matters";
// import ThemeSafeAreaView from "../../../../../components/ThemeSafeAreaView";
// import ThemeTextPrimary from "../../../../../components/ThemeTextPrimary";
// import ThemeTextSecondary from "../../../../../components/ThemeTextSecondary";
// import { RightIcon } from "../../../../../constants/icons";
// import { formatMinutesToHrMin } from "../../../../../utils/formatedServiceDate";
// import i18n from "../../../../src/localization/i18n";

// const index = () => {
//   const baseContent = i18n.t("app.admin.admintabs.salon");
//   const { colors } = useTheme();
//   const flatlistRef = useRef();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const galleryData = [
//     { _id: 1 },
//     { _id: 2 },
//     { _id: 3 },
//     { _id: 4 },
//     { _id: 5 },
//   ];

//   const sheetRef = useRef();
//   const [selectedTab, setSelectedTab] = useState("Services");
//   const colorScheme = useColorScheme();

//   const [tabData, setTabData] = useState([
//     "Services",
//     "Appointment",
//     "customers",
//   ]);

//   const scrollRef = useRef(null);

//   const darkMapStyle = [
//     {
//       elementType: "geometry",
//       stylers: [{ color: "#1d2c4d" }],
//     },
//     {
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#ffffff" }],
//     },
//     {
//       elementType: "labels.text.stroke",
//       stylers: [{ color: "#1d2c4d" }],
//     },
//     {
//       featureType: "administrative",
//       elementType: "geometry",
//       stylers: [{ color: "#1d2c4d" }],
//     },
//     {
//       featureType: "poi",
//       elementType: "geometry",
//       stylers: [{ color: "#283e6b" }],
//     },
//     {
//       featureType: "poi",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#ffffff" }],
//     },
//     {
//       featureType: "road",
//       elementType: "geometry",
//       stylers: [{ color: "#304a7d" }],
//     },
//     {
//       featureType: "road",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#98a5be" }],
//     },
//     {
//       featureType: "transit",
//       elementType: "geometry",
//       stylers: [{ color: "#2f3948" }],
//     },
//     {
//       featureType: "water",
//       elementType: "geometry",
//       stylers: [{ color: "#0f252e" }],
//     },
//     {
//       featureType: "water",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#ffffff" }],
//     },
//   ];

//   const dummyData = [
//     {
//       serviceCategoryName: "Haircut",
//       services: [
//         {
//           serviceId: "1",
//           serviceName: "Classic Haircut",
//           serviceDesc: "A clean and stylish haircut for all hair types.",
//           serviceIcon: {
//             url: "https://cdn-icons-png.flaticon.com/512/123/123455.png",
//           },
//           servicePrice: 250,
//           serviceEWT: 30, // minutes
//         },
//         {
//           serviceId: "2",
//           serviceName: "Beard Trim",
//           serviceDesc: "Shape and style your beard perfectly.",
//           serviceIcon: {
//             url: "https://cdn-icons-png.flaticon.com/512/3230/3230983.png",
//           },
//           servicePrice: 150,
//           serviceEWT: 20,
//         },
//       ],
//     },
//     {
//       serviceCategoryName: "Facial & Grooming",
//       services: [
//         {
//           serviceId: "3",
//           serviceName: "Deep Cleansing Facial",
//           serviceDesc: "Removes impurities and rejuvenates your skin.",
//           serviceIcon: {
//             url: "https://cdn-icons-png.flaticon.com/512/2636/2636460.png",
//           },
//           servicePrice: 400,
//           serviceEWT: 45,
//         },
//         {
//           serviceId: "4",
//           serviceName: "Face Massage",
//           serviceDesc: "Relaxing facial massage with essential oils.",
//           serviceIcon: {
//             url: "https://cdn-icons-png.flaticon.com/512/3050/3050525.png",
//           },
//           servicePrice: 300,
//           serviceEWT: 25,
//         },
//       ],
//     },
//     {
//       serviceCategoryName: "Spa & Relaxation",
//       services: [
//         {
//           serviceId: "5",
//           serviceName: "Head Massage",
//           serviceDesc: "Relieves stress and promotes hair growth.",
//           serviceIcon: {
//             url: "https://cdn-icons-png.flaticon.com/512/4329/4329052.png",
//           },
//           servicePrice: 200,
//           serviceEWT: 15,
//         },
//         {
//           serviceId: "6",
//           serviceName: "Full Body Massage",
//           serviceDesc: "Relax your muscles and rejuvenate your body.",
//           serviceIcon: {
//             url: "https://cdn-icons-png.flaticon.com/512/3556/3556279.png",
//           },
//           servicePrice: 800,
//           serviceEWT: 60,
//         },
//       ],
//     },
//   ];

//   const router = useRouter();

//   const [expandedCardId, setExpandedCardId] = useState(null);

//   const customersData = [
//     {
//       id: 1,
//       name: "James Wilson",
//       service: "Short Haircut + Beard",
//       price: "$60.00",
//       duration: "45 min",
//       date: "Today",
//       time: "02:30 PM",
//       image:
//         "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop",
//     },
//     {
//       id: 2,
//       name: "Michael Brown",
//       service: "Haircut + Shave",
//       price: "$55.00",
//       duration: "40 min",
//       date: "Today",
//       time: "03:15 PM",
//       image:
//         "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop",
//     },
//     {
//       id: 3,
//       name: "David Smith",
//       service: "Classic Beard Trim",
//       price: "$30.00",
//       duration: "25 min",
//       date: "Today",
//       time: "04:00 PM",
//       image:
//         "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop",
//     },
//     {
//       id: 4,
//       name: "Robert Johnson",
//       service: "Kids Haircut",
//       price: "$25.00",
//       duration: "20 min",
//       date: "Tomorrow",
//       time: "11:00 AM",
//       image:
//         "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop",
//     },
//     {
//       id: 5,
//       name: "Daniel White",
//       service: "Fade Haircut",
//       price: "$50.00",
//       duration: "35 min",
//       date: "Tomorrow",
//       time: "12:30 PM",
//       image:
//         "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop",
//     },
//   ];

//   return (
//     <ThemeSafeAreaView
//       style={{
//         backgroundColor: colors.background2,
//       }}
//       edges={["top", "left", "right"]}
//     >
//       <GestureHandlerRootView
//         style={[
//           styles.container,
//           {
//             backgroundColor: colors.background,
//           },
//         ]}
//       >
//         <View>
//           <FlatList
//             data={galleryData}
//             style={{
//               position: "relative",
//             }}
//             renderItem={({ item }) => (
//               <View
//                 style={[
//                   styles.cardWrapper,
//                   { backgroundColor: colors.background },
//                 ]}
//               >
//                 <Image
//                   style={styles.cardImage}
//                   source={{
//                     uri: "https://naomisheadmasters.com/wp-content/uploads/2023/12/1679020438_en-idei-club-p-luxury-hair-salon-intere-instagram-11.jpg",
//                   }}
//                   contentFit="cover"
//                   transition={300}
//                 />
//               </View>
//             )}
//             keyExtractor={(item) => item._id}
//             ref={flatlistRef}
//             horizontal={true}
//             showsHorizontalScrollIndicator={false}
//             // snapToAlignment="start"
//             decelerationRate="fast"
//             snapToInterval={scale(400)}
//             pagingEnabled={true}
//             onMomentumScrollEnd={(event) => {
//               const offsetX = event.nativeEvent.contentOffset.x;
//               const index = Math.round(offsetX / scale(400));
//               setCurrentIndex(index);
//             }}
//             initialNumToRender={3}
//             maxToRenderPerBatch={3}
//           />
//           <View
//             style={{
//               position: "absolute",
//               bottom:
//                 Platform.OS === "ios" ? verticalScale(40) : verticalScale(30),
//               alignSelf: "center",
//               flexDirection: "row",
//               gap: scale(8),
//               alignItems: "center",
//             }}
//           >
//             {galleryData.slice(0, 5)?.map((item, index) => {
//               return (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setCurrentIndex(index);
//                     flatlistRef.current?.scrollToIndex({
//                       animated: true,
//                       index,
//                     });
//                   }}
//                   key={index}
//                   style={{
//                     width: index === currentIndex ? scale(25) : scale(10),
//                     height: scale(10),
//                     borderRadius: scale(30),
//                     backgroundColor:
//                       index === currentIndex ? "#14b8a6" : "#efefef",
//                   }}
//                 ></TouchableOpacity>
//               );
//             })}
//           </View>
//         </View>

//         <BottomSheet
//           ref={sheetRef}
//           index={0}
//           snapPoints={Platform.OS === "ios" ? ["68%", "90%"] : ["70%", "87%"]}
//           enableDynamicSizing={false}
//           backgroundStyle={{
//             backgroundColor: colors.background2,
//             borderTopLeftRadius: scale(20),
//             borderTopRightRadius: scale(20),
//           }}
//           handleIndicatorStyle={{
//             backgroundColor: colors.textColor2,
//           }}
//         >
//           <>
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 gap: scale(10),
//                 padding: scale(10),
//               }}
//             >
//               <Image
//                 style={{
//                   height: scale(40),
//                   width: scale(40),
//                   borderRadius: scale(20),
//                   position: "relative",
//                 }}
//                 source={
//                   "https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
//                 }
//                 // placeholder={{ blurhash }}
//                 contentFit="cover"
//                 transition={1000}
//               />

//               <ThemeTextPrimary
//                 style={{
//                   fontSize: scale(18),
//                   fontFamily: "AirbnbCereal_W_XBd",
//                 }}
//               >
//                 Modern Unisex Salon
//               </ThemeTextPrimary>
//             </View>

//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 gap: scale(10),
//                 padding: scale(5),
//                 justifyContent: "space-between",
//                 marginHorizontal: scale(10),
//                 borderRadius: scale(12),
//               }}
//             >
//               {tabData.map((item, index) => {
//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     style={[
//                       styles.tabBtn,
//                       {
//                         backgroundColor:
//                           selectedTab === item
//                             ? "#14b8a6"
//                             : colorScheme === "dark"
//                               ? "#3f3f46"
//                               : "#e4e4e7",
//                       },
//                     ]}
//                     onPress={() => {
//                       setSelectedTab(item);
//                     }}
//                   >
//                     <ThemeTextPrimary
//                       style={{
//                         fontSize: scale(12),
//                         color:
//                           selectedTab === item
//                             ? "#fff"
//                             : colorScheme === "dark"
//                               ? "#fff"
//                               : "#000",
//                       }}
//                     >
//                       {item === "Services"
//                         ? baseContent.tabs.services
//                         : item === "Appointment"
//                           ? baseContent.tabs.appointment
//                           : baseContent.tabs.customers}
//                     </ThemeTextPrimary>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>

//             <BottomSheetScrollView
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={styles.contentContainer}
//               ref={scrollRef}
//             >
//               {selectedTab === "Services" &&
//                 dummyData.map((item, index) => (
//                   <React.Fragment key={item?.serviceCategoryName || index}>
//                     <ThemeTextPrimary style={styles.serviceName}>
//                       {item?.serviceCategoryName}
//                     </ThemeTextPrimary>
//                     {item?.services?.map((ser) => (
//                       <View
//                         key={ser.serviceId}
//                         style={[
//                           styles.card,
//                           {
//                             backgroundColor: colors.background,
//                             borderColor: colors.borderColor1,
//                             borderWidth: scale(1),
//                           },
//                         ]}
//                       >
//                         <Image
//                           source={{
//                             uri: "https://naomisheadmasters.com/wp-content/uploads/2022/08/salon-4-mens-Best-Salon-near-Pinjore.png",
//                           }}
//                           style={styles.icon}
//                         />
//                         <View style={styles.cardContent}>
//                           <ThemeTextPrimary style={styles.serviceName}>
//                             {ser.serviceName}
//                           </ThemeTextPrimary>
//                           <ThemeTextSecondary style={[styles.serviceDesc]}>
//                             {ser.serviceDesc}
//                           </ThemeTextSecondary>
//                           <View
//                             style={{
//                               flexDirection: "row",
//                               alignItems: "center",
//                               gap: scale(10),
//                               marginTop: verticalScale(5),
//                             }}
//                           >
//                             <ThemeTextPrimary style={styles.servicePrice}>
//                               $ {ser.servicePrice}
//                             </ThemeTextPrimary>
//                             <ThemeTextPrimary
//                               style={[
//                                 styles.serviceEWT,
//                                 { color: colors.secondaryText },
//                               ]}
//                             >
//                               ~ {formatMinutesToHrMin(ser.serviceEWT)}
//                             </ThemeTextPrimary>
//                           </View>
//                         </View>
//                       </View>
//                     ))}
//                   </React.Fragment>
//                 ))}

//               {selectedTab === "Appointment" && (
//                 <>
//                   <TouchableOpacity
//                     onPress={() => router.push("/appointmentAvailability")}
//                     style={[
//                       styles.appointmentCard,
//                       {
//                         backgroundColor: colors.background,
//                         borderWidth: scale(1),
//                         borderColor: colors.borderColor1,
//                         borderRadius: scale(12),
//                         padding: scale(10),
//                         flexDirection: "row",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                       },
//                     ]}
//                   >
//                     <View style={{ flex: 1, gap: verticalScale(5) }}>
//                       <ThemeTextPrimary
//                         style={{
//                           fontFamily: "AirbnbCereal_W_Bd",
//                         }}
//                       >
//                         {baseContent.appointment.availability.title}
//                       </ThemeTextPrimary>
//                       <ThemeTextSecondary style={{ width: "96%" }}>
//                         {baseContent.appointment.availability.desc}
//                       </ThemeTextSecondary>
//                     </View>

//                     <RightIcon
//                       color={colors.textColor1}
//                       size={moderateScale(16)}
//                     />
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={[
//                       styles.appointmentCard,
//                       {
//                         backgroundColor: colors.background,
//                         borderWidth: scale(1),
//                         borderColor: colors.borderColor1,
//                         borderRadius: scale(12),
//                         padding: scale(10),
//                         flexDirection: "row",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                       },
//                     ]}
//                   >
//                     <View style={{ flex: 1, gap: verticalScale(5) }}>
//                       <ThemeTextPrimary
//                         style={{
//                           fontFamily: "AirbnbCereal_W_Bd",
//                         }}
//                       >
//                         {baseContent.appointment.offDays.title}
//                       </ThemeTextPrimary>
//                       <ThemeTextSecondary style={{ width: "96%" }}>
//                         {baseContent.appointment.offDays.desc}
//                       </ThemeTextSecondary>
//                     </View>

//                     <RightIcon
//                       color={colors.textColor1}
//                       size={moderateScale(16)}
//                     />
//                   </TouchableOpacity>
//                 </>
//               )}

//               {selectedTab === "customers" && (
//                 <>
//                   <View
//                     style={{
//                       marginTop: verticalScale(10),
//                       flex: 1,
//                     }}
//                   >
//                     <View style={{ gap: verticalScale(10) }}>
//                       {customersData.map((item) => (
//                         <AppointmentCard
//                           key={item.id.toString()}
//                           item={item}
//                           expandedCardId={expandedCardId}
//                           setExpandedCardId={setExpandedCardId}
//                           colors={colors}
//                         />
//                       ))}
//                     </View>
//                   </View>
//                 </>
//               )}
//             </BottomSheetScrollView>
//           </>
//         </BottomSheet>
//       </GestureHandlerRootView>
//     </ThemeSafeAreaView>
//   );
// };

// export default index;

// const styles = StyleSheet.create({
//   cardWrapper: {
//     height: verticalScale(200),
//     width: scale(400),
//   },
//   cardImage: {
//     height: "100%",
//     width: "100%",
//   },

//   container: {
//     flex: 1,
//   },

//   tabBtn: {
//     height: verticalScale(30),
//     backgroundColor: "gray",
//     flex: 1,
//     paddingInline: scale(10),
//     borderRadius: scale(8),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   contentContainer: {
//     paddingHorizontal: scale(10),
//     paddingTop: scale(10),
//     paddingBottom:
//       Platform.OS === "ios" ? verticalScale(100) : verticalScale(20),
//     gap: verticalScale(10),
//   },

//   map: {
//     width: "100%",
//     height: verticalScale(128),
//     borderTopLeftRadius: scale(12),
//     borderTopRightRadius: scale(12),
//   },

//   card: {
//     flexDirection: "row",
//     padding: scale(12),
//     marginBottom: verticalScale(8),
//     borderRadius: scale(12),
//   },
//   icon: {
//     width: scale(60),
//     height: scale(60),
//     borderRadius: scale(8),
//     marginRight: scale(12),
//     borderWidth: scale(1),
//     borderColor: "#efefef", // gray-200
//   },
//   cardContent: {
//     flex: 1,
//     justifyContent: "center",
//   },

//   serviceName: {
//     fontSize: scale(16),
//     fontFamily: "AirbnbCereal_W_Bd",
//   },
//   serviceDesc: {
//     fontSize: scale(14),
//   },
//   servicePrice: {
//     fontSize: scale(14),
//     fontFamily: "AirbnbCereal_W_Bd",
//     color: "#14b8a6",
//   },
//   serviceEWT: {
//     fontSize: scale(12),
//   },

//   CustomerCard: {
//     borderWidth: scale(1),
//     borderRadius: scale(16),
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(16),
//     padding: scale(16),
//   },
//   avatar: {
//     width: scale(60),
//     height: scale(60),
//     borderRadius: scale(30),
//   },
//   name: {
//     fontSize: scale(14),
//     fontFamily: "AirbnbCereal_W_Bd",
//   },
//   service: {
//     fontSize: scale(12),
//   },
//   price: {
//     marginTop: verticalScale(4),
//     fontSize: scale(14),
//     color: "#14b8a6",
//   },
//   duration: {
//     fontSize: scale(12),
//   },
//   date: {
//     fontSize: scale(12),
//   },
//   time: {
//     fontSize: scale(12),
//   },
//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     borderTopWidth: 1,
//     overflow: "hidden",
//   },
//   actionBtn: {
//     alignItems: "center",
//   },
//   actionText: {
//     fontSize: scale(12),
//     marginTop: verticalScale(4),
//   },
// });

// const AppointmentCard = ({
//   item,
//   expandedCardId,
//   setExpandedCardId,
//   colors,
// }) => {
//   const animatedStyle = useAnimatedStyle(() => ({
//     height: withTiming(expandedCardId === item.id ? 70 : 0, { duration: 250 }),
//     opacity: withTiming(expandedCardId === item.id ? 1 : 0, { duration: 200 }),
//   }));

//   return (
//     <View
//       style={[
//         styles.CustomerCard,
//         {
//           backgroundColor: colors.background2,
//           borderColor: colors.borderColor1,
//         },
//       ]}
//     >
//       <TouchableOpacity
//         style={styles.header}
//         activeOpacity={0.8}
//         // onPress={() => setExpandedCardId(item.id)}
//         onPress={() =>
//           setExpandedCardId((prev) => (prev === item.id ? null : item.id))
//         }
//       >
//         <Image source={{ uri: item.image }} style={styles.avatar} />
//         <View style={{ flex: 1 }}>
//           <ThemeTextPrimary style={styles.name}>{item.name}</ThemeTextPrimary>
//           <ThemeTextSecondary style={styles.service}>
//             {item.service}
//           </ThemeTextSecondary>
//           <ThemeTextPrimary style={styles.price}>
//             {item.price}{" "}
//             <ThemeTextSecondary style={styles.duration}>
//               ({item.duration})
//             </ThemeTextSecondary>
//           </ThemeTextPrimary>
//         </View>
//         <View style={{ alignItems: "flex-end" }}>
//           <ThemeTextPrimary style={styles.date}>{item.date}</ThemeTextPrimary>
//           <ThemeTextPrimary style={[styles.time, { color: colors.textColor2 }]}>
//             {item.time}
//           </ThemeTextPrimary>
//         </View>
//       </TouchableOpacity>

//       <Animated.View
//         style={[
//           styles.actions,
//           animatedStyle,
//           { borderColor: colors.borderColor1 },
//         ]}
//       >
//         <TouchableOpacity
//           style={styles.actionBtn}
//           onPress={() => console.log("Notify")}
//         >
//           <Feather name="bell" size={scale(20)} color={"#eab308"} />
//           <ThemeTextPrimary style={[styles.actionText, { color: "#eab308" }]}>
//             Notify
//           </ThemeTextPrimary>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionBtn}
//           onPress={() => console.log("Msg")}
//         >
//           <Feather name="message-square" size={scale(20)} color={"#3b82f6"} />
//           <ThemeTextPrimary style={[styles.actionText, { color: "#3b82f6" }]}>
//             Msg
//           </ThemeTextPrimary>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionBtn}
//           onPress={() => console.log("Serve")}
//         >
//           <Feather name="check-circle" size={scale(20)} color={"#22c55e"} />
//           <ThemeTextPrimary style={[styles.actionText, { color: "#22c55e" }]}>
//             Serve
//           </ThemeTextPrimary>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionBtn}
//           onPress={() => console.log("Cancel")}
//         >
//           <Feather name="x-circle" size={scale(20)} color={"#ef4444"} />
//           <ThemeTextPrimary style={[styles.actionText, { color: "#ef4444" }]}>
//             Cancel
//           </ThemeTextPrimary>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import ThemeSafeAreaView from "../../../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../../../components/ThemeTextPrimary";
import ThemeTextSecondary from "../../../../../components/ThemeTextSecondary";

const { width } = Dimensions.get("window");

const SalonDetails = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("Details");
  const [activeCategory, setActiveCategory] = useState("Haircuts");

  const tabs = ["Details", "Services", "Stylist", "Appointment", "Customers"];
  const categories = ["Haircuts", "Coloring", "Treatments", "Styling"];

  const InfoCard = ({ children }) => (
    <View
      style={[styles.infoCard, { backgroundColor: colors.background.color3 }]}
    >
      {children}
    </View>
  );

  const ServiceCard = ({ title, description, price, time }) => {
    const { colors } = useTheme();

    return (
      <View style={styles.serviceCardContainer}>
        <View
          style={[
            styles.serviceImageWrapper,
            { backgroundColor: colors.background.color3 },
          ]}
        >
          <Image
            source={{
              uri: "https://images.squarespace-cdn.com/content/v1/6261885b9334435b76cac21f/9c6ef2f1-6a26-4082-83ec-4b3db60a2401/black+diamond+barbershop-94.jpeg",
            }}
            style={styles.serviceImage}
          />
          {/* Time Badge Overlay */}
          <View style={styles.timeBadge}>
            <Ionicons name="time-outline" size={10} color="white" />
            <ThemeTextPrimary style={styles.timeText}>{time}</ThemeTextPrimary>
          </View>
          {/* Price Tag Overlay */}
          <View
            style={[
              styles.priceTag,
              { backgroundColor: colors.background.color4 },
            ]}
          >
            <ThemeTextPrimary
              style={[styles.priceText, { color: colors.textColor.color3 }]}
            >
              ${price}
            </ThemeTextPrimary>
          </View>
        </View>
        <ThemeTextPrimary
          style={[styles.serviceTitle, { color: colors.textColor.color3 }]}
        >
          {title}
        </ThemeTextPrimary>
        <ThemeTextSecondary numberOfLines={2} style={styles.serviceDesc}>
          {description}
        </ThemeTextSecondary>
      </View>
    );
  };

  return (
    <ThemeSafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: colors.background.color1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Profile & Notif */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100?u=jessica" }}
              style={styles.profileAvatar}
            />
            <ThemeTextPrimary
              style={[styles.greeting, { color: colors.textColor.color8 }]}
            >
              Jessica
            </ThemeTextPrimary>
          </View>
          <TouchableOpacity
            style={[
              styles.iconBtn,
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

        {/* Hero Image Section */}
        <View style={styles.heroWrapper}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
            }}
            style={styles.heroImage}
          >
            <LinearGradient
              colors={["transparent", colors.background.color1]}
              style={styles.heroGradient}
            >
              <View style={styles.heroContent}>
                <ThemeTextPrimary style={styles.heroTitle}>
                  Modern
                </ThemeTextPrimary>
                <ThemeTextPrimary
                  style={[
                    styles.heroSubtitle,
                    { color: colors.textColor.color3 },
                  ]}
                >
                  Unisex Salon
                </ThemeTextPrimary>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Custom Tab Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScroll}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabItem,
                activeTab === tab && {
                  borderBottomColor: colors.textColor.color3,
                },
              ]}
            >
              <ThemeTextPrimary
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === tab
                        ? colors.textColor.color3
                        : colors.textColor.color2,
                  },
                ]}
              >
                {tab}
              </ThemeTextPrimary>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {activeTab === "Details" && (
          <>
            <View style={styles.sectionRow}>
              <View>
                <ThemeTextPrimary style={styles.sectionTitle}>
                  SALON INFORMATION
                </ThemeTextPrimary>
                <ThemeTextSecondary style={styles.sectionSub}>
                  Manage your salon's core profile
                </ThemeTextSecondary>
              </View>
              <TouchableOpacity>
                <LinearGradient
                  colors={[
                    colors.button.typeThree.linearOne,
                    colors.button.typeThree.linearTwo,
                  ]}
                  style={styles.editBtn}
                >
                  <ThemeTextPrimary style={styles.editBtnText}>
                    Edit Salon
                  </ThemeTextPrimary>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
              {/* Business Type Card */}
              <InfoCard>
                <View style={styles.cardHeaderRow}>
                  <MaterialCommunityIcons
                    name="storefront-outline"
                    size={22}
                    color={colors.textColor.color3}
                  />
                  <ThemeTextPrimary style={styles.cardTitle}>
                    Business Type
                  </ThemeTextPrimary>
                </View>

                <View style={styles.infoGroup}>
                  <ThemeTextSecondary
                    style={[styles.label, { color: colors.textColor.color3 }]}
                  >
                    MAIN CATEGORY
                  </ThemeTextSecondary>
                  <ThemeTextPrimary style={styles.value}>
                    Beauty & Wellness Salon
                  </ThemeTextPrimary>
                </View>

                <View style={styles.infoGroup}>
                  <ThemeTextSecondary
                    style={[styles.label, { color: colors.textColor.color3 }]}
                  >
                    CONTACT CHANNELS
                  </ThemeTextSecondary>
                  <View style={styles.contactRow}>
                    <View
                      style={[
                        styles.contactIcon,
                        { backgroundColor: colors.background.color4 },
                      ]}
                    >
                      <Ionicons
                        name="phone-portrait-outline"
                        size={14}
                        color={colors.textColor.color3}
                      />
                    </View>
                    <View>
                      <ThemeTextSecondary style={styles.contactLabel}>
                        Mobile Number
                      </ThemeTextSecondary>
                      <ThemeTextPrimary style={styles.contactValue}>
                        (+44) 1234-567890
                      </ThemeTextPrimary>
                    </View>
                  </View>
                  <View style={styles.contactRow}>
                    <View
                      style={[
                        styles.contactIcon,
                        { backgroundColor: colors.background.color4 },
                      ]}
                    >
                      <Ionicons
                        name="at-outline"
                        size={14}
                        color={colors.textColor.color3}
                      />
                    </View>
                    <View>
                      <ThemeTextSecondary style={styles.contactLabel}>
                        Email Address
                      </ThemeTextSecondary>
                      <ThemeTextPrimary style={styles.contactValue}>
                        musalon@email.com
                      </ThemeTextPrimary>
                    </View>
                  </View>
                </View>
              </InfoCard>

              {/* Description Card */}
              <InfoCard>
                <View style={styles.cardHeaderRow}>
                  <FontAwesome5
                    name="feather-alt"
                    size={18}
                    color={colors.textColor.color3}
                  />
                  <ThemeTextPrimary style={styles.cardTitle}>
                    Description
                  </ThemeTextPrimary>
                </View>
                <ThemeTextSecondary style={styles.descriptionText}>
                  Welcome to Obsidian Elegance, where the art of grooming meets
                  architectural serenity. Established in 2018, we have redefined
                  the salon experience by blending high-end editorial styling
                  with a boutique atmosphere that feels both intimate and
                  expansive.
                </ThemeTextSecondary>
              </InfoCard>

              {/* Location Card */}
              <InfoCard>
                <View style={styles.cardHeaderRow}>
                  <Ionicons
                    name="location-outline"
                    size={22}
                    color={colors.textColor.color3}
                  />
                  <ThemeTextPrimary style={styles.cardTitle}>
                    Location
                  </ThemeTextPrimary>
                </View>

                <View style={styles.infoGroup}>
                  <ThemeTextSecondary
                    style={[styles.label, { color: colors.textColor.color3 }]}
                  >
                    PRIMARY ADDRESS
                  </ThemeTextSecondary>
                  <ThemeTextPrimary style={styles.value}>
                    742 Obsidian Ave, Suite 12{"\n"}Los Angeles, CA 90210
                  </ThemeTextPrimary>
                </View>

                <View style={styles.geoRow}>
                  <View style={{ flex: 1 }}>
                    <ThemeTextSecondary
                      style={[styles.label, { color: colors.textColor.color3 }]}
                    >
                      LATITUDE
                    </ThemeTextSecondary>
                    <ThemeTextPrimary style={styles.geoValue}>
                      34.0736° N
                    </ThemeTextPrimary>
                  </View>
                  <View style={{ flex: 1 }}>
                    <ThemeTextSecondary
                      style={[styles.label, { color: colors.textColor.color3 }]}
                    >
                      LONGITUDE
                    </ThemeTextSecondary>
                    <ThemeTextPrimary style={styles.geoValue}>
                      118.4004° W
                    </ThemeTextPrimary>
                  </View>
                </View>

                <View style={styles.infoGroup}>
                  <ThemeTextSecondary
                    style={[styles.label, { color: colors.textColor.color3 }]}
                  >
                    LOCAL TIME ZONE
                  </ThemeTextSecondary>
                  <View style={styles.timeZoneRow}>
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color={colors.textColor.color2}
                    />
                    <ThemeTextPrimary style={styles.value}>
                      {" "}
                      +5:30 (IST)
                    </ThemeTextPrimary>
                  </View>
                </View>

                <Image
                  source={{
                    uri: "https://cloud.google.com/static/maps-platform/images/maps-custom-styling.png",
                  }}
                  style={styles.mapImage}
                />
              </InfoCard>
            </View>
          </>
        )}

        {activeTab === "Services" && (
          <>
            {/* Section Header */}
            <View style={styles.sectionRow}>
              <View>
                <ThemeTextPrimary style={styles.sectionTitle}>
                  SERVICE LIST
                </ThemeTextPrimary>
                <ThemeTextSecondary style={styles.sectionSub}>
                  Manage your salon's services
                </ThemeTextSecondary>
              </View>
              <TouchableOpacity>
                <LinearGradient
                  colors={[
                    colors.button.typeThree.linearOne,
                    colors.button.typeThree.linearTwo,
                  ]}
                  style={styles.editBtn}
                >
                  <ThemeTextPrimary style={styles.editBtnText}>
                    Add Service
                  </ThemeTextPrimary>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Horizontal Category Filter */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {["Haircuts", "Coloring", "Treatments", "Styling"].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setActiveCategory(cat)}
                  style={[
                    styles.categoryPill,
                    {
                      backgroundColor:
                        activeCategory === cat
                          ? colors.textColor.color3
                          : colors.background.color7,
                    },
                  ]}
                >
                  <ThemeTextPrimary
                    style={{
                      color:
                        activeCategory === cat
                          ? "white"
                          : colors.textColor.color1,
                      fontSize: scale(12),
                    }}
                  >
                    {cat}
                  </ThemeTextPrimary>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Service Card Grid (2 Columns) */}
            <View style={styles.serviceGrid}>
              {[1, 2, 3, 4].map((item) => (
                <ServiceCard
                  key={item}
                  title="Classic Haircut"
                  description="A clean and stylist haircut for all hair types."
                  price="145.00"
                  time="45 MIN"
                />
              ))}
            </View>
          </>
        )}

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
  headerLeft: { flexDirection: "row", alignItems: "center", gap: scale(10) },
  profileAvatar: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
  },
  greeting: { fontSize: scale(16) },
  iconBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
  },

  heroWrapper: { height: verticalScale(220), width: "100%" },
  heroImage: { width: "100%", height: "100%" },
  heroGradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(15),
  },
  heroTitle: { fontSize: scale(24), fontFamily: "AirbnbCereal_W_Bd" },
  heroSubtitle: {
    fontSize: scale(24),
    fontFamily: "AirbnbCereal_W_Bd",
    marginTop: -verticalScale(5),
  },

  tabScroll: {
    paddingHorizontal: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tabItem: {
    paddingVertical: verticalScale(10),
    marginRight: scale(20),
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: { fontSize: scale(13), fontFamily: "AirbnbCereal_W_Bd" },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    marginTop: verticalScale(20),
  },
  sectionTitle: { fontSize: scale(16), fontFamily: "AirbnbCereal_W_Bd" },
  sectionSub: { fontSize: scale(11) },
  editBtn: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
  },
  editBtnText: {
    color: "white",
    fontSize: scale(12),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  cardsContainer: {
    paddingHorizontal: scale(20),
    marginTop: verticalScale(15),
    gap: verticalScale(15),
  },
  infoCard: {
    borderRadius: scale(20),
    padding: scale(20),
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    marginBottom: verticalScale(15),
  },
  cardTitle: { fontSize: scale(16), fontFamily: "AirbnbCereal_W_Bd" },

  infoGroup: { marginTop: verticalScale(12) },
  label: {
    fontSize: scale(9),
    fontFamily: "AirbnbCereal_W_Bd",
    letterSpacing: 0.5,
    marginBottom: verticalScale(4),
  },
  value: {
    fontSize: scale(14),
    fontFamily: "AirbnbCereal_W_Md",
    lineHeight: verticalScale(18),
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    marginTop: verticalScale(8),
  },
  contactIcon: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  contactLabel: { fontSize: scale(10) },
  contactValue: { fontSize: scale(12), fontFamily: "AirbnbCereal_W_Bd" },

  descriptionText: { fontSize: scale(12), lineHeight: verticalScale(18) },

  geoRow: { flexDirection: "row", marginTop: verticalScale(15) },
  geoValue: { fontSize: scale(13), fontFamily: "AirbnbCereal_W_Bd" },
  timeZoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(2),
  },
  mapImage: {
    width: "100%",
    height: verticalScale(150),
    borderRadius: scale(15),
    marginTop: verticalScale(15),
  },

  categoryScroll: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    gap: scale(10),
  },
  categoryPill: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
  },
  serviceGrid: {
    paddingHorizontal: scale(20),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCardContainer: {
    width: (width - scale(50)) / 2, // Split width minus padding
    marginBottom: verticalScale(20),
  },
  serviceImageWrapper: {
    width: "100%",
    height: scale(140),
    borderRadius: scale(15),
    overflow: "hidden",
    position: "relative",
  },
  serviceImage: {
    width: "100%",
    height: "100%",
  },
  timeBadge: {
    position: "absolute",
    top: scale(8),
    right: scale(8),
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(3),
    borderRadius: scale(10),
    gap: scale(3),
  },
  timeText: {
    color: "white",
    fontSize: scale(8),
    fontFamily: "AirbnbCereal_W_Bd",
  },
  priceTag: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderTopLeftRadius: scale(10),
  },
  priceText: {
    fontSize: scale(10),
    fontFamily: "AirbnbCereal_W_Bd",
  },
  serviceTitle: {
    fontSize: scale(13),
    fontFamily: "AirbnbCereal_W_Bd",
    marginTop: verticalScale(8),
  },
  serviceDesc: {
    fontSize: scale(10),
    marginTop: verticalScale(2),
    lineHeight: verticalScale(14),
  },
});

export default SalonDetails;

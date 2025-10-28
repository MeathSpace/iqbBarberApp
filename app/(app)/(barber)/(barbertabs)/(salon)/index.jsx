import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, Linking, Platform, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ThemeSafeAreaView from '../../../../../components/ThemeSafeAreaView';
import ThemeTextPrimary from '../../../../../components/ThemeTextPrimary';
import ThemeTextSecondary from '../../../../../components/ThemeTextSecondary';
import { ContactIcon, EmailIcon, FacebookIcon, InstagramIcon, MapIcon, RightIcon, TiktokIcon, WebIcon, WhatsappIcon, XIcon } from '../../../../../constants/icons';
import { formatMinutesToHrMin } from '../../../../../utils/formatedServiceDate';

const index = () => {

  const { colors } = useTheme();
  const flatlistRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryData = [
    { _id: 1 },
    { _id: 2 },
    { _id: 3 },
    { _id: 4 },
    { _id: 5 }
  ]

  const sheetRef = useRef()
  const [selectedTab, setSelectedTab] = useState("Details")
  const colorScheme = useColorScheme();

  const [tabData, setTabData] = useState([
    "Details",
    "Services",
    "Appointment"
  ])

  const scrollRef = useRef(null);

  const darkMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#1d2c4d" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#ffffff" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#1d2c4d" }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{ "color": "#1d2c4d" }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{ "color": "#283e6b" }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#ffffff" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{ "color": "#304a7d" }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#98a5be" }]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{ "color": "#2f3948" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#0f252e" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#ffffff" }]
    }
  ];

  const dummyData = [
    {
      serviceCategoryName: "Haircut",
      services: [
        {
          serviceId: "1",
          serviceName: "Classic Haircut",
          serviceDesc: "A clean and stylish haircut for all hair types.",
          serviceIcon: { url: "https://cdn-icons-png.flaticon.com/512/123/123455.png" },
          servicePrice: 250,
          serviceEWT: 30, // minutes
        },
        {
          serviceId: "2",
          serviceName: "Beard Trim",
          serviceDesc: "Shape and style your beard perfectly.",
          serviceIcon: { url: "https://cdn-icons-png.flaticon.com/512/3230/3230983.png" },
          servicePrice: 150,
          serviceEWT: 20,
        },
      ],
    },
    {
      serviceCategoryName: "Facial & Grooming",
      services: [
        {
          serviceId: "3",
          serviceName: "Deep Cleansing Facial",
          serviceDesc: "Removes impurities and rejuvenates your skin.",
          serviceIcon: { url: "https://cdn-icons-png.flaticon.com/512/2636/2636460.png" },
          servicePrice: 400,
          serviceEWT: 45,
        },
        {
          serviceId: "4",
          serviceName: "Face Massage",
          serviceDesc: "Relaxing facial massage with essential oils.",
          serviceIcon: { url: "https://cdn-icons-png.flaticon.com/512/3050/3050525.png" },
          servicePrice: 300,
          serviceEWT: 25,
        },
      ],
    },
    {
      serviceCategoryName: "Spa & Relaxation",
      services: [
        {
          serviceId: "5",
          serviceName: "Head Massage",
          serviceDesc: "Relieves stress and promotes hair growth.",
          serviceIcon: { url: "https://cdn-icons-png.flaticon.com/512/4329/4329052.png" },
          servicePrice: 200,
          serviceEWT: 15,
        },
        {
          serviceId: "6",
          serviceName: "Full Body Massage",
          serviceDesc: "Relax your muscles and rejuvenate your body.",
          serviceIcon: { url: "https://cdn-icons-png.flaticon.com/512/3556/3556279.png" },
          servicePrice: 800,
          serviceEWT: 60,
        },
      ],
    },
  ];

  const router = useRouter()

  return (
    <ThemeSafeAreaView
      style={{
        backgroundColor: colors.background2,
      }}
      edges={['top', 'left', 'right']}
    >

      <GestureHandlerRootView style={[styles.container, {
        backgroundColor: colors.background
      }]}>
        <View>
          <FlatList
            data={galleryData}
            style={{
              position: "relative"
            }}
            renderItem={({ item }) => <View style={[styles.cardWrapper, { backgroundColor: colors.background }]} >
              <Image
                style={styles.cardImage}
                source={{ uri: "https://naomisheadmasters.com/wp-content/uploads/2023/12/1679020438_en-idei-club-p-luxury-hair-salon-intere-instagram-11.jpg" }}
                contentFit="cover"
                transition={300}
              />
            </View>}
            keyExtractor={item => item._id}
            ref={flatlistRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={scale(400)}
            pagingEnabled={true}
            onMomentumScrollEnd={(event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const index = Math.round(offsetX / scale(400));
              setCurrentIndex(index);
            }}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
          />
          <View
            style={{
              position: "absolute",
              bottom: Platform.OS === "ios" ? verticalScale(40) : verticalScale(30),
              alignSelf: "center",
              flexDirection: "row",
              gap: scale(8),
              alignItems: "center"
            }}
          >
            {
              galleryData.slice(0, 5)?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentIndex(index);
                      flatlistRef.current?.scrollToIndex({ animated: true, index });
                    }}
                    key={index}
                    style={{
                      width: index === currentIndex ? scale(25) : scale(10),
                      height: scale(10),
                      borderRadius: scale(30),
                      backgroundColor: index === currentIndex ? "#14b8a6" : "#efefef"
                    }}
                  ></TouchableOpacity>
                )
              })
            }

          </View>
        </View>

        <BottomSheet
          ref={sheetRef}
          index={0}
          snapPoints={Platform.OS === "ios" ? ["68%", "90%"] : ["70%", "87%"]}
          enableDynamicSizing={false}
          backgroundStyle={{
            backgroundColor: colors.background2,
            borderTopLeftRadius: scale(20),
            borderTopRightRadius: scale(20),
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.textColor2
          }}
        >
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: scale(10),
                padding: scale(10)
              }}
            >
              <Image
                style={{
                  height: scale(40),
                  width: scale(40),
                  borderRadius: scale(20),
                  position: "relative"
                }}
                source={"https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"}
                // placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />

              <ThemeTextPrimary style={{ fontSize: scale(18), fontFamily: "AirbnbCereal_W_XBd" }}>Modern Unisex Salon</ThemeTextPrimary>
            </View>

            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: scale(10),
              padding: scale(5),
              justifyContent: "space-between",
              marginHorizontal: scale(10),
              borderRadius: scale(12)
            }}>
              {
                tabData.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.tabBtn, {
                        backgroundColor: selectedTab === item ? '#14b8a6' : colorScheme === "dark" ? "#3f3f46" : "#e4e4e7"
                      }]}
                      onPress={() => {
                        setSelectedTab(item)
                      }}
                    ><ThemeTextPrimary style={{
                      fontSize: scale(12),
                      color: selectedTab === item ? "#fff" : colorScheme === "dark" ? "#fff" : "#000"
                    }}>{item}</ThemeTextPrimary></TouchableOpacity>
                  )
                })
              }
            </View>

            <BottomSheetScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              ref={scrollRef}
            >
              {
                selectedTab === "Details" && (
                  <>
                    <View
                      style={{
                        backgroundColor: colors.background,
                        borderWidth: scale(1),
                        borderColor: colors.borderColor1,
                        borderRadius: scale(12),
                        padding: scale(10),
                        gap: verticalScale(5)
                      }}
                    >
                      <ThemeTextPrimary
                        style={{
                          fontFamily: "AirbnbCereal_W_Bd",
                        }}
                      >Description</ThemeTextPrimary>

                      <ThemeTextSecondary
                        style={{
                          fontSize: scale(14),
                        }}
                      >{"From classic cuts to modern styling, our skilled professionals are here to provide high-quality hair, skin, and grooming services in a clean, relaxing environment."}</ThemeTextSecondary>
                    </View>

                    <View
                      style={{
                        backgroundColor: colors.background,
                        borderRadius: scale(12),
                        borderWidth: scale(1),
                        borderColor: colors.borderColor1,
                        padding: scale(10),
                        gap: verticalScale(5),
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >

                      <View>
                        <ThemeTextPrimary
                          style={{
                            fontFamily: "AirbnbCereal_W_Bd",
                          }}
                        >Contact Us</ThemeTextPrimary>

                        <ThemeTextSecondary
                          style={{
                            fontSize: scale(14),
                          }}
                        >
                          If you have any questions
                        </ThemeTextSecondary>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: scale(10),
                        }}
                      >
                        {true && (
                          <TouchableOpacity
                            style={{
                              width: scale(30),
                              height: scale(30),
                              backgroundColor: colors.background2,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: scale(4),
                            }}
                            onPress={() => {
                              Linking.openURL(
                                `tel:${91}${1234567890}`
                              );
                            }}
                          >
                            <ContactIcon size={scale(18)} color={"#4285F4"} />
                          </TouchableOpacity>
                        )}

                        {true && (
                          <TouchableOpacity
                            style={{
                              width: scale(30),
                              height: scale(30),
                              backgroundColor: colors.background2,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: scale(4),
                            }}
                            onPress={() => {
                              // openLink(
                              //   `https://wa.me/${salonInfoData?.data?.salonInfo?.whatsappNumber}`
                              // );
                            }}
                          >
                            <WhatsappIcon size={scale(18)} color={"#25D366"} />
                          </TouchableOpacity>
                        )}

                        {true && (
                          <TouchableOpacity
                            style={{
                              width: scale(30),
                              height: scale(30),
                              backgroundColor: colors.background2,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: scale(4),
                            }}
                            onPress={() => {
                              // openLink(`mailto:${salonInfoData?.data?.salonInfo?.salonEmail}`);
                            }}
                          >
                            <EmailIcon size={scale(18)} color={"#EA4335"} />
                          </TouchableOpacity>
                        )}
                      </View>


                    </View>

                    <View>

                      {
                        true && (
                          <MapView
                            provider={PROVIDER_GOOGLE}
                            initialCamera={{
                              center: {
                                latitude: 37.7749,   // San Francisco, USA
                                longitude: -122.4194 // San Francisco, USA
                              },
                              zoom: 15,
                              pitch: 0,
                              heading: 0,
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            rotateEnabled={false}
                            pitchEnabled={false}
                            style={[styles.map
                            ]}
                            pointerEvents={Platform.OS === "ios" ? "none" : "auto"}
                            customMapStyle={colorScheme === "dark" ? darkMapStyle : []}
                          />
                        )
                      }

                      <View
                        style={{
                          backgroundColor: colors.background,
                          borderBottomLeftRadius: scale(12),
                          borderBottomRightRadius: scale(12),
                          borderWidth: scale(1),
                          borderColor: colors.borderColor1,
                          padding: scale(10),
                          gap: verticalScale(5),
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}
                      >

                        <View>
                          <ThemeTextPrimary
                            style={{
                              fontFamily: "AirbnbCereal_W_Bd",
                            }}
                          >Location</ThemeTextPrimary>

                          <ThemeTextSecondary
                            style={{
                              fontSize: scale(14),
                              maxWidth: "90%"
                            }}
                          >
                            {/* {`${salonInfoData?.data?.salonInfo?.address}, ${salonInfoData?.data?.salonInfo?.city}, ${salonInfoData?.data?.salonInfo?.country}`} */}
                            Connaught Place, Block A, Inner Circle, New Delhi, India
                          </ThemeTextSecondary>
                        </View>

                        <TouchableOpacity
                          style={{
                            width: scale(30),
                            height: scale(30),
                            backgroundColor: colors.background2,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: scale(4)
                          }}
                          onPress={() => {
                            // openLink(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`)
                          }}
                        >
                          <MapIcon size={scale(18)} color={"#fbbf24"} />
                        </TouchableOpacity>

                      </View>
                    </View>

                    {
                      true ? (
                        <View
                          style={{
                            backgroundColor: colors.background,
                            borderColor: colors.borderColor1,
                            borderWidth: scale(1),
                            borderRadius: scale(12),
                            padding: scale(10),
                            gap: verticalScale(5),
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                          }}
                        >

                          <View>
                            <ThemeTextPrimary
                              style={{
                                fontFamily: "AirbnbCereal_W_Bd",
                              }}
                            >Follow us on</ThemeTextPrimary>

                            <ThemeTextSecondary
                              style={{
                                fontSize: scale(14),
                              }}
                            >
                              Social links
                            </ThemeTextSecondary>
                          </View>



                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: scale(10),
                            }}
                          >
                            {true && (
                              <TouchableOpacity
                                style={{
                                  width: scale(30),
                                  height: scale(30),
                                  backgroundColor: colors.background2,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: scale(4),
                                }}
                                onPress={() => {
                                  // openLink(salonInfoData.data.salonInfo.instraLink)
                                }}
                              >
                                <InstagramIcon size={scale(18)} color={"#E1306C"} />
                              </TouchableOpacity>
                            )}

                            {true && (
                              <TouchableOpacity
                                style={{
                                  width: scale(30),
                                  height: scale(30),
                                  backgroundColor: colors.background2,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: scale(4),
                                }}
                                onPress={() => {
                                  // openLink(salonInfoData.data.salonInfo.fbLink)
                                }}
                              >
                                <FacebookIcon size={scale(18)} color={"#1877F2"} />
                              </TouchableOpacity>
                            )}

                            {true && (
                              <TouchableOpacity
                                style={{
                                  width: scale(30),
                                  height: scale(30),
                                  backgroundColor: colors.background2,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: scale(4),
                                }}
                                onPress={() => {
                                  // openLink(salonInfoData.data.salonInfo.twitterLink)
                                }}
                              >
                                <XIcon size={scale(18)} color={colors.text} />
                              </TouchableOpacity>
                            )}

                            {true && (
                              <TouchableOpacity
                                style={{
                                  width: scale(30),
                                  height: scale(30),
                                  backgroundColor: colors.background2,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: scale(4),
                                }}
                                onPress={() => {
                                  // openLink(salonInfoData.data.salonInfo.tiktokLink)
                                }}
                              >
                                <TiktokIcon size={scale(18)} color={colors.text} />
                              </TouchableOpacity>
                            )}

                            {true && (
                              <TouchableOpacity
                                style={{
                                  width: scale(30),
                                  height: scale(30),
                                  backgroundColor: colors.background2,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: scale(4),
                                }}
                                onPress={() => {
                                  // openLink(salonInfoData.data.salonInfo.webLink)
                                }}
                              >
                                <WebIcon size={scale(18)} color={colors.text} />
                              </TouchableOpacity>
                            )}
                          </View>


                        </View>
                      ) : (null)
                    }


                  </>
                )
              }

              {
                selectedTab === "Services" && (

                  dummyData.map((item, index) => (
                    <React.Fragment key={item?.serviceCategoryName || index}>
                      <ThemeTextPrimary style={styles.serviceName}>
                        {item?.serviceCategoryName}
                      </ThemeTextPrimary>
                      {item?.services?.map((ser) => (
                        <View
                          key={ser.serviceId}
                          style={[
                            styles.card,
                            {
                              backgroundColor: colors.background,
                              borderColor: colors.borderColor1,
                              borderWidth: scale(1),
                            },
                          ]}
                        >
                          <Image source={{ uri: "https://naomisheadmasters.com/wp-content/uploads/2022/08/salon-4-mens-Best-Salon-near-Pinjore.png" }} style={styles.icon} />
                          <View style={styles.cardContent}>
                            <ThemeTextPrimary style={styles.serviceName}>{ser.serviceName}</ThemeTextPrimary>
                            <ThemeTextSecondary style={[styles.serviceDesc]}>
                              {ser.serviceDesc}
                            </ThemeTextSecondary>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: scale(10),
                                marginTop: verticalScale(5),
                              }}
                            >
                              <ThemeTextPrimary style={styles.servicePrice}>
                                $ {ser.servicePrice}
                              </ThemeTextPrimary>
                              <ThemeTextPrimary style={[styles.serviceEWT, { color: colors.secondaryText }]}>
                                ~ {formatMinutesToHrMin(ser.serviceEWT)}
                              </ThemeTextPrimary>
                            </View>
                          </View>
                        </View>
                      ))}
                    </React.Fragment>
                  ))

                )
              }

              {
                selectedTab === "Appointment" && (
                  <>
                    <TouchableOpacity
                      onPress={() => router.push("/appointmentAvailability")}
                      style={[styles.appointmentCard, {
                        backgroundColor: colors.background,
                        borderWidth: scale(1),
                        borderColor: colors.borderColor1,
                        borderRadius: scale(12),
                        padding: scale(10),
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }]}>
                      <View style={{ flex: 1, gap: verticalScale(5) }}>
                        <ThemeTextPrimary style={{
                          fontFamily: "AirbnbCereal_W_Bd"
                        }}>Set Your Availability</ThemeTextPrimary>
                        <ThemeTextSecondary style={{ width: "96%" }}>
                          Choose your recurring weekly appointment days
                        </ThemeTextSecondary>
                      </View>

                      <RightIcon color={colors.textColor1} size={moderateScale(16)} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.appointmentCard, {
                      backgroundColor: colors.background,
                      borderWidth: scale(1),
                      borderColor: colors.borderColor1,
                      borderRadius: scale(12),
                      padding: scale(10),
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }]}>
                      <View style={{ flex: 1, gap: verticalScale(5) }}>
                        <ThemeTextPrimary style={{
                          fontFamily: "AirbnbCereal_W_Bd"
                        }}>Manage Your Off Days</ThemeTextPrimary>
                        <ThemeTextSecondary style={{ width: "96%" }}>
                          Select specific dates from a calender to block off
                        </ThemeTextSecondary>
                      </View>

                      <RightIcon color={colors.textColor1} size={moderateScale(16)} />
                    </TouchableOpacity>

                  </>
                )
              }

            </BottomSheetScrollView>
          </>
        </BottomSheet>
      </GestureHandlerRootView>

    </ThemeSafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  cardWrapper: {
    height: verticalScale(200),
    width: scale(400)
  },
  cardImage: {
    height: "100%",
    width: "100%",
  },

  container: {
    flex: 1,
  },

  tabBtn: {
    height: verticalScale(30),
    backgroundColor: "gray",
    flex: 1,
    paddingInline: scale(10),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    paddingHorizontal: scale(10),
    paddingTop: scale(10),
    paddingBottom: Platform.OS === "ios" ? verticalScale(100) : verticalScale(20),
    gap: verticalScale(10)
  },

  map: {
    width: "100%",
    height: verticalScale(128),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12)
  },

  card: {
    flexDirection: 'row',
    padding: scale(12),
    marginBottom: verticalScale(8),
    borderRadius: scale(12),
  },
  icon: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
    marginRight: scale(12),
    borderWidth: scale(1),
    borderColor: '#efefef', // gray-200
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },

  serviceName: {
    fontSize: scale(16),
    fontFamily: "AirbnbCereal_W_Bd"
  },
  serviceDesc: {
    fontSize: scale(14),
  },
  servicePrice: {
    fontSize: scale(14),
    fontFamily: "AirbnbCereal_W_Bd",
    color: "#14b8a6"
  },
  serviceEWT: {
    fontSize: scale(12),
  },
})
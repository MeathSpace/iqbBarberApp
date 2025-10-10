import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import { FlatList, Linking, Platform, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { scale, verticalScale } from 'react-native-size-matters';
import ThemeSafeAreaView from '../../../../components/ThemeSafeAreaView';
import ThemeTextPrimary from '../../../../components/ThemeTextPrimary';
import ThemeTextSecondary from '../../../../components/ThemeTextSecondary';
import { ContactIcon, EmailIcon, FacebookIcon, InstagramIcon, MapIcon, TiktokIcon, WebIcon, WhatsappIcon, XIcon } from '../../../../constants/icons';

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
                        backgroundColor: colors.background2,
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
                        backgroundColor: colors.background2,
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
                        {"91" &&
                          "1234567890" && (
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
                          backgroundColor: colors.background2,
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
                            backgroundColor: colors.background2,
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
})
import PhoneInput from "@linhnguyen96114/react-native-phone-input";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import ThemeSafeAreaView from "../../../components/ThemeSafeAreaView";
import ThemeTextPrimary from "../../../components/ThemeTextPrimary";
import ThemeTextSecondary from "../../../components/ThemeTextSecondary";
import {
  CheckIcon,
  DeleteIcon,
  DownIcon,
  LeftIcon,
} from "../../../constants/icons";

const CreateSalonForm = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const stepper = [
    { id: 1, title: "Account" },
    { id: 2, title: "Business" },
    { id: 3, title: "Services" },
    { id: 4, title: "Gallery" },
    { id: 5, title: "Social" },
  ];

  const [selectedStep, setSelectedStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Step 1
  const [salonName, setSalonName] = useState("");
  const [salonDescription, setSalonDescription] = useState("");
  const [salonEmail, setSalonEmail] = useState("");
  const [salonMobileNumber, setSalonMobileNumber] = useState("");

  // Step 2
  const [salonType, setSalonType] = useState("barbershop");
  const [salonAddress, setSalonAddress] = useState("");
  const [salonPostCode, setSalonPostCode] = useState("");
  const [salonCity, setSalonCity] = useState("");
  const [salonCountry, setSalonCountry] = useState("");
  const [salonLatitude, setSalonLatitude] = useState("");
  const [salonLongitude, setSalonLongitude] = useState("");
  const [salonTimezone, setSalonTimezone] = useState("");
  const [salonTypeDrop, setSalonTypeDrop] = useState(false);
  const [salonCityDrop, setSalonCityDrop] = useState(false);
  const [salonCountryDrop, setSalonCountryDrop] = useState(false);
  const [salonTimezoneDrop, setSalonTimezoneDrop] = useState(false);

  // Step 3
  const [salonServiceName, setSalonServiceName] = useState("");
  const [salonServiceDescription, setSalonServiceDescription] = useState("");
  const [salonServiceType, setSalonServiceType] = useState("Regular");
  const [salonServiceCategory, setSalonServiceCategory] = useState("");
  const [salonServicePrice, setSalonServicePrice] = useState("");
  const [salonServiceEstimatedTime, setSalonServiceEstimatedTime] =
    useState("");
  const [selectedServiceIcon, setSelectedServiceIcon] = useState("");
  const [salonServiceTypeDrop, setSalonServiceTypeDrop] = useState(false);
  const [salonServiceCategoryDrop, setSalonServiceCategoryDrop] =
    useState(false);

  return (
    <ThemeSafeAreaView edges={["top"]}>
      {/* Header */}
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        style={[styles.header, { borderBottomColor: colors.borderColor1 }]}
      >
        <LeftIcon size={scale(16)} color={colors.textColor1} />
        <ThemeTextPrimary style={styles.headerTitle}>
          Create Your Salon
        </ThemeTextPrimary>
      </TouchableOpacity>

      {/* Stepper */}
      <View style={styles.stepperContainer}>
        {stepper.map((item) => (
          <View key={item.id} style={styles.stepItem}>
            <TouchableOpacity
              onPress={() => setSelectedStep(item.id)}
              style={[
                styles.stepCircle,
                {
                  backgroundColor: completedSteps.includes(item.id)
                    ? "#14b8a6"
                    : colors.progressBgColor,
                },
              ]}
            >
              {completedSteps.includes(item.id) ? (
                <CheckIcon color="#ffffff" size={scale(20)}/>
              ) : (
                <ThemeTextPrimary
                  style={{
                    color: completedSteps.includes(item.id)
                      ? "#ffffff"
                      : colors.textColor1,
                  }}
                >
                  {item.id}
                </ThemeTextPrimary>
              )}
            </TouchableOpacity>
            <ThemeTextSecondary
              style={[
                styles.stepLabel,
                {
                  color: completedSteps.includes(item.id)
                    ? "#14b8a6"
                    : colors.textColor2,
                  fontFamily: completedSteps.includes(item.id)
                    ? "AirbnbCereal_W_Bd"
                    : "AirbnbCereal_W_Md",
                },
              ]}
            >
              {item.title}
            </ThemeTextSecondary>
          </View>
        ))}
      </View>

      {/* Keyboard Avoiding Wrapper */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? verticalScale(20) : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          style={[
            styles.scrollView,
            {
              backgroundColor: colors.background2,
              borderColor: colors.borderColor1,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {selectedStep === 1 && (
            <>
              <View>
                <ThemeTextPrimary
                  style={{
                    fontSize: scale(18),
                    fontFamily: "AirbnbCereal_W_Bd",
                  }}
                >
                  Account Information
                </ThemeTextPrimary>
                <ThemeTextSecondary style={{ marginTop: verticalScale(5) }}>
                  Please enter your account details.
                </ThemeTextSecondary>
              </View>

              <View
                style={{
                  marginVertical: verticalScale(15),
                  flexDirection: "column",
                  gap: verticalScale(15),
                }}
              >
                {/* Salon Name */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Salon Name</ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your salon name"
                    value={salonName}
                    onChangeText={setSalonName}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* Description */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Salon Description</ThemeTextPrimary>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                    placeholder="Enter your salon description"
                    value={salonDescription}
                    onChangeText={setSalonDescription}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                        height: verticalScale(80),
                      },
                    ]}
                  />
                </View>

                {/* Email */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Salon Email</ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your salon email"
                    value={salonEmail}
                    onChangeText={setSalonEmail}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* Phone Number */}
                <View
                  style={{
                    gap: verticalScale(10),
                    marginBottom: verticalScale(40),
                  }}
                >
                  <ThemeTextPrimary>Salon Phone Number</ThemeTextPrimary>
                  <PhoneInput
                    defaultValue={salonMobileNumber}
                    defaultCode="GB"
                    onChangeText={setSalonMobileNumber}
                    disableArrowIcon
                    withDarkTheme={colorScheme === "dark"}
                    containerStyle={{
                      width: "100%",
                      borderRadius: scale(8),
                      backgroundColor: colors.background,
                      borderColor: colors.borderColor1,
                      borderWidth: scale(1),
                      height: verticalScale(45),
                    }}
                    textContainerStyle={{
                      borderRadius: scale(8),
                      backgroundColor: colors.background,
                    }}
                    flagButtonStyle={{
                      width: scale(50),
                      height: verticalScale(45),
                    }}
                    textInputStyle={{
                      fontFamily: "AirbnbCereal_W_Md",
                      color: colors.textColor1,
                    }}
                    codeTextStyle={{
                      fontFamily: "AirbnbCereal_W_Md",
                      color: colors.textColor1,
                    }}
                  />
                </View>
              </View>
            </>
          )}

          {selectedStep === 2 && (
            <>
              <View>
                <ThemeTextPrimary
                  style={{
                    fontSize: scale(18),
                    fontFamily: "AirbnbCereal_W_Bd",
                  }}
                >
                  Business Information
                </ThemeTextPrimary>
                <ThemeTextSecondary style={{ marginTop: verticalScale(5) }}>
                  Fill in your salon’s business information to continue.
                </ThemeTextSecondary>
              </View>

              <View
                style={{
                  marginVertical: verticalScale(15),
                  flexDirection: "column",
                  gap: verticalScale(15),
                }}
              >
                {/* Salon type */}
                <View style={{ gap: verticalScale(10), position: "relative" }}>
                  <ThemeTextPrimary>Salon Type</ThemeTextPrimary>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.inputColor,
                        borderColor: colors.borderColor1,
                      },
                    ]}
                  >
                    <TextInput
                      editable
                      placeholder="Enter your salon type"
                      value={salonType}
                      onChangeText={setSalonType}
                      placeholderTextColor={colors.textColor2}
                      style={[
                        styles.inputField,
                        {
                          flex: 1,
                          borderWidth: scale(0),
                          color: colors.textColor1,
                          backgroundColor: colors.background,
                          borderTopLeftRadius: scale(8),
                          borderBottomLeftRadius: scale(8),
                        },
                      ]}
                    />
                    <TouchableOpacity
                      onPress={() => setSalonTypeDrop((prev) => !prev)}
                      style={[
                        styles.dropIcon,
                        {
                          backgroundColor: colors.background,
                        },
                      ]}
                    >
                      <DownIcon size={20} color="#777" />
                    </TouchableOpacity>
                  </View>

                  {salonTypeDrop && (
                    <View
                      style={[
                        styles.dropDownContainer,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.borderColor1,
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setSalonType("Barber Shop");
                          setSalonTypeDrop(false);
                        }}
                      >
                        <ThemeTextPrimary>Barber Shop</ThemeTextPrimary>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setSalonType("Hair Dresser");
                          setSalonTypeDrop(false);
                        }}
                      >
                        <ThemeTextPrimary>Hair Dresser</ThemeTextPrimary>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Address */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Salon Address</ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your salon address"
                    value={salonAddress}
                    onChangeText={setSalonAddress}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* Post Code */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Post Code</ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your salon postcode"
                    value={salonPostCode}
                    onChangeText={setSalonPostCode}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* Latitude */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Latitude</ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your salon latitude"
                    value={salonLatitude}
                    onChangeText={setSalonLatitude}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* longitude */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Longitude</ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your salon longitude"
                    value={salonLongitude}
                    onChangeText={setSalonLongitude}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* GeoLocation Button */}
                <TouchableOpacity style={styles.geolocationButton}>
                  <ThemeTextPrimary
                    style={{ color: "white", textAlign: "center" }}
                  >
                    Open Map
                  </ThemeTextPrimary>
                </TouchableOpacity>

                {/* Salon Country */}
                <View style={{ gap: verticalScale(10), position: "relative" }}>
                  <ThemeTextPrimary>Country</ThemeTextPrimary>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.inputColor,
                        borderColor: colors.borderColor1,
                      },
                    ]}
                  >
                    <TextInput
                      editable
                      placeholder="Select salon country"
                      value={salonCountry}
                      onChangeText={setSalonCountry}
                      placeholderTextColor={colors.textColor2}
                      readOnly
                      style={[
                        styles.inputField,
                        {
                          flex: 1,
                          borderWidth: scale(0),
                          color: colors.textColor1,
                          backgroundColor: colors.background,
                          borderTopLeftRadius: scale(8),
                          borderBottomLeftRadius: scale(8),
                        },
                      ]}
                    />
                    <TouchableOpacity
                      onPress={() => setSalonCountryDrop((prev) => !prev)}
                      style={[
                        styles.dropIcon,
                        {
                          backgroundColor: colors.background,
                        },
                      ]}
                    >
                      <DownIcon size={20} color="#777" />
                    </TouchableOpacity>
                  </View>

                  {salonCountryDrop && (
                    <View
                      style={[
                        styles.dropDownContainer,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.borderColor1,
                        },
                      ]}
                    >
                      {["India", "United Kingdom", "Australia"].map((item) => {
                        return (
                          <TouchableOpacity
                            key={item}
                            onPress={() => {
                              setSalonCountry(item);
                              setSalonCountryDrop(false);
                            }}
                          >
                            <ThemeTextPrimary>{item}</ThemeTextPrimary>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>

                {/* Salon City */}
                <View style={{ gap: verticalScale(10), position: "relative" }}>
                  <ThemeTextPrimary>City</ThemeTextPrimary>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.inputColor,
                        borderColor: colors.borderColor1,
                      },
                    ]}
                  >
                    <TextInput
                      editable
                      placeholder="Select salon city"
                      value={salonCity}
                      onChangeText={setSalonCity}
                      placeholderTextColor={colors.textColor2}
                      readOnly
                      style={[
                        styles.inputField,
                        {
                          flex: 1,
                          borderWidth: scale(0),
                          color: colors.textColor1,
                          backgroundColor: colors.background,
                          borderTopLeftRadius: scale(8),
                          borderBottomLeftRadius: scale(8),
                        },
                      ]}
                    />
                    <TouchableOpacity
                      onPress={() => setSalonCityDrop((prev) => !prev)}
                      style={[
                        styles.dropIcon,
                        {
                          backgroundColor: colors.background,
                        },
                      ]}
                    >
                      <DownIcon size={20} color="#777" />
                    </TouchableOpacity>
                  </View>

                  {salonCityDrop && (
                    <View
                      style={[
                        styles.dropDownContainer,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.borderColor1,
                        },
                      ]}
                    >
                      {["kalyani Nadia", "Ranaghat", "kanchrapara"].map(
                        (item) => {
                          return (
                            <TouchableOpacity
                              key={item}
                              onPress={() => {
                                setSalonCity(item);
                                setSalonCityDrop(false);
                              }}
                            >
                              <ThemeTextPrimary>{item}</ThemeTextPrimary>
                            </TouchableOpacity>
                          );
                        }
                      )}
                    </View>
                  )}
                </View>

                {/* Salon Timezone */}
                <View style={{ gap: verticalScale(10), position: "relative", paddingBottom: verticalScale(30) }}>
                  <ThemeTextPrimary>Timezone</ThemeTextPrimary>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.inputColor,
                        borderColor: colors.borderColor1,
                      },
                    ]}
                  >
                    <TextInput
                      editable
                      placeholder="Select salon timezone"
                      value={salonTimezone}
                      onChangeText={setSalonTimezone}
                      placeholderTextColor={colors.textColor2}
                      readOnly
                      style={[
                        styles.inputField,
                        {
                          flex: 1,
                          borderWidth: scale(0),
                          color: colors.textColor1,
                          backgroundColor: colors.background,
                          borderTopLeftRadius: scale(8),
                          borderBottomLeftRadius: scale(8),
                        },
                      ]}
                    />
                    <TouchableOpacity
                      onPress={() => setSalonTimezoneDrop((prev) => !prev)}
                      style={[
                        styles.dropIcon,
                        {
                          backgroundColor: colors.background,
                        },
                      ]}
                    >
                      <DownIcon size={20} color="#777" />
                    </TouchableOpacity>
                  </View>

                  {salonTimezoneDrop && (
                    <View
                      style={[
                        styles.dropDownContainer,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.borderColor1,
                        },
                      ]}
                    >
                      {["14:00UTC", "20:06UTC", "35:45UTC"].map((item) => {
                        return (
                          <TouchableOpacity
                            key={item}
                            onPress={() => {
                              setSalonTimezone(item);
                              setSalonTimezoneDrop(false);
                            }}
                          >
                            <ThemeTextPrimary>{item}</ThemeTextPrimary>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              </View>
            </>
          )}

          {selectedStep === 3 && (
            <>
              <View>
                <ThemeTextPrimary
                  style={{
                    fontSize: scale(18),
                    fontFamily: "AirbnbCereal_W_Bd",
                  }}
                >
                  Add Services
                </ThemeTextPrimary>
                <ThemeTextSecondary style={{ marginTop: verticalScale(5) }}>
                  Enter your salon's service details to proceed with setup.
                </ThemeTextSecondary>
              </View>

              <View
                style={{
                  marginVertical: verticalScale(15),
                  flexDirection: "column",
                  gap: verticalScale(15),
                }}
              >
                <ScrollView
                  contentContainerStyle={{
                    gap: scale(10),
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {[0, 1, 2, 3, 4, 5].map((item) => {
                    return (
                      <TouchableOpacity
                        style={{
                          width: scale(70),
                          height: scale(70),
                          borderRadius: scale(8),
                          borderWidth: scale(3),
                          borderColor:
                            selectedServiceIcon === item
                              ? "#14b8a6"
                              : "transparent",
                        }}
                        key={item}
                        onPress={() => setSelectedServiceIcon(item)}
                      >
                        <Image
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: scale(6),
                          }}
                          source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
                          contentFit="cover"
                          transition={1000}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                {/* Service Name */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Service Name</ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your service name"
                    value={salonServiceName}
                    onChangeText={setSalonServiceName}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* Service Description */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Service Description</ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your service description"
                    value={salonServiceDescription}
                    onChangeText={setSalonServiceDescription}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* Service Type */}
                <View style={{ gap: verticalScale(10), position: "relative" }}>
                  <ThemeTextPrimary>
                    Service Type (*VIP services have top priority in queue)
                  </ThemeTextPrimary>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.inputColor,
                        borderColor: colors.borderColor1,
                      },
                    ]}
                  >
                    <TextInput
                      editable
                      placeholder="Select your service type"
                      value={salonServiceType}
                      onChangeText={setSalonServiceType}
                      placeholderTextColor={colors.textColor2}
                      readOnly
                      style={[
                        styles.inputField,
                        {
                          flex: 1,
                          borderWidth: scale(0),
                          color: colors.textColor1,
                          backgroundColor: colors.background,
                          borderTopLeftRadius: scale(8),
                          borderBottomLeftRadius: scale(8),
                        },
                      ]}
                    />
                    <TouchableOpacity
                      onPress={() => setSalonServiceTypeDrop((prev) => !prev)}
                      style={[
                        styles.dropIcon,
                        {
                          backgroundColor: colors.background,
                        },
                      ]}
                    >
                      <DownIcon size={20} color="#777" />
                    </TouchableOpacity>
                  </View>

                  {salonServiceTypeDrop && (
                    <View
                      style={[
                        styles.dropDownContainer,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.borderColor1,
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setSalonServiceType("Regular");
                          setSalonServiceTypeDrop(false);
                        }}
                      >
                        <ThemeTextPrimary>Regular</ThemeTextPrimary>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setSalonServiceType("VIP");
                          setSalonServiceTypeDrop(false);
                        }}
                      >
                        <ThemeTextPrimary>VIP</ThemeTextPrimary>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Service Category */}
                <View style={{ gap: verticalScale(10), position: "relative" }}>
                  <ThemeTextPrimary>Service Category</ThemeTextPrimary>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.inputColor,
                        borderColor: colors.borderColor1,
                      },
                    ]}
                  >
                    <TextInput
                      editable
                      placeholder="Select your service category"
                      value={salonServiceCategory}
                      onChangeText={setSalonServiceCategory}
                      placeholderTextColor={colors.textColor2}
                      readOnly
                      style={[
                        styles.inputField,
                        {
                          flex: 1,
                          borderWidth: scale(0),
                          color: colors.textColor1,
                          backgroundColor: colors.background,
                          borderTopLeftRadius: scale(8),
                          borderBottomLeftRadius: scale(8),
                        },
                      ]}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setSalonServiceCategoryDrop((prev) => !prev)
                      }
                      style={[
                        styles.dropIcon,
                        {
                          backgroundColor: colors.background,
                        },
                      ]}
                    >
                      <DownIcon size={20} color="#777" />
                    </TouchableOpacity>
                  </View>

                  {salonServiceCategoryDrop && (
                    <View
                      style={[
                        styles.dropDownContainer,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.borderColor1,
                        },
                      ]}
                    >
                      {["Beard", "Haircut", "Massage"].map((item) => {
                        return (
                          <TouchableOpacity
                            key={item}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: scale(10),
                            }}
                            onPress={() => {
                              setSalonServiceCategory(item);
                              setSalonServiceCategoryDrop(false);
                            }}
                          >
                            <Image
                              style={{
                                width: scale(30),
                                height: scale(30),
                                borderRadius: scale(40),
                              }}
                              source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
                              contentFit="cover"
                              transition={1000}
                            />
                            <ThemeTextPrimary>{item}</ThemeTextPrimary>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>

                {/* Service Price */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Service Price</ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your service price"
                    value={salonServicePrice}
                    onChangeText={setSalonServicePrice}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* Service Estimated Time */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>
                    Service Estimated Time (mins)
                  </ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your service estimated time (mins)"
                    value={salonServiceEstimatedTime}
                    onChangeText={setSalonServiceEstimatedTime}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* Add Service Button */}
                <TouchableOpacity style={styles.addServiceButton}>
                  <ThemeTextPrimary
                    style={{ color: "white", textAlign: "center" }}
                  >
                    Add Service
                  </ThemeTextPrimary>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: "100%",
                  height: verticalScale(200),
                  backgroundColor: colors.background,
                  borderWidth: scale(1),
                  borderColor: colors.borderColor1,
                  borderRadius: scale(8),
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: scale(10),
                    borderBottomColor: colors.borderColor1,
                    borderBottomWidth: scale(1),
                    position: "relative",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: scale(45),
                        height: scale(45),
                        borderRadius: scale(45),
                      }}
                      source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
                      contentFit="cover"
                      transition={1000}
                    />

                    <ThemeTextPrimary>Haircut</ThemeTextPrimary>
                    <ThemeTextSecondary>
                      Best haircut in town
                    </ThemeTextSecondary>
                    <ThemeTextSecondary>Haircut</ThemeTextSecondary>
                  </View>

                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: verticalScale(10),
                      right: scale(10),
                    }}
                  >
                    <DeleteIcon color="red" />
                  </TouchableOpacity>
                </View>

                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    padding: scale(10),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      gap: verticalScale(5),
                    }}
                  >
                    <ThemeTextPrimary
                      style={{
                        fontFamily: "AirbnbCereal_W_Bd",
                        textAlign: "center",
                      }}
                    >
                      Price
                    </ThemeTextPrimary>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: scale(10),
                      }}
                    >
                      <ThemeTextPrimary>$</ThemeTextPrimary>
                      <TextInput
                        editable
                        style={{
                          borderBottomColor: colors.borderColor1,
                          borderBottomWidth: scale(1),
                          textAlign: "center",
                          width: scale(40),
                          fontSize: scale(16),
                        }}
                      />
                    </View>
                  </View>

                  <View>
                    <ThemeTextPrimary
                      style={{
                        fontFamily: "AirbnbCereal_W_Bd",
                        textAlign: "center",
                      }}
                    >
                      Estimated Time
                    </ThemeTextPrimary>

                    <TextInput
                      editable
                      style={{
                        borderBottomColor: colors.borderColor1,
                        borderBottomWidth: scale(1),
                        textAlign: "center",
                        width: scale(60),
                        fontSize: scale(16),
                      }}
                    />
                  </View>
                </View> */}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: scale(10),
                  }}
                >
                  {/* Price Section */}
                  <View
                    style={{
                      alignItems: "center", // ✅ centers both text and input horizontally
                      gap: verticalScale(8),
                    }}
                  >
                    <ThemeTextPrimary
                      style={{
                        fontFamily: "AirbnbCereal_W_Bd",
                        textAlign: "center",
                      }}
                    >
                      Price
                    </ThemeTextPrimary>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <ThemeTextPrimary
                        style={{
                          marginRight: scale(4),
                          fontSize: scale(16),
                        }}
                      >
                        $
                      </ThemeTextPrimary>

                      <TextInput
                        editable
                        style={{
                          borderBottomColor: colors.borderColor1,
                          borderBottomWidth: scale(1),
                          textAlign: "center",
                          width: scale(50),
                          fontSize: scale(16),
                        }}
                      />
                    </View>
                  </View>

                  {/* Estimated Time Section */}
                  <View
                    style={{
                      alignItems: "center", // ✅ centers both text and input horizontally
                      gap: verticalScale(8),
                    }}
                  >
                    <ThemeTextPrimary
                      style={{
                        fontFamily: "AirbnbCereal_W_Bd",
                        textAlign: "center",
                      }}
                    >
                      Estimated Time
                    </ThemeTextPrimary>

                    <TextInput
                      editable
                      style={{
                        borderBottomColor: colors.borderColor1,
                        borderBottomWidth: scale(1),
                        textAlign: "center",
                        width: scale(60),
                        fontSize: scale(16),
                      }}
                    />
                  </View>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {selectedStep === 1 && (
        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.8}
          onPress={() => {
            setSelectedStep(2);
            setCompletedSteps([1]);
          }}
        >
          <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
            Continue
          </ThemeTextPrimary>
        </TouchableOpacity>
      )}

      {selectedStep === 2 && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: scale(10),
            width: "95%",
            marginHorizontal: "auto",
          }}
        >
          <TouchableOpacity
            style={[
              styles.nextButton,
              { flex: 1, backgroundColor: colors.progressBgColor },
            ]}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedStep(1);
              setCompletedSteps([]);
            }}
          >
            <ThemeTextPrimary
              style={{ color: colors.textColor1, textAlign: "center" }}
            >
              Back
            </ThemeTextPrimary>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, { flex: 1 }]}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedStep(3);
              setCompletedSteps([1, 2]);
            }}
          >
            <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
              Continue
            </ThemeTextPrimary>
          </TouchableOpacity>
        </View>
      )}

      {selectedStep === 3 && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: scale(10),
            width: "95%",
            marginHorizontal: "auto",
          }}
        >
          <TouchableOpacity
            style={[
              styles.nextButton,
              { flex: 1, backgroundColor: colors.progressBgColor },
            ]}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedStep(2);
              setCompletedSteps([1]);
            }}
          >
            <ThemeTextPrimary
              style={{ color: colors.textColor1, textAlign: "center" }}
            >
              Back
            </ThemeTextPrimary>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, { flex: 1 }]}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedStep(4);
              setCompletedSteps([1, 2, 3]);
            }}
          >
            <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
              Continue
            </ThemeTextPrimary>
          </TouchableOpacity>
        </View>
      )}
    </ThemeSafeAreaView>
  );
};

export default CreateSalonForm;

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: scale(1),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    paddingBottom: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  headerTitle: {
    fontSize: scale(18),
    fontFamily: "AirbnbCereal_W_Bd",
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(12),
  },
  stepItem: {
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(5),
    width: "20%",
  },
  stepCircle: {
    width: scale(35),
    height: scale(35),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(20),
  },
  stepLabel: {
    fontSize: scale(12),
  },
  scrollView: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
    borderWidth: scale(1),
    padding: scale(18),
    borderRadius: scale(10),
  },
  scrollViewContent: {
    paddingBottom: verticalScale(80),
  },
  inputField: {
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    fontSize: scale(14),
    fontFamily: "AirbnbCereal_W_Md",
  },
  nextButton: {
    backgroundColor: "#14b8a6",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(20),
    width: "95%",
    alignSelf: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: scale(1),
    borderRadius: scale(8),
  },

  dropIcon: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    borderTopRightRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },

  dropDownContainer: {
    width: "100%",
    position: "absolute",
    top: verticalScale(80),
    left: scale(0),
    right: scale(0),
    borderRadius: scale(8),
    padding: scale(10),
    zIndex: 10,
    borderWidth: scale(1),
    flexDirection: "column",
    gap: verticalScale(10),
  },

  geolocationButton: {
    backgroundColor: "#14b8a6",
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
    marginVertical: verticalScale(5),
  },

  addServiceButton: {
    backgroundColor: "#14b8a6",
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
    marginVertical: verticalScale(5),
  },
});

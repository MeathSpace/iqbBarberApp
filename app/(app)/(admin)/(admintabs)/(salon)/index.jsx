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
  Modal,
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
import { HistoryIcon, WifiIcon } from "../../../../../constants/icons";

const { width } = Dimensions.get("window");

const SalonDetails = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("Details");
  const [isAddServiceVisible, setIsAddServiceVisible] = useState(false);
  const [isEditServiceVisible, setIsEditServiceVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Haircuts");

  const tabs = ["Details", "Services", "Stylist", "Appointment", "Customers"];
  const servicesCategories = ["Haircuts", "Coloring", "Treatments"];

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
      <TouchableOpacity
        onPress={() => setIsEditServiceVisible(true)}
        style={styles.serviceCardContainer}
      >
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
      </TouchableOpacity>
    );
  };

  const StylistCard = ({ name, phone, email, isOnline }) => {
    const { colors } = useTheme();

    return (
      <View
        style={[
          styles.stylistCard,
          // { backgroundColor: colors.background.color3 },
        ]}
      >
        {/* Top Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://images.squarespace-cdn.com/content/v1/6261885b9334435b76cac21f/9c6ef2f1-6a26-4082-83ec-4b3db60a2401/black+diamond+barbershop-94.jpeg",
            }}
            style={styles.stylistImage}
          />
          {/* Status Badge Overlay */}
          <View style={styles.statusBadge}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isOnline ? "#00C853" : "#757575" },
              ]}
            />
            <ThemeTextPrimary style={styles.statusText}>
              {isOnline ? "ONLINE" : "OFFLINE"}
            </ThemeTextPrimary>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.nameRow}>
            <ThemeTextPrimary style={styles.stylistName}>
              {name}
            </ThemeTextPrimary>
            <TouchableOpacity>
              <Ionicons
                name="arrow-forward-outline"
                size={scale(20)}
                color={colors.textColor.color3}
              />
            </TouchableOpacity>
          </View>

          <ThemeTextPrimary
            style={[styles.stylistPhone, { color: colors.textColor.color3 }]}
          >
            {phone}
          </ThemeTextPrimary>
          <ThemeTextSecondary style={styles.stylistEmail}>
            {email}
          </ThemeTextSecondary>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.background.color4 },
              ]}
            >
              <HistoryIcon size={10} color={colors.textColor.color1} />
              <ThemeTextPrimary style={styles.actionButtonText}>
                CLOCK-IN
              </ThemeTextPrimary>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.background.color4 },
              ]}
            >
              <WifiIcon size={10} color={colors.textColor.color1} />
              <ThemeTextPrimary style={styles.actionButtonText}>
                ONLINE
              </ThemeTextPrimary>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const AddServiceModal = ({ visible, onClose }) => {
    const { colors } = useTheme();

    return (
      <Modal visible={visible} animationType="slide" transparent={false}>
        <ThemeSafeAreaView
          style={{ flex: 1, backgroundColor: colors.background.color1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header Image Placeholder */}
            <View style={styles.formHeaderImage}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800",
                }}
                style={styles.headerImg}
              />
              <TouchableOpacity style={styles.closeModalBtn} onPress={onClose}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              {/* Service Name */}
              <ThemeTextSecondary
                style={[styles.inputLabel, { color: colors.textColor.color3 }]}
              >
                Service Name
              </ThemeTextSecondary>
              <TextInput
                placeholder="e.g. Classic Haircut"
                placeholderTextColor={colors.textColor.color2}
                style={[
                  styles.textInput,
                  {
                    borderColor: colors.borderColor?.color1 || "#EEE",
                    color: colors.textColor.color1,
                  },
                ]}
              />

              {/* Category Dropdown (Simulated) */}
              <ThemeTextSecondary
                style={[styles.inputLabel, { color: colors.textColor.color3 }]}
              >
                Category
              </ThemeTextSecondary>
              <TouchableOpacity
                style={[
                  styles.dropdownContainer,
                  { borderColor: colors.borderColor?.color1 || "#EEE" },
                ]}
              >
                <ThemeTextSecondary style={{ color: colors.textColor.color2 }}>
                  Select Category
                </ThemeTextSecondary>
                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={colors.textColor.color2}
                />
              </TouchableOpacity>

              {/* Price & Duration Row */}
              <View style={styles.inputRow}>
                <View style={{ flex: 1, gap: verticalScale(12) }}>
                  <ThemeTextSecondary
                    style={[
                      styles.inputLabel,
                      { color: colors.textColor.color3 },
                    ]}
                  >
                    Price
                  </ThemeTextSecondary>
                  <View
                    style={[
                      styles.priceInputWrapper,
                      { borderColor: colors.borderColor?.color1 || "#EEE" },
                    ]}
                  >
                    <ThemeTextPrimary
                      style={{ color: colors.textColor.color3 }}
                    >
                      ${" "}
                    </ThemeTextPrimary>
                    <TextInput
                      keyboardType="numeric"
                      placeholder="0.00"
                      placeholderTextColor={colors.textColor.color2}
                      style={[
                        styles.innerInput,
                        {
                          color: colors.textColor.color1,
                        },
                      ]}
                    />
                  </View>
                </View>

                <View style={{ flex: 1, gap: verticalScale(12) }}>
                  <ThemeTextSecondary
                    style={[
                      styles.inputLabel,
                      { color: colors.textColor.color3 },
                    ]}
                  >
                    Duration
                  </ThemeTextSecondary>
                  <View
                    style={[
                      styles.priceInputWrapper,
                      { borderColor: colors.borderColor?.color1 || "#EEE" },
                    ]}
                  >
                    <TextInput
                      keyboardType="numeric"
                      placeholder="60"
                      placeholderTextColor={colors.textColor.color2}
                      style={[
                        styles.innerInput,
                        {
                          color: colors.textColor.color1,
                        },
                      ]}
                    />
                    <ThemeTextPrimary
                      style={{
                        fontSize: scale(10),
                        color: colors.textColor.color3,
                      }}
                    >
                      MIN
                    </ThemeTextPrimary>
                  </View>
                </View>
              </View>

              {/* Description */}
              <ThemeTextSecondary
                style={[styles.inputLabel, { color: colors.textColor.color3 }]}
              >
                Service Description
              </ThemeTextSecondary>
              <TextInput
                multiline
                numberOfLines={4}
                placeholder="Describe the service..."
                style={[
                  styles.textInput,
                  styles.textArea,
                  { borderColor: colors.borderColor?.color1 || "#EEE" },
                ]}
              />

              {/* Submit Button */}
              <TouchableOpacity
                onPress={onClose}
                style={{ marginTop: verticalScale(10) }}
              >
                <LinearGradient
                  colors={[
                    colors.button.typeThree.linearOne,
                    colors.button.typeThree.linearTwo,
                  ]}
                  style={styles.submitBtn}
                >
                  <ThemeTextPrimary style={styles.submitBtnText}>
                    Add Service
                  </ThemeTextPrimary>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ThemeSafeAreaView>
      </Modal>
    );
  };

  const EditServiceModal = ({ visible, onClose }) => {
    const { colors } = useTheme();

    return (
      <Modal visible={visible} animationType="slide" transparent={false}>
        <ThemeSafeAreaView
          style={{ flex: 1, backgroundColor: colors.background.color1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header Image Placeholder */}
            <View style={styles.formHeaderImage}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800",
                }}
                style={styles.headerImg}
              />
              <TouchableOpacity style={styles.closeModalBtn} onPress={onClose}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              {/* Service Name */}
              <ThemeTextSecondary
                style={[styles.inputLabel, { color: colors.textColor.color3 }]}
              >
                Service Name
              </ThemeTextSecondary>
              <TextInput
                placeholder="e.g. Classic Haircut"
                placeholderTextColor={colors.textColor.color2}
                style={[
                  styles.textInput,
                  {
                    borderColor: colors.borderColor?.color1 || "#EEE",
                    color: colors.textColor.color1,
                  },
                ]}
                value="Classic Haircut"
              />

              {/* Category Dropdown (Simulated) */}
              <ThemeTextSecondary
                style={[styles.inputLabel, { color: colors.textColor.color3 }]}
              >
                Category
              </ThemeTextSecondary>
              <TouchableOpacity
                style={[
                  styles.dropdownContainer,
                  { borderColor: colors.borderColor?.color1 || "#EEE" },
                ]}
              >
                <ThemeTextSecondary style={{ color: colors.textColor.color1 }}>
                  Hair
                </ThemeTextSecondary>
                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={colors.textColor.color2}
                />
              </TouchableOpacity>

              {/* Price & Duration Row */}
              <View style={styles.inputRow}>
                <View style={{ flex: 1, gap: verticalScale(12) }}>
                  <ThemeTextSecondary
                    style={[
                      styles.inputLabel,
                      { color: colors.textColor.color3 },
                    ]}
                  >
                    Price
                  </ThemeTextSecondary>
                  <View
                    style={[
                      styles.priceInputWrapper,
                      { borderColor: colors.borderColor?.color1 || "#EEE" },
                    ]}
                  >
                    <ThemeTextPrimary
                      style={{ color: colors.textColor.color3 }}
                    >
                      ${" "}
                    </ThemeTextPrimary>
                    <TextInput
                      keyboardType="numeric"
                      placeholder="0.00"
                      placeholderTextColor={colors.textColor.color2}
                      style={[
                        styles.innerInput,
                        {
                          color: colors.textColor.color1,
                        },
                      ]}
                      value={50}
                    />
                  </View>
                </View>

                <View style={{ flex: 1, gap: verticalScale(12) }}>
                  <ThemeTextSecondary
                    style={[
                      styles.inputLabel,
                      { color: colors.textColor.color3 },
                    ]}
                  >
                    Duration
                  </ThemeTextSecondary>
                  <View
                    style={[
                      styles.priceInputWrapper,
                      { borderColor: colors.borderColor?.color1 || "#EEE" },
                    ]}
                  >
                    <TextInput
                      keyboardType="numeric"
                      placeholder="60"
                      placeholderTextColor={colors.textColor.color2}
                      style={[
                        styles.innerInput,
                        {
                          color: colors.textColor.color1,
                        },
                      ]}
                      value={30}
                    />
                    <ThemeTextPrimary
                      style={{
                        fontSize: scale(10),
                        color: colors.textColor.color3,
                      }}
                    >
                      MIN
                    </ThemeTextPrimary>
                  </View>
                </View>
              </View>

              {/* Description */}
              <ThemeTextSecondary
                style={[styles.inputLabel, { color: colors.textColor.color3 }]}
              >
                Service Description
              </ThemeTextSecondary>
              <TextInput
                multiline
                numberOfLines={4}
                placeholder="Describe the service..."
                style={[
                  styles.textInput,
                  styles.textArea,
                  { borderColor: colors.borderColor?.color1 || "#EEE" },
                ]}
                value="Description of the service"
              />

              {/* Submit Button */}
              <TouchableOpacity
                onPress={onClose}
                style={{ marginTop: verticalScale(10) }}
              >
                <LinearGradient
                  colors={[
                    colors.button.typeThree.linearOne,
                    colors.button.typeThree.linearTwo,
                  ]}
                  style={styles.submitBtn}
                >
                  <ThemeTextPrimary
                    style={[styles.submitBtnText, { color: "#fff" }]}
                  >
                    Save Changes
                  </ThemeTextPrimary>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                style={[styles.submitBtn, { marginTop: verticalScale(10) }]}
              >
                <ThemeTextPrimary
                  style={[styles.submitBtnText, { color: colors.textColor.color3 }]}
                >
                  Delete Service
                </ThemeTextPrimary>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ThemeSafeAreaView>
      </Modal>
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
              <TouchableOpacity onPress={() => setIsAddServiceVisible(true)}>
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
              {servicesCategories.map((cat) => (
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

            <AddServiceModal
              visible={isAddServiceVisible}
              onClose={() => setIsAddServiceVisible(false)}
            />

            <EditServiceModal
              visible={isEditServiceVisible}
              onClose={() => setIsEditServiceVisible(false)}
            />
          </>
        )}

        {activeTab === "Stylist" && (
          <>
            {/* Section Header */}
            <View style={styles.sectionRow}>
              <View>
                <ThemeTextPrimary style={styles.sectionTitle}>
                  STYLIST LIST
                </ThemeTextPrimary>
                <ThemeTextSecondary style={styles.sectionSub}>
                  Manage your salon's stylist
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
                    Add Stylist
                  </ThemeTextPrimary>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.stylistGrid}>
              {[1, 2, 3, 4].map((item) => (
                <StylistCard
                  key={item}
                  name="John Doe"
                  phone="+44 1234567890"
                  email="johndoe@gmail.com"
                  isOnline={true}
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

  stylistGrid: {
    paddingHorizontal: scale(20),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: verticalScale(15),
  },
  stylistCard: {
    width: (width - scale(50)) / 2, // Ensures 2 columns with gaps
    overflow: "hidden",
    marginBottom: verticalScale(20),
  },
  imageContainer: {
    width: "100%", // Slightly taller for the profile look
    position: "relative",
  },
  stylistImage: {
    height: scale(140),
    borderRadius: scale(15),
  },
  statusBadge: {
    position: "absolute",
    top: scale(10),
    right: scale(10),
    backgroundColor: "rgba(0,0,0,0.7)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(12),
    gap: scale(5),
  },
  statusDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
  },
  statusText: {
    color: "white",
    fontSize: scale(9),
    fontFamily: "AirbnbCereal_W_Bd",
  },
  infoSection: {
    // padding: scale(12),
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(4),
    marginTop: verticalScale(8),
  },
  stylistName: {
    fontSize: scale(13),
    fontFamily: "AirbnbCereal_W_Bd",
    marginTop: verticalScale(8),
  },
  stylistPhone: {
    fontSize: scale(10),
    marginTop: verticalScale(2),
    lineHeight: verticalScale(14),
  },
  stylistEmail: {
    fontSize: scale(10),
    marginTop: verticalScale(2),
    lineHeight: verticalScale(14),
  },
  actionRow: {
    flexDirection: "row",
    gap: scale(6),
    marginTop: verticalScale(12),
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(7),
    borderRadius: scale(8),
    gap: scale(4),
  },
  actionButtonText: {
    fontSize: scale(7.5),
    fontFamily: "AirbnbCereal_W_Bd",
  },

  formHeaderImage: {
    width: "100%",
    height: verticalScale(200),
    position: "relative",
  },
  headerImg: { width: "100%", height: "100%" },
  closeModalBtn: {
    position: "absolute",
    top: verticalScale(20),
    right: scale(20),
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: scale(20),
    padding: scale(8),
  },
  formContainer: {
    padding: scale(20),
    gap: verticalScale(12),
  },
  inputRow: {
    flexDirection: "row",
    gap: scale(15),
    alignItems: "flex-end", // Ensures labels don't throw off alignment
  },
  priceInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    height: verticalScale(45), // Force an explicit identical height
  },
  innerInput: {
    flex: 1,
    height: "100%",
    paddingVertical: 0, // Removes default Android/iOS padding that breaks alignment
    fontFamily: "AirbnbCereal_W_Md",
    fontSize: scale(14),
  },
  inputLabel: {
    fontFamily: "AirbnbCereal_W_Bd",
  },

  textInput: {
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(12),
    fontFamily: "AirbnbCereal_W_Md",
    fontSize: scale(14),
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: scale(8),
    padding: scale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textArea: {
    height: verticalScale(100),
    textAlignVertical: "top",
  },
  submitBtn: {
    paddingVertical: verticalScale(15),
    borderRadius: scale(12),
    alignItems: "center",
  },
  submitBtnText: {
    fontSize: scale(16),
    fontFamily: "AirbnbCereal_W_Bd",
  },
});

export default SalonDetails;

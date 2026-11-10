// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { scale, verticalScale } from "react-native-size-matters";

// import { darkTheme } from "../../../../../constants/appTheme";
// import { CheckIcon, StarIcon } from "../../../../../constants/icons";

// const AVAILABLE_SERVICES = [
//   { id: "1", title: "Classic Haircut", desc: "Traditional scissor cut", price: "£35", duration: "30 min", featured: false },
//   { id: "2", title: "Fade Haircut", desc: "Modern fade styling", price: "£40", duration: "45 min", featured: false },
//   { id: "3", title: "Hot Towel Shave", desc: "Luxury straight razor shave", price: "£45", duration: "30 min", featured: true },
//   { id: "4", title: "Beard Trim & Shape", desc: "Professional beard grooming", price: "£25", duration: "20 min", featured: false },
//   { id: "5", title: "Hair Coloring", desc: "Full color change or highlights", price: "£60", duration: "60 min", featured: false },
// ];

// const SelectServices = ({ selectedIds, onToggleService }) => {
//   return (
//     <View style={[styles.stepContainer, styles.servicesStepGap]}>
//       {AVAILABLE_SERVICES.map((item) => {
//         const isSelected = selectedIds.includes(item.id);
//         return (
//           <TouchableOpacity
//             key={item.id}
//             activeOpacity={0.9}
//             onPress={() => onToggleService(item.id)}
//             style={[
//               styles.serviceCard,
//               {
//                 backgroundColor: darkTheme.colors.card,
//                 borderColor: isSelected
//                   ? darkTheme.colors.accent
//                   : darkTheme.colors.border,
//               },
//             ]}
//           >
//             <View
//               style={[
//                 styles.checkboxShell,
//                 {
//                   borderColor: isSelected
//                     ? darkTheme.colors.accent
//                     : darkTheme.colors.textMuted,
//                   backgroundColor: isSelected
//                     ? darkTheme.colors.accent
//                     : "transparent",
//                 },
//               ]}
//             >
//               {isSelected && <CheckIcon size={scale(11)} color="#000000" />}
//             </View>

//             <View style={styles.serviceMainDetails}>
//               <View style={styles.titleRow}>
//                 <Text style={darkTheme.typography.cardTitle}>{item.title}</Text>
//                 {item.featured && (
//                   <StarIcon
//                     size={scale(12)}
//                     color={darkTheme.colors.accent}
//                     style={styles.featuredStar}
//                   />
//                 )}
//               </View>
//               <Text
//                 style={[
//                   darkTheme.typography.bodyMuted,
//                   {
//                     color: darkTheme.colors.textMuted,
//                     marginTop: verticalScale(2),
//                   },
//                 ]}
//               >
//                 {item.desc}
//               </Text>

//               <View style={styles.badgeMetricsRow}>
//                 <View
//                   style={[
//                     styles.priceBadge,
//                     { backgroundColor: "rgba(255, 149, 0, 0.1)" },
//                   ]}
//                 >
//                   <Text style={styles.priceText}>{item.price}</Text>
//                 </View>
//                 <Text
//                   style={[
//                     darkTheme.typography.bodyMuted,
//                     { color: darkTheme.colors.textMuted },
//                   ]}
//                 >
//                   {item.duration}
//                 </Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// export default SelectServices;

// const styles = StyleSheet.create({
//   stepContainer: {
//     width: "100%",
//   },

//   servicesStepGap: {
//     gap: verticalScale(12),
//     marginBottom: verticalScale(24),
//   },

//   serviceCard: {
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: darkTheme.layout.borderRadiusLarge,
//     padding: scale(14),
//     flexDirection: "row",
//     alignItems: "flex-start",
//   },

//   checkboxShell: {
//     width: scale(18),
//     height: scale(18),
//     borderRadius: scale(4),
//     borderWidth: 1.5,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: scale(14),
//     marginTop: verticalScale(2),
//   },

//   serviceMainDetails: {
//     flex: 1,
//   },

//   titleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   featuredStar: {
//     marginLeft: scale(6),
//   },

//   badgeMetricsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: verticalScale(12),
//     gap: scale(10),
//   },

//   priceBadge: {
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(3),
//     borderRadius: scale(4),
//   },

//   priceText: {
//     color: "#FF9500",
//     fontSize: scale(11),
//     fontWeight: "700",
//   },
// });

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

import Header from "../../../../../components/Header/Header";
import Progess from "../../../../../components/Progess/Progess";
import { darkTheme } from "../../../../../constants/appTheme";
import { CheckIcon, StarIcon } from "../../../../../constants/icons";
import { useAdminAuth } from "../../../../../context/admin/AuthContext";
import api from "../../../../../utils/api";

const SelectServices = () => {
  const router = useRouter();
  const formData = useLocalSearchParams();
  const { authenticatedUser } = useAdminAuth();
  const [availableServices, setAvailableServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const salonId = authenticatedUser?.salonId;
    if (!salonId || salonId === "0") {
      setAvailableServices([]);
      setServicesLoading(false);
      return;
    }

    let isCurrent = true;
    const fetchSalonServices = async () => {
      try {
        const { data } = await api.get("/salon/getAllSalonServices", {
          params: { salonId },
        });
        if (isCurrent) {
          setAvailableServices(Array.isArray(data?.response) ? data.response : []);
        }
      } catch (error) {
        if (isCurrent) {
          console.error("Failed to fetch salon services:", error?.response?.data || error.message);
          Alert.alert("Could not load services", error?.response?.data?.message || "Please try again.");
        }
      } finally {
        if (isCurrent) setServicesLoading(false);
      }
    };

    fetchSalonServices();
    return () => {
      isCurrent = false;
    };
  }, [authenticatedUser?.salonId]);

  const handleToggleService = (id) => {
    const serviceId = String(id);
    setSelectedIds((prev) =>
      prev.includes(serviceId) ? prev.filter((item) => item !== serviceId) : [...prev, serviceId]
    );
  };

  const handleFinishFlow = async () => {
    if (isSubmitting) return;
    if (!availableServices.length) {
      Alert.alert("No services available", "Add services to this salon before creating a barber.");
      return;
    }
    if (!selectedIds.length) {
      Alert.alert("Select services", "Choose at least one service for this barber.");
      return;
    }

    const salonId = Number(authenticatedUser?.salonId);
    const mobileNumber = Number(String(formData.mobileNumber || "").replace(/\D/g, ""));
    const countryCode = Number(String(formData.countryCode || "").replace(/\D/g, ""));
    const rawDobDay = String(formData.dobDay || "");
    const rawDobMonth = String(formData.dobMonth || "");
    const dobYear = String(formData.dobYear || "");
    const dateOfBirth = rawDobDay && rawDobMonth && dobYear
      ? `${dobYear}-${rawDobMonth.padStart(2, "0")}-${rawDobDay.padStart(2, "0")}`
      : "";
    const barberServices = availableServices.filter((service) =>
      selectedIds.includes(String(service.serviceId ?? service._id)),
    );

    if (!salonId || !mobileNumber || !countryCode) {
      Alert.alert("Invalid barber details", "Check the salon, country code, and mobile number, then try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/barber/createBarberByAdmin", {
        email: String(formData.email || "").trim(),
        name: String(formData.fullName || "").trim(),
        nickName: String(formData.nickname || "").trim(),
        salonId,
        mobileNumber,
        countryCode,
        dateOfBirth,
        barberServices,
        barberExp: String(formData.barberExp || "").trim(),
      });
      Alert.alert("Barber created", "The barber was added to this salon.", [
        { text: "OK", onPress: () => router.dismiss(3) },
      ]);
    } catch (error) {
      Alert.alert("Could not create barber", error?.response?.data?.message || "Please review the details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      style={[styles.container, { backgroundColor: darkTheme.colors.background }]}
    >
      <Header
        title="Select Services"
        subTitle={`Step 2 of 2 • ${selectedIds.length} services selected`}
        showBack={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={[styles.stepContainer, styles.servicesStepGap]}>
          <Progess />

          {servicesLoading ? (
            <ActivityIndicator color={darkTheme.colors.accent} style={{ marginVertical: verticalScale(32) }} />
          ) : availableServices.length ? availableServices.map((item) => {
            const id = String(item.serviceId ?? item._id);
            const isSelected = selectedIds.includes(id);
            return (
              <TouchableOpacity
                key={id}
                activeOpacity={0.9}
                onPress={() => handleToggleService(id)}
                style={[
                  styles.serviceCard,
                  {
                    backgroundColor: darkTheme.colors.card,
                    borderColor: isSelected
                      ? darkTheme.colors.accent
                      : darkTheme.colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.checkboxShell,
                    {
                      borderColor: isSelected
                        ? darkTheme.colors.accent
                        : darkTheme.colors.textMuted,
                      backgroundColor: isSelected
                        ? darkTheme.colors.accent
                        : "transparent",
                    },
                  ]}
                >
                  {isSelected && <CheckIcon size={scale(11)} color="#000000" />}
                </View>

                <View style={styles.serviceMainDetails}>
                  <View style={styles.titleRow}>
                    <Text style={darkTheme.typography.cardTitle}>{item.serviceName}</Text>
                    {item.vipService && (
                      <StarIcon
                        size={scale(12)}
                        color={darkTheme.colors.accent}
                        style={styles.featuredStar}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      darkTheme.typography.bodyMuted,
                      {
                        color: darkTheme.colors.textMuted,
                        marginTop: verticalScale(2),
                      },
                    ]}
                  >
                    {item.serviceDesc}
                  </Text>

                  <View style={styles.badgeMetricsRow}>
                    <View
                      style={[
                        styles.priceBadge,
                        { backgroundColor: "rgba(255, 149, 0, 0.1)" },
                      ]}
                    >
                      <Text style={styles.priceText}>{item.servicePrice}</Text>
                    </View>
                    <Text
                      style={[
                        darkTheme.typography.bodyMuted,
                        { color: darkTheme.colors.textMuted },
                      ]}
                    >
                      {item.serviceEWT} min
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }) : (
            <Text style={[darkTheme.typography.bodyMuted, { textAlign: "center", marginVertical: verticalScale(32) }]}>
              No services are configured for this salon.
            </Text>
          )}
        </View>

        {/* Primary Action Button to Complete Setup */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor: darkTheme.colors.accent,
              height: darkTheme.layout.buttonHeight,
            },
          ]}
          activeOpacity={0.8}
          onPress={handleFinishFlow}
          disabled={isSubmitting || servicesLoading}
        >
          {isSubmitting ? <ActivityIndicator color="#000000" /> : <Text
            style={[
              darkTheme.typography.btnText,
              { color: "#000000", fontWeight: "700" },
            ]}
          >
            Finish Setup
          </Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: darkTheme.layout.paddingHorizontal,
    paddingBottom: verticalScale(32),
  },
  stepContainer: {
    width: "100%",
  },

  servicesStepGap: {
    gap: verticalScale(12),
    marginBottom: verticalScale(24),
  },

  serviceCard: {
    width: "100%",
    borderWidth: 1,
    borderRadius: darkTheme.layout.borderRadiusLarge,
    padding: scale(14),
    flexDirection: "row",
    alignItems: "flex-start",
  },

  checkboxShell: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(4),
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(14),
    marginTop: verticalScale(2),
  },

  serviceMainDetails: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  featuredStar: {
    marginLeft: scale(6),
  },

  badgeMetricsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(12),
    gap: scale(10),
  },

  priceBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(3),
    borderRadius: scale(4),
  },

  priceText: {
    color: "#FF9500",
    fontSize: scale(11),
    fontWeight: "700",
  },

  continueButton: {
    width: "100%",
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(8),
  },
});

import { useTheme } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import ThemeSafeAreaView from '../../../components/ThemeSafeAreaView'
import ThemeTextPrimary from '../../../components/ThemeTextPrimary'
import ThemeTextSecondary from '../../../components/ThemeTextSecondary'
import { SalonIcon } from '../../../constants/icons'

const createSalon = () => {

  const { colors } = useTheme()
  const router = useRouter()

  const createSalonHandler = () => {
    router.push("/createSalonForm")
  }

  return (
    <ThemeSafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "85%",
          justifyContent: "center",
          alignItems: "center",
          gap: verticalScale(10),
          backgroundColor: colors.background2,
          padding: scale(20),
          borderRadius: scale(10),
          borderWidth: scale(1),
          borderColor: colors.borderColor1
        }}
      >
        <View style={{
          marginBottom: verticalScale(10),
          height: scale(85),
          width: scale(85),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: scale(50),
          backgroundColor: colors.background,
          borderWidth: scale(1),
          borderColor: colors.borderColor1
        }}>
          <SalonIcon size={moderateScale(48)} color={colors.textColor1}/>
        </View>

        <View
          style={{
            flexDirection: "column",
            gap: verticalScale(5)
          }}
        >
          <ThemeTextPrimary style={{
            fontSize: scale(22),
            textAlign: "center",
            fontFamily: "AirbnbCereal_W_Bd"
          }}>Create Your Salon</ThemeTextPrimary>
          <ThemeTextSecondary
            style={{
              fontSize: scale(16),
              textAlign: "center",
            }}
          >Welcome! Create and manage your salon from here.</ThemeTextSecondary>
        </View>

        <TouchableOpacity
          onPress={createSalonHandler}
          style={styles.salonButton}
        >
          <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
            Create a Salon
          </ThemeTextPrimary>
        </TouchableOpacity>
      </View>
    </ThemeSafeAreaView>
  )
}

export default createSalon

const styles = StyleSheet.create({
  salonButton: {
    backgroundColor: "#14b8a6",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
    marginTop: verticalScale(20),
    width: "100%"
  },
})
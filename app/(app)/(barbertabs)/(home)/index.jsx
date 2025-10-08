import { useTheme } from '@react-navigation/native'
import { Image } from 'expo-image'
import { ScrollView, StyleSheet, View } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import ThemeSafeAreaView from '../../../../components/ThemeSafeAreaView'
import ThemeTextPrimary from '../../../../components/ThemeTextPrimary'
import ThemeTextSecondary from '../../../../components/ThemeTextSecondary'
import { NotificationIcon } from '../../../../constants/icons'

const index = () => {

  const { colors } = useTheme()

  return (
    <ThemeSafeAreaView
      style={{
        backgroundColor: "#fff"
      }}
      edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: verticalScale(60),
        backgroundColor: colors.background2,
        borderBottomColor: colors.borderColor1,
        borderBottomWidth: scale(1),
        paddingHorizontal: scale(12)
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          gap: scale(10)
        }}>
          <Image
            style={styles.image}
            source="https://i.pinimg.com/736x/0f/5d/ac/0f5dac39ba6687e95f08623a9c9faca9.jpg"
            contentFit="cover"
            transition={1000}
          />
          <View>
            <ThemeTextPrimary>Jessica</ThemeTextPrimary>
            <ThemeTextSecondary>Modern Stylist Salon</ThemeTextSecondary>
          </View>
        </View>

        <View>
          <NotificationIcon />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1
        }}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Section 1 */}
        <View style={styles.upcommingAppointmentSection}>
          <ThemeTextPrimary style={[styles.sectionTitle, {
            fontSize: scale(18),
            fontFamily: "AirbnbCereal_W_Bd"
          }]}>Upcoming Appointments</ThemeTextPrimary>

          <View style={{
            height: verticalScale(200),
            width: "100%",
            backgroundColor: "#efefef"
          }}>

          </View>
        </View>

        {/* Section 2 */}
        <View style={styles.liveStatusSection}>
          <ThemeTextPrimary style={[styles.sectionTitle, {
            fontSize: scale(18),
            fontFamily: "AirbnbCereal_W_Bd"
          }]}>Live Status</ThemeTextPrimary>

          <View style={{
            height: verticalScale(200),
            width: "100%",
            backgroundColor: "#efefef"
          }}>

          </View>
        </View>
        {/* Section 3 */}
        <View style={styles.
          weeklyReportsSection}>
          <ThemeTextPrimary style={[styles.sectionTitle, {
            fontSize: scale(18),
            fontFamily: "AirbnbCereal_W_Bd"
          }]}>Weekly Reports</ThemeTextPrimary>

          <View style={{
            height: verticalScale(200),
            width: "100%",
            backgroundColor: "#efefef"
          }}>

          </View>
        </View>

      </ScrollView>
    </ThemeSafeAreaView >
  )
}

export default index

const styles = StyleSheet.create({

  scrollContainer: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    gap: verticalScale(15)
  },

  image: {
    width: scale(40),
    height: scale(40),
    backgroundColor: '#0553',
    borderRadius: scale(20),
  },

  upcommingAppointmentSection: {
    flexDirection: "column",
    gap: verticalScale(10)
  },

  liveStatusSection: {
    flexDirection: "column",
    gap: verticalScale(10)
  },

  weeklyReportsSection: {
    flexDirection: "column",
    gap: verticalScale(10)
  }

  // section: {
  //   backgroundColor: '#efefef',
  //   borderRadius: 12,
  //   padding: 16,
  //   // marginBottom: 16,
  //   height: 300
  // },
  // section2: {
  //   backgroundColor: '#efefef',
  //   borderRadius: 12,
  //   padding: 16,
  //   height: 300
  // },
  // sectionTitle: {
  //   color: '#e5e7eb',
  //   fontSize: 16,
  // },
})